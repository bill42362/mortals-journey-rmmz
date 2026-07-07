# tools/asset-audit — 素材納管稽核

RMMZ 建專案時會帶進整套 RTP（多數用不到）；日後要用 DLC（如 MV Trinity）也想整包
放進 `game/img` 讓編輯器能預覽挑選。但整包進 git／上 gh-pages 會膨脹 LFS 配額，也把
未用素材一併公開散布。

**策略**：`.gitignore` 預設忽略 `game/img`、`game/audio` 下所有素材，只 **whitelist**
「實際被 `data/*.json` 或外掛引用到的」檔。整包 DLC 可放進 `game/img` 供編輯器預覽，
未 whitelist 者不進 git、不部署（見 [docs/TECH.md](../../docs/TECH.md) §7.2）。

## 用法

```bash
# 1) 看目前有多少已追蹤但沒被引用的素材（純唯讀）
python3 tools/asset-audit/audit.py report

# 2) 依「已追蹤且被引用」集合，更新 .gitignore 的 whitelist 受管區塊
python3 tools/asset-audit/audit.py gen-ignore --write

# 3) CI 守門：檢查每個 data 引用是否都有「已追蹤」對應檔（會被部署的檔）
python3 tools/asset-audit/audit.py check     # 有缺 → 列出並 exit 1

# 4) 印出未引用的已追蹤素材路徑（供 git rm --cached 用）
python3 tools/asset-audit/audit.py list-unused
```

## 日常流程：要用一個新素材時

1. 從 DLC/來源把檔複製進對應的 `game/img/<類型>/`（整包放著也行，編輯器看得到）。
2. 在 RMMZ 編輯器選用它、存檔（寫進 `data/`）。
3. 讓它進版控，二選一：
   - `git add -f game/img/<類型>/<檔名>`（單檔強制加入），或
   - `python3 tools/asset-audit/audit.py gen-ignore --write` 重新產生 whitelist 後 commit。
4. `check` 會在 CI 把關：**用了卻忘了納入版控 → 建置失敗**，不會等到線上才發現破圖。

## 判定方式與限制

- `report` / `gen-ignore` / `list-unused`：**語料整詞比對**——素材檔名（去副檔名）以非
  `[A-Za-z0-9_]` 為邊界，在所有 `data/*.json` + 外掛 js 中搜尋。保守：不會把有引用的
  誤判為未用。`img/system`（引擎硬載入，如 IconSet/Window）一律視為已用。
- `check`：**結構化抽取**——直讀 Actors/Enemies/Tilesets/System/Map*/CommonEvents/
  Troops 的已知欄位，以及事件指令 101/231/241/245/249/250/283/284/322/323/41。
- **盲點**：以「變數指定檔名」的動態引用（如 Show Picture 綁變數）靜態掃描無法解析；
  這類素材請自行 `git add -f` 納入。
- **LFS 歷史**：`git rm --cached` 只停止未來追蹤/部署（頻寬立省）；已進 LFS 歷史的
  blob 仍佔儲存配額，需回收時另做 history rewrite（filter-repo）＋ `git lfs prune`。
