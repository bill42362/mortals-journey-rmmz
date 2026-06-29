# PLUGINS.md — 外掛清單與安裝 SOP

> 給「要在 MZ 編輯器實際安裝/驗證外掛」的人(換機、新協作者亦可重用)。
> 決策依據與理由見 [TECH §1.1](./TECH.md)(VisuStella 清單)、[§1.3](./TECH.md)(i18n)、[§1.4](./TECH.md)(奠基決策)；本檔聚焦「照著做」。

---

## 1. 啟用外掛總表(載入順序 = 由上至下)

**載入順序鐵則 = tier 數字升冪**(檔名前綴 `VisuMZ_<tier>_` 即 tier;低 tier 先載)。Plugin Manager 內須照下表由上至下排列。

| 順序 | 外掛(檔名不可改) | Tier | 用途 | 相依 |
| :---: | --- | :---: | --- | --- |
| 1 | `VisuMZ_0_CoreEngine` | 0 | 基礎依賴、解析度設定 | — |
| 2 | `VisuMZ_1_BattleCore` | 1 | 戰鬥強化、逃跑/先制控制 | CoreEngine |
| 3 | `VisuMZ_1_SkillsStatesCore` | 1 | 技能/狀態擴充 | CoreEngine |
| 4 | `VisuMZ_1_ItemsEquipsCore` | 1 | 道具/裝備擴充 | CoreEngine |
| 5 | `VisuMZ_1_MessageCore` | 1 | 對話強化、i18n Text Language | CoreEngine |
| 6 | `VisuMZ_1_EventsMoveCore` | 1 | 事件/移動強化、視野/追逐 | CoreEngine |
| 7 | `VisuMZ_1_OptionsCore` | 1 | 選項選單擴充(語言切換 UI) | CoreEngine |
| 8 | `VisuMZ_1_SaveCore` | 1 | 存檔擴充、autosave | CoreEngine |
| 9 | `VisuMZ_2_SkillLearnSystem` | 2 | 顯式習得技能(功法/典籍參悟) | CoreEngine;配合 SkillsStatesCore |
| 10 | `VisuMZ_2_ItemCraftingSys` | 2 | 配方合成(煉丹) | CoreEngine;**硬性需 ItemsEquipsCore(須在其上)** |

**自製外掛(`MJ_*.js`,見 [TECH §1.2](./TECH.md))一律排在以上 10 個 VisuStella 模組之下(清單最末)。**

### 關鍵規則

- **不可改檔名**:tier 由檔名前綴判定,`VisuMZ_<tier>_<Name>.js` 不可重命名。
- **同 tier 內順序可換**:Tier 1 的七個彼此無硬相依,但建議維持上表順序以利對照官方文件。
- **唯一硬相依**:`ItemCraftingSys` 必須有 `ItemsEquipsCore` 在其上(本清單已滿足)。
- **同批版本**:一次取齊同期版本,避免跨版本相容問題;升級整批同步。

---

## 2. 安裝與驗證步驟(在 MZ 編輯器手動進行)

> ⚠️ **唯一鐵則**:開編輯器期間 AI 不動 `data/`。開工前確認沒有 git 操作正在改 `data/`。

### Step 1 — 取得外掛檔

從你購買/下載 VisuStella 的來源(visustella.com / itch.io / Patreon)取得第 1 節表中 **10 個 `.js`**。`CoreEngine` 為免費基礎,其餘依已購 library。檔名保持原樣。

### Step 2 — 放置

把 10 個 `.js` 複製進 `game/js/plugins/`。

### Step 3 — 加入外掛(順序是關鍵)

1. 編輯器開啟 `game/` 專案 → **Tools → Plugin Manager**。
2. **雙擊空白列** → Name 選外掛 → Status 設 **ON** → 確定。
3. 逐一加入,**由上至下嚴格照第 1 節順序**(加錯位可拖曳調整)。

> ✅ VisuStella 內建相依/順序檢查:順序錯或缺相依會跳警告對話框。沒跳警告 = 順序對了。

### Step 4 — 設定解析度 1280×720

1. 雙擊 `VisuMZ_0_CoreEngine` 開參數。
2. 找參數群組 **`Screen Resolution Settings`** → **`Resolution`** 下拉 → 選 **`1280x720`**。
3. 確定。

### Step 5 — 存檔

`File → Save`(`Ctrl+S`)。會把外掛清單寫入 `game/js/plugins.js`。

### Step 6 — 試玩並檢查 console

1. **Playtest**(綠色播放鍵 / `Ctrl+R`)。
2. 遊戲視窗按 **`F8`** 開 console。
3. 驗證:標題畫面正常、解析度為 1280×720 寬螢幕、console **無紅字錯誤**。

### Step 7 — 最小 smoke test

- [ ] 標題 → New Game 能進遊戲、不崩
- [ ] 角色能移動
- [ ] 開選單(Esc)各分頁正常
- [ ] 開 Options 正常(OptionsCore)
- [ ] 存檔 / 讀檔各一次(SaveCore)
- [ ] 全程 console 無紅字

> i18n 語言切換此階段**還不會出現**(TSV 翻譯檔尚未建立,屬 M1「i18n 骨架」任務)。本次只驗 10 外掛乾淨載入。

### Step 8 — 完成後

1. **關閉編輯器**(鐵則:關了 AI 才能動 `data/`)。
2. 回報結果 → 由 AI git 追蹤提交 `game/js/plugins/`(10 .js)+ `game/js/plugins.js` + CoreEngine 設定,並把 [TECH §1.1](./TECH.md) 的「待人工驗證 (B)」標記完成。

---

## 3. 常見雷

| 症狀 | 多半原因 | 解法 |
| --- | --- | --- |
| 跳「place under lower tier」警告 | 順序排錯 | 照第 1 節表拖曳重排 |
| 「requires VisuMZ_X」 | 缺相依或沒 ON | 確認 10 個都在且 Status=ON |
| 整片紅字 / 黑畫面 | 某 .js 版本不符或檔損 | 同批重新下載該檔 |
| 中文顯示豆腐方塊 □□□ | 字型未內嵌(預期內) | 屬 M1「CJK 字型」任務,本次先略 |
| 解析度沒變 | CoreEngine 沒 ON 或沒存檔 | 確認 #1 ON、已 `Ctrl+S`、重啟試玩 |

---

## 4. 延後安裝的外掛(抗 scope creep)

純加法、晚裝零返工者一律延後:HUD、任務日誌(QuestSystem)、圖鑑、動態立繪、戰鬥特效、天氣/光影、選單/標題美化、五行靈根屬性(ElementStatusCore,demo 範圍未列)。理由見 [TECH §1.4](./TECH.md)。
