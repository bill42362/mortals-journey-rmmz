# TECH.md — 技術文件

> 技術選型、專案架構、元件規劃與技術債追蹤。
> 決策的權威來源與理由見 [estimate.md §7](./estimate.md)；本檔聚焦「怎麼做」。

---

## 1. 技術選型

| 項目 | 選擇 | 說明 |
| --- | --- | --- |
| 遊戲引擎 | **RPGMaker MZ** | 專案本體 = `data/*.json` + `js/plugins/*.js`，官方編輯器為正規操作工具。 |
| 戰鬥系統 | **原生回合制** | 承載「苟/逃跑/算計/資源」最直接；以 VisuStella Battle Core 強化。 |
| 外掛骨架 | **VisuStella MZ** | 戰鬥、技能狀態、道具裝備、訊息、合成、技能習得統一生態，降低相容風險。 |
| 程式語言 | JavaScript（外掛） | AI 主要產出面。 |
| 版本控制 | git | `js/`、`docs/`、`data/`（正規化後）皆追蹤。 |

### 1.1 VisuStella 啟用模組（草案，待定稿）

| 模組 | 用途 | 對應系統 |
| --- | --- | --- |
| `VisuMZ_0_CoreEngine` | 基礎依賴 | 全部 |
| `VisuMZ_1_BattleCore` | 戰鬥強化、逃跑/先制控制 | 回合戰鬥、「苟」 |
| `VisuMZ_1_SkillsStatesCore` | 技能/狀態擴充 | 技能功法 |
| `VisuMZ_1_ItemsEquipsCore` | 道具/裝備擴充 | 丹藥、法寶 |
| `VisuMZ_1_MessageCore` | 對話強化 | 劇情文本 |
| `VisuMZ_1_EventsMoveCore` | 事件/移動強化 | 地圖事件、潛行/伏擊 |
| `VisuMZ_2_SkillLearnSystem` | 顯式習得技能 | **功法 / 典籍參悟** |
| `VisuMZ_2_ItemCraftingSys` | 配方合成 | **煉丹**（製符同框架） |

> ⚠️ 模組載入順序、版本與授權需於開發前一次性確認；混用非 VisuStella 外掛前先驗證相容性。

### 1.2 需自製的外掛

| 外掛 | 職責 | 備註 |
| --- | --- | --- |
| `MJ_GreenBottle.js` | 小綠瓶：加速靈藥生長的時間機制 | 與種植耦合，核心樞紐 |
| `MJ_HerbFarming.js` | 靈草種植/催化：地塊、生長階段、收成 | 傾向自製（需與小綠瓶綁定） |
| `MJ_Realm.js` | 境界系統：境界鏡像變數、瓶頸/突破流程封裝 | 見 §3 |
| `MJ_LootAndPK.js`（暫名） | 殺人奪寶：屍體掉寶、伏擊判定 | 輕量，事件為主、外掛輔助 |

---

## 2. 專案架構

```
mortals-journey-rmmz/
├─ game/              # RMMZ 專案本體（目前空，文件階段）
│  ├─ data/           # JSON 資料庫（AI 產生器輸出，編輯器關閉才動）
│  ├─ js/plugins/     # 外掛（AI 全權、git 追蹤）
│  └─ img/ audio/ ... # 素材（內建 + 擴充包）
├─ docs/              # 文件
│  ├─ SPEC.md  TECH.md  ROADMAP.md  estimate.md
│  └─ story/          # 各章節資料
├─ README.md
└─ CLAUDE.md          # AI 協作 context
```

### 2.1 source of truth 分權（7.5 混合分權）

| 資產 | 擁有者 | 規則 |
| --- | --- | --- |
| 地圖 tile 圖層 | **人類（編輯器）** | AI 絕不手改 tile 陣列 |
| 地圖事件 | AI（薄殼） | 事件只呼叫共通事件，邏輯不寫在地圖內 |
| 共通事件 / 資料庫 | AI（產生器腳本） | **編輯器關閉後**才寫 `data/` |
| `js/plugins/` 與參數 | AI | git 追蹤 |

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

> 風險：跨包美術風格不一致。緩解：demo 先鎖定一套主視覺基調（待決策）。

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

### 7.4 部署 workflow

已建立 [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)：

- `push main` 或手動觸發 → 將 `game/` 發布至 GitHub Pages。
- **防呆**：`game/index.html` 不存在時略過部署（不失敗），故現階段 `game/` 空亦安全。
- 內含**檔名大小寫衝突檢查**（防 Linux 區分大小寫的經典雷）。
- 需於 repo 設定啟用 Pages（Source = GitHub Actions）。

---

## 8. 技術債追蹤

| 項目 | 狀態 | 備註 |
| --- | --- | --- |
| VisuStella 模組清單定稿 | 🔴 未開始 | 含載入順序與授權確認 |
| 境界屬性成長曲線數值 | 🔴 未開始 | 三職業參數 |
| 種植系統自製 vs 現成外掛 | 🟡 評估中 | 傾向自製 |
| `data/*.json` 正規化流程 | 🔴 未開始 | 利於 git diff |
| 無 headless 驗證的替代方案 | 🟡 構想 | 可測邏輯抽純 JS 外掛做單元測試 + playtest 清單 |
| GitHub Pages 部署 workflow | 🟢 已建立（防呆，待 game/ 就緒） | 公開部署，免責聲明處置版權 |
| 起始畫面版權免責聲明 | 🔴 未開始 | 公開部署的版權緩解措施 |
| 付費外掛/素材公開散布授權確認 | 🟡 待辦（非阻擋） | 對外宣傳前順手確認 |
| 素材納管策略（Git LFS） | 🔴 未開始 | 避免 repo 膨脹 |
