# tools/rmmz-map — RMMZ 地圖工具鏈（see-before-choose）

一組讓 **AI 產地圖不必盲畫**的 Python 工具：把地圖 JSON 渲染成 PNG 直接看、
把幾十張候選圖排成縮圖牆篩選、以現成 sample map 為「供體」合成新圖，並用
**從 Enterbrain 官方 sample map 學來的 autotile 接邊規則**讓手繪地面自動接邊。

M001 青牛鎮·韓家即以此流程重做（Map016 為供體）。詳見專案根 `CLAUDE.md` 工作流與
`docs/story/00-序章-青牛鎮.md` §11。

> ⚠️ **唯一鐵則**：寫入 `game/data/` 前，MZ 編輯器必須關閉（見 CLAUDE.md）。
> 本工具鏈的渲染/篩選/合成都可在編輯器開著時做（只讀 or 寫到別處）；只有最後
> 覆寫 `game/data/*.json` 那一步受鐵則約束。

## 安裝

```bash
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt        # 只需 Pillow
```

## 檔案

| 檔 | 作用 |
| --- | --- |
| `render_map.py` | Map JSON → PNG。忠實移植 `rmmz_core.js` 的 `_addAutotile`/`_addNormalTile`/shadow（靜態幀）。`--grid` 疊格線座標，方便定位事件。也可 `import` 用 `render()`。 |
| `contact_sheet.py` | 一次把某資料夾內多張 Map JSON 渲成**縮圖牆**，可依 `--tsid`/尺寸/`--only` 篩選，用來挑供體。 |
| `mzmap.py` | 地圖編輯**函式庫**：`load/save/grid_get/mset/fill/copy_block/crop/new_map`。block-copy 保留 autotile 接邊。 |
| `autoshape.py` | A2 地面 autotile **接邊器**。`reshape_region()` 依鄰格重算 shape（如編輯器）。`a2_shape_table.json` 為預學好的表，**用它不需 RMMZ 安裝**；只有重建表才需 `--sample-dir`。 |
| `a2_shape_table.json` | 從 293 張 sample/專案地圖學到的 `neighbor-mask → shape`（252/256 masks）。 |
| `examples/build_hanjia_m001.py` | M001 韓家小院的**可重現配方**（供體=Map016）。 |

## 常用指令

RMMZ 安裝路徑（本機 Steam 版；素材庫細節見記憶 `rmmz-dlc-asset-library`）：

```
RMMZ=".../steamapps/common/RPG Maker MZ"
SAMPLES="$RMMZ/RPGMZ.app/Contents/Resources/samplemaps"
GAME="../../game"
```

看一張地圖（含格線）：
```bash
python render_map.py "$GAME/data/Map001.json" /tmp/m001.png \
  --tilesets "$GAME/data/Tilesets.json" --imgdir "$GAME/img/tilesets" --grid
```

挑供體：把某 tileset 的候選 sample map 排成縮圖牆
（sample map 的 tilesetId 1–6 = 標準 RTP tileset，與本專案 `game/` 同批圖，可直接用 `game/` 的 Tilesets/img 渲染）：
```bash
python contact_sheet.py --mapdir "$SAMPLES" \
  --tilesets "$GAME/data/Tilesets.json" --imgdir "$GAME/img/tilesets" \
  --out /tmp/sheet.png --tsid 2 --maxw 40 --maxh 42 --cols 6
```

重現 M001（先 dry run 出預覽；確認後、**編輯器關閉時**才加 `--out-json` 寫入）：
```bash
python examples/build_hanjia_m001.py \
  --donor "$SAMPLES/Map016.json" --game "$GAME" --preview /tmp/m001.png
# 滿意後：
python examples/build_hanjia_m001.py \
  --donor "$SAMPLES/Map016.json" --game "$GAME" \
  --out-json "$GAME/data/Map001.json"
```

（可選）重建 autotile 表：
```bash
python autoshape.py --sample-dir "$SAMPLES"
```

## 合成新地圖的建議流程

1. `contact_sheet.py` 掃 sample map → 挑一張貼近需求的**供體**。
2. `render_map.py --grid` 看供體，記下要用的區塊座標。
3. 寫一支像 `examples/build_hanjia_m001.py` 的腳本：`crop`/`copy_block` 搬供體區塊
   （**整塊搬**，autotile 接邊自動保留），用 `mzmap` 填地面、`autoshape.reshape_region`
   讓手繪處接邊。
4. `render_map.py` 反覆看、修，滿意後（**編輯器關閉**）寫入 `game/data/`。
5. 進 MZ 編輯器目視、做局部 tile 微修，再放事件。

## 已知限制

- 渲染為**靜態幀**（水/瀑布動畫取第 0 幀），且不重排 upper/lower 圖層（對靜態預覽無影響）。
- `autoshape` 只處理 **A2 地面** autotile；A1 水、A3 屋頂、A4 牆的自動接邊未實作
  （這些多半靠 block-copy 整塊搬即可保留）。
- 接邊表以「多數決」學得，sample map 內少數手工裝飾變體不影響新繪製區塊。
