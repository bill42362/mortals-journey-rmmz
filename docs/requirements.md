1. 本遊戲使用 RPGMaker MZ 製作，遊戲專案資料夾列於 `game/` 子資料夾，其他 git, README.md, linter, docs 之類的邊緣檔案和資料夾位於根目錄。
2. 本遊戲目標製作中國網路小說 <凡人修仙傳> 凡界篇於 RPGMaker MZ 上，但先以在黃楓谷進階築基完成作為第一階段 demo 版終點，包含血色試煉。序章 青牛鎮 → 第一幕 七玄門(凡人→練氣)→ 第二幕 黃楓谷百藥園(練氣・撞瓶頸・立定進血色禁地採藥的目標)→ 第三幕 血色試煉(練氣・闖關採藥・遇南宮婉) → 壓軸 築基(回來量產築基丹・突破築基)。
3. 目標希望用 RPGMaker 製作小綠瓶，靈草種植/催化，技能/功法，典籍參悟，煉器，煉丹，製符，法寶戰鬥 (甚至法寶自爆)，靈寵培育，仙法戰鬥，傀儡戰鬥，符陣煉製/使用，屍傀戰鬥夥伴等系統。並且也儘量還原殘酷的殺人奪寶機制。
4. 希望能將決大部分事件系統編寫，劇本/腳本/文本編寫，程式編寫等都交由 AI 製作，最小化人工參與部分 (可能僅剩地圖繪製)。
5. 希望能夠讓玩家體會到 <凡人修仙傳> 的核心精神：
    a. 苟，是一種美德。 謹慎、避戰、埋伏、留後手，都應該被機制獎勵；莽撞應該被懲罰。逃跑，算計與迴避永遠是合法且有時最優的選項。
    b. 成長是熬出來的。 境界提升緩慢而扎實，每一次突破都是有重量的里程碑，而不是經驗條跳級。
    c. 小瓶是命脈。 神秘小綠瓶（加速靈藥生長）是玩家相對於世界的核心優勢，採藥—煉丹—變強的循環圍繞著它運轉。
    d. 資源即生命。 丹藥、符籙、靈石都是稀缺的。準備是否充分，往往比數值高低更決定生死。
6. 遊戲素材先儘量以 RPGMaker MZ 內建為主。
7. 除 MZ 本體外，也已購買下列組合包，可以讓 AI 盡情活用:
    a. RPG Maker MZ × VX Ace Bundle
    b. RPGツクールMZ×Cthulhu Mythos ADV 闇に囁く狂気
    c. MZ x Custom Menu Editor
    d. 2026 MZ Spring Special
    e. Tileset Builder x Pocket Valley Graphic pack Bundle
    f. MZ & Card Game Combat Bundles
    g. MZ + Tools Bundle
    h. RPG MAKER MZ × ACTION GAME MAKER
    i. RPGツクールXP x RPGツクールMZ
    j. RPG Maker MV x MZ Bundle
    k. RPG Maker MZ × Action Combat Plugin
    l. 2026 MZ Summer Special
8. 檔案結構幫我這樣安排，最終目的刪除 requirements.md:
    a. docs/SPEC.md: 寫給非技術人員，專業 PM 閱讀或維護的文件，描述專案目的，用戶量體預估，驗收條件，商業目標，商業決策等等。
    b. docs/TECH.md: 技術文件，包含但不限於技術選型，專案架構，專案元件規劃，雲服務選擇，壓力測試規模，技術債追蹤等等。
        * 我希望專案的前端 (包含前台 webapp 與後台，還有落地官網) 儘量使用 nodejs@24.14.1 開發，框架使用 react 與 react-router v7
        * webapp 與後台因不考慮 SEO 所以請使用 zero server 的架構。後台使用 ant design，盡可能做到完全不另外撰寫 CSS。
        * 落地官網需要考慮 SEO，但因為目標是零摩擦 iMessage 流程，所以頁面不會太多，幫我考慮需不需要 SSR 或是也直接走 zero server。
        * 我希望在雲服務上儘可能走 Infra-as-Code 架構，方便用 AI 進行改寫與維護。
    c. docs/story/: 遊戲各章節的細部資料，包含但不限於：劇情大綱，地圖規劃，地圖事件，對話文本等等。
    d. README.md: 給技術人員初次接觸專案時快速理解專案內容用，包含簡短的專案描述，各元件架構，如何在本地一鍵運行專案等等。但因為目前還沒有進入開發階段，所以應該幾乎沒有內容。
    e. CLAUDE.md: 給 AI 閱讀用的 context，包含需要紀錄但不適合寫入以上其他檔案的內容，相關決策點，待決策項目等等。
