//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.26;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.26] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
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
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 *   - Common Event must use Plugin Command "Scene: Common Event Return" at the
 *     end of the event.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 * 
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *     - Items CANNOT add themselves!
 *     - ie. Item #8 must not give Item #8.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *     - Items CANNOT add themselves!
 *     - ie. Item 'Super Potion' must not give Item 'Super Potion'.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 * 
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
 *   - Code used to determine the dimensions for this window.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.26: May 18, 2026
 * * Documentation Update!
 * ** Added extra clarity for <Once Craft Common Event: id> notetag:
 * *** Common Event must use Plugin Command "Scene: Common Event Return" at the
 *     end of the event.
 * 
 * Version 1.25: October 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility checks for shop batches to make sure they
 *    don't give out free items. Fix made by Arisu.
 * 
 * Version 1.24: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a name masking bug that would result in a crash. Fix made by Arisu.
 * 
 * Version 1.23: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Message Core's text language settings.
 *    Update made by Arisu.
 * 
 * Version 1.22: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Added extra clarity to <Craft Batch>
 * *** Items CANNOT add themselves!
 * *** ie. Item 'Super Potion' must not give Item 'Super Potion'.
 * * Feature Update!
 * ** Add fail safes to prevent items from having batch entries add themselves.
 *    Added by Arisu.
 * 
 * Version 1.21: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Items and Equips Core features!
 * 
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with related non-crafting
 *    scenes. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
 * 
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
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
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
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
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x56ce6f=_0x4429;(function(_0x48df3a,_0x477475){const _0x27cbd5=_0x4429,_0x2aa0d1=_0x48df3a();while(!![]){try{const _0x464e49=-parseInt(_0x27cbd5(0x317))/0x1+-parseInt(_0x27cbd5(0x28c))/0x2+parseInt(_0x27cbd5(0x32b))/0x3*(-parseInt(_0x27cbd5(0x1c8))/0x4)+parseInt(_0x27cbd5(0x20a))/0x5*(parseInt(_0x27cbd5(0x1d0))/0x6)+parseInt(_0x27cbd5(0x310))/0x7*(parseInt(_0x27cbd5(0x2e9))/0x8)+-parseInt(_0x27cbd5(0x21e))/0x9*(parseInt(_0x27cbd5(0x2d3))/0xa)+parseInt(_0x27cbd5(0x116))/0xb;if(_0x464e49===_0x477475)break;else _0x2aa0d1['push'](_0x2aa0d1['shift']());}catch(_0x4fae4e){_0x2aa0d1['push'](_0x2aa0d1['shift']());}}}(_0x303f,0xc1b32));var label=_0x56ce6f(0x263),tier=tier||0x0,dependencies=[_0x56ce6f(0x270)],pluginData=$plugins[_0x56ce6f(0x16c)](function(_0x8ace44){const _0x1f72dd=_0x56ce6f;return _0x8ace44[_0x1f72dd(0x21d)]&&_0x8ace44[_0x1f72dd(0x2c0)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x56ce6f(0x2c2)]=VisuMZ[label][_0x56ce6f(0x2c2)]||{},VisuMZ[_0x56ce6f(0x2ff)]=function(_0xdc7bfb,_0x5144b5){const _0x1fc176=_0x56ce6f;for(const _0x2dcc4d in _0x5144b5){if(_0x2dcc4d['match'](/(.*):(.*)/i)){const _0x2db3b4=String(RegExp['$1']),_0x3efc88=String(RegExp['$2'])['toUpperCase']()[_0x1fc176(0x1cd)]();let _0x28b116,_0x317909,_0x762f2;switch(_0x3efc88){case _0x1fc176(0x26e):_0x28b116=_0x5144b5[_0x2dcc4d]!==''?Number(_0x5144b5[_0x2dcc4d]):0x0;break;case _0x1fc176(0x2a9):_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909['map'](_0xaa8bf4=>Number(_0xaa8bf4));break;case _0x1fc176(0x27c):_0x28b116=_0x5144b5[_0x2dcc4d]!==''?eval(_0x5144b5[_0x2dcc4d]):null;break;case _0x1fc176(0x313):_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909[_0x1fc176(0x155)](_0x5093b7=>eval(_0x5093b7));break;case'JSON':_0x28b116=_0x5144b5[_0x2dcc4d]!==''?JSON['parse'](_0x5144b5[_0x2dcc4d]):'';break;case'ARRAYJSON':_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909['map'](_0x199387=>JSON[_0x1fc176(0x2cd)](_0x199387));break;case _0x1fc176(0x2d9):_0x28b116=_0x5144b5[_0x2dcc4d]!==''?new Function(JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d])):new Function('return\x200');break;case _0x1fc176(0x17a):_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909['map'](_0x50a0d1=>new Function(JSON['parse'](_0x50a0d1)));break;case _0x1fc176(0x1ce):_0x28b116=_0x5144b5[_0x2dcc4d]!==''?String(_0x5144b5[_0x2dcc4d]):'';break;case _0x1fc176(0x178):_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909[_0x1fc176(0x155)](_0x176353=>String(_0x176353));break;case _0x1fc176(0x320):_0x762f2=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):{},_0x28b116=VisuMZ[_0x1fc176(0x2ff)]({},_0x762f2);break;case _0x1fc176(0x14c):_0x317909=_0x5144b5[_0x2dcc4d]!==''?JSON[_0x1fc176(0x2cd)](_0x5144b5[_0x2dcc4d]):[],_0x28b116=_0x317909['map'](_0x529289=>VisuMZ[_0x1fc176(0x2ff)]({},JSON['parse'](_0x529289)));break;default:continue;}_0xdc7bfb[_0x2db3b4]=_0x28b116;}}return _0xdc7bfb;},(_0x24c143=>{const _0x1d90d5=_0x56ce6f,_0x1ef877=_0x24c143[_0x1d90d5(0x1d7)];for(const _0x9ce0df of dependencies){if(!Imported[_0x9ce0df]){alert(_0x1d90d5(0x305)[_0x1d90d5(0x132)](_0x1ef877,_0x9ce0df)),SceneManager['exit']();break;}}const _0x69ebef=_0x24c143[_0x1d90d5(0x2c0)];if(_0x69ebef[_0x1d90d5(0x13b)](/\[Version[ ](.*?)\]/i)){const _0x5decc1=Number(RegExp['$1']);_0x5decc1!==VisuMZ[label][_0x1d90d5(0x188)]&&(alert(_0x1d90d5(0x1c6)[_0x1d90d5(0x132)](_0x1ef877,_0x5decc1)),SceneManager[_0x1d90d5(0x28b)]());}if(_0x69ebef[_0x1d90d5(0x13b)](/\[Tier[ ](\d+)\]/i)){const _0x5e73e5=Number(RegExp['$1']);_0x5e73e5<tier?(alert(_0x1d90d5(0x252)[_0x1d90d5(0x132)](_0x1ef877,_0x5e73e5,tier)),SceneManager['exit']()):tier=Math['max'](_0x5e73e5,tier);}VisuMZ[_0x1d90d5(0x2ff)](VisuMZ[label][_0x1d90d5(0x2c2)],_0x24c143[_0x1d90d5(0x23c)]);})(pluginData);if(VisuMZ[_0x56ce6f(0x14e)][_0x56ce6f(0x188)]<1.38){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+=_0x56ce6f(0x2c4),alert(text),SceneManager[_0x56ce6f(0x28b)]();}VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x1b1)]=_0x56ce6f(0x27d),PluginManager[_0x56ce6f(0x2a4)](pluginData[_0x56ce6f(0x1d7)],'ItemCraftingSceneOpen',_0x5eb585=>{const _0x651492=_0x56ce6f;if(SceneManager[_0x651492(0x227)]())return;if(SceneManager['isSceneItemCrafting']())return;if($gameSystem[_0x651492(0x301)])return;if(DataManager[_0x651492(0x2ce)]()[_0x651492(0x2f3)]<=0x0){$gameTemp[_0x651492(0x228)]()&&alert(VisuMZ[_0x651492(0x263)][_0x651492(0x1b1)]);return;}SceneManager[_0x651492(0x135)](Scene_ItemCrafting);}),PluginManager[_0x56ce6f(0x2a4)](pluginData[_0x56ce6f(0x1d7)],_0x56ce6f(0x33d),_0x51320d=>{const _0x27acc6=_0x56ce6f;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x27acc6(0x2eb)]())return;if($gameSystem[_0x27acc6(0x301)])return;VisuMZ[_0x27acc6(0x2ff)](_0x51320d,_0x51320d);const _0x418460={'items':_0x51320d[_0x27acc6(0x147)]['map'](_0x391a08=>$dataItems[_0x391a08])[_0x27acc6(0x16c)](_0x560367=>DataManager[_0x27acc6(0x174)]()[_0x27acc6(0x232)](_0x560367)),'weapons':_0x51320d[_0x27acc6(0x144)][_0x27acc6(0x155)](_0x587d1c=>$dataWeapons[_0x587d1c])[_0x27acc6(0x16c)](_0x417187=>DataManager[_0x27acc6(0x2d1)]()[_0x27acc6(0x232)](_0x417187)),'armors':_0x51320d[_0x27acc6(0x12a)][_0x27acc6(0x155)](_0x2ddb66=>$dataArmors[_0x2ddb66])[_0x27acc6(0x16c)](_0x180f83=>DataManager['allCraftableArmors']()['includes'](_0x180f83)),'BypassSwitches':_0x51320d['BypassSwitches'],'BypassMasks':_0x51320d['BypassMasks']};_0x418460[_0x27acc6(0x302)]=_0x418460[_0x27acc6(0x2b4)][_0x27acc6(0x226)](_0x418460[_0x27acc6(0x25f)],_0x418460[_0x27acc6(0x334)]);if(_0x418460['all'][_0x27acc6(0x2f3)]<=0x0){$gameTemp[_0x27acc6(0x228)]()&&alert(VisuMZ[_0x27acc6(0x263)][_0x27acc6(0x1b1)]);return;}$gameTemp[_0x27acc6(0x311)](_0x418460),SceneManager['push'](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x56ce6f(0x1d7)],_0x56ce6f(0x186),_0x54673e=>{const _0x11a138=_0x56ce6f;if(!SceneManager['isSceneMap']())return;if(!$gameSystem[_0x11a138(0x301)])return;$gameSystem['_craftingCommonEventScene']=undefined,SceneManager[_0x11a138(0x135)](Scene_ItemCrafting);}),PluginManager[_0x56ce6f(0x2a4)](pluginData[_0x56ce6f(0x1d7)],_0x56ce6f(0x2a6),_0x5dfafd=>{const _0x1f316b=_0x56ce6f;VisuMZ[_0x1f316b(0x2ff)](_0x5dfafd,_0x5dfafd),$gameSystem['setMainMenuItemCraftingEnabled'](_0x5dfafd[_0x1f316b(0x183)]);}),PluginManager[_0x56ce6f(0x2a4)](pluginData['name'],'SystemShowItemCraftingMenu',_0x2a4620=>{const _0x475d32=_0x56ce6f;VisuMZ[_0x475d32(0x2ff)](_0x2a4620,_0x2a4620),$gameSystem[_0x475d32(0x138)](_0x2a4620[_0x475d32(0x2b2)]);}),VisuMZ[_0x56ce6f(0x263)]['RegExp']={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x281)]=Scene_Boot[_0x56ce6f(0x1db)]['onDatabaseLoaded'],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x1a40ef=_0x56ce6f;VisuMZ[_0x1a40ef(0x263)][_0x1a40ef(0x281)]['call'](this),this[_0x1a40ef(0x26a)]();},Scene_Boot[_0x56ce6f(0x1db)][_0x56ce6f(0x26a)]=function(){const _0x5daeeb=_0x56ce6f;this[_0x5daeeb(0x2e5)]();},Scene_Boot['prototype'][_0x56ce6f(0x2e5)]=function(){const _0x3159ca=_0x56ce6f;if(VisuMZ[_0x3159ca(0x288)])return;const _0x4b74e2=$dataItems[_0x3159ca(0x226)]($dataWeapons,$dataArmors);for(const _0x3abddd of _0x4b74e2){if(!_0x3abddd)continue;VisuMZ['ItemCraftingSys'][_0x3159ca(0x31c)](_0x3abddd);}},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x205)]=VisuMZ[_0x56ce6f(0x205)],VisuMZ[_0x56ce6f(0x205)]=function(_0x23281f){const _0x4b7137=_0x56ce6f;VisuMZ[_0x4b7137(0x263)][_0x4b7137(0x205)][_0x4b7137(0x277)](this,_0x23281f),VisuMZ[_0x4b7137(0x263)][_0x4b7137(0x31c)](_0x23281f);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x23d)]=VisuMZ[_0x56ce6f(0x23d)],VisuMZ['ParseWeaponNotetags']=function(_0x665bd2){const _0x5d3b41=_0x56ce6f;VisuMZ[_0x5d3b41(0x263)]['ParseWeaponNotetags'][_0x5d3b41(0x277)](this,_0x665bd2),VisuMZ['ItemCraftingSys'][_0x5d3b41(0x31c)](_0x665bd2);},VisuMZ[_0x56ce6f(0x263)]['ParseArmorNotetags']=VisuMZ[_0x56ce6f(0x19a)],VisuMZ[_0x56ce6f(0x19a)]=function(_0x5a1c3b){const _0x407d6d=_0x56ce6f;VisuMZ[_0x407d6d(0x263)]['ParseArmorNotetags'][_0x407d6d(0x277)](this,_0x5a1c3b),VisuMZ[_0x407d6d(0x263)][_0x407d6d(0x31c)](_0x5a1c3b);},VisuMZ[_0x56ce6f(0x263)]['Parse_Notetags_CreateJS']=function(_0xf2ce6e){const _0x390d39=_0x56ce6f;_0xf2ce6e['note']['match'](VisuMZ[_0x390d39(0x263)][_0x390d39(0x1b9)][_0x390d39(0x1ba)])&&VisuMZ[_0x390d39(0x263)][_0x390d39(0x11b)](_0xf2ce6e,RegExp['$1']);},VisuMZ[_0x56ce6f(0x263)]['JS']={},VisuMZ[_0x56ce6f(0x263)]['createJS']=function(_0x3badd8,_0x12e97b){const _0x410c24=_0x56ce6f,_0xc80748=_0x410c24(0x1b4)[_0x410c24(0x132)](_0x12e97b),_0x1c2b62=DataManager['createCraftingItemKey'](_0x3badd8);VisuMZ[_0x410c24(0x263)]['JS'][_0x1c2b62]=new Function(_0xc80748);},DataManager['isCraftItemListed']=function(_0x47c43e){const _0x1ef600=_0x56ce6f;if(!_0x47c43e)return![];if(DataManager[_0x1ef600(0x222)](_0x47c43e)[_0x1ef600(0x2f3)]<=0x0)return![];if(_0x47c43e[_0x1ef600(0x143)]['match'](VisuMZ[_0x1ef600(0x263)][_0x1ef600(0x1b9)][_0x1ef600(0x2c9)])){if(!$gameTemp[_0x1ef600(0x2fb)]())return![];}if(!VisuMZ['ItemCraftingSys']['Settings'][_0x1ef600(0x336)]['jsGlobalListing'][_0x1ef600(0x277)](this,_0x47c43e))return![];if(!VisuMZ[_0x1ef600(0x263)][_0x1ef600(0x1b7)](_0x47c43e))return![];if(!VisuMZ[_0x1ef600(0x263)]['CheckAnySwitches'](_0x47c43e))return![];return!![];},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x1b7)]=function(_0x13097a){const _0x6578bf=_0x56ce6f,_0xd4aa92=$gameTemp[_0x6578bf(0x2fb)]();if(_0xd4aa92&&_0xd4aa92['BypassSwitches'])return!![];const _0x209be0=VisuMZ['ItemCraftingSys'][_0x6578bf(0x1b9)][_0x6578bf(0x26d)],_0x2c912b=_0x13097a[_0x6578bf(0x143)][_0x6578bf(0x13b)](_0x209be0);if(_0x2c912b)for(const _0x2a06b4 of _0x2c912b){if(!_0x2a06b4)continue;_0x2a06b4[_0x6578bf(0x13b)](_0x209be0);const _0x5d845d=JSON['parse']('['+RegExp['$1'][_0x6578bf(0x13b)](/\d+/g)+']');for(const _0x21f531 of _0x5d845d){if(!$gameSwitches['value'](_0x21f531))return![];}}return!![];},VisuMZ[_0x56ce6f(0x263)]['CheckAnySwitches']=function(_0x6f63bf){const _0x5c5c60=_0x56ce6f,_0x24c5b7=$gameTemp[_0x5c5c60(0x2fb)]();if(_0x24c5b7&&_0x24c5b7[_0x5c5c60(0x1a8)])return!![];const _0x20a206=VisuMZ[_0x5c5c60(0x263)][_0x5c5c60(0x1b9)][_0x5c5c60(0x280)],_0x1c9016=_0x6f63bf[_0x5c5c60(0x143)]['match'](_0x20a206);if(_0x1c9016){for(const _0x5af3be of _0x1c9016){if(!_0x5af3be)continue;_0x5af3be[_0x5c5c60(0x13b)](_0x20a206);const _0x546f54=JSON[_0x5c5c60(0x2cd)]('['+RegExp['$1'][_0x5c5c60(0x13b)](/\d+/g)+']');for(const _0x4bdd26 of _0x546f54){if($gameSwitches[_0x5c5c60(0x2b8)](_0x4bdd26))return!![];}}return![];}return!![];},DataManager[_0x56ce6f(0x2ce)]=function(){const _0x30eae4=_0x56ce6f,_0x4405ec=$gameTemp[_0x30eae4(0x2fb)]();if(_0x4405ec)return _0x4405ec['all'][_0x30eae4(0x16c)](_0x39cc17=>this[_0x30eae4(0x216)](_0x39cc17));const _0x85126f=this[_0x30eae4(0x16b)](),_0x1232f8=this['craftableWeapons'](),_0x37a03d=this['craftableArmors']();return _0x85126f['concat'](_0x1232f8,_0x37a03d);},DataManager['craftableItems']=function(){const _0x3d500a=_0x56ce6f;let _0x43102e=this['allCraftableItems']()[_0x3d500a(0x16c)](_0x263a44=>this[_0x3d500a(0x216)](_0x263a44));if(VisuMZ[_0x3d500a(0x14e)][_0x3d500a(0x267)])VisuMZ[_0x3d500a(0x14e)][_0x3d500a(0x267)](_0x43102e);return _0x43102e;},DataManager[_0x56ce6f(0x174)]=function(){const _0x25c602=_0x56ce6f;if(this['_allCraftableItems']!==undefined)return this[_0x25c602(0x2fc)];this[_0x25c602(0x2fc)]=[];for(const _0x1fb687 of $dataItems){if(!_0x1fb687)continue;_0x1fb687[_0x25c602(0x143)][_0x25c602(0x13b)](VisuMZ[_0x25c602(0x263)][_0x25c602(0x1b9)][_0x25c602(0x2a5)])&&this[_0x25c602(0x2fc)]['push'](_0x1fb687);}return this[_0x25c602(0x2fc)];},DataManager[_0x56ce6f(0x1c1)]=function(){const _0x4b52e6=_0x56ce6f;let _0x485d68=this[_0x4b52e6(0x2d1)]()[_0x4b52e6(0x16c)](_0x711652=>this[_0x4b52e6(0x216)](_0x711652));if(VisuMZ[_0x4b52e6(0x14e)][_0x4b52e6(0x267)])VisuMZ[_0x4b52e6(0x14e)][_0x4b52e6(0x267)](_0x485d68);return _0x485d68;},DataManager[_0x56ce6f(0x2d1)]=function(){const _0x232369=_0x56ce6f;if(this['_allCraftableWeapons']!==undefined)return this['_allCraftableWeapons'];this[_0x232369(0x159)]=[];for(const _0x2fb6b6 of $dataWeapons){if(!_0x2fb6b6)continue;_0x2fb6b6[_0x232369(0x143)][_0x232369(0x13b)](VisuMZ[_0x232369(0x263)]['RegExp']['Ingredients'])&&this[_0x232369(0x159)][_0x232369(0x135)](_0x2fb6b6);}return this['_allCraftableWeapons'];},DataManager[_0x56ce6f(0x2ef)]=function(){const _0x4f9a26=_0x56ce6f;let _0x18b10f=this['allCraftableArmors']()[_0x4f9a26(0x16c)](_0x39045a=>this['isCraftItemListed'](_0x39045a));if(VisuMZ[_0x4f9a26(0x14e)][_0x4f9a26(0x267)])VisuMZ[_0x4f9a26(0x14e)]['SortByIDandPriority'](_0x18b10f);return _0x18b10f;},DataManager['allCraftableArmors']=function(){const _0x425528=_0x56ce6f;if(this['_allCraftableArmors']!==undefined)return this[_0x425528(0x27f)];this['_allCraftableArmors']=[];for(const _0x4b2fa2 of $dataArmors){if(!_0x4b2fa2)continue;_0x4b2fa2['note'][_0x425528(0x13b)](VisuMZ[_0x425528(0x263)]['RegExp']['Ingredients'])&&this[_0x425528(0x27f)][_0x425528(0x135)](_0x4b2fa2);}return this[_0x425528(0x27f)];},DataManager['getCraftingIngredients']=function(_0x3c845b){const _0x19850e=_0x56ce6f;if(!_0x3c845b)return[];const _0x5b810e=this['createCraftingItemKey'](_0x3c845b);return this[_0x19850e(0x149)]===undefined&&this[_0x19850e(0x241)](),this[_0x19850e(0x149)][_0x5b810e]||[];},DataManager[_0x56ce6f(0x202)]=function(_0x38ab7e){const _0x346e3c=_0x56ce6f;let _0x40680d=_0x346e3c(0x1a4);if(this[_0x346e3c(0x2ec)](_0x38ab7e))return _0x40680d[_0x346e3c(0x132)](_0x346e3c(0x1b8),_0x38ab7e['id']);if(this[_0x346e3c(0x22b)](_0x38ab7e))return _0x40680d[_0x346e3c(0x132)](_0x346e3c(0x16e),_0x38ab7e['id']);if(this[_0x346e3c(0x2f2)](_0x38ab7e))return _0x40680d[_0x346e3c(0x132)](_0x346e3c(0x244),_0x38ab7e['id']);return'';},DataManager[_0x56ce6f(0x241)]=function(){const _0x82762f=_0x56ce6f;this[_0x82762f(0x149)]={};const _0x5e5a0c=$dataItems[_0x82762f(0x226)]($dataWeapons,$dataArmors);for(const _0x575855 of _0x5e5a0c){if(!_0x575855)continue;if(_0x575855[_0x82762f(0x143)][_0x82762f(0x13b)](VisuMZ[_0x82762f(0x263)][_0x82762f(0x1b9)][_0x82762f(0x2a5)])){const _0x48b011=String(RegExp['$1'])[_0x82762f(0x10e)](/[\r\n]+/),_0x255b93=this['parseCraftingIngredientsData'](_0x575855,_0x48b011);if(_0x255b93['length']<=0x0)continue;const _0x59b298=this['createCraftingItemKey'](_0x575855);this['_craftingIngredients'][_0x59b298]=_0x255b93;}}},DataManager[_0x56ce6f(0x2e6)]=function(_0x4ea77f,_0x4e43e8){const _0x56c78b=_0x56ce6f;let _0x19102c=[];for(let _0x51475a of _0x4e43e8){_0x51475a=_0x51475a['trim']();if(_0x51475a[_0x56c78b(0x13b)](/GOLD:[ ](\d+)/i))_0x19102c[_0x56c78b(0x135)]([_0x56c78b(0x218),Number(RegExp['$1'])]);else{if(_0x51475a[_0x56c78b(0x13b)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0xf080d2=String(RegExp['$1'])['trim'](),_0x22c5a5=Number(RegExp['$2'])||0x1,_0x1ce7a8='category:\x20%1'[_0x56c78b(0x132)](_0xf080d2);_0x19102c[_0x56c78b(0x135)]([_0x1ce7a8,_0x22c5a5]);}else{if(_0x51475a['match'](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x1e327a=RegExp['$1'][_0x56c78b(0x242)]()[_0x56c78b(0x1cd)](),_0x4137d3=Number(RegExp['$2'])||0x0,_0x638423=Number(RegExp['$3'])||0x1;let _0x2ed624=null;if([_0x56c78b(0x191),_0x56c78b(0x2b4)][_0x56c78b(0x232)](_0x1e327a))_0x2ed624=$dataItems;if([_0x56c78b(0x1ab),_0x56c78b(0x25f)][_0x56c78b(0x232)](_0x1e327a))_0x2ed624=$dataWeapons;if([_0x56c78b(0x2c8),_0x56c78b(0x334)][_0x56c78b(0x232)](_0x1e327a))_0x2ed624=$dataArmors;this[_0x56c78b(0x2ad)](_0x4ea77f,_0x2ed624,_0x4137d3,_0x19102c)&&_0x19102c[_0x56c78b(0x135)]([_0x2ed624[_0x4137d3],_0x638423]);}else{if(_0x51475a[_0x56c78b(0x13b)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x44d196=RegExp['$1'][_0x56c78b(0x242)]()[_0x56c78b(0x1cd)](),_0x5cb4de=RegExp['$2'][_0x56c78b(0x1cd)](),_0x13c2ab=Number(RegExp['$3'])||0x1;let _0x40d700=null,_0x1645fb=0x0;[_0x56c78b(0x191),_0x56c78b(0x2b4)][_0x56c78b(0x232)](_0x44d196)&&(_0x40d700=$dataItems,_0x1645fb=this[_0x56c78b(0x18e)](_0x5cb4de)),[_0x56c78b(0x1ab),'weapons']['includes'](_0x44d196)&&(_0x40d700=$dataWeapons,_0x1645fb=this[_0x56c78b(0x231)](_0x5cb4de)),['armor',_0x56c78b(0x334)][_0x56c78b(0x232)](_0x44d196)&&(_0x40d700=$dataArmors,_0x1645fb=this[_0x56c78b(0x290)](_0x5cb4de)),this[_0x56c78b(0x2ad)](_0x4ea77f,_0x40d700,_0x1645fb,_0x19102c)&&_0x19102c[_0x56c78b(0x135)]([_0x40d700[_0x1645fb],_0x13c2ab]);}}}}}return _0x19102c;},DataManager['checkItemCraftingResultsValid']=function(_0x5a918e,_0x5c2f77,_0x37a959,_0x228ff1){if(!_0x5c2f77)return![];if(!_0x5c2f77[_0x37a959])return![];const _0x17001f=_0x5c2f77[_0x37a959];if(_0x17001f===_0x5a918e)return![];for(const _0x4bce4c of _0x228ff1){if(!_0x4bce4c)continue;if(_0x4bce4c[0x0]===_0x17001f)return![];}return!![];},DataManager[_0x56ce6f(0x18e)]=function(_0x13856f){const _0x18fa78=_0x56ce6f;_0x13856f=_0x13856f[_0x18fa78(0x118)]()[_0x18fa78(0x1cd)](),this[_0x18fa78(0x195)]=this['_itemIDs']||{};if(this[_0x18fa78(0x195)][_0x13856f])return this[_0x18fa78(0x195)][_0x13856f];for(const _0x1e523c of $dataItems){if(!_0x1e523c)continue;this[_0x18fa78(0x195)][_0x1e523c['name'][_0x18fa78(0x118)]()[_0x18fa78(0x1cd)]()]=_0x1e523c['id'];}return this['_itemIDs'][_0x13856f]||0x0;},DataManager[_0x56ce6f(0x231)]=function(_0x45857c){const _0x244194=_0x56ce6f;_0x45857c=_0x45857c[_0x244194(0x118)]()[_0x244194(0x1cd)](),this['_weaponIDs']=this['_weaponIDs']||{};if(this[_0x244194(0x330)][_0x45857c])return this[_0x244194(0x330)][_0x45857c];for(const _0x181dae of $dataWeapons){if(!_0x181dae)continue;this[_0x244194(0x330)][_0x181dae[_0x244194(0x1d7)][_0x244194(0x118)]()[_0x244194(0x1cd)]()]=_0x181dae['id'];}return this[_0x244194(0x330)][_0x45857c]||0x0;},DataManager['getArmorIdWithName']=function(_0x8dac55){const _0x29a187=_0x56ce6f;_0x8dac55=_0x8dac55['toUpperCase']()[_0x29a187(0x1cd)](),this[_0x29a187(0x133)]=this[_0x29a187(0x133)]||{};if(this[_0x29a187(0x133)][_0x8dac55])return this[_0x29a187(0x133)][_0x8dac55];for(const _0x2b2017 of $dataArmors){if(!_0x2b2017)continue;this['_armorIDs'][_0x2b2017['name'][_0x29a187(0x118)]()[_0x29a187(0x1cd)]()]=_0x2b2017['id'];}return this['_armorIDs'][_0x8dac55]||0x0;},DataManager[_0x56ce6f(0x2db)]=function(_0x4bef24){const _0x40504c=_0x56ce6f;if(!_0x4bef24)return![];if(DataManager[_0x40504c(0x323)](_0x4bef24))return![];if(!VisuMZ[_0x40504c(0x263)][_0x40504c(0x2c2)]['Mask'][_0x40504c(0x183)])return![];DataManager[_0x40504c(0x171)]&&(_0x4bef24=DataManager[_0x40504c(0x171)](_0x4bef24));const _0x2a0ea4=$gameTemp['getCustomItemCraftingSettings']();if(_0x2a0ea4&&_0x2a0ea4['BypassMasks'])return![];if(_0x4bef24[_0x40504c(0x143)][_0x40504c(0x13b)](VisuMZ[_0x40504c(0x263)][_0x40504c(0x1b9)][_0x40504c(0x194)]))return![];return!$gameSystem[_0x40504c(0x2cb)](_0x4bef24);},DataManager[_0x56ce6f(0x323)]=function(_0x586737){const _0x478483=_0x56ce6f;if(!Imported['VisuMZ_3_ShopBatches'])return![];return this[_0x478483(0x32a)](_0x586737)!==null;},DataManager['getCraftBatchItems']=function(_0x5677e9){const _0xd4fc45=_0x56ce6f;if(!_0x5677e9)return null;if(this['isSkill'](_0x5677e9))return null;if(this['isProxyItem'](_0x5677e9))return null;if(!Imported[_0xd4fc45(0x26f)])return null;let _0x286944='';if(DataManager[_0xd4fc45(0x2ec)](_0x5677e9))_0x286944=_0xd4fc45(0x22e)[_0xd4fc45(0x132)](_0x5677e9['id']);else{if(DataManager[_0xd4fc45(0x22b)](_0x5677e9))_0x286944=_0xd4fc45(0x299)['format'](_0x5677e9['id']);else{if(DataManager['isArmor'](_0x5677e9))_0x286944='armor-%1'[_0xd4fc45(0x132)](_0x5677e9['id']);else return null;}}DataManager[_0xd4fc45(0x20f)]=DataManager[_0xd4fc45(0x20f)]||{};if(DataManager[_0xd4fc45(0x20f)][_0x286944]!==undefined)return DataManager[_0xd4fc45(0x20f)][_0x286944];let _0x578401=![],_0x351c53={};const _0x4261cd=VisuMZ[_0xd4fc45(0x263)][_0xd4fc45(0x1b9)],_0x6b9127=_0x5677e9['note']||'';if(_0x6b9127[_0xd4fc45(0x13b)](_0x4261cd[_0xd4fc45(0x152)])){const _0x27d066=String(RegExp['$1'])[_0xd4fc45(0x10e)](/[\r\n]+/)[_0xd4fc45(0x16a)]('');_0x351c53={'items':{},'weapons':{},'armors':{}};for(const _0x270ad4 of _0x27d066){if(_0x270ad4[_0xd4fc45(0x13b)](/ITEM[ ](.*):[ ](\d+)/i)){const _0x4c582a=String(RegExp['$1']),_0xc20bd2=Math[_0xd4fc45(0x213)](0x1,Number(RegExp['$2'])),_0x5edb78=/^\d+$/[_0xd4fc45(0x1a2)](_0x4c582a),_0x1678dd=_0x5edb78?Number(_0x4c582a):this[_0xd4fc45(0x18e)](_0x4c582a);if(DataManager[_0xd4fc45(0x2ec)](_0x5677e9)&&_0x1678dd===_0x5677e9['id']){let _0x14c269='';_0x14c269+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'['format'](_0x5677e9[_0xd4fc45(0x1d7)]),_0x14c269+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x14c269),SceneManager[_0xd4fc45(0x28b)]();}_0x351c53[_0xd4fc45(0x2b4)][_0x1678dd]=_0xc20bd2,_0x578401=!![];}else{if(_0x270ad4[_0xd4fc45(0x13b)](/ITEM[ ](.*)/i)){const _0x5af4e8=String(RegExp['$1']),_0xb731b2=/^\d+$/[_0xd4fc45(0x1a2)](_0x5af4e8),_0x2ab15c=_0xb731b2?Number(_0x5af4e8):this[_0xd4fc45(0x18e)](_0x5af4e8);if(DataManager['isItem'](_0x5677e9)&&_0x2ab15c===_0x5677e9['id']){let _0x5d1d4f='';_0x5d1d4f+=_0xd4fc45(0x15d)[_0xd4fc45(0x132)](_0x5677e9[_0xd4fc45(0x1d7)]),_0x5d1d4f+=_0xd4fc45(0x333),alert(_0x5d1d4f),SceneManager[_0xd4fc45(0x28b)]();}_0x351c53['items'][_0x2ab15c]=0x1,_0x578401=!![];}}if(_0x270ad4['match'](/WEAPON[ ](.*):[ ](\d+)/i)){const _0x598b0a=String(RegExp['$1']),_0x1bd5bf=Math[_0xd4fc45(0x213)](0x1,Number(RegExp['$2'])),_0x5de1ba=/^\d+$/[_0xd4fc45(0x1a2)](_0x598b0a),_0x279ed1=_0x5de1ba?Number(_0x598b0a):this[_0xd4fc45(0x231)](_0x598b0a);if(DataManager[_0xd4fc45(0x22b)](_0x5677e9)&&_0x279ed1===_0x5677e9['id']){let _0x56c709='';_0x56c709+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'[_0xd4fc45(0x132)](_0x5677e9['name']),_0x56c709+=_0xd4fc45(0x333),alert(_0x56c709),SceneManager[_0xd4fc45(0x28b)]();}_0x351c53['weapons'][_0x279ed1]=_0x1bd5bf,_0x578401=!![];}else{if(_0x270ad4[_0xd4fc45(0x13b)](/WEAPON[ ](.*)/i)){const _0x22c057=String(RegExp['$1']),_0x5af7ed=/^\d+$/['test'](_0x22c057),_0x1e0579=_0x5af7ed?Number(_0x22c057):this['getWeaponIdWithName'](_0x22c057);if(DataManager[_0xd4fc45(0x22b)](_0x5677e9)&&_0x1e0579===_0x5677e9['id']){let _0x502399='';_0x502399+=_0xd4fc45(0x15d)[_0xd4fc45(0x132)](_0x5677e9['name']),_0x502399+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x502399),SceneManager['exit']();}_0x351c53['weapons'][_0x1e0579]=0x1,_0x578401=!![];}}if(_0x270ad4['match'](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x149210=String(RegExp['$1']),_0x282e38=Math[_0xd4fc45(0x213)](0x1,Number(RegExp['$2'])),_0x1a747f=/^\d+$/['test'](_0x149210),_0x29443e=_0x1a747f?Number(_0x149210):this[_0xd4fc45(0x290)](_0x149210);if(DataManager[_0xd4fc45(0x2f2)](_0x5677e9)&&_0x29443e===_0x5677e9['id']){let _0x48abb4='';_0x48abb4+=_0xd4fc45(0x15d)['format'](_0x5677e9[_0xd4fc45(0x1d7)]),_0x48abb4+=_0xd4fc45(0x333),alert(_0x48abb4),SceneManager[_0xd4fc45(0x28b)]();}_0x351c53[_0xd4fc45(0x334)][_0x29443e]=_0x282e38,_0x578401=!![];}else{if(_0x270ad4[_0xd4fc45(0x13b)](/ARMOR[ ](.*)/i)){const _0x2dd5b8=String(RegExp['$1']),_0xd0c127=/^\d+$/[_0xd4fc45(0x1a2)](_0x2dd5b8),_0x284626=_0xd0c127?Number(_0x2dd5b8):this['getArmorIdWithName'](_0x2dd5b8);if(DataManager['isArmor'](_0x5677e9)&&_0x284626===_0x5677e9['id']){let _0x328f32='';_0x328f32+=_0xd4fc45(0x15d)[_0xd4fc45(0x132)](_0x5677e9[_0xd4fc45(0x1d7)]),_0x328f32+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x328f32),SceneManager[_0xd4fc45(0x28b)]();}_0x351c53[_0xd4fc45(0x334)][_0x284626]=0x1,_0x578401=!![];}}}}if(!_0x578401)_0x351c53=null;return DataManager[_0xd4fc45(0x20f)][_0x286944]=_0x351c53,DataManager['_cache_getCraftBatchItems'][_0x286944];},ImageManager[_0x56ce6f(0x1c0)]=VisuMZ[_0x56ce6f(0x263)]['Settings'][_0x56ce6f(0x336)][_0x56ce6f(0x2b3)],SoundManager[_0x56ce6f(0x199)]=function(_0x499a0c){const _0x1e3ea8=_0x56ce6f;AudioManager[_0x1e3ea8(0x164)](VisuMZ[_0x1e3ea8(0x263)]['Settings'][_0x1e3ea8(0x29b)]);},TextManager[_0x56ce6f(0x119)]=VisuMZ[_0x56ce6f(0x263)]['Settings'][_0x56ce6f(0x336)][_0x56ce6f(0x157)],TextManager[_0x56ce6f(0x12e)]=VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)]['General'][_0x56ce6f(0x1bf)],TextManager['itemCraftingMask']=VisuMZ[_0x56ce6f(0x263)]['Settings'][_0x56ce6f(0x117)][_0x56ce6f(0x2b6)],TextManager[_0x56ce6f(0x2c3)]=VisuMZ['ItemCraftingSys'][_0x56ce6f(0x2c2)][_0x56ce6f(0x175)][_0x56ce6f(0x162)],TextManager[_0x56ce6f(0x15e)]={'owned':VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)][_0x56ce6f(0x336)]['NumWindowOwned']||_0x56ce6f(0x2ca),'shift':VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)][_0x56ce6f(0x336)][_0x56ce6f(0x18b)]||_0x56ce6f(0x124),'net':VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)][_0x56ce6f(0x336)][_0x56ce6f(0x2e8)]||'Net'},ColorManager[_0x56ce6f(0x184)]=function(_0x5eadd0){const _0x539826=_0x56ce6f;return _0x5eadd0=String(_0x5eadd0),_0x5eadd0[_0x539826(0x13b)](/#(.*)/i)?_0x539826(0x112)[_0x539826(0x132)](String(RegExp['$1'])):this[_0x539826(0x31e)](Number(_0x5eadd0));},SceneManager['isSceneBattle']=function(){const _0xbaff53=_0x56ce6f;return this[_0xbaff53(0x1c5)]&&this[_0xbaff53(0x1c5)]['constructor']===Scene_Battle;},SceneManager[_0x56ce6f(0x2eb)]=function(){const _0x2cc7c2=_0x56ce6f;return this['_scene']&&this[_0x2cc7c2(0x1c5)][_0x2cc7c2(0x306)]===Scene_ItemCrafting;},Game_Temp[_0x56ce6f(0x1db)]['getCustomItemCraftingSettings']=function(){return this['_customItemCraftingSettings'];},Game_Temp['prototype'][_0x56ce6f(0x2f9)]=function(){const _0x2cd48c=_0x56ce6f;this[_0x2cd48c(0x2e7)]=undefined;},Game_Temp[_0x56ce6f(0x1db)][_0x56ce6f(0x311)]=function(_0xb8dd6f){const _0x5c1515=_0x56ce6f;this[_0x5c1515(0x2e7)]=_0xb8dd6f;},VisuMZ['ItemCraftingSys'][_0x56ce6f(0x269)]=Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x19c)],Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x19c)]=function(){const _0x5c12b2=_0x56ce6f;VisuMZ[_0x5c12b2(0x263)]['Game_System_initialize'][_0x5c12b2(0x277)](this),this[_0x5c12b2(0x18f)](),this[_0x5c12b2(0x148)](),this[_0x5c12b2(0x1b3)]();},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x18f)]=function(){const _0x394848=_0x56ce6f;this[_0x394848(0x1f4)]={'shown':VisuMZ[_0x394848(0x263)][_0x394848(0x2c2)][_0x394848(0x175)][_0x394848(0x331)],'enabled':VisuMZ['ItemCraftingSys'][_0x394848(0x2c2)][_0x394848(0x175)][_0x394848(0x165)]};},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x230)]=function(){const _0x6ac0a3=_0x56ce6f;if(this[_0x6ac0a3(0x1f4)]===undefined)this[_0x6ac0a3(0x18f)]();return this['_ItemCrafting_MainMenu'][_0x6ac0a3(0x2d8)];},Game_System[_0x56ce6f(0x1db)]['setMainMenuItemCraftingVisible']=function(_0x31812d){const _0x12bc09=_0x56ce6f;if(this[_0x12bc09(0x1f4)]===undefined)this[_0x12bc09(0x18f)]();this[_0x12bc09(0x1f4)][_0x12bc09(0x2d8)]=_0x31812d;},Game_System[_0x56ce6f(0x1db)]['isMainMenuItemCraftingEnabled']=function(){const _0x224f68=_0x56ce6f;if(this['_ItemCrafting_MainMenu']===undefined)this['initItemCraftingMainMenu']();return this[_0x224f68(0x1f4)]['enabled'];},Game_System['prototype']['setMainMenuItemCraftingEnabled']=function(_0x18f087){const _0x312ce5=_0x56ce6f;if(this[_0x312ce5(0x1f4)]===undefined)this[_0x312ce5(0x18f)]();this[_0x312ce5(0x1f4)][_0x312ce5(0x329)]=_0x18f087;},Game_System['prototype']['initItemCraftingSys']=function(){const _0x56fe39=_0x56ce6f;this[_0x56fe39(0x1a5)]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x2cb)]=function(_0xd2c769){const _0x2091e8=_0x56ce6f;return!!this[_0x2091e8(0x214)](_0xd2c769);},Game_System[_0x56ce6f(0x1db)]['getItemCraftedTimes']=function(_0x34a3c7){const _0x57ac82=_0x56ce6f;if(!_0x34a3c7)return![];if(this[_0x57ac82(0x1a5)]===undefined)this[_0x57ac82(0x148)]();let _0x586150={};if(DataManager[_0x57ac82(0x2ec)](_0x34a3c7))_0x586150=this[_0x57ac82(0x1a5)][_0x57ac82(0x2b4)];if(DataManager[_0x57ac82(0x22b)](_0x34a3c7))_0x586150=this[_0x57ac82(0x1a5)][_0x57ac82(0x25f)];if(DataManager[_0x57ac82(0x2f2)](_0x34a3c7))_0x586150=this[_0x57ac82(0x1a5)][_0x57ac82(0x334)];return _0x586150[_0x34a3c7['id']]||0x0;},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x160)]=function(_0x4f00fb,_0xe93d88){const _0x1b9c88=_0x56ce6f;if(!_0x4f00fb)return![];if(this[_0x1b9c88(0x1a5)]===undefined)this[_0x1b9c88(0x148)]();_0xe93d88=_0xe93d88||0x1;let _0x11c667={};if(DataManager[_0x1b9c88(0x2ec)](_0x4f00fb))_0x11c667=this['_itemsCrafted'][_0x1b9c88(0x2b4)];if(DataManager['isWeapon'](_0x4f00fb))_0x11c667=this['_itemsCrafted'][_0x1b9c88(0x25f)];if(DataManager[_0x1b9c88(0x2f2)](_0x4f00fb))_0x11c667=this[_0x1b9c88(0x1a5)][_0x1b9c88(0x334)];_0x11c667[_0x4f00fb['id']]=_0x11c667[_0x4f00fb['id']]||0x0,_0x11c667[_0x4f00fb['id']]+=_0xe93d88;},Game_System['prototype'][_0x56ce6f(0x1b3)]=function(){const _0x59ac01=_0x56ce6f;this[_0x59ac01(0x17f)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x190)]=function(_0x5f5192){const _0x51cdc6=_0x56ce6f;if(this[_0x51cdc6(0x17f)]===undefined)this[_0x51cdc6(0x1b3)]();let _0x2a802e=[];if(DataManager[_0x51cdc6(0x2ec)](_0x5f5192))_0x2a802e=this[_0x51cdc6(0x17f)][_0x51cdc6(0x2b4)];else{if(DataManager[_0x51cdc6(0x22b)](_0x5f5192))_0x2a802e=this[_0x51cdc6(0x17f)]['weapons'];else DataManager[_0x51cdc6(0x2f2)](_0x5f5192)&&(_0x2a802e=this[_0x51cdc6(0x17f)][_0x51cdc6(0x334)]);}!_0x2a802e['includes'](_0x5f5192['id'])&&_0x2a802e[_0x51cdc6(0x135)](_0x5f5192['id']);},Game_System[_0x56ce6f(0x1db)][_0x56ce6f(0x1f6)]=function(_0x498c5f){const _0x2e629c=_0x56ce6f;if(this[_0x2e629c(0x17f)]===undefined)this[_0x2e629c(0x1b3)]();let _0x1183d2=[];if(DataManager[_0x2e629c(0x2ec)](_0x498c5f))_0x1183d2=this['_craftingEvents'][_0x2e629c(0x2b4)];else{if(DataManager[_0x2e629c(0x22b)](_0x498c5f))_0x1183d2=this[_0x2e629c(0x17f)][_0x2e629c(0x25f)];else DataManager['isArmor'](_0x498c5f)&&(_0x1183d2=this['_craftingEvents'][_0x2e629c(0x334)]);}return _0x1183d2[_0x2e629c(0x232)](_0x498c5f['id']);},VisuMZ[_0x56ce6f(0x263)]['Game_Party_numItems']=Game_Party[_0x56ce6f(0x1db)][_0x56ce6f(0x293)],Game_Party['prototype']['numItems']=function(_0x54a3c4){const _0x304277=_0x56ce6f;if(DataManager[_0x304277(0x323)](_0x54a3c4))return 0x0;return VisuMZ['ItemCraftingSys'][_0x304277(0x315)][_0x304277(0x277)](this,_0x54a3c4);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x10b)]=Game_Party[_0x56ce6f(0x1db)][_0x56ce6f(0x170)],Game_Party['prototype']['gainItem']=function(_0x36e508,_0x32f0fe,_0x421a42){const _0x2f3ae3=_0x56ce6f;DataManager[_0x2f3ae3(0x323)](_0x36e508)&&_0x32f0fe>0x0?this[_0x2f3ae3(0x318)](_0x36e508,_0x32f0fe):VisuMZ[_0x2f3ae3(0x263)]['Game_Party_gainItem'][_0x2f3ae3(0x277)](this,_0x36e508,_0x32f0fe,_0x421a42);},Game_Party[_0x56ce6f(0x1db)][_0x56ce6f(0x318)]=function(_0x41039f,_0x40944a){const _0x447269=_0x56ce6f,_0x58e4c6=DataManager[_0x447269(0x32a)](_0x41039f),_0xe19e6b=['items','weapons','armors'];for(const _0x1e3a28 of _0xe19e6b){const _0x4ec187=_0x58e4c6[_0x1e3a28];for(const _0x3d374d in _0x4ec187){const _0xf819e7=Number(_0x3d374d),_0x3c060b=(_0x4ec187[_0x3d374d]||0x1)*_0x40944a;let _0x16bb60=null;if(_0x1e3a28===_0x447269(0x2b4))_0x16bb60=$dataItems[_0xf819e7];if(_0x1e3a28==='weapons')_0x16bb60=$dataWeapons[_0xf819e7];if(_0x1e3a28===_0x447269(0x334))_0x16bb60=$dataArmors[_0xf819e7];if(DataManager[_0x447269(0x308)](_0x16bb60))continue;_0x16bb60&&(this[_0x447269(0x170)](_0x16bb60,_0x3c060b),![]&&console[_0x447269(0x121)](_0x16bb60[_0x447269(0x1d7)]+'\x20x'+_0x3c060b));}}},Game_Party['prototype'][_0x56ce6f(0x2f7)]=function(_0x27f60d){const _0x4d7aa4=_0x56ce6f,_0x465313=DataManager['getCraftBatchItems'](_0x27f60d),_0x5830cb=[_0x4d7aa4(0x2b4),'weapons','armors'];for(const _0x3165a0 of _0x5830cb){const _0x25ecbd=_0x465313[_0x3165a0];for(const _0x376a29 in _0x25ecbd){const _0x1ea87e=Number(_0x376a29);let _0x26f57f=null;if(_0x3165a0===_0x4d7aa4(0x2b4))_0x26f57f=$dataItems[_0x1ea87e];if(_0x3165a0===_0x4d7aa4(0x25f))_0x26f57f=$dataWeapons[_0x1ea87e];if(_0x3165a0===_0x4d7aa4(0x334))_0x26f57f=$dataArmors[_0x1ea87e];if(DataManager[_0x4d7aa4(0x308)](_0x26f57f))continue;if(_0x26f57f&&!this[_0x4d7aa4(0x1d5)](_0x26f57f))return![];}}return!![];},Game_Party[_0x56ce6f(0x1db)][_0x56ce6f(0x238)]=function(_0x5706a6){const _0xae2fe0=_0x56ce6f;let _0x53202e=0x0;const _0x191943=DataManager[_0xae2fe0(0x32a)](_0x5706a6),_0x2a89a7=[_0xae2fe0(0x2b4),_0xae2fe0(0x25f),_0xae2fe0(0x334)];for(const _0xf58a61 of _0x2a89a7){const _0x1de08a=_0x191943[_0xf58a61];for(const _0x2948c8 in _0x1de08a){const _0x31a0cc=Number(_0x2948c8),_0x551cf5=_0x1de08a[_0x2948c8]||0x1;let _0x202258=null;if(_0xf58a61===_0xae2fe0(0x2b4))_0x202258=$dataItems[_0x31a0cc];if(_0xf58a61===_0xae2fe0(0x25f))_0x202258=$dataWeapons[_0x31a0cc];if(_0xf58a61===_0xae2fe0(0x334))_0x202258=$dataArmors[_0x31a0cc];if(DataManager[_0xae2fe0(0x308)](_0x202258))continue;if(_0x202258){const _0x18e1e9=this[_0xae2fe0(0x1f3)](_0x202258),_0x577c0b=this['numItems'](_0x202258),_0x5bfc51=_0x18e1e9-_0x577c0b;if(_0x5bfc51>0x0){let _0x531e89=_0x5bfc51/_0x551cf5;_0x531e89=Math[_0xae2fe0(0x1d8)](_0x531e89),_0x53202e=Math[_0xae2fe0(0x213)](_0x53202e,_0x531e89);}}}}const _0x28ffde=DataManager[_0xae2fe0(0x222)](_0x5706a6);for(const _0x2fe337 of _0x28ffde){if(!_0x2fe337)continue;let _0x31a0c5=_0x2fe337[0x0];const _0x465f7d=_0x2fe337[0x1];if(_0x31a0c5==='gold'){if($gameParty[_0xae2fe0(0x218)]()<_0x465f7d)return 0x0;let _0x3dad47=Math['floor']($gameParty[_0xae2fe0(0x218)]()/_0x465f7d);_0x53202e=Math[_0xae2fe0(0x20e)](_0x53202e,_0x3dad47);}else{typeof _0x31a0c5==='string'&&_0x31a0c5['match'](/CATEGORY/i)&&(_0x31a0c5=SceneManager[_0xae2fe0(0x1c5)]['_ingredientsList'][categoryIndex],categoryIndex+=0x1);let _0x2cee31=Math['floor']($gameParty[_0xae2fe0(0x293)](_0x31a0c5)/_0x465f7d);_0x53202e=Math[_0xae2fe0(0x20e)](_0x53202e,_0x2cee31);}if(_0x53202e<=0x0)return 0x0;}return _0x53202e;},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x28e)]=Scene_Menu[_0x56ce6f(0x1db)][_0x56ce6f(0x17d)],Scene_Menu['prototype'][_0x56ce6f(0x17d)]=function(){const _0x3f41a3=_0x56ce6f;VisuMZ[_0x3f41a3(0x263)][_0x3f41a3(0x28e)][_0x3f41a3(0x277)](this);const _0xae8f29=this[_0x3f41a3(0x339)];_0xae8f29[_0x3f41a3(0x26b)](_0x3f41a3(0x324),this[_0x3f41a3(0x249)][_0x3f41a3(0x168)](this));},Scene_Menu['prototype'][_0x56ce6f(0x249)]=function(){const _0x1a1588=_0x56ce6f;SceneManager[_0x1a1588(0x135)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x7065e6=_0x56ce6f;this[_0x7065e6(0x19c)](...arguments);}Scene_ItemCrafting[_0x56ce6f(0x1db)]=Object[_0x56ce6f(0x2cc)](Scene_Item[_0x56ce6f(0x1db)]),Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x306)]=Scene_ItemCrafting,Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x19c)]=function(){const _0x110856=_0x56ce6f;Scene_Item['prototype']['initialize'][_0x110856(0x277)](this),$gameSystem[_0x110856(0x301)]=undefined;},Scene_ItemCrafting['prototype']['update']=function(){const _0x383825=_0x56ce6f;Scene_Item[_0x383825(0x1db)][_0x383825(0x13e)][_0x383825(0x277)](this),this['updateCraftingAnimation']();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x2cc)]=function(){const _0x1207a9=_0x56ce6f;Scene_Item[_0x1207a9(0x1db)][_0x1207a9(0x2cc)]['call'](this),this[_0x1207a9(0x1e5)](),this[_0x1207a9(0x30f)](),this[_0x1207a9(0x2d4)](),this[_0x1207a9(0x2be)](),this[_0x1207a9(0x33a)]()&&this['onCategoryOk'](),this[_0x1207a9(0x335)](),this[_0x1207a9(0x314)]();},Scene_ItemCrafting['prototype'][_0x56ce6f(0x335)]=function(){const _0x384cbd=_0x56ce6f,_0xc0e974=VisuMZ[_0x384cbd(0x263)][_0x384cbd(0x2c2)][_0x384cbd(0x25a)];this['_helpWindow']&&this[_0x384cbd(0x2f4)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x29e)]),this['_categoryWindow']&&this[_0x384cbd(0x12c)]['setBackgroundType'](_0xc0e974[_0x384cbd(0x2b0)]),this[_0x384cbd(0x264)]&&this[_0x384cbd(0x264)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x248)]),this['_itemWindow']&&this[_0x384cbd(0x251)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x12d)]),this[_0x384cbd(0x1aa)]&&this['_statusWindow'][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x321)]),this[_0x384cbd(0x109)]&&this[_0x384cbd(0x109)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x1d3)]),this[_0x384cbd(0x1b2)]&&this[_0x384cbd(0x1b2)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x31b)]),this['_numberWindow']&&this[_0x384cbd(0x337)][_0x384cbd(0x13f)](_0xc0e974[_0x384cbd(0x255)]),this[_0x384cbd(0x210)]&&this[_0x384cbd(0x210)]['setBackgroundType'](_0xc0e974[_0x384cbd(0x309)]);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x259)]=function(){const _0x112124=_0x56ce6f;return Scene_Shop[_0x112124(0x1db)]['helpWindowRectItemsEquipsCore'][_0x112124(0x277)](this);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x1e5)]=function(){const _0x9d7985=_0x56ce6f,_0x1d2ba0=this[_0x9d7985(0x1bb)]();this[_0x9d7985(0x264)]=new Window_Gold(_0x1d2ba0),this[_0x9d7985(0x1c4)](this[_0x9d7985(0x264)]);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1bb)]=function(){const _0x5a1237=_0x56ce6f;return Scene_Shop['prototype'][_0x5a1237(0x20b)][_0x5a1237(0x277)](this);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x2f1)]=function(){const _0x143bc7=_0x56ce6f;return Scene_Shop[_0x143bc7(0x1db)]['commandWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['createItemWindow']=function(){const _0x3f2a84=_0x56ce6f;this['createItemWindowBase'](),this['isUseModernControls']()&&this[_0x3f2a84(0x1a3)](),this[_0x3f2a84(0x19b)]()&&(this['createStatusWindow'](),this[_0x3f2a84(0x1c4)](this[_0x3f2a84(0x251)]));},Scene_ItemCrafting['prototype']['createItemWindowBase']=function(){const _0x1698cc=_0x56ce6f,_0x1c6fb0=this['itemWindowRect']();this[_0x1698cc(0x251)]=new Window_ItemCraftingList(_0x1c6fb0),this[_0x1698cc(0x251)][_0x1698cc(0x20d)](this[_0x1698cc(0x2f4)]),this[_0x1698cc(0x251)][_0x1698cc(0x26b)]('ok',this['onItemOk'][_0x1698cc(0x168)](this)),this['_itemWindow'][_0x1698cc(0x26b)](_0x1698cc(0x142),this[_0x1698cc(0x2af)][_0x1698cc(0x168)](this)),this[_0x1698cc(0x1c4)](this['_itemWindow']),this['_categoryWindow'][_0x1698cc(0x1ac)](this[_0x1698cc(0x251)]),!this[_0x1698cc(0x12c)]['needsSelection']()&&(this[_0x1698cc(0x251)]['y']-=this[_0x1698cc(0x12c)][_0x1698cc(0x115)],this['_itemWindow'][_0x1698cc(0x115)]+=this[_0x1698cc(0x12c)][_0x1698cc(0x115)],this[_0x1698cc(0x12c)][_0x1698cc(0x271)](),this[_0x1698cc(0x12c)][_0x1698cc(0x15f)](),this[_0x1698cc(0x13a)]());},Scene_ItemCrafting[_0x56ce6f(0x1db)]['itemWindowRect']=function(){const _0x2ded1a=_0x56ce6f;return this[_0x2ded1a(0x339)]=this[_0x2ded1a(0x12c)],Scene_Shop[_0x2ded1a(0x1db)][_0x2ded1a(0x1f0)][_0x2ded1a(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['statusWindowRect']=function(){const _0x3bc9b3=_0x56ce6f;return Scene_Shop[_0x3bc9b3(0x1db)][_0x3bc9b3(0x2bb)][_0x3bc9b3(0x277)](this);},Scene_ItemCrafting['prototype']['createNumberWindow']=function(){const _0x76e80f=_0x56ce6f,_0x48cc11=this[_0x76e80f(0x291)]();this[_0x76e80f(0x337)]=new Window_ItemCraftingNumber(_0x48cc11),this[_0x76e80f(0x337)][_0x76e80f(0x271)](),this['_numberWindow'][_0x76e80f(0x26b)]('ok',this['onNumberOk']['bind'](this)),this[_0x76e80f(0x337)][_0x76e80f(0x26b)](_0x76e80f(0x142),this[_0x76e80f(0x11c)]['bind'](this)),this[_0x76e80f(0x1c4)](this[_0x76e80f(0x337)]);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x2d4)]=function(){const _0x4678d2=_0x56ce6f,_0x4f4684=this[_0x4678d2(0x2f1)]();this[_0x4678d2(0x109)]=new Window_Selectable(_0x4f4684),this[_0x4678d2(0x109)][_0x4678d2(0x271)](),this[_0x4678d2(0x1c4)](this['_ingredientSelectTitle']);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['createIngredientSelectionList']=function(){const _0x1b21a3=_0x56ce6f,_0x2aff07=this[_0x1b21a3(0x291)](),_0x2e9ac9=new Window_ItemCraftingIngredient(_0x2aff07);_0x2e9ac9[_0x1b21a3(0x271)](),_0x2e9ac9[_0x1b21a3(0x20d)](this[_0x1b21a3(0x2f4)]),_0x2e9ac9[_0x1b21a3(0x1e2)](this[_0x1b21a3(0x1aa)]),_0x2e9ac9[_0x1b21a3(0x26b)]('ok',this[_0x1b21a3(0x2b7)][_0x1b21a3(0x168)](this)),_0x2e9ac9['setHandler']('cancel',this[_0x1b21a3(0x289)][_0x1b21a3(0x168)](this)),this[_0x1b21a3(0x1b2)]=_0x2e9ac9,this[_0x1b21a3(0x1c4)](this['_ingredientSelectList']);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1f1)]=function(){const _0x247b93=_0x56ce6f;return VisuMZ[_0x247b93(0x263)][_0x247b93(0x2c2)][_0x247b93(0x25a)]['EnableCustomLayout'];},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x259)]=function(){const _0x4aee76=_0x56ce6f;return this[_0x4aee76(0x1f1)]()?this['helpWindowRectJS']():Scene_Shop[_0x4aee76(0x1db)]['helpWindowRectItemsEquipsCore'][_0x4aee76(0x277)](this);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x235)]=function(){const _0x56ea18=_0x56ce6f;if(VisuMZ[_0x56ea18(0x263)][_0x56ea18(0x2c2)][_0x56ea18(0x25a)]['HelpWindow_RectJS'])return VisuMZ['ItemCraftingSys'][_0x56ea18(0x2c2)][_0x56ea18(0x25a)]['HelpWindow_RectJS'][_0x56ea18(0x277)](this);const _0x57875b=0x0,_0x1534cf=this[_0x56ea18(0x1c3)](),_0x577135=Graphics[_0x56ea18(0x1ea)],_0x407493=this['helpAreaHeight']();return new Rectangle(_0x57875b,_0x1534cf,_0x577135,_0x407493);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['categoryWindowRect']=function(){const _0x2f60a9=_0x56ce6f;return this[_0x2f60a9(0x1f1)]()?this[_0x2f60a9(0x21b)]():Scene_Shop[_0x2f60a9(0x1db)][_0x2f60a9(0x193)][_0x2f60a9(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x21b)]=function(){const _0xf78a98=_0x56ce6f;if(VisuMZ[_0xf78a98(0x263)]['Settings'][_0xf78a98(0x25a)][_0xf78a98(0x29c)])return VisuMZ['ItemCraftingSys'][_0xf78a98(0x2c2)][_0xf78a98(0x25a)][_0xf78a98(0x29c)]['call'](this);const _0x45b7d1=this['isRightInputMode']()?this[_0xf78a98(0x2c1)]():0x0,_0x360bbb=this[_0xf78a98(0x2e0)](),_0x12f022=Graphics[_0xf78a98(0x1ea)]-this['mainCommandWidth'](),_0x5a58db=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x45b7d1,_0x360bbb,_0x12f022,_0x5a58db);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1bb)]=function(){const _0x471d8d=_0x56ce6f;return this[_0x471d8d(0x1f1)]()?this[_0x471d8d(0x236)]():Scene_Shop[_0x471d8d(0x1db)][_0x471d8d(0x20b)][_0x471d8d(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x236)]=function(){const _0x4f3978=_0x56ce6f;if(VisuMZ['ItemCraftingSys'][_0x4f3978(0x2c2)]['Window']['GoldWindow_RectJS'])return VisuMZ[_0x4f3978(0x263)][_0x4f3978(0x2c2)][_0x4f3978(0x25a)]['GoldWindow_RectJS'][_0x4f3978(0x277)](this);const _0x3a46e5=this[_0x4f3978(0x2c1)](),_0x1907b7=this[_0x4f3978(0x221)](0x1,!![]),_0x32908b=this[_0x4f3978(0x246)]()?0x0:Graphics[_0x4f3978(0x1ea)]-_0x3a46e5,_0x422a5b=this[_0x4f3978(0x2e0)]();return new Rectangle(_0x32908b,_0x422a5b,_0x3a46e5,_0x1907b7);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['itemWindowRect']=function(){const _0x2b414f=_0x56ce6f;return this[_0x2b414f(0x339)]=this[_0x2b414f(0x12c)],this[_0x2b414f(0x1f1)]()?this[_0x2b414f(0x325)]():Scene_Shop[_0x2b414f(0x1db)]['buyWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x325)]=function(){const _0x5be46c=_0x56ce6f;if(VisuMZ[_0x5be46c(0x263)][_0x5be46c(0x2c2)][_0x5be46c(0x25a)][_0x5be46c(0x1b0)])return VisuMZ['ItemCraftingSys']['Settings'][_0x5be46c(0x25a)][_0x5be46c(0x1b0)][_0x5be46c(0x277)](this);const _0x12a96a=this['_commandWindow']['y']+this[_0x5be46c(0x339)][_0x5be46c(0x115)],_0x5e8bdc=Graphics[_0x5be46c(0x1ea)]-this[_0x5be46c(0x22c)](),_0x28ff46=this[_0x5be46c(0x197)]()-this['_commandWindow'][_0x5be46c(0x115)],_0x295b02=this[_0x5be46c(0x246)]()?Graphics[_0x5be46c(0x1ea)]-_0x5e8bdc:0x0;return new Rectangle(_0x295b02,_0x12a96a,_0x5e8bdc,_0x28ff46);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x19b)]=function(){const _0x2d90e0=_0x56ce6f;if(this[_0x2d90e0(0x1f1)]())return!![];return Scene_Item['prototype'][_0x2d90e0(0x19b)][_0x2d90e0(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1df)]=function(){const _0x3061fd=_0x56ce6f;return this[_0x3061fd(0x1f1)]()?this[_0x3061fd(0x29a)]():Scene_Shop[_0x3061fd(0x1db)][_0x3061fd(0x2bb)][_0x3061fd(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x29a)]=function(){const _0x4bb54b=_0x56ce6f;if(VisuMZ[_0x4bb54b(0x263)]['Settings'][_0x4bb54b(0x25a)][_0x4bb54b(0x2e1)])return VisuMZ[_0x4bb54b(0x263)][_0x4bb54b(0x2c2)][_0x4bb54b(0x25a)][_0x4bb54b(0x2e1)][_0x4bb54b(0x277)](this);const _0x484cef=this['statusWidth'](),_0x261815=this[_0x4bb54b(0x197)]()-this[_0x4bb54b(0x339)][_0x4bb54b(0x115)],_0x36de48=this['isRightInputMode']()?0x0:Graphics[_0x4bb54b(0x1ea)]-_0x484cef,_0x34067f=this[_0x4bb54b(0x339)]['y']+this[_0x4bb54b(0x339)][_0x4bb54b(0x115)];return new Rectangle(_0x36de48,_0x34067f,_0x484cef,_0x261815);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x13a)]=function(){const _0xdb940c=_0x56ce6f;this[_0xdb940c(0x251)][_0xdb940c(0x2f6)](),this[_0xdb940c(0x251)][_0xdb940c(0x169)](0x0);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x24e)]=function(){const _0x1916f8=_0x56ce6f;$gameTemp['_bypassProxy']=!![],this[_0x1916f8(0x229)]=this[_0x1916f8(0x251)][_0x1916f8(0x191)](),this[_0x1916f8(0x251)]['hide'](),this['clearUserSelectedIngredients'](),this[_0x1916f8(0x150)]()?this['setupSelectIngredientWindow']():this[_0x1916f8(0x17c)](),$gameTemp[_0x1916f8(0x11a)]=![],this[_0x1916f8(0x229)]=this[_0x1916f8(0x251)][_0x1916f8(0x191)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x17c)]=function(){const _0x4dd153=_0x56ce6f;this[_0x4dd153(0x109)][_0x4dd153(0x271)](),this[_0x4dd153(0x1b2)][_0x4dd153(0x271)](),this[_0x4dd153(0x12c)][_0x4dd153(0x319)](),$gameTemp[_0x4dd153(0x11a)]=!![],this[_0x4dd153(0x337)][_0x4dd153(0x2df)](this[_0x4dd153(0x251)][_0x4dd153(0x191)]()),$gameTemp[_0x4dd153(0x11a)]=![],this[_0x4dd153(0x337)][_0x4dd153(0x319)](),this[_0x4dd153(0x337)][_0x4dd153(0x2f6)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1e7)]=function(){const _0x3d59a9=_0x56ce6f;this['_numberWindow']['hide'](),this[_0x3d59a9(0x109)]['hide'](),this[_0x3d59a9(0x1b2)][_0x3d59a9(0x271)](),this[_0x3d59a9(0x12c)][_0x3d59a9(0x319)](),this[_0x3d59a9(0x251)][_0x3d59a9(0x319)](),this[_0x3d59a9(0x251)][_0x3d59a9(0x2f6)](),this[_0x3d59a9(0x251)][_0x3d59a9(0x24f)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x139)]=function(){const _0x193e0d=_0x56ce6f;VisuMZ[_0x193e0d(0x263)][_0x193e0d(0x2c2)][_0x193e0d(0x2aa)]['ShowAnimations']?this[_0x193e0d(0x250)]():this[_0x193e0d(0x1fe)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x1fe)]=function(){const _0x44b99a=_0x56ce6f;this['_windowLayer']['visible']=!![],this[_0x44b99a(0x126)]=![],this[_0x44b99a(0x2dc)](),this[_0x44b99a(0x2c5)](),this[_0x44b99a(0x29d)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x29d)]=function(){const _0x36fd39=_0x56ce6f;this[_0x36fd39(0x1e8)]()?this[_0x36fd39(0x2bd)]():this[_0x36fd39(0x284)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x284)]=function(){const _0x1d5549=_0x56ce6f;this[_0x1d5549(0x1e7)](),this[_0x1d5549(0x251)][_0x1d5549(0x1f2)](),this[_0x1d5549(0x12c)][_0x1d5549(0x1f2)](),this[_0x1d5549(0x12c)]['refreshCursor'](),this[_0x1d5549(0x12c)][_0x1d5549(0x1e6)](),this['_goldWindow']['refresh'](),this[_0x1d5549(0x251)]['updateHelp']();},Scene_ItemCrafting[_0x56ce6f(0x1db)]['processItemCrafting']=function(){const _0x3e1276=_0x56ce6f;$gameTemp[_0x3e1276(0x11a)]=!![];let _0x197b53=this[_0x3e1276(0x251)][_0x3e1276(0x191)]();$gameTemp[_0x3e1276(0x11a)]=![];const _0x536f39=this[_0x3e1276(0x337)][_0x3e1276(0x286)](),_0x5e1fa5=DataManager[_0x3e1276(0x222)](_0x197b53);let _0xc146ec=0x0;for(const _0x2046ce of _0x5e1fa5){if(!_0x2046ce)continue;let _0x14678b=_0x2046ce[0x0];const _0x4daa02=_0x2046ce[0x1]*_0x536f39;_0x14678b===_0x3e1276(0x218)?$gameParty['loseGold'](_0x4daa02):(typeof _0x14678b===_0x3e1276(0x18d)&&_0x14678b[_0x3e1276(0x13b)](/CATEGORY/i)&&(_0x14678b=this[_0x3e1276(0x2ea)][_0xc146ec],_0xc146ec+=0x1),$gameParty[_0x3e1276(0x27e)](_0x14678b,_0x4daa02,![]));}_0x197b53=this[_0x3e1276(0x251)][_0x3e1276(0x191)](),$gameParty[_0x3e1276(0x170)](_0x197b53,_0x536f39),this[_0x3e1276(0x337)]['number']()>0x0?SoundManager[_0x3e1276(0x199)]():SoundManager[_0x3e1276(0x2b9)](),$gameSystem['registerCraftedItem'](_0x197b53,_0x536f39);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x2c5)]=function(){const _0x4de887=_0x56ce6f,_0x427b8c=this[_0x4de887(0x229)],_0x7f51c1=this[_0x4de887(0x337)][_0x4de887(0x286)]();VisuMZ[_0x4de887(0x263)][_0x4de887(0x1bc)](_0x427b8c,!![]),VisuMZ['ItemCraftingSys']['TurnSwitches'](_0x427b8c,![]),this[_0x4de887(0x32d)]();const _0x2071bd=DataManager[_0x4de887(0x202)](_0x427b8c);VisuMZ[_0x4de887(0x263)]['JS'][_0x2071bd]&&VisuMZ[_0x4de887(0x263)]['JS'][_0x2071bd][_0x4de887(0x277)](this,_0x427b8c,_0x7f51c1),VisuMZ['ItemCraftingSys']['Settings']['General'][_0x4de887(0x1ca)][_0x4de887(0x277)](this,_0x427b8c,_0x7f51c1);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x1bc)]=function(_0x3c867b,_0x380fb6){const _0x4b1914=_0x56ce6f,_0x3da5e9=_0x380fb6?VisuMZ[_0x4b1914(0x263)][_0x4b1914(0x1b9)]['OnSwitches']:VisuMZ[_0x4b1914(0x263)][_0x4b1914(0x1b9)][_0x4b1914(0x146)],_0x4f3aa7=_0x3c867b['note']['match'](_0x3da5e9);if(_0x4f3aa7)for(const _0x56c430 of _0x4f3aa7){if(!_0x56c430)continue;_0x56c430['match'](_0x3da5e9);const _0xd088f0=JSON[_0x4b1914(0x2cd)]('['+RegExp['$1'][_0x4b1914(0x13b)](/\d+/g)+']');for(const _0x15cb9b of _0xd088f0){$gameSwitches[_0x4b1914(0x25b)](_0x15cb9b,_0x380fb6);}}},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x11c)]=function(){const _0x115636=_0x56ce6f;SoundManager['playCancel'](),this[_0x115636(0x289)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x2b7)]=function(){const _0x349777=_0x56ce6f,_0x270f25=this[_0x349777(0x1b2)][_0x349777(0x191)]();this[_0x349777(0x2ea)][this['_ingredientIndex']]=_0x270f25,this['_ingredientIndex']++,this[_0x349777(0x253)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x289)]=function(){const _0x433cd4=_0x56ce6f;this['_ingredientsList'][_0x433cd4(0x1c9)](),this[_0x433cd4(0x198)]--,this[_0x433cd4(0x198)]<0x0?this['activateItemWindow']():this['setupSelectIngredientWindow']();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x282)]=function(){const _0x364e82=_0x56ce6f;this['_ingredientCategories']=[],this[_0x364e82(0x10f)]=[],this[_0x364e82(0x2ea)]=[],this[_0x364e82(0x198)]=0x0;},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x150)]=function(){const _0x4ffb10=_0x56ce6f;if(!this['_item'])return![];const _0x7fbb02=DataManager[_0x4ffb10(0x222)](this[_0x4ffb10(0x229)]);for(const _0x2ae487 of _0x7fbb02){if(!_0x2ae487)continue;const _0x48a0f1=_0x2ae487[0x0];if(!_0x48a0f1)continue;if(typeof _0x48a0f1===_0x4ffb10(0x18d)&&_0x48a0f1['match'](/CATEGORY/i)){_0x48a0f1['match'](/CATEGORY: (.*)/i);const _0x268698=String(RegExp['$1'])[_0x4ffb10(0x1cd)]();this[_0x4ffb10(0x25e)][_0x4ffb10(0x135)](_0x268698),this[_0x4ffb10(0x10f)][_0x4ffb10(0x135)](_0x2ae487[0x1]||0x1);}}return this[_0x4ffb10(0x25e)]['length']>0x0;},Scene_ItemCrafting[_0x56ce6f(0x1db)]['setupSelectIngredientWindow']=function(){const _0x2a66cc=_0x56ce6f;if(this[_0x2a66cc(0x198)]>=this[_0x2a66cc(0x25e)][_0x2a66cc(0x2f3)])return this[_0x2a66cc(0x17c)]();this['_categoryWindow']['hide'](),this[_0x2a66cc(0x337)][_0x2a66cc(0x271)]();const _0x24690c=this[_0x2a66cc(0x25e)][this[_0x2a66cc(0x198)]],_0x5d8e51=this['_ingredientAmounts'][this['_ingredientIndex']];this['_ingredientSelectTitle'][_0x2a66cc(0x319)](),this[_0x2a66cc(0x1b2)][_0x2a66cc(0x319)](),this[_0x2a66cc(0x109)]['contents']['clear']();const _0x592669=VisuMZ['ItemCraftingSys'][_0x2a66cc(0x2c2)][_0x2a66cc(0x336)][_0x2a66cc(0x30b)],_0x531fed=VisuMZ[_0x2a66cc(0x14e)]['Settings'][_0x2a66cc(0x1dd)][_0x2a66cc(0x17b)],_0x41ca25=_0x592669['format'](_0x24690c,_0x531fed[_0x2a66cc(0x132)](_0x5d8e51)),_0x54bed2=this[_0x2a66cc(0x109)][_0x2a66cc(0x327)](0x0);this[_0x2a66cc(0x109)][_0x2a66cc(0x300)](_0x41ca25,_0x54bed2['x'],_0x54bed2['y']),this[_0x2a66cc(0x1b2)]['setup'](_0x24690c,_0x5d8e51);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x11d)]=function(){const _0x5a2e4f=_0x56ce6f;if(this[_0x5a2e4f(0x337)]&&this[_0x5a2e4f(0x337)][_0x5a2e4f(0x123)])return TextManager[_0x5a2e4f(0x204)]('left',_0x5a2e4f(0x243));return Scene_Item['prototype'][_0x5a2e4f(0x11d)][_0x5a2e4f(0x277)](this);},Scene_ItemCrafting['prototype']['buttonAssistKey2']=function(){const _0x28916b=_0x56ce6f;if(this['_numberWindow']&&this[_0x28916b(0x337)][_0x28916b(0x123)])return TextManager[_0x28916b(0x204)]('up',_0x28916b(0x1f5));return Scene_Item['prototype']['buttonAssistKey2'][_0x28916b(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x125)]=function(){const _0xb2826c=_0x56ce6f;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0xb2826c(0x14e)]['Settings'][_0xb2826c(0x1dd)][_0xb2826c(0x16f)];else{if(this[_0xb2826c(0x337)]&&this['_numberWindow'][_0xb2826c(0x123)])return VisuMZ[_0xb2826c(0x14e)]['Settings'][_0xb2826c(0x10a)][_0xb2826c(0x110)];}return Scene_Item[_0xb2826c(0x1db)][_0xb2826c(0x125)][_0xb2826c(0x277)](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['buttonAssistText2']=function(){const _0x544768=_0x56ce6f;if(this[_0x544768(0x337)]&&this[_0x544768(0x337)][_0x544768(0x123)])return VisuMZ['ItemsEquipsCore'][_0x544768(0x2c2)][_0x544768(0x10a)]['buttonAssistLargeIncrement'];return Scene_Item['prototype'][_0x544768(0x28a)]['call'](this);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['buttonAssistText4']=function(){const _0x44259d=_0x56ce6f;return this[_0x44259d(0x337)]&&this[_0x44259d(0x337)][_0x44259d(0x123)]?TextManager[_0x44259d(0x12e)]:Scene_Item[_0x44259d(0x1db)][_0x44259d(0x18a)][_0x44259d(0x277)](this);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x20c)]=function(){const _0x3c7966=_0x56ce6f;Scene_MenuBase[_0x3c7966(0x1db)]['createBackground'][_0x3c7966(0x277)](this),this[_0x3c7966(0x1a7)](this[_0x3c7966(0x273)]()),this['createCustomBackgroundImages']();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x273)]=function(){const _0x388cbc=_0x56ce6f;return VisuMZ[_0x388cbc(0x263)]['Settings'][_0x388cbc(0x2d7)]['SnapshotOpacity'];},Scene_ItemCrafting['prototype'][_0x56ce6f(0x107)]=function(){const _0x24e577=_0x56ce6f,_0x47f4d8={'BgFilename1':VisuMZ['ItemCraftingSys']['Settings']['BgSettings']['BgFilename1'],'BgFilename2':VisuMZ[_0x24e577(0x263)][_0x24e577(0x2c2)]['BgSettings']['BgFilename2']};_0x47f4d8&&(_0x47f4d8[_0x24e577(0x21a)]!==''||_0x47f4d8[_0x24e577(0x137)]!=='')&&(this[_0x24e577(0x2d0)]=new Sprite(ImageManager[_0x24e577(0x141)](_0x47f4d8['BgFilename1'])),this[_0x24e577(0x2ba)]=new Sprite(ImageManager['loadTitle2'](_0x47f4d8[_0x24e577(0x137)])),this['addChild'](this['_backSprite1']),this[_0x24e577(0x316)](this[_0x24e577(0x2ba)]),this['_backSprite1'][_0x24e577(0x21c)][_0x24e577(0x283)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x24e577(0x2ba)][_0x24e577(0x21c)][_0x24e577(0x283)](this['adjustSprite'][_0x24e577(0x168)](this,this[_0x24e577(0x2ba)])));},Scene_ItemCrafting['prototype'][_0x56ce6f(0x298)]=function(_0x418ef0){const _0x23539a=_0x56ce6f;this[_0x23539a(0x24d)](_0x418ef0),this[_0x23539a(0x156)](_0x418ef0);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['startAnimation']=function(){const _0x4caaf5=_0x56ce6f;this[_0x4caaf5(0x126)]=!![],this[_0x4caaf5(0x239)]=0x14,this[_0x4caaf5(0x328)][_0x4caaf5(0x233)]=VisuMZ[_0x4caaf5(0x263)][_0x4caaf5(0x2c2)][_0x4caaf5(0x2aa)][_0x4caaf5(0x1ef)]||![],this['createItemSprite']();},Scene_ItemCrafting['prototype']['createItemSprite']=function(){const _0x30867c=_0x56ce6f;this['_itemSprite']=new Sprite(),this['addChild'](this[_0x30867c(0x322)]),this['setItemSpriteBitmap'](),this[_0x30867c(0x225)](),this[_0x30867c(0x167)](),this[_0x30867c(0x2c7)](),this[_0x30867c(0x15c)](),this[_0x30867c(0x187)](this[_0x30867c(0x27a)][_0x30867c(0x1d1)]());},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x245)]=function(){const _0x1705d6=_0x56ce6f,_0x23b5f3=VisuMZ['ItemCraftingSys'][_0x1705d6(0x1b9)],_0x256170=this['_item'][_0x1705d6(0x143)];this[_0x1705d6(0x2ab)]='';if(_0x256170[_0x1705d6(0x13b)](_0x23b5f3[_0x1705d6(0x1f8)]))this[_0x1705d6(0x2ab)]=String(RegExp['$1']);else _0x256170['match'](_0x23b5f3['bigPicture'])&&(this[_0x1705d6(0x2ab)]=String(RegExp['$1']));this[_0x1705d6(0x28f)]=new Sprite();this[_0x1705d6(0x2ab)]?this['_iconSprite'][_0x1705d6(0x21c)]=ImageManager['loadPicture'](this[_0x1705d6(0x2ab)]):(this[_0x1705d6(0x28f)][_0x1705d6(0x21c)]=ImageManager[_0x1705d6(0x2a0)](_0x1705d6(0x1af)),this[_0x1705d6(0x28f)][_0x1705d6(0x21c)]['smooth']=![]);this[_0x1705d6(0x28f)]['anchor']['x']=0.5,this[_0x1705d6(0x28f)][_0x1705d6(0x200)]['y']=0.5;if(!this[_0x1705d6(0x2ab)]){const _0x3d0224=VisuMZ['ItemCraftingSys'][_0x1705d6(0x2c2)][_0x1705d6(0x2aa)][_0x1705d6(0x15a)]||0x8;this[_0x1705d6(0x28f)][_0x1705d6(0x14a)]['x']=_0x3d0224,this['_iconSprite'][_0x1705d6(0x14a)]['y']=_0x3d0224;}this[_0x1705d6(0x322)]['addChild'](this[_0x1705d6(0x28f)]);},Scene_ItemCrafting['prototype']['setItemSpriteFrame']=function(){const _0x2fee3f=_0x56ce6f;if(this[_0x2fee3f(0x2ab)])return;const _0x45723e=this[_0x2fee3f(0x229)],_0x3430d8=_0x45723e[_0x2fee3f(0x276)],_0x4fcbe5=ImageManager[_0x2fee3f(0x29f)],_0x273ecb=ImageManager[_0x2fee3f(0x33c)],_0x2bbe53=_0x3430d8%0x10*_0x4fcbe5,_0x519f5e=Math[_0x2fee3f(0x173)](_0x3430d8/0x10)*_0x273ecb;this[_0x2fee3f(0x28f)][_0x2fee3f(0x2d2)](_0x2bbe53,_0x519f5e,_0x4fcbe5,_0x273ecb);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['setItemSpritePosition']=function(){const _0x1f5476=_0x56ce6f;this['_itemSprite']['x']=Math[_0x1f5476(0x1b5)](Graphics[_0x1f5476(0x24c)]/0x2);const _0x122586=Math[_0x1f5476(0x1b5)](ImageManager[_0x1f5476(0x33c)]*this[_0x1f5476(0x322)][_0x1f5476(0x14a)]['y']);this[_0x1f5476(0x322)]['y']=Math[_0x1f5476(0x1b5)]((Graphics[_0x1f5476(0x115)]+_0x122586)/0x2);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x2c7)]=function(){const _0x2a9dc7=_0x56ce6f;this[_0x2a9dc7(0x177)]=VisuMZ[_0x2a9dc7(0x263)]['Settings']['Animation']['FadeSpeed']||0x1,this[_0x2a9dc7(0x229)][_0x2a9dc7(0x143)][_0x2a9dc7(0x13b)](VisuMZ[_0x2a9dc7(0x263)][_0x2a9dc7(0x1b9)][_0x2a9dc7(0x108)])&&(this[_0x2a9dc7(0x177)]=Math[_0x2a9dc7(0x213)](Number(RegExp['$1']),0x1)),this['_itemSprite'][_0x2a9dc7(0x17e)]=0x0;},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x15c)]=function(){const _0x1246c9=_0x56ce6f;this[_0x1246c9(0x27a)]=[],this[_0x1246c9(0x229)]['note'][_0x1246c9(0x13b)](VisuMZ[_0x1246c9(0x263)][_0x1246c9(0x1b9)][_0x1246c9(0x1a6)])?this[_0x1246c9(0x27a)]=RegExp['$1'][_0x1246c9(0x10e)](',')[_0x1246c9(0x155)](_0x4a53c3=>Number(_0x4a53c3)):this[_0x1246c9(0x27a)]=this[_0x1246c9(0x27a)]['concat'](VisuMZ[_0x1246c9(0x263)][_0x1246c9(0x2c2)][_0x1246c9(0x2aa)]['Animations']);},Scene_ItemCrafting[_0x56ce6f(0x1db)]['createAnimation']=function(_0x215847){const _0x41871b=_0x56ce6f,_0x4b29d7=$dataAnimations[_0x215847];if(!_0x4b29d7)return;const _0x1da6d4=this[_0x41871b(0x15b)](_0x4b29d7);this[_0x41871b(0x1ff)]=new(_0x1da6d4?Sprite_AnimationMV:Sprite_Animation)();const _0x379d73=[this[_0x41871b(0x322)]],_0x21067e=0x0;this[_0x41871b(0x1ff)][_0x41871b(0x2df)](_0x379d73,_0x4b29d7,![],_0x21067e,null),this['addChild'](this['_animationSprite']);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x15b)]=function(_0xb89954){return!!_0xb89954['frames'];},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x2b5)]=function(){const _0x174158=_0x56ce6f;if(!this[_0x174158(0x126)])return;this[_0x174158(0x211)](),this[_0x174158(0x296)](),this[_0x174158(0x1e9)]()&&this[_0x174158(0x182)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x211)]=function(){const _0x2b4d9b=_0x56ce6f;this[_0x2b4d9b(0x322)][_0x2b4d9b(0x17e)]+=this[_0x2b4d9b(0x177)];},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x296)]=function(){const _0x35f68f=_0x56ce6f;if(!this[_0x35f68f(0x1ff)])return;if(this[_0x35f68f(0x1ff)][_0x35f68f(0x1fd)]())return;this[_0x35f68f(0x2a7)](),this[_0x35f68f(0x187)](this[_0x35f68f(0x27a)][_0x35f68f(0x1d1)]());},Scene_ItemCrafting['prototype'][_0x56ce6f(0x2a7)]=function(){const _0x136743=_0x56ce6f;if(!this[_0x136743(0x1ff)])return;this[_0x136743(0x127)](this['_animationSprite']),this[_0x136743(0x1ff)]['destroy'](),this[_0x136743(0x1ff)]=undefined;},Scene_ItemCrafting[_0x56ce6f(0x1db)]['destroyItemSprite']=function(){const _0xa9f63b=_0x56ce6f;if(!this[_0xa9f63b(0x322)])return;this[_0xa9f63b(0x127)](this['_itemSprite']),this[_0xa9f63b(0x322)][_0xa9f63b(0x1e3)](),this[_0xa9f63b(0x322)]=undefined;},Scene_ItemCrafting[_0x56ce6f(0x1db)]['isFinishedAnimating']=function(){const _0x165507=_0x56ce6f;if(TouchInput['isReleased']())return!![];if(Input[_0x165507(0x206)]('ok'))return!![];if(Input[_0x165507(0x206)](_0x165507(0x142)))return!![];if(this['_itemSprite'][_0x165507(0x17e)]<0xff)return![];if(this[_0x165507(0x1ff)])return![];return this['_animationWait']--<=0x0;},Scene_ItemCrafting['prototype'][_0x56ce6f(0x182)]=function(){const _0x2282a6=_0x56ce6f;this[_0x2282a6(0x2a7)](),this['destroyItemSprite'](),this[_0x2282a6(0x1fe)](),TouchInput[_0x2282a6(0x27b)](),Input[_0x2282a6(0x27b)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x237)]=function(){const _0x2221ac=_0x56ce6f;Scene_Item[_0x2221ac(0x1db)][_0x2221ac(0x237)][_0x2221ac(0x277)](this);if($gameSystem['_craftingCommonEventScene'])return;$gameTemp[_0x2221ac(0x2f9)]();},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x314)]=function(){const _0x2fe116=_0x56ce6f;if(!SceneManager[_0x2fe116(0x2eb)]())return;const _0x4ccdaa=VisuMZ['ItemCraftingSys'][_0x2fe116(0x2c2)][_0x2fe116(0x336)];_0x4ccdaa[_0x2fe116(0x2bc)]&&$gameSwitches[_0x2fe116(0x25b)](_0x4ccdaa[_0x2fe116(0x2bc)],![]);},Scene_ItemCrafting[_0x56ce6f(0x1db)][_0x56ce6f(0x32d)]=function(){const _0x18748c=_0x56ce6f;if(!SceneManager['isSceneItemCrafting']())return;const _0x5d1b48=VisuMZ[_0x18748c(0x263)][_0x18748c(0x2c2)][_0x18748c(0x336)];_0x5d1b48[_0x18748c(0x2bc)]&&$gameSwitches[_0x18748c(0x25b)](_0x5d1b48['SwitchCraft'],!![]);},Scene_ItemCrafting['prototype'][_0x56ce6f(0x1e8)]=function(){const _0x54faf2=_0x56ce6f;if(!Imported[_0x54faf2(0x207)])return![];const _0x54f3bf=this['_item']?this[_0x54faf2(0x229)][_0x54faf2(0x143)]||'':'',_0xbd3978=VisuMZ[_0x54faf2(0x263)][_0x54faf2(0x1b9)];if(_0x54f3bf[_0x54faf2(0x13b)](_0xbd3978['CraftEventOnce'])&&!$gameSystem[_0x54faf2(0x1f6)](this[_0x54faf2(0x229)])&&this['meetsCraftingCommonEventSwitches'](!![]))return!![];else{if(_0x54f3bf[_0x54faf2(0x13b)](_0xbd3978[_0x54faf2(0x272)])&&this[_0x54faf2(0x11f)](![]))return!![];}return![];},Scene_ItemCrafting['prototype']['meetsCraftingCommonEventSwitches']=function(_0x37e4eb){const _0x468d1d=_0x56ce6f,_0x5b4a1b=this[_0x468d1d(0x229)]?this[_0x468d1d(0x229)]['note']:'',_0x27b0dd=VisuMZ[_0x468d1d(0x263)][_0x468d1d(0x1b9)],_0x2ec1bb=_0x37e4eb?_0x468d1d(0x1fb):_0x468d1d(0x1e1);if(_0x5b4a1b[_0x468d1d(0x13b)](_0x27b0dd[_0x2ec1bb+_0x468d1d(0x166)])){const _0x59f5f4=RegExp['$1']['split'](',')[_0x468d1d(0x155)](_0x55d942=>Number(_0x55d942));for(const _0x187a56 of _0x59f5f4){if($gameSwitches['value'](_0x187a56)===![])return![];}}if(_0x5b4a1b[_0x468d1d(0x13b)](_0x27b0dd[_0x2ec1bb+_0x468d1d(0x22d)])){const _0x4a66e7=RegExp['$1']['split'](',')[_0x468d1d(0x155)](_0x5d893c=>Number(_0x5d893c));for(const _0x54aa31 of _0x4a66e7){if($gameSwitches['value'](_0x54aa31)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting['prototype'][_0x56ce6f(0x2bd)]=function(){const _0xc568f7=_0x56ce6f,_0xa99bc7=this['_item']?this[_0xc568f7(0x229)][_0xc568f7(0x143)]:'',_0x4a21a4=VisuMZ[_0xc568f7(0x263)][_0xc568f7(0x1b9)];let _0x30c462=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0xa99bc7[_0xc568f7(0x13b)](_0x4a21a4[_0xc568f7(0x307)])&&!$gameSystem[_0xc568f7(0x1f6)](this[_0xc568f7(0x229)]))_0x30c462=Number(RegExp['$1'])||0x1,$gameSystem[_0xc568f7(0x190)](this[_0xc568f7(0x229)]);else this['meetsCraftingCommonEventSwitches'](![])&&_0xa99bc7[_0xc568f7(0x13b)](_0x4a21a4['CraftEventRepeat'])&&(_0x30c462=Number(RegExp['$1'])||0x1);if(_0x30c462<=0x0){this['returnBackToItemWindow']();return;}$gameSystem[_0xc568f7(0x301)]=!![],$gameTemp['reserveCommonEvent'](_0x30c462),SceneManager[_0xc568f7(0x30d)](Scene_Map);},VisuMZ['ItemCraftingSys'][_0x56ce6f(0x292)]=Window_MenuCommand[_0x56ce6f(0x1db)][_0x56ce6f(0x2de)],Window_MenuCommand['prototype'][_0x56ce6f(0x2de)]=function(){const _0x32e708=_0x56ce6f;VisuMZ['ItemCraftingSys']['Window_MenuCommand_addOriginalCommands'][_0x32e708(0x277)](this),this[_0x32e708(0x234)]();},Window_MenuCommand[_0x56ce6f(0x1db)][_0x56ce6f(0x234)]=function(){const _0x1a9c6d=_0x56ce6f;if(!this['addItemCraftingCommandAutomatically']())return;if(!this[_0x1a9c6d(0x1e0)]())return;const _0x5506c8=TextManager[_0x1a9c6d(0x2c3)],_0x4871bf=this[_0x1a9c6d(0x19d)]();this[_0x1a9c6d(0x1c2)](_0x5506c8,'itemCrafting',_0x4871bf);},Window_MenuCommand[_0x56ce6f(0x1db)][_0x56ce6f(0x14b)]=function(){const _0x47655e=_0x56ce6f;return Imported[_0x47655e(0x285)]?![]:!![];},Window_MenuCommand[_0x56ce6f(0x1db)][_0x56ce6f(0x1e0)]=function(){const _0x209c2c=_0x56ce6f;return $gameSystem[_0x209c2c(0x230)]();},Window_MenuCommand['prototype'][_0x56ce6f(0x19d)]=function(){const _0xba7de=_0x56ce6f;if(DataManager[_0xba7de(0x2ce)]()[_0xba7de(0x2f3)]<=0x0)return![];return $gameSystem['isMainMenuItemCraftingEnabled']();},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2f8)]=Window_ItemCategory['prototype'][_0x56ce6f(0x21f)],Window_ItemCategory['prototype'][_0x56ce6f(0x21f)]=function(){const _0x2de244=_0x56ce6f;if(SceneManager[_0x2de244(0x2eb)]()){this[_0x2de244(0x338)]();if(this[_0x2de244(0x1be)][_0x2de244(0x2f3)]<=0x0){this[_0x2de244(0x26c)](),SceneManager[_0x2de244(0x1c5)]['popScene']();return;}this[_0x2de244(0x326)]();let _0x27254d=this[_0x2de244(0x208)]();if(this[_0x2de244(0x153)]){const _0x78a7a=this[_0x2de244(0x130)](this[_0x2de244(0x153)]);if(_0x78a7a>=0x0)_0x27254d=_0x78a7a;}_0x27254d=_0x27254d>=this['_list'][_0x2de244(0x2f3)]?0x0:_0x27254d,this['select'](_0x27254d);}else VisuMZ[_0x2de244(0x263)][_0x2de244(0x2f8)][_0x2de244(0x277)](this);},Window_ItemCategory['prototype'][_0x56ce6f(0x326)]=function(){const _0x34fa21=_0x56ce6f,_0x1e6e33=Window_ItemCategory['categoryList'],_0x228b37=DataManager['currentCraftableItems']()[_0x34fa21(0x2a3)](),_0x3faf4a=[];for(const _0x10510f of _0x1e6e33){this['_category']=_0x10510f[_0x34fa21(0x136)];for(const _0x327da9 of _0x228b37){Window_ItemList['prototype'][_0x34fa21(0x232)][_0x34fa21(0x277)](this,_0x327da9)&&_0x3faf4a[_0x34fa21(0x135)](_0x327da9);}}this[_0x34fa21(0x185)]=null;for(const _0x4355e6 of _0x3faf4a){_0x228b37['remove'](_0x4355e6);}_0x228b37[_0x34fa21(0x2f3)]>0x0&&this['addUncategorizedItemCategory'](),this[_0x34fa21(0x31f)]=_0x228b37;},Window_ItemCategory[_0x56ce6f(0x1db)]['addUncategorizedItemCategory']=function(){const _0x35e31c=_0x56ce6f,_0x55e2f5=VisuMZ[_0x35e31c(0x263)][_0x35e31c(0x2c2)]['General'];let _0x513fda=_0x55e2f5[_0x35e31c(0x312)]||_0x35e31c(0x312),_0x31f1ed=_0x55e2f5[_0x35e31c(0x254)]||0xa0;_0x513fda=_0x35e31c(0x2ac)[_0x35e31c(0x132)](_0x31f1ed,_0x513fda),this[_0x35e31c(0x1c2)](_0x513fda,_0x35e31c(0x256),!![],_0x35e31c(0x120));},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x23a)]=Window_ItemCategory['prototype'][_0x56ce6f(0x2e4)],Window_ItemCategory[_0x56ce6f(0x1db)][_0x56ce6f(0x2e4)]=function(_0x2db0ae){const _0x1c8905=_0x56ce6f;if(SceneManager[_0x1c8905(0x2eb)]()&&!this['isItemCraftingCategoryValid'](_0x2db0ae))return;VisuMZ[_0x1c8905(0x263)][_0x1c8905(0x23a)][_0x1c8905(0x277)](this,_0x2db0ae);},Window_ItemCategory[_0x56ce6f(0x1db)][_0x56ce6f(0x2fd)]=function(_0x4475ad){const _0x5e8730=_0x56ce6f,_0x27bafb=DataManager['currentCraftableItems'](),_0x423b9f=_0x4475ad[_0x5e8730(0x136)],_0x5cfbda=_0x4475ad[_0x5e8730(0x14d)];this[_0x5e8730(0x185)]=_0x423b9f;for(const _0x4a103d of _0x27bafb){if(!_0x4a103d)continue;if(Window_ItemList['prototype'][_0x5e8730(0x232)][_0x5e8730(0x277)](this,_0x4a103d))return this['_category']=null,!![];}return this[_0x5e8730(0x185)]=null,![];},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x12b)]=Window_ItemCategory['prototype'][_0x56ce6f(0x2ee)],Window_ItemCategory[_0x56ce6f(0x1db)][_0x56ce6f(0x2ee)]=function(){const _0x548c55=_0x56ce6f;if(SceneManager['isSceneItemCrafting']())return!![];return VisuMZ[_0x548c55(0x263)][_0x548c55(0x12b)]['call'](this);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x33b)]=Window_Selectable[_0x56ce6f(0x1db)][_0x56ce6f(0x2f5)],Window_Selectable['prototype']['select']=function(_0x3d8e5b){const _0x4a4d44=_0x56ce6f;VisuMZ[_0x4a4d44(0x263)][_0x4a4d44(0x33b)][_0x4a4d44(0x277)](this,_0x3d8e5b),this[_0x4a4d44(0x306)]===Window_ItemCategory&&SceneManager[_0x4a4d44(0x2eb)]()&&_0x3d8e5b>=0x0&&(this[_0x4a4d44(0x153)]=this[_0x4a4d44(0x2dd)]()||'');};function _0x303f(){const _0x58d8d6=['GoldIcon','IngredientTitle','ReqQuantityFontSize','hasMaxItems','setText','name','ceil','placeButtons','changeTextColor','prototype','drawItem','ItemScene','SelectedColor','statusWindowRect','isItemCraftingCommandVisible','CraftRepeat','setStatusWindow','destroy','setHelpWindowItem','createGoldWindow','callUpdateHelp','activateItemWindow','itemHasCraftCommonEvent','isFinishedAnimating','boxWidth','drawShopBatchContentsTitle','contains','drawShopBatchContentsRemaining','isOkEnabled','ShowWindows','buyWindowRectItemsEquipsCore','isCustomLayout','refresh','maxItems','_ItemCrafting_MainMenu','down','hasCraftingEventOccurred','drawCraftingItemName','craftPicture','drawTotalPrice','SelectedText','CraftOnce','hasCustomWindowSkin','isPlaying','finishAnimation','_animationSprite','anchor','hitIndex','createCraftingItemKey','drawShopBatchContentsItem','getInputMultiButtonStrings','ParseItemNotetags','isTriggered','VisuMZ_2_ShopCommonEvents','index','_max','154005wxmCYq','goldWindowRectItemsEquipsCore','createBackground','setHelpWindow','min','_cache_getCraftBatchItems','_buttonAssistWindow','updateItemSpriteOpacity','_context','max','getItemCraftedTimes','quantityFontSize','isCraftItemListed','_text','gold','applyInverse','BgFilename1','categoryWindowRectJS','bitmap','status','153RJJAdp','makeCommandList','worldTransform','calcWindowHeight','getCraftingIngredients','standardIconWidth','drawCategories','setItemSpriteFrame','concat','isSceneBattle','isPlaytest','_item','maskName','isWeapon','statusWidth','AnySw','item-%1','drawItemBackground','isMainMenuItemCraftingVisible','getWeaponIdWithName','includes','visible','addItemCraftingCommand','helpWindowRectJS','goldWindowRectJS','terminate','calcCraftBatchItemsMax','_animationWait','Window_ItemCategory_addItemCategory','contents','parameters','ParseWeaponNotetags','maxCols','parseLocalizedText','buttonY','createCraftingIngredientsLists','toLowerCase','right','Armor','setItemSpriteBitmap','isRightInputMode','maskItemName','GoldBgType','commandItemCrafting','MaskItalics','_data','width','scaleSprite','onItemOk','updateHelp','startAnimation','_itemWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setupSelectIngredientWindow','NoCategoryIcon','NumberBgType','category','drawIngredientItem','systemColor','helpWindowRect','Window','setValue','net','owned','_ingredientCategories','weapons','drawText','itemPadding','changeOkButtonEnable','ItemCraftingSys','_goldWindow','fontSize','drawCurrencyValue','SortByIDandPriority','textWidth','Game_System_initialize','process_VisuMZ_ItemCraftingSys_Notetags','setHandler','addUncategorizedItemCategory','AllSwitches','NUM','VisuMZ_3_ShopBatches','VisuMZ_1_ItemsEquipsCore','hide','CraftEventRepeat','getBackgroundOpacity','_tooltipWindow','updateTooltipWindow','iconIndex','call','cursorWidth','drawBigItemIcon','_animationIDs','clear','EVAL','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','loseItem','_allCraftableArmors','AnySwitches','Scene_Boot_onDatabaseLoaded','clearUserSelectedIngredients','addLoadListener','returnBackToItemWindow','VisuMZ_1_MainMenuCore','number','drawPicture','ParseAllNotetags','onIngredientListCancel','buttonAssistText2','exit','171134SDXfyh','setClickHandler','Scene_Menu_createCommandWindow','_iconSprite','getArmorIdWithName','itemWindowRect','Window_MenuCommand_addOriginalCommands','numItems','categories','drawGoldIngredient','updateAnimationSprite','drawCraftBatchContents','adjustSprite','weapon-%1','statusWindowRectJS','Sound','CategoryWindow_RectJS','onAnimationFinish','HelpBgType','iconWidth','loadSystem','drawFadedItemBackground','currencyUnit','clone','registerCommand','Ingredients','SystemEnableItemCraftingMenu','destroyAnimationSprite','MaskText','ARRAYNUM','Animation','_craftPicture','\x5cI[%1]%2','checkItemCraftingResultsValid','setItem','onItemCancel','CategoryBgType','baseTextRect','Show','CraftedIcon','items','updateCraftingAnimation','MaskLetter','onIngredientListOk','value','playCancel','_backSprite2','statusWindowRectItemsEquipsCore','SwitchCraft','processCraftCommonEvent','createIngredientSelectionList','allItems','description','mainCommandWidth','Settings','ItemCraftingMenuCommand','in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.','onItemCrafted','_maxIngredientsSize','setItemSpriteOpacity','armor','customCraftingOnly','Owned','isItemCrafted','create','parse','currentCraftableItems','windowskin','_backSprite1','allCraftableWeapons','setFrame','658390rJFksh','createIngredientSelectionTitle','scrollTo','lineHeight','BgSettings','shown','FUNC','itemCraftingMask','isCraftingItemMasked','processItemCrafting','currentExt','addOriginalCommands','setup','mainAreaTop','StatusWindow_RectJS','CategoryIcon','drawItemName','addItemCategory','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','parseCraftingIngredientsData','_customItemCraftingSettings','NumWindowNet','602528WoMNxy','_ingredientsList','isSceneItemCrafting','isItem','createContents','needsSelection','craftableArmors','VisuMZ_0_CoreEngine','categoryWindowRect','isArmor','length','_helpWindow','select','activate','allOfCraftBatchItemsMax','Window_ItemCategory_makeCommandList','clearCustomItemCraftingSettings','resetFontSettings','getCustomItemCraftingSettings','_allCraftableItems','isItemCraftingCategoryValid','imageSmoothingEnabled','ConvertParams','drawTextEx','_craftingCommonEventScene','all','Window_ShopStatus_refresh','drawBigItemImage','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','constructor','CraftEventOnce','isProxyItem','ButtonAssistBgType','Window_ShopStatus_setItem','CategoryTitle','fontItalic','goto','drawIngredientGold','createNumberWindow','7lmFiLc','setCustomItemCraftingSettings','Uncategorized','ARRAYEVAL','resetCraftingSwitches','Game_Party_numItems','addChild','1237476ggyXBm','gainCraftBatchItems','show','\x20=\x20','IngredientList','Parse_Notetags_CreateJS','fillRect','textColor','_nonCategoryItemCraftingItems','STRUCT','StatusBgType','_itemSprite','hasCraftBatchItems','itemCrafting','itemWindowRectJS','createUncategorizedItemCategory','itemLineRect','_windowLayer','enabled','getCraftBatchItems','125781sFswJw','selectedIngredientList','enableCraftingSwitches','determineMax','_number','_weaponIDs','ShowMainMenu','drawIcon','-\x20Items\x20must\x20never\x20give\x20themselves!','armors','setWindowBackgroundTypes','General','_numberWindow','addItemCategories','_commandWindow','isUseModernControls','Window_Selectable_select','iconHeight','CustomItemCraftingSceneOpen','drawMathMarks','createCustomBackgroundImages','opacitySpeed','_ingredientSelectTitle','ShopScene','Game_Party_gainItem','drawCraftedIcon','setTooltipWindowText','split','_ingredientAmounts','buttonAssistSmallIncrement','itemHeight','#%1','setItemForCraftBatchContents','itemNameY','height','44816519DFSjqu','Mask','toUpperCase','itemCraftingIngredientsBridge','_bypassProxy','createJS','onNumberCancel','buttonAssistKey1','drawItemIngredient','meetsCraftingCommonEventSwitches','ItemCraftingNoCategory','log','makeItemList','active','Change','buttonAssistText1','_animationPlaying','removeChild','shouldDrawCraftBatchContents','left','Armors','Window_ItemCategory_needsSelection','_categoryWindow','ListBgType','itemCraftingNumberWindowOk','isEnabled','findExt','ToolTips','format','_armorIDs','drawIngredientCategory','push','Type','BgFilename2','setMainMenuItemCraftingVisible','onNumberOk','onCategoryOk','match','gradientFillRect','maxGold','update','setBackgroundType','blt','loadTitle1','cancel','note','Weapons','drawCraftingIngredients','OffSwitches','Items','initItemCraftingSys','_craftingIngredients','scale','addItemCraftingCommandAutomatically','ARRAYSTRUCT','Icon','ItemsEquipsCore','join','doesItemHaveOpenCategories','innerHeight','CraftBatchWrap','_lastCraftingExt','dimColor2','map','centerSprite','IngredientBridge','visualGoldDisplayAutosize','_allCraftableWeapons','Scale','isMVAnimation','createAnimationIDs','%1\x20has\x20illegal\x20batch\x20contents:\x0a','ItemCraftingNumberWindow','deactivate','registerCraftedItem','dimColor1','Name','_amount','playStaticSe','EnableMainMenu','AllSw','setItemSpritePosition','bind','smoothSelect','remove','craftableItems','filter','CoreEngine','Weapon','buttonAssistCategory','gainItem','getProxyItem','createTooltipWindow','floor','allCraftableItems','MainMenu','_alreadySelected','_itemSpriteOpacitySpeed','ARRAYSTR','center','ARRAYFUNC','ItemQuantityFmt','setupNumberWindow','createCommandWindow','opacity','_craftingEvents','isShowNew','tooltipSkin','processFinishAnimation','Enable','getColor','_category','ReturnToLastCrafting','createAnimation','version','itemAt','buttonAssistText4','NumWindowShift','\x20%1','string','getItemIdWithName','initItemCraftingMainMenu','registerCraftingEvent','item','tooltipFrameCheckRequirements','commandWindowRectItemsEquipsCore','NoMask','_itemIDs','drawTooltipBackground','mainAreaHeight','_ingredientIndex','playItemCrafting','ParseArmorNotetags','allowCreateStatusWindow','initialize','isItemCraftingCommandEnabled','loadWindowskin','\x20+\x20','totalPriceY','drawIngredients','test','postCreateItemWindowModernControls','%1%2','_itemsCrafted','animationIDs','setBackgroundOpacity','BypassSwitches','itemRectWithPadding','_statusWindow','weapon','setItemWindow','drawCraftBatchContentsList','bigPicture','IconSet','ItemWindow_RectJS','WarningMsg','_ingredientSelectList','initItemCraftingEvents','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','round','_categoryIndex','CheckAllSwitches','Item','RegExp','jsOnCraft','goldWindowRect','TurnSwitches','isTouchOkEnabled','_list','CraftAssistButton','itemCraftedIcon','craftableWeapons','addCommand','helpAreaTop','addWindow','_scene','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Gold','96GyiYPl','pop','jsGlobalCraftEffect','selectLast','innerWidth','trim','STR','maskItalics','18nsPgvm','shift'];_0x303f=function(){return _0x58d8d6;};return _0x303f();}function _0x4429(_0x2fd4e7,_0x2329e3){const _0x303ff2=_0x303f();return _0x4429=function(_0x44299c,_0x5ea214){_0x44299c=_0x44299c-0x106;let _0x53fd12=_0x303ff2[_0x44299c];return _0x53fd12;},_0x4429(_0x2fd4e7,_0x2329e3);}function Window_ItemCraftingList(){const _0x3a45ce=_0x56ce6f;this[_0x3a45ce(0x19c)](...arguments);}Window_ItemCraftingList[_0x56ce6f(0x1db)]=Object[_0x56ce6f(0x2cc)](Window_ItemList[_0x56ce6f(0x1db)]),Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x306)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x56ce6f(0x215)]=VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)][_0x56ce6f(0x25a)][_0x56ce6f(0x1d4)],Window_ItemCraftingList[_0x56ce6f(0x1cf)]=VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x2c2)][_0x56ce6f(0x117)][_0x56ce6f(0x24a)],Window_ItemCraftingList['prototype'][_0x56ce6f(0x19c)]=function(_0x39df36){const _0x552f8d=_0x56ce6f;Window_ItemList['prototype'][_0x552f8d(0x19c)][_0x552f8d(0x277)](this,_0x39df36),this[_0x552f8d(0x172)]();},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x23e)]=function(){return 0x1;},Window_ItemCraftingList['prototype'][_0x56ce6f(0x111)]=function(){const _0x24b7b7=_0x56ce6f;return Window_Scrollable[_0x24b7b7(0x1db)]['itemHeight'][_0x24b7b7(0x277)](this)*0x3+0x8;},Window_ItemCraftingList['prototype'][_0x56ce6f(0x12f)]=function(_0x3f7fed){return!![];},Window_ItemCraftingList['prototype'][_0x56ce6f(0x122)]=function(){const _0x48dd33=_0x56ce6f;this[_0x48dd33(0x24b)]=DataManager[_0x48dd33(0x2ce)]()['filter'](_0xac1e67=>this[_0x48dd33(0x232)](_0xac1e67));const _0xb5048e=this[_0x48dd33(0x24b)]['map'](_0x519686=>DataManager[_0x48dd33(0x222)](_0x519686)['length']);this[_0x48dd33(0x2c6)]=Math[_0x48dd33(0x213)](..._0xb5048e)+0x1;},Window_ItemCraftingList['prototype'][_0x56ce6f(0x232)]=function(_0x314d34){const _0x11d728=_0x56ce6f;if(this[_0x11d728(0x185)]===_0x11d728(0x120)){const _0x5887b2=SceneManager[_0x11d728(0x1c5)];if(_0x5887b2&&_0x5887b2[_0x11d728(0x12c)]&&_0x5887b2[_0x11d728(0x12c)][_0x11d728(0x31f)])return _0x5887b2[_0x11d728(0x12c)][_0x11d728(0x31f)][_0x11d728(0x232)](_0x314d34);}return Window_ItemList[_0x11d728(0x1db)][_0x11d728(0x232)]['call'](this,_0x314d34);},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x1cb)]=function(){},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x1dc)]=function(_0x4bf647){const _0x343913=_0x56ce6f,_0x3759dd=this[_0x343913(0x189)](_0x4bf647);if(!_0x3759dd)return;const _0x858613=this['itemRectWithPadding'](_0x4bf647);this[_0x343913(0x2fa)](),this[_0x343913(0x2a1)](_0x858613,0x2),this[_0x343913(0x304)](_0x4bf647,_0x3759dd,_0x858613),this[_0x343913(0x10c)](_0x3759dd,_0x858613),this[_0x343913(0x1f7)](_0x3759dd,_0x858613),this[_0x343913(0x145)](_0x3759dd,_0x858613);},Window_ItemCraftingList[_0x56ce6f(0x1db)]['drawFadedItemBackground']=function(_0x7ee3f0,_0x340f3f){const _0x569d41=_0x56ce6f;_0x340f3f=_0x340f3f||0x1,this['changePaintOpacity'](![]);const _0x23231e=ColorManager[_0x569d41(0x161)](),_0x4709a1=ColorManager[_0x569d41(0x154)](),_0x4f5a99=_0x7ee3f0[_0x569d41(0x24c)]/0x2,_0x57aad2=this[_0x569d41(0x2d6)]();while(_0x340f3f--){this['contents'][_0x569d41(0x13c)](_0x7ee3f0['x'],_0x7ee3f0['y'],_0x4f5a99,_0x57aad2,_0x4709a1,_0x23231e),this[_0x569d41(0x23b)][_0x569d41(0x13c)](_0x7ee3f0['x']+_0x4f5a99,_0x7ee3f0['y'],_0x4f5a99,_0x57aad2,_0x23231e,_0x4709a1);}this['changePaintOpacity'](!![]);},Window_Base[_0x56ce6f(0x1db)][_0x56ce6f(0x1f7)]=function(_0x2af979,_0x19bd7e){const _0xb9cf12=_0x56ce6f;let _0x1f596e=_0x2af979[_0xb9cf12(0x1d7)],_0x22da05=_0x19bd7e[_0xb9cf12(0x115)]+this[_0xb9cf12(0x261)]()*0x2,_0x437f0d=_0x19bd7e['y'],_0x2a0df4=_0x19bd7e[_0xb9cf12(0x24c)]-_0x22da05-this[_0xb9cf12(0x261)]()-ImageManager[_0xb9cf12(0x29f)];DataManager[_0xb9cf12(0x2db)](_0x2af979)&&(_0x1f596e=VisuMZ[_0xb9cf12(0x263)][_0xb9cf12(0x247)](_0x2af979),this[_0xb9cf12(0x23b)][_0xb9cf12(0x30c)]=Window_ItemCraftingList['maskItalics']),this[_0xb9cf12(0x260)](_0x1f596e,_0x22da05,_0x437f0d,_0x2a0df4,_0xb9cf12(0x129)),this[_0xb9cf12(0x23b)][_0xb9cf12(0x30c)]=![];},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x247)]=function(_0x2e696d){const _0x5bd0a9=_0x56ce6f;return DataManager[_0x5bd0a9(0x171)]&&(_0x2e696d=DataManager[_0x5bd0a9(0x171)](_0x2e696d)),_0x2e696d[_0x5bd0a9(0x143)][_0x5bd0a9(0x13b)](VisuMZ[_0x5bd0a9(0x263)][_0x5bd0a9(0x1b9)][_0x5bd0a9(0x2a8)])?String(RegExp['$1']):this[_0x5bd0a9(0x22a)](_0x2e696d['name']);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x22a)]=function(_0x5f519e){const _0x3eace7=_0x56ce6f;return Imported['VisuMZ_1_MessageCore']&&TextManager[_0x3eace7(0x23f)]&&(_0x5f519e=TextManager['parseLocalizedText'](_0x5f519e)),Array(_0x5f519e['length']+0x1)[_0x3eace7(0x14f)](TextManager[_0x3eace7(0x2da)]);},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x304)]=function(_0x440032,_0x2f6ebf,_0x4f4fb9){const _0x1cfdc3=_0x56ce6f,_0x201b60=VisuMZ['ItemCraftingSys'][_0x1cfdc3(0x1b9)],_0x1b363f=_0x2f6ebf['note'];let _0x2345a1='';if(_0x1b363f['match'](_0x201b60['craftPicture']))_0x2345a1=String(RegExp['$1']);else _0x1b363f[_0x1cfdc3(0x13b)](_0x201b60[_0x1cfdc3(0x1ae)])&&(_0x2345a1=String(RegExp['$1']));if(_0x2345a1){const _0x49e76f=ImageManager['loadPicture'](_0x2345a1);_0x49e76f[_0x1cfdc3(0x283)](this[_0x1cfdc3(0x287)][_0x1cfdc3(0x168)](this,_0x440032,_0x49e76f));}else this['drawBigItemIcon'](_0x2f6ebf,_0x4f4fb9);},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x287)]=function(_0x3dbcb5,_0x496cd9){const _0x43fac6=_0x56ce6f,_0x34a546=this[_0x43fac6(0x1a9)](_0x3dbcb5);let _0x536983=_0x34a546['x']+this[_0x43fac6(0x261)](),_0x1ac2e0=_0x34a546['y']+0x4,_0x3461ba=_0x34a546[_0x43fac6(0x24c)]-this[_0x43fac6(0x261)]()*0x2,_0x4e0376=_0x34a546[_0x43fac6(0x115)]-0x8,_0x29f575=Math['min'](_0x3461ba,_0x4e0376);const _0x4e89a7=_0x29f575/_0x496cd9[_0x43fac6(0x24c)],_0x13703e=_0x29f575/_0x496cd9['height'],_0x570c35=Math[_0x43fac6(0x20e)](_0x4e89a7,_0x13703e,0x1);let _0x5d56ba=Math[_0x43fac6(0x1b5)](_0x496cd9[_0x43fac6(0x24c)]*_0x570c35),_0x4f11b2=Math['round'](_0x496cd9['height']*_0x570c35);_0x536983+=Math['round']((_0x29f575-_0x5d56ba)/0x2),_0x1ac2e0+=Math[_0x43fac6(0x1b5)]((_0x29f575-_0x4f11b2)/0x2);const _0x1d6e1a=_0x496cd9['width'],_0x3bd00d=_0x496cd9['height'];this[_0x43fac6(0x23b)][_0x43fac6(0x212)][_0x43fac6(0x2fe)]=!![],this[_0x43fac6(0x23b)][_0x43fac6(0x140)](_0x496cd9,0x0,0x0,_0x1d6e1a,_0x3bd00d,_0x536983,_0x1ac2e0,_0x5d56ba,_0x4f11b2),this[_0x43fac6(0x23b)][_0x43fac6(0x212)][_0x43fac6(0x2fe)]=!![];},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x279)]=function(_0x42eb64,_0x4532e9){const _0x4b7973=_0x56ce6f,_0x2d74ce=_0x42eb64[_0x4b7973(0x276)];let _0x10868b=_0x4532e9['x']+this[_0x4b7973(0x261)](),_0x1b43c3=_0x4532e9['y']+0x4,_0x2cdfc6=_0x4532e9[_0x4b7973(0x24c)]-this[_0x4b7973(0x261)]()*0x2,_0x543f6a=_0x4532e9['height']-0x8,_0xeb3e79=Math[_0x4b7973(0x20e)](_0x2cdfc6,_0x543f6a);_0xeb3e79=Math[_0x4b7973(0x173)](_0xeb3e79/ImageManager[_0x4b7973(0x29f)])*ImageManager[_0x4b7973(0x29f)],_0x1b43c3+=(_0x543f6a-_0xeb3e79)/0x2;const _0x42f610=ImageManager[_0x4b7973(0x2a0)](_0x4b7973(0x1af)),_0x2cc452=ImageManager[_0x4b7973(0x29f)],_0x19801a=ImageManager[_0x4b7973(0x33c)],_0x1abd8d=_0x2d74ce%0x10*_0x2cc452,_0x21bffb=Math[_0x4b7973(0x173)](_0x2d74ce/0x10)*_0x19801a;this['contents'][_0x4b7973(0x212)][_0x4b7973(0x2fe)]=![],this[_0x4b7973(0x23b)][_0x4b7973(0x140)](_0x42f610,_0x1abd8d,_0x21bffb,_0x2cc452,_0x19801a,_0x10868b,_0x1b43c3,_0xeb3e79,_0xeb3e79),this[_0x4b7973(0x23b)][_0x4b7973(0x212)][_0x4b7973(0x2fe)]=!![];},Window_ItemCraftingList[_0x56ce6f(0x1db)]['drawCraftedIcon']=function(_0x46d5b5,_0x136647){const _0x29cc8d=_0x56ce6f;if(!$gameSystem[_0x29cc8d(0x2cb)](_0x46d5b5))return;const _0x33d02b=ImageManager[_0x29cc8d(0x1c0)];let _0x5981a2=_0x136647['x']+_0x136647[_0x29cc8d(0x24c)]-ImageManager[_0x29cc8d(0x29f)],_0x57cd7b=_0x136647['y']+0x2;this[_0x29cc8d(0x332)](_0x33d02b,_0x5981a2,_0x57cd7b);},Window_ItemCraftingList['prototype']['drawCraftingIngredients']=function(_0x57dc9a,_0x515ece){const _0x158b52=_0x56ce6f,_0x23f0fc=DataManager[_0x158b52(0x222)](_0x57dc9a);let _0x53d955=_0x515ece[_0x158b52(0x115)]+this[_0x158b52(0x261)]()*0x2,_0x333a53=_0x515ece['y']+Math[_0x158b52(0x1b5)](this[_0x158b52(0x2d6)]()*1.2),_0x38874b=_0x515ece['width']-_0x53d955-this['itemPadding'](),_0x4afa66=Math[_0x158b52(0x173)](_0x38874b/this[_0x158b52(0x2c6)]),_0x42727f=!![];for(const _0x1d2d55 of _0x23f0fc){if(!_0x42727f){let _0x9916aa=TextManager[_0x158b52(0x119)],_0x9b6cd7=_0x515ece['y']+(_0x515ece['height']-this['lineHeight']()*1.5);this[_0x158b52(0x260)](_0x9916aa,_0x53d955,_0x9b6cd7,_0x4afa66,_0x158b52(0x179));}_0x53d955+=_0x4afa66;const _0x4b0197=_0x1d2d55[0x0],_0x501cb7=_0x1d2d55[0x1],_0x5903df=_0x4b0197===_0x158b52(0x218)?$gameParty['gold']():$gameParty[_0x158b52(0x293)](_0x4b0197);if(_0x4b0197===_0x158b52(0x218))this[_0x158b52(0x30e)](_0x501cb7,_0x5903df,_0x53d955,_0x333a53,_0x4afa66);else typeof _0x4b0197===_0x158b52(0x18d)&&_0x4b0197[_0x158b52(0x13b)](/CATEGORY/i)?this[_0x158b52(0x134)](_0x4b0197,_0x501cb7,_0x53d955,_0x333a53,_0x4afa66):this['drawIngredientItem'](_0x4b0197,_0x501cb7,_0x5903df,_0x53d955,_0x333a53,_0x4afa66);this[_0x158b52(0x2fa)](),_0x42727f=![];}},Window_ItemCraftingList['prototype'][_0x56ce6f(0x30e)]=function(_0x8b05a9,_0x4f0bf1,_0xfb3053,_0x388188,_0xef65ea){const _0x2644d9=_0x56ce6f;if(Imported[_0x2644d9(0x2f0)]){let _0x3d0201=_0xfb3053-Math[_0x2644d9(0x1b5)](ImageManager[_0x2644d9(0x29f)]/0x2),_0x1cc47d=_0x388188+Math[_0x2644d9(0x1b5)]((this[_0x2644d9(0x2d6)]()-ImageManager['iconHeight'])/0x2);const _0x4f9e92=VisuMZ[_0x2644d9(0x16d)]?VisuMZ[_0x2644d9(0x16d)][_0x2644d9(0x2c2)]['Gold'][_0x2644d9(0x1d2)]:0x0;this[_0x2644d9(0x332)](_0x4f9e92,_0x3d0201,_0x1cc47d);}else{let _0x25a9e2=_0xfb3053-Math[_0x2644d9(0x1b5)](_0xef65ea/0x2),_0x36c03b=_0x388188+Math[_0x2644d9(0x1b5)]((this[_0x2644d9(0x2d6)]()-ImageManager[_0x2644d9(0x33c)])/0x2);this[_0x2644d9(0x1da)](ColorManager[_0x2644d9(0x258)]()),this['makeFontBigger'](),this['drawText'](TextManager[_0x2644d9(0x2a2)],_0x25a9e2,_0x36c03b,_0xef65ea,_0x2644d9(0x179)),this[_0x2644d9(0x2fa)]();}let _0xf8430b=_0xfb3053-Math[_0x2644d9(0x1b5)](_0xef65ea/0x2),_0x1b5ae0=_0x388188+this['lineHeight']();const _0x546948=VisuMZ[_0x2644d9(0x14e)][_0x2644d9(0x2c2)][_0x2644d9(0x1dd)][_0x2644d9(0x17b)];let _0x30d931=_0x546948['format'](_0x8b05a9);_0x8b05a9>_0x4f0bf1&&this['changeTextColor'](ColorManager['powerDownColor']()),this['contents'][_0x2644d9(0x265)]=Window_ItemCraftingList[_0x2644d9(0x215)],this[_0x2644d9(0x260)](_0x30d931,_0xf8430b,_0x1b5ae0,_0xef65ea,_0x2644d9(0x179));},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x134)]=function(_0x57803f,_0x2c819e,_0x54f05f,_0x2f2a59,_0x44ef73){const _0x3e05e8=_0x56ce6f,_0xf06d64=VisuMZ[_0x3e05e8(0x263)][_0x3e05e8(0x2c2)][_0x3e05e8(0x336)];let _0x4c766c=_0x54f05f-Math[_0x3e05e8(0x1b5)](ImageManager['iconWidth']/0x2),_0x2c43f7=_0x2f2a59+Math[_0x3e05e8(0x1b5)]((this[_0x3e05e8(0x2d6)]()-ImageManager['iconHeight'])/0x2);this['drawIcon'](_0xf06d64[_0x3e05e8(0x2e2)],_0x4c766c,_0x2c43f7),_0x57803f[_0x3e05e8(0x13b)](/CATEGORY: (.*)/i);const _0x291d1b=String(RegExp['$1'])[_0x3e05e8(0x1cd)]();let _0x24c9b1=_0x54f05f-Math['round'](_0x44ef73/0x2),_0xdfeee8=_0x2f2a59;this['contents'][_0x3e05e8(0x265)]=Window_ItemCraftingList[_0x3e05e8(0x215)],this['drawText'](_0x291d1b,_0x24c9b1,_0xdfeee8,_0x44ef73,'center');let _0x3fb4fd=_0x54f05f-Math['round'](_0x44ef73/0x2),_0x248070=_0x2f2a59+this[_0x3e05e8(0x2d6)]();const _0x21d9bc=VisuMZ[_0x3e05e8(0x14e)][_0x3e05e8(0x2c2)][_0x3e05e8(0x1dd)]['ItemQuantityFmt'];let _0x9239a4=_0x21d9bc['format'](_0x2c819e);this['contents'][_0x3e05e8(0x265)]=Window_ItemCraftingList[_0x3e05e8(0x215)],this['drawText'](_0x9239a4,_0x3fb4fd,_0x248070,_0x44ef73,_0x3e05e8(0x179));},Window_ItemCraftingList['prototype'][_0x56ce6f(0x257)]=function(_0x5e8e65,_0x554e00,_0x5e490b,_0x37a51f,_0x5771c1,_0x263e5c){const _0x40e824=_0x56ce6f;let _0x4f0790=_0x37a51f-Math['round'](ImageManager[_0x40e824(0x29f)]/0x2),_0x5e37b9=_0x5771c1+Math[_0x40e824(0x1b5)]((this[_0x40e824(0x2d6)]()-ImageManager['iconHeight'])/0x2);this[_0x40e824(0x332)](_0x5e8e65[_0x40e824(0x276)],_0x4f0790,_0x5e37b9);let _0x2b7ff8=_0x37a51f-Math[_0x40e824(0x1b5)](_0x263e5c/0x2),_0x94b457=_0x5771c1+this[_0x40e824(0x2d6)]();const _0x409743=VisuMZ[_0x40e824(0x14e)][_0x40e824(0x2c2)][_0x40e824(0x1dd)]['ItemQuantityFmt'];let _0x270cb4=_0x409743[_0x40e824(0x132)]('%1/%2'[_0x40e824(0x132)](_0x5e490b,_0x554e00));_0x554e00>_0x5e490b&&this[_0x40e824(0x1da)](ColorManager['powerDownColor']()),this[_0x40e824(0x23b)][_0x40e824(0x265)]=Window_ItemCraftingList[_0x40e824(0x215)],this[_0x40e824(0x260)](_0x270cb4,_0x2b7ff8,_0x94b457,_0x263e5c,'center');},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x172)]=function(){const _0x380f34=_0x56ce6f;if(!VisuMZ[_0x380f34(0x263)][_0x380f34(0x2c2)][_0x380f34(0x25a)][_0x380f34(0x131)])return;const _0x50fe1e=new Rectangle(0x0,0x0,Graphics['boxWidth'],Window_Base[_0x380f34(0x1db)]['fittingHeight'](0x1));this[_0x380f34(0x274)]=new Window_ItemCraftingTooltip(_0x50fe1e),this[_0x380f34(0x316)](this['_tooltipWindow']);},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x13e)]=function(){const _0x26d315=_0x56ce6f;Window_ItemList[_0x26d315(0x1db)]['update'][_0x26d315(0x277)](this),this[_0x26d315(0x275)]();},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x275)]=function(){const _0x2df7ad=_0x56ce6f;if(!this['_tooltipWindow'])return;this[_0x2df7ad(0x192)]()?this[_0x2df7ad(0x10d)]():this[_0x2df7ad(0x274)][_0x2df7ad(0x1d6)]('');const _0x4839d4=new Point(TouchInput['x'],TouchInput['y']),_0x365955=this[_0x2df7ad(0x220)][_0x2df7ad(0x219)](_0x4839d4);this['_tooltipWindow']['x']=_0x365955['x']-this['_tooltipWindow'][_0x2df7ad(0x24c)]/0x2,this['_tooltipWindow']['y']=_0x365955['y']-this[_0x2df7ad(0x274)][_0x2df7ad(0x115)];},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x192)]=function(){const _0x1e37f7=_0x56ce6f;if(!this[_0x1e37f7(0x123)])return![];if(!this[_0x1e37f7(0x191)]())return![];if(!this['isTouchedInsideFrame']())return![];if(this[_0x1e37f7(0x201)]()!==this[_0x1e37f7(0x208)]())return![];return!![];},Window_ItemCraftingList[_0x56ce6f(0x1db)][_0x56ce6f(0x10d)]=function(){const _0x4a3502=_0x56ce6f,_0x3fcd33=this['itemRectWithPadding'](this[_0x4a3502(0x208)]());$gameTemp[_0x4a3502(0x11a)]=!![];const _0x1eaff2=DataManager[_0x4a3502(0x222)](this[_0x4a3502(0x191)]());$gameTemp[_0x4a3502(0x11a)]=![];const _0x4bde75=new Point(TouchInput['x'],TouchInput['y']),_0x300111=this['worldTransform']['applyInverse'](_0x4bde75);let _0x5b861c=_0x3fcd33[_0x4a3502(0x115)]+this[_0x4a3502(0x261)]()*0x2,_0x135098=_0x3fcd33['y']+this['lineHeight'](),_0x5e2f2d=_0x3fcd33[_0x4a3502(0x24c)]-_0x5b861c-this['itemPadding'](),_0x49d9db=Math['floor'](_0x5e2f2d/this['_maxIngredientsSize']);for(const _0x461fd7 of _0x1eaff2){_0x5b861c+=_0x49d9db;const _0x981582=new Rectangle(_0x5b861c-ImageManager['iconWidth'],0x0,ImageManager[_0x4a3502(0x29f)]*0x2,Graphics['boxHeight']);if(_0x981582[_0x4a3502(0x1ec)](_0x300111['x'],_0x300111['y'])){let _0x2af2b3=_0x461fd7[0x0],_0x463803='';if(_0x2af2b3===_0x4a3502(0x218))_0x463803=TextManager[_0x4a3502(0x2a2)];else typeof _0x2af2b3===_0x4a3502(0x18d)&&_0x2af2b3[_0x4a3502(0x13b)](/CATEGORY/i)?(_0x2af2b3[_0x4a3502(0x13b)](/CATEGORY: (.*)/i),_0x463803=String(RegExp['$1'])[_0x4a3502(0x1cd)]()):_0x463803=_0x2af2b3[_0x4a3502(0x1d7)];this[_0x4a3502(0x274)][_0x4a3502(0x1d6)](_0x463803['trim']());return;}}this[_0x4a3502(0x274)][_0x4a3502(0x1d6)]('');},Window_ItemCraftingList['prototype'][_0x56ce6f(0x24f)]=function(){const _0x5961cb=_0x56ce6f,_0x4c79c3=this[_0x5961cb(0x191)]()&&DataManager[_0x5961cb(0x2db)](this[_0x5961cb(0x191)]())?null:this[_0x5961cb(0x191)]();this[_0x5961cb(0x1e4)](_0x4c79c3),this[_0x5961cb(0x1aa)]&&this['_statusWindow'][_0x5961cb(0x306)]===Window_ShopStatus&&this[_0x5961cb(0x1aa)][_0x5961cb(0x2ae)](_0x4c79c3);};function Window_ItemCraftingTooltip(){const _0x2979ed=_0x56ce6f;this[_0x2979ed(0x19c)](...arguments);}Window_ItemCraftingTooltip[_0x56ce6f(0x1db)]=Object[_0x56ce6f(0x2cc)](Window_Base[_0x56ce6f(0x1db)]),Window_ItemCraftingTooltip[_0x56ce6f(0x1db)]['constructor']=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x56ce6f(0x181)]=VisuMZ[_0x56ce6f(0x263)]['Settings'][_0x56ce6f(0x25a)][_0x56ce6f(0x1d7)],Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x19c)]=function(_0x3036b3){const _0x46d081=_0x56ce6f;Window_Base[_0x46d081(0x1db)][_0x46d081(0x19c)][_0x46d081(0x277)](this,_0x3036b3),this[_0x46d081(0x13f)](this['hasCustomWindowSkin']()?0x0:0x2),this['setText']('');},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x1fc)]=function(){const _0x5e8c79=_0x56ce6f;return Window_ItemCraftingTooltip[_0x5e8c79(0x181)]!=='';},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x19e)]=function(){const _0x1c9599=_0x56ce6f;Window_ItemCraftingTooltip[_0x1c9599(0x181)]!==''?this[_0x1c9599(0x2cf)]=ImageManager[_0x1c9599(0x2a0)](Window_ItemCraftingTooltip[_0x1c9599(0x181)]):Window_Base['prototype']['loadWindowskin'][_0x1c9599(0x277)](this);},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)]['setText']=function(_0x4dda9d){const _0x1f5cff=_0x56ce6f;this[_0x1f5cff(0x217)]!==_0x4dda9d&&(this[_0x1f5cff(0x217)]=_0x4dda9d,this[_0x1f5cff(0x1f2)]());},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x27b)]=function(){const _0x496100=_0x56ce6f;this[_0x496100(0x1d6)]('');},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x2ae)]=function(_0xeddfe8){const _0x4188b7=_0x56ce6f;this['setText'](_0xeddfe8?_0xeddfe8[_0x4188b7(0x1d7)]:'');},Window_ItemCraftingTooltip['prototype'][_0x56ce6f(0x1f2)]=function(){const _0x5560d3=_0x56ce6f,_0x144625=this[_0x5560d3(0x2b1)]();this[_0x5560d3(0x196)](),this['drawText'](this[_0x5560d3(0x217)],0x0,0x0,this['innerWidth'],'center');},Window_ItemCraftingTooltip[_0x56ce6f(0x1db)][_0x56ce6f(0x196)]=function(){const _0xb7b698=_0x56ce6f;if(this['_text']==='')this[_0xb7b698(0x23b)]['clear'](),this[_0xb7b698(0x24c)]=0x0;else{let _0x523360=this[_0xb7b698(0x268)](this[_0xb7b698(0x217)])+this[_0xb7b698(0x261)]()*0x4;this[_0xb7b698(0x24c)]=_0x523360+$gameSystem['windowPadding']()*0x2,this[_0xb7b698(0x2ed)]();if(this[_0xb7b698(0x1fc)]())return;const _0x445e0f=ColorManager['dimColor1']();this[_0xb7b698(0x23b)][_0xb7b698(0x31d)](0x0,0x0,this[_0xb7b698(0x1cc)],this[_0xb7b698(0x151)],_0x445e0f);}};function Window_ItemCraftingNumber(){const _0x347fb7=_0x56ce6f;this[_0x347fb7(0x19c)](...arguments);}Window_ItemCraftingNumber[_0x56ce6f(0x1db)]=Object['create'](Window_ShopNumber[_0x56ce6f(0x1db)]),Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x306)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber['prototype'][_0x56ce6f(0x19c)]=function(_0x1d24ff){const _0x5893ae=_0x56ce6f;Window_ShopNumber[_0x5893ae(0x1db)][_0x5893ae(0x19c)][_0x5893ae(0x277)](this,_0x1d24ff);},Window_ItemCraftingNumber['prototype'][_0x56ce6f(0x2df)]=function(_0x3abfb0){const _0x2a9484=_0x56ce6f;this[_0x2a9484(0x229)]=_0x3abfb0,this[_0x2a9484(0x209)]=this['determineMax'](),this[_0x2a9484(0x32f)]=Math['min'](0x1,this[_0x2a9484(0x209)]),this[_0x2a9484(0x1d9)](),this[_0x2a9484(0x1f2)]();},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x32e)]=function(){const _0x35abfc=_0x56ce6f;if(DataManager[_0x35abfc(0x323)](this[_0x35abfc(0x229)]))return $gameParty['calcCraftBatchItemsMax'](this[_0x35abfc(0x229)]);const _0x154793=[],_0x1bc70f=this[_0x35abfc(0x229)],_0x28b759=DataManager['getCraftingIngredients'](_0x1bc70f);let _0x367b28=0x0;for(const _0x4fc76d of _0x28b759){if(!_0x4fc76d)continue;let _0x3199d2=_0x4fc76d[0x0];const _0x47a1ea=_0x4fc76d[0x1];_0x3199d2==='gold'?_0x154793[_0x35abfc(0x135)](Math[_0x35abfc(0x173)]($gameParty[_0x35abfc(0x218)]()/_0x47a1ea)):(typeof _0x3199d2===_0x35abfc(0x18d)&&_0x3199d2[_0x35abfc(0x13b)](/CATEGORY/i)&&(_0x3199d2=SceneManager[_0x35abfc(0x1c5)][_0x35abfc(0x2ea)][_0x367b28],_0x367b28+=0x1),_0x154793['push'](Math[_0x35abfc(0x173)]($gameParty[_0x35abfc(0x293)](_0x3199d2)/_0x47a1ea)));}if(_0x154793['length']<=0x0)_0x154793[_0x35abfc(0x135)](0x0);return _0x154793[_0x35abfc(0x135)]($gameParty[_0x35abfc(0x1f3)](_0x1bc70f)-$gameParty['numItems'](_0x1bc70f)),Math['min'](..._0x154793);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x1f2)]=function(){const _0xec3789=_0x56ce6f;Window_Selectable[_0xec3789(0x1db)][_0xec3789(0x1f2)][_0xec3789(0x277)](this),this[_0xec3789(0x262)](),this[_0xec3789(0x22f)](0x0),this[_0xec3789(0x1f9)](),this['drawHorzLine'](),this['drawCurrentItemName']();},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x262)]=function(){const _0x269e50=_0x56ce6f,_0x21329e=this['_buttons'][0x4];if(!_0x21329e)return;this[_0x269e50(0x1ee)]()?_0x21329e[_0x269e50(0x28d)](this['onButtonOk'][_0x269e50(0x168)](this)):_0x21329e['_clickHandler']=null;},Window_ItemCraftingNumber['prototype'][_0x56ce6f(0x114)]=function(){const _0xd05cdb=_0x56ce6f;return Math[_0xd05cdb(0x173)](this[_0xd05cdb(0x1a0)]()+this[_0xd05cdb(0x2d6)]()*0x2);},Window_ItemCraftingNumber['prototype'][_0x56ce6f(0x1a0)]=function(){const _0x187a03=_0x56ce6f;return Math[_0x187a03(0x173)](this[_0x187a03(0x151)]-this[_0x187a03(0x2d6)]()*6.5);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x240)]=function(){const _0x3fdd3d=_0x56ce6f;return Math[_0x3fdd3d(0x173)](this[_0x3fdd3d(0x114)]()+this[_0x3fdd3d(0x2d6)]()*0x2);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)]['isOkEnabled']=function(){const _0x7dacb0=_0x56ce6f;if((this['_number']||0x0)<=0x0)return![];return Window_ShopNumber[_0x7dacb0(0x1db)]['isOkEnabled'][_0x7dacb0(0x277)](this);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x1bd)]=function(){return this['isOkEnabled']();},Window_ItemCraftingNumber['prototype'][_0x56ce6f(0x1f9)]=function(){const _0x49b10c=_0x56ce6f,_0x1bd53b=DataManager[_0x49b10c(0x222)](this[_0x49b10c(0x229)]);let _0x123224=this[_0x49b10c(0x1a0)]();_0x123224-=this[_0x49b10c(0x2d6)]()*_0x1bd53b[_0x49b10c(0x2f3)],this[_0x49b10c(0x1b6)]=0x0,this[_0x49b10c(0x224)](_0x123224);for(const _0x3bfd90 of _0x1bd53b){_0x123224+=this[_0x49b10c(0x2d6)]();if(!_0x3bfd90)continue;this[_0x49b10c(0x1a1)](_0x3bfd90,_0x123224);};},Window_ItemCraftingNumber[_0x56ce6f(0x1db)]['drawCategories']=function(_0xab49c4){const _0x8543c8=_0x56ce6f,_0x2285a9=this[_0x8543c8(0x261)]();let _0x2cde9e=_0x2285a9*0x2;const _0x1b164f=this[_0x8543c8(0x1cc)]-_0x2cde9e-_0x2285a9*0x3,_0x452f01=_0x2cde9e+Math[_0x8543c8(0x1d8)](_0x1b164f/0x3),_0x2279b2=Math[_0x8543c8(0x173)](_0x1b164f*0x2/0x3/0x3),_0x458e96=Math['max'](this[_0x8543c8(0x268)]('\x20+\x20'),this[_0x8543c8(0x268)]('\x20=\x20'));this[_0x8543c8(0x2fa)](),this['changeTextColor'](ColorManager[_0x8543c8(0x258)]());const _0x4a809c=[_0x8543c8(0x25d),_0x8543c8(0x1d1),_0x8543c8(0x25c)];for(let _0x3ecb9c=0x0;_0x3ecb9c<0x3;_0x3ecb9c++){const _0x3d64f4=_0x4a809c[_0x3ecb9c],_0x2916d5=TextManager['ItemCraftingNumberWindow'][_0x3d64f4];this[_0x8543c8(0x260)](_0x2916d5,_0x452f01+_0x2279b2*_0x3ecb9c+_0x458e96,_0xab49c4,_0x2279b2-_0x458e96,_0x8543c8(0x179));}},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x106)]=function(_0x3feacb,_0x43a70f){const _0x45126f=_0x56ce6f,_0x3e7ae7=this['itemPadding']();let _0x4ae90c=_0x3e7ae7*0x2;const _0x519874=this[_0x45126f(0x1cc)]-_0x4ae90c-_0x3e7ae7*0x3,_0x4d94b0=_0x4ae90c+Math[_0x45126f(0x1d8)](_0x519874/0x3),_0x275297=Math[_0x45126f(0x173)](_0x519874*0x2/0x3/0x3);_0x43a70f=_0x45126f(0x18c)['format'](_0x43a70f),this[_0x45126f(0x260)](_0x43a70f,_0x4d94b0+_0x275297*0x1,_0x3feacb,_0x275297,'left'),this[_0x45126f(0x260)]('\x20=',_0x4d94b0+_0x275297*0x2,_0x3feacb,_0x275297,_0x45126f(0x129));},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x1a1)]=function(_0x3b137f,_0x1e5e84){const _0x4c5569=_0x56ce6f;let _0x548bda=_0x3b137f[0x0];this[_0x4c5569(0x2fa)](),this['drawMathMarks'](_0x1e5e84,'-'),_0x548bda==='gold'?this[_0x4c5569(0x295)](_0x3b137f,_0x1e5e84,!![]):this[_0x4c5569(0x11e)](_0x3b137f,_0x1e5e84,!![],![]);},Window_ItemCraftingNumber['prototype']['drawCurrentItemName']=function(){const _0x2cc69d=_0x56ce6f,_0x450347=[this[_0x2cc69d(0x229)],0x1],_0x198433=this[_0x2cc69d(0x114)](),_0x48462a=DataManager[_0x2cc69d(0x2db)](this[_0x2cc69d(0x229)]);this[_0x2cc69d(0x11e)](_0x450347,_0x198433,![],_0x48462a),this[_0x2cc69d(0x106)](_0x198433,'+');},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x158)]=function(){return!![];},Window_ItemCraftingNumber[_0x56ce6f(0x1db)]['visualGoldDisplayNoCost']=function(){return![];},Window_ItemCraftingNumber['prototype']['drawGoldIngredient']=function(_0x210a9c,_0x1a7dcd,_0x1be879){const _0x469a4d=_0x56ce6f,_0x578c71=this[_0x469a4d(0x261)]();let _0x90a0d7=_0x578c71*0x2;const _0x3234ce=this[_0x469a4d(0x1cc)]-_0x90a0d7-_0x578c71*0x3,_0x127593=_0x90a0d7+Math[_0x469a4d(0x1d8)](_0x3234ce/0x3),_0x2c8fd3=Math['floor'](_0x3234ce*0x2/0x3/0x3),_0x1ef68a=Math[_0x469a4d(0x213)](this[_0x469a4d(0x268)]('\x20+\x20'),this[_0x469a4d(0x268)](_0x469a4d(0x31a))),_0x36928a=_0x210a9c[0x0],_0x1597e6=_0x210a9c[0x1],_0x10e460=_0x1597e6*this[_0x469a4d(0x32f)],_0x23ecb4=VisuMZ[_0x469a4d(0x16d)]?VisuMZ[_0x469a4d(0x16d)][_0x469a4d(0x2c2)][_0x469a4d(0x1c7)][_0x469a4d(0x1d2)]:0x0;if(_0x23ecb4>0x0){const _0x19c9fd=ImageManager[_0x469a4d(0x223)]||0x20,_0x32100f=_0x19c9fd-ImageManager[_0x469a4d(0x29f)],_0x3e0952=_0x19c9fd+0x4,_0x39870b=_0x1a7dcd+(this[_0x469a4d(0x2d6)]()-ImageManager['iconHeight'])/0x2;this[_0x469a4d(0x332)](_0x23ecb4+Math[_0x469a4d(0x1d8)](_0x32100f/0x2),_0x90a0d7,_0x39870b),_0x90a0d7+=_0x3e0952;}this['changeTextColor'](ColorManager[_0x469a4d(0x258)]()),this['drawText'](TextManager[_0x469a4d(0x2a2)],_0x90a0d7,_0x1a7dcd,_0x2c8fd3,_0x469a4d(0x129));const _0x36c4b6=$gameParty[_0x469a4d(0x218)]();this[_0x469a4d(0x266)](_0x36c4b6,TextManager[_0x469a4d(0x2a2)],_0x127593,_0x1a7dcd,_0x2c8fd3);const _0xe5c17b=_0x127593+_0x2c8fd3*0x1+_0x1ef68a,_0x57589e=_0x2c8fd3-_0x1ef68a;this[_0x469a4d(0x266)](_0x10e460,TextManager[_0x469a4d(0x2a2)],_0xe5c17b,_0x1a7dcd,_0x57589e);const _0x35c672=_0x127593+_0x2c8fd3*0x2+_0x1ef68a,_0x12b4ac=_0x2c8fd3-_0x1ef68a,_0x2dffe9=Math[_0x469a4d(0x20e)](_0x36c4b6+_0x10e460*(_0x1be879?-0x1:0x1),$gameParty[_0x469a4d(0x13d)]());this['drawCurrencyValue'](_0x2dffe9,TextManager[_0x469a4d(0x2a2)],_0x35c672,_0x1a7dcd,_0x12b4ac);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)][_0x56ce6f(0x11e)]=function(_0x555bb8,_0x132982,_0x3098a3,_0x43eb54){const _0x12cdec=_0x56ce6f,_0x1c5442=this[_0x12cdec(0x261)]();let _0x120eae=_0x1c5442*0x2;const _0x4d6798=this[_0x12cdec(0x1cc)]-_0x120eae-_0x1c5442*0x3,_0x53bbf0=_0x120eae+Math[_0x12cdec(0x1d8)](_0x4d6798/0x3),_0x4cf3f4=Math[_0x12cdec(0x173)](_0x4d6798*0x2/0x3/0x3),_0x47d2d6=Math[_0x12cdec(0x213)](this['textWidth'](_0x12cdec(0x19f)),this['textWidth']('\x20=\x20'));let _0x541c00=_0x555bb8[0x0];typeof _0x541c00===_0x12cdec(0x18d)&&_0x541c00[_0x12cdec(0x13b)](/CATEGORY/i)&&(_0x541c00=SceneManager[_0x12cdec(0x1c5)]['_ingredientsList'][this[_0x12cdec(0x1b6)]],this[_0x12cdec(0x1b6)]+=0x1);const _0x153d28=_0x555bb8[0x1],_0x2e00c4=_0x153d28*this[_0x12cdec(0x32f)];let _0x2a6b45=_0x541c00[_0x12cdec(0x276)];const _0x13cdfb=_0x2a6b45>0x0?ImageManager[_0x12cdec(0x29f)]+0x4:0x0;if(_0x43eb54){const _0x8ac517=new Rectangle(_0x120eae,_0x132982,_0x4d6798,this[_0x12cdec(0x2d6)]());this[_0x12cdec(0x1f7)](_0x541c00,_0x8ac517),this[_0x12cdec(0x332)](_0x541c00[_0x12cdec(0x276)],_0x8ac517['x'],_0x8ac517['y']);}else this[_0x12cdec(0x2e3)](_0x541c00,_0x120eae,_0x132982,_0x4d6798);const _0x55167c=_0x53bbf0+_0x4cf3f4*0x0,_0x52abbc=_0x4cf3f4-_0x13cdfb,_0x2c2c76=$gameParty[_0x12cdec(0x293)](_0x541c00);this[_0x12cdec(0x260)](_0x2c2c76,_0x55167c,_0x132982,_0x52abbc,_0x12cdec(0x243)),this[_0x12cdec(0x332)](_0x2a6b45,_0x55167c+_0x52abbc+0x4,_0x132982);const _0x2c888c=_0x53bbf0+_0x4cf3f4*0x1+_0x47d2d6,_0xe690bf=_0x4cf3f4-_0x47d2d6-_0x13cdfb;this[_0x12cdec(0x260)](_0x2e00c4,_0x2c888c,_0x132982,_0xe690bf,'right'),this[_0x12cdec(0x332)](_0x2a6b45,_0x2c888c+_0xe690bf+0x4,_0x132982);const _0xd05305=_0x53bbf0+_0x4cf3f4*0x2+_0x47d2d6,_0x38f119=_0x4cf3f4-_0x47d2d6-_0x13cdfb,_0x35f0bc=_0x2c2c76+_0x2e00c4*(_0x3098a3?-0x1:0x1);this[_0x12cdec(0x260)](_0x35f0bc,_0xd05305,_0x132982,_0x38f119,'right'),this[_0x12cdec(0x332)](_0x2a6b45,_0xd05305+_0x38f119+0x4,_0x132982);},Window_ItemCraftingNumber[_0x56ce6f(0x1db)]['itemRect']=function(){const _0x3f5cf1=_0x56ce6f,_0x5192fd=this[_0x3f5cf1(0x261)]();let _0x2d61cd=_0x5192fd*0x2;const _0x17ec07=this[_0x3f5cf1(0x1cc)]-_0x2d61cd-_0x5192fd*0x3,_0x515d41=_0x2d61cd+Math[_0x3f5cf1(0x1d8)](_0x17ec07/0x3),_0x543da3=this[_0x3f5cf1(0x114)](),_0x36924b=Math['floor'](_0x17ec07*0x2/0x3/0x3),_0x1e47fd=Math[_0x3f5cf1(0x213)](this[_0x3f5cf1(0x268)]('\x20+\x20'),this[_0x3f5cf1(0x268)](_0x3f5cf1(0x31a))),_0x4b0e44=this[_0x3f5cf1(0x229)]?.[_0x3f5cf1(0x276)]>0x0?ImageManager[_0x3f5cf1(0x29f)]:0x0,_0x2d8e59=this[_0x3f5cf1(0x278)](),_0x39ee12=new Rectangle(Math[_0x3f5cf1(0x173)](_0x515d41+_0x36924b*0x2-this[_0x3f5cf1(0x278)]()-_0x4b0e44+this['itemPadding']()/0x2-0x2),_0x543da3,this[_0x3f5cf1(0x278)](),this[_0x3f5cf1(0x2d6)]());return _0x39ee12;};function Window_ItemCraftingIngredient(){this['initialize'](...arguments);}Window_ItemCraftingIngredient[_0x56ce6f(0x1db)]=Object['create'](Window_ItemList[_0x56ce6f(0x1db)]),Window_ItemCraftingIngredient[_0x56ce6f(0x1db)][_0x56ce6f(0x306)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient['prototype'][_0x56ce6f(0x19c)]=function(_0x36d185){const _0x259433=_0x56ce6f;Window_Selectable['prototype'][_0x259433(0x19c)]['call'](this,_0x36d185),this['_amount']=0x0;},Window_ItemCraftingIngredient['prototype'][_0x56ce6f(0x180)]=function(){return![];},Window_ItemCraftingIngredient[_0x56ce6f(0x1db)]['setup']=function(_0x241703,_0x5bda8c){const _0x50f04c=_0x56ce6f;this['_category']=_0x241703,this[_0x50f04c(0x163)]=_0x5bda8c||0x1,this[_0x50f04c(0x1f2)](),this[_0x50f04c(0x2d5)](0x0,0x0),this[_0x50f04c(0x2f6)](),this['smoothSelect'](0x0);},Window_ItemCraftingIngredient[_0x56ce6f(0x1db)][_0x56ce6f(0x122)]=function(){const _0x4bf74b=_0x56ce6f;this['_data']=$gameParty[_0x4bf74b(0x2bf)]()[_0x4bf74b(0x16c)](_0x5070bd=>this['includes'](_0x5070bd));},Window_ItemCraftingIngredient[_0x56ce6f(0x1db)][_0x56ce6f(0x232)]=function(_0x4b5cb3){const _0x4b8fdf=_0x56ce6f;if(!_0x4b5cb3)return![];if(_0x4b5cb3===SceneManager[_0x4b8fdf(0x1c5)][_0x4b8fdf(0x229)])return![];return _0x4b5cb3[_0x4b8fdf(0x294)][_0x4b8fdf(0x232)](this[_0x4b8fdf(0x185)][_0x4b8fdf(0x118)]()[_0x4b8fdf(0x1cd)]());},Window_ItemCraftingIngredient[_0x56ce6f(0x1db)][_0x56ce6f(0x12f)]=function(_0x299002){const _0x5b1975=_0x56ce6f;if(!_0x299002)return![];if(this[_0x5b1975(0x32c)]()[_0x5b1975(0x232)](_0x299002))return![];return $gameParty[_0x5b1975(0x293)](_0x299002)>=this['_amount'];},Window_ItemCraftingIngredient[_0x56ce6f(0x1db)][_0x56ce6f(0x32c)]=function(){const _0x59b330=_0x56ce6f,_0x33f4ac=[],_0x158df3=DataManager[_0x59b330(0x222)](SceneManager[_0x59b330(0x1c5)][_0x59b330(0x229)]);for(const _0x19648f of _0x158df3){if(!_0x19648f)continue;const _0x1bbd61=_0x19648f[0x0];(DataManager[_0x59b330(0x2ec)](_0x1bbd61)||DataManager[_0x59b330(0x22b)](_0x1bbd61)||DataManager[_0x59b330(0x2f2)](_0x1bbd61))&&_0x33f4ac[_0x59b330(0x135)](_0x1bbd61);}return _0x33f4ac['concat'](SceneManager[_0x59b330(0x1c5)][_0x59b330(0x2ea)]);},Window_ItemCraftingIngredient['prototype'][_0x56ce6f(0x2e3)]=function(_0x50bfd6,_0x20a1e0,_0xf0320a,_0x3195f7){const _0x2708db=_0x56ce6f;_0x50bfd6&&this['selectedIngredientList']()[_0x2708db(0x232)](_0x50bfd6)&&(this[_0x2708db(0x176)]=!![]),Window_ItemList[_0x2708db(0x1db)]['drawItemName']['call'](this,_0x50bfd6,_0x20a1e0,_0xf0320a,_0x3195f7),this['_alreadySelected']=![];},Window_ItemCraftingIngredient['prototype'][_0x56ce6f(0x260)]=function(_0x1a8126,_0x4c565d,_0x5c82ff,_0x186dd6,_0x3a1885){const _0x2e30e9=_0x56ce6f;if(this['_alreadySelected']){const _0x2ef634=VisuMZ[_0x2e30e9(0x263)][_0x2e30e9(0x2c2)][_0x2e30e9(0x336)];this[_0x2e30e9(0x23b)][_0x2e30e9(0x31e)]=ColorManager[_0x2e30e9(0x184)](_0x2ef634[_0x2e30e9(0x1de)]),_0x1a8126+=_0x2ef634[_0x2e30e9(0x1fa)];}Window_Base[_0x2e30e9(0x1db)][_0x2e30e9(0x260)][_0x2e30e9(0x277)](this,_0x1a8126,_0x4c565d,_0x5c82ff,_0x186dd6,_0x3a1885);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x303)]=Window_ShopStatus[_0x56ce6f(0x1db)][_0x56ce6f(0x1f2)],Window_ShopStatus[_0x56ce6f(0x1db)][_0x56ce6f(0x1f2)]=function(){const _0x3f6c2b=_0x56ce6f;this[_0x3f6c2b(0x128)](this[_0x3f6c2b(0x229)])?this[_0x3f6c2b(0x113)](this['_item']):VisuMZ[_0x3f6c2b(0x263)][_0x3f6c2b(0x303)][_0x3f6c2b(0x277)](this);},VisuMZ[_0x56ce6f(0x263)][_0x56ce6f(0x30a)]=Window_ShopStatus[_0x56ce6f(0x1db)][_0x56ce6f(0x2ae)],Window_ShopStatus[_0x56ce6f(0x1db)][_0x56ce6f(0x2ae)]=function(_0x5d9d7f){const _0x198b18=_0x56ce6f;this[_0x198b18(0x128)](_0x5d9d7f)?this['setItemForCraftBatchContents'](_0x5d9d7f):VisuMZ[_0x198b18(0x263)]['Window_ShopStatus_setItem']['call'](this,_0x5d9d7f);},Window_ShopStatus[_0x56ce6f(0x1db)][_0x56ce6f(0x128)]=function(_0x4c454f){if(!_0x4c454f)return![];if(!SceneManager['isSceneItemCrafting']())return![];if(Imported['VisuMZ_3_ShopBatches']){if(!Window_ShopStatus['BATCH_CONTENTS']['showBatchContents'])return![];}return DataManager['hasCraftBatchItems'](_0x4c454f);},Window_ShopStatus[_0x56ce6f(0x1db)]['setItemForCraftBatchContents']=function(_0x5484eb){const _0x15314e=_0x56ce6f;this[_0x15314e(0x229)]=_0x5484eb,this[_0x15314e(0x23b)]['clear'](),this['contentsBack'][_0x15314e(0x27b)](),this[_0x15314e(0x297)](_0x5484eb);},Window_ShopStatus['prototype'][_0x56ce6f(0x297)]=function(_0x3edd07){const _0x5adc3b=_0x56ce6f;let _0x5a6ec5=this[_0x5adc3b(0x1eb)]();_0x5a6ec5=this[_0x5adc3b(0x1ad)](_0x5a6ec5,_0x3edd07),this[_0x5adc3b(0x1ed)](_0x5a6ec5);},Window_ShopStatus['prototype'][_0x56ce6f(0x1ad)]=function(_0x16dd5f,_0xa1c4d5){const _0x73bfcb=_0x56ce6f,_0x5487ae=DataManager['getCraftBatchItems'](_0xa1c4d5),_0x1d5c40=[_0x73bfcb(0x2b4),_0x73bfcb(0x25f),_0x73bfcb(0x334)];for(const _0x46823d of _0x1d5c40){const _0x41081d=_0x5487ae[_0x46823d];for(const _0x533113 in _0x41081d){const _0x57e895=Number(_0x533113),_0x168ab3=_0x41081d[_0x533113]||0x0;let _0x11153c=null;if(_0x46823d===_0x73bfcb(0x2b4))_0x11153c=$dataItems[_0x57e895];if(_0x46823d===_0x73bfcb(0x25f))_0x11153c=$dataWeapons[_0x57e895];if(_0x46823d===_0x73bfcb(0x334))_0x11153c=$dataArmors[_0x57e895];if(DataManager[_0x73bfcb(0x308)](_0x11153c))continue;_0x11153c&&(this[_0x73bfcb(0x2fa)](),this[_0x73bfcb(0x203)](_0x16dd5f,_0x11153c,_0x168ab3),_0x16dd5f+=this[_0x73bfcb(0x2d6)]());}}return _0x16dd5f;};