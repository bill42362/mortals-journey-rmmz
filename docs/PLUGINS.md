# PLUGINS.md — 外掛清單與安裝 SOP

> 本檔涵蓋兩類外掛：**第三方（VisuStella）**與**自製（`MJ_*`）**。
> 決策依據與理由見 [TECH §1.1](./TECH.md)(VisuStella 清單)、[§1.2](./TECH.md)(自製外掛)、[§1.3](./TECH.md)(i18n)、[§1.4](./TECH.md)(奠基決策)；本檔聚焦「有哪些、載入順序、參數、怎麼安裝驗證」。
>
> **兩類的管理方式不同**：
> - **第三方（VisuStella）**：付費下載的 `.js`，需人工在編輯器 Plugin Manager 安裝、排序、驗證（見 [§3](#3-第三方外掛visustella安裝與驗證-sop)）。
> - **自製（`MJ_*`）**：AI 直接撰寫、已登錄於 `js/plugins.js`、git 追蹤。**clone repo 即有，無需下載/安裝 SOP**；換機/新協作者拉下來就能跑（見 [§2](#2-自製外掛-mj_ai-全權git-追蹤)）。

---

## 1. 外掛載入總表（載入順序 = 由上至下）

**載入順序鐵則**：VisuStella 依 tier 數字升冪（檔名前綴 `VisuMZ_<tier>_`）；**所有 `MJ_*` 一律排在全部 VisuStella 之後**。Plugin Manager 內須照下表由上至下排列。

| 順序 | 外掛（檔名不可改） | 來源 | Tier | 用途 | 相依/載入位置 |
| :---: | --- | :---: | :---: | --- | --- |
| 1 | `VisuMZ_0_CoreEngine` | 第三方 | 0 | 基礎依賴、畫面適配 | 全體地基，永遠第一 |
| 2 | `VisuMZ_1_BattleCore` | 第三方 | 1 | 戰鬥強化、逃跑/先制控制 | CoreEngine |
| 3 | `VisuMZ_1_SkillsStatesCore` | 第三方 | 1 | 技能/狀態擴充 | CoreEngine |
| 4 | `VisuMZ_1_ItemsEquipsCore` | 第三方 | 1 | 道具/裝備擴充 | CoreEngine |
| 5 | `VisuMZ_1_MessageCore` | 第三方 | 1 | 對話強化、i18n Text Language | CoreEngine |
| 6 | `VisuMZ_1_EventsMoveCore` | 第三方 | 1 | 事件/移動強化、視野/追逐 | CoreEngine |
| 7 | `VisuMZ_1_OptionsCore` | 第三方 | 1 | 選項選單擴充(語言切換 UI) | CoreEngine |
| 8 | `VisuMZ_1_SaveCore` | 第三方 | 1 | 存檔擴充、autosave | CoreEngine |
| 9 | `VisuMZ_2_SkillLearnSystem` | 第三方 | 2 | 顯式習得功法（配置見 §2.3） | CoreEngine；配合 SkillsStatesCore |
| 10 | `VisuMZ_2_ItemCraftingSys` | 第三方 | 2 | 配方合成/煉丹（配置見 §2.3） | CoreEngine；**硬性需 ItemsEquipsCore 在其上** |
| 11 | `MJ_FillWindow` | 自製 | — | 桌面瀏覽器拉伸填滿視窗 | 僅改 `Graphics`，位置不拘（慣例置此） |
| 12 | `MJ_Font` | 自製 | — | 內嵌 Noto Sans TC 字型 | 覆寫 `Game_System`，須在 VisuStella 後 |
| 13 | `MJ_Realm` | 自製 | — | 境界系統（職業=境界、突破） | 覆寫 `Game_Actor`，須在 VisuStella 後 |
| 14 | `MJ_GreenBottle` | 自製 | — | 小綠瓶（靈液產出） | **須在 `MJ_HerbFarming` 之上** |
| 15 | `MJ_HerbFarming` | 自製 | — | 靈草種植（靈液消耗） | **依賴 `MJ_GreenBottle`** |
| 16 | `MJ_LootAndPK` | 自製 | — | 殺人奪寶（掉寶＋伏擊） | 覆寫 `BattleManager`，須在 VisuStella 後 |

### 關鍵規則

- **不可改檔名**：VisuStella tier 由檔名前綴判定，`VisuMZ_<tier>_<Name>.js` 不可重命名。
- **同 tier 內順序可換**：Tier 1 的七個彼此無硬相依，但建議維持上表順序以利對照官方文件。
- **VisuStella 唯一硬相依**：`ItemCraftingSys` 必須有 `ItemsEquipsCore` 在其上（本清單已滿足）。
- **`MJ_*` 順序**：全排在 VisuStella 之後；其中 **`MJ_GreenBottle` 須在 `MJ_HerbFarming` 之上**（後者呼叫前者扣靈液），其餘 `MJ_*` 彼此無硬相依。
- **同批版本**：VisuStella 一次取齊同期版本，避免跨版本相容問題；升級整批同步。

---

## 2. 自製外掛 `MJ_*`（AI 全權、git 追蹤）

> 由 AI 直接撰寫並登錄於 `js/plugins.js`，**無需第 3 節的下載安裝 SOP**。詳細用法見各 `.js` 檔頭 `@help`；下表為索引。設計職責與定位見 [TECH §1.2](./TECH.md)。

### 2.1 奠基/體驗類（已實作）

| 外掛 | 職責 | 參數 |
| --- | --- | --- |
| `MJ_FillWindow` | 桌面瀏覽器預設拉伸填滿視窗（GitHub Pages 試玩體驗） | 無 |
| `MJ_Font` | 注入 Noto Sans TC（unicode-range 分塊）並設為主字型，防繁中豆腐字 | 無；字型檔在 `game/fonts/noto_sans_tc_regular/` |

### 2.2 核心系統類（已實作 2026-07-05/06）

> ⚠️ 數值（層數上限、靈液產量、生長步數…）皆 **placeholder 待 M4 平衡**，多可於各外掛檔頭常數或參數調整。

**`MJ_Realm` — 境界系統**（見 [TECH §3](./TECH.md)）
- 職責：職業＝境界、等級＝層、等級上限＝撞瓶頸、突破＝`Change Class` 事件；維護境界鏡像變數供事件判斷。
- 資料相依：`Classes.json` 需有 **練氣(classId 9)／築基(classId 10)**（已建，clone 凡人）；層數上限暫定 **凡人 3／練氣 13／築基 10**（改檔頭 `REALMS` 常數）。
- 參數：境界主角＝`actor 1`（韓立）、境界鏡像變數＝**變數 2**（1凡/2練/3築）。
- 事件介面：插件指令 `境界突破`（EV-13 凡人→練氣、壓軸 練氣→築基）、`同步境界鏡像變數`；腳本 `MJ.Realm.atCap()／canBreakthrough()／breakthrough()／is('練氣')／tierOf()`。

**`MJ_GreenBottle` — 小綠瓶（靈液產出端）**（見 [TECH §1.2](./TECH.md)、memory: green-bottle-canon）
- 職責：承月光滋生「靈液」（稀缺、受夜間節流），供 `MJ_HerbFarming` 澆灌消耗。**非滴血、非種瓶中**。
- 參數：靈液滴數＝**變數 3**、儲量上限 3、每次承月光 +1、已取得小綠瓶開關＝0(未設限，EV-09 拾瓶後可指向開關)。
- 事件介面：插件指令 `承月光／增加靈液／消耗靈液`；腳本 `MJ.GreenBottle.liquid()／canSpend(n)／owned()`（後者供 EV-19 判斷綠液分配是否達戰鬥門檻）。

**`MJ_HerbFarming` — 靈草種植（靈液消耗端）**（見 [TECH §1.2](./TECH.md)）
- 職責：多地塊狀態機（播種→生長→可採）；自然生長靠步數緩慢累積、以靈液澆灌大幅催長。承載「熬 vs 催」。
- 參數：澆灌 +2 階（耗 1 滴靈液）、自然生長 200 步/階（0＝不自然生長）。地塊狀態存 `$gameSystem`（隨存檔）。
- 事件介面：插件指令 `播種／澆灌地塊／推進生長／採收／清空地塊`；腳本 `MJ.HerbFarming.isMature(plotId)／isEmpty／stage`。地塊以整數 `plotId` 編號（跨地圖不重複）。

**`MJ_LootAndPK` — 輕量殺人奪寶**（見 [TECH §4](./TECH.md)、[story/01 §7.6](./story/01-第一幕-七玄門.md)）
- 職責：①屍體掉寶（可帶機率的掉落，含銅板/道具/靈石/丹方/書簡；具名表批次擲取）②伏擊判定（可見踩觸遇敵→先制/被偷襲）。
- ⚠️ **功法不在此習得**：殺人只掉《XX》書簡（道具），習得走書簡道具／SkillLearnSystem 參悟（正典：殺人→掉書簡→參悟→習得）。
- 事件介面：插件指令 `掉落·銅板／掉落·道具／發放具名掉落／伏擊判定／設定先攻`；腳本 `MJ.LootAndPK.rollLoot()／ambush(eventId)／judgeAmbush()`。伏擊透過覆寫 `BattleManager.setup` 套用一次性先攻旗標。
- 遇敵相容：可見踩觸遇敵（事件戰鬥，先攻走本外掛伏擊）與原生隨機遇敵（先攻走原生 `onEncounter`）**互不衝突**，可同圖並存（見 [TECH §1.4](./TECH.md)）。

### 2.3 VisuStella 資料層配置（本專案）

> 煉丹與功法習得**不是新外掛**，而是第三方 `ItemCraftingSys`／`SkillLearnSystem` 的配置。第一幕份已配（2026-07-06）。

- **選單入口關閉、改事件驅動**：兩者的常駐選單入口皆設 **關閉**（`SkillLearnSystem` MenuAccess `ShowMenu=false`、`ItemCraftingSys` MainMenu `ShowMainMenu=false`）——習得/煉丹一律由**事件/NPC 開啟場景**（拜師墨大夫、丹房、藏經閣），符合修仙敘事，並避免玩家在教學前提早取用。
- **煉丹配方**：以 `<Crafting Ingredients>` notetag 掛在**產出道具**的 note（`data/Items.json`）。第一幕（凡間製藥）：療傷丹←藥草×2、毒丹←高年份毒草×1、補藥←藥草×3。第二幕真煉丹另以靈石為成本（待配）。
- **功法習得成本**：以 `<Learn AP Cost: 0>`（移除 AP grind）＋ `<Learn Item 名稱 Cost: x>` notetag 掛在**功法 skill** 的 note（`data/Skills.json`）；可習得清單以 `<Learn Skills>` notetag 掛在**職業** note（`data/Classes.json`）。第一幕：長春功(免費,凡人可習)、火球術(耗火球術書簡×1,練氣可習)。第二幕起吃靈石。
- **功法 skill 類型**：韓立功法用 `stypeId 2`（三境界職業皆具此技能類型），`System.json` 已將 `skillTypes[2]` 正名為「功法」。

---

## 3. 第三方外掛（VisuStella）安裝與驗證 SOP

> 本節**只適用 VisuStella**（付費下載檔）。`MJ_*` 為 AI 撰寫、已在 repo，跳過本節。
> ⚠️ **唯一鐵則**：開編輯器期間 AI 不動 `data/`。開工前確認沒有 git 操作正在改 `data/`。

### Step 1 — 取得外掛檔

從你購買/下載 VisuStella 的來源(visustella.com / itch.io / Patreon)取得第 1 節表中 **10 個 `.js`**。`CoreEngine` 為免費基礎,其餘依已購 library。檔名保持原樣。

### Step 2 — 放置

把 10 個 `.js` 複製進 `game/js/plugins/`。

### Step 3 — 加入外掛(順序是關鍵)

1. 編輯器開啟 `game/` 專案 → **Tools → Plugin Manager**。
2. **雙擊空白列** → Name 選外掛 → Status 設 **ON** → 確定。
3. 逐一加入,**由上至下嚴格照第 1 節順序**(加錯位可拖曳調整)。`MJ_*` 已由 AI 寫入 `plugins.js`，開啟時會一併顯示於清單末，確認其在 VisuStella 之後即可。

> ✅ VisuStella 內建相依/順序檢查:順序錯或缺相依會跳警告對話框。沒跳警告 = 順序對了。

### Step 4 — 設定解析度 1280×720（檔案編輯，非編輯器參數）

> ⚠️ **VisuStella CoreEngine 沒有設定基礎解析度的參數**（其 `Screen Resolution Settings` 只是畫面適配/重定位，非設解析度本身）。RMMZ 的基礎解析度存在 **`game/data/System.json` 的 `advanced` 區塊**。

由 **AI 編輯這兩個檔**（`data/` 受鐵則約束，須編輯器關閉後才動）：

| 檔案 | 欄位 | 值 |
| --- | --- | --- |
| `game/data/System.json`（`advanced`） | `screenWidth` / `uiAreaWidth` | `1280` |
| | `screenHeight` / `uiAreaHeight` | `720` |
| `game/package.json`（`window`，桌面打包用） | `width` / `height` | `1280` / `720` |

改完重開編輯器 **Playtest** 確認畫面為寬螢幕 16:9。（CoreEngine 會自動適配此解析度。）

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
- [ ] 全程 console 無紅字（含 5 個 `MJ_*` 系統外掛乾淨載入）

### Step 8 — 完成後

1. **關閉編輯器**(鐵則:關了 AI 才能動 `data/`)。
2. 回報結果 → 由 AI git 追蹤提交 `game/js/plugins/`(.js)+ `game/js/plugins.js` + 解析度設定(`System.json` / `package.json`),並更新 [TECH §1.1](./TECH.md) 的驗證狀態。

---

## 4. 常見雷

| 症狀 | 多半原因 | 解法 |
| --- | --- | --- |
| 跳「place under lower tier」警告 | VisuStella 順序排錯 | 照第 1 節表拖曳重排 |
| 「requires VisuMZ_X」 | 缺相依或沒 ON | 確認 10 個 VisuStella 都在且 Status=ON |
| `MJ_HerbFarming` 澆灌無效/報錯 | `MJ_GreenBottle` 未在其上或未啟用 | 確認 GreenBottle 排在 HerbFarming 之上且 ON |
| 突破後屬性/技能異常 | `Classes.json` 缺 練氣(9)/築基(10) | 確認職業存在（見 §2.2 `MJ_Realm`） |
| 整片紅字 / 黑畫面 | 某 .js 版本不符或檔損 | 同批重新下載該 VisuStella 檔 |
| 中文顯示豆腐方塊 □□□ | 字型未內嵌 | 確認 `MJ_Font` 啟用、字型檔在位 |
| 解析度沒變 | 改錯地方（解析度在 `System.json`，非 CoreEngine） | 依 Step 4 改 `System.json`/`package.json`，重啟試玩 |

---

## 5. 延後安裝的外掛(抗 scope creep)

純加法、晚裝零返工者一律延後:HUD、任務日誌(QuestSystem)、圖鑑、動態立繪、戰鬥特效、天氣/光影、選單/標題美化、五行靈根屬性(ElementStatusCore,demo 範圍未列)。理由見 [TECH §1.4](./TECH.md)。
