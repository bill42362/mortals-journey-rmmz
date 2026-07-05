//=============================================================================
// MJ_LootAndPK.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 輕量殺人奪寶：屍體掉寶（可帶機率的掉落表：銅板/道具/靈石/丹方/書簡）＋伏擊判定（可見遇敵化為先制/被偷襲）。事件為主、外掛輔助。
 * @author Mortal's Journey
 *
 * @param lootTables
 * @text 具名掉落表（JSON）
 * @desc 進階：具名掉落表 JSON 物件。格式見 @help。事件用「發放具名掉落」或腳本 rollLoot('表名') 取用。留 {} 不用。
 * @type note
 * @default "{}"
 *
 * @command DropGold
 * @text 掉落·銅板
 * @desc 掉落銅板（可帶機率）。
 * @arg amount
 * @text 數量
 * @type number
 * @min 1
 * @default 1
 * @arg chance
 * @text 機率(0~100)
 * @desc 掉落機率百分比；100＝必掉。
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @command DropItem
 * @text 掉落·道具
 * @desc 掉落指定道具（靈石/丹藥/丹方/種子皆為道具，可帶機率）。
 * @arg itemId
 * @text 道具 ID
 * @type item
 * @default 0
 * @arg qty
 * @text 數量
 * @type number
 * @min 1
 * @default 1
 * @arg chance
 * @text 機率(0~100)
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @command GrantLoot
 * @text 發放具名掉落
 * @desc 擲一份具名掉落表（於外掛參數 lootTables 定義）並發放。
 * @arg table
 * @text 掉落表名
 * @type string
 * @default
 *
 * @command Ambush
 * @text 伏擊判定（設定下一場先制/被偷襲）
 * @desc 依玩家與敵人事件的朝向/相對位置判定伏擊，設定「下一場戰鬥」的先制或被偷襲。於「戰鬥處理」前呼叫。
 * @arg eventId
 * @text 敵人事件 ID
 * @desc 0＝觸發本指令的事件自身。
 * @type number
 * @min 0
 * @default 0
 *
 * @command SetInitiative
 * @text 直接設定下一場戰鬥先攻
 * @desc 不做位置判定，直接指定下一場戰鬥為先制/被偷襲/一般。
 * @arg mode
 * @text 先攻
 * @type select
 * @option 先制(preemptive)
 * @value preemptive
 * @option 被偷襲(surprise)
 * @value surprise
 * @option 一般(normal)
 * @value normal
 * @default preemptive
 *
 * @help MJ_LootAndPK.js
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 定位（見 docs/TECH.md §1.2/§4、story/01 §7.6、story/02 §7.7）
 * ─────────────────────────────────────────────────────────────────────────
 *   殺人奪寶＝輕量、事件為主、外掛輔助。第一幕 EV-20/21 為雛形（毒殺墨大夫→
 *   繼承靈石/丹方/《火球術》書簡）；完整系統在第三幕血色試煉（大量重複的伏擊→
 *   擊殺→奪寶）。本外掛提供兩件可複用的事：
 *     1) 屍體掉寶：可帶機率的掉落（銅板/道具，含靈石/丹方/書簡），或具名表批次擲取。
 *     2) 伏擊判定：把「可見踩觸遇敵」化為先制（你偷襲牠）或被偷襲（牠偷襲你），
 *        承載「苟／先制／被偷襲」核心（配合 EventsMoveCore 的視野/追逐）。
 *   ⚠️ 功法一律走「書簡道具」：殺人只掉《XX》書簡（道具），習得由玩家使用書簡／
 *      SkillLearnSystem 參悟（正典：殺人→掉書簡→參悟→習得），本外掛不直接習得功法。
 *   ⚠️ 玩家可見文字（奪寶旁白等）一律留在事件走 \tl{}，本外掛不含寫死字串。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 一、屍體掉寶
 * ─────────────────────────────────────────────────────────────────────────
 *   單筆：插件指令 掉落·銅板 / 掉落·道具。
 *   批次：插件指令 發放具名掉落（table 名），或腳本 MJ.LootAndPK.rollLoot(...)。
 *
 *   掉落 bundle 物件格式（腳本或具名表共用）：
 *     {
 *       "gold": 30, "goldChance": 100,
 *       "items":   [ { "id": 12, "qty": 3, "chance": 100 } ],
 *       "weapons": [ { "id": 5,  "qty": 1, "chance": 50 } ],
 *       "armors":  [ { "id": 7,  "qty": 1, "chance": 50 } ]
 *     }
 *   chance 為百分比(0~100)，省略＝必掉。靈石/丹方/種子/書簡皆為道具，走 items
 *   （功法書簡就是一種道具；習得走 SkillLearnSystem／書簡道具本身，不在掉落端）。
 *
 *   lootTables 參數範例（具名表）：
 *     { "trial_cultivator": { "items":[{"id":31,"qty":1,"chance":60}], "gold":0 } }
 *
 *   腳本：
 *     MJ.LootAndPK.rollLoot('trial_cultivator')  // 擲具名表
 *     MJ.LootAndPK.rollLoot({ gold: 10 })         // 擲行內 bundle
 *   兩者皆回傳實際掉落摘要 { gold, items:[], weapons:[], armors:[] }，
 *   供腳本判斷（如稀有書簡是否掉出）。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 二、伏擊判定
 * ─────────────────────────────────────────────────────────────────────────
 *   於「戰鬥處理」前，事件呼叫 插件指令 伏擊判定（傳敵人事件 ID，0＝自身）。
 *   判定規則（依朝向/相對位置）：
 *     ・你正面撲向牠、牠沒朝你（背對/側對）→ 先制（preemptive）。
 *     ・牠朝著你、你卻沒朝牠（背對）→ 被偷襲（surprise）。
 *     ・其餘 → 一般。
 *   或用 直接設定下一場戰鬥先攻 跳過判定。設定一次性，套用後即清除。
 *
 *   腳本：MJ.LootAndPK.ambush(eventId)      // 判定並設定
 *         MJ.LootAndPK.judgeAmbush(eventId) // 只回傳 'preemptive'|'surprise'|'normal'
 *         MJ.LootAndPK.setInitiative(mode)  // 直接設定
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 載入順序
 * ─────────────────────────────────────────────────────────────────────────
 *   覆寫 BattleManager.setup（套用先攻）＋ Game_Temp。須排在所有 VisuStella
 *   模組之後（MJ_* 區）。無其他硬相依。
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "MJ_LootAndPK";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const LOOT_TABLES = parseLootTables(params.lootTables);

    function parseLootTables(note) {
        try {
            // @type note 會被包成 JSON 字串（含跳脫換行），先解一層再解內容
            const inner = note ? JSON.parse(note) : "{}";
            const obj = typeof inner === "string" ? JSON.parse(inner || "{}") : inner;
            return obj && typeof obj === "object" ? obj : {};
        } catch (e) {
            console.warn(`${PLUGIN_NAME}: lootTables 參數解析失敗，視為空表。`, e);
            return {};
        }
    }

    // ── 純函式（不依賴 $game*，便於單元測試）────────────────────────────────
    // chance 為百分比(0~100)；省略/非數字＝必掉。roll 傳入 [0,1) 亂數。
    function passChance(chance, roll) {
        const c = chance === undefined || chance === null ? 100 : Number(chance);
        if (c >= 100) return true;
        if (c <= 0) return false;
        return (roll === undefined ? Math.random() : roll) * 100 < c;
    }

    const MJ = (window.MJ = window.MJ || {});
    MJ.LootAndPK = {
        passChance, // 匯出供測試

        // ── 掉寶 ──────────────────────────────────────────────────────────
        // 擲一份 bundle（物件或具名表字串）並發放，回傳實際掉落摘要。
        rollLoot(bundleOrName) {
            const b = typeof bundleOrName === "string" ? LOOT_TABLES[bundleOrName] : bundleOrName;
            const dropped = { gold: 0, items: [], weapons: [], armors: [] };
            if (!b || typeof b !== "object") return dropped;

            if (b.gold && passChance(b.goldChance)) {
                const g = Number(b.gold) || 0;
                if (g > 0) {
                    $gameParty.gainGold(g);
                    dropped.gold = g;
                }
            }
            this._rollList(b.items, $dataItems, dropped.items);
            this._rollList(b.weapons, $dataWeapons, dropped.weapons);
            this._rollList(b.armors, $dataArmors, dropped.armors);
            return dropped;
        },

        _rollList(list, dataArr, out) {
            (list || []).forEach((e) => {
                if (!passChance(e.chance)) return;
                const data = dataArr[Number(e.id)];
                if (!data) return;
                const qty = Math.max(1, Number(e.qty) || 1);
                $gameParty.gainItem(data, qty);
                out.push({ id: Number(e.id), qty });
            });
        },

        gold(amount, chance) {
            if (!passChance(chance)) return 0;
            const g = Math.max(0, Number(amount) || 0);
            if (g > 0) $gameParty.gainGold(g);
            return g;
        },

        item(itemId, qty, chance) {
            if (!passChance(chance)) return false;
            const data = $dataItems[Number(itemId)];
            if (!data) return false;
            $gameParty.gainItem(data, Math.max(1, Number(qty) || 1));
            return true;
        },

        // ── 伏擊 ──────────────────────────────────────────────────────────
        // 傳回 'preemptive' | 'surprise' | 'normal'（不改變任何狀態）
        judgeAmbush(eventId) {
            const ev = $gameMap.event(eventId);
            const player = $gamePlayer;
            if (!ev || !player) return "normal";
            const playerFacesEnemy = facingToward(player, ev);
            const enemyFacesPlayer = facingToward(ev, player);
            if (playerFacesEnemy && !enemyFacesPlayer) return "preemptive"; // 你偷襲牠
            if (enemyFacesPlayer && !playerFacesEnemy) return "surprise"; // 牠偷襲你
            return "normal";
        },

        // 設定「下一場戰鬥」先攻（一次性）
        setInitiative(mode) {
            if ($gameTemp) $gameTemp.mjSetInitiative(mode);
        },

        // 判定並設定
        ambush(eventId) {
            const mode = this.judgeAmbush(eventId);
            this.setInitiative(mode);
            return mode;
        },
    };

    // A 的朝向是否指向 B（以主軸判定）
    function facingToward(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dir = a.direction(); // 2下 4左 6右 8上
        if (Math.abs(dx) >= Math.abs(dy)) {
            if (dx > 0) return dir === 6;
            if (dx < 0) return dir === 4;
        } else {
            if (dy > 0) return dir === 2;
            if (dy < 0) return dir === 8;
        }
        return false; // 重疊（dx=dy=0）：無明確朝向
    }

    // ── Game_Temp：一次性先攻旗標（transient，不需存檔）─────────────────────
    Game_Temp.prototype.mjSetInitiative = function (mode) {
        this._mjInitiative = mode || null;
    };
    Game_Temp.prototype.mjTakeInitiative = function () {
        const v = this._mjInitiative || null;
        this._mjInitiative = null;
        return v;
    };

    // 套用先攻旗標到即將開始的戰鬥。
    const _BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function (troopId, canEscape, canLose) {
        _BattleManager_setup.call(this, troopId, canEscape, canLose); // 內部會先重置 _preemptive/_surprise=false
        const init = $gameTemp ? $gameTemp.mjTakeInitiative() : null;
        if (init === "preemptive") {
            this._preemptive = true;
        } else if (init === "surprise") {
            this._surprise = true;
        }
    };

    // ── 插件指令 ──────────────────────────────────────────────────────────
    PluginManager.registerCommand(PLUGIN_NAME, "DropGold", (args) => {
        MJ.LootAndPK.gold(Number(args.amount || 0), Number(args.chance ?? 100));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "DropItem", (args) => {
        MJ.LootAndPK.item(Number(args.itemId), Number(args.qty || 1), Number(args.chance ?? 100));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "GrantLoot", (args) => {
        MJ.LootAndPK.rollLoot(String(args.table || ""));
    });
    PluginManager.registerCommand(PLUGIN_NAME, "Ambush", function (args) {
        // 事件呼叫：eventId 0 → 用觸發本指令的事件
        let eventId = Number(args.eventId || 0);
        if (!eventId && this.eventId) eventId = this.eventId();
        MJ.LootAndPK.ambush(eventId);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "SetInitiative", (args) => {
        MJ.LootAndPK.setInitiative(String(args.mode || "normal"));
    });
})();
