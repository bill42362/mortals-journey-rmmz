//=============================================================================
// MJ_GreenBottle.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 小綠瓶：承月光滋生「靈液」（稀缺、受夜間節流），靈液為 MJ_HerbFarming 澆灌加速生長所消耗的耦合資源。
 * @author Mortal's Journey
 *
 * @param liquidVariableId
 * @text 靈液滴數變數 ID
 * @desc 儲存目前瓶中靈液滴數的變數（事件可直接「條件分歧→變數」判斷可用量）。設 0 停用整個系統。
 * @type variable
 * @default 3
 *
 * @param maxStorage
 * @text 靈液儲量上限
 * @desc 瓶中最多可存的靈液滴數（承載「稀缺」；正典僅寥寥幾滴）。⚠️暫定待 M4。
 * @type number
 * @min 1
 * @default 3
 *
 * @param dropsPerNight
 * @text 每次承月光滋生滴數
 * @desc 每呼叫一次「承月光」新增的靈液滴數（受儲量上限截頂）。⚠️暫定待 M4。
 * @type number
 * @min 1
 * @default 1
 *
 * @param ownedSwitchId
 * @text 已取得小綠瓶開關 ID
 * @desc 標記韓立是否已拾得小綠瓶（第一幕 EV-09）。0＝不設限（承月光/澆灌恆可用，便於測試）。
 * @type switch
 * @default 0
 *
 * @command SoakMoonlight
 * @text 承月光（滋生靈液）
 * @desc 模擬把小綠瓶擱月光下過一夜，滋生靈液（受儲量上限截頂）。未取得小綠瓶則無效。
 *
 * @command GainLiquid
 * @text 增加靈液
 * @desc 直接增加靈液滴數（受儲量上限截頂）。供特殊事件用。
 * @arg amount
 * @text 滴數
 * @type number
 * @min 1
 * @default 1
 *
 * @command SpendLiquid
 * @text 消耗靈液
 * @desc 直接消耗靈液滴數（不足則不扣、無效果）。一般澆灌請用 MJ_HerbFarming 的「澆灌地塊」。
 * @arg amount
 * @text 滴數
 * @type number
 * @min 1
 * @default 1
 *
 * @help MJ_GreenBottle.js
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 正典機制（見 docs/story/01 §7.3；memory: green-bottle-canon）
 * ─────────────────────────────────────────────────────────────────────────
 *   小綠瓶「承月光即滋生靈液 → 以靈液澆灌靈草地塊 → 大幅縮短生長」。
 *   ⚠️ 非「滴血啟動」、非「將靈草種在瓶中」。
 *
 *   靈液是 GreenBottle 產出、MJ_HerbFarming 消耗的耦合資源：
 *     ・產量受「承月光」節流（每夜寥寥幾滴、儲量有上限）→ 稀缺。
 *     ・藥田規模化後（第二幕）產量不變、地塊變多 →「先澆哪畦」成為權衡
 *       （第一幕 EV-19「綠液此消彼長：毒草⇄靈藥」即此稀缺的關鍵演出）。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 事件用法
 * ─────────────────────────────────────────────────────────────────────────
 *   插件指令：承月光 / 增加靈液 / 消耗靈液。
 *   「澆灌某地塊加速生長」在 MJ_HerbFarming（澆灌會自動從此處扣 1 滴靈液）。
 *
 *   靈液可用量查詢（供 EV-19 判斷分配是否達戰鬥門檻）：
 *     ・事件「條件分歧→變數」：變數[靈液滴數變數] ≥ N
 *     ・腳本：MJ.GreenBottle.liquid()   // 目前滴數
 *             MJ.GreenBottle.canSpend(n)
 *             MJ.GreenBottle.owned()    // 是否已取得小綠瓶
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 載入順序
 * ─────────────────────────────────────────────────────────────────────────
 *   須排在所有 VisuStella 模組之後（MJ_* 區）。MJ_HerbFarming 依賴本外掛，
 *   故本外掛須排在 MJ_HerbFarming 之上。
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "MJ_GreenBottle";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const LIQUID_VAR_ID = Number(params.liquidVariableId || 0);
    const MAX_STORAGE = Math.max(1, Number(params.maxStorage || 3));
    const DROPS_PER_NIGHT = Math.max(1, Number(params.dropsPerNight || 1));
    const OWNED_SWITCH_ID = Number(params.ownedSwitchId || 0);

    // ── 純函式（不依賴 $game*，便於單元測試）────────────────────────────────
    const clampLiquid = (n) => Math.max(0, Math.min(MAX_STORAGE, n));

    const MJ = (window.MJ = window.MJ || {});
    MJ.GreenBottle = {
        MAX_STORAGE,
        DROPS_PER_NIGHT,

        // 是否已取得小綠瓶（未設開關＝恆為 true）
        owned() {
            if (OWNED_SWITCH_ID <= 0) return true;
            return !!($gameSwitches && $gameSwitches.value(OWNED_SWITCH_ID));
        },

        enabled() {
            return LIQUID_VAR_ID > 0;
        },

        // 目前靈液滴數
        liquid() {
            if (!this.enabled() || !$gameVariables) return 0;
            return $gameVariables.value(LIQUID_VAR_ID) | 0;
        },

        capacity() {
            return MAX_STORAGE;
        },

        canSpend(n) {
            return this.liquid() >= (n || 1);
        },

        // 直接設定滴數（內部用；截頂 [0, MAX_STORAGE]）
        _set(n) {
            if (this.enabled() && $gameVariables) {
                $gameVariables.setValue(LIQUID_VAR_ID, clampLiquid(n));
            }
        },

        // 增加靈液（受儲量上限截頂），回傳實際增加量
        gain(n) {
            const before = this.liquid();
            this._set(before + (n || 0));
            return this.liquid() - before;
        },

        // 消耗靈液；不足則不扣並回傳 false
        spend(n) {
            const amount = n || 1;
            if (!this.canSpend(amount)) return false;
            this._set(this.liquid() - amount);
            return true;
        },

        // 承月光滋生靈液（一夜）。未取得小綠瓶則無效。回傳實際滋生滴數。
        soakMoonlight() {
            if (!this.owned()) return 0;
            return this.gain(DROPS_PER_NIGHT);
        },
    };

    // ── 插件指令 ──────────────────────────────────────────────────────────
    PluginManager.registerCommand(PLUGIN_NAME, "SoakMoonlight", () => {
        MJ.GreenBottle.soakMoonlight();
    });
    PluginManager.registerCommand(PLUGIN_NAME, "GainLiquid", (args) => {
        MJ.GreenBottle.gain(Number(args.amount || 1));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "SpendLiquid", (args) => {
        MJ.GreenBottle.spend(Number(args.amount || 1));
    });
})();
