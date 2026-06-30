# TECH.md — 技術文件

> 技術選型、專案架構、元件規劃與技術債追蹤。
> 關鍵決策紀錄見 [CLAUDE.md](../CLAUDE.md)；本檔聚焦「怎麼做」。

---

## 1. 技術選型

| 項目 | 選擇 | 說明 |
| --- | --- | --- |
| 遊戲引擎 | **RPGMaker MZ** | 專案本體 = `data/*.json` + `js/plugins/*.js`，官方編輯器為正規操作工具。 |
| 戰鬥系統 | **原生回合制** | 承載「苟/逃跑/算計/資源」最直接；以 VisuStella Battle Core 強化。 |
| 外掛骨架 | **VisuStella MZ** | 戰鬥、技能狀態、道具裝備、訊息、合成、技能習得統一生態，降低相容風險。 |
| 程式語言 | JavaScript（外掛） | AI 主要產出面。 |
| 版本控制 | git | `js/`、`docs/`、`data/`（正規化後）皆追蹤。 |

### 1.1 VisuStella 啟用模組（✅ 已定稿 2026-06-30）

Demo 啟用 **10 個 VisuStella 模組**。**載入順序 = tier 數字升冪**（檔名前綴 `VisuMZ_<tier>_` 即 tier；低 tier 先載、高 tier 後載），下表已按外掛管理器（Plugin Manager）由上至下的正確順序排列：

| # | 模組（檔名即載入順序） | Tier | 用途 | 對應系統 | 相依 |
| --- | --- | :---: | --- | --- | --- |
| 1 | `VisuMZ_0_CoreEngine` | 0 | 基礎依賴、畫面適配 | 全部 | — |
| 2 | `VisuMZ_1_BattleCore` | 1 | 戰鬥強化、逃跑/先制控制 | 回合戰鬥、「苟」 | CoreEngine |
| 3 | `VisuMZ_1_SkillsStatesCore` | 1 | 技能/狀態擴充 | 技能功法 | CoreEngine |
| 4 | `VisuMZ_1_ItemsEquipsCore` | 1 | 道具/裝備擴充 | 丹藥、法寶 | CoreEngine |
| 5 | `VisuMZ_1_MessageCore` | 1 | 對話強化、i18n Text Language | 劇情文本、§1.3 多語系 | CoreEngine |
| 6 | `VisuMZ_1_EventsMoveCore` | 1 | 事件/移動強化、視野/追逐 | 地圖事件、潛行/伏擊、§1.4 可見遇敵 | CoreEngine |
| 7 | `VisuMZ_1_OptionsCore` | 1 | 選項選單擴充 | i18n 語言切換 UI | CoreEngine |
| 8 | `VisuMZ_1_SaveCore` | 1 | 存檔擴充、autosave | 網頁存檔體驗 | CoreEngine |
| 9 | `VisuMZ_2_SkillLearnSystem` | 2 | 顯式習得技能 | **功法 / 典籍參悟** | CoreEngine；配合 SkillsStatesCore |
| 10 | `VisuMZ_2_ItemCraftingSys` | 2 | 配方合成 | **煉丹**（製符同框架） | CoreEngine；**硬性需 ItemsEquipsCore（須在其上）** |

**定稿規則與注意事項（依官方 Yanfly.moe Wiki 確認）**：

