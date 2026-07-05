//=============================================================================
// MJ_Realm.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 境界系統：職業＝境界、等級＝層、等級上限＝撞瓶頸、突破＝Change Class 事件；並維護境界鏡像變數供事件判斷。
 * @author Mortal's Journey
 *
 * @param realmActorId
 * @text 境界主角 Actor ID
 * @desc 適用境界系統的主角（韓立）。鏡像變數追蹤此角色的境界。
 * @type actor
 * @default 1
 *
 * @param realmVariableId
 * @text 境界鏡像變數 ID
 * @desc 同步「境界主角當前境界階序」的變數（1=凡人、2=練氣、3=築基；0=非境界職業）。設 0 停用。
 * @type variable
 * @default 2
 *
 * @param playBreakthroughSe
 * @text 突破時播放音效
 * @desc 突破（Change Class）成功時是否播放下列音效。文字演出請留在共通事件（i18n 紀律）。
 * @type boolean
 * @on 播放
 * @off 不播放
 * @default true
 *
 * @param breakthroughSe
 * @text 突破音效
 * @desc 突破成功時播放的 SE。
 * @type struct<SeConfig>
 * @default {"name":"Saint9","volume":"90","pitch":"100","pan":"0"}
 *
 * @command Breakthrough
 * @text 境界突破
 * @desc 將境界主角（或指定角色）進階至下一境界（Change Class，落在新境界一層）。到頂境界則無效。
 *
 * @arg actorId
 * @text 對象 Actor ID
 * @desc 0＝使用外掛參數的「境界主角」。
 * @type actor
 * @default 0
 *
 * @command SyncRealmVariable
 * @text 同步境界鏡像變數
 * @desc 依境界主角當前職業重算境界鏡像變數（防呆用；突破/讀檔/新遊戲已自動同步）。
 *
 * @help MJ_Realm.js
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 境界資料模型（見 docs/TECH.md §3）
 * ─────────────────────────────────────────────────────────────────────────
 *   職業(Class) ＝ 境界（凡人 / 練氣 / 築基）
 *   等級(Level) ＝ 層（練氣 N 層＝練氣職業 Lv N）
 *   等級上限     ＝ 撞瓶頸（到頂無法靠升級跨境界，逼玩家走突破劇情）
 *   突破         ＝ 事件：達成條件後 Change Class 進階至下一境界（落在 Lv1＝新境界一層）
 *
 * 本外掛負責三件事：
 *   1) 以「境界表」（下方 REALMS 常數）定義各境界對應的 classId 與層數上限。
 *   2) 覆寫 maxLevel：境界職業的角色，等級上限＝該境界層數上限（＝撞瓶頸）。
 *   3) 維護境界鏡像變數：同步境界主角當前境界階序（tier），供事件條件分歧
 *      （比在事件裡查 classId 省事）。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 境界表（REALMS）— M4 平衡前的暫定層數上限
 * ─────────────────────────────────────────────────────────────────────────
 *   層數上限（levelCap）為 ⚠️暫定 placeholder，待 ROADMAP「境界職業參數草案」
 *   與 M4 平衡定案。練氣 13 為正典層數（見 CLAUDE.md 決策 4）。
 *   調整時只改本檔 REALMS 常數即可（外掛為 AI 全權、git 追蹤）。
 *
 *   tier 1 凡人  classId 1   層數上限 3   （凡人之壁）
 *   tier 2 練氣  classId 9   層數上限 13  （練氣圓滿＝築基之壁）
 *   tier 3 築基  classId 10  層數上限 10  （demo 壓軸終點）
 *
 *   ⚠️ classId 9（練氣）、10（築基）須存在於 data/Classes.json。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 事件用法
 * ─────────────────────────────────────────────────────────────────────────
 *   插件指令：
 *     ・境界突破           → 第一幕 EV-13（凡人→練氣）、壓軸（練氣→築基）
 *     ・同步境界鏡像變數   → 防呆
 *
 *   境界鏡像變數（預設變數 2）：事件用「條件分歧→變數」即可判斷境界，例：
 *     變數[2] ≥ 2  → 練氣以上
 *     變數[2] = 3  → 築基
 *
 *   腳本（進階，供條件分歧「腳本」欄或事件腳本指令）：
 *     MJ.Realm.tierOf()          // 境界主角當前階序（1/2/3；0＝非境界職業）
 *     MJ.Realm.is('練氣')         // 境界主角是否正處於指定境界
 *     MJ.Realm.atCap()           // 是否已達當前境界層數上限（撞瓶頸）
 *     MJ.Realm.canBreakthrough() // 是否還有下一境界可突破
 *     MJ.Realm.breakthrough()    // 執行突破（同插件指令）
 *   以上皆可傳入 actorId 覆寫對象，省略則用「境界主角」。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 突破的機制細節
 * ─────────────────────────────────────────────────────────────────────────
 *   突破 ＝ changeClass(下一境界 classId, keepExp=false)。keepExp=false 且新境界
 *   從未進入過 → 該職業經驗為 0 → 落在 Lv1，恰為「新境界一層」。突破「條件檢查」
 *   （已習功法、撞壁旗標、消耗築基丹…）與「文字演出」由呼叫端的共通事件負責，
 *   本外掛只做 Change Class ＋ 鏡像變數同步（＋可選音效）。此分工讓文字走 \tl{}
 *   i18n、外掛保持無寫死字串。
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 載入順序
 * ─────────────────────────────────────────────────────────────────────────
 *   覆寫 Game_Actor（maxLevel / changeClass / setup），須排在所有 VisuStella
 *   模組之後（與其他 MJ_* 同區，清單最末）。無其他硬相依。
 */
