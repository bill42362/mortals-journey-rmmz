//=============================================================================
// MJ_Font.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 載入並套用繁體中文字型（Noto Sans TC，unicode-range 分塊 woff2 + CSS）。
 * @author Mortal's Journey
 *
 * @help MJ_Font.js
 *
 * 目的：RMMZ 預設 M+ 字型不涵蓋完整繁體中文，會出現缺字或日系字形。
 * 本外掛注入 Noto Sans TC 的 @font-face CSS（unicode-range 分塊，「用到才載」），
 * 並把遊戲主字型設為 Noto Sans TC，置於字型鏈最前，讓繁中字形優先生效。
 *
 * 字型檔放置：game/fonts/noto_sans_tc_regular/
 *   - css.css：@font-face 定義（font-family: 'Noto Sans TC'）
 *   - 多個 *.woff2：依 unicode 範圍切的分塊，CSS 以相對路徑（裸檔名）引用。
 *   ⚠️ 請勿改檔名或搬動結構，否則 CSS 找不到分塊。
 *
 * 載入順序：本外掛覆寫 Game_System 字型方法，須排在所有 VisuStella 模組之後。
 *
 * 副作用：unicode-range 為「用到才載」，個別字首次出現可能有極短暫 pop-in，
 * turn-based RPG 幾乎無感。日後可改「字型子集化成單檔」更穩。
 *
 * 無參數，啟用即生效。
 */

(() => {
    "use strict";

    // 字型 CSS 路徑（相對 index.html）。CSS 內 url() 為相對路徑，會解析到同目錄的 woff2。
    const CSS_PATH = "fonts/noto_sans_tc_regular/css.css";
    const FONT_FAMILY = "'Noto Sans TC'";

    // 1) 注入 @font-face CSS（瀏覽器依 unicode-range 用到才抓對應 woff2 分塊）。
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CSS_PATH;
    document.head.appendChild(link);

    // 2) 主字型改為 Noto Sans TC（最前），其後接原 fallback；棄用預設 M+ 以免日系字形勝出。
    Game_System.prototype.mainFontFace = function() {
        return FONT_FAMILY + ", " + $dataSystem.advanced.fallbackFonts;
    };
    // numberFontFace 預設串接 mainFontFace()，數字維持粗體後備、CJK 落回中文字型，無需另覆寫。
})();
