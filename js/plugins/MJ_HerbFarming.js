//=============================================================================
// MJ_HerbFarming.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 靈草種植：多地塊狀態機（播種→生長→可採）。自然生長靠時日（步數）緩慢累積，以小綠瓶靈液澆灌可大幅催長。依賴 MJ_GreenBottle。
 * @author Mortal's Journey
 *
 * @param waterBoostStages
 * @text 澆灌加速階數
 * @desc 每次澆灌（消耗 1 滴靈液）使該地塊生長推進的階數。⚠️暫定待 M4。
 * @type number
 * @min 1
 * @default 2
 *
 * @param stepsPerStage
 * @text 自然生長步數/階
 * @desc 不澆灌時，每走這麼多步，靈草自然生長 1 階（承載「熬時日」）。設 0＝不自然生長、只能靠澆灌。⚠️暫定待 M4。
 * @type number
 * @min 0
 * @default 200
 *
 * @command Plant
 * @text 播種
 * @desc 在指定地塊播下靈草種子。地塊已有作物則無效。
 * @arg plotId
 * @text 地塊編號
 * @desc 全遊戲唯一的整數地塊編號（各藥田自行編號，跨地圖不重複）。
 * @type number
 * @min 1
 * @default 1
 * @arg itemId
 * @text 收成物（道具 ID）
 * @desc 成熟採收時獲得的道具（靈草／靈藥）。
 * @type item
 * @default 0
 * @arg stagesToMature
 * @text 成熟所需階數
 * @desc 從播種到可採的總生長階數。⚠️暫定待 M4。
 * @type number
 * @min 1
 * @default 3
 * @arg yieldQty
 * @text 採收數量
 * @desc 成熟採收時獲得的收成物數量（母本催生成批可調高）。
 * @type number
 * @min 1
 * @default 1
 *
 * @command Water
 * @text 澆灌地塊（耗靈液）
 * @desc 以小綠瓶靈液澆灌指定地塊，推進生長。消耗 1 滴靈液；靈液不足、地塊空或已成熟則無效。
 * @arg plotId
 * @text 地塊編號
 * @type number
 * @min 1
 * @default 1
 *
 * @command Advance
 * @text 推進生長（免費）
 * @desc 不耗靈液，直接推進指定地塊生長階數。供「過了些時日」之類事件用。
 * @arg plotId
 * @text 地塊編號
 * @type number
 * @min 1
 * @default 1
 * @arg stages
 * @text 推進階數
 * @type number
 * @min 1
 * @default 1
 *
 * @command Harvest
 * @text 採收
 * @desc 若指定地塊已成熟，將收成物加入持有並清空地塊；未成熟／空地塊則無效。
 * @arg plotId
 * @text 地塊編號
 * @type number
 * @min 1
 * @default 1
 *
 * @command ClearPlot
 * @text 清空地塊
 * @desc 清除指定地塊的作物（不給收成物）。
 * @arg plotId
 * @text 地塊編號
 * @type number
 * @min 1
 * @default 1
 *
 * @help MJ_HerbFarming.js
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 機制（見 docs/story/01 §7.3、02 §7.5）
 * ─────────────────────────────────────────────────────────────────────────
 *   多地塊各自為一台狀態機：播種 → 生長（累積階數）→ 可採。
 *   生長 = 自然生長（走路過時日，緩慢）＋ 澆灌加速（耗小綠瓶靈液，快）。
 *     ・自然階數 = floor(自播種以來步數 / stepsPerStage)
 *     ・澆灌／推進階數 = 累加的 boost 階數
 *     ・目前階數 = min(成熟階數, boost + 自然)，達成熟階數即可採。
 *   「慢慢熬 vs 用小綠瓶催」的張力即由此而生（精神 b：成長是熬出來的）。
 *
 *   規模化（第二幕）：靈液產量不變、地塊變多 → 每日「先澆哪畦」成為權衡。
 *   母本催生（EV-16）：把試煉帶回的母本當種子播下、重澆灌、採收數量調高，
 *   即「一株當十株」——用通用的播種／澆灌／採收介面即可表達，無需特例。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 事件用法
 * ─────────────────────────────────────────────────────────────────────────
 *   插件指令：播種 / 澆灌地塊 / 推進生長 / 採收 / 清空地塊。
 *   地塊薄殼事件建議流程：查空→播種；已種未熟→可澆灌或等；已熟→採收。
 *
 *   狀態查詢（供事件「條件分歧→腳本」）：
 *     MJ.HerbFarming.isEmpty(plotId)
 *     MJ.HerbFarming.isMature(plotId)
 *     MJ.HerbFarming.stage(plotId)          // 目前階數
 *     MJ.HerbFarming.stagesToMature(plotId) // 成熟所需階數
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 載入順序
 * ─────────────────────────────────────────────────────────────────────────
 *   依賴 MJ_GreenBottle（澆灌消耗靈液），須排在 MJ_GreenBottle 之下、
 *   所有 VisuStella 之後。
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "MJ_HerbFarming";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const WATER_BOOST_STAGES = Math.max(1, Number(params.waterBoostStages || 2));
    const STEPS_PER_STAGE = Math.max(0, Number(params.stepsPerStage || 0));

    // ── 儲存於 $gameSystem（隨存檔持久化）──────────────────────────────────
    Game_System.prototype.mjHerbPlots = function () {
        if (!this._mjHerbPlots) this._mjHerbPlots = {};
        return this._mjHerbPlots;
    };

    const partySteps = () => ($gameParty ? $gameParty.steps() : 0);

    // ── 純函式：由地塊狀態＋目前步數算目前生長階數（測試友善）──────────────
    function computeStage(plot, currentSteps) {
        if (!plot) return 0;
        const natural = STEPS_PER_STAGE > 0
            ? Math.floor(Math.max(0, currentSteps - plot.plantedAtStep) / STEPS_PER_STAGE)
            : 0;
        return Math.min(plot.stagesToMature, plot.boostStages + natural);
    }

    const MJ = (window.MJ = window.MJ || {});
    MJ.HerbFarming = {
        WATER_BOOST_STAGES,
        STEPS_PER_STAGE,
        computeStage, // 匯出供測試

        _plots() {
            return $gameSystem.mjHerbPlots();
        },

        plot(plotId) {
            return this._plots()[plotId] || null;
        },

        isEmpty(plotId) {
            return !this.plot(plotId);
        },

        stagesToMature(plotId) {
            const p = this.plot(plotId);
            return p ? p.stagesToMature : 0;
        },

        stage(plotId) {
            return computeStage(this.plot(plotId), partySteps());
        },

        isMature(plotId) {
            const p = this.plot(plotId);
            return !!p && computeStage(p, partySteps()) >= p.stagesToMature;
        },

        // 播種。地塊已有作物則失敗（回傳 false）。
        plant(plotId, itemId, stagesToMature, yieldQty) {
            if (!this.isEmpty(plotId)) return false;
            this._plots()[plotId] = {
                itemId: Number(itemId) || 0,
                stagesToMature: Math.max(1, Number(stagesToMature) || 3),
                yieldQty: Math.max(1, Number(yieldQty) || 1),
                plantedAtStep: partySteps(),
                boostStages: 0,
            };
            return true;
        },

        // 免費推進生長（事件驅動的「過時日」）。
        advance(plotId, stages) {
            const p = this.plot(plotId);
            if (!p) return false;
            p.boostStages = Math.min(p.stagesToMature, p.boostStages + Math.max(1, Number(stages) || 1));
            return true;
        },

        // 澆灌：耗 1 滴靈液推進 WATER_BOOST_STAGES 階。空地塊／已熟／靈液不足則不扣、回傳 false。
        water(plotId) {
            const p = this.plot(plotId);
            if (!p) return false;
            if (computeStage(p, partySteps()) >= p.stagesToMature) return false; // 已熟不浪費靈液
            const bottle = MJ.GreenBottle;
            if (!bottle || !bottle.owned() || !bottle.spend(1)) return false;
            p.boostStages = Math.min(p.stagesToMature, p.boostStages + WATER_BOOST_STAGES);
            return true;
        },

        // 採收：已熟則入袋並清空，回傳收成物 itemId；否則 null。
        harvest(plotId) {
            const p = this.plot(plotId);
            if (!p || computeStage(p, partySteps()) < p.stagesToMature) return null;
            const item = $dataItems[p.itemId];
            if (item) $gameParty.gainItem(item, p.yieldQty);
            const yielded = p.itemId;
            this.clear(plotId);
            return yielded;
        },

        clear(plotId) {
            delete this._plots()[plotId];
        },
    };

    // ── 插件指令 ──────────────────────────────────────────────────────────
    PluginManager.registerCommand(PLUGIN_NAME, "Plant", (args) => {
        MJ.HerbFarming.plant(Number(args.plotId), Number(args.itemId), Number(args.stagesToMature), Number(args.yieldQty));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "Water", (args) => {
        MJ.HerbFarming.water(Number(args.plotId));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "Advance", (args) => {
        MJ.HerbFarming.advance(Number(args.plotId), Number(args.stages || 1));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "Harvest", (args) => {
        MJ.HerbFarming.harvest(Number(args.plotId));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "ClearPlot", (args) => {
        MJ.HerbFarming.clear(Number(args.plotId));
    });
})();
