#!/usr/bin/env python3
"""素材納管稽核工具（唯讀分析 + .gitignore whitelist 維護 + CI 缺檔守門）。

背景：完整 DLC / RTP 可整包放進 game/img 供 RMMZ 編輯器預覽，但 .gitignore 預設
忽略所有素材，只 whitelist「實際被 data/*.json 或外掛引用到的」檔——這樣 repo 與
gh-pages 部署都只帶用到的素材，未用的（含整包 DLC）不進 git、不散布（見 docs/TECH.md
§7.2、CLAUDE.md 決策紀錄）。

三種模式：
  report      列出已追蹤但未被引用的素材（瘦身候選）。純唯讀。
  gen-ignore  依「已追蹤且被引用」集合產生 .gitignore 的 whitelist 區塊；
              --write 則就地更新 .gitignore 內的受管區塊。
  check       CI 守門：檢查每個 data 內的素材引用，是否都有對應的「已追蹤」檔
              （＝會被部署到 gh-pages 的檔）。有缺 → 列出並 exit 1。
  list-unused 印出未引用的已追蹤素材路徑（一行一個，供 git rm --cached 使用）。

判定法：
  report/gen-ignore/list-unused 用「語料整詞比對」——把所有 data/*.json + 外掛 js
    串成語料，素材檔名（去副檔名）以非 [A-Za-z0-9_] 為邊界比對；找不到＝未引用。
    保守：不會把有引用的誤判為未用。img/system（引擎硬載入）一律視為已用。
  check 用「結構化引用抽取」——直接讀 Actors/Enemies/Tilesets/System/Map*/
    CommonEvents/Troops 的已知欄位與事件指令 101，反查對應檔是否已追蹤。
"""
import argparse, json, os, re, subprocess, sys, collections

ASSET_IMG_EXT = (".png", ".jpg", ".jpeg")
ASSET_AUDIO_EXT = (".ogg", ".m4a", ".mp3", ".wav")
ASSET_EXT = ASSET_IMG_EXT + ASSET_AUDIO_EXT

BEGIN_MARK = "# >>> asset-audit managed whitelist (自動產生，勿手改) >>>"
END_MARK = "# <<< asset-audit managed whitelist <<<"


def repo_root():
    return subprocess.check_output(
        ["git", "rev-parse", "--show-toplevel"], text=True
    ).strip()


def load_json(data_dir, name):
    p = os.path.join(data_dir, name)
    if not os.path.exists(p):
        return None
    try:
        with open(p, encoding="utf-8", errors="ignore") as f:
            return json.load(f)
    except Exception:
        return None


def tracked_assets(root):
    out = subprocess.check_output(
        ["git", "-C", root, "ls-files", "game/img", "game/audio"], text=True
    ).splitlines()
    return [p for p in out if p.lower().endswith(ASSET_EXT)]


def build_corpus(root):
    parts = []
    data_dir = os.path.join(root, "game", "data")
    if os.path.isdir(data_dir):
        for fn in sorted(os.listdir(data_dir)):
            if fn.endswith(".json"):
                with open(os.path.join(data_dir, fn), encoding="utf-8", errors="ignore") as f:
                    parts.append(f.read())
    js_dir = os.path.join(root, "game", "js")
    for cand in [os.path.join(js_dir, "plugins.js")]:
        if os.path.exists(cand):
            with open(cand, encoding="utf-8", errors="ignore") as f:
                parts.append(f.read())
    plug_dir = os.path.join(js_dir, "plugins")
    if os.path.isdir(plug_dir):
        for fn in sorted(os.listdir(plug_dir)):
            if fn.endswith(".js"):
                with open(os.path.join(plug_dir, fn), encoding="utf-8", errors="ignore") as f:
                    parts.append(f.read())
    return "\n".join(parts)


def category(path):
    # game/img/characters/Foo.png -> img/characters
    return "/".join(path.split("/")[1:3])


