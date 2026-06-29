//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.57;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.57] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * - If used with Battle Core's <Command Text: x>, the Command Text notetag
 *   will take priority in the command window, but the List Name notetag will
 *   appear in the skill list.
 * - This does not change the display text. If you'd like to change that, use
 *   the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Non-consumable items will not be consumed but their amounts will be
 *     required.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * - If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *   <Passive State: x> will always have the passive state be available no
 *   matter if the skill is equipped or not, as long as the skill is learned.
 *   - If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 *   - Just like with regular <Passive State: x> notetag:
 *   - If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.57: July 20, 2026
 * * Compatibility Update!
 * ** Toggle skills now work with <Battle Commands>. Update made by Arisu.
 * 
 * Version 1.56: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where <param Buff Turns: +x> and <param Debuff Turns: +x>
 *    would cause a crash. Fix made by Olivia.
 * 
 * Version 1.55: March 16, 2026
 * * Documentation Update!
 * ** Added extra clarity for <Toggle> notetag:
 * *** Just like with regular <Passive State: x> notetag:
 * *** If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * 
 * Version 1.54: December 15, 2025
 * * Documentation Update!
 * ** Added extra clarity for <List Name: name> notetag:
 * *** If used with Battle Core's <Command Text: x>, the Command Text notetag
 *     will take priority in the command window, but the List Name notetag will
 *     appear in the skill list.
 * *** This does not change the display text. If you'd like to change that, use
 *     the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * * Documentation Update!
 * ** Added extra clarity for <Passive State: x>:
 * *** If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *     <Passive State: x> will always have the passive state be available no
 *     matter if the skill is equipped or not, as long as the skill is learned.
 * *** If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x29f4(_0x162da1,_0x280bf2){const _0x24a937=_0x24a9();return _0x29f4=function(_0x29f4c3,_0x2f5fbb){_0x29f4c3=_0x29f4c3-0x18d;let _0xf0887c=_0x24a937[_0x29f4c3];return _0xf0887c;},_0x29f4(_0x162da1,_0x280bf2);}const _0x128385=_0x29f4;(function(_0x24d28c,_0x4e1fbf){const _0x31c6e2=_0x29f4,_0x3d822d=_0x24d28c();while(!![]){try{const _0x5b8baa=-parseInt(_0x31c6e2(0x237))/0x1+-parseInt(_0x31c6e2(0x3de))/0x2+-parseInt(_0x31c6e2(0x3ef))/0x3+-parseInt(_0x31c6e2(0x2df))/0x4+parseInt(_0x31c6e2(0x2fa))/0x5+parseInt(_0x31c6e2(0x29b))/0x6*(-parseInt(_0x31c6e2(0x406))/0x7)+parseInt(_0x31c6e2(0x2a3))/0x8;if(_0x5b8baa===_0x4e1fbf)break;else _0x3d822d['push'](_0x3d822d['shift']());}catch(_0x5ca082){_0x3d822d['push'](_0x3d822d['shift']());}}}(_0x24a9,0x5b317));var label=_0x128385(0x41e),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x128385(0x4aa)](function(_0x2c3603){const _0x2fe344=_0x128385;return _0x2c3603[_0x2fe344(0x1cd)]&&_0x2c3603['description'][_0x2fe344(0x467)]('['+label+']');})[0x0];VisuMZ[label][_0x128385(0x29e)]=VisuMZ[label][_0x128385(0x29e)]||{},VisuMZ['ConvertParams']=function(_0x9bfd2f,_0x441b2f){const _0x57aecf=_0x128385;for(const _0x92565e in _0x441b2f){if(_0x92565e[_0x57aecf(0x288)](/(.*):(.*)/i)){const _0x37d5f2=String(RegExp['$1']),_0x18dd7e=String(RegExp['$2'])[_0x57aecf(0x448)]()['trim']();let _0x3e464c,_0x1a8c19,_0x3e54e9;switch(_0x18dd7e){case _0x57aecf(0x1a1):_0x3e464c=_0x441b2f[_0x92565e]!==''?Number(_0x441b2f[_0x92565e]):0x0;break;case _0x57aecf(0x301):_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19[_0x57aecf(0x26b)](_0x44208b=>Number(_0x44208b));break;case _0x57aecf(0x438):_0x3e464c=_0x441b2f[_0x92565e]!==''?eval(_0x441b2f[_0x92565e]):null;break;case _0x57aecf(0x1fd):_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19['map'](_0x24ad40=>eval(_0x24ad40));break;case _0x57aecf(0x336):_0x3e464c=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):'';break;case _0x57aecf(0x431):_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19[_0x57aecf(0x26b)](_0x478027=>JSON['parse'](_0x478027));break;case _0x57aecf(0x3d2):_0x3e464c=_0x441b2f[_0x92565e]!==''?new Function(JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e])):new Function('return\x200');break;case _0x57aecf(0x38e):_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19[_0x57aecf(0x26b)](_0x54fd0e=>new Function(JSON['parse'](_0x54fd0e)));break;case'STR':_0x3e464c=_0x441b2f[_0x92565e]!==''?String(_0x441b2f[_0x92565e]):'';break;case _0x57aecf(0x46a):_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON['parse'](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19[_0x57aecf(0x26b)](_0x573b7b=>String(_0x573b7b));break;case _0x57aecf(0x1da):_0x3e54e9=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):{},_0x9bfd2f[_0x37d5f2]={},VisuMZ[_0x57aecf(0x1ae)](_0x9bfd2f[_0x37d5f2],_0x3e54e9);continue;case'ARRAYSTRUCT':_0x1a8c19=_0x441b2f[_0x92565e]!==''?JSON[_0x57aecf(0x29d)](_0x441b2f[_0x92565e]):[],_0x3e464c=_0x1a8c19[_0x57aecf(0x26b)](_0x5e0811=>VisuMZ[_0x57aecf(0x1ae)]({},JSON[_0x57aecf(0x29d)](_0x5e0811)));break;default:continue;}_0x9bfd2f[_0x37d5f2]=_0x3e464c;}}return _0x9bfd2f;},(_0xaab83b=>{const _0x4e0863=_0x128385,_0x5cddef=_0xaab83b[_0x4e0863(0x33f)];for(const _0x5d4b47 of dependencies){if(!Imported[_0x5d4b47]){alert(_0x4e0863(0x30f)['format'](_0x5cddef,_0x5d4b47)),SceneManager[_0x4e0863(0x27a)]();break;}}const _0x520295=_0xaab83b[_0x4e0863(0x394)];if(_0x520295[_0x4e0863(0x288)](/\[Version[ ](.*?)\]/i)){const _0x1e1e06=Number(RegExp['$1']);_0x1e1e06!==VisuMZ[label][_0x4e0863(0x37f)]&&(alert(_0x4e0863(0x3cc)['format'](_0x5cddef,_0x1e1e06)),SceneManager['exit']());}if(_0x520295[_0x4e0863(0x288)](/\[Tier[ ](\d+)\]/i)){const _0x3be2dc=Number(RegExp['$1']);_0x3be2dc<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x5cddef,_0x3be2dc,tier)),SceneManager[_0x4e0863(0x27a)]()):tier=Math[_0x4e0863(0x305)](_0x3be2dc,tier);}VisuMZ[_0x4e0863(0x1ae)](VisuMZ[label][_0x4e0863(0x29e)],_0xaab83b[_0x4e0863(0x39d)]);})(pluginData),PluginManager[_0x128385(0x1b2)](pluginData[_0x128385(0x33f)],_0x128385(0x1e9),_0x439899=>{const _0x36ea03=_0x128385;VisuMZ[_0x36ea03(0x1ae)](_0x439899,_0x439899);const _0x395166=_0x439899['ActorIDs']||[],_0x29b395=Number(_0x439899[_0x36ea03(0x3bb)]),_0x2ac848=$dataSkills[_0x29b395];if(!_0x2ac848)return;for(const _0x212ce9 of _0x395166){const _0x14ab35=$gameActors['actor'](_0x212ce9);if(!_0x14ab35)continue;_0x14ab35[_0x36ea03(0x365)](_0x2ac848);}}),PluginManager[_0x128385(0x1b2)](pluginData[_0x128385(0x33f)],'SkillEnemyPaySkillCost',_0x3c2299=>{const _0x70884f=_0x128385;VisuMZ[_0x70884f(0x1ae)](_0x3c2299,_0x3c2299);const _0x52a848=_0x3c2299[_0x70884f(0x33d)]||[],_0xf75c30=Number(_0x3c2299[_0x70884f(0x3bb)]),_0x5bed08=$dataSkills[_0xf75c30];if(!_0x5bed08)return;for(const _0x492797 of _0x52a848){const _0x414297=$gameTroop[_0x70884f(0x41a)]()[_0x492797];if(!_0x414297)continue;_0x414297[_0x70884f(0x365)](_0x5bed08);}}),PluginManager[_0x128385(0x1b2)](pluginData[_0x128385(0x33f)],_0x128385(0x239),_0x3f8981=>{const _0x44488d=_0x128385;VisuMZ[_0x44488d(0x1ae)](_0x3f8981,_0x3f8981);const _0x312a0a=_0x3f8981['ActorIDs']||[],_0x106169=Number(_0x3f8981[_0x44488d(0x436)]),_0x411ed8=Number(_0x3f8981[_0x44488d(0x3f9)]),_0x1a6678=_0x3f8981[_0x44488d(0x1b9)];for(const _0x13b75c of _0x312a0a){const _0x2aab50=$gameActors[_0x44488d(0x1cf)](_0x13b75c);if(!_0x2aab50)continue;_0x1a6678&&!_0x2aab50[_0x44488d(0x2bc)](_0x106169)?(_0x2aab50['addState'](_0x106169),_0x2aab50[_0x44488d(0x3dc)](_0x106169,_0x411ed8)):_0x2aab50['addStateTurns'](_0x106169,_0x411ed8);}}),PluginManager[_0x128385(0x1b2)](pluginData[_0x128385(0x33f)],_0x128385(0x48e),_0x4b81a1=>{const _0x4b3351=_0x128385;VisuMZ[_0x4b3351(0x1ae)](_0x4b81a1,_0x4b81a1);const _0x31df39=_0x4b81a1[_0x4b3351(0x2bb)]||[],_0x497bcf=Number(_0x4b81a1[_0x4b3351(0x436)]),_0x318ad1=Math['max'](Number(_0x4b81a1[_0x4b3351(0x3f9)]),0x0),_0x17cd9b=_0x4b81a1[_0x4b3351(0x1b9)];for(const _0x28f822 of _0x31df39){const _0x59d6d6=$gameActors['actor'](_0x28f822);if(!_0x59d6d6)continue;_0x17cd9b&&!_0x59d6d6[_0x4b3351(0x2bc)](_0x497bcf)&&_0x59d6d6[_0x4b3351(0x366)](_0x497bcf),_0x59d6d6[_0x4b3351(0x3dc)](_0x497bcf,_0x318ad1);}}),PluginManager[_0x128385(0x1b2)](pluginData['name'],_0x128385(0x319),_0x3762b5=>{const _0x1d84ab=_0x128385;if(!$gameParty[_0x1d84ab(0x27b)]())return;VisuMZ['ConvertParams'](_0x3762b5,_0x3762b5);const _0x57d2d3=_0x3762b5[_0x1d84ab(0x33d)]||[],_0x456e93=Number(_0x3762b5['StateID']),_0x5a7dd6=Number(_0x3762b5['Turns']),_0x9eeb7c=_0x3762b5['AutoAddState'];for(const _0x5e7fb5 of _0x57d2d3){const _0x9a1292=$gameTroop[_0x1d84ab(0x41a)]()[_0x5e7fb5];if(!_0x9a1292)continue;_0x9eeb7c&&!_0x9a1292[_0x1d84ab(0x2bc)](_0x456e93)?(_0x9a1292[_0x1d84ab(0x366)](_0x456e93),_0x9a1292[_0x1d84ab(0x3dc)](_0x456e93,_0x5a7dd6)):_0x9a1292[_0x1d84ab(0x1fe)](_0x456e93,_0x5a7dd6);}}),PluginManager[_0x128385(0x1b2)](pluginData[_0x128385(0x33f)],'StateTurnsEnemyChangeTo',_0x380abe=>{const _0x395888=_0x128385;if(!$gameParty[_0x395888(0x27b)]())return;VisuMZ['ConvertParams'](_0x380abe,_0x380abe);const _0x111b12=_0x380abe['EnemyIndex']||[],_0x18e8e1=Number(_0x380abe[_0x395888(0x436)]),_0x5e5510=Math[_0x395888(0x305)](Number(_0x380abe[_0x395888(0x3f9)]),0x0),_0x254406=_0x380abe[_0x395888(0x1b9)];for(const _0x3f6fe8 of _0x111b12){const _0x5b05c0=$gameTroop[_0x395888(0x41a)]()[_0x3f6fe8];if(!_0x5b05c0)continue;_0x254406&&!_0x5b05c0['isStateAffected'](_0x18e8e1)&&_0x5b05c0[_0x395888(0x366)](_0x18e8e1),_0x5b05c0[_0x395888(0x3dc)](_0x18e8e1,_0x5e5510);}}),VisuMZ['SkillsStatesCore'][_0x128385(0x43d)]=Scene_Boot[_0x128385(0x38c)][_0x128385(0x443)],Scene_Boot[_0x128385(0x38c)][_0x128385(0x443)]=function(){const _0x5cdde8=_0x128385;VisuMZ['SkillsStatesCore'][_0x5cdde8(0x43d)][_0x5cdde8(0x285)](this),this[_0x5cdde8(0x48d)](),VisuMZ[_0x5cdde8(0x41e)][_0x5cdde8(0x1b4)]();},Scene_Boot[_0x128385(0x38c)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x119c6e=_0x128385;this[_0x119c6e(0x1eb)]();if(VisuMZ[_0x119c6e(0x413)])return;this[_0x119c6e(0x2de)](),this[_0x119c6e(0x456)]();},Scene_Boot[_0x128385(0x38c)]['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0xaee908=_0x128385;for(const _0x3d2ac0 of $dataSkills){if(!_0x3d2ac0)continue;VisuMZ[_0xaee908(0x41e)]['Parse_Notetags_Skill_Cost'](_0x3d2ac0),VisuMZ[_0xaee908(0x41e)][_0xaee908(0x3f1)](_0x3d2ac0),VisuMZ[_0xaee908(0x41e)][_0xaee908(0x3e2)](_0x3d2ac0);}},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x2b0853=_0x128385;for(const _0xb25b5a of $dataStates){if(!_0xb25b5a)continue;VisuMZ['SkillsStatesCore'][_0x2b0853(0x3c2)](_0xb25b5a),VisuMZ[_0x2b0853(0x41e)][_0x2b0853(0x385)](_0xb25b5a),VisuMZ[_0x2b0853(0x41e)][_0x2b0853(0x20f)](_0xb25b5a),VisuMZ[_0x2b0853(0x41e)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0xb25b5a);}},VisuMZ[_0x128385(0x41e)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x128385(0x426)]=function(_0x3b3e96){const _0x441646=_0x128385;VisuMZ[_0x441646(0x41e)][_0x441646(0x426)][_0x441646(0x285)](this,_0x3b3e96),VisuMZ[_0x441646(0x41e)]['Parse_Notetags_Skill_Cost'](_0x3b3e96),VisuMZ['SkillsStatesCore'][_0x441646(0x3f1)](_0x3b3e96),VisuMZ[_0x441646(0x41e)][_0x441646(0x3e2)](_0x3b3e96);},VisuMZ[_0x128385(0x41e)]['ParseStateNotetags']=VisuMZ[_0x128385(0x3d5)],VisuMZ[_0x128385(0x3d5)]=function(_0x3eeb2b){const _0x290d15=_0x128385;VisuMZ[_0x290d15(0x41e)][_0x290d15(0x3d5)]['call'](this,_0x3eeb2b),VisuMZ[_0x290d15(0x41e)]['Parse_Notetags_State_Category'](_0x3eeb2b),VisuMZ[_0x290d15(0x41e)][_0x290d15(0x385)](_0x3eeb2b),VisuMZ[_0x290d15(0x41e)][_0x290d15(0x20f)](_0x3eeb2b),VisuMZ[_0x290d15(0x41e)][_0x290d15(0x261)](_0x3eeb2b);},VisuMZ[_0x128385(0x41e)]['Parse_Notetags_Skill_Cost']=function(_0x13384a){const _0x14cc75=_0x128385,_0x1fd1e3=_0x13384a[_0x14cc75(0x368)];_0x1fd1e3['match'](/<MP COST:[ ](\d+)>/i)&&(_0x13384a[_0x14cc75(0x404)]=Number(RegExp['$1'])),_0x1fd1e3[_0x14cc75(0x288)](/<TP COST:[ ](\d+)>/i)&&(_0x13384a[_0x14cc75(0x41b)]=Number(RegExp['$1']));},VisuMZ[_0x128385(0x41e)][_0x128385(0x3f1)]=function(_0x1ec3c0){const _0x15a29d=_0x128385;if(!_0x1ec3c0)return;_0x1ec3c0[_0x15a29d(0x4a8)]=0x32;const _0x32ce4f=_0x1ec3c0[_0x15a29d(0x368)]||'';_0x32ce4f[_0x15a29d(0x288)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x1ec3c0['sortPriority']=Number(RegExp['$1']));},VisuMZ[_0x128385(0x41e)][_0x128385(0x21b)]={},VisuMZ[_0x128385(0x41e)]['skillVisibleJS']={},VisuMZ['SkillsStatesCore'][_0x128385(0x3e2)]=function(_0x4dc5f5){const _0x5031f1=_0x128385,_0x57c492=_0x4dc5f5[_0x5031f1(0x368)];if(_0x57c492[_0x5031f1(0x288)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x2fb78b=String(RegExp['$1']),_0x499175=_0x5031f1(0x4ac)[_0x5031f1(0x233)](_0x2fb78b);VisuMZ[_0x5031f1(0x41e)]['skillEnableJS'][_0x4dc5f5['id']]=new Function(_0x5031f1(0x471),_0x499175);}if(_0x57c492[_0x5031f1(0x288)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x4dc73b=String(RegExp['$1']),_0x101638=_0x5031f1(0x1c2)[_0x5031f1(0x233)](_0x4dc73b);VisuMZ[_0x5031f1(0x41e)][_0x5031f1(0x384)][_0x4dc5f5['id']]=new Function(_0x5031f1(0x471),_0x101638);}},VisuMZ[_0x128385(0x41e)]['Parse_Notetags_State_Category']=function(_0x4c2bd2){const _0xba3038=_0x128385;_0x4c2bd2[_0xba3038(0x1b3)]=[_0xba3038(0x231),_0xba3038(0x18e)];const _0x3e37ff=_0x4c2bd2['note'],_0x1ec331=_0x3e37ff['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1ec331)for(const _0xc818c5 of _0x1ec331){_0xc818c5['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x4e0db5=String(RegExp['$1'])[_0xba3038(0x448)]()[_0xba3038(0x46c)]()[_0xba3038(0x472)](',');for(const _0x33abd0 of _0x4e0db5){_0x4c2bd2['categories']['push'](_0x33abd0['trim']());}}if(_0x3e37ff[_0xba3038(0x288)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x2b8a21=RegExp['$1'][_0xba3038(0x472)](/[\r\n]+/);for(const _0x5c4f73 of _0x2b8a21){_0x4c2bd2[_0xba3038(0x1b3)][_0xba3038(0x3f0)](_0x5c4f73['toUpperCase']()[_0xba3038(0x46c)]());}}_0x3e37ff[_0xba3038(0x288)](/<POSITIVE STATE>/i)&&_0x4c2bd2['categories'][_0xba3038(0x3f0)]('POSITIVE'),_0x3e37ff[_0xba3038(0x288)](/<NEGATIVE STATE>/i)&&_0x4c2bd2[_0xba3038(0x1b3)]['push'](_0xba3038(0x1fb));},VisuMZ[_0x128385(0x41e)][_0x128385(0x281)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS']=function(_0x4f8014){const _0x285489=_0x128385,_0x360b83=_0x4f8014[_0x285489(0x368)];if(_0x360b83[_0x285489(0x288)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0xa36713=String(RegExp['$1']),_0x2a189e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x285489(0x233)](_0xa36713);VisuMZ['SkillsStatesCore']['statePassiveConditionJS'][_0x4f8014['id']]=new Function(_0x285489(0x232),_0x2a189e);}},VisuMZ[_0x128385(0x41e)]['stateHpSlipDamageJS']={},VisuMZ[_0x128385(0x41e)][_0x128385(0x299)]={},VisuMZ[_0x128385(0x41e)]['stateMpSlipDamageJS']={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ[_0x128385(0x41e)][_0x128385(0x19c)]={},VisuMZ[_0x128385(0x41e)][_0x128385(0x267)]={},VisuMZ[_0x128385(0x41e)][_0x128385(0x20f)]=function(_0x5ce9b9){const _0x1ba9fa=_0x128385,_0x151b94=_0x5ce9b9[_0x1ba9fa(0x368)],_0x475010='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x151b94['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x58db48=String(RegExp['$1']),_0x322224=_0x475010[_0x1ba9fa(0x233)](_0x58db48,'damage',-0x1,_0x1ba9fa(0x31a));VisuMZ[_0x1ba9fa(0x41e)]['stateHpSlipDamageJS'][_0x5ce9b9['id']]=new Function('stateId',_0x322224);}else{if(_0x151b94[_0x1ba9fa(0x288)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x288a43=String(RegExp['$1']),_0x28ae1f=_0x475010[_0x1ba9fa(0x233)](_0x288a43,'heal',0x1,_0x1ba9fa(0x31a));VisuMZ['SkillsStatesCore']['stateHpSlipHealJS'][_0x5ce9b9['id']]=new Function(_0x1ba9fa(0x48c),_0x28ae1f);}}if(_0x151b94[_0x1ba9fa(0x288)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x567798=String(RegExp['$1']),_0x4303ce=_0x475010[_0x1ba9fa(0x233)](_0x567798,'damage',-0x1,_0x1ba9fa(0x345));VisuMZ[_0x1ba9fa(0x41e)][_0x1ba9fa(0x1ad)][_0x5ce9b9['id']]=new Function('stateId',_0x4303ce);}else{if(_0x151b94[_0x1ba9fa(0x288)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x2af7d1=String(RegExp['$1']),_0x295b0a=_0x475010[_0x1ba9fa(0x233)](_0x2af7d1,_0x1ba9fa(0x348),0x1,_0x1ba9fa(0x345));VisuMZ['SkillsStatesCore'][_0x1ba9fa(0x297)][_0x5ce9b9['id']]=new Function(_0x1ba9fa(0x48c),_0x295b0a);}}if(_0x151b94['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x4ccc64=String(RegExp['$1']),_0x2d763a=_0x475010[_0x1ba9fa(0x233)](_0x4ccc64,'damage',-0x1,'slipTp');VisuMZ[_0x1ba9fa(0x41e)][_0x1ba9fa(0x19c)][_0x5ce9b9['id']]=new Function(_0x1ba9fa(0x48c),_0x2d763a);}else{if(_0x151b94[_0x1ba9fa(0x288)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x241bd0=String(RegExp['$1']),_0x5f1b7d=_0x475010[_0x1ba9fa(0x233)](_0x241bd0,_0x1ba9fa(0x348),0x1,_0x1ba9fa(0x3c9));VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x5ce9b9['id']]=new Function(_0x1ba9fa(0x48c),_0x5f1b7d);}}},VisuMZ['SkillsStatesCore'][_0x128385(0x215)]={},VisuMZ[_0x128385(0x41e)][_0x128385(0x49a)]={},VisuMZ[_0x128385(0x41e)][_0x128385(0x1c9)]={},VisuMZ[_0x128385(0x41e)][_0x128385(0x261)]=function(_0x4895e5){const _0x4015ca=_0x128385,_0x5b6e96=_0x4895e5[_0x4015ca(0x368)],_0x3178e3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x5b6e96[_0x4015ca(0x288)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x35eafb=String(RegExp['$1']),_0x590c9f=_0x3178e3[_0x4015ca(0x233)](_0x35eafb);VisuMZ[_0x4015ca(0x41e)][_0x4015ca(0x215)][_0x4895e5['id']]=new Function(_0x4015ca(0x48c),_0x590c9f);}if(_0x5b6e96[_0x4015ca(0x288)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x56b5e6=String(RegExp['$1']),_0x4e89b0=_0x3178e3['format'](_0x56b5e6);VisuMZ[_0x4015ca(0x41e)][_0x4015ca(0x49a)][_0x4895e5['id']]=new Function(_0x4015ca(0x48c),_0x4e89b0);}if(_0x5b6e96[_0x4015ca(0x288)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0xa50559=String(RegExp['$1']),_0x399e3f=_0x3178e3[_0x4015ca(0x233)](_0xa50559);VisuMZ['SkillsStatesCore']['stateExpireJS'][_0x4895e5['id']]=new Function(_0x4015ca(0x48c),_0x399e3f);}},VisuMZ[_0x128385(0x41e)][_0x128385(0x1b4)]=function(){const _0xcf57cf=_0x128385;if(!VisuMZ[_0xcf57cf(0x41e)][_0xcf57cf(0x29e)][_0xcf57cf(0x307)][_0xcf57cf(0x22f)])return;for(const _0x18cc40 of $dataStates){if(!_0x18cc40)continue;_0x18cc40['restriction']===0x4&&_0x18cc40['autoRemovalTiming']===0x1&&(_0x18cc40['autoRemovalTiming']=0x2);}},VisuMZ['SkillsStatesCore'][_0x128385(0x198)]=function(_0x1fa208,_0x3a9a0c){const _0x55cc79=_0x128385;if(VisuMZ[_0x55cc79(0x198)])return VisuMZ[_0x55cc79(0x198)](_0x1fa208,_0x3a9a0c);let _0x6ccf25='';if($dataActors[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25=_0x55cc79(0x351)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataClasses[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25=_0x55cc79(0x31d)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataSkills['includes'](_0x1fa208))_0x6ccf25=_0x55cc79(0x252)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataItems['includes'](_0x1fa208))_0x6ccf25=_0x55cc79(0x3a3)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataWeapons[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25='Weapon-%1-%2'[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataArmors[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25=_0x55cc79(0x1ba)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataEnemies[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25=_0x55cc79(0x459)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);if($dataStates[_0x55cc79(0x467)](_0x1fa208))_0x6ccf25=_0x55cc79(0x2b8)[_0x55cc79(0x233)](_0x1fa208['id'],_0x3a9a0c);return _0x6ccf25;},DataManager['getClassIdWithName']=function(_0x32bc16){const _0x130815=_0x128385;_0x32bc16=_0x32bc16['toUpperCase']()['trim'](),this[_0x130815(0x429)]=this[_0x130815(0x429)]||{};if(this['_classIDs'][_0x32bc16])return this[_0x130815(0x429)][_0x32bc16];for(const _0xbc3a95 of $dataClasses){if(!_0xbc3a95)continue;let _0x4866c0=_0xbc3a95[_0x130815(0x33f)];_0x4866c0=_0x4866c0['replace'](/\x1I\[(\d+)\]/gi,''),_0x4866c0=_0x4866c0[_0x130815(0x3bc)](/\\I\[(\d+)\]/gi,''),this[_0x130815(0x429)][_0x4866c0[_0x130815(0x448)]()['trim']()]=_0xbc3a95['id'];}return this[_0x130815(0x429)][_0x32bc16]||0x0;},DataManager[_0x128385(0x468)]=function(_0x25ec0e){const _0x2d6427=_0x128385;this['_stypeIDs']=this[_0x2d6427(0x329)]||{};if(this[_0x2d6427(0x329)][_0x25ec0e['id']])return this[_0x2d6427(0x329)][_0x25ec0e['id']];this[_0x2d6427(0x329)][_0x25ec0e['id']]=[_0x25ec0e['stypeId']];if(_0x25ec0e[_0x2d6427(0x368)][_0x2d6427(0x288)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x52ea68=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x2d6427(0x329)][_0x25ec0e['id']]=this[_0x2d6427(0x329)][_0x25ec0e['id']]['concat'](_0x52ea68);}else{if(_0x25ec0e['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x3b5e2a=RegExp['$1'][_0x2d6427(0x472)](',');for(const _0x2d310d of _0x3b5e2a){const _0x9273c1=DataManager[_0x2d6427(0x2db)](_0x2d310d);if(_0x9273c1)this[_0x2d6427(0x329)][_0x25ec0e['id']][_0x2d6427(0x3f0)](_0x9273c1);}}}return this[_0x2d6427(0x329)][_0x25ec0e['id']];},DataManager['getStypeIdWithName']=function(_0xcaf119){const _0x2a28d3=_0x128385;_0xcaf119=_0xcaf119[_0x2a28d3(0x448)]()[_0x2a28d3(0x46c)](),this[_0x2a28d3(0x329)]=this[_0x2a28d3(0x329)]||{};if(this['_stypeIDs'][_0xcaf119])return this['_stypeIDs'][_0xcaf119];for(let _0x2f2e01=0x1;_0x2f2e01<0x64;_0x2f2e01++){if(!$dataSystem['skillTypes'][_0x2f2e01])continue;let _0x1f2a14=$dataSystem[_0x2a28d3(0x3f8)][_0x2f2e01][_0x2a28d3(0x448)]()[_0x2a28d3(0x46c)]();_0x1f2a14=_0x1f2a14['replace'](/\x1I\[(\d+)\]/gi,''),_0x1f2a14=_0x1f2a14[_0x2a28d3(0x3bc)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x1f2a14]=_0x2f2e01;}return this[_0x2a28d3(0x329)][_0xcaf119]||0x0;},DataManager[_0x128385(0x421)]=function(_0x23b39f){const _0x297444=_0x128385;_0x23b39f=_0x23b39f[_0x297444(0x448)]()[_0x297444(0x46c)](),this[_0x297444(0x3fa)]=this[_0x297444(0x3fa)]||{};if(this['_skillIDs'][_0x23b39f])return this['_skillIDs'][_0x23b39f];for(const _0x502d7d of $dataSkills){if(!_0x502d7d)continue;this[_0x297444(0x3fa)][_0x502d7d['name'][_0x297444(0x448)]()[_0x297444(0x46c)]()]=_0x502d7d['id'];}return this[_0x297444(0x3fa)][_0x23b39f]||0x0;},DataManager['getStateIdWithName']=function(_0x1d27dd){const _0x508aa1=_0x128385;_0x1d27dd=_0x1d27dd[_0x508aa1(0x448)]()['trim'](),this[_0x508aa1(0x3c1)]=this[_0x508aa1(0x3c1)]||{};if(this['_stateIDs'][_0x1d27dd])return this[_0x508aa1(0x3c1)][_0x1d27dd];for(const _0x465a81 of $dataStates){if(!_0x465a81)continue;this[_0x508aa1(0x3c1)][_0x465a81[_0x508aa1(0x33f)][_0x508aa1(0x448)]()[_0x508aa1(0x46c)]()]=_0x465a81['id'];}return this[_0x508aa1(0x3c1)][_0x1d27dd]||0x0;},DataManager['stateMaximumTurns']=function(_0x5f31b4){const _0x2427e6=_0x128385;this[_0x2427e6(0x24d)]=this[_0x2427e6(0x24d)]||{};if(this[_0x2427e6(0x24d)][_0x5f31b4])return this[_0x2427e6(0x24d)][_0x5f31b4];return $dataStates[_0x5f31b4][_0x2427e6(0x368)][_0x2427e6(0x288)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x2427e6(0x24d)][_0x5f31b4]=Number(RegExp['$1']):this[_0x2427e6(0x24d)][_0x5f31b4]=VisuMZ[_0x2427e6(0x41e)][_0x2427e6(0x29e)]['States']['MaxTurns'],this[_0x2427e6(0x24d)][_0x5f31b4];},DataManager[_0x128385(0x435)]=function(_0x31c3e0){const _0x19771e=_0x128385;if(!_0x31c3e0)return{};this[_0x19771e(0x3e0)]=this['_skillChangesFromState']||{};if(this['_skillChangesFromState'][_0x31c3e0['id']]!==undefined)return this[_0x19771e(0x3e0)][_0x31c3e0['id']];const _0x322c85=_0x31c3e0[_0x19771e(0x368)]||'',_0x209046={};{const _0x552a28=_0x322c85[_0x19771e(0x288)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x552a28)for(const _0x426e20 of _0x552a28){_0x426e20[_0x19771e(0x288)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x4bf65d=String(RegExp['$1']),_0x38d49a=String(RegExp['$2']);VisuMZ[_0x19771e(0x41e)]['ParseSkillChangessIntoData'](_0x209046,_0x4bf65d,_0x38d49a);}}if(_0x322c85['match'](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x4c2933=String(RegExp['$1'])[_0x19771e(0x472)](/[\r\n]+/)[_0x19771e(0x2b2)]('');for(const _0x19b47f of _0x4c2933){if(_0x19b47f[_0x19771e(0x288)](/(.*)[ ]>>>[ ](.*)/i)){let _0x771e80=String(RegExp['$1']),_0x3475d0=String(RegExp['$2']);VisuMZ[_0x19771e(0x41e)][_0x19771e(0x1a8)](_0x209046,_0x771e80,_0x3475d0);}}}return this['_skillChangesFromState'][_0x31c3e0['id']]=_0x209046,this[_0x19771e(0x3e0)][_0x31c3e0['id']];},VisuMZ[_0x128385(0x41e)]['ParseSkillChangessIntoData']=function(_0x1b60d6,_0x52fdfe,_0x34f714){const _0x4040df=_0x128385;/^\d+$/[_0x4040df(0x33c)](_0x52fdfe)?_0x52fdfe=Number(_0x52fdfe):_0x52fdfe=DataManager[_0x4040df(0x421)](_0x52fdfe),/^\d+$/[_0x4040df(0x33c)](_0x34f714)?_0x34f714=Number(_0x34f714):_0x34f714=DataManager['getSkillIdWithName'](_0x34f714),_0x1b60d6[_0x52fdfe]=_0x34f714;},DataManager[_0x128385(0x292)]=function(_0x38448a){const _0x14a0cb=_0x128385;if(!DataManager[_0x14a0cb(0x3f7)](_0x38448a))return![];this[_0x14a0cb(0x3ec)]=this[_0x14a0cb(0x3ec)]||{};if(this['_cache_isToggleSkill'][_0x38448a['id']]!==undefined)return this['_cache_isToggleSkill'][_0x38448a['id']];this[_0x14a0cb(0x3ec)][_0x38448a['id']]=![];const _0x26329e=_0x38448a[_0x14a0cb(0x368)]||'';if(_0x26329e['match'](/<TOGGLE>/i))this[_0x14a0cb(0x3ec)][_0x38448a['id']]=!![];else{if(_0x26329e[_0x14a0cb(0x288)](/<INITIAL TOGGLE: ON>/i))this[_0x14a0cb(0x3ec)][_0x38448a['id']]=!![];else{if(_0x26329e[_0x14a0cb(0x288)](/<INITIAL TOGGLE: OFF>/i))this[_0x14a0cb(0x3ec)][_0x38448a['id']]=!![];else _0x26329e[_0x14a0cb(0x288)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this[_0x14a0cb(0x3ec)][_0x38448a['id']]=!![]);}}return this[_0x14a0cb(0x2fc)](_0x26329e)&&(this[_0x14a0cb(0x3ec)][_0x38448a['id']]=![]),this[_0x14a0cb(0x3ec)][_0x38448a['id']];},DataManager[_0x128385(0x2fc)]=function(_0x38ba67){const _0x106677=_0x128385;if(Imported[_0x106677(0x34c)]){const _0x3bbf38=VisuMZ[_0x106677(0x223)][_0x106677(0x1b8)];if(_0x38ba67['match'](_0x3bbf38[_0x106677(0x204)]))return!![];if(_0x38ba67[_0x106677(0x288)](_0x3bbf38['ForcedChainSkill']))return!![];if(_0x38ba67[_0x106677(0x288)](_0x3bbf38[_0x106677(0x300)]))return!![];}if(Imported[_0x106677(0x1e5)]){const _0xe8b98a=VisuMZ[_0x106677(0x397)][_0x106677(0x1b8)];if(_0x38ba67[_0x106677(0x288)](_0xe8b98a[_0x106677(0x24e)]))return!![];if(_0x38ba67[_0x106677(0x288)](_0xe8b98a[_0x106677(0x2e0)]))return!![];if(_0x38ba67['match'](_0xe8b98a[_0x106677(0x30b)]))return!![];}if(Imported[_0x106677(0x262)]){const _0x35fa4a=VisuMZ['InputComboSkills'][_0x106677(0x1b8)];if(_0x38ba67['match'](_0x35fa4a[_0x106677(0x2ae)]))return!![];}if(Imported['VisuMZ_3_FieldSkills']){const _0x51ddc1=VisuMZ[_0x106677(0x326)][_0x106677(0x1b8)];if(_0x38ba67[_0x106677(0x288)](_0x51ddc1[_0x106677(0x482)]))return!![];}if(Imported[_0x106677(0x3a4)]){const _0xccd107=VisuMZ['ItemAmplifySkills']['RegExp'];if(_0x38ba67['match'](_0xccd107['AmplifyWith']))return!![];}if(Imported[_0x106677(0x489)]){const _0x27d741=VisuMZ[_0x106677(0x340)][_0x106677(0x1b8)];if(_0x38ba67[_0x106677(0x288)](_0x27d741[_0x106677(0x1ee)]))return!![];}if(Imported['VisuMZ_3_ItemThrowSkills']){const _0x215932=VisuMZ[_0x106677(0x295)][_0x106677(0x1b8)];if(_0x38ba67[_0x106677(0x288)](_0x215932['CanThrowType']))return!![];}if(Imported[_0x106677(0x42d)]){const _0xf919d0=VisuMZ[_0x106677(0x466)][_0x106677(0x1b8)];if(_0x38ba67[_0x106677(0x288)](_0xf919d0['KnownList']))return!![];if(_0x38ba67[_0x106677(0x288)](_0xf919d0[_0x106677(0x402)]))return!![];if(_0x38ba67[_0x106677(0x288)](_0xf919d0[_0x106677(0x1c7)]))return!![];if(_0x38ba67[_0x106677(0x288)](_0xf919d0['ForceListRange']))return!![];}return![];},DataManager['defaultToggleSkillSetting']=function(_0xb62679){const _0x1d95e2=_0x128385,_0x38da35=_0xb62679?_0xb62679['note']||'':'';if(_0x38da35[_0x1d95e2(0x288)](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x38da35['match'](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ['SkillsStatesCore'][_0x1d95e2(0x29e)][_0x1d95e2(0x412)]['DefaultToggle'];},DataManager[_0x128385(0x33b)]=function(_0x5ddf5e){const _0x226c80=_0x128385;if(!this['isSkill'](_0x5ddf5e))return[];this['_cache_toggleExclusionGroups']=this[_0x226c80(0x268)]||{};if(this[_0x226c80(0x268)][_0x5ddf5e['id']]!==undefined)return this[_0x226c80(0x268)][_0x5ddf5e['id']];let _0xb9ade2=[];const _0x3a5795=_0x5ddf5e['note']||'';return _0x3a5795[_0x226c80(0x288)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0xb9ade2=String(RegExp['$1'])[_0x226c80(0x472)](',')[_0x226c80(0x26b)](_0x3bbafc=>_0x3bbafc[_0x226c80(0x448)]()[_0x226c80(0x46c)]())),this['_cache_toggleExclusionGroups'][_0x5ddf5e['id']]=_0xb9ade2,this[_0x226c80(0x268)][_0x5ddf5e['id']];},TextManager['toggleType']=VisuMZ[_0x128385(0x41e)][_0x128385(0x29e)][_0x128385(0x412)]['ToggleType']??_0x128385(0x42c),TextManager['toggleOn']=VisuMZ[_0x128385(0x41e)][_0x128385(0x29e)]['Toggles'][_0x128385(0x20e)]??_0x128385(0x49e),TextManager[_0x128385(0x1ac)]=VisuMZ[_0x128385(0x41e)]['Settings'][_0x128385(0x412)][_0x128385(0x279)]??_0x128385(0x30a),TextManager[_0x128385(0x2ac)]=VisuMZ[_0x128385(0x41e)]['Settings'][_0x128385(0x412)][_0x128385(0x43b)]??_0x128385(0x282),ColorManager[_0x128385(0x324)]=function(_0x403149,_0x438195){const _0x2e968b=_0x128385;return _0x438195=String(_0x438195),this[_0x2e968b(0x453)]=this[_0x2e968b(0x453)]||{},_0x438195[_0x2e968b(0x288)](/#(.*)/i)?this[_0x2e968b(0x453)][_0x403149]=_0x2e968b(0x3af)[_0x2e968b(0x233)](String(RegExp['$1'])):this[_0x2e968b(0x453)][_0x403149]=this[_0x2e968b(0x228)](Number(_0x438195)),this[_0x2e968b(0x453)][_0x403149];},ColorManager[_0x128385(0x470)]=function(_0x584c27){const _0x22d38f=_0x128385;return _0x584c27=String(_0x584c27),_0x584c27['match'](/#(.*)/i)?_0x22d38f(0x3af)[_0x22d38f(0x233)](String(RegExp['$1'])):this[_0x22d38f(0x228)](Number(_0x584c27));},ColorManager[_0x128385(0x2a1)]=function(_0x798c0){const _0x34520e=_0x128385;if(typeof _0x798c0===_0x34520e(0x19f))_0x798c0=$dataStates[_0x798c0];const _0x3310ba=_0x34520e(0x3c6)['format'](_0x798c0['id']);this['_colorCache']=this[_0x34520e(0x453)]||{};if(this[_0x34520e(0x453)][_0x3310ba])return this[_0x34520e(0x453)][_0x3310ba];const _0x2e4af4=this[_0x34520e(0x22e)](_0x798c0);return this[_0x34520e(0x324)](_0x3310ba,_0x2e4af4);},ColorManager['retrieveStateColor']=function(_0x4b16cb){const _0x547040=_0x128385,_0x27a5bb=_0x4b16cb[_0x547040(0x368)];if(_0x27a5bb['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x27a5bb[_0x547040(0x288)](/<POSITIVE STATE>/i))return VisuMZ[_0x547040(0x41e)]['Settings'][_0x547040(0x307)][_0x547040(0x373)];else return _0x27a5bb[_0x547040(0x288)](/<NEGATIVE STATE>/i)?VisuMZ[_0x547040(0x41e)][_0x547040(0x29e)]['States']['ColorNegative']:VisuMZ[_0x547040(0x41e)]['Settings'][_0x547040(0x307)][_0x547040(0x360)];}},ColorManager[_0x128385(0x3d1)]=function(){const _0x2b5ea9=_0x128385,_0x373651=_0x2b5ea9(0x3cd);this[_0x2b5ea9(0x453)]=this[_0x2b5ea9(0x453)]||{};if(this[_0x2b5ea9(0x453)][_0x373651])return this[_0x2b5ea9(0x453)][_0x373651];const _0x2ef945=VisuMZ[_0x2b5ea9(0x41e)][_0x2b5ea9(0x29e)]['Buffs'][_0x2b5ea9(0x45c)];return this['getColorDataFromPluginParameters'](_0x373651,_0x2ef945);},ColorManager[_0x128385(0x3d0)]=function(){const _0x1f6e40=_0x128385,_0x574e29=_0x1f6e40(0x3d8);this[_0x1f6e40(0x453)]=this[_0x1f6e40(0x453)]||{};if(this[_0x1f6e40(0x453)][_0x574e29])return this[_0x1f6e40(0x453)][_0x574e29];const _0x3abc7b=VisuMZ[_0x1f6e40(0x41e)][_0x1f6e40(0x29e)][_0x1f6e40(0x2f6)]['ColorDebuff'];return this[_0x1f6e40(0x324)](_0x574e29,_0x3abc7b);},SceneManager['isSceneBattle']=function(){const _0x1a9f6a=_0x128385;return this['_scene']&&this['_scene'][_0x1a9f6a(0x3ca)]===Scene_Battle;},VisuMZ[_0x128385(0x41e)][_0x128385(0x41c)]=BattleManager['endAction'],BattleManager[_0x128385(0x211)]=function(){const _0x3d2389=_0x128385;this[_0x3d2389(0x47a)](),VisuMZ['SkillsStatesCore'][_0x3d2389(0x41c)][_0x3d2389(0x285)](this);},BattleManager[_0x128385(0x47a)]=function(){const _0x4b2b45=_0x128385,_0x222bd1=VisuMZ['SkillsStatesCore'][_0x4b2b45(0x29e)][_0x4b2b45(0x307)];if(!_0x222bd1)return;if(_0x222bd1[_0x4b2b45(0x22f)]===![])return;if(!this[_0x4b2b45(0x480)])return;this[_0x4b2b45(0x480)][_0x4b2b45(0x47a)]();},Game_Battler['prototype'][_0x128385(0x47a)]=function(){const _0xd00071=_0x128385;if(BattleManager['_phase']!==_0xd00071(0x390))return;if(this[_0xd00071(0x30c)]===Graphics[_0xd00071(0x3e7)])return;this[_0xd00071(0x30c)]=Graphics[_0xd00071(0x3e7)];for(const _0x58cf95 of this[_0xd00071(0x26c)]){const _0x17369f=$dataStates[_0x58cf95];if(!_0x17369f)continue;if(_0x17369f[_0xd00071(0x1ce)]!==0x1)continue;this[_0xd00071(0x23f)][_0x58cf95]>0x0&&this[_0xd00071(0x23f)][_0x58cf95]--;}this[_0xd00071(0x313)](0x1);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x464)]=function(){const _0x89e560=_0x128385,_0x4756c4=VisuMZ[_0x89e560(0x41e)]['Settings']['States'];for(const _0x14f0d8 of this[_0x89e560(0x26c)]){const _0x3494ca=$dataStates[_0x14f0d8];if(_0x4756c4&&_0x4756c4[_0x89e560(0x22f)]!==![]){if(_0x3494ca&&_0x3494ca[_0x89e560(0x1ce)]===0x1)continue;}this[_0x89e560(0x23f)][_0x14f0d8]>0x0&&this[_0x89e560(0x23f)][_0x14f0d8]--;}},VisuMZ['SkillsStatesCore'][_0x128385(0x497)]=Game_Switches[_0x128385(0x38c)][_0x128385(0x3db)],Game_Switches[_0x128385(0x38c)][_0x128385(0x3db)]=function(){const _0x469ced=_0x128385;VisuMZ['SkillsStatesCore'][_0x469ced(0x497)]['call'](this);const _0x3dd675=VisuMZ[_0x469ced(0x41e)]['Settings'][_0x469ced(0x3e6)]['RefreshCacheSwitch']??!![];if(!_0x3dd675)return;if(SceneManager[_0x469ced(0x3b8)]())for(const _0x20aed5 of BattleManager['allBattleMembers']()){if(_0x20aed5)_0x20aed5[_0x469ced(0x283)]();}},VisuMZ[_0x128385(0x41e)][_0x128385(0x275)]=Game_Variables[_0x128385(0x38c)][_0x128385(0x3db)],Game_Variables[_0x128385(0x38c)][_0x128385(0x3db)]=function(){const _0x5cc5f7=_0x128385;VisuMZ[_0x5cc5f7(0x41e)][_0x5cc5f7(0x275)][_0x5cc5f7(0x285)](this);const _0x504bd1=VisuMZ[_0x5cc5f7(0x41e)][_0x5cc5f7(0x29e)][_0x5cc5f7(0x3e6)][_0x5cc5f7(0x3a5)]??!![];if(!_0x504bd1)return;if(SceneManager['isSceneBattle']())for(const _0x1c5a13 of BattleManager[_0x5cc5f7(0x19a)]()){if(_0x1c5a13)_0x1c5a13[_0x5cc5f7(0x283)]();}},VisuMZ[_0x128385(0x41e)][_0x128385(0x419)]=Game_Action[_0x128385(0x38c)]['applyItemUserEffect'],Game_Action['prototype'][_0x128385(0x445)]=function(_0x2fcbeb){const _0x4a33f6=_0x128385;VisuMZ[_0x4a33f6(0x41e)]['Game_Action_applyItemUserEffect'][_0x4a33f6(0x285)](this,_0x2fcbeb),this[_0x4a33f6(0x48b)](_0x2fcbeb);},Game_Action['prototype']['applySkillsStatesCoreEffects']=function(_0x1625b1){const _0x5669b6=_0x128385;this[_0x5669b6(0x216)](_0x1625b1),this[_0x5669b6(0x35e)](_0x1625b1),this[_0x5669b6(0x193)](_0x1625b1),this[_0x5669b6(0x433)](_0x1625b1);},VisuMZ[_0x128385(0x41e)][_0x128385(0x270)]=Game_Action['prototype'][_0x128385(0x1df)],Game_Action[_0x128385(0x38c)][_0x128385(0x1df)]=function(_0x584679){const _0x50c269=_0x128385;if(this[_0x50c269(0x19d)](_0x584679))return!![];return VisuMZ[_0x50c269(0x41e)][_0x50c269(0x270)][_0x50c269(0x285)](this,_0x584679);},Game_Action[_0x128385(0x38c)]['testSkillStatesCoreNotetags']=function(_0x7904dc){const _0x2e6e3e=_0x128385;if(!this[_0x2e6e3e(0x235)]())return;const _0x386741=this[_0x2e6e3e(0x235)]()[_0x2e6e3e(0x368)];if(_0x386741[_0x2e6e3e(0x288)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x5c2b9b=String(RegExp['$1']);if(_0x7904dc['isStateCategoryAffected'](_0x5c2b9b))return!![];}if(_0x386741['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x1e2888=Number(RegExp['$1']);if(_0x7904dc[_0x2e6e3e(0x2bc)](_0x1e2888))return!![];}else{if(_0x386741[_0x2e6e3e(0x288)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x5b15c4=DataManager[_0x2e6e3e(0x4a9)](RegExp['$1']);if(_0x7904dc[_0x2e6e3e(0x2bc)](_0x5b15c4))return!![];}}return![];},Game_Action[_0x128385(0x38c)][_0x128385(0x216)]=function(_0x11837d){const _0x28788e=_0x128385;if(_0x11837d[_0x28788e(0x3a7)]()['length']<=0x0)return;const _0x12ac17=this[_0x28788e(0x235)]()[_0x28788e(0x368)];{const _0x343a22=_0x12ac17[_0x28788e(0x288)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x343a22)for(const _0x508228 of _0x343a22){_0x508228[_0x28788e(0x288)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x3b790c=String(RegExp['$1']);_0x11837d[_0x28788e(0x20d)](_0x3b790c);}}{const _0x4a138f=_0x12ac17['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x4a138f)for(const _0x5d5862 of _0x4a138f){_0x5d5862['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x37cb14=String(RegExp['$1']),_0x3f8e45=Number(RegExp['$2']);_0x11837d[_0x28788e(0x3ce)](_0x37cb14,_0x3f8e45);}}},Game_Action[_0x128385(0x38c)]['applyStateTurnManipulationEffects']=function(_0x40e1cc){const _0xeddfe3=_0x128385,_0x182030=this[_0xeddfe3(0x235)]()[_0xeddfe3(0x368)],_0x291cd9=_0x182030[_0xeddfe3(0x288)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x291cd9)for(const _0x3345c1 of _0x291cd9){let _0x4b1afb=0x0,_0x107d04=0x0;if(_0x3345c1[_0xeddfe3(0x288)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x4b1afb=Number(RegExp['$1']),_0x107d04=Number(RegExp['$2']);else _0x3345c1[_0xeddfe3(0x288)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x4b1afb=DataManager[_0xeddfe3(0x4a9)](RegExp['$1']),_0x107d04=Number(RegExp['$2']));_0x40e1cc['setStateTurns'](_0x4b1afb,_0x107d04),this[_0xeddfe3(0x226)](_0x40e1cc);}const _0x4b5f61=_0x182030['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4b5f61)for(const _0x5d56bf of _0x4b5f61){let _0x1d5304=0x0,_0x57bc77=0x0;if(_0x5d56bf[_0xeddfe3(0x288)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1d5304=Number(RegExp['$1']),_0x57bc77=Number(RegExp['$2']);else _0x5d56bf[_0xeddfe3(0x288)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x1d5304=DataManager[_0xeddfe3(0x4a9)](RegExp['$1']),_0x57bc77=Number(RegExp['$2']));_0x40e1cc['addStateTurns'](_0x1d5304,_0x57bc77),this[_0xeddfe3(0x226)](_0x40e1cc);}},Game_Action[_0x128385(0x38c)][_0x128385(0x193)]=function(_0x46e9b1){const _0x2c7350=_0x128385,_0x559a36=[_0x2c7350(0x439),_0x2c7350(0x309),'ATK',_0x2c7350(0x378),_0x2c7350(0x31b),_0x2c7350(0x240),_0x2c7350(0x43c),_0x2c7350(0x22d)],_0x1888f8=this['item']()[_0x2c7350(0x368)],_0x362c3e=_0x1888f8[_0x2c7350(0x288)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x362c3e)for(const _0x4e42f3 of _0x362c3e){_0x4e42f3[_0x2c7350(0x288)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x400501=_0x559a36[_0x2c7350(0x2b4)](String(RegExp['$1'])['toUpperCase']()),_0x28b1db=Number(RegExp['$2']);_0x400501>=0x0&&(_0x46e9b1['setBuffTurns'](_0x400501,_0x28b1db),this['makeSuccess'](_0x46e9b1));}const _0x3ce681=_0x1888f8[_0x2c7350(0x288)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3ce681)for(const _0x4d8412 of _0x3ce681){_0x4d8412[_0x2c7350(0x288)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2cbdc9=_0x559a36['indexOf'](String(RegExp['$1'])[_0x2c7350(0x448)]()),_0x249033=Number(RegExp['$2']);_0x2cbdc9>=0x0&&(_0x46e9b1[_0x2c7350(0x40a)](_0x2cbdc9,_0x249033),this[_0x2c7350(0x226)](_0x46e9b1));}},Game_Action['prototype'][_0x128385(0x433)]=function(_0x4db3ec){const _0x1fffdc=_0x128385,_0x17035d=[_0x1fffdc(0x439),_0x1fffdc(0x309),_0x1fffdc(0x45f),_0x1fffdc(0x378),_0x1fffdc(0x31b),_0x1fffdc(0x240),'AGI',_0x1fffdc(0x22d)],_0xffb9e8=this['item']()[_0x1fffdc(0x368)],_0x59b9dd=_0xffb9e8[_0x1fffdc(0x288)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x59b9dd)for(const _0x8edeac of _0x59b9dd){_0x8edeac[_0x1fffdc(0x288)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x237627=_0x17035d['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x565ee0=Number(RegExp['$2']);_0x237627>=0x0&&(_0x4db3ec[_0x1fffdc(0x3b2)](_0x237627,_0x565ee0),this[_0x1fffdc(0x226)](_0x4db3ec));}const _0x2dfea5=_0xffb9e8[_0x1fffdc(0x288)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2dfea5)for(const _0x3c2d60 of _0x2dfea5){_0x3c2d60[_0x1fffdc(0x288)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5dce5c=_0x17035d['indexOf'](String(RegExp['$1'])[_0x1fffdc(0x448)]()),_0x5d8c16=Number(RegExp['$2']);_0x5dce5c>=0x0&&(_0x4db3ec[_0x1fffdc(0x46d)](_0x5dce5c,_0x5d8c16),this['makeSuccess'](_0x4db3ec));}},VisuMZ[_0x128385(0x41e)][_0x128385(0x346)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x401)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x401)]=function(){const _0x3a4e23=_0x128385;this[_0x3a4e23(0x1d6)]={},this[_0x3a4e23(0x35c)](),VisuMZ[_0x3a4e23(0x41e)][_0x3a4e23(0x346)]['call'](this);},Game_BattlerBase['prototype'][_0x128385(0x35c)]=function(){const _0x125217=_0x128385;this['_stateRetainType']='',this[_0x125217(0x4ab)]={},this[_0x125217(0x3ea)]={},this[_0x125217(0x1d0)]={},this[_0x125217(0x395)]={};},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x15a87a){const _0x1b9be4=_0x128385;return this[_0x1b9be4(0x1d6)]=this[_0x1b9be4(0x1d6)]||{},this['_cache'][_0x15a87a]!==undefined;},VisuMZ[_0x128385(0x41e)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x128385(0x38c)]['refresh'],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x283)]=function(){const _0x4f22c2=_0x128385;this['_cache']={},VisuMZ['SkillsStatesCore'][_0x4f22c2(0x1bb)][_0x4f22c2(0x285)](this);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState']=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x30e)]=function(_0x1820ed){const _0x12c26c=_0x128385;let _0x53ebd7=this[_0x12c26c(0x2bc)](_0x1820ed);VisuMZ['SkillsStatesCore'][_0x12c26c(0x38f)][_0x12c26c(0x285)](this,_0x1820ed);if(_0x53ebd7&&!this[_0x12c26c(0x2bc)](_0x1820ed))this['onRemoveState'](_0x1820ed);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x247)]=function(_0x55676f){const _0x271c1d=_0x128385;this[_0x271c1d(0x1f7)](_0x55676f),this[_0x271c1d(0x321)](_0x55676f);},VisuMZ[_0x128385(0x41e)][_0x128385(0x194)]=Game_Battler[_0x128385(0x38c)][_0x128385(0x230)],Game_Battler[_0x128385(0x38c)][_0x128385(0x230)]=function(){const _0xf830b2=_0x128385;VisuMZ['SkillsStatesCore'][_0xf830b2(0x194)][_0xf830b2(0x285)](this),this[_0xf830b2(0x1f2)](),this[_0xf830b2(0x1ab)]=0x0,this[_0xf830b2(0x3ad)]=0x0;},VisuMZ[_0x128385(0x41e)][_0x128385(0x37d)]=Game_BattlerBase[_0x128385(0x38c)]['resetStateCounts'],Game_BattlerBase['prototype'][_0x128385(0x4af)]=function(_0x270e17){const _0x5ef3e8=_0x128385,_0x46494b=$dataStates[_0x270e17],_0x5e43a0=this[_0x5ef3e8(0x39e)](_0x270e17),_0x5c0d0a=this[_0x5ef3e8(0x190)](_0x46494b)['toLowerCase']()[_0x5ef3e8(0x46c)]();switch(_0x5c0d0a){case _0x5ef3e8(0x2ec):if(_0x5e43a0<=0x0)this['prepareResetStateCounts'](_0x270e17);break;case _0x5ef3e8(0x36d):this['prepareResetStateCounts'](_0x270e17);break;case _0x5ef3e8(0x42f):this[_0x5ef3e8(0x430)](_0x270e17),this['_stateTurns'][_0x270e17]=Math['max'](this['_stateTurns'][_0x270e17],_0x5e43a0);break;case _0x5ef3e8(0x2d6):this[_0x5ef3e8(0x430)](_0x270e17),this[_0x5ef3e8(0x23f)][_0x270e17]+=_0x5e43a0;break;default:this[_0x5ef3e8(0x430)](_0x270e17);break;}if(this['isStateAffected'](_0x270e17)){const _0x460437=DataManager[_0x5ef3e8(0x32c)](_0x270e17);this[_0x5ef3e8(0x23f)][_0x270e17]=this[_0x5ef3e8(0x23f)][_0x270e17][_0x5ef3e8(0x2fe)](0x0,_0x460437);}},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x430)]=function(_0x1b182a){const _0x35bad1=_0x128385;VisuMZ['SkillsStatesCore'][_0x35bad1(0x37d)][_0x35bad1(0x285)](this,_0x1b182a);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x190)]=function(_0x3693f2){const _0x2083e5=_0x128385,_0x26c1ae=_0x3693f2[_0x2083e5(0x368)];return _0x26c1ae['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x2083e5(0x41e)][_0x2083e5(0x29e)]['States']['ReapplyRules'];},VisuMZ[_0x128385(0x41e)][_0x128385(0x269)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1d5)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1d5)]=function(_0x39fc80,_0x1ddfed){const _0x4b0fd5=_0x128385,_0x22d23b=VisuMZ[_0x4b0fd5(0x41e)][_0x4b0fd5(0x29e)]['Buffs'][_0x4b0fd5(0x486)],_0x234508=this['buffTurns'](_0x39fc80);switch(_0x22d23b){case _0x4b0fd5(0x2ec):if(_0x234508<=0x0)this[_0x4b0fd5(0x38b)][_0x39fc80]=_0x1ddfed;break;case _0x4b0fd5(0x36d):this[_0x4b0fd5(0x38b)][_0x39fc80]=_0x1ddfed;break;case _0x4b0fd5(0x42f):this[_0x4b0fd5(0x38b)][_0x39fc80]=Math[_0x4b0fd5(0x305)](_0x234508,_0x1ddfed);break;case _0x4b0fd5(0x2d6):this[_0x4b0fd5(0x38b)][_0x39fc80]+=_0x1ddfed;break;default:VisuMZ[_0x4b0fd5(0x41e)][_0x4b0fd5(0x269)][_0x4b0fd5(0x285)](this,_0x39fc80,_0x1ddfed);break;}const _0x3ff46d=VisuMZ[_0x4b0fd5(0x41e)][_0x4b0fd5(0x29e)][_0x4b0fd5(0x2f6)][_0x4b0fd5(0x3b4)];this[_0x4b0fd5(0x38b)][_0x39fc80]=this[_0x4b0fd5(0x38b)][_0x39fc80][_0x4b0fd5(0x2fe)](0x0,_0x3ff46d);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x213)]=function(){const _0x45ee62=_0x128385;if(this[_0x45ee62(0x1d6)][_0x45ee62(0x374)]!==undefined)return this[_0x45ee62(0x1d6)][_0x45ee62(0x374)];this[_0x45ee62(0x1d6)]['groupDefeat']=![];const _0xb8b4db=this[_0x45ee62(0x3a7)]();for(const _0x35c5f5 of _0xb8b4db){if(!_0x35c5f5)continue;if(_0x35c5f5[_0x45ee62(0x368)][_0x45ee62(0x288)](/<GROUP DEFEAT>/i)){this[_0x45ee62(0x1d6)]['groupDefeat']=!![];break;}}return this[_0x45ee62(0x1d6)]['groupDefeat'];},VisuMZ[_0x128385(0x41e)][_0x128385(0x2f5)]=Game_Unit[_0x128385(0x38c)][_0x128385(0x449)],Game_Unit[_0x128385(0x38c)][_0x128385(0x449)]=function(){const _0xfcf649=_0x128385;let _0x4d204c=VisuMZ[_0xfcf649(0x41e)]['Game_Unit_deadMembers']['call'](this);return BattleManager[_0xfcf649(0x20a)]&&(_0x4d204c=_0x4d204c['concat'](this[_0xfcf649(0x41a)]()[_0xfcf649(0x4aa)](_0x25448f=>_0x25448f[_0xfcf649(0x213)]()))),_0x4d204c;},VisuMZ['SkillsStatesCore'][_0x128385(0x375)]=Game_BattlerBase['prototype'][_0x128385(0x273)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x273)]=function(){const _0x3fe851=_0x128385;this['getStateRetainType']()!==''?this[_0x3fe851(0x29a)]():(VisuMZ[_0x3fe851(0x41e)]['Game_BattlerBase_clearStates'][_0x3fe851(0x285)](this),this[_0x3fe851(0x35c)]());},Game_Actor[_0x128385(0x38c)][_0x128385(0x273)]=function(){const _0x43f6c5=_0x128385;this[_0x43f6c5(0x383)]=this[_0x43f6c5(0x383)]||{},Game_Battler[_0x43f6c5(0x38c)][_0x43f6c5(0x273)][_0x43f6c5(0x285)](this);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x29a)]=function(){const _0x5240ad=_0x128385,_0x36b4c2=this[_0x5240ad(0x3a7)]();for(const _0x54672e of _0x36b4c2){if(_0x54672e&&this['canClearState'](_0x54672e))this[_0x5240ad(0x30e)](_0x54672e['id']);}this[_0x5240ad(0x1d6)]={};},Game_BattlerBase['prototype'][_0x128385(0x461)]=function(_0x29feb1){const _0x298270=_0x128385,_0x2912c0=this[_0x298270(0x424)]();if(_0x2912c0!==''){const _0x492527=_0x29feb1['note'];if(_0x2912c0===_0x298270(0x263)&&_0x492527['match'](/<NO DEATH CLEAR>/i))return![];if(_0x2912c0===_0x298270(0x476)&&_0x492527['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x298270(0x2bc)](_0x29feb1['id']);},Game_BattlerBase[_0x128385(0x38c)]['getStateRetainType']=function(){const _0x672ba=_0x128385;return this[_0x672ba(0x440)];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x441)]=function(_0x318855){const _0x65efd1=_0x128385;this[_0x65efd1(0x440)]=_0x318855;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x414)]=function(){this['_stateRetainType']='';},VisuMZ[_0x128385(0x41e)][_0x128385(0x2a4)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x254)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x254)]=function(){const _0x1a00c3=_0x128385;this[_0x1a00c3(0x441)](_0x1a00c3(0x263)),VisuMZ[_0x1a00c3(0x41e)][_0x1a00c3(0x2a4)]['call'](this),this[_0x1a00c3(0x414)]();},VisuMZ['SkillsStatesCore'][_0x128385(0x1c4)]=Game_BattlerBase['prototype'][_0x128385(0x2ca)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x2ca)]=function(){const _0x5b0f11=_0x128385;this[_0x5b0f11(0x441)](_0x5b0f11(0x476)),VisuMZ[_0x5b0f11(0x41e)][_0x5b0f11(0x1c4)]['call'](this),this[_0x5b0f11(0x414)]();},Game_BattlerBase['prototype'][_0x128385(0x315)]=function(_0x4dcf3c,_0x5a7e7f,_0x28053e){return _0x5a7e7f;},Game_BattlerBase['prototype']['canPaySkillCost']=function(_0x277487){const _0x216019=_0x128385;for(settings of VisuMZ['SkillsStatesCore'][_0x216019(0x29e)][_0x216019(0x3b0)]){let _0x254a55=settings['CalcJS'][_0x216019(0x285)](this,_0x277487);_0x254a55=this['adjustSkillCost'](_0x277487,_0x254a55,settings);if(!settings[_0x216019(0x1e7)][_0x216019(0x285)](this,_0x277487,_0x254a55))return![];}return!![];},Game_BattlerBase['prototype'][_0x128385(0x365)]=function(_0x3b0610){const _0x55995d=_0x128385;for(settings of VisuMZ[_0x55995d(0x41e)][_0x55995d(0x29e)]['Costs']){let _0x4ef48a=settings['CalcJS'][_0x55995d(0x285)](this,_0x3b0610);_0x4ef48a=this[_0x55995d(0x315)](_0x3b0610,_0x4ef48a,settings),settings[_0x55995d(0x2e1)]['call'](this,_0x3b0610,_0x4ef48a);}},VisuMZ[_0x128385(0x41e)][_0x128385(0x337)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x46f)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x46f)]=function(_0x2adc45){const _0x53cde3=_0x128385;if(!_0x2adc45)return![];if(!VisuMZ[_0x53cde3(0x41e)][_0x53cde3(0x337)][_0x53cde3(0x285)](this,_0x2adc45))return![];if(!this[_0x53cde3(0x427)](_0x2adc45))return![];if(!this[_0x53cde3(0x320)](_0x2adc45))return![];if(!this[_0x53cde3(0x24a)](_0x2adc45))return![];return!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x427)]=function(_0xc6c80b){const _0xeb48ef=_0x128385;if(!this[_0xeb48ef(0x357)](_0xc6c80b))return![];return!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x357)]=function(_0x18110b){const _0x447508=_0x128385,_0x5bffb5=_0x18110b[_0x447508(0x368)];if(_0x5bffb5[_0x447508(0x288)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25521d=JSON[_0x447508(0x29d)]('['+RegExp['$1'][_0x447508(0x288)](/\d+/g)+']');for(const _0x1b09b6 of _0x25521d){if(!$gameSwitches[_0x447508(0x4ad)](_0x1b09b6))return![];}return!![];}if(_0x5bffb5['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e62af=JSON[_0x447508(0x29d)]('['+RegExp['$1'][_0x447508(0x288)](/\d+/g)+']');for(const _0x4eaf76 of _0x5e62af){if(!$gameSwitches[_0x447508(0x4ad)](_0x4eaf76))return![];}return!![];}if(_0x5bffb5[_0x447508(0x288)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58bb47=JSON[_0x447508(0x29d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ea032 of _0x58bb47){if($gameSwitches['value'](_0x3ea032))return!![];}return![];}if(_0x5bffb5[_0x447508(0x288)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19a220=JSON[_0x447508(0x29d)]('['+RegExp['$1'][_0x447508(0x288)](/\d+/g)+']');for(const _0x1ae5ee of _0x19a220){if(!$gameSwitches[_0x447508(0x4ad)](_0x1ae5ee))return!![];}return![];}if(_0x5bffb5[_0x447508(0x288)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xff7c70=JSON[_0x447508(0x29d)]('['+RegExp['$1'][_0x447508(0x288)](/\d+/g)+']');for(const _0x77bc89 of _0xff7c70){if(!$gameSwitches[_0x447508(0x4ad)](_0x77bc89))return!![];}return![];}if(_0x5bffb5[_0x447508(0x288)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x470454=JSON[_0x447508(0x29d)]('['+RegExp['$1'][_0x447508(0x288)](/\d+/g)+']');for(const _0x4e0306 of _0x470454){if($gameSwitches[_0x447508(0x4ad)](_0x4e0306))return![];}return!![];}return!![];},Game_BattlerBase[_0x128385(0x38c)]['meetsSkillConditionsEnableJS']=function(_0x1a2675){const _0x338c1c=_0x128385,_0x3b88dd=_0x1a2675['note'],_0x49ec3d=VisuMZ[_0x338c1c(0x41e)][_0x338c1c(0x21b)];return _0x49ec3d[_0x1a2675['id']]?_0x49ec3d[_0x1a2675['id']][_0x338c1c(0x285)](this,_0x1a2675):!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x24a)]=function(_0x30820d){const _0x3ded42=_0x128385;return VisuMZ['SkillsStatesCore'][_0x3ded42(0x29e)][_0x3ded42(0x3eb)][_0x3ded42(0x266)][_0x3ded42(0x285)](this,_0x30820d);},VisuMZ[_0x128385(0x41e)][_0x128385(0x255)]=Game_BattlerBase['prototype'][_0x128385(0x496)],Game_BattlerBase['prototype'][_0x128385(0x496)]=function(_0x7b9d6){const _0x57a0cd=_0x128385;for(settings of VisuMZ[_0x57a0cd(0x41e)][_0x57a0cd(0x29e)]['Costs']){if(settings[_0x57a0cd(0x44d)][_0x57a0cd(0x448)]()==='MP'){let _0x1fede5=settings[_0x57a0cd(0x217)][_0x57a0cd(0x285)](this,_0x7b9d6);return _0x1fede5=this[_0x57a0cd(0x315)](_0x7b9d6,_0x1fede5,settings),_0x1fede5;}}return VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillMpCost'][_0x57a0cd(0x285)](this,_0x7b9d6);},VisuMZ[_0x128385(0x41e)][_0x128385(0x3cf)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1fc)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1fc)]=function(_0x30d195){const _0x162953=_0x128385;for(settings of VisuMZ[_0x162953(0x41e)][_0x162953(0x29e)]['Costs']){if(settings['Name'][_0x162953(0x448)]()==='TP'){let _0x35ddce=settings[_0x162953(0x217)][_0x162953(0x285)](this,_0x30d195);return _0x35ddce=this[_0x162953(0x315)](_0x30d195,_0x35ddce,settings),_0x35ddce;}}return VisuMZ[_0x162953(0x41e)][_0x162953(0x3cf)][_0x162953(0x285)](this,_0x30d195);},Game_BattlerBase['prototype']['hasState']=function(_0x4f316e){const _0x64dba5=_0x128385;if(typeof _0x4f316e===_0x64dba5(0x19f))_0x4f316e=$dataStates[_0x4f316e];return this[_0x64dba5(0x3a7)]()[_0x64dba5(0x467)](_0x4f316e);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_states']=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3a7)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3a7)]=function(){const _0x370c14=_0x128385;let _0x25f218=VisuMZ[_0x370c14(0x41e)][_0x370c14(0x354)][_0x370c14(0x285)](this);if($gameTemp[_0x370c14(0x356)])return _0x25f218;return $gameTemp[_0x370c14(0x356)]=!![],this[_0x370c14(0x225)](_0x25f218),$gameTemp[_0x370c14(0x356)]=undefined,_0x25f218;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x225)]=function(_0x367196){const _0x5f38bc=_0x128385,_0x25c08c=this['passiveStates']();for(state of _0x25c08c){if(!state)continue;if(!this[_0x5f38bc(0x3ae)](state)&&_0x367196['includes'](state))continue;_0x367196[_0x5f38bc(0x3f0)](state);}_0x25c08c[_0x5f38bc(0x22b)]>0x0&&_0x367196[_0x5f38bc(0x391)]((_0x9f6e0c,_0x2dc1b1)=>{const _0xfd70e4=_0x5f38bc,_0x472aed=_0x9f6e0c[_0xfd70e4(0x25f)],_0x2f2bd6=_0x2dc1b1['priority'];if(_0x472aed!==_0x2f2bd6)return _0x2f2bd6-_0x472aed;return _0x9f6e0c-_0x2dc1b1;});},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3ae)]=function(_0x512d63){const _0x41097b=_0x128385;return _0x512d63[_0x41097b(0x368)][_0x41097b(0x288)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x128385(0x41e)][_0x128385(0x3f4)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x358)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x358)]=function(_0x16a9b1){const _0xb23092=_0x128385;this[_0xb23092(0x28b)]=!![];let _0x74c400=VisuMZ[_0xb23092(0x41e)][_0xb23092(0x3f4)]['call'](this,_0x16a9b1);return this[_0xb23092(0x28b)]=undefined,_0x74c400;},Game_BattlerBase['prototype'][_0x128385(0x246)]=function(){const _0x2a2c29=_0x128385;let _0x5c6a02=[];this['_passiveStateResults']=this[_0x2a2c29(0x27f)]||{};for(;;){_0x5c6a02=[];let _0x1916ad=!![];for(const _0x5b68a2 of this[_0x2a2c29(0x1d6)][_0x2a2c29(0x432)]){const _0x1d2076=$dataStates[_0x5b68a2];if(!_0x1d2076)continue;let _0x7559e2=this[_0x2a2c29(0x2f9)](_0x1d2076);this['_passiveStateResults'][_0x5b68a2]!==_0x7559e2&&(_0x1916ad=![],this[_0x2a2c29(0x27f)][_0x5b68a2]=_0x7559e2);if(!_0x7559e2)continue;_0x5c6a02[_0x2a2c29(0x3f0)](_0x1d2076);}if(_0x1916ad)break;else{if(!this[_0x2a2c29(0x28b)])this[_0x2a2c29(0x283)]();this[_0x2a2c29(0x197)]();}}return _0x5c6a02;},Game_BattlerBase['prototype']['meetsPassiveStateConditions']=function(_0x246473){const _0x100012=_0x128385;if(!this['meetsPassiveStateConditionClasses'](_0x246473))return![];if(!this[_0x100012(0x36f)](_0x246473))return![];if(!this[_0x100012(0x408)](_0x246473))return![];if(!this[_0x100012(0x32a)](_0x246473))return![];return!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x206)]=function(_0x360faf){return!![];},Game_Actor[_0x128385(0x38c)]['meetsPassiveStateConditionClasses']=function(_0x2d0100){const _0x353826=_0x128385,_0x7b7d4=DataManager[_0x353826(0x25d)](_0x2d0100);if(_0x7b7d4['currentClass'][_0x353826(0x22b)]>0x0){const _0x47111a=_0x7b7d4[_0x353826(0x33e)];if(!_0x47111a[_0x353826(0x467)](this[_0x353826(0x33e)]()))return![];}if(_0x7b7d4[_0x353826(0x3ab)][_0x353826(0x22b)]>0x0){const _0x22c7b5=_0x7b7d4[_0x353826(0x3ab)];let _0x41a68f=[this[_0x353826(0x33e)]()];Imported['VisuMZ_2_ClassChangeSystem']&&this['multiclasses']&&(_0x41a68f=this[_0x353826(0x450)]());if(_0x22c7b5[_0x353826(0x4aa)](_0x4510b4=>_0x41a68f[_0x353826(0x467)](_0x4510b4))[_0x353826(0x22b)]<=0x0)return![];}return Game_BattlerBase[_0x353826(0x38c)][_0x353826(0x206)][_0x353826(0x285)](this,_0x2d0100);},DataManager[_0x128385(0x25d)]=function(_0x8b8f45){const _0x57bbff=_0x128385,_0xdfce59={'currentClass':[],'multiClass':[]};if(!_0x8b8f45)return _0xdfce59;this[_0x57bbff(0x3c0)]=this[_0x57bbff(0x3c0)]||{};if(this[_0x57bbff(0x3c0)][_0x8b8f45['id']]!==undefined)return this[_0x57bbff(0x3c0)][_0x8b8f45['id']];const _0x43dbbb=_0x8b8f45[_0x57bbff(0x368)]||'';if(_0x43dbbb[_0x57bbff(0x288)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x16b0fa=String(RegExp['$1'])[_0x57bbff(0x472)](',')[_0x57bbff(0x26b)](_0x460448=>_0x460448[_0x57bbff(0x46c)]());_0xdfce59[_0x57bbff(0x33e)]=VisuMZ['SkillsStatesCore']['ParseClassIDs'](_0x16b0fa);}if(_0x43dbbb[_0x57bbff(0x288)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0xfc18ae=String(RegExp['$1'])['split'](',')['map'](_0x4f403b=>_0x4f403b['trim']());_0xdfce59['multiClass']=VisuMZ['SkillsStatesCore']['ParseClassIDs'](_0xfc18ae);}return this['_cache_getPassiveStateConditionClassesData'][_0x8b8f45['id']]=_0xdfce59,this[_0x57bbff(0x3c0)][_0x8b8f45['id']];},VisuMZ[_0x128385(0x41e)]['ParseClassIDs']=function(_0x15b054){const _0x21ed8d=_0x128385,_0x2347ba=[];for(let _0x14448c of _0x15b054){_0x14448c=(String(_0x14448c)||'')[_0x21ed8d(0x46c)]();const _0x4e37ed=/^\d+$/['test'](_0x14448c);_0x4e37ed?_0x2347ba[_0x21ed8d(0x3f0)](Number(_0x14448c)):_0x2347ba[_0x21ed8d(0x3f0)](DataManager[_0x21ed8d(0x1e0)](_0x14448c));}return _0x2347ba[_0x21ed8d(0x26b)](_0x15cf43=>$dataClasses[Number(_0x15cf43)])[_0x21ed8d(0x2b2)](null);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x36f)]=function(_0x390b1f){const _0x6b577=_0x128385,_0x22ff29=DataManager[_0x6b577(0x462)](_0x390b1f);if(_0x22ff29[_0x6b577(0x47e)]&&_0x22ff29[_0x6b577(0x47e)]['length']>0x0){const _0x5657d3=_0x22ff29[_0x6b577(0x47e)];for(const _0x56f830 of _0x5657d3){if(!$gameSwitches['value'](_0x56f830))return![];}}if(_0x22ff29[_0x6b577(0x2e5)]&&_0x22ff29[_0x6b577(0x2e5)][_0x6b577(0x22b)]>0x0){const _0x47ddfe=_0x22ff29[_0x6b577(0x2e5)];let _0xbf928e=!![];for(const _0x53e05d of _0x47ddfe){if($gameSwitches[_0x6b577(0x4ad)](_0x53e05d)){_0xbf928e=![];break;}}if(_0xbf928e)return![];}if(_0x22ff29[_0x6b577(0x2a6)]&&_0x22ff29[_0x6b577(0x2a6)]['length']>0x0){const _0x3d26f4=_0x22ff29['allSwitchOff'];for(const _0x296053 of _0x3d26f4){if($gameSwitches[_0x6b577(0x4ad)](_0x296053))return![];}}if(_0x22ff29['anySwitchOff']&&_0x22ff29[_0x6b577(0x454)][_0x6b577(0x22b)]>0x0){const _0x50af72=_0x22ff29[_0x6b577(0x454)];let _0x315cbe=!![];for(const _0x4d3721 of _0x50af72){if(!$gameSwitches[_0x6b577(0x4ad)](_0x4d3721)){_0x315cbe=![];break;}}if(_0x315cbe)return![];}return!![];},DataManager[_0x128385(0x462)]=function(_0x297d06){const _0x29d24b=_0x128385;let _0xbb3f7={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x297d06)return _0xbb3f7;const _0x14ee35=_0x297d06['id'];this[_0x29d24b(0x342)]=this[_0x29d24b(0x342)]||{};if(this[_0x29d24b(0x342)][_0x14ee35]!==undefined)return this[_0x29d24b(0x342)][_0x14ee35];const _0x765454=_0x297d06[_0x29d24b(0x368)]||'';return _0x765454[_0x29d24b(0x288)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0xbb3f7[_0x29d24b(0x47e)]=String(RegExp['$1'])[_0x29d24b(0x472)](',')[_0x29d24b(0x26b)](_0x134fb2=>Number(_0x134fb2)),console['log'](_0xbb3f7)),_0x765454[_0x29d24b(0x288)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0xbb3f7[_0x29d24b(0x2e5)]=String(RegExp['$1'])[_0x29d24b(0x472)](',')['map'](_0x3efbe6=>Number(_0x3efbe6))),_0x765454['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0xbb3f7[_0x29d24b(0x2a6)]=String(RegExp['$1'])[_0x29d24b(0x472)](',')[_0x29d24b(0x26b)](_0x51175b=>Number(_0x51175b))),_0x765454[_0x29d24b(0x288)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0xbb3f7[_0x29d24b(0x454)]=String(RegExp['$1'])['split'](',')['map'](_0x5989e4=>Number(_0x5989e4))),this[_0x29d24b(0x342)][_0x14ee35]=_0xbb3f7,this[_0x29d24b(0x342)][_0x14ee35];},Game_BattlerBase['prototype'][_0x128385(0x408)]=function(_0x310940){const _0x36d8c2=_0x128385,_0x342b46=VisuMZ[_0x36d8c2(0x41e)][_0x36d8c2(0x281)];if(_0x342b46[_0x310940['id']]){this[_0x36d8c2(0x1ab)]=this[_0x36d8c2(0x1ab)]||0x0,this[_0x36d8c2(0x3ad)]=this[_0x36d8c2(0x3ad)]||0x0;this[_0x36d8c2(0x1ab)]!==Graphics[_0x36d8c2(0x3e7)]&&(this[_0x36d8c2(0x1ab)]=Graphics['frameCount'],this[_0x36d8c2(0x411)]={},this[_0x36d8c2(0x3ad)]=0x0);this[_0x36d8c2(0x3ad)]++;if(this[_0x36d8c2(0x3ad)]>=0x1e)return this['_prevPassiveJsResults'][_0x310940['id']]??!![];else{const _0x247e6d=_0x342b46[_0x310940['id']][_0x36d8c2(0x285)](this,_0x310940);return this[_0x36d8c2(0x411)][_0x310940['id']]=_0x247e6d,_0x247e6d;}}else return!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x32a)]=function(_0x1399a7){const _0x48d7e7=_0x128385;return VisuMZ[_0x48d7e7(0x41e)][_0x48d7e7(0x29e)][_0x48d7e7(0x3e6)][_0x48d7e7(0x410)]['call'](this,_0x1399a7);},Game_BattlerBase[_0x128385(0x38c)]['passiveStates']=function(){const _0x3830e3=_0x128385;if(this[_0x3830e3(0x290)]('passiveStates'))return this[_0x3830e3(0x246)]();if(this[_0x3830e3(0x306)])return[];return this[_0x3830e3(0x306)]=!![],this[_0x3830e3(0x197)](),this[_0x3830e3(0x306)]=undefined,this[_0x3830e3(0x246)]();},Game_BattlerBase[_0x128385(0x38c)]['createPassiveStatesCache']=function(){const _0x4f9e5e=_0x128385;this[_0x4f9e5e(0x306)]=!![],this['_cache'][_0x4f9e5e(0x432)]=[],this[_0x4f9e5e(0x1a5)](),this[_0x4f9e5e(0x2dc)](),this[_0x4f9e5e(0x308)](),Game_BattlerBase[_0x4f9e5e(0x241)]&&this['addAuraPassiveStateIDs'](),this[_0x4f9e5e(0x1d6)][_0x4f9e5e(0x432)]=this[_0x4f9e5e(0x1d6)][_0x4f9e5e(0x432)]['sort']((_0xf2e6e8,_0x3cbb6b)=>_0xf2e6e8-_0x3cbb6b),this[_0x4f9e5e(0x306)]=undefined;},Game_BattlerBase[_0x128385(0x38c)]['addPassiveStatesFromOtherPlugins']=function(){const _0x37138e=_0x128385;if(Imported[_0x37138e(0x1dc)])this[_0x37138e(0x3e9)]();},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x23b)]=function(){return[];},Game_BattlerBase['prototype'][_0x128385(0x2dc)]=function(){const _0x4e1489=_0x128385,_0xbd5826=this[_0x4e1489(0x1d6)][_0x4e1489(0x432)]||[],_0x2f8b47=this[_0x4e1489(0x23b)]();this[_0x4e1489(0x1d6)][_0x4e1489(0x432)]=_0xbd5826||[];for(const _0x5050f4 of _0x2f8b47){if(!_0x5050f4)continue;const _0x4d85bc=DataManager[_0x4e1489(0x1f0)](_0x5050f4);for(const _0x1344c3 of _0x4d85bc){this[_0x4e1489(0x1d6)][_0x4e1489(0x432)]['push'](_0x1344c3);}}},DataManager[_0x128385(0x1f0)]=function(_0xda9b57){const _0x2fd239=_0x128385;if(!_0xda9b57)return[];const _0x488438=VisuMZ['SkillsStatesCore'][_0x2fd239(0x198)](_0xda9b57,_0x2fd239(0x458));this['_cache_getPassiveStatesFromObj']=this[_0x2fd239(0x437)]||{};if(this[_0x2fd239(0x437)][_0x488438]!==undefined)return this[_0x2fd239(0x437)][_0x488438];const _0x27b84a=[],_0x3c6ede=_0xda9b57['note']||'',_0x3763ca=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x1b2fb8=_0x3c6ede[_0x2fd239(0x288)](_0x3763ca);if(_0x1b2fb8)for(const _0xd9de90 of _0x1b2fb8){_0xd9de90['match'](_0x3763ca);const _0x5ce8b1=String(RegExp['$1'])['split'](',')['map'](_0x675a3=>_0x675a3[_0x2fd239(0x46c)]());for(const _0x10007f of _0x5ce8b1){const _0x2006fd=/^\d+$/[_0x2fd239(0x33c)](_0x10007f);let _0x5c4c9e=0x0;_0x2006fd?_0x5c4c9e=Number(_0x10007f):_0x5c4c9e=DataManager[_0x2fd239(0x4a9)](_0x10007f),_0x5c4c9e&&_0x27b84a[_0x2fd239(0x3f0)](_0x5c4c9e);}}return this[_0x2fd239(0x437)][_0x488438]=_0x27b84a,this[_0x2fd239(0x437)][_0x488438];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x308)]=function(){const _0x5b66d6=_0x128385,_0x3b6a78=VisuMZ['SkillsStatesCore'][_0x5b66d6(0x29e)]['PassiveStates']['Global'];this[_0x5b66d6(0x1d6)][_0x5b66d6(0x432)]=this['_cache'][_0x5b66d6(0x432)][_0x5b66d6(0x3df)](_0x3b6a78);},Game_BattlerBase[_0x128385(0x241)]=![],Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_CheckForAuras']=function(){const _0x23dbb8=_0x128385,_0x2e9bce=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x137099 of _0x2e9bce){for(const _0x39b4ee of _0x137099){if(!_0x39b4ee)continue;const _0x391c9e=_0x39b4ee[_0x23dbb8(0x368)]||'';if(_0x391c9e[_0x23dbb8(0x288)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0x23dbb8(0x241)]=!![];break;}}}},Game_BattlerBase[_0x128385(0x38c)]['addAuraPassiveStateIDs']=function(){const _0x5bb51b=_0x128385;if(this['isDead']())return;if(!this['isAppeared']())return;const _0x58e7fc=this[_0x5bb51b(0x1d6)][_0x5bb51b(0x432)]||[],_0x1e407f=this,_0x19498a=this[_0x5bb51b(0x42e)]()['getAuraPassiveStateIDs'](!![],_0x1e407f),_0xe09707=$gameParty[_0x5bb51b(0x27b)]()?this[_0x5bb51b(0x2ea)]()[_0x5bb51b(0x2fd)](![],_0x1e407f):[];this[_0x5bb51b(0x1d6)][_0x5bb51b(0x432)]=_0x58e7fc||[],this['_cache'][_0x5bb51b(0x432)]=this['_cache']['passiveStates'][_0x5bb51b(0x3df)](_0x19498a)[_0x5bb51b(0x3df)](_0xe09707);},Game_Unit[_0x128385(0x38c)][_0x128385(0x2fd)]=function(_0x14d0bb,_0x5afcfb){const _0xd97c16=_0x128385;let _0x5142dc=[];const _0x1aaa35=this===$gameParty?this['battleMembers']():this[_0xd97c16(0x41a)]();for(const _0x27ba92 of _0x1aaa35){if(!_0x27ba92)continue;if(!_0x27ba92[_0xd97c16(0x463)]())continue;const _0x3d376d=_0x27ba92[_0xd97c16(0x23b)]();for(const _0x4dacce of _0x3d376d){if(!_0x4dacce)continue;if(!VisuMZ[_0xd97c16(0x41e)]['MeetsAuraObjConditions'](_0x4dacce,_0x14d0bb,_0x27ba92,_0x5afcfb))continue;let _0x509db8=DataManager[_0xd97c16(0x18f)](_0x4dacce,_0x14d0bb);for(const _0x456f89 of _0x509db8){if(!VisuMZ[_0xd97c16(0x41e)][_0xd97c16(0x39c)](_0x456f89,_0x14d0bb,_0x27ba92,_0x5afcfb))continue;_0x5142dc[_0xd97c16(0x3f0)](_0x456f89),!_0x5afcfb[_0xd97c16(0x2bc)](_0x456f89)&&_0x5afcfb[_0xd97c16(0x1e3)](_0x456f89,_0x27ba92);}}}return _0x5142dc;},DataManager[_0x128385(0x18f)]=function(_0x316935,_0x1c5fe0){const _0x47071f=_0x128385;if(!_0x316935)return[];const _0x49c740=_0x1c5fe0?_0x47071f(0x26f):_0x47071f(0x3ac),_0x4c7730=VisuMZ['SkillsStatesCore'][_0x47071f(0x198)](_0x316935,_0x49c740);this['_cache_getAuraPassiveStatesFromObj']=this[_0x47071f(0x32d)]||{};if(this[_0x47071f(0x32d)][_0x4c7730]!==undefined)return this[_0x47071f(0x32d)][_0x4c7730];const _0x2cdc57=[],_0x4c4037=_0x316935[_0x47071f(0x368)]||'',_0x495f48=_0x1c5fe0?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x918e2e=_0x4c4037[_0x47071f(0x288)](_0x495f48);if(_0x918e2e)for(const _0x534b8b of _0x918e2e){_0x534b8b[_0x47071f(0x288)](_0x495f48);const _0x526c10=String(RegExp['$1'])['split'](',')[_0x47071f(0x26b)](_0x33ce5a=>_0x33ce5a[_0x47071f(0x46c)]());for(const _0x480428 of _0x526c10){const _0x369691=/^\d+$/[_0x47071f(0x33c)](_0x480428);let _0x4de455=0x0;_0x369691?_0x4de455=Number(_0x480428):_0x4de455=DataManager[_0x47071f(0x4a9)](_0x480428),_0x4de455&&_0x2cdc57['push'](_0x4de455);}}return this[_0x47071f(0x32d)][_0x4c7730]=_0x2cdc57,this[_0x47071f(0x32d)][_0x4c7730];},VisuMZ['SkillsStatesCore'][_0x128385(0x1ea)]=function(_0x4ec339,_0x226649,_0x4629cf,_0x2264f3){const _0xd15f25=_0x128385;if(!_0x4ec339)return![];if(_0x4ec339[_0xd15f25(0x1ce)]!==undefined&&_0x4ec339['maxTurns']!==undefined)return![];const _0x4eaaf0=_0x4ec339[_0xd15f25(0x368)]||'';if(!VisuMZ[_0xd15f25(0x41e)]['MeetsAuraNoteConditions'](_0x4eaaf0,_0x226649,_0x4629cf,_0x2264f3))return![];return!![];},VisuMZ[_0x128385(0x41e)]['MeetsAuraStateConditions']=function(_0x5c1121,_0x5acceb,_0x2da30f,_0x50c7eb){const _0x1bdd80=_0x128385,_0x3e2223=$dataStates[_0x5c1121];if(!_0x3e2223)return![];const _0x5efaaf=_0x3e2223[_0x1bdd80(0x368)]||'';if(!VisuMZ[_0x1bdd80(0x41e)][_0x1bdd80(0x43a)](_0x5efaaf,_0x5acceb,_0x2da30f,_0x50c7eb))return![];return!![];},VisuMZ[_0x128385(0x41e)][_0x128385(0x43a)]=function(_0x4f60e5,_0x8c9bfe,_0x2af8ba,_0xe01779){const _0x342527=_0x128385;_0x4f60e5=_0x4f60e5||'';if(_0x2af8ba[_0x342527(0x26d)]()){if(_0x8c9bfe&&_0x4f60e5['match'](/<ALLOW DEAD AURA>/i)){}else{if(!_0x8c9bfe&&_0x4f60e5[_0x342527(0x288)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x8c9bfe&&_0x4f60e5['match'](/<DEAD AURA ONLY>/i)){}else{if(!_0x8c9bfe&&_0x4f60e5[_0x342527(0x288)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x8c9bfe&&_0x4f60e5[_0x342527(0x288)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x8c9bfe&&_0x4f60e5[_0x342527(0x288)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x8c9bfe){if(_0x4f60e5[_0x342527(0x288)](/<AURA NOT FOR USER>/i)){if(_0x2af8ba===_0xe01779)return![];}else{if(_0x4f60e5[_0x342527(0x288)](/<NOT USER AURA>/i)){if(_0x2af8ba===_0xe01779)return![];}}}return!![];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x39e)]=function(_0x1c5dd3){const _0x36e23b=_0x128385;if(typeof _0x1c5dd3!==_0x36e23b(0x19f))_0x1c5dd3=_0x1c5dd3['id'];return this['_stateTurns'][_0x1c5dd3]||0x0;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3dc)]=function(_0x4974c7,_0x4c06c3){const _0x1d7f26=_0x128385;if(typeof _0x4974c7!==_0x1d7f26(0x19f))_0x4974c7=_0x4974c7['id'];if(this[_0x1d7f26(0x2bc)](_0x4974c7)){const _0x36b2e3=DataManager[_0x1d7f26(0x32c)](_0x4974c7);this[_0x1d7f26(0x23f)][_0x4974c7]=_0x4c06c3['clamp'](0x0,_0x36b2e3);if(this['_stateTurns'][_0x4974c7]<=0x0)this[_0x1d7f26(0x259)](_0x4974c7);}},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1fe)]=function(_0x26fece,_0x53a182){const _0x4e1d3b=_0x128385;if(typeof _0x26fece!==_0x4e1d3b(0x19f))_0x26fece=_0x26fece['id'];this[_0x4e1d3b(0x2bc)](_0x26fece)&&(_0x53a182+=this[_0x4e1d3b(0x39e)](_0x26fece),this['setStateTurns'](_0x26fece,_0x53a182));},VisuMZ[_0x128385(0x41e)][_0x128385(0x284)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x2d4)],Game_BattlerBase['prototype'][_0x128385(0x2d4)]=function(_0x55fb93){const _0x11d156=_0x128385,_0x3e85f6=this['_buffs'][_0x55fb93];VisuMZ[_0x11d156(0x41e)][_0x11d156(0x284)][_0x11d156(0x285)](this,_0x55fb93);if(_0x3e85f6>0x0)this[_0x11d156(0x294)](_0x55fb93);if(_0x3e85f6<0x0)this[_0x11d156(0x43f)](_0x55fb93);},VisuMZ[_0x128385(0x41e)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x21f)],Game_BattlerBase[_0x128385(0x38c)]['increaseBuff']=function(_0x34c0a1){const _0x5251c7=_0x128385;VisuMZ[_0x5251c7(0x41e)][_0x5251c7(0x36a)][_0x5251c7(0x285)](this,_0x34c0a1);if(!this[_0x5251c7(0x40d)](_0x34c0a1))this[_0x5251c7(0x2d4)](_0x34c0a1);},VisuMZ[_0x128385(0x41e)][_0x128385(0x25b)]=Game_BattlerBase[_0x128385(0x38c)]['decreaseBuff'],Game_BattlerBase['prototype'][_0x128385(0x3d4)]=function(_0xd180e1){const _0x54495b=_0x128385;VisuMZ[_0x54495b(0x41e)][_0x54495b(0x25b)][_0x54495b(0x285)](this,_0xd180e1);if(!this['isBuffOrDebuffAffected'](_0xd180e1))this[_0x54495b(0x2d4)](_0xd180e1);},Game_BattlerBase[_0x128385(0x38c)]['onEraseBuff']=function(_0x4963de){},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x43f)]=function(_0x3972f0){},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x18d)]=function(_0x3d7739){const _0x33a1b8=_0x128385;return this['_buffs'][_0x3d7739]===VisuMZ[_0x33a1b8(0x41e)][_0x33a1b8(0x29e)][_0x33a1b8(0x2f6)]['StackBuffMax'];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x341)]=function(_0x1cfff4){const _0x30c8ea=_0x128385;return this[_0x30c8ea(0x201)][_0x1cfff4]===-VisuMZ[_0x30c8ea(0x41e)][_0x30c8ea(0x29e)][_0x30c8ea(0x2f6)][_0x30c8ea(0x499)];},VisuMZ[_0x128385(0x41e)][_0x128385(0x207)]=Game_BattlerBase['prototype'][_0x128385(0x195)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x195)]=function(_0x18dc8b,_0x550e71){const _0x49e4dd=_0x128385;return _0x18dc8b=_0x18dc8b['clamp'](-0x2,0x2),VisuMZ[_0x49e4dd(0x41e)][_0x49e4dd(0x207)][_0x49e4dd(0x285)](this,_0x18dc8b,_0x550e71);},Game_BattlerBase['prototype'][_0x128385(0x250)]=function(_0x40763d){const _0x1b3997=_0x128385,_0x484f23=this[_0x1b3997(0x201)][_0x40763d];return VisuMZ[_0x1b3997(0x41e)][_0x1b3997(0x29e)]['Buffs']['MultiplierJS'][_0x1b3997(0x285)](this,_0x40763d,_0x484f23);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x248)]=function(_0x16060a){const _0x35e9a9=_0x128385;return this[_0x35e9a9(0x38b)][_0x16060a]||0x0;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x483)]=function(_0x53ea0d){const _0x34828d=_0x128385;return this[_0x34828d(0x248)](_0x53ea0d);},Game_BattlerBase['prototype']['setBuffTurns']=function(_0x2706c7,_0x24629e){const _0x1d4546=_0x128385;if(this[_0x1d4546(0x2e9)](_0x2706c7)){const _0x50a9a7=VisuMZ[_0x1d4546(0x41e)]['Settings'][_0x1d4546(0x2f6)]['MaxTurns'];this[_0x1d4546(0x38b)][_0x2706c7]=_0x24629e[_0x1d4546(0x2fe)](0x0,_0x50a9a7);}},Game_BattlerBase['prototype'][_0x128385(0x40a)]=function(_0x460588,_0x2cc4a7){const _0x32d171=_0x128385;this[_0x32d171(0x2e9)](_0x460588)&&(_0x2cc4a7+=this[_0x32d171(0x248)](_0x460588),this[_0x32d171(0x3a9)](_0x460588,_0x2cc4a7));},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3b2)]=function(_0x5ab1ae,_0xe7be69){const _0x3a75f0=_0x128385;if(this[_0x3a75f0(0x323)](_0x5ab1ae)){const _0x44cd59=VisuMZ['SkillsStatesCore']['Settings'][_0x3a75f0(0x2f6)][_0x3a75f0(0x3b4)];this[_0x3a75f0(0x38b)][_0x5ab1ae]=_0xe7be69[_0x3a75f0(0x2fe)](0x0,_0x44cd59);}},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x46d)]=function(_0x1e0988,_0x51b49a){const _0x57b2b0=_0x128385;this['isDebuffAffected'](_0x1e0988)&&(_0x51b49a+=this[_0x57b2b0(0x248)](_0x1e0988),this[_0x57b2b0(0x3b2)](_0x1e0988,_0x51b49a));},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x21e)]=function(_0xf32f9b){const _0x3f352a=_0x128385;if(typeof _0xf32f9b!==_0x3f352a(0x19f))_0xf32f9b=_0xf32f9b['id'];return this[_0x3f352a(0x4ab)]=this[_0x3f352a(0x4ab)]||{},this['_stateData'][_0xf32f9b]=this[_0x3f352a(0x4ab)][_0xf32f9b]||{},this[_0x3f352a(0x4ab)][_0xf32f9b];},Game_BattlerBase[_0x128385(0x38c)]['getStateData']=function(_0x4007ff,_0x48baa2){const _0x114448=_0x128385;if(typeof _0x4007ff!==_0x114448(0x19f))_0x4007ff=_0x4007ff['id'];const _0x3ce19f=this[_0x114448(0x21e)](_0x4007ff);return _0x3ce19f[_0x48baa2];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x2f8)]=function(_0x28c076,_0x195d75,_0x441c79){const _0xa84a00=_0x128385;if(typeof _0x28c076!==_0xa84a00(0x19f))_0x28c076=_0x28c076['id'];const _0x374972=this[_0xa84a00(0x21e)](_0x28c076);_0x374972[_0x195d75]=_0x441c79;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1f7)]=function(_0x24a69b){const _0x15ba8d=_0x128385;if(typeof _0x24a69b!=='number')_0x24a69b=_0x24a69b['id'];this['_stateData']=this[_0x15ba8d(0x4ab)]||{},this[_0x15ba8d(0x4ab)][_0x24a69b]={};},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x2f7)]=function(_0x31bcc6){const _0x5d637d=_0x128385;if(typeof _0x31bcc6!=='number')_0x31bcc6=_0x31bcc6['id'];return this[_0x5d637d(0x3ea)]=this[_0x5d637d(0x3ea)]||{},this[_0x5d637d(0x3ea)][_0x31bcc6]===undefined&&(this['_stateDisplay'][_0x31bcc6]=''),this[_0x5d637d(0x3ea)][_0x31bcc6];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x334)]=function(_0x1777ec,_0x4341c3){const _0x44cefb=_0x128385;if(typeof _0x1777ec!==_0x44cefb(0x19f))_0x1777ec=_0x1777ec['id'];this[_0x44cefb(0x3ea)]=this[_0x44cefb(0x3ea)]||{},this[_0x44cefb(0x3ea)][_0x1777ec]=_0x4341c3;},Game_BattlerBase[_0x128385(0x38c)]['clearStateDisplay']=function(_0x3bab59){const _0x5a312d=_0x128385;if(typeof _0x3bab59!==_0x5a312d(0x19f))_0x3bab59=_0x3bab59['id'];this['_stateDisplay']=this[_0x5a312d(0x3ea)]||{},this['_stateDisplay'][_0x3bab59]='';},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3a0)]=function(_0x3226b1){const _0x515e0c=_0x128385;if(typeof _0x3226b1!==_0x515e0c(0x19f))_0x3226b1=_0x3226b1['id'];this[_0x515e0c(0x1d0)]=this['_stateOrigin']||{},this[_0x515e0c(0x1d0)][_0x3226b1]=this[_0x515e0c(0x1d0)][_0x3226b1]||_0x515e0c(0x3a6);const _0x9606c9=this[_0x515e0c(0x1d0)][_0x3226b1];return this[_0x515e0c(0x31c)](_0x9606c9);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1e3)]=function(_0x544564,_0x2abde5){const _0x84c089=_0x128385;this['_stateOrigin']=this[_0x84c089(0x1d0)]||{};const _0x381324=_0x2abde5?this['convertTargetToStateOriginKey'](_0x2abde5):this[_0x84c089(0x405)]();this[_0x84c089(0x1d0)][_0x544564]=_0x381324;},Game_BattlerBase[_0x128385(0x38c)]['clearStateOrigin']=function(_0x2174c2){const _0x382de9=_0x128385;this[_0x382de9(0x1d0)]=this[_0x382de9(0x1d0)]||{},delete this[_0x382de9(0x1d0)][_0x2174c2];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1f2)]=function(){this['_stateOrigin']={};},Game_BattlerBase[_0x128385(0x38c)]['getCurrentStateOriginKey']=function(){const _0x1044fb=this['getCurrentStateActiveUser']();return this['convertTargetToStateOriginKey'](_0x1044fb);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x37a)]=function(){const _0x5cd061=_0x128385;if($gameParty[_0x5cd061(0x27b)]()){if(BattleManager[_0x5cd061(0x480)])return BattleManager[_0x5cd061(0x480)];else{if(BattleManager[_0x5cd061(0x23e)])return BattleManager[_0x5cd061(0x23e)];}}else{const _0x5e0de4=SceneManager[_0x5cd061(0x40f)];if(![Scene_Map,Scene_Item]['includes'](_0x5e0de4[_0x5cd061(0x3ca)]))return $gameParty[_0x5cd061(0x1be)]();}return this;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x36c)]=function(_0x5a2669){const _0x11d80b=_0x128385;if(!_0x5a2669)return _0x11d80b(0x3a6);if(_0x5a2669['isActor']())return'<actor-%1>'[_0x11d80b(0x233)](_0x5a2669[_0x11d80b(0x234)]());else{const _0x4357cd=_0x11d80b(0x2b7)[_0x11d80b(0x233)](_0x5a2669[_0x11d80b(0x417)]()),_0x23c28e='<member-%1>'[_0x11d80b(0x233)](_0x5a2669[_0x11d80b(0x494)]()),_0x103a88=_0x11d80b(0x481)[_0x11d80b(0x233)]($gameTroop['getCurrentTroopUniqueID']());return _0x11d80b(0x1d4)['format'](_0x4357cd,_0x23c28e,_0x103a88);}return _0x11d80b(0x3a6);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x31c)]=function(_0x27f079){const _0x4e4093=_0x128385;if(_0x27f079===_0x4e4093(0x3a6))return this;else{if(_0x27f079['match'](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x27f079[_0x4e4093(0x288)](/<troop-(\d+)>/i)){const _0x5e0d98=Number(RegExp['$1']);if(_0x5e0d98===$gameTroop[_0x4e4093(0x1d3)]()){if(_0x27f079[_0x4e4093(0x288)](/<member-(\d+)>/i))return $gameTroop[_0x4e4093(0x41a)]()[Number(RegExp['$1'])];}}if(_0x27f079[_0x4e4093(0x288)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x33a)]=function(_0x2a08ff){const _0x107f95=_0x128385;if(!_0x2a08ff)return![];if(this['isEnemy']())return!![];this['_skillToggle']=this[_0x107f95(0x395)]||{};if(this[_0x107f95(0x395)][_0x2a08ff['id']]===undefined){this[_0x107f95(0x303)]()?this[_0x107f95(0x395)][_0x2a08ff['id']]=DataManager['defaultToggleSkillSetting'](_0x2a08ff):this[_0x107f95(0x395)][_0x2a08ff['id']]=!![];if(this[_0x107f95(0x395)][_0x2a08ff['id']]&&DataManager[_0x107f95(0x33b)](_0x2a08ff)[_0x107f95(0x22b)]>0x0){const _0xacde5e=DataManager[_0x107f95(0x33b)](_0x2a08ff),_0x5974f7=this[_0x107f95(0x3c7)]()[_0x107f95(0x4aa)](_0x1a0ea7=>_0x1a0ea7!==_0x2a08ff)[_0x107f95(0x4aa)](_0x2aefcf=>DataManager['isToggleSkill'](_0x2aefcf))[_0x107f95(0x4aa)](_0x280f88=>DataManager['toggleExclusionGroups'](_0x280f88)['some'](_0x165cf2=>_0xacde5e['includes'](_0x165cf2)));_0x5974f7[_0x107f95(0x22b)]>0x0&&(this['_skillToggle'][_0x2a08ff['id']]=![]);}if(this[_0x107f95(0x395)][_0x2a08ff['id']]){this['refresh'](),$gameParty[_0x107f95(0x1c5)]();if($gameParty['inBattle']())$gameTroop[_0x107f95(0x1c5)]();}}return this[_0x107f95(0x395)][_0x2a08ff['id']];},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x3e1)]=function(_0x495848,_0xab3b43){const _0x35b362=_0x128385;if(!DataManager[_0x35b362(0x292)](_0x495848))return;if(this[_0x35b362(0x34b)]())return;this[_0x35b362(0x395)]=this[_0x35b362(0x395)]||{};if(_0xab3b43&&DataManager[_0x35b362(0x33b)](_0x495848)[_0x35b362(0x22b)]>0x0){const _0x1c2a02=DataManager[_0x35b362(0x33b)](_0x495848),_0x1d4cf7=this['skills']()[_0x35b362(0x4aa)](_0x440634=>DataManager[_0x35b362(0x292)](_0x440634))[_0x35b362(0x4aa)](_0x23823a=>DataManager[_0x35b362(0x33b)](_0x23823a)[_0x35b362(0x2fb)](_0x2f6ab1=>_0x1c2a02[_0x35b362(0x467)](_0x2f6ab1)));for(const _0x102aaf of _0x1d4cf7){if(!_0x102aaf)continue;this['_skillToggle'][_0x102aaf['id']]=![];}}this[_0x35b362(0x395)][_0x495848['id']]=_0xab3b43,this[_0x35b362(0x283)](),$gameParty['refreshAllMembers']();if($gameParty[_0x35b362(0x27b)]())$gameTroop[_0x35b362(0x1c5)]();},VisuMZ[_0x128385(0x41e)][_0x128385(0x1d1)]=Game_BattlerBase['prototype'][_0x128385(0x46f)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x46f)]=function(_0x33ac22){const _0x599f6a=_0x128385;if(DataManager[_0x599f6a(0x292)](_0x33ac22)){if(this[_0x599f6a(0x303)]()){if($gameParty[_0x599f6a(0x27b)]()){if(this[_0x599f6a(0x48a)]())return![];if(this[_0x599f6a(0x45e)]())return![];}if(this['isSkillToggled'](_0x33ac22))return!![];}else return![];}return VisuMZ[_0x599f6a(0x41e)]['Game_BattlerBase_meetsSkillConditions_Toggle'][_0x599f6a(0x285)](this,_0x33ac22);},VisuMZ[_0x128385(0x41e)]['Game_Action_isValid']=Game_Action[_0x128385(0x38c)][_0x128385(0x420)],Game_Action[_0x128385(0x38c)][_0x128385(0x420)]=function(){const _0x2775c0=_0x128385;if(DataManager['isToggleSkill'](this['item']()))return![];return VisuMZ['SkillsStatesCore'][_0x2775c0(0x212)][_0x2775c0(0x285)](this);},VisuMZ[_0x128385(0x41e)][_0x128385(0x446)]=Game_Battler[_0x128385(0x38c)][_0x128385(0x366)],Game_Battler[_0x128385(0x38c)][_0x128385(0x366)]=function(_0x2c58b3){const _0x3ef918=_0x128385,_0x48eb9f=this[_0x3ef918(0x399)](_0x2c58b3);VisuMZ[_0x3ef918(0x41e)][_0x3ef918(0x446)]['call'](this,_0x2c58b3);if(_0x48eb9f&&this[_0x3ef918(0x24b)]($dataStates[_0x2c58b3])){this[_0x3ef918(0x28a)](_0x2c58b3);;}},VisuMZ[_0x128385(0x41e)][_0x128385(0x44b)]=Game_Battler[_0x128385(0x38c)][_0x128385(0x399)],Game_Battler['prototype'][_0x128385(0x399)]=function(_0x56f2e6){const _0x32bb23=_0x128385,_0x1e1b60=$dataStates[_0x56f2e6];if(_0x1e1b60&&_0x1e1b60[_0x32bb23(0x368)]['match'](/<NO DEATH CLEAR>/i))return!this[_0x32bb23(0x214)](_0x56f2e6)&&!this[_0x32bb23(0x293)](_0x56f2e6)&&!this[_0x32bb23(0x1b1)][_0x32bb23(0x3d9)](_0x56f2e6);return VisuMZ[_0x32bb23(0x41e)][_0x32bb23(0x44b)][_0x32bb23(0x285)](this,_0x56f2e6);},VisuMZ[_0x128385(0x41e)][_0x128385(0x236)]=Game_BattlerBase[_0x128385(0x38c)]['addNewState'],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x2b6)]=function(_0x15c195){const _0x150c80=_0x128385;VisuMZ['SkillsStatesCore']['Game_BattlerBase_addNewState']['call'](this,_0x15c195);if(_0x15c195===this[_0x150c80(0x3fc)]())while(this['_states'][_0x150c80(0x4aa)](_0x1a0d0e=>_0x1a0d0e===this[_0x150c80(0x3fc)]())['length']>0x1){const _0xfd68ab=this[_0x150c80(0x26c)][_0x150c80(0x2b4)](this[_0x150c80(0x3fc)]());this[_0x150c80(0x26c)][_0x150c80(0x2ad)](_0xfd68ab,0x1);}},Game_Battler[_0x128385(0x38c)][_0x128385(0x28a)]=function(_0x4c871e){const _0x7da0a5=_0x128385;this[_0x7da0a5(0x1e3)](_0x4c871e),this[_0x7da0a5(0x478)](_0x4c871e),this[_0x7da0a5(0x4a5)](_0x4c871e),this['onAddStateCustomJS'](_0x4c871e),this['onAddStateGlobalJS'](_0x4c871e);},Game_Battler['prototype'][_0x128385(0x247)]=function(_0x1fd454){const _0x4e757f=_0x128385;this[_0x4e757f(0x25a)](_0x1fd454),this[_0x4e757f(0x479)](_0x1fd454),Game_BattlerBase[_0x4e757f(0x38c)][_0x4e757f(0x247)][_0x4e757f(0x285)](this,_0x1fd454);},Game_Battler[_0x128385(0x38c)][_0x128385(0x313)]=function(_0x1b7f3e){const _0x232ff5=_0x128385;for(const _0x4ccb0c of this[_0x232ff5(0x3a7)]()){this[_0x232ff5(0x367)](_0x4ccb0c['id'])&&_0x4ccb0c[_0x232ff5(0x1ce)]===_0x1b7f3e&&(this[_0x232ff5(0x259)](_0x4ccb0c['id']),this[_0x232ff5(0x1dd)](_0x4ccb0c['id']),this['onExpireStateGlobalJS'](_0x4ccb0c['id']));}},Game_Battler[_0x128385(0x38c)][_0x128385(0x1dd)]=function(_0x205dc0){const _0x10357d=_0x128385;this[_0x10357d(0x264)](_0x205dc0);},Game_Battler['prototype']['onAddStateCustomJS']=function(_0x122608){const _0x5c5b2c=_0x128385;if(this[_0x5c5b2c(0x2b3)]||this[_0x5c5b2c(0x21c)])return;const _0x1cf0a2=VisuMZ['SkillsStatesCore'][_0x5c5b2c(0x215)];if(_0x1cf0a2[_0x122608])_0x1cf0a2[_0x122608][_0x5c5b2c(0x285)](this,_0x122608);},Game_Battler[_0x128385(0x38c)][_0x128385(0x25a)]=function(_0x1c0cb7){const _0xc22b95=_0x128385;if(this[_0xc22b95(0x2b3)]||this[_0xc22b95(0x21c)])return;const _0xf00958=VisuMZ[_0xc22b95(0x41e)][_0xc22b95(0x49a)];if(_0xf00958[_0x1c0cb7])_0xf00958[_0x1c0cb7][_0xc22b95(0x285)](this,_0x1c0cb7);},Game_Battler['prototype'][_0x128385(0x264)]=function(_0x1d0331){const _0x1051ff=_0x128385;if(this[_0x1051ff(0x2b3)]||this[_0x1051ff(0x21c)])return;const _0x3813e6=VisuMZ[_0x1051ff(0x41e)][_0x1051ff(0x1c9)];if(_0x3813e6[_0x1d0331])_0x3813e6[_0x1d0331][_0x1051ff(0x285)](this,_0x1d0331);},Game_Battler[_0x128385(0x38c)][_0x128385(0x2d3)]=function(_0x304958){const _0x587adb=_0x128385;if(this[_0x587adb(0x2b3)]||this[_0x587adb(0x21c)])return;try{VisuMZ['SkillsStatesCore'][_0x587adb(0x29e)][_0x587adb(0x307)][_0x587adb(0x330)][_0x587adb(0x285)](this,_0x304958);}catch(_0x374109){if($gameTemp[_0x587adb(0x1c8)]())console[_0x587adb(0x42b)](_0x374109);}},Game_Battler[_0x128385(0x38c)][_0x128385(0x479)]=function(_0x10c358){const _0x3e2f3d=_0x128385;if(this['_tempActor']||this[_0x3e2f3d(0x21c)])return;try{VisuMZ[_0x3e2f3d(0x41e)][_0x3e2f3d(0x29e)]['States'][_0x3e2f3d(0x1f1)][_0x3e2f3d(0x285)](this,_0x10c358);}catch(_0x5156af){if($gameTemp[_0x3e2f3d(0x1c8)]())console['log'](_0x5156af);}},Game_Battler[_0x128385(0x38c)][_0x128385(0x48f)]=function(_0x2261bc){const _0x5e5188=_0x128385;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x5e5188(0x41e)]['Settings'][_0x5e5188(0x307)][_0x5e5188(0x302)]['call'](this,_0x2261bc);}catch(_0x423e27){if($gameTemp[_0x5e5188(0x1c8)]())console['log'](_0x423e27);}},Game_Battler['prototype'][_0x128385(0x409)]=function(_0x140d6d){const _0xaba6f1=_0x128385;return _0x140d6d=_0x140d6d[_0xaba6f1(0x448)]()['trim'](),this[_0xaba6f1(0x3a7)]()[_0xaba6f1(0x4aa)](_0x11ffb0=>_0x11ffb0[_0xaba6f1(0x1b3)][_0xaba6f1(0x467)](_0x140d6d));},Game_Battler[_0x128385(0x38c)]['removeStatesByCategory']=function(_0x55d391,_0xdaa5aa){const _0x501d3e=_0x128385;_0x55d391=_0x55d391[_0x501d3e(0x448)]()[_0x501d3e(0x46c)](),_0xdaa5aa=_0xdaa5aa||0x0;const _0x512d6a=this[_0x501d3e(0x409)](_0x55d391),_0x12b79f=[];for(const _0x2d8c12 of _0x512d6a){if(!_0x2d8c12)continue;if(_0xdaa5aa<=0x0)break;_0x12b79f[_0x501d3e(0x3f0)](_0x2d8c12['id']),this[_0x501d3e(0x1b1)][_0x501d3e(0x1cb)]=!![],_0xdaa5aa--;}while(_0x12b79f[_0x501d3e(0x22b)]>0x0){this[_0x501d3e(0x259)](_0x12b79f[_0x501d3e(0x425)]());}},Game_Battler[_0x128385(0x38c)]['removeStatesByCategoryAll']=function(_0x3b20a4,_0x340880){const _0xa02cba=_0x128385;_0x3b20a4=_0x3b20a4[_0xa02cba(0x448)]()[_0xa02cba(0x46c)](),_0x340880=_0x340880||[];const _0x73b719=this[_0xa02cba(0x409)](_0x3b20a4),_0x5ea813=[];for(const _0x368824 of _0x73b719){if(!_0x368824)continue;if(_0x340880['includes'](_0x368824))continue;_0x5ea813['push'](_0x368824['id']),this[_0xa02cba(0x1b1)][_0xa02cba(0x1cb)]=!![];}while(_0x5ea813['length']>0x0){this[_0xa02cba(0x259)](_0x5ea813[_0xa02cba(0x425)]());}},Game_Battler[_0x128385(0x38c)][_0x128385(0x3b3)]=function(_0x1555ad){const _0x2b145e=_0x128385;return this[_0x2b145e(0x325)](_0x1555ad)>0x0;},Game_Battler[_0x128385(0x38c)]['hasStateCategory']=function(_0x5884b5){const _0x324d8d=_0x128385;return this[_0x324d8d(0x22c)](_0x5884b5)>0x0;},Game_Battler[_0x128385(0x38c)][_0x128385(0x325)]=function(_0x9c7ee4){const _0x50361a=_0x128385,_0x5dad9b=this[_0x50361a(0x409)](_0x9c7ee4)[_0x50361a(0x4aa)](_0x3944fd=>this[_0x50361a(0x2bc)](_0x3944fd['id']));return _0x5dad9b[_0x50361a(0x22b)];},Game_Battler[_0x128385(0x38c)][_0x128385(0x22c)]=function(_0x408db4){const _0x131ad3=_0x128385,_0x2cb51f=this['statesByCategory'](_0x408db4);return _0x2cb51f[_0x131ad3(0x22b)];},VisuMZ[_0x128385(0x41e)][_0x128385(0x38a)]=Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x214)],Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x214)]=function(_0x33706a){const _0x2d7f4b=_0x128385,_0x57af19=$dataStates[_0x33706a];if(_0x57af19&&_0x57af19['categories'][_0x2d7f4b(0x22b)]>0x0)for(const _0x573224 of _0x57af19[_0x2d7f4b(0x1b3)]){if(this[_0x2d7f4b(0x474)](_0x573224))return!![];}return VisuMZ[_0x2d7f4b(0x41e)][_0x2d7f4b(0x38a)]['call'](this,_0x33706a);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x474)]=function(_0x3a7469){const _0x3e4531=_0x128385;let _0x5a052f=_0x3e4531(0x39f);if(this[_0x3e4531(0x290)](_0x5a052f))return this[_0x3e4531(0x1d6)][_0x5a052f][_0x3e4531(0x467)](_0x3a7469);return this[_0x3e4531(0x1d6)][_0x5a052f]=this[_0x3e4531(0x222)](),this[_0x3e4531(0x1d6)][_0x5a052f][_0x3e4531(0x467)](_0x3a7469);},Game_BattlerBase[_0x128385(0x38c)]['makeResistedStateCategories']=function(){const _0x10921c=_0x128385,_0x444817=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x54df41=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x1d8461=[];for(const _0x398f9e of this[_0x10921c(0x271)]()){if(!_0x398f9e)continue;const _0x223606=_0x398f9e[_0x10921c(0x368)],_0x28f5a3=_0x223606[_0x10921c(0x288)](_0x444817);if(_0x28f5a3)for(const _0x5196c4 of _0x28f5a3){_0x5196c4[_0x10921c(0x288)](_0x444817);const _0x449fb6=String(RegExp['$1'])[_0x10921c(0x472)](',')['map'](_0x91f487=>String(_0x91f487)[_0x10921c(0x448)]()['trim']());_0x1d8461=_0x1d8461['concat'](_0x449fb6);}if(_0x223606[_0x10921c(0x288)](_0x54df41)){const _0xf7a0ec=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x10921c(0x26b)](_0x5293ec=>String(_0x5293ec)[_0x10921c(0x448)]()[_0x10921c(0x46c)]());_0x1d8461=_0x1d8461[_0x10921c(0x3df)](_0xf7a0ec);}}return _0x1d8461;},Game_BattlerBase[_0x128385(0x38c)]['removeOtherStatesOfSameCategory']=function(_0x56980b){const _0x1da13d=_0x128385,_0x21f3be=$dataStates[_0x56980b];if(!_0x21f3be)return;const _0x6809bc=_0x21f3be['note']||'',_0xeeb4ed=_0x6809bc[_0x1da13d(0x288)](/<REMOVE OTHER (.*) STATES>/gi);if(_0xeeb4ed){const _0x4d5a84=[_0x21f3be];for(const _0xdc7328 of _0xeeb4ed){_0xdc7328['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x54c614=String(RegExp['$1']);this[_0x1da13d(0x20d)](_0x54c614,_0x4d5a84);}}},Game_Battler[_0x128385(0x38c)][_0x128385(0x32f)]=function(){const _0x305c01=_0x128385;for(const _0x212937 of this['states']()){if(!_0x212937)continue;if(!this['isStateAffected'](_0x212937['id']))continue;if(!_0x212937[_0x305c01(0x1ec)])continue;if(this['bypassRemoveStatesByDamage'](_0x212937))continue;Math[_0x305c01(0x1b7)](0x64)<_0x212937[_0x305c01(0x1bf)]&&this['removeState'](_0x212937['id']);}},VisuMZ['SkillsStatesCore'][_0x128385(0x20c)]=Game_Action[_0x128385(0x38c)][_0x128385(0x34a)],Game_Action[_0x128385(0x38c)][_0x128385(0x34a)]=function(_0x3880c2,_0x118d27){const _0x5d662f=_0x128385;$gameTemp['_bypassRemoveStateDamage_action']=this[_0x5d662f(0x235)](),$gameTemp[_0x5d662f(0x4a1)]=this[_0x5d662f(0x3c8)](),$gameTemp['_bypassRemoveStateDamage_value']=_0x118d27,VisuMZ[_0x5d662f(0x41e)][_0x5d662f(0x20c)]['call'](this,_0x3880c2,_0x118d27),$gameTemp['_bypassRemoveStateDamage_action']=undefined,$gameTemp['_bypassRemoveStateDamage_user']=undefined,$gameTemp[_0x5d662f(0x35f)]=undefined;},Game_Battler[_0x128385(0x38c)][_0x128385(0x2ed)]=function(_0x5b877f){const _0x2ce53b=_0x128385;if($gameTemp['_bypassRemoveStateDamage_action']){const _0x4fe6ce=$gameTemp[_0x2ce53b(0x298)],_0x24b7fc=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x2ce53b(0x347)](_0x5b877f,_0x4fe6ce,_0x24b7fc,_0x2ce53b(0x390)))return!![];}if($gameTemp['_bypassRemoveStateDamage_user']){const _0x46de71=$gameTemp['_bypassRemoveStateDamage_user'];if(_0x46de71['isUserBypassRemoveStatesByDamage'](_0x5b877f))return!![];}if(this[_0x2ce53b(0x2ee)](_0x5b877f))return!![];return![];},Game_Battler[_0x128385(0x38c)][_0x128385(0x1f3)]=function(_0x5247b4){const _0x58ac3a=_0x128385,_0x170765=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x3b3dfe of this[_0x58ac3a(0x271)]()){if(!_0x3b3dfe)continue;if(DataManager[_0x58ac3a(0x347)](_0x5247b4,_0x3b3dfe,_0x170765,_0x58ac3a(0x2b1)))return!![];}return![];},Game_Battler[_0x128385(0x38c)][_0x128385(0x2ee)]=function(_0x2c81d6){const _0x46f214=_0x128385,_0x771278=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x12bb04 of this['traitObjects']()){if(!_0x12bb04)continue;if(DataManager[_0x46f214(0x347)](_0x2c81d6,_0x12bb04,_0x771278,_0x46f214(0x243)))return!![];}return![];},DataManager[_0x128385(0x347)]=function(_0x6e47e6,_0x671b76,_0x544f95,_0x2e73f5){const _0x4d309d=_0x128385,_0x52b2de=_0x4d309d(0x46e)[_0x4d309d(0x233)](_0x671b76[_0x4d309d(0x33f)],_0x671b76['id'],_0x2e73f5);this[_0x4d309d(0x1de)]=this[_0x4d309d(0x1de)]||{};if(this[_0x4d309d(0x1de)][_0x52b2de]!==undefined)return this[_0x4d309d(0x1de)][_0x52b2de][_0x4d309d(0x467)](_0x6e47e6['id']);const _0x1dbb74=[],_0x3e2ebe=_0x671b76[_0x4d309d(0x368)][_0x4d309d(0x288)](_0x544f95);if(_0x3e2ebe)for(const _0x2752f6 of _0x3e2ebe){_0x2752f6[_0x4d309d(0x288)](_0x544f95);const _0x2eea93=String(RegExp['$1'])['split'](',')[_0x4d309d(0x26b)](_0x687b2=>_0x687b2[_0x4d309d(0x46c)]());for(let _0x5a623f of _0x2eea93){_0x5a623f=(String(_0x5a623f)||'')[_0x4d309d(0x46c)]();if(_0x5a623f[_0x4d309d(0x288)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x5ef3ef=Math['min'](Number(RegExp['$1']),Number(RegExp['$2'])),_0x301e68=Math[_0x4d309d(0x305)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x21e918=_0x5ef3ef;_0x21e918<=_0x301e68;_0x21e918++)elements[_0x4d309d(0x3f0)](_0x21e918);continue;}const _0x4cee66=/^\d+$/[_0x4d309d(0x33c)](_0x5a623f);_0x4cee66?entryID=Number(_0x5a623f):entryID=DataManager['getStateIdWithName'](_0x5a623f),entryID&&_0x1dbb74[_0x4d309d(0x3f0)](entryID);}}return this[_0x4d309d(0x1de)][_0x52b2de]=_0x1dbb74,this['_cache_CheckBypassRemoveStatesByDamage'][_0x52b2de][_0x4d309d(0x467)](_0x6e47e6['id']);},VisuMZ['SkillsStatesCore'][_0x128385(0x2c2)]=Game_Battler[_0x128385(0x38c)][_0x128385(0x343)],Game_Battler[_0x128385(0x38c)][_0x128385(0x343)]=function(_0x45ec12,_0x518744){const _0x269d17=_0x128385;VisuMZ[_0x269d17(0x41e)][_0x269d17(0x2c2)][_0x269d17(0x285)](this,_0x45ec12,_0x518744),this[_0x269d17(0x2e9)](_0x45ec12)&&this['onAddBuff'](_0x45ec12,_0x518744);},Game_Battler[_0x128385(0x38c)]['isBuffPrevented']=function(_0x52869d){},VisuMZ['SkillsStatesCore'][_0x128385(0x44e)]=Game_Battler['prototype']['addDebuff'],Game_Battler['prototype'][_0x128385(0x460)]=function(_0x37a952,_0x498ac2){const _0x5ca79f=_0x128385;VisuMZ[_0x5ca79f(0x41e)][_0x5ca79f(0x44e)]['call'](this,_0x37a952,_0x498ac2),this[_0x5ca79f(0x323)](_0x37a952)&&this['onAddDebuff'](_0x37a952,_0x498ac2);},Game_Battler['prototype'][_0x128385(0x2a7)]=function(){const _0x19e9d5=_0x128385;for(let _0x1b9986=0x0;_0x1b9986<this[_0x19e9d5(0x20b)]();_0x1b9986++){if(this[_0x19e9d5(0x3cb)](_0x1b9986)){const _0xf02c3d=this['_buffs'][_0x1b9986];this[_0x19e9d5(0x2b9)](_0x1b9986);if(_0xf02c3d>0x0)this[_0x19e9d5(0x316)](_0x1b9986);if(_0xf02c3d<0x0)this[_0x19e9d5(0x26e)](_0x1b9986);}}},Game_Battler['prototype'][_0x128385(0x350)]=function(_0x1d0d99,_0x41a035){const _0x17691d=_0x128385;this[_0x17691d(0x35d)](_0x1d0d99,_0x41a035);},Game_Battler[_0x128385(0x38c)][_0x128385(0x2d8)]=function(_0x3c1018,_0x481b8b){const _0x38305b=_0x128385;this[_0x38305b(0x473)](_0x3c1018,_0x481b8b);},Game_Battler[_0x128385(0x38c)][_0x128385(0x294)]=function(_0x1334a7){const _0x4b8e9a=_0x128385;Game_BattlerBase['prototype'][_0x4b8e9a(0x294)][_0x4b8e9a(0x285)](this,_0x1334a7),this[_0x4b8e9a(0x34e)](_0x1334a7);},Game_Battler[_0x128385(0x38c)]['onEraseDebuff']=function(_0x4c4c3b){const _0x3e639e=_0x128385;Game_BattlerBase[_0x3e639e(0x38c)][_0x3e639e(0x43f)][_0x3e639e(0x285)](this,_0x4c4c3b),this[_0x3e639e(0x1bd)](_0x4c4c3b);},Game_Battler[_0x128385(0x38c)][_0x128385(0x316)]=function(_0x461f64){const _0x51d2ab=_0x128385;this[_0x51d2ab(0x3ba)](_0x461f64);},Game_Battler[_0x128385(0x38c)]['onExpireDebuff']=function(_0x2242e0){const _0x359544=_0x128385;this[_0x359544(0x2ba)](_0x2242e0);},Game_Battler[_0x128385(0x38c)]['onAddBuffGlobalJS']=function(_0x1f28ec,_0x47469f){const _0xb905e3=_0x128385;VisuMZ['SkillsStatesCore'][_0xb905e3(0x29e)][_0xb905e3(0x2f6)][_0xb905e3(0x218)][_0xb905e3(0x285)](this,_0x1f28ec,_0x47469f);},Game_Battler[_0x128385(0x38c)]['onAddDebuffGlobalJS']=function(_0x53b4b3,_0x27cd7b){const _0x2bf702=_0x128385;VisuMZ[_0x2bf702(0x41e)][_0x2bf702(0x29e)][_0x2bf702(0x2f6)]['onAddDebuffJS'][_0x2bf702(0x285)](this,_0x53b4b3,_0x27cd7b);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x34e)]=function(_0x1c8f2d){const _0x983dca=_0x128385;VisuMZ[_0x983dca(0x41e)][_0x983dca(0x29e)][_0x983dca(0x2f6)][_0x983dca(0x3e8)]['call'](this,_0x1c8f2d);},Game_BattlerBase[_0x128385(0x38c)][_0x128385(0x1bd)]=function(_0x51e353){const _0x5bdc57=_0x128385;VisuMZ[_0x5bdc57(0x41e)]['Settings'][_0x5bdc57(0x2f6)]['onEraseDebuffJS'][_0x5bdc57(0x285)](this,_0x51e353);},Game_Battler[_0x128385(0x38c)][_0x128385(0x3ba)]=function(_0x442d00){const _0x55e5a8=_0x128385;VisuMZ[_0x55e5a8(0x41e)][_0x55e5a8(0x29e)][_0x55e5a8(0x2f6)][_0x55e5a8(0x1a4)]['call'](this,_0x442d00);},Game_Battler[_0x128385(0x38c)][_0x128385(0x2ba)]=function(_0x4cb148){const _0x3e8a1d=_0x128385;VisuMZ[_0x3e8a1d(0x41e)][_0x3e8a1d(0x29e)][_0x3e8a1d(0x2f6)]['onExpireDebuffJS'][_0x3e8a1d(0x285)](this,_0x4cb148);},Game_Battler['prototype'][_0x128385(0x4a5)]=function(_0x43be82){const _0x100388=_0x128385,_0x549a5e=VisuMZ['SkillsStatesCore'],_0x52f0ee=[_0x100388(0x3b5),_0x100388(0x299),_0x100388(0x1ad),_0x100388(0x297),_0x100388(0x19c),'stateTpSlipHealJS'];for(const _0x3e5c2d of _0x52f0ee){_0x549a5e[_0x3e5c2d][_0x43be82]&&_0x549a5e[_0x3e5c2d][_0x43be82][_0x100388(0x285)](this,_0x43be82);}},VisuMZ[_0x128385(0x41e)][_0x128385(0x245)]=Game_Battler[_0x128385(0x38c)]['regenerateAll'],Game_Battler[_0x128385(0x38c)][_0x128385(0x210)]=function(){const _0x492901=_0x128385;this[_0x492901(0x289)](),VisuMZ['SkillsStatesCore'][_0x492901(0x245)][_0x492901(0x285)](this),this['setPassiveStateSlipDamageJS'](),this[_0x492901(0x291)]();},Game_Battler[_0x128385(0x38c)][_0x128385(0x238)]=function(){const _0x4aa3f5=_0x128385;for(const _0x486a21 of this[_0x4aa3f5(0x432)]()){if(!_0x486a21)continue;this['onAddStateMakeCustomSlipValues'](_0x486a21['id']);}},Game_Battler[_0x128385(0x38c)]['recalculateSlipDamageJS']=function(){const _0x52631f=_0x128385;for(const _0x493d44 of this[_0x52631f(0x3a7)]()){if(!_0x493d44)continue;_0x493d44['note']['match'](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0x493d44['id']);}},Game_Battler[_0x128385(0x38c)][_0x128385(0x291)]=function(){const _0x42e4c4=_0x128385;if(!this[_0x42e4c4(0x2d1)]())return;const _0x246682=this[_0x42e4c4(0x3a7)]();for(const _0x283e91 of _0x246682){if(!_0x283e91)continue;this[_0x42e4c4(0x45a)](_0x283e91);}},Game_Battler[_0x128385(0x38c)][_0x128385(0x45a)]=function(_0x23152e){const _0x4b0e53=_0x128385,_0x24396c=this[_0x4b0e53(0x44a)](_0x23152e['id'],_0x4b0e53(0x31a))||0x0,_0x2579a7=-this['maxSlipDamage'](),_0x4b464e=Math[_0x4b0e53(0x305)](_0x24396c,_0x2579a7);if(_0x4b464e!==0x0){const _0x268179=this[_0x4b0e53(0x1b1)][_0x4b0e53(0x2cb)]||0x0;this[_0x4b0e53(0x35a)](_0x4b464e),this[_0x4b0e53(0x1b1)][_0x4b0e53(0x2cb)]+=_0x268179;}const _0x56744f=this['getStateData'](_0x23152e['id'],'slipMp')||0x0;if(_0x56744f!==0x0){const _0x3cf392=this[_0x4b0e53(0x1b1)][_0x4b0e53(0x2b5)]||0x0;this[_0x4b0e53(0x3da)](_0x56744f),this[_0x4b0e53(0x1b1)][_0x4b0e53(0x2b5)]+=_0x3cf392;}const _0x3c030a=this[_0x4b0e53(0x44a)](_0x23152e['id'],_0x4b0e53(0x3c9))||0x0;_0x3c030a!==0x0&&this['gainSilentTp'](_0x3c030a);},VisuMZ[_0x128385(0x41e)][_0x128385(0x2a0)]=Game_Actor['prototype']['skillTypes'],Game_Actor[_0x128385(0x38c)][_0x128385(0x3f8)]=function(){const _0x24b9f2=_0x128385,_0x45120a=VisuMZ[_0x24b9f2(0x41e)][_0x24b9f2(0x2a0)][_0x24b9f2(0x285)](this),_0x41dad8=VisuMZ[_0x24b9f2(0x41e)][_0x24b9f2(0x29e)][_0x24b9f2(0x3eb)];let _0x5f4be4=_0x41dad8[_0x24b9f2(0x41d)];return $gameParty['inBattle']()&&(_0x5f4be4=_0x5f4be4['concat'](_0x41dad8[_0x24b9f2(0x4a3)])),_0x45120a['filter'](_0x10adda=>!_0x5f4be4[_0x24b9f2(0x467)](_0x10adda));},Game_Actor[_0x128385(0x38c)]['usableSkills']=function(){const _0x4547d7=_0x128385;return this[_0x4547d7(0x3c7)]()[_0x4547d7(0x4aa)](_0x5ee2cd=>this[_0x4547d7(0x4a4)](_0x5ee2cd));},Game_Actor[_0x128385(0x38c)]['isSkillUsableForAutoBattle']=function(_0x4c4f15){const _0x2dcee6=_0x128385;if(!this[_0x2dcee6(0x277)](_0x4c4f15))return![];if(!_0x4c4f15)return![];if(!this[_0x2dcee6(0x3f6)](_0x4c4f15))return![];if(this['isSkillHidden'](_0x4c4f15))return![];return!![];},Game_Actor['prototype']['isSkillTypeMatchForUse']=function(_0x22fb03){const _0x182142=_0x128385,_0x7c06f6=this[_0x182142(0x3f8)](),_0x262fca=DataManager[_0x182142(0x468)](_0x22fb03),_0xf99d1f=_0x7c06f6['filter'](_0x355851=>_0x262fca[_0x182142(0x467)](_0x355851));return _0xf99d1f[_0x182142(0x22b)]>0x0;},Game_Actor[_0x128385(0x38c)][_0x128385(0x32b)]=function(_0x34e713){const _0x6ad13e=_0x128385;if(!VisuMZ[_0x6ad13e(0x41e)][_0x6ad13e(0x220)](this,_0x34e713))return!![];if(!VisuMZ[_0x6ad13e(0x41e)][_0x6ad13e(0x349)](this,_0x34e713))return!![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags'](this,_0x34e713))return!![];return![];},Game_Actor[_0x128385(0x38c)]['passiveStateObjects']=function(){const _0x263bc0=_0x128385;let _0x1ece10=[this[_0x263bc0(0x1cf)](),this[_0x263bc0(0x33e)]()];_0x1ece10=_0x1ece10['concat'](this['equips']()[_0x263bc0(0x4aa)](_0x1697a8=>_0x1697a8));for(const _0x3f220f of this[_0x263bc0(0x4a6)]){const _0x44d113=$dataSkills[_0x3f220f];if(!_0x44d113)continue;if(DataManager[_0x263bc0(0x292)](_0x44d113)){if(!this[_0x263bc0(0x33a)](_0x44d113))continue;}_0x1ece10[_0x263bc0(0x3f0)](_0x44d113);}return _0x1ece10;},Game_Actor[_0x128385(0x38c)][_0x128385(0x308)]=function(){const _0x2c28c2=_0x128385;Game_Battler['prototype'][_0x2c28c2(0x308)][_0x2c28c2(0x285)](this);const _0x2b7ed5=VisuMZ[_0x2c28c2(0x41e)][_0x2c28c2(0x29e)][_0x2c28c2(0x3e6)][_0x2c28c2(0x46b)];this['_cache'][_0x2c28c2(0x432)]=this[_0x2c28c2(0x1d6)][_0x2c28c2(0x432)][_0x2c28c2(0x3df)](_0x2b7ed5);},VisuMZ[_0x128385(0x41e)][_0x128385(0x3ed)]=Game_Actor[_0x128385(0x38c)][_0x128385(0x23c)],Game_Actor['prototype'][_0x128385(0x23c)]=function(_0x2eb9b6){const _0x337bfe=_0x128385;VisuMZ[_0x337bfe(0x41e)]['Game_Actor_learnSkill'][_0x337bfe(0x285)](this,_0x2eb9b6),this['_cache']={},this[_0x337bfe(0x432)]();},VisuMZ['SkillsStatesCore']['Game_Actor_forgetSkill']=Game_Actor[_0x128385(0x38c)][_0x128385(0x253)],Game_Actor[_0x128385(0x38c)][_0x128385(0x253)]=function(_0x253fad){const _0x580137=_0x128385;VisuMZ['SkillsStatesCore'][_0x580137(0x49c)][_0x580137(0x285)](this,_0x253fad),this['_cache']={},this[_0x580137(0x432)]();},Game_Actor[_0x128385(0x38c)][_0x128385(0x2da)]=function(){const _0x39c3a4=_0x128385;return VisuMZ[_0x39c3a4(0x41e)][_0x39c3a4(0x29e)][_0x39c3a4(0x307)][_0x39c3a4(0x318)]??0x14;},Game_Enemy[_0x128385(0x38c)][_0x128385(0x23b)]=function(){const _0x14893a=_0x128385;let _0x282230=[this[_0x14893a(0x49f)]()];return _0x282230[_0x14893a(0x3df)](this[_0x14893a(0x3c7)]());},Game_Enemy[_0x128385(0x38c)][_0x128385(0x308)]=function(){const _0x35482b=_0x128385;Game_Battler[_0x35482b(0x38c)][_0x35482b(0x308)]['call'](this);const _0x48d8bd=VisuMZ[_0x35482b(0x41e)][_0x35482b(0x29e)][_0x35482b(0x3e6)][_0x35482b(0x244)];this[_0x35482b(0x1d6)][_0x35482b(0x432)]=this[_0x35482b(0x1d6)]['passiveStates']['concat'](_0x48d8bd);},Game_Enemy[_0x128385(0x38c)][_0x128385(0x3c7)]=function(){const _0x3e361d=_0x128385,_0x5a6f21=[];for(const _0x554034 of this[_0x3e361d(0x49f)]()[_0x3e361d(0x21a)]){const _0x3d048=$dataSkills[_0x554034[_0x3e361d(0x2cd)]];if(_0x3d048&&!_0x5a6f21['includes'](_0x3d048))_0x5a6f21[_0x3e361d(0x3f0)](_0x3d048);}return _0x5a6f21;},Game_Enemy[_0x128385(0x38c)][_0x128385(0x221)]=function(_0x204ff6){const _0x1ae824=_0x128385;return this[_0x1ae824(0x24b)]($dataStates[_0x204ff6]);},VisuMZ[_0x128385(0x41e)]['Game_Unit_isAllDead']=Game_Unit[_0x128385(0x38c)][_0x128385(0x370)],Game_Unit[_0x128385(0x38c)][_0x128385(0x370)]=function(){const _0x35deb3=_0x128385;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x35deb3(0x41e)][_0x35deb3(0x31f)][_0x35deb3(0x285)](this);},Game_Unit[_0x128385(0x38c)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x51ff79=_0x128385,_0x44e0f0=this[_0x51ff79(0x2aa)]();for(const _0x2c3270 of _0x44e0f0){if(!_0x2c3270['isGroupDefeatStateAffected']())return![];}return!![];},Game_Unit[_0x128385(0x38c)][_0x128385(0x1c5)]=function(){const _0x5a1a05=_0x128385;for(const _0x5e6b07 of this[_0x5a1a05(0x41a)]()){if(!_0x5e6b07)continue;_0x5e6b07['refresh']();}},VisuMZ['SkillsStatesCore'][_0x128385(0x34d)]=Game_Player[_0x128385(0x38c)][_0x128385(0x283)],Game_Player[_0x128385(0x38c)]['refresh']=function(){const _0x3096e2=_0x128385;VisuMZ['SkillsStatesCore'][_0x3096e2(0x34d)][_0x3096e2(0x285)](this),$gameParty['refreshAllMembers'](),$gameParty['inBattle']()&&$gameTroop[_0x3096e2(0x1c5)]();},VisuMZ[_0x128385(0x41e)][_0x128385(0x359)]=Game_Troop[_0x128385(0x38c)]['setup'],Game_Troop[_0x128385(0x38c)]['setup']=function(_0x4d35f4){const _0x35c12a=_0x128385;VisuMZ[_0x35c12a(0x41e)][_0x35c12a(0x359)][_0x35c12a(0x285)](this,_0x4d35f4),this[_0x35c12a(0x47f)]();},Game_Troop[_0x128385(0x38c)][_0x128385(0x47f)]=function(){const _0x24c314=_0x128385;this[_0x24c314(0x415)]=Graphics[_0x24c314(0x3e7)];},Game_Troop[_0x128385(0x38c)][_0x128385(0x1d3)]=function(){const _0x5a6cac=_0x128385;return this[_0x5a6cac(0x415)]=this[_0x5a6cac(0x415)]||Graphics['frameCount'],this[_0x5a6cac(0x415)];},Scene_Skill[_0x128385(0x38c)][_0x128385(0x338)]=function(){const _0x1b219c=_0x128385;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1b219c(0x314)]!==undefined)return ConfigManager[_0x1b219c(0x314)];else{if(this[_0x1b219c(0x2d7)]())return this[_0x1b219c(0x475)]()[_0x1b219c(0x288)](/LOWER/i);else Scene_ItemBase['prototype'][_0x1b219c(0x3d3)][_0x1b219c(0x285)](this);}},Scene_Skill[_0x128385(0x38c)][_0x128385(0x3d3)]=function(){const _0x45c69a=_0x128385;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x45c69a(0x2f0)]!==undefined)return ConfigManager[_0x45c69a(0x2f0)];else return this[_0x45c69a(0x2d7)]()?this['updatedLayoutStyle']()[_0x45c69a(0x288)](/RIGHT/i):Scene_ItemBase[_0x45c69a(0x38c)][_0x45c69a(0x3d3)]['call'](this);},Scene_Skill[_0x128385(0x38c)]['updatedLayoutStyle']=function(){const _0x45b729=_0x128385;return VisuMZ[_0x45b729(0x41e)][_0x45b729(0x29e)][_0x45b729(0x3eb)][_0x45b729(0x3c3)];},Scene_Skill[_0x128385(0x38c)]['isUseModernControls']=function(){const _0x19559f=_0x128385;return this[_0x19559f(0x40b)]&&this[_0x19559f(0x40b)][_0x19559f(0x423)]();},Scene_Skill[_0x128385(0x38c)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x482eec=_0x128385;return VisuMZ[_0x482eec(0x41e)]['Settings'][_0x482eec(0x3eb)][_0x482eec(0x2a2)];},VisuMZ[_0x128385(0x41e)][_0x128385(0x2a9)]=Scene_Skill['prototype'][_0x128385(0x328)],Scene_Skill[_0x128385(0x38c)][_0x128385(0x328)]=function(){const _0x42f7d3=_0x128385;return this[_0x42f7d3(0x2d7)]()?this[_0x42f7d3(0x2e2)]():VisuMZ[_0x42f7d3(0x41e)][_0x42f7d3(0x2a9)][_0x42f7d3(0x285)](this);},Scene_Skill[_0x128385(0x38c)]['helpWindowRectSkillsStatesCore']=function(){const _0x3fdfad=_0x128385,_0x293669=0x0,_0x3a6224=this['helpAreaTop'](),_0xc69d5a=Graphics[_0x3fdfad(0x45d)],_0x23ecf2=this[_0x3fdfad(0x28d)]();return new Rectangle(_0x293669,_0x3a6224,_0xc69d5a,_0x23ecf2);},VisuMZ['SkillsStatesCore'][_0x128385(0x286)]=Scene_Skill[_0x128385(0x38c)][_0x128385(0x2eb)],Scene_Skill[_0x128385(0x38c)][_0x128385(0x2eb)]=function(){const _0xe7c54f=_0x128385;return this[_0xe7c54f(0x2d7)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0xe7c54f(0x41e)]['Scene_Skill_skillTypeWindowRect'][_0xe7c54f(0x285)](this);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x280)]=function(){const _0x373a81=_0x128385;return VisuMZ[_0x373a81(0x41e)][_0x373a81(0x29e)][_0x373a81(0x3eb)]['CmdWidth']??Scene_MenuBase[_0x373a81(0x38c)][_0x373a81(0x280)][_0x373a81(0x285)](this);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x3c5)]=function(){const _0x11732b=_0x128385,_0x2a3289=this[_0x11732b(0x280)](),_0x58599e=this[_0x11732b(0x3a2)](0x3,!![]),_0x493f90=this[_0x11732b(0x3d3)]()?Graphics['boxWidth']-_0x2a3289:0x0,_0xc5ef73=this[_0x11732b(0x29f)]();return new Rectangle(_0x493f90,_0xc5ef73,_0x2a3289,_0x58599e);},VisuMZ['SkillsStatesCore'][_0x128385(0x392)]=Scene_Skill[_0x128385(0x38c)][_0x128385(0x31e)],Scene_Skill[_0x128385(0x38c)][_0x128385(0x31e)]=function(){const _0x55f7c8=_0x128385;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['statusWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore'][_0x55f7c8(0x392)][_0x55f7c8(0x285)](this);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x4b2)]=function(){const _0x7569f0=_0x128385,_0x284b58=Graphics[_0x7569f0(0x45d)]-this['mainCommandWidth'](),_0x5f88b6=this[_0x7569f0(0x327)][_0x7569f0(0x495)],_0x2a2909=this[_0x7569f0(0x3d3)]()?0x0:Graphics[_0x7569f0(0x45d)]-_0x284b58,_0x1d7c6b=this['mainAreaTop']();return new Rectangle(_0x2a2909,_0x1d7c6b,_0x284b58,_0x5f88b6);},VisuMZ[_0x128385(0x41e)][_0x128385(0x1f6)]=Scene_Skill[_0x128385(0x38c)][_0x128385(0x3b6)],Scene_Skill[_0x128385(0x38c)]['createItemWindow']=function(){const _0x56cc75=_0x128385;VisuMZ[_0x56cc75(0x41e)][_0x56cc75(0x1f6)][_0x56cc75(0x285)](this),this[_0x56cc75(0x3b7)]()&&this[_0x56cc75(0x355)]();},VisuMZ[_0x128385(0x41e)][_0x128385(0x1e6)]=Scene_Skill['prototype']['itemWindowRect'],Scene_Skill[_0x128385(0x38c)][_0x128385(0x3dd)]=function(){const _0x43938d=_0x128385;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x43938d(0x312)]();else{const _0xa382b0=VisuMZ['SkillsStatesCore'][_0x43938d(0x1e6)][_0x43938d(0x285)](this);return this[_0x43938d(0x3b7)]()&&this[_0x43938d(0x2d9)]()&&(_0xa382b0[_0x43938d(0x389)]-=this[_0x43938d(0x339)]()),_0xa382b0;}},Scene_Skill['prototype']['itemWindowRectSkillsStatesCore']=function(){const _0x37b92c=_0x128385,_0x392b87=Graphics[_0x37b92c(0x45d)]-this[_0x37b92c(0x339)](),_0x326fd4=this[_0x37b92c(0x400)]()-this[_0x37b92c(0x265)][_0x37b92c(0x495)],_0x1cb2cb=this[_0x37b92c(0x3d3)]()?Graphics[_0x37b92c(0x45d)]-_0x392b87:0x0,_0x2cd373=this[_0x37b92c(0x265)]['y']+this[_0x37b92c(0x265)]['height'];return new Rectangle(_0x1cb2cb,_0x2cd373,_0x392b87,_0x326fd4);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x3b7)]=function(){const _0x2a5489=_0x128385;if(!Imported[_0x2a5489(0x3fe)])return![];else return this[_0x2a5489(0x2d7)]()?!![]:VisuMZ[_0x2a5489(0x41e)][_0x2a5489(0x29e)][_0x2a5489(0x3eb)][_0x2a5489(0x352)];},Scene_Skill[_0x128385(0x38c)]['adjustItemWidthByShopStatus']=function(){const _0x3e7735=_0x128385;return VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x3e7735(0x2f3)];},Scene_Skill['prototype']['createShopStatusWindow']=function(){const _0x387e94=_0x128385,_0x184b43=this[_0x387e94(0x2ce)]();this[_0x387e94(0x3aa)]=new Window_ShopStatus(_0x184b43),this[_0x387e94(0x2d2)](this[_0x387e94(0x3aa)]),this[_0x387e94(0x272)]['setStatusWindow'](this[_0x387e94(0x3aa)]);const _0x9afaa8=VisuMZ[_0x387e94(0x41e)]['Settings'][_0x387e94(0x3eb)]['SkillSceneStatusBgType'];this[_0x387e94(0x3aa)]['setBackgroundType'](_0x9afaa8||0x0);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x2ce)]=function(){const _0x3e6552=_0x128385;return this[_0x3e6552(0x2d7)]()?this[_0x3e6552(0x37c)]():VisuMZ[_0x3e6552(0x41e)][_0x3e6552(0x29e)][_0x3e6552(0x3eb)][_0x3e6552(0x242)][_0x3e6552(0x285)](this);},Scene_Skill[_0x128385(0x38c)][_0x128385(0x37c)]=function(){const _0x5cd1b9=_0x128385,_0x4f5e02=this[_0x5cd1b9(0x339)](),_0x3002ed=this[_0x5cd1b9(0x272)][_0x5cd1b9(0x495)],_0x7477e6=this[_0x5cd1b9(0x3d3)]()?0x0:Graphics['boxWidth']-this[_0x5cd1b9(0x339)](),_0x1eaa4d=this[_0x5cd1b9(0x272)]['y'];return new Rectangle(_0x7477e6,_0x1eaa4d,_0x4f5e02,_0x3002ed);},Scene_Skill['prototype'][_0x128385(0x339)]=function(){const _0x4cc212=_0x128385;return Imported[_0x4cc212(0x3fe)]?Scene_Shop[_0x4cc212(0x38c)][_0x4cc212(0x1d9)]():0x0;},Scene_Skill['prototype'][_0x128385(0x205)]=function(){const _0xf30557=_0x128385;return this[_0xf30557(0x327)]&&this[_0xf30557(0x327)][_0xf30557(0x1c6)]?TextManager[_0xf30557(0x2cc)]:'';},VisuMZ[_0x128385(0x41e)]['Scene_Skill_onItemOk_Toggle']=Scene_Skill[_0x128385(0x38c)][_0x128385(0x2f4)],Scene_Skill[_0x128385(0x38c)][_0x128385(0x2f4)]=function(){const _0xc4698f=_0x128385,_0x2c02f4=this['item']();DataManager[_0xc4698f(0x292)](_0x2c02f4)?this[_0xc4698f(0x49b)]():VisuMZ[_0xc4698f(0x41e)]['Scene_Skill_onItemOk_Toggle'][_0xc4698f(0x285)](this);},Scene_Skill['prototype'][_0x128385(0x49b)]=function(){const _0x810629=_0x128385;SoundManager[_0x810629(0x1b5)]();const _0x58c26e=this['item'](),_0x24aff5=this[_0x810629(0x1cf)]()[_0x810629(0x33a)](_0x58c26e);if(!_0x24aff5)this[_0x810629(0x1cf)]()['paySkillCost'](_0x58c26e);this[_0x810629(0x1cf)]()[_0x810629(0x3e1)](_0x58c26e,!_0x24aff5),this[_0x810629(0x272)]['refresh'](),this[_0x810629(0x272)][_0x810629(0x492)]();if(this[_0x810629(0x265)])this[_0x810629(0x265)][_0x810629(0x283)]();},VisuMZ[_0x128385(0x41e)][_0x128385(0x1f5)]=Scene_Battle[_0x128385(0x38c)][_0x128385(0x2d0)],Scene_Battle['prototype'][_0x128385(0x2d0)]=function(){const _0x10cbd2=_0x128385,_0x1a2f18=this[_0x10cbd2(0x361)][_0x10cbd2(0x235)]();DataManager['isToggleSkill'](_0x1a2f18)?(this[_0x10cbd2(0x49b)](_0x1a2f18),this[_0x10cbd2(0x361)][_0x10cbd2(0x283)](),this[_0x10cbd2(0x361)][_0x10cbd2(0x492)]()):VisuMZ['SkillsStatesCore'][_0x10cbd2(0x1f5)][_0x10cbd2(0x285)](this);},Scene_Battle[_0x128385(0x38c)]['isCurrentCommandSkillToggle']=function(){const _0x58602d=_0x128385;if(this[_0x58602d(0x488)]['currentSymbol']()!==_0x58602d(0x249))return![];const _0x3b17ff=this[_0x58602d(0x488)][_0x58602d(0x447)](),_0x27ab62=$dataSkills[_0x3b17ff];return DataManager[_0x58602d(0x292)](_0x27ab62);},VisuMZ[_0x128385(0x41e)][_0x128385(0x451)]=Scene_Battle[_0x128385(0x38c)]['onSelectAction'],Scene_Battle[_0x128385(0x38c)][_0x128385(0x227)]=function(){const _0x16bd69=_0x128385;if(this['isCurrentCommandSkillToggle']()){const _0x43e8df=this['_actorCommandWindow']['currentExt'](),_0x547f07=$dataSkills[_0x43e8df];this[_0x16bd69(0x49b)](_0x547f07),this[_0x16bd69(0x488)][_0x16bd69(0x283)](),this[_0x16bd69(0x488)][_0x16bd69(0x492)]();}else VisuMZ[_0x16bd69(0x41e)][_0x16bd69(0x451)][_0x16bd69(0x285)](this);},Scene_Battle[_0x128385(0x38c)][_0x128385(0x49b)]=function(_0x5ad07e){const _0x4e8c49=_0x128385;SoundManager[_0x4e8c49(0x1b5)]();const _0x3d1761=BattleManager[_0x4e8c49(0x1cf)](),_0x1b7f70=_0x3d1761['isSkillToggled'](_0x5ad07e);if(!_0x1b7f70)_0x3d1761[_0x4e8c49(0x365)](_0x5ad07e);_0x3d1761['setSkillToggle'](_0x5ad07e,!_0x1b7f70);if(Imported[_0x4e8c49(0x37e)]){let _0x507cb8=0x0;_0x3d1761[_0x4e8c49(0x33a)](_0x5ad07e)?_0x5ad07e[_0x4e8c49(0x368)][_0x4e8c49(0x288)](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x507cb8=Number(RegExp['$1']):_0x507cb8=_0x5ad07e[_0x4e8c49(0x43e)]||0x0:_0x5ad07e[_0x4e8c49(0x368)][_0x4e8c49(0x288)](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x507cb8=Number(RegExp['$1']):_0x507cb8=VisuMZ['SkillsStatesCore'][_0x4e8c49(0x29e)][_0x4e8c49(0x412)][_0x4e8c49(0x333)]??0x0,_0x507cb8>0x0&&$gameTemp['requestFauxAnimation']([_0x3d1761],_0x507cb8,![],![]);}if(this[_0x4e8c49(0x265)])this[_0x4e8c49(0x265)][_0x4e8c49(0x283)]();},VisuMZ[_0x128385(0x41e)][_0x128385(0x1ca)]=Sprite_Gauge[_0x128385(0x38c)]['initMembers'],Sprite_Gauge[_0x128385(0x38c)]['initMembers']=function(){const _0x11031b=_0x128385;VisuMZ[_0x11031b(0x41e)][_0x11031b(0x1ca)][_0x11031b(0x285)](this),this[_0x11031b(0x2dd)]=null;},VisuMZ['SkillsStatesCore'][_0x128385(0x485)]=Sprite_Gauge[_0x128385(0x38c)]['setup'],Sprite_Gauge['prototype']['setup']=function(_0x521820,_0x3fb037){const _0xb55474=_0x128385;this[_0xb55474(0x344)](_0x521820,_0x3fb037),_0x3fb037=_0x3fb037[_0xb55474(0x47b)](),VisuMZ['SkillsStatesCore'][_0xb55474(0x485)][_0xb55474(0x285)](this,_0x521820,_0x3fb037);},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x344)]=function(_0x427054,_0x5e86ec){const _0x1a894e=_0x128385,_0x5e104c=VisuMZ[_0x1a894e(0x41e)]['Settings'][_0x1a894e(0x3b0)][_0x1a894e(0x4aa)](_0x4a83fb=>_0x4a83fb['Name']['toUpperCase']()===_0x5e86ec['toUpperCase']());_0x5e104c[_0x1a894e(0x22b)]>=0x1?this[_0x1a894e(0x2dd)]=_0x5e104c[0x0]:this['_costSettings']=null;},VisuMZ[_0x128385(0x41e)][_0x128385(0x276)]=Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x229)],Sprite_Gauge['prototype']['currentValue']=function(){const _0x312342=_0x128385;return this[_0x312342(0x363)]&&this[_0x312342(0x2dd)]?this[_0x312342(0x3d7)]():VisuMZ[_0x312342(0x41e)]['Sprite_Gauge_currentValue'][_0x312342(0x285)](this);},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x3d7)]=function(){const _0x24336a=_0x128385;return this[_0x24336a(0x2dd)][_0x24336a(0x4b1)][_0x24336a(0x285)](this[_0x24336a(0x363)]);},VisuMZ[_0x128385(0x41e)][_0x128385(0x203)]=Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x1af)],Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x1af)]=function(){const _0x3cadc8=_0x128385;return this[_0x3cadc8(0x363)]&&this[_0x3cadc8(0x2dd)]?this[_0x3cadc8(0x1f9)]():VisuMZ[_0x3cadc8(0x41e)]['Sprite_Gauge_currentMaxValue'][_0x3cadc8(0x285)](this);},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x1f9)]=function(){const _0x2a5ac2=_0x128385;return this[_0x2a5ac2(0x2dd)]['GaugeMaxJS'][_0x2a5ac2(0x285)](this[_0x2a5ac2(0x363)]);},VisuMZ['SkillsStatesCore'][_0x128385(0x393)]=Sprite_Gauge['prototype'][_0x128385(0x2c8)],Sprite_Gauge[_0x128385(0x38c)]['gaugeRate']=function(){const _0x2d3cd1=_0x128385,_0x207abb=VisuMZ[_0x2d3cd1(0x41e)]['Sprite_Gauge_gaugeRate'][_0x2d3cd1(0x285)](this);return _0x207abb[_0x2d3cd1(0x2fe)](0x0,0x1);},VisuMZ[_0x128385(0x41e)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0x128385(0x38c)]['redraw'],Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x2b0)]=function(){const _0x3ddddc=_0x128385;this[_0x3ddddc(0x363)]&&this['_costSettings']?(this[_0x3ddddc(0x191)][_0x3ddddc(0x39b)](),this[_0x3ddddc(0x260)]()):VisuMZ[_0x3ddddc(0x41e)][_0x3ddddc(0x32e)][_0x3ddddc(0x285)](this);},Sprite_Gauge['prototype'][_0x128385(0x457)]=function(){const _0x5465cc=_0x128385;let _0x22f443=this['currentValue']();return Imported[_0x5465cc(0x37e)]&&this['useDigitGrouping']()&&(_0x22f443=VisuMZ[_0x5465cc(0x1e8)](_0x22f443)),_0x22f443;},Sprite_Gauge[_0x128385(0x38c)]['redrawSkillsStatesCore']=function(){const _0x59d02b=_0x128385;this[_0x59d02b(0x191)][_0x59d02b(0x39b)](),this[_0x59d02b(0x2dd)][_0x59d02b(0x3f5)][_0x59d02b(0x285)](this);},Sprite_Gauge['prototype'][_0x128385(0x23d)]=function(_0x4fad97,_0x4223c8,_0x3b62d0,_0x27c97c,_0x1a3889,_0x1ba211){const _0x3790de=_0x128385,_0x5643ce=this[_0x3790de(0x2c8)](),_0x2d4d73=Math[_0x3790de(0x251)]((_0x1a3889-0x2)*_0x5643ce),_0x54f983=_0x1ba211-0x2,_0x5f2d5f=this[_0x3790de(0x1d8)]();this[_0x3790de(0x191)][_0x3790de(0x1db)](_0x3b62d0,_0x27c97c,_0x1a3889,_0x1ba211,_0x5f2d5f),this[_0x3790de(0x191)][_0x3790de(0x192)](_0x3b62d0+0x1,_0x27c97c+0x1,_0x2d4d73,_0x54f983,_0x4fad97,_0x4223c8);},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x47c)]=function(){const _0x1b0e1d=_0x128385,_0x184b56=VisuMZ['SkillsStatesCore'][_0x1b0e1d(0x29e)]['Gauge'];return _0x184b56[_0x1b0e1d(0x332)]===_0x1b0e1d(0x19f)?$gameSystem[_0x1b0e1d(0x4a7)]():$gameSystem['mainFontFace']();},Sprite_Gauge['prototype'][_0x128385(0x257)]=function(){const _0x39e68c=_0x128385,_0x315ce0=VisuMZ[_0x39e68c(0x41e)][_0x39e68c(0x29e)]['Gauge'];return _0x315ce0[_0x39e68c(0x332)]==='number'?$gameSystem['mainFontSize']()-0x6:$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x3c4)]=function(){const _0x345aa4=_0x128385,_0x5e7e70=VisuMZ[_0x345aa4(0x41e)]['Settings']['Gauge'];return _0x5e7e70[_0x345aa4(0x1e2)]===_0x345aa4(0x19f)?$gameSystem[_0x345aa4(0x4a7)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x2e4)]=function(){const _0x414e5b=_0x128385,_0xcd7d28=VisuMZ['SkillsStatesCore']['Settings'][_0x414e5b(0x258)];return _0xcd7d28[_0x414e5b(0x1e2)]===_0x414e5b(0x19f)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x414e5b(0x209)]()-0x2;},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x477)]=function(){const _0x23e13d=_0x128385,_0x99852d=VisuMZ[_0x23e13d(0x41e)][_0x23e13d(0x29e)]['Gauge'];if(_0x99852d[_0x23e13d(0x28f)]){if(_0x99852d[_0x23e13d(0x3ee)]===0x1)return this[_0x23e13d(0x196)]();else{if(_0x99852d[_0x23e13d(0x3ee)]===0x2)return this['gaugeColor2']();}}const _0x217eed=_0x99852d[_0x23e13d(0x491)];return ColorManager[_0x23e13d(0x470)](_0x217eed);},Sprite_Gauge['prototype'][_0x128385(0x1bc)]=function(){const _0x1d1c34=_0x128385,_0x23441d=VisuMZ[_0x1d1c34(0x41e)][_0x1d1c34(0x29e)][_0x1d1c34(0x258)];if(this[_0x1d1c34(0x2f1)]()<=0x0)return _0x1d1c34(0x353);else return _0x23441d['LabelOutlineSolid']?_0x1d1c34(0x398):ColorManager[_0x1d1c34(0x403)]();},Sprite_Gauge['prototype']['labelOutlineWidth']=function(){const _0x51077d=_0x128385;return VisuMZ[_0x51077d(0x41e)][_0x51077d(0x29e)][_0x51077d(0x258)][_0x51077d(0x2c6)]||0x0;},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x434)]=function(){const _0x14b4e0=_0x128385,_0x482860=VisuMZ['SkillsStatesCore'][_0x14b4e0(0x29e)][_0x14b4e0(0x258)];if(this['valueOutlineWidth']()<=0x0)return _0x14b4e0(0x353);else return _0x482860[_0x14b4e0(0x388)]?_0x14b4e0(0x398):ColorManager[_0x14b4e0(0x403)]();},Sprite_Gauge[_0x128385(0x38c)][_0x128385(0x455)]=function(){const _0x233e95=_0x128385;return VisuMZ[_0x233e95(0x41e)][_0x233e95(0x29e)]['Gauge'][_0x233e95(0x19e)]||0x0;},VisuMZ[_0x128385(0x41e)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x128385(0x38c)]['loadBitmap'],Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x2c7)]=function(){const _0x2803cd=_0x128385;VisuMZ[_0x2803cd(0x41e)][_0x2803cd(0x3a1)][_0x2803cd(0x285)](this),this[_0x2803cd(0x428)]();},Sprite_StateIcon['prototype'][_0x128385(0x428)]=function(){const _0x4b59f6=_0x128385,_0x42bfa7=Window_Base[_0x4b59f6(0x38c)]['lineHeight']();this[_0x4b59f6(0x452)]=new Sprite(),this[_0x4b59f6(0x452)]['bitmap']=new Bitmap(ImageManager['iconWidth'],_0x42bfa7),this['_turnDisplaySprite'][_0x4b59f6(0x287)]['x']=this[_0x4b59f6(0x287)]['x'],this[_0x4b59f6(0x452)][_0x4b59f6(0x287)]['y']=this[_0x4b59f6(0x287)]['y'],this[_0x4b59f6(0x1a9)](this[_0x4b59f6(0x452)]),this[_0x4b59f6(0x2e8)]=this[_0x4b59f6(0x452)][_0x4b59f6(0x191)];},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x2e7)],Sprite_StateIcon['prototype'][_0x128385(0x2e7)]=function(){const _0x3ddf55=_0x128385;VisuMZ[_0x3ddf55(0x41e)][_0x3ddf55(0x3ff)][_0x3ddf55(0x285)](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x1ef)]=function(_0x2977ac,_0x483864,_0x33d263,_0x15f510,_0x507b72){const _0x5cc0f3=_0x128385;this[_0x5cc0f3(0x2e8)][_0x5cc0f3(0x1ef)](_0x2977ac,_0x483864,_0x33d263,_0x15f510,this[_0x5cc0f3(0x2e8)][_0x5cc0f3(0x495)],_0x507b72);},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x25c)]=function(){const _0x3ec8be=_0x128385;this[_0x3ec8be(0x4b0)](),this[_0x3ec8be(0x2e8)][_0x3ec8be(0x39b)]();const _0x36f730=this['_battler'];if(!_0x36f730)return;const _0x33bbb6=_0x36f730[_0x3ec8be(0x3a7)]()['filter'](_0x1f1e41=>_0x1f1e41[_0x3ec8be(0x3f2)]>0x0),_0x481ae9=[...Array(0x8)[_0x3ec8be(0x484)]()][_0x3ec8be(0x4aa)](_0x14196f=>_0x36f730[_0x3ec8be(0x2ab)](_0x14196f)!==0x0),_0x9eb10a=this['_animationIndex'],_0x1e7481=_0x33bbb6[_0x9eb10a];if(_0x1e7481)Window_Base[_0x3ec8be(0x38c)][_0x3ec8be(0x2bd)][_0x3ec8be(0x285)](this,_0x36f730,_0x1e7481,0x0,0x0),Window_Base['prototype'][_0x3ec8be(0x335)][_0x3ec8be(0x285)](this,_0x36f730,_0x1e7481,0x0,0x0);else{const _0x102c25=_0x481ae9[_0x9eb10a-_0x33bbb6[_0x3ec8be(0x22b)]];if(_0x102c25===undefined)return;Window_Base[_0x3ec8be(0x38c)][_0x3ec8be(0x2cf)][_0x3ec8be(0x285)](this,_0x36f730,_0x102c25,0x0,0x0),Window_Base[_0x3ec8be(0x38c)][_0x3ec8be(0x44c)][_0x3ec8be(0x285)](this,_0x36f730,_0x102c25,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x128385(0x4b0)]=function(){const _0x4dfc7e=_0x128385;this[_0x4dfc7e(0x2e8)]['fontFace']=$gameSystem[_0x4dfc7e(0x37b)](),this[_0x4dfc7e(0x2e8)][_0x4dfc7e(0x2be)]=$gameSystem[_0x4dfc7e(0x209)](),this[_0x4dfc7e(0x310)]();},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x310)]=function(){const _0xf4b89=_0x128385;this[_0xf4b89(0x2af)](ColorManager['normalColor']()),this[_0xf4b89(0x3b9)](ColorManager[_0xf4b89(0x403)]());},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x2af)]=function(_0x5de1cb){const _0x53b354=_0x128385;this['contents'][_0x53b354(0x228)]=_0x5de1cb;},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x3b9)]=function(_0x15535f){const _0x593313=_0x128385;this[_0x593313(0x2e8)][_0x593313(0x403)]=_0x15535f;},Sprite_StateIcon[_0x128385(0x38c)][_0x128385(0x1d2)]=function(){const _0x417191=_0x128385;this[_0x417191(0x4b3)]=!![],this['updateVisibility']();},Window_Base[_0x128385(0x38c)][_0x128385(0x202)]=function(_0x5e43ff,_0x5ebf52,_0x476c8d,_0xbe985b,_0x421754){const _0x54f686=_0x128385,_0x17988f=this['createAllSkillCostText'](_0x5e43ff,_0x5ebf52),_0x4d5a05=this[_0x54f686(0x36b)](_0x17988f,_0x476c8d,_0xbe985b,_0x421754),_0x10d7f0=_0x476c8d+_0x421754-_0x4d5a05[_0x54f686(0x389)];this[_0x54f686(0x2f2)](_0x17988f,_0x10d7f0,_0xbe985b,_0x421754),this[_0x54f686(0x4b0)]();},Window_Base[_0x128385(0x38c)][_0x128385(0x498)]=function(_0xa76c32,_0x38507e){const _0x275bfc=_0x128385;let _0x13b201='';for(settings of VisuMZ[_0x275bfc(0x41e)][_0x275bfc(0x29e)]['Costs']){if(!this[_0x275bfc(0x27c)](_0xa76c32,_0x38507e,settings))continue;if(_0x13b201[_0x275bfc(0x22b)]>0x0)_0x13b201+=this[_0x275bfc(0x422)]();_0x13b201+=this[_0x275bfc(0x322)](_0xa76c32,_0x38507e,settings);}_0x13b201=this[_0x275bfc(0x1b6)](_0xa76c32,_0x38507e,_0x13b201);if(_0x38507e[_0x275bfc(0x368)][_0x275bfc(0x288)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x13b201[_0x275bfc(0x22b)]>0x0)_0x13b201+=this[_0x275bfc(0x422)]();_0x13b201+=String(RegExp['$1']);}return _0x13b201;},Window_Base[_0x128385(0x38c)][_0x128385(0x1b6)]=function(_0x4d696a,_0x32d04b,_0x2e0f72){return _0x2e0f72;},Window_Base[_0x128385(0x38c)][_0x128385(0x27c)]=function(_0x5c8144,_0x1a45e5,_0x28e8bd){const _0x3c3c8b=_0x128385;let _0x2a249e=_0x28e8bd[_0x3c3c8b(0x217)][_0x3c3c8b(0x285)](_0x5c8144,_0x1a45e5);return _0x2a249e=_0x5c8144[_0x3c3c8b(0x315)](_0x1a45e5,_0x2a249e,_0x28e8bd),_0x28e8bd[_0x3c3c8b(0x386)][_0x3c3c8b(0x285)](_0x5c8144,_0x1a45e5,_0x2a249e,_0x28e8bd);},Window_Base[_0x128385(0x38c)][_0x128385(0x322)]=function(_0x7e9089,_0x2a3c6f,_0x3a7e2a){const _0x2306af=_0x128385;let _0x459cdb=_0x3a7e2a[_0x2306af(0x217)][_0x2306af(0x285)](_0x7e9089,_0x2a3c6f);return _0x459cdb=_0x7e9089[_0x2306af(0x315)](_0x2a3c6f,_0x459cdb,_0x3a7e2a),_0x3a7e2a[_0x2306af(0x28c)][_0x2306af(0x285)](_0x7e9089,_0x2a3c6f,_0x459cdb,_0x3a7e2a);},Window_Base[_0x128385(0x38c)][_0x128385(0x422)]=function(){return'\x20';},Window_Base[_0x128385(0x38c)]['drawActorIcons']=function(_0x371589,_0x1315da,_0x336b53,_0x4232de){const _0x1c5d20=_0x128385;if(!_0x371589)return;VisuMZ[_0x1c5d20(0x41e)][_0x1c5d20(0x25e)]['call'](this,_0x371589,_0x1315da,_0x336b53,_0x4232de),this[_0x1c5d20(0x1c0)](_0x371589,_0x1315da,_0x336b53,_0x4232de);},Window_Base['prototype'][_0x128385(0x1c0)]=function(_0x142ddd,_0x1547ad,_0xfab33d,_0xb60821){const _0x465d4b=_0x128385;_0xb60821=_0xb60821||0x90;const _0xec60d7=ImageManager[_0x465d4b(0x30d)]||0x20,_0x2b9993=ImageManager[_0x465d4b(0x274)]||0x20,_0x24461f=_0xec60d7,_0x3e3347=_0x142ddd[_0x465d4b(0x27d)]()[_0x465d4b(0x364)](0x0,Math[_0x465d4b(0x251)](_0xb60821/_0x24461f)),_0x3d63af=_0x142ddd[_0x465d4b(0x3a7)]()[_0x465d4b(0x4aa)](_0x359976=>_0x359976[_0x465d4b(0x3f2)]>0x0),_0x217096=[...Array(0x8)[_0x465d4b(0x484)]()][_0x465d4b(0x4aa)](_0x4b120b=>_0x142ddd['buff'](_0x4b120b)!==0x0),_0x5742d6=[];let _0x322b69=_0x1547ad;for(let _0x2c1c15=0x0;_0x2c1c15<_0x3e3347[_0x465d4b(0x22b)];_0x2c1c15++){this['resetFontSettings']();const _0x495592=_0x3d63af[_0x2c1c15];if(_0x495592)!_0x5742d6['includes'](_0x495592)&&this[_0x465d4b(0x2bd)](_0x142ddd,_0x495592,_0x322b69,_0xfab33d),this[_0x465d4b(0x335)](_0x142ddd,_0x495592,_0x322b69,_0xfab33d),_0x5742d6['push'](_0x495592);else{const _0x34064f=_0x217096[_0x2c1c15-_0x3d63af[_0x465d4b(0x22b)]];this[_0x465d4b(0x2cf)](_0x142ddd,_0x34064f,_0x322b69,_0xfab33d),this[_0x465d4b(0x44c)](_0x142ddd,_0x34064f,_0x322b69,_0xfab33d);}_0x322b69+=_0x24461f;}},Window_Base['prototype'][_0x128385(0x2bd)]=function(_0x349019,_0x528a77,_0x118c6c,_0x96b326){const _0x2de265=_0x128385;if(!VisuMZ[_0x2de265(0x41e)][_0x2de265(0x29e)][_0x2de265(0x307)][_0x2de265(0x24c)])return;if(!_0x349019[_0x2de265(0x2bc)](_0x528a77['id']))return;if(_0x528a77[_0x2de265(0x1ce)]===0x0)return;if(_0x528a77[_0x2de265(0x368)][_0x2de265(0x288)](/<HIDE STATE TURNS>/i))return;const _0x17f827=ImageManager['standardIconWidth']||0x20,_0x55bf00=_0x17f827,_0x256bfe=_0x349019[_0x2de265(0x39e)](_0x528a77['id']),_0x1dd1c9=ColorManager['stateColor'](_0x528a77);this[_0x2de265(0x2af)](_0x1dd1c9),this[_0x2de265(0x3b9)]('rgba(0,\x200,\x200,\x201)'),this[_0x2de265(0x2e8)][_0x2de265(0x1a6)]=!![],this[_0x2de265(0x2e8)][_0x2de265(0x2be)]=VisuMZ[_0x2de265(0x41e)][_0x2de265(0x29e)][_0x2de265(0x307)]['TurnFontSize'],_0x118c6c+=VisuMZ['SkillsStatesCore'][_0x2de265(0x29e)][_0x2de265(0x307)][_0x2de265(0x3bf)],_0x96b326+=VisuMZ['SkillsStatesCore'][_0x2de265(0x29e)][_0x2de265(0x307)][_0x2de265(0x1a2)],this[_0x2de265(0x1ef)](_0x256bfe,_0x118c6c,_0x96b326,_0x55bf00,_0x2de265(0x1fa)),this[_0x2de265(0x2e8)][_0x2de265(0x1a6)]=![],this['resetFontSettings']();},Window_Base[_0x128385(0x38c)]['drawActorStateData']=function(_0x5032b9,_0x5ef984,_0x4b9551,_0x461411){const _0x328db8=_0x128385;if(!VisuMZ['SkillsStatesCore'][_0x328db8(0x29e)][_0x328db8(0x307)][_0x328db8(0x2c1)])return;const _0x889ce=ImageManager[_0x328db8(0x30d)]||0x20,_0x47f830=ImageManager[_0x328db8(0x274)]||0x20,_0x1bb0ba=_0x889ce,_0x576a27=_0x47f830/0x2,_0x252e31=ColorManager[_0x328db8(0x469)]();this[_0x328db8(0x2af)](_0x252e31),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x328db8(0x2e8)][_0x328db8(0x1a6)]=!![],this[_0x328db8(0x2e8)][_0x328db8(0x2be)]=VisuMZ[_0x328db8(0x41e)][_0x328db8(0x29e)][_0x328db8(0x307)][_0x328db8(0x1ff)],_0x4b9551+=VisuMZ['SkillsStatesCore']['Settings'][_0x328db8(0x307)]['DataOffsetX'],_0x461411+=VisuMZ[_0x328db8(0x41e)][_0x328db8(0x29e)][_0x328db8(0x307)][_0x328db8(0x47d)];const _0x3c9382=String(_0x5032b9[_0x328db8(0x2f7)](_0x5ef984['id']));this[_0x328db8(0x1ef)](_0x3c9382,_0x4b9551,_0x461411,_0x1bb0ba,_0x328db8(0x2a5)),this[_0x328db8(0x2e8)][_0x328db8(0x1a6)]=![],this[_0x328db8(0x4b0)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x2d0f83,_0x4b5444,_0x93697e,_0x4a5086){const _0x516ede=_0x128385;if(!VisuMZ[_0x516ede(0x41e)][_0x516ede(0x29e)]['Buffs']['ShowTurns'])return;const _0x394dc3=_0x2d0f83['buff'](_0x4b5444);if(_0x394dc3===0x0)return;const _0x4da6da=_0x2d0f83[_0x516ede(0x248)](_0x4b5444),_0x2f4276=ImageManager[_0x516ede(0x256)],_0x133d9a=_0x394dc3>0x0?ColorManager[_0x516ede(0x3d1)]():ColorManager['debuffColor']();this[_0x516ede(0x2af)](_0x133d9a),this['changeOutlineColor'](_0x516ede(0x398)),this[_0x516ede(0x2e8)]['fontBold']=!![],this[_0x516ede(0x2e8)][_0x516ede(0x2be)]=VisuMZ['SkillsStatesCore']['Settings'][_0x516ede(0x2f6)]['TurnFontSize'],_0x93697e+=VisuMZ[_0x516ede(0x41e)][_0x516ede(0x29e)][_0x516ede(0x2f6)][_0x516ede(0x3bf)],_0x4a5086+=VisuMZ[_0x516ede(0x41e)][_0x516ede(0x29e)][_0x516ede(0x2f6)][_0x516ede(0x1a2)],this[_0x516ede(0x1ef)](_0x4da6da,_0x93697e,_0x4a5086,_0x2f4276,'right'),this[_0x516ede(0x2e8)]['fontBold']=![],this[_0x516ede(0x4b0)]();},Window_Base['prototype']['drawActorBuffRates']=function(_0x4491c4,_0x165169,_0x9e3554,_0x1593ca){const _0x172385=_0x128385;if(!VisuMZ[_0x172385(0x41e)][_0x172385(0x29e)][_0x172385(0x2f6)]['ShowData'])return;const _0x47f983=_0x4491c4[_0x172385(0x250)](_0x165169),_0x68ad22=_0x4491c4[_0x172385(0x2ab)](_0x165169),_0x5eb9d9=ImageManager[_0x172385(0x30d)]||0x20,_0x54b1c9=ImageManager['standardIconHeight']||0x20,_0x55138b=_0x5eb9d9,_0x12fd74=_0x54b1c9/0x2,_0x580240=_0x68ad22>0x0?ColorManager['buffColor']():ColorManager[_0x172385(0x3d0)]();this[_0x172385(0x2af)](_0x580240),this[_0x172385(0x3b9)](_0x172385(0x398)),this[_0x172385(0x2e8)][_0x172385(0x1a6)]=!![],this[_0x172385(0x2e8)][_0x172385(0x2be)]=VisuMZ['SkillsStatesCore']['Settings'][_0x172385(0x2f6)][_0x172385(0x1ff)],_0x9e3554+=VisuMZ[_0x172385(0x41e)][_0x172385(0x29e)][_0x172385(0x2f6)][_0x172385(0x382)],_0x1593ca+=VisuMZ[_0x172385(0x41e)][_0x172385(0x29e)][_0x172385(0x2f6)][_0x172385(0x47d)];const _0x3cd594=_0x172385(0x396)[_0x172385(0x233)](Math[_0x172385(0x208)](_0x47f983*0x64));this['drawText'](_0x3cd594,_0x9e3554,_0x1593ca,_0x55138b,_0x172385(0x2a5)),this[_0x172385(0x2e8)][_0x172385(0x1a6)]=![],this[_0x172385(0x4b0)]();},VisuMZ['SkillsStatesCore'][_0x128385(0x1b0)]=Window_Base[_0x128385(0x38c)]['changeTextColor'],Window_Base['prototype']['changeTextColor']=function(_0x2ae004){const _0x5bb22c=_0x128385;this[_0x5bb22c(0x3e5)]&&(_0x2ae004=ColorManager[_0x5bb22c(0x470)](VisuMZ[_0x5bb22c(0x41e)]['Settings'][_0x5bb22c(0x412)][_0x5bb22c(0x376)]??0x0)),VisuMZ[_0x5bb22c(0x41e)][_0x5bb22c(0x1b0)][_0x5bb22c(0x285)](this,_0x2ae004);},VisuMZ[_0x128385(0x41e)][_0x128385(0x3be)]=Window_Base['prototype']['drawText'],Window_Base[_0x128385(0x38c)][_0x128385(0x1ef)]=function(_0x490f08,_0x505c6c,_0x500876,_0x3c0e0d,_0x428a43){const _0x5dabdb=_0x128385;VisuMZ['SkillsStatesCore'][_0x5dabdb(0x3be)][_0x5dabdb(0x285)](this,_0x490f08,_0x505c6c,_0x500876,_0x3c0e0d,_0x428a43),this[_0x5dabdb(0x3e5)]=undefined;},VisuMZ[_0x128385(0x41e)][_0x128385(0x296)]=Window_Base[_0x128385(0x38c)][_0x128385(0x498)],Window_Base['prototype'][_0x128385(0x498)]=function(_0x170736,_0x5a6b62){const _0x160b19=_0x128385;let _0x1d1f9e=VisuMZ[_0x160b19(0x41e)][_0x160b19(0x296)][_0x160b19(0x285)](this,_0x170736,_0x5a6b62);;return DataManager[_0x160b19(0x292)](_0x5a6b62)&&_0x170736&&(_0x170736[_0x160b19(0x33a)](_0x5a6b62)?_0x1d1f9e=TextManager['toggleOn']??_0x160b19(0x21d):(TextManager[_0x160b19(0x2ac)]===_0x160b19(0x362)?_0x1d1f9e=(TextManager[_0x160b19(0x1ac)]??'[OFF]')+this[_0x160b19(0x422)]()+_0x1d1f9e:_0x1d1f9e=_0x1d1f9e+this[_0x160b19(0x422)]()+(TextManager[_0x160b19(0x1ac)]??'[OFF]'),_0x1d1f9e=_0x1d1f9e[_0x160b19(0x46c)]())),_0x1d1f9e;},VisuMZ[_0x128385(0x41e)][_0x128385(0x38d)]=Window_StatusBase[_0x128385(0x38c)]['placeGauge'],Window_StatusBase[_0x128385(0x38c)]['placeGauge']=function(_0x24fda8,_0x3adc91,_0x591a9e,_0x54732a){const _0x3b758f=_0x128385;if(_0x24fda8[_0x3b758f(0x303)]())_0x3adc91=this['convertGaugeTypeSkillsStatesCore'](_0x24fda8,_0x3adc91);this[_0x3b758f(0x3a8)](_0x24fda8,_0x3adc91,_0x591a9e,_0x54732a);},Window_StatusBase[_0x128385(0x38c)][_0x128385(0x3a8)]=function(_0x44408a,_0x43fb11,_0x25aa14,_0x246fda){const _0x1c68c6=_0x128385;if([_0x1c68c6(0x1f4),_0x1c68c6(0x45b)]['includes'](_0x43fb11[_0x1c68c6(0x47b)]()))return;VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge']['call'](this,_0x44408a,_0x43fb11,_0x25aa14,_0x246fda);},Window_StatusBase[_0x128385(0x38c)]['convertGaugeTypeSkillsStatesCore']=function(_0x27b6e5,_0x2cf0eb){const _0x1fc1a6=_0x128385,_0x1b9d42=_0x27b6e5['currentClass']()[_0x1fc1a6(0x368)];if(_0x2cf0eb==='hp'&&_0x1b9d42['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2cf0eb==='mp'&&_0x1b9d42[_0x1fc1a6(0x288)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x2cf0eb==='tp'&&_0x1b9d42[_0x1fc1a6(0x288)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x2cf0eb;}},VisuMZ[_0x128385(0x41e)][_0x128385(0x25e)]=Window_StatusBase[_0x128385(0x38c)][_0x128385(0x27e)],Window_StatusBase[_0x128385(0x38c)][_0x128385(0x27e)]=function(_0x118944,_0x3a8644,_0x4b59a9,_0x418287){const _0x246939=_0x128385;if(!_0x118944)return;Window_Base[_0x246939(0x38c)][_0x246939(0x27e)]['call'](this,_0x118944,_0x3a8644,_0x4b59a9,_0x418287);},VisuMZ[_0x128385(0x41e)]['Window_SkillType_initialize']=Window_SkillType[_0x128385(0x38c)][_0x128385(0x2e3)],Window_SkillType[_0x128385(0x38c)]['initialize']=function(_0x413482){const _0x4126ec=_0x128385;VisuMZ['SkillsStatesCore'][_0x4126ec(0x29c)][_0x4126ec(0x285)](this,_0x413482),this[_0x4126ec(0x465)](_0x413482);},Window_SkillType[_0x128385(0x38c)][_0x128385(0x465)]=function(_0x3a34f5){const _0x25f3cb=_0x128385,_0x34f069=new Rectangle(0x0,0x0,_0x3a34f5[_0x25f3cb(0x389)],_0x3a34f5[_0x25f3cb(0x495)]);this[_0x25f3cb(0x224)]=new Window_Base(_0x34f069),this[_0x25f3cb(0x224)]['opacity']=0x0,this['addChild'](this[_0x25f3cb(0x224)]),this['updateCommandNameWindow']();},Window_SkillType[_0x128385(0x38c)][_0x128385(0x23a)]=function(){const _0x27051c=_0x128385;Window_Command[_0x27051c(0x38c)][_0x27051c(0x23a)][_0x27051c(0x285)](this);if(this['_commandNameWindow'])this[_0x27051c(0x381)]();},Window_SkillType['prototype']['updateCommandNameWindow']=function(){const _0x223e67=_0x128385,_0x5624ae=this[_0x223e67(0x224)];_0x5624ae[_0x223e67(0x2e8)][_0x223e67(0x39b)]();const _0x4d313c=this[_0x223e67(0x3e3)](this[_0x223e67(0x494)]());if(_0x4d313c===_0x223e67(0x444)&&this['maxItems']()>0x0){const _0x3f2a40=this[_0x223e67(0x3fd)](this['index']());let _0x515e4b=this[_0x223e67(0x1c1)](this[_0x223e67(0x494)]());_0x515e4b=_0x515e4b[_0x223e67(0x3bc)](/\\I\[(\d+)\]/gi,''),_0x5624ae['resetFontSettings'](),this[_0x223e67(0x42a)](_0x515e4b,_0x3f2a40),this[_0x223e67(0x2a8)](_0x515e4b,_0x3f2a40),this[_0x223e67(0x40c)](_0x515e4b,_0x3f2a40);}},Window_SkillType['prototype']['commandNameWindowDrawBackground']=function(_0xfbd45d,_0xdaab09){},Window_SkillType[_0x128385(0x38c)][_0x128385(0x2a8)]=function(_0x380f80,_0x5e1ee0){const _0x23bec0=_0x128385,_0x2b952a=this[_0x23bec0(0x224)];_0x2b952a[_0x23bec0(0x1ef)](_0x380f80,0x0,_0x5e1ee0['y'],_0x2b952a[_0x23bec0(0x418)],_0x23bec0(0x2a5));},Window_SkillType[_0x128385(0x38c)][_0x128385(0x40c)]=function(_0x4d4ea6,_0x49f97b){const _0x3644c9=_0x128385,_0x3569f5=this['_commandNameWindow'],_0x52661b=$gameSystem[_0x3644c9(0x44f)](),_0x55dab8=_0x49f97b['x']+Math[_0x3644c9(0x251)](_0x49f97b[_0x3644c9(0x389)]/0x2)+_0x52661b;_0x3569f5['x']=_0x3569f5[_0x3644c9(0x389)]/-0x2+_0x55dab8,_0x3569f5['y']=Math[_0x3644c9(0x251)](_0x49f97b[_0x3644c9(0x495)]/0x2);},Window_SkillType[_0x128385(0x38c)][_0x128385(0x423)]=function(){const _0x1c7240=_0x128385;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x1c7240(0x38c)][_0x1c7240(0x423)][_0x1c7240(0x285)](this);},Window_SkillType[_0x128385(0x38c)][_0x128385(0x2c3)]=function(){const _0x5758c5=_0x128385;if(!this[_0x5758c5(0x4a2)])return;const _0x3965a2=this[_0x5758c5(0x4a2)][_0x5758c5(0x3f8)]();for(const _0x31ea87 of _0x3965a2){const _0x5ad49b=this[_0x5758c5(0x4ae)](_0x31ea87);this[_0x5758c5(0x4a0)](_0x5ad49b,'skill',!![],_0x31ea87);}},Window_SkillType[_0x128385(0x38c)][_0x128385(0x4ae)]=function(_0x1b987b){const _0x1908ec=_0x128385;let _0x4746d1=$dataSystem[_0x1908ec(0x3f8)][_0x1b987b];if(_0x4746d1['match'](/\\I\[(\d+)\]/i))return _0x4746d1;if(this[_0x1908ec(0x199)]()===_0x1908ec(0x380))return _0x4746d1;const _0x4e4cdf=VisuMZ[_0x1908ec(0x41e)][_0x1908ec(0x29e)][_0x1908ec(0x3eb)],_0x515ec0=$dataSystem[_0x1908ec(0x377)][_0x1908ec(0x467)](_0x1b987b),_0x242e13=_0x515ec0?_0x4e4cdf['IconStypeMagic']:_0x4e4cdf[_0x1908ec(0x317)];return _0x1908ec(0x1aa)['format'](_0x242e13,_0x4746d1);},Window_SkillType['prototype'][_0x128385(0x1a7)]=function(){const _0x840e12=_0x128385;return VisuMZ[_0x840e12(0x41e)][_0x840e12(0x29e)][_0x840e12(0x3eb)][_0x840e12(0x371)];},Window_SkillType[_0x128385(0x38c)][_0x128385(0x36e)]=function(_0x4a1f88){const _0x4c64b0=_0x128385,_0x41cb29=this['commandStyleCheck'](_0x4a1f88);if(_0x41cb29==='iconText')this[_0x4c64b0(0x24f)](_0x4a1f88);else _0x41cb29==='icon'?this[_0x4c64b0(0x34f)](_0x4a1f88):Window_Command['prototype'][_0x4c64b0(0x36e)][_0x4c64b0(0x285)](this,_0x4a1f88);},Window_SkillType[_0x128385(0x38c)][_0x128385(0x199)]=function(){const _0x401d6d=_0x128385;return VisuMZ[_0x401d6d(0x41e)][_0x401d6d(0x29e)]['Skills']['CmdStyle'];},Window_SkillType[_0x128385(0x38c)][_0x128385(0x3e3)]=function(_0x2b5ee1){const _0x2a64f0=_0x128385;if(_0x2b5ee1<0x0)return _0x2a64f0(0x380);const _0x17e906=this[_0x2a64f0(0x199)]();if(_0x17e906!==_0x2a64f0(0x1cc))return _0x17e906;else{if(this[_0x2a64f0(0x28e)]()>0x0){const _0x5903ad=this[_0x2a64f0(0x1c1)](_0x2b5ee1);if(_0x5903ad[_0x2a64f0(0x288)](/\\I\[(\d+)\]/i)){const _0xdb6208=this[_0x2a64f0(0x3fd)](_0x2b5ee1),_0x54426a=this[_0x2a64f0(0x36b)](_0x5903ad)[_0x2a64f0(0x389)];return _0x54426a<=_0xdb6208[_0x2a64f0(0x389)]?_0x2a64f0(0x2d5):_0x2a64f0(0x444);}}}return _0x2a64f0(0x380);},Window_SkillType['prototype'][_0x128385(0x24f)]=function(_0x1c38fc){const _0x3cae29=_0x128385,_0x46a118=this[_0x3cae29(0x3fd)](_0x1c38fc),_0x108c9a=this[_0x3cae29(0x1c1)](_0x1c38fc),_0x59e6d8=this[_0x3cae29(0x36b)](_0x108c9a)['width'];this[_0x3cae29(0x2c4)](this['isCommandEnabled'](_0x1c38fc));const _0x26dd19=this['itemTextAlign']();if(_0x26dd19===_0x3cae29(0x1fa))this[_0x3cae29(0x2f2)](_0x108c9a,_0x46a118['x']+_0x46a118['width']-_0x59e6d8,_0x46a118['y'],_0x59e6d8);else{if(_0x26dd19===_0x3cae29(0x2a5)){const _0xa618ee=_0x46a118['x']+Math[_0x3cae29(0x251)]((_0x46a118[_0x3cae29(0x389)]-_0x59e6d8)/0x2);this[_0x3cae29(0x2f2)](_0x108c9a,_0xa618ee,_0x46a118['y'],_0x59e6d8);}else this['drawTextEx'](_0x108c9a,_0x46a118['x'],_0x46a118['y'],_0x59e6d8);}},Window_SkillType[_0x128385(0x38c)]['drawItemStyleIcon']=function(_0x140a5c){const _0x3ae1fa=_0x128385;this[_0x3ae1fa(0x1c1)](_0x140a5c)[_0x3ae1fa(0x288)](/\\I\[(\d+)\]/i);const _0x596954=Number(RegExp['$1'])||0x0,_0x14d779=this[_0x3ae1fa(0x3fd)](_0x140a5c),_0x7a074f=_0x14d779['x']+Math[_0x3ae1fa(0x251)]((_0x14d779['width']-ImageManager['iconWidth'])/0x2),_0x52c4c3=_0x14d779['y']+(_0x14d779[_0x3ae1fa(0x495)]-ImageManager[_0x3ae1fa(0x442)])/0x2;this[_0x3ae1fa(0x3d6)](_0x596954,_0x7a074f,_0x52c4c3);},VisuMZ[_0x128385(0x41e)][_0x128385(0x3f3)]=Window_SkillStatus[_0x128385(0x38c)][_0x128385(0x283)],Window_SkillStatus[_0x128385(0x38c)][_0x128385(0x283)]=function(){const _0xa9ae46=_0x128385;VisuMZ[_0xa9ae46(0x41e)][_0xa9ae46(0x3f3)][_0xa9ae46(0x285)](this);if(this[_0xa9ae46(0x4a2)])this[_0xa9ae46(0x2ff)]();},Window_SkillStatus['prototype'][_0x128385(0x2ff)]=function(){const _0x376755=_0x128385;if(!Imported[_0x376755(0x37e)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x2ae262=this[_0x376755(0x2e6)]();let _0x21c2d8=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x179810=this[_0x376755(0x418)]-_0x21c2d8-0x2;if(_0x179810>=0x12c){const _0x13c855=VisuMZ[_0x376755(0x331)][_0x376755(0x29e)][_0x376755(0x39a)][_0x376755(0x304)],_0x22161a=Math[_0x376755(0x251)](_0x179810/0x2)-0x18;let _0x18623d=_0x21c2d8,_0x5b2d0a=Math[_0x376755(0x251)]((this[_0x376755(0x1d7)]-Math[_0x376755(0x40e)](_0x13c855[_0x376755(0x22b)]/0x2)*_0x2ae262)/0x2),_0x4ce59e=0x0;for(const _0x1f2868 of _0x13c855){this[_0x376755(0x1e4)](_0x18623d,_0x5b2d0a,_0x22161a,_0x1f2868),_0x4ce59e++,_0x4ce59e%0x2===0x0?(_0x18623d=_0x21c2d8,_0x5b2d0a+=_0x2ae262):_0x18623d+=_0x22161a+0x18;}}this[_0x376755(0x4b0)]();},Window_SkillStatus[_0x128385(0x38c)][_0x128385(0x1e4)]=function(_0x5c97bc,_0x301d41,_0x18ad28,_0x421624){const _0x347689=_0x128385,_0x105990=this[_0x347689(0x2e6)]();this['resetFontSettings'](),this[_0x347689(0x2ef)](_0x5c97bc,_0x301d41,_0x18ad28,_0x421624,!![]),this['resetTextColor'](),this[_0x347689(0x2e8)][_0x347689(0x2be)]-=0x8;const _0x181113=this[_0x347689(0x4a2)]['paramValueByName'](_0x421624,!![]);this[_0x347689(0x2e8)][_0x347689(0x1ef)](_0x181113,_0x5c97bc,_0x301d41,_0x18ad28,_0x105990,_0x347689(0x1fa));},VisuMZ[_0x128385(0x41e)][_0x128385(0x3bd)]=Window_SkillList[_0x128385(0x38c)][_0x128385(0x467)],Window_SkillList[_0x128385(0x38c)][_0x128385(0x467)]=function(_0x1b2e9c){const _0x30e999=_0x128385;if(this[_0x30e999(0x49d)]<=0x0)return![];return this['includesSkillsStatesCore'](_0x1b2e9c);},VisuMZ['SkillsStatesCore'][_0x128385(0x2c9)]=Window_SkillList['prototype'][_0x128385(0x219)],Window_SkillList[_0x128385(0x38c)]['maxCols']=function(){const _0x2ba535=_0x128385;return SceneManager[_0x2ba535(0x40f)]['constructor']===Scene_Battle?VisuMZ[_0x2ba535(0x41e)]['Window_SkillList_maxCols'][_0x2ba535(0x285)](this):VisuMZ['SkillsStatesCore'][_0x2ba535(0x29e)]['Skills']['ListWindowCols'];},VisuMZ['SkillsStatesCore']['Window_SkillList_setActor']=Window_SkillList[_0x128385(0x38c)][_0x128385(0x311)],Window_SkillList[_0x128385(0x38c)]['setActor']=function(_0x35dbc1){const _0x487e23=_0x128385,_0x42b116=this[_0x487e23(0x4a2)]!==_0x35dbc1;VisuMZ[_0x487e23(0x41e)]['Window_SkillList_setActor'][_0x487e23(0x285)](this,_0x35dbc1),_0x42b116&&(this[_0x487e23(0x265)]&&this[_0x487e23(0x265)][_0x487e23(0x3ca)]===Window_ShopStatus&&this[_0x487e23(0x265)][_0x487e23(0x369)](this[_0x487e23(0x1e1)](0x0)));},Window_SkillList['prototype'][_0x128385(0x2c0)]=function(_0x5b4048){const _0x52d288=_0x128385;if(this[_0x52d288(0x49d)]===_0x5b4048)return;if(!_0x5b4048)return;this[_0x52d288(0x49d)]=_0x5b4048,this['refresh'](),this[_0x52d288(0x26a)](0x0,0x0),this[_0x52d288(0x265)]&&this[_0x52d288(0x265)][_0x52d288(0x3ca)]===Window_ShopStatus&&this[_0x52d288(0x265)]['setItem'](this['itemAt'](0x0));},Window_SkillList['prototype'][_0x128385(0x1a3)]=function(_0x3ca98f){const _0x5a39c4=_0x128385;if(!_0x3ca98f)return VisuMZ['SkillsStatesCore'][_0x5a39c4(0x3bd)]['call'](this,_0x3ca98f);if(!this[_0x5a39c4(0x1ed)](_0x3ca98f))return![];if(!this[_0x5a39c4(0x2c5)](_0x3ca98f))return![];if(!this[_0x5a39c4(0x200)](_0x3ca98f))return![];return!![];},Window_SkillList[_0x128385(0x38c)][_0x128385(0x1ed)]=function(_0x591cd2){const _0x39398f=_0x128385;return DataManager[_0x39398f(0x468)](_0x591cd2)[_0x39398f(0x467)](this[_0x39398f(0x49d)]);},Window_SkillList[_0x128385(0x38c)]['checkShowHideNotetags']=function(_0x4a9afa){const _0x473a54=_0x128385;if(!VisuMZ[_0x473a54(0x41e)][_0x473a54(0x220)](this[_0x473a54(0x4a2)],_0x4a9afa))return![];if(!VisuMZ[_0x473a54(0x41e)][_0x473a54(0x349)](this[_0x473a54(0x4a2)],_0x4a9afa))return![];if(!VisuMZ[_0x473a54(0x41e)][_0x473a54(0x278)](this[_0x473a54(0x4a2)],_0x4a9afa))return![];return!![];},VisuMZ[_0x128385(0x41e)]['CheckVisibleBattleNotetags']=function(_0x1ddeed,_0xeccb93){const _0x565d02=_0x128385,_0x245f1f=_0xeccb93[_0x565d02(0x368)];if(_0x245f1f['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x565d02(0x27b)]())return![];else return _0x245f1f[_0x565d02(0x288)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x565d02(0x27b)]()?![]:!![];},VisuMZ[_0x128385(0x41e)][_0x128385(0x349)]=function(_0x23f231,_0x16b936){const _0x35ddd2=_0x128385,_0x5f0c92=_0x16b936[_0x35ddd2(0x368)];if(_0x5f0c92[_0x35ddd2(0x288)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x305e87=JSON[_0x35ddd2(0x29d)]('['+RegExp['$1'][_0x35ddd2(0x288)](/\d+/g)+']');for(const _0x3bb0a6 of _0x305e87){if(!$gameSwitches['value'](_0x3bb0a6))return![];}return!![];}if(_0x5f0c92[_0x35ddd2(0x288)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xcf5c48=JSON[_0x35ddd2(0x29d)]('['+RegExp['$1'][_0x35ddd2(0x288)](/\d+/g)+']');for(const _0x4a113b of _0xcf5c48){if(!$gameSwitches[_0x35ddd2(0x4ad)](_0x4a113b))return![];}return!![];}if(_0x5f0c92[_0x35ddd2(0x288)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11f821=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ce005 of _0x11f821){if($gameSwitches[_0x35ddd2(0x4ad)](_0x2ce005))return!![];}return![];}if(_0x5f0c92[_0x35ddd2(0x288)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x366a1c=JSON[_0x35ddd2(0x29d)]('['+RegExp['$1'][_0x35ddd2(0x288)](/\d+/g)+']');for(const _0x3283c1 of _0x366a1c){if(!$gameSwitches[_0x35ddd2(0x4ad)](_0x3283c1))return!![];}return![];}if(_0x5f0c92[_0x35ddd2(0x288)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ebad2=JSON[_0x35ddd2(0x29d)]('['+RegExp['$1'][_0x35ddd2(0x288)](/\d+/g)+']');for(const _0x131018 of _0x5ebad2){if(!$gameSwitches['value'](_0x131018))return!![];}return![];}if(_0x5f0c92['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3711c5=JSON[_0x35ddd2(0x29d)]('['+RegExp['$1'][_0x35ddd2(0x288)](/\d+/g)+']');for(const _0x3d220a of _0x3711c5){if($gameSwitches[_0x35ddd2(0x4ad)](_0x3d220a))return![];}return!![];}return!![];},VisuMZ[_0x128385(0x41e)][_0x128385(0x278)]=function(_0x7fa516,_0x1ba18e){const _0x48d35c=_0x128385,_0x3bfb2f=_0x1ba18e[_0x48d35c(0x368)];if(_0x3bfb2f['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11912c=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x3ff15 of _0x11912c){if(!_0x7fa516['isLearnedSkill'](_0x3ff15))return![];}return!![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x179764=RegExp['$1']['split'](',');for(const _0x4ace61 of _0x179764){const _0x28ae3f=DataManager[_0x48d35c(0x421)](_0x4ace61);if(!_0x28ae3f)continue;if(!_0x7fa516[_0x48d35c(0x1a0)](_0x28ae3f))return![];}return!![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x451073=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x5725a1 of _0x451073){if(!_0x7fa516['isLearnedSkill'](_0x5725a1))return![];}return!![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x333751=RegExp['$1']['split'](',');for(const _0x32ccd7 of _0x333751){const _0x28d9f8=DataManager['getSkillIdWithName'](_0x32ccd7);if(!_0x28d9f8)continue;if(!_0x7fa516[_0x48d35c(0x1a0)](_0x28d9f8))return![];}return!![];}}if(_0x3bfb2f['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22263e=JSON[_0x48d35c(0x29d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xc31593 of _0x22263e){if(_0x7fa516[_0x48d35c(0x1a0)](_0xc31593))return!![];}return![];}else{if(_0x3bfb2f['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3bc793=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x2e25a0 of _0x3bc793){const _0x286dcb=DataManager[_0x48d35c(0x421)](_0x2e25a0);if(!_0x286dcb)continue;if(_0x7fa516[_0x48d35c(0x1a0)](_0x286dcb))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x315816=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0xe5c378 of _0x315816){if(!_0x7fa516[_0x48d35c(0x1a0)](_0xe5c378))return!![];}return![];}else{if(_0x3bfb2f['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4ae20c=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x420003 of _0x4ae20c){const _0x101465=DataManager[_0x48d35c(0x421)](_0x420003);if(!_0x101465)continue;if(!_0x7fa516['isLearnedSkill'](_0x101465))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17f571=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x357141 of _0x17f571){if(!_0x7fa516['isLearnedSkill'](_0x357141))return!![];}return![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x46ddc3=RegExp['$1']['split'](',');for(const _0x5956a8 of _0x46ddc3){const _0x35717b=DataManager['getSkillIdWithName'](_0x5956a8);if(!_0x35717b)continue;if(!_0x7fa516[_0x48d35c(0x1a0)](_0x35717b))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45bbbd=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x17f46a of _0x45bbbd){if(_0x7fa516[_0x48d35c(0x1a0)](_0x17f46a))return![];}return!![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xfb3519=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x417f08 of _0xfb3519){const _0x339030=DataManager[_0x48d35c(0x421)](_0x417f08);if(!_0x339030)continue;if(_0x7fa516[_0x48d35c(0x1a0)](_0x339030))return![];}return!![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ade4f=JSON['parse']('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x49ddc4 of _0x3ade4f){if(!_0x7fa516[_0x48d35c(0x41f)](_0x49ddc4))return![];}return!![];}else{if(_0x3bfb2f['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x274b78=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x904cab of _0x274b78){const _0x2c19a7=DataManager[_0x48d35c(0x421)](_0x904cab);if(!_0x2c19a7)continue;if(!_0x7fa516[_0x48d35c(0x41f)](_0x2c19a7))return![];}return!![];}}if(_0x3bfb2f['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c2d57=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x45ffcb of _0x2c2d57){if(!_0x7fa516['hasSkill'](_0x45ffcb))return![];}return!![];}else{if(_0x3bfb2f['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x40afa7=RegExp['$1']['split'](',');for(const _0x309704 of _0x40afa7){const _0x50a0e1=DataManager[_0x48d35c(0x421)](_0x309704);if(!_0x50a0e1)continue;if(!_0x7fa516[_0x48d35c(0x41f)](_0x50a0e1))return![];}return!![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x203ac5=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x505fb6 of _0x203ac5){if(_0x7fa516[_0x48d35c(0x41f)](_0x505fb6))return!![];}return![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2c3bab=RegExp['$1']['split'](',');for(const _0x25a095 of _0x2c3bab){const _0x58734e=DataManager[_0x48d35c(0x421)](_0x25a095);if(!_0x58734e)continue;if(_0x7fa516[_0x48d35c(0x41f)](_0x58734e))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe171ed=JSON[_0x48d35c(0x29d)]('['+RegExp['$1'][_0x48d35c(0x288)](/\d+/g)+']');for(const _0x4c130f of _0xe171ed){if(!_0x7fa516['hasSkill'](_0x4c130f))return!![];}return![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x482fe9=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x2b1ca1 of _0x482fe9){const _0x27a7d7=DataManager[_0x48d35c(0x421)](_0x2b1ca1);if(!_0x27a7d7)continue;if(!_0x7fa516['hasSkill'](_0x27a7d7))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4fa02c=JSON[_0x48d35c(0x29d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28fc28 of _0x4fa02c){if(!_0x7fa516[_0x48d35c(0x41f)](_0x28fc28))return!![];}return![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x44e52c=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x48131f of _0x44e52c){const _0x255b07=DataManager[_0x48d35c(0x421)](_0x48131f);if(!_0x255b07)continue;if(!_0x7fa516[_0x48d35c(0x41f)](_0x255b07))return!![];}return![];}}if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x651c34=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x164521 of _0x651c34){if(_0x7fa516[_0x48d35c(0x41f)](_0x164521))return![];}return!![];}else{if(_0x3bfb2f[_0x48d35c(0x288)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x501644=RegExp['$1'][_0x48d35c(0x472)](',');for(const _0x409342 of _0x501644){const _0xf93435=DataManager[_0x48d35c(0x421)](_0x409342);if(!_0xf93435)continue;if(_0x7fa516[_0x48d35c(0x41f)](_0xf93435))return![];}return!![];}}return!![];},Window_SkillList[_0x128385(0x38c)]['checkShowHideJS']=function(_0x5853ea){const _0x38045a=_0x128385,_0x26822f=_0x5853ea['note'],_0x15c59f=VisuMZ['SkillsStatesCore']['skillVisibleJS'];return _0x15c59f[_0x5853ea['id']]?_0x15c59f[_0x5853ea['id']][_0x38045a(0x285)](this,_0x5853ea):!![];},VisuMZ[_0x128385(0x41e)]['Window_SkillList_makeItemList']=Window_SkillList[_0x128385(0x38c)][_0x128385(0x2bf)],Window_SkillList[_0x128385(0x38c)][_0x128385(0x2bf)]=function(){const _0x27dae5=_0x128385;VisuMZ[_0x27dae5(0x41e)]['Window_SkillList_makeItemList']['call'](this),this[_0x27dae5(0x372)]()&&this[_0x27dae5(0x407)](),this[_0x27dae5(0x416)]()&&this[_0x27dae5(0x3b1)]();},Window_SkillList[_0x128385(0x38c)][_0x128385(0x372)]=function(){return!![];},Window_SkillList[_0x128385(0x38c)][_0x128385(0x407)]=function(){const _0x5d7bde=_0x128385,_0x4ba4af=VisuMZ['SkillsStatesCore'][_0x5d7bde(0x29e)][_0x5d7bde(0x3eb)][_0x5d7bde(0x3e4)]||[];return _0x4ba4af&&_0x4ba4af[_0x5d7bde(0x467)](this[_0x5d7bde(0x49d)])?this[_0x5d7bde(0x22a)][_0x5d7bde(0x391)]((_0x27d8a5,_0x437acf)=>{const _0x3ca534=_0x5d7bde;if(!!_0x27d8a5&&!!_0x437acf)return _0x27d8a5[_0x3ca534(0x33f)]['localeCompare'](_0x437acf[_0x3ca534(0x33f)]);return 0x0;}):VisuMZ[_0x5d7bde(0x41e)]['SortByIDandPriority'](this[_0x5d7bde(0x22a)]),this[_0x5d7bde(0x22a)];},VisuMZ[_0x128385(0x41e)][_0x128385(0x1f8)]=function(_0x3c88ee){const _0x2d226a=_0x128385;return _0x3c88ee[_0x2d226a(0x391)]((_0x1b6cce,_0xdaeb4e)=>{const _0x430753=_0x2d226a;if(!!_0x1b6cce&&!!_0xdaeb4e){if(_0x1b6cce[_0x430753(0x4a8)]===undefined)VisuMZ[_0x430753(0x41e)][_0x430753(0x3f1)](_0x1b6cce);if(_0xdaeb4e[_0x430753(0x4a8)]===undefined)VisuMZ[_0x430753(0x41e)][_0x430753(0x3f1)](_0xdaeb4e);const _0x30d5b6=_0x1b6cce[_0x430753(0x4a8)],_0x5b89f7=_0xdaeb4e['sortPriority'];if(_0x30d5b6!==_0x5b89f7)return _0x5b89f7-_0x30d5b6;return _0x1b6cce['id']-_0xdaeb4e['id'];}return 0x0;}),_0x3c88ee;},VisuMZ[_0x128385(0x41e)][_0x128385(0x487)]=function(_0x7f63aa){const _0x42baa3=_0x128385;return _0x7f63aa[_0x42baa3(0x391)]((_0x9ab00c,_0x1b3d6f)=>{const _0x58b6f2=_0x42baa3,_0x563e42=$dataSkills[_0x9ab00c],_0x206754=$dataSkills[_0x1b3d6f];if(!!_0x563e42&&!!_0x206754){if(_0x563e42[_0x58b6f2(0x4a8)]===undefined)VisuMZ[_0x58b6f2(0x41e)][_0x58b6f2(0x3f1)](_0x563e42);if(_0x206754[_0x58b6f2(0x4a8)]===undefined)VisuMZ[_0x58b6f2(0x41e)][_0x58b6f2(0x3f1)](_0x206754);const _0x242847=_0x563e42[_0x58b6f2(0x4a8)],_0x5fcc7b=_0x206754[_0x58b6f2(0x4a8)];if(_0x242847!==_0x5fcc7b)return _0x5fcc7b-_0x242847;return _0x9ab00c-_0x1b3d6f;}return 0x0;}),_0x7f63aa;},Window_SkillList['prototype'][_0x128385(0x416)]=function(){const _0x3a4db2=_0x128385;if(!this['_actor'])return![];if([_0x3a4db2(0x1c3),_0x3a4db2(0x35b),_0x3a4db2(0x3fb)]['includes'](this['_stypeId']))return![];return!![];},Window_SkillList[_0x128385(0x38c)]['changeSkillsThroughStateEffects']=function(){const _0x13325c=_0x128385,_0x50d4d8=this[_0x13325c(0x4a2)][_0x13325c(0x3a7)]();for(const _0x4b7f68 of _0x50d4d8){const _0x1219bd=DataManager[_0x13325c(0x435)](_0x4b7f68);for(const _0x96e57d in _0x1219bd){const _0x474ead=$dataSkills[Number(_0x96e57d)]||null,_0x1d349d=$dataSkills[Number(_0x1219bd[_0x96e57d])]||null;while(this[_0x13325c(0x22a)][_0x13325c(0x467)](_0x474ead)){const _0x46b802=this[_0x13325c(0x22a)][_0x13325c(0x2b4)](_0x474ead);this[_0x13325c(0x22a)][_0x46b802]=_0x1d349d;}}}},VisuMZ[_0x128385(0x41e)][_0x128385(0x19b)]=Window_SkillList[_0x128385(0x38c)][_0x128385(0x36e)],Window_SkillList[_0x128385(0x38c)][_0x128385(0x36e)]=function(_0x44e104){const _0x218253=_0x128385,_0x4e99f0=this[_0x218253(0x1e1)](_0x44e104),_0x4a4de9=_0x4e99f0?_0x4e99f0[_0x218253(0x33f)]:'';if(_0x4e99f0)this[_0x218253(0x379)](_0x4e99f0);DataManager['isToggleSkill'](_0x4e99f0)&&this['_actor']&&this['_actor'][_0x218253(0x33a)](_0x4e99f0)&&(this['_toggleSkillColor']=!![]);VisuMZ['SkillsStatesCore'][_0x218253(0x19b)][_0x218253(0x285)](this,_0x44e104),this[_0x218253(0x3e5)]=undefined;if(_0x4e99f0)_0x4e99f0[_0x218253(0x33f)]=_0x4a4de9;},Window_SkillList['prototype'][_0x128385(0x379)]=function(_0x329126){const _0x4d47b9=_0x128385;if(_0x329126&&_0x329126['note'][_0x4d47b9(0x288)](/<LIST NAME:[ ](.*)>/i)){_0x329126['name']=String(RegExp['$1'])['trim']();for(;;){if(_0x329126['name'][_0x4d47b9(0x288)](/\\V\[(\d+)\]/gi))_0x329126[_0x4d47b9(0x33f)]=_0x329126[_0x4d47b9(0x33f)]['replace'](/\\V\[(\d+)\]/gi,(_0x1a1e1b,_0x17013d)=>$gameVariables['value'](parseInt(_0x17013d)));else break;}}},Window_SkillList[_0x128385(0x38c)][_0x128385(0x202)]=function(_0x416ddf,_0x11902c,_0x58c1ca,_0xd85ac4){const _0x59f90d=_0x128385;Window_Base[_0x59f90d(0x38c)][_0x59f90d(0x202)][_0x59f90d(0x285)](this,this[_0x59f90d(0x4a2)],_0x416ddf,_0x11902c,_0x58c1ca,_0xd85ac4);},Window_SkillList[_0x128385(0x38c)][_0x128385(0x493)]=function(_0x16dd5e){const _0x25f018=_0x128385;this['_statusWindow']=_0x16dd5e,this[_0x25f018(0x23a)]();},VisuMZ[_0x128385(0x41e)]['Window_SkillList_updateHelp']=Window_SkillList[_0x128385(0x38c)][_0x128385(0x490)],Window_SkillList[_0x128385(0x38c)]['updateHelp']=function(){const _0x40019b=_0x128385;VisuMZ[_0x40019b(0x41e)][_0x40019b(0x387)][_0x40019b(0x285)](this),this[_0x40019b(0x265)]&&this[_0x40019b(0x265)][_0x40019b(0x3ca)]===Window_ShopStatus&&this[_0x40019b(0x265)][_0x40019b(0x369)](this[_0x40019b(0x235)]());};function _0x24a9(){const _0x3fb2ad=['addPassiveStatesByPluginParameters','MAXMP','\x5cFS[22]\x5cC[8][OFF]','LearnedMatrix','_lastStatesActionEndFrameCount','standardIconWidth','eraseState','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','resetTextColor','setActor','itemWindowRectSkillsStatesCore','removeStatesAuto','uiHelpPosition','adjustSkillCost','onExpireBuff','IconStypeNorm','TurnEndOnMap','StateTurnsEnemyChangeBy','slipHp','MAT','getStateOriginByKey','Class-%1-%2','statusWindowRect','Game_Unit_isAllDead','meetsSkillConditionsEnableJS','clearStateDisplay','createSkillCostText','isDebuffAffected','getColorDataFromPluginParameters','totalStateCategoryAffected','FieldSkills','_skillTypeWindow','helpWindowRect','_stypeIDs','meetsPassiveStateGlobalConditionJS','isSkillHidden','stateMaximumTurns','_cache_getAuraPassiveStatesFromObj','Sprite_Gauge_redraw','removeStatesByDamage','onAddStateJS','CoreEngine','LabelFontMainType','ToggleOffAnimationID','setStateDisplay','drawActorStateData','JSON','Game_BattlerBase_meetsSkillConditions','isBottomHelpMode','shopStatusWidth','isSkillToggled','toggleExclusionGroups','test','EnemyIndex','currentClass','name','ItemConcoctSkills','isMaxDebuffAffected','_cache_getPassiveStateConditionSwitchData','addBuff','setupSkillsStatesCore','slipMp','Game_BattlerBase_initMembers','CheckBypassRemoveStatesByDamage','heal','CheckVisibleSwitchNotetags','executeHpDamage','isEnemy','VisuMZ_3_ActiveChainSkills','Game_Player_refresh','onEraseBuffGlobalJS','drawItemStyleIcon','onAddBuff','Actor-%1-%2','ShowShopStatus','rgba(0,\x200,\x200,\x200)','Game_BattlerBase_states','createShopStatusWindow','_checkingPassiveStates','checkSkillConditionsSwitchNotetags','traitsSet','Game_Troop_setup','gainHp','equipBattleSkills','initMembersSkillsStatesCore','onAddBuffGlobalJS','applyStateTurnManipulationEffects','_bypassRemoveStateDamage_value','ColorNeutral','_skillWindow','front','_battler','slice','paySkillCost','addState','isStateExpired','note','setItem','Game_BattlerBase_increaseBuff','textSizeEx','convertTargetToStateOriginKey','reset','drawItem','meetsPassiveStateConditionSwitches','isAllDead','CmdTextAlign','canSortSkillTypeList','ColorPositive','groupDefeat','Game_BattlerBase_clearStates','ToggleOnTextColor','magicSkills','DEF','alterSkillName','getCurrentStateActiveUser','mainFontFace','shopStatusWindowRectSkillsStatesCore','Game_BattlerBase_resetStateCounts','VisuMZ_0_CoreEngine','version','text','updateCommandNameWindow','DataOffsetX','_stateSteps','skillVisibleJS','Parse_Notetags_State_PassiveJS','ShowJS','Window_SkillList_updateHelp','ValueOutlineSolid','width','Game_BattlerBase_isStateResist','_buffTurns','prototype','Window_StatusBase_placeGauge','ARRAYFUNC','Game_BattlerBase_eraseState','action','sort','Scene_Skill_statusWindowRect','Sprite_Gauge_gaugeRate','description','_skillToggle','%1%','EvoMatrixSkills','rgba(0,\x200,\x200,\x201)','isStateAddable','Param','clear','MeetsAuraStateConditions','parameters','stateTurns','stateCategoriesResisted','getStateOrigin','Sprite_StateIcon_loadBitmap','calcWindowHeight','Item-%1-%2','VisuMZ_3_ItemAmplifySkills','RefreshCacheVar','user','states','placeExactGauge','setBuffTurns','_shopStatusWindow','multiClass','miasmaStateIDs','_prevPassiveJsCounter','isPassiveStateStackable','#%1','Costs','changeSkillsThroughStateEffects','setDebuffTurns','isStateCategoryAffected','MaxTurns','stateHpSlipDamageJS','createItemWindow','allowCreateShopStatusWindow','isSceneBattle','changeOutlineColor','onExpireBuffGlobalJS','SkillID','replace','Window_SkillList_includes','Window_Base_drawText','TurnOffsetX','_cache_getPassiveStateConditionClassesData','_stateIDs','Parse_Notetags_State_Category','LayoutStyle','valueFontFace','skillTypeWindowRectSkillsStatesCore','_stored_state-%1-color','skills','subject','slipTp','constructor','isBuffExpired','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_stored_buffColor','removeStatesByCategory','Game_BattlerBase_skillTpCost','debuffColor','buffColor','FUNC','isRightInputMode','decreaseBuff','ParseStateNotetags','drawIcon','currentValueSkillsStatesCore','_stored_debuffColor','isStateRemoved','gainMp','onChange','setStateTurns','itemWindowRect','614700JgUOHC','concat','_skillChangesFromState','setSkillToggle','Parse_Notetags_Skill_JS','commandStyleCheck','SortSkillTypesAbc','_toggleSkillColor','PassiveStates','frameCount','onEraseBuffJS','addPassiveStatesTraitSets','_stateDisplay','Skills','_cache_isToggleSkill','Game_Actor_learnSkill','MatchLabelGaugeColor','146307mJsPGT','push','Parse_Notetags_Skill_Sorting','iconIndex','Window_SkillStatus_refresh','Game_BattlerBase_traitsSet','GaugeDrawJS','isSkillTypeMatchForUse','isSkill','skillTypes','Turns','_skillIDs','equipPassives','deathStateId','itemLineRect','VisuMZ_1_ItemsEquipsCore','Sprite_StateIcon_updateFrame','mainAreaHeight','initMembers','KnownListRange','outlineColor','mpCost','getCurrentStateOriginKey','4855445RISvNb','sortSkillList','meetsPassiveStateConditionJS','statesByCategory','addBuffTurns','_categoryWindow','commandNameWindowCenter','isBuffOrDebuffAffected','ceil','_scene','PassiveConditionJS','_prevPassiveJsResults','Toggles','ParseAllNotetags','clearStateRetainType','_currentTroopUniqueID','canChangeSkillsThroughStateEffects','enemyId','innerWidth','Game_Action_applyItemUserEffect','members','tpCost','BattleManager_endAction','HiddenSkillTypes','SkillsStatesCore','hasSkill','isValid','getSkillIdWithName','skillCostSeparator','isUseModernControls','getStateRetainType','shift','ParseSkillNotetags','checkSkillConditionsNotetags','createTurnDisplaySprite','_classIDs','commandNameWindowDrawBackground','log','Toggle','VisuMZ_4_SkillContainers','friendsUnit','greater','prepareResetStateCounts','ARRAYJSON','passiveStates','applyDebuffTurnManipulationEffects','valueOutlineColor','getSkillChangesFromState','StateID','_cache_getPassiveStatesFromObj','EVAL','MAXHP','MeetsAuraNoteConditions','ToggleOffLocation','AGI','Scene_Boot_onDatabaseLoaded','animationId','onEraseDebuff','_stateRetainType','setStateRetainType','iconHeight','onDatabaseLoaded','icon','applyItemUserEffect','Game_Battler_addState','currentExt','toUpperCase','deadMembers','getStateData','Game_Battler_isStateAddable','drawActorBuffRates','Name','Game_Battler_addDebuff','windowPadding','multiclasses','Scene_Battle_onSelectAction','_turnDisplaySprite','_colorCache','anySwitchOff','valueOutlineWidth','process_VisuMZ_SkillsStatesCore_State_Notetags','currentDisplayedValue','passiveStateIDs','Enemy-%1-%2','onRegenerateCustomStateDamageOverTime','untitled','ColorBuff','boxWidth','isConfused','ATK','addDebuff','canClearState','getPassiveStateConditionSwitchData','isAppeared','updateStateTurns','createCommandNameWindow','SkillContainers','includes','getSkillTypes','normalColor','ARRAYSTR','Actor','trim','addDebuffTurns','%1-%2-%3','meetsSkillConditions','getColor','skill','split','onAddDebuffGlobalJS','isStateCategoryResisted','updatedLayoutStyle','recover\x20all','labelColor','removeOtherStatesOfSameCategory','onEraseStateGlobalJS','updateStatesActionEnd','toLowerCase','labelFontFace','DataOffsetY','allSwitchOn','makeCurrentTroopUniqueID','_subject','<troop-%1>','FieldSkill','debuffTurns','keys','Sprite_Gauge_setup','ReapplyRules','SortByIDandPriorityUsingIDs','_actorCommandWindow','VisuMZ_3_ItemConcoctSkills','isAutoBattle','applySkillsStatesCoreEffects','stateId','process_VisuMZ_SkillsStatesCore_Notetags','StateTurnsActorChangeTo','onExpireStateGlobalJS','updateHelp','PresetLabelGaugeColor','activate','setStatusWindow','index','height','skillMpCost','Game_Switches_onChange','createAllSkillCostText','StackDebuffMax','stateEraseJS','onSkillToggle','Game_Actor_forgetSkill','_stypeId','\x5cFS[22]\x5cC[0][ON]','enemy','addCommand','_bypassRemoveStateDamage_user','_actor','BattleHiddenSkillTypes','isSkillUsableForAutoBattle','onAddStateMakeCustomSlipValues','_skills','numberFontFace','sortPriority','getStateIdWithName','filter','_stateData','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','value','makeCommandName','resetStateCounts','resetFontSettings','GaugeCurrentJS','statusWindowRectSkillsStatesCore','_hidden','isMaxBuffAffected','ANY','getAuraPassiveStatesFromObj','getStateReapplyRulings','bitmap','gradientFillRect','applyBuffTurnManipulationEffects','Game_Battler_onBattleEnd','buffIconIndex','gaugeColor1','createPassiveStatesCache','createKeyJS','commandStyle','allBattleMembers','Window_SkillList_drawItem','stateTpSlipDamageJS','testSkillStatesCoreNotetags','ValueOutlineWidth','number','isLearnedSkill','NUM','TurnOffsetY','includesSkillsStatesCore','onExpireBuffJS','addPassiveStatesFromOtherPlugins','fontBold','itemTextAlign','ParseSkillChangessIntoData','addChild','\x5cI[%1]%2','_prevPassiveJsFrameCount','toggleOff','stateMpSlipDamageJS','ConvertParams','currentMaxValue','Window_Base_changeTextColor','_result','registerCommand','categories','CheckIncompatibleStates','playEquip','makeAdditionalSkillCostText','randomInt','RegExp','AutoAddState','Armor-%1-%2','Game_BattlerBase_refresh','labelOutlineColor','onEraseDebuffGlobalJS','menuActor','chanceByDamage','drawActorIconsAllTurnCounters','commandName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','skillLearn','Game_BattlerBase_recoverAll','refreshAllMembers','active','ForceList','isPlaytest','stateExpireJS','Sprite_Gauge_initMembers','success','auto','status','autoRemovalTiming','actor','_stateOrigin','Game_BattlerBase_meetsSkillConditions_Toggle','hide','getCurrentTroopUniqueID','%1\x20%2\x20%3','overwriteBuffTurns','_cache','innerHeight','gaugeBackColor','statusWidth','STRUCT','fillRect','VisuMZ_1_ElementStatusCore','onExpireState','_cache_CheckBypassRemoveStatesByDamage','testApply','getClassIdWithName','itemAt','ValueFontMainType','setStateOrigin','drawExtendedParameter','VisuMZ_3_EvoMatrixSkills','Scene_Skill_itemWindowRect','CanPayJS','GroupDigits','SkillActorPaySkillCost','MeetsAuraObjConditions','process_VisuMZ_SkillsStatesCore_CheckForAuras','removeByDamage','checkSkillTypeMatch','CanConcoct','drawText','getPassiveStatesFromObj','onEraseStateJS','clearAllStateOrigins','isUserBypassRemoveStatesByDamage','none','Scene_Battle_onSkillOk_Toggle','Scene_Skill_createItemWindow','clearStateData','SortByIDandPriority','currentMaxValueSkillsStatesCore','right','NEGATIVE','skillTpCost','ARRAYEVAL','addStateTurns','DataFontSize','checkShowHideJS','_buffs','drawSkillCost','Sprite_Gauge_currentMaxValue','AvailableChainSkill','buttonAssistText1','meetsPassiveStateConditionClasses','Game_BattlerBase_buffIconIndex','round','mainFontSize','_endingBattle','buffLength','Game_Action_executeHpDamage_bypassStateDmgRemoval','removeStatesByCategoryAll','ToggleOn','Parse_Notetags_State_SlipEffectJS','regenerateAll','endAction','Game_Action_isValid','isGroupDefeatStateAffected','isStateResist','stateAddJS','applyStateCategoryRemovalEffects','CalcJS','onAddBuffJS','maxCols','actions','skillEnableJS','_tempBattler','[ON]','stateData','increaseBuff','CheckVisibleBattleNotetags','meetsStateCondition','makeResistedStateCategories','ActiveChainSkills','_commandNameWindow','addPassiveStates','makeSuccess','onSelectAction','textColor','currentValue','_data','length','totalStateCategory','LUK','retrieveStateColor','ActionEndUpdate','onBattleEnd','ALL','state','format','actorId','item','Game_BattlerBase_addNewState','50361pJPKmi','setPassiveStateSlipDamageJS','StateTurnsActorChangeBy','callUpdateHelp','passiveStateObjects','learnSkill','drawFullGauge','_currentActor','_stateTurns','MDF','AURA_SYSTEM_ENABLED','SkillMenuStatusRect','target','Enemy','Game_Battler_regenerateAll','convertPassiveStates','onRemoveState','buffTurns','singleSkill','meetsSkillConditionsGlobalJS','hasState','ShowTurns','_stateMaxTurns','AvailableMatrix','drawItemStyleIconText','paramBuffRate','floor','Skill-%1-%2','forgetSkill','die','Game_BattlerBase_skillMpCost','iconWidth','labelFontSize','Gauge','removeState','onEraseStateCustomJS','Game_BattlerBase_decreaseBuff','updateTurnDisplaySprite','getPassiveStateConditionClassesData','Window_StatusBase_drawActorIcons','priority','redrawSkillsStatesCore','Parse_Notetags_State_ApplyRemoveLeaveJS','VisuMZ_3_InputComboSkills','death','onExpireStateCustomJS','_statusWindow','SkillConditionJS','stateTpSlipHealJS','_cache_toggleExclusionGroups','Game_BattlerBase_overwriteBuffTurns','scrollTo','map','_states','isDead','onExpireDebuff','auraStateIDs','Game_Action_testApply','traitObjects','_itemWindow','clearStates','standardIconHeight','Game_Variables_onChange','Sprite_Gauge_currentValue','canUse','CheckVisibleSkillNotetags','ToggleOff','exit','inBattle','isSkillCostShown','allIcons','drawActorIcons','_passiveStateResults','mainCommandWidth','statePassiveConditionJS','back','refresh','Game_BattlerBase_eraseBuff','call','Scene_Skill_skillTypeWindowRect','anchor','match','recalculateSlipDamageJS','onAddState','_checkingTraitsSetSkillsStatesCore','TextJS','helpAreaHeight','maxItems','MatchLabelColor','checkCacheKey','regenerateAllSkillsStatesCore','isToggleSkill','isStateRestrict','onEraseBuff','ItemThrowSkills','Window_Base_createAllSkillCostText_Toggle','stateMpSlipHealJS','_bypassRemoveStateDamage_action','stateHpSlipHealJS','clearStatesWithStateRetain','6ARCBcE','Window_SkillType_initialize','parse','Settings','mainAreaTop','Game_Actor_skillTypes','stateColor','EnableLayout','11558968mPFovn','Game_BattlerBase_die','center','allSwitchOff','removeBuffsAuto','commandNameWindowDrawText','Scene_Skill_helpWindowRect','aliveMembers','buff','toggleOffLocation','splice','InputKey','changeTextColor','redraw','attacker','remove','_tempActor','indexOf','mpDamage','addNewState','<enemy-%1>','State-%1-%2','removeBuff','onExpireDebuffGlobalJS','ActorIDs','isStateAffected','drawActorStateTurns','fontSize','makeItemList','setStypeId','ShowData','Game_Battler_addBuff','makeCommandList','changePaintOpacity','checkShowHideNotetags','LabelOutlineWidth','loadBitmap','gaugeRate','Window_SkillList_maxCols','recoverAll','hpDamage','buttonAssistSwitch','skillId','shopStatusWindowRect','drawActorBuffTurns','onSkillOk','isAlive','addWindow','onAddStateGlobalJS','eraseBuff','iconText','add','isUseSkillsStatesCoreUpdatedLayout','onAddDebuff','adjustItemWidthByShopStatus','stepsForTurn','getStypeIdWithName','addPassiveStatesByNotetag','_costSettings','process_VisuMZ_SkillsStatesCore_Skill_Notetags','2472072WsXDIm','ForcedMatrix','PayJS','helpWindowRectSkillsStatesCore','initialize','valueFontSize','anySwitchOn','gaugeLineHeight','updateFrame','contents','isBuffAffected','opponentsUnit','skillTypeWindowRect','ignore','bypassRemoveStatesByDamage','isTargetBypassRemoveStatesByDamage','drawParamText','uiInputPosition','labelOutlineWidth','drawTextEx','SkillSceneAdjustSkillList','onItemOk','Game_Unit_deadMembers','Buffs','getStateDisplay','setStateData','meetsPassiveStateConditions','3233945KMlsIS','some','hasToggleSkillAntiCheck','getAuraPassiveStateIDs','clamp','drawExtendedSkillsStatesCoreStatus','LearnedChainSkill','ARRAYNUM','onExpireStateJS','isActor','DisplayedParams','max','_checkingVisuMzPassiveStateObjects','States'];_0x24a9=function(){return _0x3fb2ad;};return _0x24a9();}