/*~struct~SeConfig:
 * @param name
 * @text 檔名
 * @type file
 * @dir audio/se/
 * @default Saint9
 * @param volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @param pitch
 * @text 音調
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @param pan
 * @text 聲相
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "MJ_Realm";
    const params = PluginManager.parameters(PLUGIN_NAME);

    const REALM_ACTOR_ID = Number(params.realmActorId || 1);
    const REALM_VARIABLE_ID = Number(params.realmVariableId || 0);
    const PLAY_BREAKTHROUGH_SE = params.playBreakthroughSe !== "false";
    const BREAKTHROUGH_SE = parseSe(params.breakthroughSe);

    // 境界表：tier 遞增＝進階順序。levelCap＝該境界層數上限（＝撞瓶頸）。⚠️數值暫定，見 @help。
    const REALMS = [
        { tier: 1, name: "凡人", classId: 1,  levelCap: 3 },
        { tier: 2, name: "練氣", classId: 9,  levelCap: 13 },
        { tier: 3, name: "築基", classId: 10, levelCap: 10 },
    ];

    // ── 純函式（不依賴 $game*，便於單元測試）────────────────────────────────
    const realmByClassId = (classId) => REALMS.find((r) => r.classId === classId) || null;
    const realmByTier = (tier) => REALMS.find((r) => r.tier === tier) || null;
    const nextRealmOf = (realm) => (realm ? realmByTier(realm.tier + 1) : null);

    function parseSe(json) {
        try {
            const o = JSON.parse(json || "{}");
            return {
                name: String(o.name || ""),
                volume: Number(o.volume ?? 90),
                pitch: Number(o.pitch ?? 100),
                pan: Number(o.pan ?? 0),
            };
        } catch (e) {
            return { name: "", volume: 90, pitch: 100, pan: 0 };
        }
    }

    // ── 對外 API（掛在全域 MJ.Realm，供事件腳本／插件指令使用）──────────────
    const MJ = (window.MJ = window.MJ || {});
    MJ.Realm = {
        REALMS,

        // 依 classId 取境界設定（純函式，測試友善）
        configOf(classId) {
            return realmByClassId(classId);
        },

        actor(actorId) {
            const id = actorId || REALM_ACTOR_ID;
            return $gameActors.actor(id);
        },

        // 角色當前境界設定，非境界職業回傳 null
        current(actorId) {
            const a = this.actor(actorId);
            return a ? realmByClassId(a._classId) : null;
        },

        // 境界階序：1/2/3；非境界職業（或查無角色）回傳 0
        tierOf(actorId) {
            const r = this.current(actorId);
            return r ? r.tier : 0;
        },

        is(name, actorId) {
            const r = this.current(actorId);
            return !!r && r.name === name;
        },

        levelCap(actorId) {
            const r = this.current(actorId);
            return r ? r.levelCap : 0;
        },

        // 是否撞瓶頸（已達當前境界層數上限）
        atCap(actorId) {
            const a = this.actor(actorId);
            const r = this.current(actorId);
            return !!(a && r) && a._level >= r.levelCap;
        },

        // 下一境界設定（無則 null，代表已達頂境界）
        next(actorId) {
            return nextRealmOf(this.current(actorId));
        },

        canBreakthrough(actorId) {
            return !!this.next(actorId);
        },

        // 執行突破：Change Class 至下一境界，落在新境界一層。成功回傳 true。
        // 條件檢查與文字演出由呼叫端共通事件負責（見 @help）。
        breakthrough(actorId) {
            const a = this.actor(actorId);
            if (!a) return false;
            const nxt = nextRealmOf(realmByClassId(a._classId));
            if (!nxt) return false;
            if (!$dataClasses[nxt.classId]) {
                console.warn(`${PLUGIN_NAME}: 目標境界 classId ${nxt.classId}（${nxt.name}）不存在於 Classes.json，突破中止。`);
                return false;
            }
            a.changeClass(nxt.classId, false); // keepExp=false → 落在新境界 Lv1（＝一層）
            // 鏡像變數已由 changeClass 掛鉤同步；此處僅補音效。
            if (PLAY_BREAKTHROUGH_SE && BREAKTHROUGH_SE.name) {
                AudioManager.playSe(BREAKTHROUGH_SE);
            }
            return true;
        },

        // 依境界主角當前職業重算鏡像變數
        syncVar(actorId) {
            if (REALM_VARIABLE_ID > 0 && $gameVariables) {
                $gameVariables.setValue(REALM_VARIABLE_ID, this.tierOf(actorId || REALM_ACTOR_ID));
            }
        },
    };

    // ── 引擎掛鉤 ──────────────────────────────────────────────────────────

    // 撞瓶頸：境界職業的角色，等級上限＝該境界層數上限。
    const _Game_Actor_maxLevel = Game_Actor.prototype.maxLevel;
    Game_Actor.prototype.maxLevel = function () {
        const r = realmByClassId(this._classId);
        if (r) return r.levelCap;
        return _Game_Actor_maxLevel.call(this);
    };

    // 換職業（含突破）後同步鏡像變數。
    const _Game_Actor_changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function (classId, keepExp) {
        _Game_Actor_changeClass.call(this, classId, keepExp);
        if (this.actorId() === REALM_ACTOR_ID) MJ.Realm.syncVar(this.actorId());
    };

    // 新遊戲／隊伍初始化時同步鏡像變數，確保凡人基線＝1（供突破前的境界判斷）。
    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        _Game_Actor_setup.call(this, actorId);
        if (this.actorId() === REALM_ACTOR_ID) MJ.Realm.syncVar(this.actorId());
    };

    // ── 插件指令 ──────────────────────────────────────────────────────────
    PluginManager.registerCommand(PLUGIN_NAME, "Breakthrough", (args) => {
        const actorId = Number(args.actorId || 0) || REALM_ACTOR_ID;
        MJ.Realm.breakthrough(actorId);
    });

    PluginManager.registerCommand(PLUGIN_NAME, "SyncRealmVariable", () => {
        MJ.Realm.syncVar();
    });
})();