def is_used_by_corpus(path, corpus):
    if category(path) == "img/system":
        return True  # 引擎硬載入（IconSet/Window/Balloon…）
    base = os.path.splitext(path.split("/")[-1])[0]
    pat = r"(?<![A-Za-z0-9_])" + re.escape(base) + r"(?![A-Za-z0-9_])"
    return re.search(pat, corpus) is not None


def human(n):
    if n is None or n < 0:
        return "?"
    for u in ["B", "KB", "MB", "GB"]:
        if n < 1024:
            return f"{n:.0f}{u}" if u == "B" else f"{n:.1f}{u}"
        n /= 1024
    return f"{n:.1f}TB"


# ───────────────────────── report ─────────────────────────
def cmd_report(root):
    corpus = build_corpus(root)
    tracked = tracked_assets(root)
    cats = collections.OrderedDict()
    for path in tracked:
        used = is_used_by_corpus(path, corpus)
        try:
            size = os.path.getsize(os.path.join(root, path))
        except OSError:
            size = -1
        cats.setdefault(category(path), []).append((path, used, size))

    print("=" * 68)
    print(f"{'類別':<20}{'總數':>6}{'已用':>6}{'未用':>6}{'未用體積':>12}")
    print("-" * 68)
    tot = unused = ub_all = b_all = 0
    for cat, items in cats.items():
        n = len(items); u = sum(1 for _, x, _ in items if x); nu = n - u
        ub = sum(s for _, x, s in items if not x and s > 0)
        b_all += sum(s for _, _, s in items if s > 0)
        print(f"{cat:<20}{n:>6}{u:>6}{nu:>6}{human(ub):>12}")
        tot += n; unused += nu; ub_all += ub
    print("-" * 68)
    print(f"{'合計':<20}{tot:>6}{tot-unused:>6}{unused:>6}{human(ub_all):>12}")
    if b_all:
        print(f"\n總追蹤素材 ~{human(b_all)}；未引用 ~{human(ub_all)} "
              f"({100*ub_all/b_all:.0f}% 可瘦身)")
    return 0


# ─────────────────────── gen-ignore ───────────────────────
def whitelist_lines(root):
    corpus = build_corpus(root)
    kept = sorted(p for p in tracked_assets(root) if is_used_by_corpus(p, corpus))
    return kept


def build_block(root):
    kept = whitelist_lines(root)
    lines = [
        BEGIN_MARK,
        "# 策略：預設忽略 game/img、game/audio 下所有素材，只保留下方 whitelist 的檔。",
        "# 完整 DLC/RTP 可整包複製進 game/img 供編輯器預覽，未 whitelist 者不進 git、不部署。",
        "# 重新產生：python3 tools/asset-audit/audit.py gen-ignore --write",
        "game/img/**/*.png",
        "game/img/**/*.jpg",
        "game/img/**/*.jpeg",
        "game/audio/**/*.ogg",
        "game/audio/**/*.m4a",
        "game/audio/**/*.mp3",
        "game/audio/**/*.wav",
        "",
        f"# --- whitelist：{len(kept)} 個實際引用中的素材 ---",
    ]
    lines += [f"!{p}" for p in kept]
    lines.append(END_MARK)
    return "\n".join(lines), len(kept)


def cmd_gen_ignore(root, write):
    block, n = build_block(root)
    if not write:
        print(block)
        print(f"\n# （{n} 個 whitelist；加 --write 就地寫入 .gitignore）", file=sys.stderr)
        return 0
    gi = os.path.join(root, ".gitignore")
    old = ""
    if os.path.exists(gi):
        with open(gi, encoding="utf-8") as f:
            old = f.read()
    if BEGIN_MARK in old and END_MARK in old:
        pre = old[: old.index(BEGIN_MARK)]
        post = old[old.index(END_MARK) + len(END_MARK):]
        new = pre.rstrip("\n") + "\n\n" + block + "\n" + post.lstrip("\n")
    else:
        new = old.rstrip("\n") + "\n\n" + block + "\n"
    with open(gi, "w", encoding="utf-8") as f:
        f.write(new)
    print(f"✅ 已更新 .gitignore 受管區塊：{n} 個 whitelist。")
    return 0


