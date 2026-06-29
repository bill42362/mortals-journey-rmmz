# 凡人修仙傳 RMMZ（Mortal's Journey）

用 **RPGMaker MZ** 製作的《凡人修仙傳》凡界篇改編單機修仙 RPG。
第一階段為可玩 Demo，終點為「黃楓谷進階築基完成」（含血色試煉）。

> 目前處於 **M1 技術骨架**階段：初始 RMMZ 專案已建立並完成線上部署驗證；
> 核心系統外掛（境界 / 小綠瓶 / 種植 …）尚未開始。

## 線上試玩（GitHub Pages）

每次 push 任一分支會自動部署到對應預覽路由（per-branch，見 [TECH §7.4](docs/TECH.md)）。

| 分支 | 網址 |
| --- | --- |
| `main` | https://bill42362.github.io/mortals-journey-rmmz/ |
| `develop` | https://bill42362.github.io/mortals-journey-rmmz/develop/ |

> ⚠️ 子資料夾網址結尾的 `/` 不可省（RMMZ 以相對路徑載素材）。
> 存檔存在瀏覽器本機（localStorage），換瀏覽器 / 清快取會消失。

## 專案結構

```
.
├─ game/    # RMMZ 專案本體（game/ 本身即專案根，含 index.html）
├─ docs/    # 專案文件（見下）
├─ README.md
└─ CLAUDE.md
```

## 文件導覽

| 文件 | 內容 |
| --- | --- |
| [docs/SPEC.md](docs/SPEC.md) | 專案目的、範圍、驗收條件、商業目標 |
| [docs/TECH.md](docs/TECH.md) | 技術選型、架構、系統元件規劃、素材清單 |
| [docs/ROADMAP.md](docs/ROADMAP.md) | 開發階段與追蹤列表 |
| [docs/PLUGINS.md](docs/PLUGINS.md) | 外掛啟用總表與安裝/驗證 SOP（本機設定必讀） |
| [docs/story/](docs/story/) | 各章節劇情、地圖、事件、對話 |
| [CLAUDE.md](CLAUDE.md) | AI 協作 context、關鍵決策紀錄與工作流規範 |

## 技術骨架

RPGMaker MZ + VisuStella MZ 外掛生態（10 模組）；原生回合制戰鬥。選型與決策細節見 [docs/TECH.md](docs/TECH.md)。

## 本機設定

要在本機跑出完整外掛環境，需照 [docs/PLUGINS.md](docs/PLUGINS.md) 安裝並啟用 VisuStella 外掛（付費 `.js` 需自備，放入 `game/js/plugins/`，依指定 tier 順序載入）。`game/` 本身即 RMMZ 專案根，用 MZ 編輯器開啟 `game/` 即可。

> ⚠️ 協作鐵則：**MZ 編輯器與 AI 不同時寫同一檔**——編輯器關閉後 AI 才動 `data/`。詳見 [CLAUDE.md](CLAUDE.md)。
