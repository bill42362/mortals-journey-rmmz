# tools/asset-audit — 素材納管稽核

RMMZ 建專案時會帶進整套 RTP（多數用不到）；日後要用 DLC（如 MV Trinity）也想整包
放進 `game/img` 讓編輯器能預覽挑選。但整包進 git／上 gh-pages 會膨脹 LFS 配額，也把
未用素材一併公開散布。

**策略**：`.gitignore` 預設忽略所有素材資料夾，未經允許者不進 git、不部署（見
[docs/TECH.md](../../docs/TECH.md) §7.2）。分兩種納管方式：

| 資料夾 | 納管方式 |
| --- | --- |
| `game/img`、`game/audio` | **依 data 引用自動篩選**：只 whitelist 實際被 `data/*.json`／外掛引用的檔（`gen-ignore` 自動產生）。 |
| `game/effects`、`game/fonts`、`game/movies` | **保留已追蹤、擋新倒入**：特效貼圖/字型的內部引用不在 RMMZ 資料裡、無法按檔篩，故整夾預設忽略；已追蹤者不受影響（git 永不忽略 tracked 檔），要用新的請 `git add -f`。 |

整包 DLC 可放進對應資料夾供編輯器預覽，未納管者不進 git、不部署。

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
3. 讓它進版控：
   - **圖/音效**：`git add -f game/img/<類型>/<檔名>`，或 `audit.py gen-ignore --write`
     重新產生 whitelist 後 commit。
   - **特效**：`git add -f` 該 `.efkefc` **連同它的 `.efkmodel` 與貼圖 png**（整組一起，
     貼圖是 .efkefc 內部引用、掃描抓不到）。
   - **字型/影片**：`git add -f` 該檔。
4. `check` 會在 CI 把關：**用了卻忘了納入版控 → 建置失敗**，不會等到線上才發現破圖
   （涵蓋 img/audio 引用、Animations 的特效 `.efkefc`、Play Movie 影片）。

## 匯入新特效／字型／影片（effects/fonts/movies）

這些**不能**像 img/audio 那樣整包倒進去靠 whitelist 篩——特效的貼圖是 `.efkefc`
**內部**用相對路徑載入、掃描抓不到，無法判斷某特效用哪幾張貼圖。所以要**選擇性、
以整組為單位**匯入：

1. **只把要用的整組**複製進 `game/effects/`（該 `.efkefc` ＋它的 `.efkmodel` ＋貼圖
   `.png`；保留相對路徑）。**別把整包特效 DLC 倒進來**（那樣會全被 stage 進去）。
   新特效來源＝各 DLC 的 sample 專案 `effects/` 夾（VisuStella、Action Combat、
   Memories In Breeze 等）。
2. 開編輯器 → 資料庫 → **動畫(Animations)** → 新增/選一個動畫 → Effect 指定該特效 →
   **在動畫預覽播一次**確認有正常渲染（缺貼圖會顯示破/空，當場就知道要補哪些檔）。
   （此步寫 `data/`，受編輯器鐵則約束。）
3. 把剛倒入的新檔整組納入版控：
   ```bash
   python3 tools/asset-audit/audit.py stage effects   # 自動 git add -f 剛倒入的新檔
   ```
   （字型/影片同理：`stage fonts` / `stage movies`。）
4. `python3 tools/asset-audit/audit.py check` 確認引用完整（會驗 `.efkefc` 已追蹤；
   **貼圖無法驗**，故務必做第 2 步的預覽）。

## 判定方式與限制

- `report` / `gen-ignore` / `list-unused`：**語料整詞比對**——素材檔名（去副檔名）以非
  `[A-Za-z0-9_]` 為邊界，在所有 `data/*.json` + 外掛 js 中搜尋。保守：不會把有引用的
  誤判為未用。`img/system`（引擎硬載入，如 IconSet/Window）一律視為已用。
- `check`：**結構化抽取**——直讀 Actors/Enemies/Tilesets/**Animations**/System/Map*/
  CommonEvents/Troops 的已知欄位，以及事件指令 101/231/241/245/249/250/261/283/284/322/323/41。
  effects 以 `.efkefc` 為單位查（Animations.effectName），movies 查 Play Movie(261)。
- **盲點**：以「變數指定檔名」的動態引用（如 Show Picture 綁變數）靜態掃描無法解析；
  這類素材請自行 `git add -f` 納入。
- **LFS 歷史**：`git rm --cached` 只停止未來追蹤/部署（頻寬立省）；已進 LFS 歷史的
  blob 仍佔儲存配額，需回收時另做 history rewrite（filter-repo）＋ `git lfs prune`。