# ───────────────────────── check ──────────────────────────
def iter_lists(obj):
    if isinstance(obj, dict):
        lst = obj.get("list")
        if isinstance(lst, list):
            yield lst
        for v in obj.values():
            yield from iter_lists(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from iter_lists(v)


def collect_refs(root):
    """回傳 [(folder, name, source)]：data 內結構化的素材引用。"""
    data_dir = os.path.join(root, "game", "data")
    sysd = load_json(data_dir, "System.json") or {}
    side = bool(sysd.get("optSideView"))
    refs = []

    def add(folder, name, src):
        if name and isinstance(name, str):
            refs.append((folder, name, src))

    for a in load_json(data_dir, "Actors.json") or []:
        if not a:
            continue
        add("img/characters", a.get("characterName"), "Actors")
        add("img/faces", a.get("faceName"), "Actors")
        if side:
            add("img/sv_actors", a.get("battlerName"), "Actors")
    for e in load_json(data_dir, "Enemies.json") or []:
        if not e:
            continue
        add("img/sv_enemies" if side else "img/enemies",
            e.get("battlerName"), "Enemies")
    for t in load_json(data_dir, "Tilesets.json") or []:
        if not t:
            continue
        for nm in t.get("tilesetNames", []) or []:
            add("img/tilesets", nm, "Tilesets")

    add("img/titles1", sysd.get("title1Name"), "System")
    add("img/titles2", sysd.get("title2Name"), "System")
    for vk in ("boat", "ship", "airship"):
        v = sysd.get(vk) or {}
        add("img/characters", v.get("characterName"), f"System.{vk}")
        add("audio/bgm", (v.get("bgm") or {}).get("name"), f"System.{vk}")
    for key, folder in (("titleBgm", "audio/bgm"), ("battleBgm", "audio/bgm"),
                        ("victoryMe", "audio/me"), ("defeatMe", "audio/me"),
                        ("gameoverMe", "audio/me")):
        add(folder, (sysd.get(key) or {}).get("name"), "System")
    for s in sysd.get("sounds", []) or []:
        add("audio/se", (s or {}).get("name"), "System.sounds")

    map_files = []
    for fn in sorted(os.listdir(data_dir)):
        if re.fullmatch(r"Map\d+\.json", fn):
            map_files.append(fn)
            m = load_json(data_dir, fn) or {}
            if m.get("parallaxName"):
                add("img/parallaxes", m.get("parallaxName"), fn)
            if m.get("battleback1Name"):
                add("img/battlebacks1", m.get("battleback1Name"), fn)
            if m.get("battleback2Name"):
                add("img/battlebacks2", m.get("battleback2Name"), fn)
            if m.get("autoplayBgm"):
                add("audio/bgm", (m.get("bgm") or {}).get("name"), fn)
            if m.get("autoplayBgs"):
                add("audio/bgs", (m.get("bgs") or {}).get("name"), fn)
            for ev in m.get("events", []) or []:
                if not ev:
                    continue
                for pg in ev.get("pages", []) or []:
                    img = pg.get("image") or {}
                    add("img/characters", img.get("characterName"), fn)

    # 事件指令內的素材引用（涵蓋所有標準會引用素材的 code；每次執行都重新解析，
    # 故日後新增的事件音效/圖片也會被涵蓋）。iter_lists 會遞迴到移動路線的
    # 內嵌 list，故 code 41（移動路線·變更圖像）也一併抓到。
    def add_from_command(c, src):
        code = c.get("code")
        p = c.get("params") or []
        if code == 101 and p:                       # Show Text（臉圖）
            add("img/faces", p[0], f"{src}:101")
        elif code == 231 and len(p) > 1:            # Show Picture
            add("img/pictures", p[1], f"{src}:231")
        elif code == 241 and p and isinstance(p[0], dict):   # Play BGM
            add("audio/bgm", p[0].get("name"), f"{src}:241")
        elif code == 245 and p and isinstance(p[0], dict):   # Play BGS
            add("audio/bgs", p[0].get("name"), f"{src}:245")
        elif code == 249 and p and isinstance(p[0], dict):   # Play ME
            add("audio/me", p[0].get("name"), f"{src}:249")
        elif code == 250 and p and isinstance(p[0], dict):   # Play SE
            add("audio/se", p[0].get("name"), f"{src}:250")
        elif code == 283 and len(p) >= 2:           # Change Battle Back
            add("img/battlebacks1", p[0], f"{src}:283")
            add("img/battlebacks2", p[1], f"{src}:283")
        elif code == 284 and p:                     # Change Parallax
            add("img/parallaxes", p[0], f"{src}:284")
        elif code == 322 and len(p) >= 6:           # Change Actor Images
            add("img/characters", p[1], f"{src}:322")
            add("img/faces", p[3], f"{src}:322")
            if side:
                add("img/sv_actors", p[5], f"{src}:322")
        elif code == 323 and len(p) >= 3:           # Change Vehicle Image
            add("img/characters", p[1], f"{src}:323")
        elif code == 41 and p:                      # 移動路線·變更圖像
            add("img/characters", p[0], f"{src}:41")

    for fn in ["CommonEvents.json", "Troops.json"] + map_files:
        d = load_json(data_dir, fn)
        if d is None:
            continue
        for lst in iter_lists(d):
            for c in lst:
                if isinstance(c, dict):
                    add_from_command(c, fn)
    return refs


def cmd_check(root):
    tracked = tracked_assets(root)
    index = collections.defaultdict(set)  # folder -> {basename}
    for p in tracked:
        index[category(p)].add(os.path.splitext(p.split("/")[-1])[0])

    refs = collect_refs(root)
    missing = []
    seen = set()
    for folder, name, src in refs:
        key = (folder, name)
        if key in seen:
            continue
        seen.add(key)
        if name not in index.get(folder, set()):
            missing.append((folder, name, src))

    if missing:
        print("❌ 素材守門失敗：以下被 data 引用、但沒有『已追蹤』的對應檔，")
        print("   上 gh-pages 會破圖。多半是用了新素材卻忘了 whitelist（見 .gitignore）。")
        print("   解法：git add -f <該檔>，或執行 "
              "python3 tools/asset-audit/audit.py gen-ignore --write 後 commit。\n")
        for folder, name, src in sorted(missing):
            print(f"   缺  {folder}/{name}   ←引用於 {src}")
        print(f"\n共 {len(missing)} 個缺檔。")
        return 1
    print(f"✅ 素材守門通過：{len(seen)} 個引用皆有已追蹤的對應檔。")
    return 0


def cmd_list_unused(root):
    corpus = build_corpus(root)
    for p in sorted(tracked_assets(root)):
        if not is_used_by_corpus(p, corpus):
            print(p)
    return 0


def main():
    ap = argparse.ArgumentParser(description="RMMZ 素材納管稽核")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("report", help="列出未引用的已追蹤素材")
    gi = sub.add_parser("gen-ignore", help="產生/更新 .gitignore whitelist 區塊")
    gi.add_argument("--write", action="store_true", help="就地寫入 .gitignore")
    sub.add_parser("check", help="CI 守門：引用是否都有已追蹤對應檔")
    sub.add_parser("list-unused", help="印出未引用的已追蹤素材路徑")
    args = ap.parse_args()
    root = repo_root()
    return {
        "report": lambda: cmd_report(root),
        "gen-ignore": lambda: cmd_gen_ignore(root, args.write),
        "check": lambda: cmd_check(root),
        "list-unused": lambda: cmd_list_unused(root),
    }[args.cmd]()


if __name__ == "__main__":
    sys.exit(main())