1. **Tier 升冪載入**：Tier 0 → 1 → 2，務必由上至下照上表順序排。同一 tier 內各模組彼此無硬相依，順序可互換，但建議維持上表順序以利對照官方文件。
2. **CoreEngine 是全體地基**：所有 VisuStella 外掛皆依賴它，永遠放第一。
3. **唯一明確跨模組硬相依**：`ItemCraftingSys` **必須**有 `ItemsEquipsCore` 且置於其上（本清單已滿足）。
4. **SkillLearnSystem** 無強制相依，但設計上配合 `SkillsStatesCore` 管理技能，兩者同時啟用（本清單已滿足）。
5. **不可改檔名**：tier 系統由檔名前綴判定，`VisuMZ_<tier>_<Name>` 不可重命名。
6. **自製外掛載入位置**：所有 `MJ_*.js`（見 §1.2）皆掛鉤 VisuStella，**一律排在全部 VisuStella 模組之下**（清單最末）。
7. **版本**：採購時一次取齊同一批（同期版本）以避免跨版本相容問題；升級時整批同步。
8. **授權**：VisuStella MZ 為付費外掛，本作為非商業二創可用，但**網頁部署會公開外掛原始碼**——公開散布授權須於對外宣傳前確認（非阻擋項，見 [§7.3](#73-公開散布的版權處置已決策)）。

> 來源：[Core Engine](https://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ)、[Skill Learn System](https://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ)、[Item Crafting System](https://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ)（Yanfly.moe Wiki）。
>
> ✅ **實機載入驗證 (B) 通過（2026-06-30）**：10 個外掛照序啟用、playtest 無紅字報錯、smoke test 通過。安裝 SOP 見 [PLUGINS.md](./PLUGINS.md)。

### 1.2 需自製的外掛

| 外掛 | 職責 | 備註 |
| --- | --- | --- |
| `MJ_GreenBottle.js` | 小綠瓶：加速靈藥生長的時間機制 | 與種植耦合，核心樞紐 |
| `MJ_HerbFarming.js` | 靈草種植/催化：地塊、生長階段、收成 | 傾向自製（需與小綠瓶綁定） |
| `MJ_Realm.js` | 境界系統：境界鏡像變數、瓶頸/突破流程封裝 | 見 §3 |
| `MJ_LootAndPK.js`（暫名） | 殺人奪寶：屍體掉寶、伏擊判定 | 輕量，事件為主、外掛輔助 |
| `MJ_FillWindow.js` | ✅ 已實作：桌面瀏覽器預設拉伸填滿視窗（覆寫 `Graphics._defaultStretchMode`） | 純獨立覆寫、不依賴 VisuStella；為 GitHub Pages 試玩體驗 |
| `MJ_Font.js` | ✅ 已實作：注入 Noto Sans TC 的 @font-face CSS（unicode-range 分塊）並設為主字型 | 字型檔在 `game/fonts/noto_sans_tc_regular/`；覆寫 `Game_System.mainFontFace`，須排 VisuStella 之後 |

> ⚠️ 載入位置：**掛鉤 VisuStella** 的 `MJ_*.js`（GreenBottle/HerbFarming/Realm/LootAndPK）與**覆寫 Game_System 的 `MJ_Font`** 須排在 §1.1 全部 VisuStella 模組**之下**（清單最末）。**不依賴 VisuStella 的獨立覆寫**（如 `MJ_FillWindow`，僅改 `Graphics`）位置不拘。

### 1.3 多語系 (i18n) 方案（✅ 已定案 2026-06-30：第一天就 i18n-ready）

**決策**：自 demo 第一天起即採 i18n-ready 撰寫，所有玩家可見文本以翻譯 key 撰寫，不寫死字串。

**機制**：複用 **`VisuMZ_1_MessageCore` 內建的 Text Language 切換功能**（已在 §1.1 清單，**無需額外外掛**）。

- **翻譯資料檔**：TSV（tab 分隔，官方因逗號與中文標點衝突已棄 CSV 改推 TSV），置於 `game/data/`（檔名於 MessageCore 參數設定）。結構為 `Key` 欄 + 各語言欄：

  | Key | Chinese | English | Japanese |
  | --- | --- | --- | --- |
  | `op_sanshu_recruit` | 七玄門在招外門弟子…… | The Seven Mysteries Sect… | …… |

- **預設語言 = Chinese**（中文為母語版，先填滿；其他語言欄日後補譯，可留空待譯）。
- **引用語法**：文本中用 `\tl{key}`（亦支援 `\translate{}`/`\loc{}`）。key **不分大小寫**、會去除尾端空白。
- **逐語言字型/圖片**：MessageCore 支援為各語言指定字型（中/日/英字型分離很實用）與換圖。

**Key 命名慣例（AI 產出一致性的關鍵，務必遵守）**：

```
<章節碼>_<事件或角色>_<用途>[_序號]
```

- 章節碼：`op`(序章) / `a1`(第一幕) / `a2` / `a3` / `fin`(壓軸)
- 跨章共用：`sys_`(系統) / `ui_`(介面) / `item_` / `skill_` / `class_`
- 範例：`op_narr_intro`(序章開場旁白)、`op_hanmu_01`(韓母台詞1)、`op_sanshu_recruit`、`op_choice_shortcut_prompt`

**工作流規則**：

1. **寫對話即寫 key**：每新增一句玩家可見文本，同步在 TSV 補一列 `key + 中文`。事件裡只放 `\tl{key}`。
2. **TSV 位於 `data/`**：受唯一鐵則約束（編輯器關閉後 AI 才動），由 AI 以產生器/編輯維護；MZ 編輯器本身不管理此檔，衝突風險低。
3. **劇情文件雙寫**：`docs/story/` 為可讀性仍寫中文全文，並標註對應 key，便於人工校稿；TSV 為執行期真實來源。

**✅ 骨架已建（2026-06-30）**：

- **檔案**：`game/data/Languages.tsv`（表頭 `Key⇥Chinese(Traditional)⇥English`），已填序章 31 個 key 的繁中；English 欄留空**待譯**（切到 English 會顯示空白屬正常）。
- **外掛參數**（`plugins.js` 內 MessageCore `Localization:struct`，已由 AI 寫入）：`Enable=true`、`LangFiletype=tsv`、`TsvFilename=Languages.tsv`、`DefaultLocale=Chinese(Traditional)`、`Languages=["Chinese(Traditional)","English"]`、選項名 `語言`。
- **runtime 文字正規化慣例**（docs 全文 → TSV 時）：剝除**非顯示**標記——旁白/說話情境標籤（`〔旁白〕`、`（畫外）`、`（再次對話）`、`（選項）`…）、機制結果括註（`〔獲得 X〕`、`〔失去 X〕`，改由事件指令處理）、暫定註記（`⚠️暫定…`）；只留玩家實際讀到的散文。
- **驗收**：playtest 開 Options 應見「語言」項；序章事件改用 `\tl{key}` 後文字應正確顯示繁中。
- **DB 名稱例外**：`data/*.json` 內道具/技能/職業/敵人名（如「韓立」「野狗」）依[已知限制](#)不保證吃 `\tl{}`，demo 以中文直寫（中文為主，無礙）。

**⚠️ 已知限制（i18n 待驗證項）**：`\tl{}` 在「會解析文字代碼處」最穩（對話訊息）。**資料庫名稱**（道具/技能/職業名，存 `data/*.json`）與**外掛參數文字**不一定吃 `\tl{}`——要做到「遊戲內 100% 切語言」這些需逐一驗證對策。對 demo（中文為主）無礙；真正多語系上架前須確認 DB/參數類文本的本地化途徑。

> AI 主導的有利點：日後若資料庫類文本需本地化，可由產生器腳本掃 `data/*.json` + 外掛參數批次抽出對照表，retrofit 成本遠低於一般團隊。

### 1.4 其他奠基決策（✅ 已定案 2026-06-30：晚改會痛，奠基期一次鎖定）

判準：**會改存檔結構 / 會改解析度 / 會改「每份內容的撰寫方式」** 的才在奠基期鎖；純加法外掛一律延後（抗 scope creep）。

| 決策 | 定案 | 為何現在鎖 | 實作 |
| --- | --- | --- | --- |
| **螢幕解析度** | **1280×720（16:9）** ✅ 已設定 | 地圖照解析度繪製，晚改＝重畫所有地圖 | **不在 CoreEngine**（其 `Screen Resolution Settings` 僅適配/重定位）；改 `data/System.json` 的 `advanced.screenWidth/screenHeight/uiAreaWidth/uiAreaHeight` + `package.json` 的 `window.width/height` |
| **遭遇戰形式** | **可見踩觸遇敵**（地圖上看得見敵人，可繞過/埋伏/被偷襲） | 決定每張地圖敵人事件擺法；直接承載「苟/避戰/先制/被偷襲」核心精神 | 既有 `EventsMoveCore` + `MJ_LootAndPK`（視野/追逐/伏擊），**無需新外掛** |
| **中文字型內嵌** | **Noto Sans TC**（SIL OFL，可商用可散布）🟢 已接線（待 playtest 確認） | 網頁部署預設字型不保證涵蓋全中文 → 某些瀏覽器出「豆腐方塊」 | `MJ_Font.js` 注入 unicode-range 分塊 CSS（`game/fonts/noto_sans_tc_regular/`）並覆寫主字型；見 §1.2 |

**追加外掛（✅ 已採納 2026-06-30，併入 §1.1 Tier 1）**：

| 外掛 | Tier | 理由 |
| --- | :---: | --- |
| `VisuMZ_1_OptionsCore` | 1 | i18n 是 day-1，語言切換 UI 住在選項選單，有它更可控 |
| `VisuMZ_1_SaveCore` | 1 | 網頁存檔在 localStorage，清快取/換瀏覽器即失；autosave 降低試玩者「進度蒸發」之痛 |

**明確延後（純加法、晚裝零返工，抗 scope creep）**：HUD、任務日誌(QuestSystem)、圖鑑、動態立繪、戰鬥特效、天氣/光影、選單/標題美化、五行靈根屬性(ElementStatusCore，demo 範圍未列)。

> watch item：若日後要做原著「五行靈根」屬性，`ElementStatusCore` 會碰角色/敵人資料，屆時有中等 retrofit；demo 不做，心裡有數即可。

---

## 2. 專案架構

```
mortals-journey-rmmz/
├─ game/              # RMMZ 專案本體（目前空，文件階段）
│  ├─ data/           # JSON 資料庫（AI 產生器輸出，編輯器關閉才動）
│  ├─ js/plugins/     # 外掛（AI 全權、git 追蹤）
│  └─ img/ audio/ ... # 素材（內建 + 擴充包）
├─ docs/              # 文件
│  ├─ SPEC.md  TECH.md  ROADMAP.md
│  └─ story/          # 各章節資料
├─ README.md
└─ CLAUDE.md          # AI 協作 context
```

### 2.1 source of truth 分權（7.5 混合分權）

> **唯一鐵則：編輯器與 AI 不同時寫同一檔——「MZ 編輯器關閉後，AI 才動 `data/`」。**
> 其餘皆為「慣例/實務考量」，非硬性禁止。只要編輯器已關閉，AI 可協助修改 `data/` 內任何內容（含 tile 圖層與地圖事件）。

| 資產 | 主要擁有者 | 慣例（編輯器關閉時 AI 仍可協助） |
| --- | --- | --- |
| 地圖 tile 圖層 | 人類為主 | 慣例人工繪製；**手改大型 tile 數字陣列易錯且低效**，故 AI 偏向局部修正/校正，而非整圖手刻 |
| 地圖事件 | AI / 人類皆可 | 儘量薄殼化（呼叫共通事件）以利維護；AI 可直接修改 |
| 共通事件 / 資料庫 | AI（產生器腳本） | 大量內容用腳本輸出合法 JSON |
| `js/plugins/` 與參數 | AI | git 追蹤 |

### 2.2 AI 協作的能與限

- **AI 強項（可大量產出）**：外掛開發（JS）、劇本/對話/道具技能文本、資料庫批次內容（產生器腳本輸出 JSON）、共通事件邏輯。
- **保留人工**：地圖 tile 繪製（慣例）、資料庫在編輯器內的最終確認、試玩驗收、外掛安裝設定。
- **務實期望**：AI 可扛 **70–85% 產出量**，但**無法 100% 無人化**；需求「最小化人工、可能僅剩地圖繪製」方向正確，惟人類仍需承擔上述確認/驗收。
- **驗證限制**：MZ 無 headless 建置/測試；緩解 = 可測邏輯抽純 JS 外掛做單元測試 + playtest 檢查清單（見 §8）。

---

## 3. 境界資料模型（決策 7.3）

**核心：職業=境界、等級=層、等級上限=撞瓶頸、突破=事件、功法=顯式習得。**

```
凡人(class) ──升級熬層──► 練氣(class) ──升級熬13層(等級區間)──► 築基(class)
                  ▲                          ▲
              突破事件                    突破事件
        (七玄門 練氣功法傳承)      (吃築基丹 + 過血色試煉 → Change Class)
```

- **境界 = 職業（Class）**：demo 三職業 `凡人 / 練氣 / 築基`，各自有屬性成長曲線。
- **層/重 = 等級**：練氣 13 層用**等級區間對應**，不開 13 個職業。
- **撞瓶頸 = 等級上限**：到頂無法靠升級跨境界，迫使玩家走突破劇情。
- **突破 = 事件**：消耗條件（如築基丹 + 試煉達成）後 `Change Class` 進階，凸顯「突破有重量」。
- **功法 = VisuStella Skill Learn System 顯式習得**：跨境界保留，acquisition 來源即「典籍參悟」（消耗典籍/感悟資源）。
- **境界鏡像變數**：`MJ_Realm.js` 維護一個變數同步當前境界，供事件條件判斷（比查 class 省事）。

---

## 4. 七大核心系統元件規劃

| # | 系統 | 實作路徑 | 主要依賴 |
| --- | --- | --- | --- |
| 1 | 神秘小綠瓶 | 自製外掛 + 變數計時；驅動種植加速 | `MJ_GreenBottle.js` |
| 2 | 靈草種植/催化 | 自製外掛：地塊狀態機（播種→生長→可採），受小綠瓶加速 | `MJ_HerbFarming.js` |
| 3 | 技能/功法 | 原生技能 + Skill Learn System 顯式習得 | `SkillsStatesCore`, `SkillLearnSystem` |
| 4 | 煉丹 | 配方合成（消耗素材→產丹）；築基丹為壓軸關鍵 | `ItemCraftingSys` |
| 5 | 回合戰鬥 | 原生回合制 + Battle Core；調逃跑率/先制承載「苟」 | `BattleCore` |
| 6 | 採藥/闖關 | 地圖事件（薄殼）+ 共通事件；血色試煉為主舞台 | 共通事件 + `EventsMoveCore` |
| 7 | 輕量殺人奪寶 | 屍體掉寶、伏擊；事件為主、外掛輔助 | `MJ_LootAndPK.js` |

> 註：典籍參悟、製符視為既有框架的延伸（Skill Learn / Item Crafting），demo 視進度納入。

---

## 5. 戰鬥設計要點（承載核心精神）

- **逃跑永遠合法**：提高逃跑成功率、降低逃跑懲罰，讓「逃」是合法選項（精神 a）。
- **先制/被偷襲**：偵查、埋伏給先制；莽撞觸發被偷襲。
- **資源稀缺**：丹藥/符/靈石為關鍵消耗品，準備度 > 數值（精神 d）。
- **成長扎實**：經驗曲線陡、境界靠突破事件，不靠跳級（精神 b）。

---

## 6. 素材資源清單

原則：**優先使用 MZ 內建素材**。除 MZ 本體外，已購買下列擴充組合包可供活用：

| # | 組合包 | 備註 |
| --- | --- | --- |
| a | RPG Maker MZ × VX Ace Bundle | 素材轉用 |
| b | RPGツクールMZ × Cthulhu Mythos ADV 闇に囁く狂気 | 陰森/詭異風素材 |
| c | MZ × Custom Menu Editor | 自訂選單 |
| d | 2026 MZ Spring Special | — |
| e | Tileset Builder × Pocket Valley Graphic pack Bundle | tileset |
| f | MZ & Card Game Combat Bundles | 卡牌戰鬥（demo 不採用，回合制） |
| g | MZ + Tools Bundle | 工具 |
| h | RPG MAKER MZ × ACTION GAME MAKER | ⚠️ **獨立引擎，非 MZ 外掛**，不可併入；僅素材可能可轉用 |
| i | RPGツクールXP × RPGツクールMZ | 素材轉用 |
| j | RPG Maker MV × MZ Bundle | 素材轉用 |
| k | RPG Maker MZ × Action Combat Plugin | ARPG 外掛，**與回合制二擇一**；demo 不採用，留作後期 |
| l | 2026 MZ Summer Special | — |

> **風格多樣性 = 設計資產（而非風險）**：凡界篇橫跨不同地域乃至大陸，環境風貌本就迥異，因此跨包混搭反而有助於「一地一風貌」的世界感。
> **策略：依地域指派風格家族**，例如——
> - 青牛鎮：樸實鄉村（內建 + Pocket Valley）
> - 七玄門：正統宗門
> - 黃楓谷百藥園：藥香靈秀
> - 血色禁地：詭譎驚悚（可用 **Cthulhu Mythos 包 b** 營造禁地恐怖感）
>
> **唯一原則：同一場景/地域內保持一致**，避免看起來像隨意拼貼；地域之間則刻意求變。

**角色素材風格家族（✅ 定調 2026-06-30）**：鎖定「**MZ 動漫高解析**」family（內建 RTP / NpcResourcePack / ISEKAI / **MV Trinity**）。東亞修仙味以 **MV Trinity Resource Pack** 為主來源——其 enemies 含功夫高手/忍者/僵屍/隱士/妖獸神獸（妲己、九尾、神龍、刑天、鴆鳥…），是修仙敵人金礦。**REFMAP（SD 小頭娃娃 family）不採用**，與動漫風混用會打架。序章 cast 實際選用見 [story/00 §10](story/00-序章-青牛鎮.md)。

---

## 7. 部署：CI/CD × GitHub Pages（網頁試玩）

**結論：技術上可行。** RPGMaker MZ 本質為 HTML5 遊戲（PixiJS），專案根目錄即含 `index.html`，整個 `game/` 就是可直接託管的靜態網站；桌面版的 NW.js 只是包裝。

### 7.1 部署方式

- GitHub Pages = 靜態託管，與 MZ 網頁版天然相容。
- **CI 不需 MZ 編輯器**：編輯器的「web deploy」僅做排除未用檔/壓縮/加密，無 headless CLI，CI 直接略過——專案本身即可跑。
- 流程：`push main` → GitHub Action 將 `game/`（含 `index.html`）作為 Pages artifact → 部署。
- 建議用官方 `actions/configure-pages` + `upload-pages-artifact` + `deploy-pages`（權限 `pages: write`、`id-token: write`）。

### 7.2 技術注意事項

| 項 | 風險 | 緩解 |
| --- | --- | --- |
| **檔名大小寫** | Pages（Linux）區分大小寫，Windows 編輯器不分；路徑大小寫不符本機正常、線上壞掉 | CI 加大小寫一致性檢查；維持命名紀律 |
| **音訊格式** | iOS/Safari 需 `.m4a` | 同時帶 `.ogg` + `.m4a` |
| **repo 肥大** | img/audio 二進位塞 git 會膨脹 | Git LFS，或素材於 CI 階段帶入 |
| **存檔** | 網頁存 localStorage/IndexedDB，換瀏覽器/清快取即失，無法跨裝置 | 接受限制；可評估雲端存檔（demo 不做） |
| **容量** | Pages 站點建議 <1GB、單檔 <100MB | demo 量級可控，留意音訊 |

### 7.3 公開散布的版權處置（已決策）

**決策：公開部署，不因版權自我設限。** 本作為**非商業**同人/二創，緩解方式為**於起始畫面放置版權免責聲明**。

- **IP 版權**：《凡人修仙傳》為他人作品，本作為非商業致敬/二創；以起始畫面免責聲明處置，不視為部署阻擋項。
- **付費資產/外掛授權**：網頁部署會公開所有程式碼與素材（MZ 加密形同虛設）。VisuStella 外掛、付費擴充包的公開散布授權為**待辦提醒**（非阻擋項），日後對外宣傳前順手確認即可。

> 註：repo 設 private 僅保護「原始碼 repo」不被公開瀏覽；**GitHub Pages 部署出的網站在個人帳號（Free/Pro）仍為公開網址**（私有 Pages 存取控制需 Enterprise Cloud）。既已決定公開，此點不構成問題。

### 7.4 部署 workflow（per-branch 預覽路由）

採用 **`gh-pages` 分支 + 子資料夾**模式，讓每個 branch 有獨立預覽路由：

| Branch | gh-pages 位置 | 網址 |
| --- | --- | --- |
| `main` | 根目錄 | `https://<user>.github.io/<repo>/` |
| `develop` | `develop/` | `https://<user>.github.io/<repo>/develop/` |
| 其他 | `<branch>/`（`/`→`-`） | `https://<user>.github.io/<repo>/<branch>/` |

- 為何不用官方「GitHub Actions」來源：該方式單一 artifact 整站覆蓋，無子路徑概念，無法做 per-branch。
- **RMMZ 用相對路徑載入素材**，子資料夾託管天生可跑，無需設 base path。
- workflow：
  - [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)：push 任一分支 → 建置 → 推至 gh-pages 對應子資料夾（`keep_files: true` 互不覆蓋；序列化避免 push 競態）。
  - [`.github/workflows/cleanup-preview.yml`](../.github/workflows/cleanup-preview.yml)：branch 刪除時自動移除其預覽子資料夾。
- **防呆**：`game/index.html` 不存在時略過部署（不失敗），故 `game/` 空亦安全。
- 內含**檔名大小寫衝突檢查**（防 Linux 區分大小寫的經典雷）。

**啟用步驟（需手動一次）**：repo Settings → Pages → Source 選「**Deploy from a branch**」→ 分支 `gh-pages`、目錄 `/(root)`。
（此設定**取代**先前的「Source = GitHub Actions」。）

**注意**：所有分支建置都存進同一 `gh-pages` 分支，分支多時該分支會膨脹（每份含完整素材）；cleanup workflow 可回收已刪分支，但活躍分支多仍需留意容量。

---

## 8. 技術債追蹤

| 項目 | 狀態 | 備註 |
| --- | --- | --- |
| VisuStella 模組清單定稿 | 🟢 已定稿並實機驗證通過（2026-06-30，見 §1.1 / PLUGINS.md） | 含載入順序與授權確認 |
| 多語系 (i18n) 方案 | 🟢 已定案（2026-06-30，見 §1.3：MessageCore TSV、i18n-ready） | DB/參數類文本本地化途徑待驗證 |
| 經濟與貨幣模型 | 🟢 已定案（2026-06-30，見 §9：雙層貨幣、靈石=道具） | 靈石兌換窗（CE 或小外掛）、各章定價待 M4 平衡 |
| 境界屬性成長曲線數值 | 🔴 未開始 | 三職業參數 |
| 種植系統自製 vs 現成外掛 | 🟡 評估中 | 傾向自製 |
| `data/*.json` 正規化流程 | 🔴 未開始 | 利於 git diff |
| 無 headless 驗證的替代方案 | 🟡 構想 | 可測邏輯抽純 JS 外掛做單元測試 + playtest 清單 |
| GitHub Pages 部署 workflow | 🟢 已建立（防呆，待 game/ 就緒） | 公開部署，免責聲明處置版權 |
| 起始畫面版權免責聲明 | 🔴 未開始 | 公開部署的版權緩解措施 |
| 付費外掛/素材公開散布授權確認 | 🟡 待辦（非阻擋） | 對外宣傳前順手確認 |
| 素材納管策略（Git LFS） | 🔴 未開始 | 避免 repo 膨脹 |

---

## 9. 經濟與貨幣模型（決策 9，✅ 定案 2026-06-30）

**核心：雙層貨幣，凡俗與修仙兩條獨立軌道，承載「資源即生命」與原著「凡俗錢→靈石」的轉換。**

### 9.1 兩種貨幣

| 貨幣 | 實作 | 角色 | 出現階段 |
| --- | --- | --- | --- |
| **銅板（凡俗錢）** | **RMMZ 原生 gold（$）** | 凡俗交易；序章主角色。進修仙界後**刻意邊緣化**（修仙人眼裡如糞土） | 序章為主，之後僅零星凡俗 vendor |
| **低階靈石** | **可堆疊道具（key item）** | 修仙界**硬通貨**：功法習得、煉丹素材交易、突破、黑市、殺人奪寶掉落 | 第一幕中後段起 |

### 9.2 為何靈石用「道具」而非第二個原生貨幣

1. **承載「資源即生命」**：靈石是看得見、會心疼、每次花用都是明確抉擇的**囤積資源**，而非後台自動扣的數字。
2. **與外掛生態天生契合**：功法習得（SkillLearnSystem 原生支援**道具花費**）、煉丹（ItemCraftingSys 消耗素材）、殺人奪寶（`MJ_LootAndPK` 掉靈石/丹藥）——整條 loot→craft→learn 迴圈都吃道具。
3. **演出凡俗 vs 修仙的鴻溝**：序章為幾枚銅板精打細算 → 進七玄門才知靈石才是命。此「認知落差」本身即劇情。

### 9.3 靈石「一般買賣」的實作途徑

靈石店無法用原生金幣商店（原生 shop 綁 gold）。途徑（符合「事件邏輯集中到 CE＋外掛」工作流）：

- **功法習得**：SkillLearnSystem 設**道具花費 = 靈石**。
- **煉丹/製符**：ItemCraftingSys 配方以靈石為素材/成本之一。
- **一般兌換（買賣丹藥/素材）**：**共通事件兌換窗**（選項＋靈石道具數量條件判斷），或日後一支小 `MJ_` 外掛統一處理。
- **殺人奪寶掉落**：`MJ_LootAndPK` 屍體掉靈石/丹藥道具。

### 9.4 Demo 範圍與分章呈現

- **品階**：demo **只用低階靈石一階**（中/高階延後），降複雜度。
- **序章（青牛鎮·凡人）**：只有銅板，**靈石不出現**（與「序章不出現修為/小綠瓶」一致，製造期待）。
- **第一幕（七玄門·凡人→練氣）**：外門月例先以米糧/銅板呈現凡俗底層；接觸修仙後引入低階靈石，功法習得開始吃靈石。
- **第二～壓軸（黃楓谷·練氣）**：靈石成為主軸，採藥/煉丹/殺人奪寶全圍繞靈石與丹藥稀缺。

> 具體定價/掉落數值待 M4 平衡校；初期先求可玩。

---

## 10. UI／屬性詞彙表（Lexicon，✅ 已套用 2026-06-30）

> **正典詞彙：劇情、技能名、道具名、i18n key 一律沿用下表用字**，避免「劇情寫靈力、UI 寫 MP」之類不一致。已寫入 `data/System.json` 的 `terms`。

| RMMZ 概念 | 本作用字 | 備註 |
| --- | --- | --- |
| HP | **氣血** | |
| MP | **靈力** | 連動「靈攻/靈防」 |
| TP | （隱藏） | `optDisplayTp=false`；日後若用內力/絕招再開，暫名「真氣」 |
| Level (Lv) | **層** | 呼應境界模型「練氣 N 層」；完整「X 境 Y 層」由 `MJ_Realm` 呈現 |
| EXP | **修為** | |
| 金錢 (gold) | **銅板** | 原生貨幣，見 [§9](#9-經濟與貨幣模型決策-9-定案-2026-06-30) |
| 屬性 | 攻擊 / 防禦 / **靈攻** / **靈防** / **身法**(敏捷) / **機緣**(幸運) / 命中 / 閃避 | |
| 戰鬥指令 | 戰鬥 / **遁走**(逃跑) / 攻擊 / 防禦 / 道具 / **功法**(技能) | 「遁走」呼應「苟」 |
| 技能(skill) | **功法** | 與 SkillLearnSystem「功法習得」一致 |

**狀態**：`System.json terms`（基本/屬性/指令/戰鬥訊息）✅ 已全數中文化。**待補**：VisuStella 各外掛的參數字串（OptionsCore 選項名、煉丹/習得介面字串等），屬「外掛參數層」，漸進補譯。
