# 凡人修仙傳 RMMZ（Mortal's Journey）

用 **RPGMaker MZ** 製作的《凡人修仙傳》凡界篇改編單機修仙 RPG。
第一階段為可玩 Demo，終點為「黃楓谷進階築基完成」（含血色試煉）。

> ⚠️ 目前處於**文件製作階段**，`game/` 尚未開始開發，故本檔內容從簡。
> 進入開發後，本檔將補上：元件架構、環境需求、如何在本地一鍵運行等。

## 專案結構

```
.
├─ game/    # RMMZ 專案本體（目前空）
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
| [docs/estimate.md](docs/estimate.md) | 可行性評估與關鍵決策紀錄 |
| [docs/story/](docs/story/) | 各章節劇情、地圖、事件、對話 |
| [CLAUDE.md](CLAUDE.md) | AI 協作 context 與工作流規範 |

## 技術骨架

RPGMaker MZ + VisuStella MZ 外掛生態；原生回合制戰鬥。細節見 [docs/TECH.md](docs/TECH.md)。
