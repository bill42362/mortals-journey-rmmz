//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.65;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.65] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Reference Switches and Reference Variables
 * ============================================================================
 * 
 * Reference Switches and Reference Variables are added in version 1.62 of this
 * plugin. These switches and variables allow you to reference them through
 * strings when using script calls.
 * 
 * By simply naming your switch or variable ((Reference Name)), you can use
 * that 'reference name' in a string to call them for script calls. This is
 * just so you don't need to remember the ID's of every other Switch/Variable.
 * 
 * When referencing the strings in the script calls, case does not matter,
 * which means you can use all capitals or all lower case and they'll still
 * reference the same switch or variable.
 * 
 * ---
 * 
 * For example:
 * 
 *   ---
 * 
 *   Switch 10 Name: ((Priscilla Joined))
 * 
 *   Script Call: $gameSwitches.value('Priscilla Joined')
 *                $gameSwitches.setValue('Priscilla Joined', true)
 * 
 *   ---
 * 
 *   Variable 20 Name: Total ((Goblins Slain))
 * 
 *   Script Call: $gameVariables.value('Goblins Slain')
 *                $gameVariables.setValue('Goblins Slain', 50)
 * 
 *   ---
 * 
 * Remember to put quotes around the name for the script call!
 * 
 * This only applies for the $gameSwitches and $gameVariables functions of
 * value(id) and setValue(id, value). They do not apply to the other
 * $gameSwitches and $gameVariables functions.
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === JavaScript Notetag: Map Effects ===
 * 
 * ---
 * 
 * <JS On Map Load>
 *  code
 *  code
 * </JS On Map Load>
 * 
 * - Used for: Map Notetags
 * - Replace 'code' with JavaScript code to run the moment the map finishes
 *   loading and before fading in.
 * 
 * ---
 * 
 * <JS On Map Exit>
 *  code
 *  code
 * </JS On Map Exit>
 * 
 * - Used for: Map Notetags
 * - Replace 'code' with JavaScript code to run the moment the player transfers
 *   to a different map and the screen completely fades out.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Shadow Visibility Plugin Commands ===
 * 
 * ---
 * 
 * Shadow Hide: Player
 * - Hides the visibility of the player sprite shadow.
 * 
 * ---
 * 
 * Shadow Hide: Followers
 * - Hides the visibility of follower sprite shadows.
 * 
 * ---
 * 
 * Shadow Hide: All Events
 * - Hides the visibility of all event sprite shadows.
 * 
 * ---
 * 
 * Shadow Show: Player
 * - Returns the visibility of the player sprite shadow.
 * - Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * ---
 * 
 * Shadow Show: Followers
 * - Returns the visibility of follower sprite shadows.
 * - Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * ---
 * 
 * Shadow Show: All Events
 * - Returns the visibility of all event sprite shadows.
 * - Does NOT override Plugin Parameter or <Hide Shadow> notetag.
 * 
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 * 
 * Shadows do NOT appear for sprites using a "!" as their leading filename
 * marker. These sprites are environmental and are considered "object"
 * characters by the RPG Maker MZ core scripts. They do not utilize character
 * shadows due.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 * 
 *   Shadow Z Layer:
 *   - What is the sprite Z layer used for the shadow sprites?
 *     - In-game layers are as follows:
 *     - 0 : Lower tiles
 *     - 1 : Lower characters
 *     - 3 : Normal characters
 *     - 4 : Upper tiles
 *     - 5 : Upper characters
 *     - 6 : Airship shadow
 *     - 7 : Balloon
 *     - 8 : Animation
 *     - 9 : Destination
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.65: May 18, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New JavaScript notetags added by Arisu:
 * *** <JS On Map Load>
 * **** Replace 'code' with JavaScript code to run the moment the map finishes
 *      loading and before fading in.
 * *** <JS On Map Exit>
 * **** Replace 'code' with JavaScript code to run the moment the player
 *      transfers to a different map and the screen completely fades out.
 * 
 * Version 1.64: March 16, 2026
 * * Bug Fixes!
 * ** Click + hold movement no longer crashes when moving over events without
 *    any active pages. Fix made by Arisu.
 * 
 * Version 1.63: February 16, 2026
 * * Feature Update!
 * ** When moving by clicking and holding down the mouse button, the touch
 *    input will no longer lock onto any events with empty event lists or
 *    populated by just comments. Update made by Arisu.
 * 
 * Version 1.62: January 19, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added: Reference Switches and Reference Variables
 * *** Reference Switches and Reference Variables are added in version 1.62 of
 *     this plugin. These switches and variables allow you to reference them
 *     through strings when using script calls.
 * *** By simply naming your switch or variable ((Reference Name)), you can use
 *     that 'reference name' in a string to call them for script calls.
 * *** When referencing the strings in the script calls, case does not matter,
 *     which means you can use all capitals or all lower case and they'll still
 *     reference the same switch or variable.
 * **** Example: Switch 10 Name: ((Priscilla Joined))
 * ***** Script Call: $gameSwitches.value('Priscilla Joined')
 * ***** $gameSwitches.setValue('Priscilla Joined', true)
 * **** Variable 20 Name: Total ((Goblins Slain))
 * ***** $gameVariables.value('Goblins Slain')
 * ***** $gameVariables.setValue('Goblins Slain', 50)
 * *** Remember to put quotes around the name for the script call!
 * *** This only applies for the $gameSwitches and $gameVariables functions of
 *     value(id) and setValue(id, value). They do not apply to the other
 *     $gameSwitches and $gameVariables functions.
 * * New Features!
 * ** Added Reference Switches and Reference Variables
 * *** See Help section for more info about Reference Switches and Variables
 * ** New Plugin Commands added:
 * *** Shadow Hide: Player
 * *** Shadow Hide: Followers
 * *** Shadow Hide: All Events
 * **** Hides the visibility of the target sprite shadow.
 * *** Shadow Show: Player
 * *** Shadow Show: Followers
 * *** Shadow Show: All Events
 * **** Returns the visibility of target sprite shadow.
 * **** Does NOT override Plugin Parameter "Shadows > Show" if off.
 * **** Does NOT override <Hide Shadow> notetag.
 * 
 * Version 1.61: December 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where shadows would appear under lower-priority event sprites
 *    making usage of certain tiles awkward looking. This is corrected by the
 *    new Plugin Parameter. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Arisu:
 * *** Parameters > Movement Settings > Shadows > Shadow Z Layer
 * **** What is the sprite Z layer used for the shadow sprites?
 * **** By default, this layer will now be 0.5 instead of 0.
 * * Feature Update!
 * ** If a event is made whose priority is "Below characters" and is a tile
 *    object (ie taking a sprite from the map tileset or a character sprite
 *    with "!" in front of the name), it will be automatically regulated to
 *    a custom Z layer of 0.
 * 
 * Version 1.60: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where events with large hitboxes do not work with crash move.
 *    Fix made by Arisu.
 * ** Fixed a bug where single-mode save games by Save Core would freeze after
 *    executed event movements. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shadow
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHidePlayer
 * @text Shadow Hide: Player
 * @desc Hides the visibility of the player sprite shadow.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHideFollowers
 * @text Shadow Hide: Followers
 * @desc Hides the visibility of follower sprite shadows.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowHideAllEvents
 * @text Shadow Hide: All Events
 * @desc Hides the visibility of all event sprite shadows.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowPlayer
 * @text Shadow Show: Player
 * @desc Returns the visibility of the player sprite shadow.
 * Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowFollowers
 * @text Shadow Show: Followers
 * @desc Returns the visibility of follower sprite shadows.
 * Does NOT override Plugin Parameter "Shadows > Show" if off.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ShadowShowAllEvents
 * @text Shadow Show: All Events
 * @desc Returns the visibility of all event sprite shadows.
 * Does NOT override Plugin Parameter or <Hide Shadow> notetag.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param ShadowLayer:num
 * @text Shadow Z Layer
 * @parent Shadows
 * @desc What is the sprite Z layer used for the shadow sprites?
 * @default 0.5
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0xe91ae0=_0x36c0;(function(_0x50e5e7,_0x195bc6){const _0x14fafb=_0x36c0,_0x2ec472=_0x50e5e7();while(!![]){try{const _0x14e61b=-parseInt(_0x14fafb(0x4f0))/0x1+-parseInt(_0x14fafb(0x119))/0x2*(-parseInt(_0x14fafb(0x124))/0x3)+-parseInt(_0x14fafb(0x1c8))/0x4*(parseInt(_0x14fafb(0x12d))/0x5)+parseInt(_0x14fafb(0x52b))/0x6+parseInt(_0x14fafb(0x455))/0x7+-parseInt(_0x14fafb(0x2a8))/0x8+parseInt(_0x14fafb(0x335))/0x9;if(_0x14e61b===_0x195bc6)break;else _0x2ec472['push'](_0x2ec472['shift']());}catch(_0x2c55c0){_0x2ec472['push'](_0x2ec472['shift']());}}}(_0x38eb,0x8f04b));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xe91ae0(0x3d1)](function(_0x29f8a1){const _0x56cf9b=_0xe91ae0;return _0x29f8a1[_0x56cf9b(0x427)]&&_0x29f8a1[_0x56cf9b(0x127)][_0x56cf9b(0x575)]('['+label+']');})[0x0];function _0x38eb(){const _0x21174a=['switchId','processMoveRouteStepFrom','shadowY','_spriteOffsetX','isAllowEventAutoMovement','events','getDirectionFromPoint','isNearTheScreen','_text','EventId','_EventIcons','_scaleX','_counter','gainFrames','update','updateHueShift','scale','updateFrame','_eventCache','checkExistingEntitiesAt','value','tileWidth','determineEventOverload','KNEEL','Game_Event_updateSelfMovement','_commonEvents','isRegionDockable','processMoveCommandEventsMoveCore','setupEventsMoveCoreNotetags','%1DockRegionOnly','savePreservedMorphEventDataKey','DiagonalSpeedMultiplier','parse','Settings','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','Arc','setCharacterBitmap','$preloadedMap_%1','bushDepth','autoEventIconBuffer','follower','canPassDiagonally','deltaYFrom','Game_Enemy_meetsSwitchCondition','startMapCommonEventOnOKTarget','updateEventsMoveCoreTagChanges','isActive','pos','Step2EventId','_lastMovedDirection','isMapPassable','isAdvancedSwitch','isEmptyCharacter','opacitySpeed','_visibleEventX','TargetVariableId','Sprite_Character_setTileBitmap','UNTITLED','VisuMZ_1_MessageCore','_eventScreenX','updateOpacity','defaultFontSize','contentsOpacity','createSpawnedEventWithData','ITEM','code','isBigCharacter','EventIconChangeForced','_filename','correctFacingDirection','right','labelWindowRangeType','SPIN\x20ACW','FontSize','Step2MapId','hideShadows','MUSIC\x20NOTE','destroy','attachPictureFilename','processMoveRouteSetIndex','toLowerCase','sv\x20enemy','createLabelWindowForTarget','Game_Map_setup','deleteSavedEventLocationKey','AllAllow','Game_Player_isDashing','findTargetSprite','adjustMoveSynchOpacityDelta','LIGHTBULB','Icon','%1,%2,','VehicleDock','Game_Player_executeMove','Game_CharacterBase_isTransparent','_lastAttachPictureType','FollowerID','_duration','getEventIconData','hasEncounterHalf','custom','findProperPageIndex','deleteIconsOnEventsDataKey','deleteSavedEventLocation','circle','_targetScaleX','attachPictureSettings','checkEventTriggerThere','deletePreservedMorphEventDataKey','_noEventMovementShadow','start','isAllowCharacterTilt','none','checkEventProximity','_encounterHalfProximity','Game_Interpreter_executeCommand','innerWidth','PosY','isLabelVisible','Sprite_Balloon_updatePosition','updateRoutineMove','removeChild','setupSaveEventLocations','refreshIfNeeded','_periodicRefreshTimer','Game_Timer_initialize','loadDataFile','_hidden','areFollowersForceHidden','Game_Map_event','_dummyWindow','updateFadeIn','clearSelfTarget','_attachPicture','_callEventData','ARRAYEVAL','checkEventTriggerAuto','setPose','increaseSteps','spawnPreserved','updateDuration','_screenZoomScale','ApplyPopupExtraSettings','updateEventLabelText','findDiagonalDirectionTo','processMoveSynchMirrorHorz','processMoveRouteFadeIn','_noMovementShadow','checkEventTriggerTouch','checkSmartEventCollision','processMoveSynchAway','VisuMZ_2_DragonbonesUnion','characterPatternY','roundX','624047QHdhRE','column','EventIconRestore','Game_Map_events','turnTowardPoint','Rope','createLabelWindows','onChange','stop','moveAwayFromPoint','_pageIndex','_frames','isSupportDiagonalMovement','mainFontSize','DefaultShadow','setPlayerControlDisable','abs','_data','cwY','endAngle','_offsetY','isOnRope','ShipSpeed','_lastAttachPictureMaxSize','startEncounterEffect','updateScale','isTargetEventValidForLabelWindow','SpawnEventAtTerrainTag','absDistance','List','eventsXy','clearDestination','isPlayerForceShown','%1Forbid','_CPCs','switch2Valid','BalloonOffsetY','Game_Event_findProperPageIndex','forced','createDummyWindow','Game_Party_hasEncounterNone','createSpawnedEvent','Spriteset_Map_createShadow','DOWN','outlineColor','Game_Event_initialize','executeCommand','_targetScaleY','Airship','IconBufferY','Game_SelfSwitches_setValue','_selfEvent','updateBitmapSmoothing','getAttachPictureBitmapWidth','moveSynchType','Scene_Map_createOnMapExit','screenY','updateEventIconSprite','setFrames','5748810iYqcJq','createProxyWindow','MessageText','player','timer','hasStepAnime','name','isSmartEventCollisionOn','processMoveSynchCustom','Game_Interpreter_PluginCommand','prepareSpawnedEventAtRegion','reverseDir','posEventsMoveCore','character','meetsSwitchCondition','meetActivationProximityConditions','updateTextAngle','BULB','reverse\x20copy','despawnAtXY','StopAutoMoveMessages','LOWER\x20RIGHT','%1Dock','getPosingCharacterDirection','eraseEvent','isSelfVariable','vert\x20mirror','moveTypeRandom','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','DashModifier','floor','format','characterPatternYBasic','EventLocationSave','Game_CharacterBase_isDashing','LIGHT-BULB','CustomPageConditions','startAngle','processMoveRouteBalloon','patternHeight','isStopFollowerChasing','attachPictureType','locate','characterPatternYVS8','referEvent','checkEventTriggerEventsMoveCore','_isObjectCharacter','_visiblePlayerX','mapId','boat','CPCsMet','setupSpawn','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','updatePeriodicRefresh','Game_CharacterBase_opacity','getSelfTarget','Ship','SwitchGetSelfSwitchID','setupMorphEvent','SWEAT','ShadowHideAllEvents','processOk','getEventIconIndex','PlayerForbid','COBWEB','Window_NumberInput_processOk','registerCommand','despawnRegions','_poseDuration','_moveSpeed','_advancedSwitchVariable','pages','delta','VisibleEventLabels','includes','Game_CommonEvent_isActive','CPC','height','useCarryPoseForIcons','Game_System_onAfterLoad','Window_Message_startMessage','SpriteBased','VICTORY','isAdvancedVariable','TiltLeft','setupAttachPictureBitmap','TemplateName','moveTowardPoint','round','_lastPluginCommandInterpreter','TiltRight','rangeType','activationProximityType','ANGER','characterIndexVS8','updatePattern','_eventIconSprite','Region','_forceShowFollower','onClickTrigger','Game_Vehicle_isLandOk','processMoveRouteTeleportToCharacter','processMoveRouteJumpForward','isCollidedWithEvents','SPIN\x20COUNTERCLOCKWISE','getControlledFollowerID','shiftY','prepareSpawnedEventAtTerrainTag','turnRight90','resetSelfSwitchesForEvent','move','setDashingEnabled','_seconds','Game_Map_refresh','FUNC','processMoveRouteSelfVariable','updateEventCustomZ','zoomScale','_fadeInDuration','clearPose','turnLeft90','_mirrorSprite','despawnEventId','Game_CharacterBase_setDirection','canStartLocalEvents','random','_addedHitbox','Game_CharacterBase_realMoveSpeed','SPIN\x20CCW','NOTE','clearDashing','_MapSpawnedEventData','eventLabelsVisible','findDirectionTo','TargetSwitchId','SpawnEventDespawnRegions','_encounterNoneProximity','isInVehicle','pageIndex','mimic','ConvertParams','_needsPeriodicRefresh','_diagonalSupport','Game_System_initialize','despawnEverything','setDiagonalDirection','Button','_requestSaveEventLocation','AirshipSpeed','ship','Game_Message_setNumberInput','moveStraight','timerText','Game_SelfSwitches_value','BlendMode','lineHeight','type','_arcPeak','firstSpawnedEvent','SwitchId','iconSize','endOffset','activationRegionList','Game_Player_checkEventTriggerThere','ceil','_checkRelocateNotetag','_selfTarget','page','LEFT\x20TO\x20RIGHT','replace','requestAnimation','StopAutoMoveEvents','_opacity','Movement','onLoadSuccess','_labelWindows','PageId','encounterProximityDistance','onCancel','left','lastSpawnedEvent','startsWith','refresh','cwX','isWorking','All','misc','isRegionAllowPass','EXCLAMATION','_moveOnlyRegions','Game_Map_unlockEvent','visible','endOffsetX','constructor','turnTowardCharacter','_scene','_startAngle','ANNOYED','horz\x20mirror','screenTileX','Game_Variables_value','_working','isBusy','setupRegionRestrictions','clear','SILENCE','resetIconsOnEventsDataKey','updateWaitMode','mirror\x20horz','startMapCommonEventOnTouch','MoveRouteIndex','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','fontSize','updateTilt','isPlayerWithinEncounterHalfEvents','executeMoveDir8','hasCPCs','ShadowLayer','HURT','offsetY','processMoveRouteMoveRepeat','Scene_Load_onLoadSuccess','duration','_forceCarrying','createAttachPictureSprite','executeMove','_screenActivation','MOBILE_EVENT_LABELS','DEFAULT_SHIFT_Y','_saveEventLocation','setCharacterSpriteSheetInvisible','5492YOeUfM','Boat','isSpawnedEvent','Game_CharacterBase_hasStepAnime','morphIntoTemplate','posNt','itemPadding','isNormalPriority','DashOnLadder','checkAdvancedSwitchVariablePresent','processEraseEncounterEvents','744nfiTfw','endScaleY','apply','description','Game_Party_hasEncounterHalf','BalloonOffsetX','Game_Interpreter_updateWaitMode','rotation','_lastSesetExitSelfSwitchesMapId','3121595XSAJFR','despawnTerrainTags','_cpc','event','isTransparent','pow','_lastAttachPictureScale','jump','initEventsMoveCoreEffects','Game_Troop_meetsConditions','text','patternWidth','activationProximityDistance','string','requestRefresh','labelWindowText','WalkForbid','_attachPictureSprite','Game_CharacterBase_moveStraight','addLoadListener','createIconSprite','requestMapLoadCustomJS','TurnInPlaceDelay','anchor','Game_Vehicle_isMapPassable','processMoveSynchRandom','_isCharacterSpriteSheetInvisible','isCollidedWithPlayerCharacters','_scaleY','setEventIconData','setControlledFollowerID','bitmap','isTriggerIn','trigger','updateScaleBase','Game_Follower_initialize','executeCommonEvent','EventTimerFramesGain','canPass','windowPadding','updateStop','padding','Sprite_Character_initMembers','morphInto','LOVE','getDirectionToPoint','setup','PreloadedMaps','updateEventsAndMovementCore','erase','_EventsMoveCoreSettings','Scene_Map_onMapLoadedEncErase','_randomMoveWeight','UPPER\x20LEFT','createContents','isAnyEventStarting','_visiblePlayerY','isInsideLabelRange','moveSynchTarget','Game_Variables_setValue','bufferY','Dock','Game_Event_start','MsgDuration','isDiagonalDirection','Game_Event_updateParallel','isPosing','requestMapLoadCommonEvents','removeMorph','Game_Player_isMapPassable','initFollowerController','EventIconDelete','isPlaytest','PlayerAllow','SpawnEventDespawnTerrainTags','Game_Player_getInputDirection','angle','push','updateEventMirrorSprite','processMoveRouteFadeOut','parent','setMovementSuccess','target','turn180','end','setupSpawnTest','_characterIndex','log','setWaitMode','Game_Event_update','resetIconsOnEventsData','isRegionForbidPass','processMoveRouteHugWall','TRUE','updateTextScale','match','Seconds','SpawnEventDespawnAtXY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','copy','updateTextPosition','Game_Event_meetsConditionsCPC','BufferX','VariableId','_scaleBaseX','pattern','_realY','_labelWindow','checkNeedForPeriodicRefresh','onExpire','_eventId','loadSvEnemy','_pose','Game_Followers_jumpAll','loadSystem','moveForward','backY','execute','dir8','regionList','hasAdvancedSwitchVariable','setMoveRoute','VehicleAllow','Sprite_Character_characterPatternY','adjustY','PopupExtra','lastMovedDirection','getPlayerDiagonalSetting','Game_Switches_setValue','_eventLabelOffsetX','_startX','clamp','SCREEN','BitmapSmoothing','initMoveSpeed','setDestination','getLastPluginCommandInterpreter','Letter','split','_stepPattern','startMapCommonEventOnOK','isPlayerWithinEncounterNoneEvents','saveEventLocation','visibleRange','RandomMoveWeight','_realX','drawTextEx','setupPageSettings','FollowerSetGlobalChase','chaseCharacter','EventTimerExpireClear','max','Operation','fontFace','PostCopyJS','4QvCKVC','refreshBushDepth','processMoveRouteTeleportTo','_encounterEffectDuration','Game_Message_setItemChoice','front','EventIconChange','_DisablePlayerControl','screenTileY','Game_Switches_value','_targetX','executeCommandCommonEvent','MapID','processMoveRouteStepToCharacter','_event','version','moveDiagonally','createSaveEventLocationData','processMoveSynchMimic','RemovePreserve','width','Sprite_Character_update','COLLAPSE','TiltVert','refreshEventLabels','startOffsetY','deleteEventLocation','_hue','Passability','Game_Event_checkEventTriggerTouch','MessageCore','_randomHomeX','Window_NumberInput_start','updatePose','ZZZ','MoveAllSynchTargets','_startScaleY','Window_ScrollText_startMessage','_bypassClickStop','LIGHT\x20BULB','isMobileDevice','Game_Event_moveTypeRandom','Name','meetsCPC','EventTimerResume','_moveRoute','RefSwitches','isSelfSwitch','screenX','AdvancedVariables','ROUTE_SCRIPT','SPIN\x20ANTICLOCKWISE','_eventPageIndex','Window_EventItem_onOk','_checkEncounterRaw','eventsXyNt','_patternLocked','isAirship','_erased','_followerControlID','setItemChoice','Value','NORMAL','EventID','roundXWithDirection','delay','setValue','some','Game_Player_checkEventTriggerHere','isTransferring','process_VisuMZ_EventsMoveCore_Switches_Variables','MapId','OffsetX','isInvisibleCharacter','updateFadeOut','loadPicture','RegionOkTarget','maxSize','processMoveRouteAnimation','TileX','VisuMZ_Setup_Preload_Map','PreloadMaps','Minutes','_interpreter','variableId','iconHeight','reserveCommonEvent','_chaseOff','region','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','setTileBitmap','PostSpawnJS','setupEventsMoveCoreEffects','isLandOk','default','pageId','note','SPIN\x20CW','setOpacity','list','selfValue','isPressed','_eventLabelOffsetY','isJumping','Game_Character_forceMoveRoute','splice','slice','isDashing','processMoveSynchMirrorVert','length','updateText','updatePatternEventsMoveCore','meetActivationRegionConditions','_startScaleX','WalkAllow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setAllowEventAutoMovement','turnAwayFromCharacter','_callEventMap','opacityDelta','Toggle','processMoveRouteSelfSwitch','Enable','Spriteset_Map_createLowerLayer','frontY','EVAL','initEventsMoveCoreSettings','eventId','Visible','clearSpriteOffsets','_eventOverloadThreshold','setupEvents','Game_CharacterBase_updatePattern','PreCopyJS','EventsMoveCore','call','setupCopyEvent','dashSpeedModifier','_shadowGraphic','getTileExpandData','USER-DEFINED\x203','Game_CharacterBase_screenY','checkEventsMoveCoreStringTags','BoatSpeed','ShadowHideFollowers','min','onLoadAttachPicture','SelfSwitchABCD','PreMorphJS','EventLocationDelete','_eventIcon','setHue','Vehicle','clearStepPattern','Game_Interpreter_character','_scaleBaseY','SwitchGetSelfSwitchABCD','ARRAYNUM','endScale','isEventClickStopValid','Chase','isInstanceOfSceneMap','DashingEnable','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','_waitMode','_shadowSprite','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','Game_CharacterBase_direction','PreSpawnJS','processMoveRouteMoveTo','setPlayerDiagonalSetting','_paused','PlayerIconChange','clearEventCache','isTurnInPlace','%1,','_targetAngle','bufferX','processDrawIcon','characterIndex','iconWidth','STR','PathfindMobileEnabled','_selfTargetItemChoice','MUSIC-NOTE','createShadow','opacity','setImage','ARRAYSTRUCT','turnAwayFromPoint','Game_Troop_meetsConditionsCPC','isOnScreen','updatePosition','fadeDuration','BufferY','terrainTag','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','enemy','startScaleX','indexOf','createLowerLayer','isShip','SLEEP','Game_Event_event','disable','_proxyWindow','meetsConditions','convertVariableValuesInScriptCall','VS8','isMoving','_tilemap','setFrame','processMoveRouteJumpTo','create','Allow','_activationProximity','TileY','RefVariables','AutoBuffer','_tileId','_forceShowPlayer','forceCarrying','isObjectCharacter','spawnEventId','9206944NgkLzq','switch2Id','_PreservedEventMorphData','EventTimerExpireEvent','initEventsMoveCore','adjustX','setStopFollowerChasing','_eventErased','_settings','_commonEventId','Game_Map_update','getPose','Frames','moveTowardCharacter','getInputDirection','SlowerSpeed','_wholeDuration','processMoveSynch','ShiftY','backX','ALLOW_LADDER_DASH','DIAGONAL_PATHFINDING_EVENT_LIMIT','_activationProximityAutoTriggerBypass','_screenActivated','isShadowShrink','_spawnPreserved','mapValue','_SavedEventLocations','updateAttachPictureSprite','processMoveSynchApproach','Game_Event_locate','_customZ','Map%1.json','isAutoBufferIcon','Hours','setMapValue','checkEventTriggerHere','airship','approach','Map\x20%1\x20Variable\x20%2','ShadowShowAllEvents','shadowFilename','_PlayerDiagonalSetting','onDatabaseLoaded','directionOnLadderSpriteVS8dir','blendMode','restoreIconsOnEventsDataKey','_cacheSystemVisible','setChaseOff','StrictCollision','square','createEventsMoveCoreMessagePopup','row','ccwX','LOWER\x20LEFT','pause','processMoveSynchDirection','_stopCount','hasMoveOnlyRegions','Collision','Game_Message_add','VisibleRange','horizontal\x20mirror','Preserve','keys','Walk','FaceSynchAllSynchTargets','unlock','arc','_spriteOffsetY','isDashingEnabled','vehicle','initialize','_moveRouteIndex','Game_CharacterBase_screenX','advancedFunc','MapVariables','getPreservedMorphEventData','hasClickTrigger','MOBILE_DIAGONAL_PATHFINDING','AutoMoveEvents','processEraseEncounterSpawn','Game_Event_clearPageSettings','ARRAYSTR','_moveAllowPlayerCollision','isEventsMoveCoreInvisible','_characterSprites','setPattern','startMessage','EventTemplates','textSizeEx','Game_Map_setupEvents','_clickTrigger','_cacheVisibility','restoreSavedEventPosition','updateSelfMovement','OffsetY','isValid','isPassableByAnyDirection','_comments','QUESTION','_selfTargetNumberInput','of\x20Preloaded\x20Maps.\x0a\x0a','ShadowShowPlayer','_type','startScale','conditions','isPreventSelfMovement','startCallEvent','clearPageSettings','_tileExpand','processMoveRouteStepTo','determineCommonEventsWithCPC','switches','attachPictureScale','CallEvent','Window_EventItem_onCancel','GetMoveSynchTarget','deltaXFrom','smooth','_forceDashing','TerrainTags','parallelCommonEvents','Game_Follower_chaseCharacter','moveRouteIndex','resume','scrolledY','destinationY','_followerChaseOff','setMoveSpeed','attachPictureOffsetY','IconBufferX','_eventMorphData','JSON','picture','prepareSpawnedEventAtXY','Sprite_Balloon_setup','MUSICNOTE','isMapSwitch','isSceneMap','isPlayerControlDisabled','3292614SvpILt','RegionOk','EventTimerPause','updateMoveSynchDirection','RangeType','setupSpawnedEvents','LineHeight','concat','setCommonEvent','PostMorphJS','isDashDisabled','VariableGetSelfVariableID','clearAttachPictureSettings','Setting','moveByInput','isRunning','LIGHT','isTile','isSaveEventLocations','checkRegionEventTrigger','unlockEvent','IconSet','setSelfValue','_displayX','iconIndex','realMoveSpeed','_mapId','_spawnedEvents','checkCollisionKeywords','isBattleTest','_active','getSavedEventLocation','command357','_priorityType','attachPictureMaxSize','_regionRules','canUpdate','requestBalloon','roundY','Self\x20Switch\x20%1','resetExitSelfSwitches','_eventSpawnData','charAt','MUSIC','deleteIconsOnEventsData','_offsetX','processMoveCommand','VisuMZ_0_CoreEngine','characterName','advancedValue','isEventTest','_textSprite','_fadeOutStart','mirror\x20vertical','toUpperCase','resizeWindow','<JS\x20ON\x20MAP\x20LOAD>\x20code\x20error','SPIN\x20CLOCKWISE','prototype','Self\x20Variable\x20%1','endScaleX','moveBackToRandomHome','isSaveEventLocation','originalText','Game_CharacterBase_characterIndex','remove','getPosingCharacterIndex','updateSaveEventLocation','loadCPC','_events','USER-DEFINED\x204','_character','processMoveRouteJumpToCharacter','createEventsMoveCoreTileMessagePopup','Game_Character_processMoveCommand','_direction','Scene_Boot_onDatabaseLoaded','forceDashing','STRUCT','isSpawnHitboxCollisionOk','add','SelfSwitches','isMovementSucceeded','Map\x20%1\x20Switch\x20%2','fadeInDuration','updateShadowChanges','createDisplayObjects','HEART','EnableDir8','_visibleEventY','SpawnEventAtRegion','contents','EventLabelRefresh','encounterProximityType','Game_Timer_start','_needsRefresh','TOGGLE','MsgPopupEvent','processSaveEventLocation','MULTIPLY','command108','UPPER\x20RIGHT','isPlayerForceHidden','_screenParallel','createTextSprite','General','_spriteset','updateMoveSynch','Player','exit','_moveSynch','_eventCopyData','Map%1-Event%2','_startY','Game_Character_setMoveRoute','mirror\x20vert','isVisible','_forceHidePlayer','registerSelfTarget','regionId','SelfSwitchID','updateSpritePosition','tileHeight','isSpriteVS8dir','destinationX','Scene_Map_startEncounterEffect','Step1MapId','getDiagonalDestination','fadeOutDuration','onAfterLoad','setNumberInput','_eventOverload','PlayerMovementDiagonal','IconBlendMode','_actuallyMoving','switch1Valid','SelfVariables','setupPlayerVisibilityOverrides','hasEncounterNone','_currentArc','variables','isAirshipPassable','direction','onOk','isOnLadder','Sprite_Character_setCharacterBitmap','roundYWithDirection','return\x200','Game_Event_checkEventTriggerAuto','mirror\x20horizontal','_characterName','processMoveRouteMoveUntilStop','fadeIn','onMapLoaded','Label','_speed','filter','_expireCommonEvent','FollowerSetControl','loadEnemy','Region%1','setLastPluginCommandInterpreter','Scene_Map_createDisplayObjects','reverse\x20mimic','Game_Followers_isVisible','initMembers','RIGHT','addChild','startOffsetX','_inputTime','PlayerMovementChange','Game_CharacterBase_pattern','SuccessSwitchId','filename','_pattern','tileCoordinates','shadowX','setDirection','MorphEventTo','HMPH','SpawnEventDespawnEventID','checkActivationProximity','setBackgroundType','setEventLabelsVisible','moveAwayFromCharacter','isPassable','template','parameters','setBalloonPose','isDashingAndMoving','USER-DEFINED\x201','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','canMove','_starting','initMembersEventsMoveCore','_target','_alwaysUpdateMove','followers','updateVisibility','Game_Temp_setDestination','Speed','Game_Map_parallelCommonEvents','_randomHomeY','OpacitySpeed','_spawnData','%1%2','updateTileFrame','clearCarrying','setupDiagonalSupport','updateVS8BalloonOffsets','updateParallel','Game_CharacterBase_moveDiagonally','offsetX','Game_Event_setupPageSettings','_forceHideFollower','EventAllow','makeDeepCopy','drawText','_dragonbones','_fadeOutDuration','away','attachPictureOffsetX','getPosingCharacterPattern','Forbid','EventForbid','SpawnEventAtXY','processMoveRouteMoveToCharacter','isMapVariable','down','trim','ShadowHidePlayer','resetFontSettings','isMoveOnlyRegionPassable','needsAttachPictureUpdate','processMoveSynchReverseMimic','hueShift','map','isShadowVisible','Game_Event_isCollidedWithPlayerCharacters','PosX','padZero','getAttachPictureBitmapHeight','status','autosaveEventLocation','jumpAll','bind','OFF','isEventRunning','_lastAttachPictureFilename','EventAutoMovement','startOffset','metCPC','Visibility','forceMoveRoute','_saveEventLocations','%1Allow','LEFT','Game_CharacterBase_canPass','updateAttachPictureBitmap','ShadowShowFollowers','registerSelfEvent','MapSwitches','EventLocationCreate','Template','MorphEventRemove','Hidden','getMapSpawnedEventData','boxWidth','randomInt','_noFollowerMovementShadow','distance','setEventIconDataKey','setupFollowerVisibilityOverrides','checkValidEventerMap','changeSpeed','Game_Player_increaseSteps','sqrt','AdvancedSwitches','IconIndex','_screenParallelOnce','Game_Vehicle_initMoveSpeed','OperateValues','_displayY','setupChild','fittingHeight','removeTemporaryMapSpawnedEvents','firstSpawnedEventID','USER-DEFINED\x202','6860336blRkWr'];_0x38eb=function(){return _0x21174a;};return _0x38eb();}VisuMZ[label]['Settings']=VisuMZ[label][_0xe91ae0(0x477)]||{},VisuMZ['ConvertParams']=function(_0x99ec00,_0x1d8c91){const _0x5ee5ec=_0xe91ae0;for(const _0x9c1a67 in _0x1d8c91){if(_0x9c1a67[_0x5ee5ec(0x18c)](/(.*):(.*)/i)){const _0x357218=String(RegExp['$1']),_0x59b582=String(RegExp['$2'])['toUpperCase']()[_0x5ee5ec(0x41a)]();let _0x4f43db,_0x57abc9,_0x3af128;switch(_0x59b582){case'NUM':_0x4f43db=_0x1d8c91[_0x9c1a67]!==''?Number(_0x1d8c91[_0x9c1a67]):0x0;break;case _0x5ee5ec(0x265):_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON['parse'](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9[_0x5ee5ec(0x421)](_0x207078=>Number(_0x207078));break;case _0x5ee5ec(0x245):_0x4f43db=_0x1d8c91[_0x9c1a67]!==''?eval(_0x1d8c91[_0x9c1a67]):null;break;case _0x5ee5ec(0x4dd):_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9[_0x5ee5ec(0x421)](_0x57b3fb=>eval(_0x57b3fb));break;case _0x5ee5ec(0x32d):_0x4f43db=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):'';break;case'ARRAYJSON':_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9[_0x5ee5ec(0x421)](_0x400ca8=>JSON[_0x5ee5ec(0x476)](_0x400ca8));break;case _0x5ee5ec(0x59d):_0x4f43db=_0x1d8c91[_0x9c1a67]!==''?new Function(JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67])):new Function(_0x5ee5ec(0x3c8));break;case'ARRAYFUNC':_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON['parse'](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9['map'](_0x134aa3=>new Function(JSON[_0x5ee5ec(0x476)](_0x134aa3)));break;case _0x5ee5ec(0x27d):_0x4f43db=_0x1d8c91[_0x9c1a67]!==''?String(_0x1d8c91[_0x9c1a67]):'';break;case _0x5ee5ec(0x2fb):_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9['map'](_0x298546=>String(_0x298546));break;case _0x5ee5ec(0x383):_0x3af128=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):{},_0x99ec00[_0x357218]={},VisuMZ[_0x5ee5ec(0x5b7)](_0x99ec00[_0x357218],_0x3af128);continue;case _0x5ee5ec(0x284):_0x57abc9=_0x1d8c91[_0x9c1a67]!==''?JSON[_0x5ee5ec(0x476)](_0x1d8c91[_0x9c1a67]):[],_0x4f43db=_0x57abc9[_0x5ee5ec(0x421)](_0x160fce=>VisuMZ[_0x5ee5ec(0x5b7)]({},JSON[_0x5ee5ec(0x476)](_0x160fce)));break;default:continue;}_0x99ec00[_0x357218]=_0x4f43db;}}return _0x99ec00;},(_0x541aa1=>{const _0x3e69d0=_0xe91ae0,_0x285bf0=_0x541aa1[_0x3e69d0(0x531)];for(const _0x9e72a2 of dependencies){if(!Imported[_0x9e72a2]){alert(_0x3e69d0(0x547)['format'](_0x285bf0,_0x9e72a2)),SceneManager[_0x3e69d0(0x3a2)]();break;}}const _0x2f885f=_0x541aa1[_0x3e69d0(0x127)];if(_0x2f885f['match'](/\[Version[ ](.*?)\]/i)){const _0x17b179=Number(RegExp['$1']);_0x17b179!==VisuMZ[label][_0x3e69d0(0x1d7)]&&(alert(_0x3e69d0(0x23b)[_0x3e69d0(0x54a)](_0x285bf0,_0x17b179)),SceneManager[_0x3e69d0(0x3a2)]());}if(_0x2f885f[_0x3e69d0(0x18c)](/\[Tier[ ](\d+)\]/i)){const _0x26e021=Number(RegExp['$1']);_0x26e021<tier?(alert(_0x3e69d0(0x18f)[_0x3e69d0(0x54a)](_0x285bf0,_0x26e021,tier)),SceneManager[_0x3e69d0(0x3a2)]()):tier=Math[_0x3e69d0(0x1c4)](_0x26e021,tier);}VisuMZ[_0x3e69d0(0x5b7)](VisuMZ[label][_0x3e69d0(0x477)],_0x541aa1[_0x3e69d0(0x3f0)]);})(pluginData),VisuMZ[_0xe91ae0(0x44e)]=function(_0x1dd53b,_0x1d5a1d,_0x52f206){switch(_0x52f206){case'=':return _0x1d5a1d;break;case'+':return _0x1dd53b+_0x1d5a1d;break;case'-':return _0x1dd53b-_0x1d5a1d;break;case'*':return _0x1dd53b*_0x1d5a1d;break;case'/':return _0x1dd53b/_0x1d5a1d;break;case'%':return _0x1dd53b%_0x1d5a1d;break;}return _0x1dd53b;},PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x2f8),_0x195510=>{const _0x10d591=_0xe91ae0;VisuMZ[_0x10d591(0x5b7)](_0x195510,_0x195510);switch(_0x195510[_0x10d591(0x205)]){case _0x10d591(0x29e):$gameSystem[_0x10d591(0x23c)](!![]);break;case'Stop':$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x10d591(0x240):$gameSystem[_0x10d591(0x23c)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x31b),_0x40701d=>{const _0x3bd3b9=_0xe91ae0;VisuMZ[_0x3bd3b9(0x5b7)](_0x40701d,_0x40701d);const _0x154184=$gameTemp[_0x3bd3b9(0x1b5)](),_0x1351b9={'mapId':_0x40701d[_0x3bd3b9(0x20f)],'eventId':_0x40701d[_0x3bd3b9(0x45f)]||_0x154184['eventId'](),'pageId':_0x40701d[_0x3bd3b9(0xe2)]};if(_0x1351b9[_0x3bd3b9(0x55b)]<=0x0)_0x1351b9[_0x3bd3b9(0x55b)]=$gameMap?$gameMap[_0x3bd3b9(0x55b)]():0x1;$gameTemp[_0x3bd3b9(0x1b5)]()['pluginCommandCallEvent'](_0x1351b9);}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],'DashEnableToggle',_0x508589=>{const _0x53da8=_0xe91ae0;VisuMZ[_0x53da8(0x5b7)](_0x508589,_0x508589);switch(_0x508589[_0x53da8(0x205)]){case'Enable':$gameSystem[_0x53da8(0x59a)](!![]);break;case'Disable':$gameSystem[_0x53da8(0x59a)](![]);break;case _0x53da8(0x240):$gameSystem[_0x53da8(0x59a)](!$gameSystem[_0x53da8(0x2ee)]());break;}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x1ce),_0x52ff51=>{const _0x56b786=_0xe91ae0;VisuMZ[_0x56b786(0x5b7)](_0x52ff51,_0x52ff51);const _0x39a715=$gameTemp[_0x56b786(0x1b5)]();_0x52ff51[_0x56b786(0x20f)]=_0x52ff51[_0x56b786(0x20f)]||$gameMap[_0x56b786(0x55b)](),$gameSystem[_0x56b786(0x444)](_0x52ff51[_0x56b786(0x20f)],_0x52ff51['EventId']||_0x39a715[_0x56b786(0x247)](),_0x52ff51[_0x56b786(0x44b)],_0x52ff51[_0x56b786(0x32b)],_0x52ff51[_0x56b786(0x521)],_0x52ff51['IconBlendMode'],![]);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x499),_0x41f38a=>{const _0x1c1009=_0xe91ae0;VisuMZ['ConvertParams'](_0x41f38a,_0x41f38a);const _0x3f7ae7=$gameTemp[_0x1c1009(0x1b5)]();_0x41f38a[_0x1c1009(0x20f)]=_0x41f38a[_0x1c1009(0x20f)]||$gameMap['mapId'](),$gameSystem[_0x1c1009(0x444)](_0x41f38a[_0x1c1009(0x20f)],_0x41f38a[_0x1c1009(0x45f)]||_0x3f7ae7['eventId'](),_0x41f38a[_0x1c1009(0x44b)],_0x41f38a[_0x1c1009(0x32b)],_0x41f38a['IconBufferY'],_0x41f38a[_0x1c1009(0x3ba)],!![]);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x174),_0x4ca600=>{const _0x4516f5=_0xe91ae0;VisuMZ[_0x4516f5(0x5b7)](_0x4ca600,_0x4ca600);const _0x36ab28=$gameTemp[_0x4516f5(0x1b5)]();_0x4ca600[_0x4516f5(0x20f)]=_0x4ca600[_0x4516f5(0x20f)]||$gameMap[_0x4516f5(0x55b)](),$gameSystem[_0x4516f5(0x4bc)](_0x4ca600[_0x4516f5(0x20f)],_0x4ca600[_0x4516f5(0x45f)]||_0x36ab28[_0x4516f5(0x247)]());}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x4f2),_0x5d4090=>{const _0x22ed3e=_0xe91ae0;VisuMZ[_0x22ed3e(0x5b7)](_0x5d4090,_0x5d4090);const _0x1b36f5=$gameTemp[_0x22ed3e(0x1b5)]();_0x5d4090[_0x22ed3e(0x20f)]=_0x5d4090[_0x22ed3e(0x20f)]||$gameMap[_0x22ed3e(0x55b)](),$gameSystem['restoreIconsOnEventsDataKey'](_0x5d4090[_0x22ed3e(0x20f)],_0x5d4090[_0x22ed3e(0x45f)]||_0x1b36f5['eventId']());}),PluginManager['registerCommand'](pluginData['name'],_0xe91ae0(0x391),_0x1f2243=>{const _0x46e03c=_0xe91ae0;if($gameMap)for(const _0xf962f8 of $gameMap['events']()){_0xf962f8['refresh'](),_0xf962f8[_0x46e03c(0x4e5)]();}if(SceneManager[_0x46e03c(0x333)]()){const _0x18634c=SceneManager['_scene'][_0x46e03c(0x39f)];if(_0x18634c)_0x18634c[_0x46e03c(0x1e0)]();}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'EventLabelVisible',_0x563d54=>{const _0x2b6d40=_0xe91ae0;VisuMZ[_0x2b6d40(0x5b7)](_0x563d54,_0x563d54);switch(_0x563d54[_0x2b6d40(0x431)]){case _0x2b6d40(0x248):$gameSystem[_0x2b6d40(0x3ec)](!![]);break;case _0x2b6d40(0x43e):$gameSystem[_0x2b6d40(0x3ec)](![]);break;case _0x2b6d40(0x240):$gameSystem[_0x2b6d40(0x3ec)](!$gameSystem[_0x2b6d40(0x5af)]());break;}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x54c),_0x5deaf5=>{const _0x34c59e=_0xe91ae0;VisuMZ[_0x34c59e(0x5b7)](_0x5deaf5,_0x5deaf5);const _0x5718cb=$gameTemp[_0x34c59e(0x1b5)]();if(!$gameMap)return;const _0x1f7955=$gameMap[_0x34c59e(0x130)](_0x5deaf5[_0x34c59e(0x45f)]||_0x5718cb[_0x34c59e(0x247)]());if(_0x1f7955)_0x1f7955[_0x34c59e(0x1bb)]();}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x43b),_0x420321=>{const _0x1e8497=_0xe91ae0;VisuMZ[_0x1e8497(0x5b7)](_0x420321,_0x420321);const _0x54fa51=$gameTemp['getLastPluginCommandInterpreter'](),_0x1f8c7b=_0x420321[_0x1e8497(0x20f)]||$gameMap[_0x1e8497(0x55b)](),_0x25a884=_0x420321['EventId']||_0x54fa51['eventId'](),_0x3491d8=_0x420321[_0x1e8497(0x424)]||0x0,_0x584485=_0x420321['PosY']||0x0,_0x31cd0a=_0x420321['Direction']||0x2,_0x1cdedf=((_0x420321[_0x1e8497(0xe2)]||0x1)-0x1)['clamp'](0x0,0x13),_0x5730db=_0x420321[_0x1e8497(0x104)]||0x0;$gameSystem[_0x1e8497(0x1d9)](_0x1f8c7b,_0x25a884,_0x3491d8,_0x584485,_0x31cd0a,_0x1cdedf,_0x5730db);}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x25d),_0xef5051=>{const _0x37bbf1=_0xe91ae0;VisuMZ[_0x37bbf1(0x5b7)](_0xef5051,_0xef5051);const _0x3e00f4=$gameTemp[_0x37bbf1(0x1b5)](),_0x28db4f=_0xef5051[_0x37bbf1(0x20f)]||$gameMap[_0x37bbf1(0x55b)](),_0x18699f=_0xef5051[_0x37bbf1(0x45f)]||_0x3e00f4[_0x37bbf1(0x247)]();$gameSystem[_0x37bbf1(0x4aa)](_0x28db4f,_0x18699f);}),VisuMZ[_0xe91ae0(0x24e)]['ApplyPopupExtraSettings']=function(_0x1404b8,_0x570249){const _0x24c823=_0xe91ae0;_0x570249=_0x570249||{},_0x1404b8[_0x24c823(0x289)]={'fadeIn':_0x570249[_0x24c823(0x389)]||0x0,'fadeOut':_0x570249[_0x24c823(0x3b5)]||0x0},_0x1404b8['startOffset']={'x':_0x570249[_0x24c823(0x3dd)]||0x0,'y':_0x570249[_0x24c823(0x1e1)]||0x0},_0x1404b8[_0x24c823(0xd3)]={'x':_0x570249[_0x24c823(0xf2)]||0x0,'y':_0x570249['endOffsetY']||0x0},_0x1404b8[_0x24c823(0x266)]={'x':_0x570249[_0x24c823(0x371)]||0x0,'y':_0x570249[_0x24c823(0x125)]||0x0},_0x1404b8[_0x24c823(0x311)]={'x':_0x570249[_0x24c823(0x28e)]||0x0,'y':_0x570249['startScaleY']||0x0},_0x1404b8[_0x24c823(0x179)]={'start':_0x570249[_0x24c823(0x550)]||0x0,'end':_0x570249[_0x24c823(0x503)]||0x0},_0x1404b8[_0x24c823(0xec)]={'arc':_0x570249[_0x24c823(0x479)]||0x0};},PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],'MsgPopupPlayer',_0x154989=>{const _0x2c6820=_0xe91ae0;if(!SceneManager[_0x2c6820(0x269)]())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp['isPlaytest']()&&alert(_0x2c6820(0x26e)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x2c6820(0x5b7)](_0x154989,_0x154989);const _0x2c1502={'text':_0x154989['MessageText']||'','duration':Math[_0x2c6820(0x1c4)](_0x154989[_0x2c6820(0x16c)]||0x3c,0xc)},_0x5b396b=_0x154989[_0x2c6820(0x1aa)]||{};VisuMZ[_0x2c6820(0x24e)][_0x2c6820(0x4e4)](_0x2c1502,_0x5b396b);const _0xd9a8c3=SceneManager[_0x2c6820(0xf5)]['_spriteset'];if(_0xd9a8c3){const _0x38c27b=$gamePlayer;_0xd9a8c3[_0x2c6820(0x2db)](_0x38c27b,_0x2c1502);}}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],'MsgPopupFollower',_0x2e73cf=>{const _0xa38453=_0xe91ae0;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp[_0xa38453(0x175)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0xa38453(0x5b7)](_0x2e73cf,_0x2e73cf);const _0x36b561=_0x2e73cf['FollowerIndex']||0x0,_0xd62b27={'text':_0x2e73cf[_0xa38453(0x52d)]||'','duration':Math[_0xa38453(0x1c4)](_0x2e73cf[_0xa38453(0x16c)]||0x3c,0xc)},_0x174f5b=_0x2e73cf[_0xa38453(0x1aa)]||{};VisuMZ['EventsMoveCore'][_0xa38453(0x4e4)](_0xd62b27,_0x174f5b);const _0x165614=SceneManager['_scene'][_0xa38453(0x39f)];if(_0x165614){const _0x5cf489=$gamePlayer[_0xa38453(0x3fa)]()[_0xa38453(0x47e)](_0x36b561);_0x165614[_0xa38453(0x2db)](_0x5cf489,_0xd62b27);}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x396),_0x1a158d=>{const _0x4f205f=_0xe91ae0;if(!SceneManager[_0x4f205f(0x269)]())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp[_0x4f205f(0x175)]()&&alert(_0x4f205f(0x26e)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}VisuMZ[_0x4f205f(0x5b7)](_0x1a158d,_0x1a158d);const _0x2bf2b3=$gameTemp[_0x4f205f(0x1b5)](),_0x4d0d64=_0x1a158d[_0x4f205f(0x45f)]||(_0x2bf2b3?_0x2bf2b3[_0x4f205f(0x247)]():0x1),_0x2461bd={'text':_0x1a158d['MessageText']||'','duration':Math[_0x4f205f(0x1c4)](_0x1a158d[_0x4f205f(0x16c)]||0x3c,0xc)},_0x50ecc1=_0x1a158d[_0x4f205f(0x1aa)]||{};VisuMZ['EventsMoveCore'][_0x4f205f(0x4e4)](_0x2461bd,_0x50ecc1);const _0x5235ff=SceneManager[_0x4f205f(0xf5)]['_spriteset'];if(_0x5235ff){const _0x3bbc3c=$gameMap[_0x4f205f(0x130)](_0x4d0d64);_0x5235ff[_0x4f205f(0x2db)](_0x3bbc3c,_0x2461bd);}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'MsgPopupTargetTile',_0x666874=>{const _0x1ca648=_0xe91ae0;if(!SceneManager[_0x1ca648(0x269)]())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp[_0x1ca648(0x175)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x1ca648(0x105));return;}VisuMZ[_0x1ca648(0x5b7)](_0x666874,_0x666874);const _0x26c78c={'text':_0x666874[_0x1ca648(0x52d)]||'','duration':Math[_0x1ca648(0x1c4)](_0x666874[_0x1ca648(0x16c)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x1ca648(0x583)](_0x666874[_0x1ca648(0x217)]||0x0),'y':Math[_0x1ca648(0x583)](_0x666874[_0x1ca648(0x2a0)]||0x0)}},_0x37eceb=_0x666874[_0x1ca648(0x1aa)]||{};VisuMZ['EventsMoveCore']['ApplyPopupExtraSettings'](_0x26c78c,_0x37eceb);const _0x5d1663=SceneManager[_0x1ca648(0xf5)][_0x1ca648(0x39f)];_0x5d1663&&_0x5d1663[_0x1ca648(0x37e)](_0x26c78c);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x2ab),_0x989ba=>{const _0xa355fa=_0xe91ae0;VisuMZ[_0xa355fa(0x5b7)](_0x989ba,_0x989ba);const _0x4895f2=_0x989ba['CommonEventID'];$gameTimer[_0xa355fa(0x33d)](_0x4895f2);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x1c3),_0x3e9dbe=>{const _0x210850=_0xe91ae0;$gameTimer[_0x210850(0x33d)](0x0);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x152),_0x3ada7b=>{const _0x545d8e=_0xe91ae0;if(!$gameTimer[_0x545d8e(0xea)]())return;VisuMZ[_0x545d8e(0x5b7)](_0x3ada7b,_0x3ada7b);let _0x4ce19b=0x0;_0x4ce19b+=_0x3ada7b[_0x545d8e(0x2b4)],_0x4ce19b+=_0x3ada7b[_0x545d8e(0x18d)]*0x3c,_0x4ce19b+=_0x3ada7b[_0x545d8e(0x21a)]*0x3c*0x3c,_0x4ce19b+=_0x3ada7b[_0x545d8e(0x2ca)]*0x3c*0x3c*0x3c,$gameTimer[_0x545d8e(0x463)](_0x4ce19b);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],'EventTimerFramesSet',_0x232d64=>{const _0x3365af=_0xe91ae0;if(!$gameTimer[_0x3365af(0xea)]())return;VisuMZ['ConvertParams'](_0x232d64,_0x232d64);let _0x3bbf8e=0x0;_0x3bbf8e+=_0x232d64[_0x3365af(0x2b4)],_0x3bbf8e+=_0x232d64['Seconds']*0x3c,_0x3bbf8e+=_0x232d64['Minutes']*0x3c*0x3c,_0x3bbf8e+=_0x232d64[_0x3365af(0x2ca)]*0x3c*0x3c*0x3c,$gameTimer[_0x3365af(0x52a)](_0x3bbf8e);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x337),_0x2387b4=>{const _0x4a777d=_0xe91ae0;if(!$gameTimer[_0x4a777d(0xea)]())return;$gameTimer[_0x4a777d(0x2df)]();}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x1f4),_0x431922=>{const _0x270e18=_0xe91ae0;if(!$gameTimer[_0x270e18(0xea)]())return;$gameTimer[_0x270e18(0x325)]();}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'EventTimerSpeed',_0x56c1c2=>{const _0x27c48e=_0xe91ae0;VisuMZ['ConvertParams'](_0x56c1c2,_0x56c1c2);const _0x31469e=_0x56c1c2[_0x27c48e(0x3fd)]||0x0;$gameTimer[_0x27c48e(0x447)](_0x31469e);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x1c1),_0x257c48=>{const _0x1372bc=_0xe91ae0;VisuMZ['ConvertParams'](_0x257c48,_0x257c48);const _0x14f7fe=!_0x257c48[_0x1372bc(0x268)];$gameSystem[_0x1372bc(0x2ae)](_0x14f7fe);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'FollowerSetTargetChase',_0x3083dd=>{const _0x31c37f=_0xe91ae0;VisuMZ['ConvertParams'](_0x3083dd,_0x3083dd);const _0x42bf90=(_0x3083dd[_0x31c37f(0x4b6)]||0x0)-0x1,_0x1b518b=!_0x3083dd[_0x31c37f(0x268)],_0x2eae4c=$gamePlayer[_0x31c37f(0x3fa)]()[_0x31c37f(0x47e)](_0x42bf90);if(_0x2eae4c)_0x2eae4c['setChaseOff'](_0x1b518b);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x3d3),_0xb28f1a=>{const _0x42f286=_0xe91ae0;VisuMZ[_0x42f286(0x5b7)](_0xb28f1a,_0xb28f1a);const _0x330beb=_0xb28f1a[_0x42f286(0x4b6)];$gameSystem['setControlledFollowerID'](_0x330beb);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],'FollowerReset',_0x3175de=>{const _0x2238ae=_0xe91ae0;VisuMZ['ConvertParams'](_0x3175de,_0x3175de),$gameSystem[_0x2238ae(0x14b)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x2c9c6d of $gamePlayer['followers']()[_0x2238ae(0x501)]){if(_0x2c9c6d)_0x2c9c6d[_0x2238ae(0x2d8)](![]);}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x264),_0x2ab881=>{const _0x36e8d3=_0xe91ae0;VisuMZ[_0x36e8d3(0x5b7)](_0x2ab881,_0x2ab881);const _0x2ac6cb=$gameTemp[_0x36e8d3(0x1b5)]();_0x2ab881[_0x36e8d3(0x20f)]=_0x2ab881['MapId']||$gameMap['mapId']();const _0x1ef46e=[_0x2ab881[_0x36e8d3(0x20f)],_0x2ab881['EventId']||_0x2ac6cb[_0x36e8d3(0x247)](),_0x2ab881[_0x36e8d3(0x1b6)]],_0x42305a=_0x2ab881[_0x36e8d3(0x5b1)],_0xcfd506=$gameSelfSwitches[_0x36e8d3(0x46a)](_0x1ef46e)||![];$gameSwitches['setValue'](_0x42305a,_0xcfd506);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x564),_0x504567=>{const _0x31a22e=_0xe91ae0;VisuMZ['ConvertParams'](_0x504567,_0x504567);const _0x40cb9e=$gameTemp[_0x31a22e(0x1b5)]();_0x504567['MapId']=_0x504567[_0x31a22e(0x20f)]||$gameMap[_0x31a22e(0x55b)]();const _0x4e069d=[_0x504567[_0x31a22e(0x20f)],_0x504567['EventId']||_0x40cb9e['eventId'](),_0x31a22e(0x35c)['format'](_0x504567[_0x31a22e(0xd1)])],_0x47c110=_0x504567['TargetSwitchId'],_0x2e7a36=$gameSelfSwitches[_0x31a22e(0x46a)](_0x4e069d)||![];$gameSwitches['setValue'](_0x47c110,_0x2e7a36);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x340),_0x1265b4=>{const _0x14be56=_0xe91ae0;VisuMZ['ConvertParams'](_0x1265b4,_0x1265b4);const _0x327192=$gameTemp[_0x14be56(0x1b5)]();_0x1265b4[_0x14be56(0x20f)]=_0x1265b4[_0x14be56(0x20f)]||$gameMap[_0x14be56(0x55b)]();const _0x33fd0d=[_0x1265b4[_0x14be56(0x20f)],_0x1265b4[_0x14be56(0x45f)]||_0x327192[_0x14be56(0x247)](),'Self\x20Variable\x20%1'[_0x14be56(0x54a)](_0x1265b4[_0x14be56(0x194)])],_0x3ed9d4=_0x1265b4[_0x14be56(0x48d)],_0x5b3874=$gameSelfSwitches[_0x14be56(0x46a)](_0x33fd0d)||![];$gameVariables[_0x14be56(0x20a)](_0x3ed9d4,_0x5b3874);}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x3e7),_0x3b86d1=>{const _0x573eeb=_0xe91ae0;VisuMZ[_0x573eeb(0x5b7)](_0x3b86d1,_0x3b86d1);if(!$gameMap)return;const _0x2ccfa5=$gameTemp[_0x573eeb(0x1b5)](),_0x456cc3=_0x3b86d1['Step2Preserve'];_0x3b86d1['Step1MapId']=_0x3b86d1[_0x573eeb(0x3b3)]||$gameMap[_0x573eeb(0x55b)](),_0x3b86d1[_0x573eeb(0x4a0)]=_0x3b86d1[_0x573eeb(0x4a0)]||$gameMap['mapId'](),_0x3b86d1['TemplateName']=_0x3b86d1[_0x573eeb(0x581)][_0x573eeb(0x36b)]()[_0x573eeb(0x41a)]();if(!_0x456cc3&&_0x3b86d1['Step1MapId']!==$gameMap['mapId']())return;if($gameMap[_0x573eeb(0x55b)]()===_0x3b86d1[_0x573eeb(0x3b3)]){const _0x1fc6e1=$gameMap['event'](_0x3b86d1['Step1EventId']||_0x2ccfa5['eventId']());if(!_0x1fc6e1)return;_0x3b86d1[_0x573eeb(0x581)]!==_0x573eeb(0x48f)?_0x1fc6e1[_0x573eeb(0x11d)](_0x3b86d1[_0x573eeb(0x581)]):_0x1fc6e1['morphInto'](_0x3b86d1[_0x573eeb(0x4a0)],_0x3b86d1[_0x573eeb(0x486)]||_0x2ccfa5[_0x573eeb(0x247)]());}_0x456cc3&&$gameSystem['savePreservedMorphEventDataKey'](_0x3b86d1[_0x573eeb(0x3b3)],_0x3b86d1['Step1EventId'],_0x3b86d1['TemplateName'],_0x3b86d1[_0x573eeb(0x4a0)],_0x3b86d1[_0x573eeb(0x486)]);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x43d),_0x5b60a0=>{const _0x54de8f=_0xe91ae0;VisuMZ['ConvertParams'](_0x5b60a0,_0x5b60a0);if(!$gameMap)return;const _0x8498de=$gameTemp[_0x54de8f(0x1b5)]();_0x5b60a0[_0x54de8f(0x20f)]=_0x5b60a0[_0x54de8f(0x20f)]||$gameMap[_0x54de8f(0x55b)]();if($gameMap[_0x54de8f(0x55b)]()===_0x5b60a0[_0x54de8f(0x20f)]){const _0x14b408=$gameMap['event'](_0x5b60a0['EventId']||_0x8498de[_0x54de8f(0x247)]());_0x14b408[_0x54de8f(0x171)]();}_0x5b60a0[_0x54de8f(0x1db)]&&$gameSystem[_0x54de8f(0x4c2)](_0x5b60a0[_0x54de8f(0x20f)],_0x5b60a0[_0x54de8f(0x45f)]||_0x8498de[_0x54de8f(0x247)]());}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x274),_0x2044d6=>{const _0x34c897=_0xe91ae0;VisuMZ[_0x34c897(0x5b7)](_0x2044d6,_0x2044d6),$gameSystem[_0x34c897(0x14a)]($gamePlayer,_0x2044d6['IconIndex'],_0x2044d6['IconBufferX'],_0x2044d6[_0x34c897(0x521)],_0x2044d6['IconBlendMode']);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'PlayerIconDelete',_0x45f1fc=>{const _0x4f1e57=_0xe91ae0;VisuMZ[_0x4f1e57(0x5b7)](_0x45f1fc,_0x45f1fc),$gameSystem[_0x4f1e57(0x361)]($gamePlayer);}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x3df),_0x9ee65e=>{const _0x4c5bf9=_0xe91ae0;VisuMZ[_0x4c5bf9(0x5b7)](_0x9ee65e,_0x9ee65e),$gameSystem[_0x4c5bf9(0x4ff)](!_0x9ee65e[_0x4c5bf9(0x242)]);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x3b9),_0x559cab=>{const _0x4487fc=_0xe91ae0;VisuMZ['ConvertParams'](_0x559cab,_0x559cab),$gameSystem[_0x4487fc(0x272)](_0x559cab[_0x4487fc(0x342)]);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'SelfDataResetAll',_0x3782e7=>{const _0x59c100=_0xe91ae0;VisuMZ[_0x59c100(0x5b7)](_0x3782e7,_0x3782e7);const _0x25f931=_0x3782e7[_0x59c100(0x20f)]||$gameMap[_0x59c100(0x55b)]();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x25f931);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x25b),_0x49c2de=>{const _0x3182ea=_0xe91ae0;VisuMZ[_0x3182ea(0x5b7)](_0x49c2de,_0x49c2de);const _0x5367ac=$gameTemp[_0x3182ea(0x1b5)]();_0x49c2de[_0x3182ea(0x20f)]=_0x49c2de[_0x3182ea(0x20f)]||$gameMap[_0x3182ea(0x55b)]();const _0x24bfc8=[_0x49c2de[_0x3182ea(0x20f)],_0x49c2de[_0x3182ea(0x45f)]||_0x5367ac['eventId'](),_0x49c2de[_0x3182ea(0x1b6)]];switch(_0x49c2de[_0x3182ea(0x205)]){case'ON':$gameSelfSwitches[_0x3182ea(0x20a)](_0x24bfc8,!![]);break;case _0x3182ea(0x42b):$gameSelfSwitches[_0x3182ea(0x20a)](_0x24bfc8,![]);break;case _0x3182ea(0x240):$gameSelfSwitches['setValue'](_0x24bfc8,!$gameSelfSwitches[_0x3182ea(0x46a)](_0x24bfc8));break;}}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x3ad),_0x49ff9d=>{const _0x2d656f=_0xe91ae0;VisuMZ[_0x2d656f(0x5b7)](_0x49ff9d,_0x49ff9d);const _0x3907bb=$gameTemp[_0x2d656f(0x1b5)]();_0x49ff9d[_0x2d656f(0x20f)]=_0x49ff9d['MapId']||$gameMap[_0x2d656f(0x55b)]();const _0x3577d5=[_0x49ff9d[_0x2d656f(0x20f)],_0x49ff9d[_0x2d656f(0x45f)]||_0x3907bb[_0x2d656f(0x247)](),'Self\x20Switch\x20%1'[_0x2d656f(0x54a)](_0x49ff9d[_0x2d656f(0xd1)])];switch(_0x49ff9d[_0x2d656f(0x205)]){case'ON':$gameSelfSwitches[_0x2d656f(0x20a)](_0x3577d5,!![]);break;case'OFF':$gameSelfSwitches[_0x2d656f(0x20a)](_0x3577d5,![]);break;case _0x2d656f(0x240):$gameSelfSwitches[_0x2d656f(0x20a)](_0x3577d5,!$gameSelfSwitches[_0x2d656f(0x46a)](_0x3577d5));break;}}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'SelfVariableID',_0x49ebf7=>{const _0x5815a6=_0xe91ae0;VisuMZ[_0x5815a6(0x5b7)](_0x49ebf7,_0x49ebf7);const _0x21d000=$gameTemp[_0x5815a6(0x1b5)]();_0x49ebf7['MapId']=_0x49ebf7[_0x5815a6(0x20f)]||$gameMap[_0x5815a6(0x55b)]();const _0x58eade=[_0x49ebf7['MapId'],_0x49ebf7[_0x5815a6(0x45f)]||_0x21d000[_0x5815a6(0x247)](),'Self\x20Variable\x20%1'['format'](_0x49ebf7['VariableId'])],_0x32d4c0=VisuMZ[_0x5815a6(0x44e)]($gameSelfSwitches[_0x5815a6(0x46a)](_0x58eade),_0x49ebf7[_0x5815a6(0x205)],_0x49ebf7[_0x5815a6(0x1c5)]);$gameSelfSwitches['setValue'](_0x58eade,_0x32d4c0);}),PluginManager['registerCommand'](pluginData['name'],_0xe91ae0(0x41b),_0x34f8dc=>{const _0x3e7a5b=_0xe91ae0;$gamePlayer[_0x3e7a5b(0x4e9)]=!![];}),PluginManager[_0xe91ae0(0x56d)](pluginData['name'],_0xe91ae0(0x258),_0x47b5f2=>{$gamePlayer['_noFollowerMovementShadow']=!![];}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x567),_0x4dcf1a=>{const _0x5130db=_0xe91ae0;$gamePlayer[_0x5130db(0x4c3)]=!![];}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x30f),_0x3f2959=>{$gamePlayer['_noMovementShadow']=![];}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x438),_0x4d8db0=>{const _0x517066=_0xe91ae0;$gamePlayer[_0x517066(0x442)]=![];}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x2d0),_0x2209fa=>{const _0x3ca1cf=_0xe91ae0;$gamePlayer[_0x3ca1cf(0x4c3)]=!![];}),PluginManager['registerCommand'](pluginData['name'],_0xe91ae0(0x416),_0x4717f3=>{const _0x5b07e6=_0xe91ae0;VisuMZ[_0x5b07e6(0x5b7)](_0x4717f3,_0x4717f3);const _0x1c2d21=$gameTemp['getLastPluginCommandInterpreter'](),_0x52d5dc={'template':_0x4717f3['TemplateName'],'mapId':_0x4717f3[_0x5b07e6(0x20f)]||$gameMap[_0x5b07e6(0x55b)](),'eventId':_0x4717f3[_0x5b07e6(0x45f)]||_0x1c2d21[_0x5b07e6(0x247)](),'x':_0x4717f3[_0x5b07e6(0x424)],'y':_0x4717f3[_0x5b07e6(0x4cb)],'spawnPreserved':_0x4717f3[_0x5b07e6(0x2e7)],'spawnEventId':$gameMap[_0x5b07e6(0x350)]['length']+0x3e8},_0x541535=_0x4717f3[_0x5b07e6(0x3e1)]||0x0;if(!VisuMZ[_0x5b07e6(0x15c)][_0x52d5dc[_0x5b07e6(0x55b)]]&&_0x52d5dc[_0x5b07e6(0x55b)]!==$gameMap[_0x5b07e6(0x55b)]()){let _0x16ba0d='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x5b07e6(0x54a)](_0x52d5dc['mapId']);_0x16ba0d+=_0x5b07e6(0x30e),_0x16ba0d+=_0x5b07e6(0x26b),_0x16ba0d+=_0x5b07e6(0x478),_0x16ba0d+=_0x5b07e6(0x55f)['format'](_0x52d5dc['mapId']),alert(_0x16ba0d);return;}const _0x1ef0f2=$gameMap['prepareSpawnedEventAtXY'](_0x52d5dc,_0x4717f3[_0x5b07e6(0x2e3)],_0x4717f3['Passability']);_0x541535&&$gameSwitches[_0x5b07e6(0x20a)](_0x541535,!!_0x1ef0f2);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x38f),_0x436229=>{const _0x48d9d8=_0xe91ae0;VisuMZ[_0x48d9d8(0x5b7)](_0x436229,_0x436229);const _0x1afba4=$gameTemp[_0x48d9d8(0x1b5)](),_0x41da80={'template':_0x436229['TemplateName'],'mapId':_0x436229[_0x48d9d8(0x20f)]||$gameMap[_0x48d9d8(0x55b)](),'eventId':_0x436229[_0x48d9d8(0x45f)]||_0x1afba4[_0x48d9d8(0x247)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x436229[_0x48d9d8(0x2e7)],'spawnEventId':$gameMap[_0x48d9d8(0x350)][_0x48d9d8(0x235)]+0x3e8},_0x396593=_0x436229[_0x48d9d8(0x3e1)]||0x0;if(!VisuMZ[_0x48d9d8(0x15c)][_0x41da80['mapId']]&&_0x41da80['mapId']!==$gameMap[_0x48d9d8(0x55b)]()){let _0x5972e6=_0x48d9d8(0x3f4)[_0x48d9d8(0x54a)](_0x41da80[_0x48d9d8(0x55b)]);_0x5972e6+=_0x48d9d8(0x30e),_0x5972e6+=_0x48d9d8(0x26b),_0x5972e6+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5972e6+=_0x48d9d8(0x55f)['format'](_0x41da80['mapId']),alert(_0x5972e6);return;}const _0x2842d1=$gameMap[_0x48d9d8(0x535)](_0x41da80,_0x436229[_0x48d9d8(0x58c)],_0x436229['Collision'],_0x436229[_0x48d9d8(0x1e4)]);_0x396593&&$gameSwitches[_0x48d9d8(0x20a)](_0x396593,!!_0x2842d1);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x50b),_0x493872=>{const _0x64f836=_0xe91ae0;VisuMZ[_0x64f836(0x5b7)](_0x493872,_0x493872);const _0x54ffb8=$gameTemp['getLastPluginCommandInterpreter'](),_0x1bc1de={'template':_0x493872[_0x64f836(0x581)],'mapId':_0x493872['MapId']||$gameMap['mapId'](),'eventId':_0x493872[_0x64f836(0x45f)]||_0x54ffb8[_0x64f836(0x247)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x493872[_0x64f836(0x2e7)],'spawnEventId':$gameMap[_0x64f836(0x350)][_0x64f836(0x235)]+0x3e8},_0xe58e33=_0x493872[_0x64f836(0x3e1)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x1bc1de['mapId']]&&_0x1bc1de[_0x64f836(0x55b)]!==$gameMap[_0x64f836(0x55b)]()){let _0x2751b4=_0x64f836(0x3f4)['format'](_0x1bc1de[_0x64f836(0x55b)]);_0x2751b4+=_0x64f836(0x30e),_0x2751b4+=_0x64f836(0x26b),_0x2751b4+=_0x64f836(0x478),_0x2751b4+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x64f836(0x54a)](_0x1bc1de[_0x64f836(0x55b)]),alert(_0x2751b4);return;}const _0x12bdf6=$gameMap[_0x64f836(0x596)](_0x1bc1de,_0x493872[_0x64f836(0x321)],_0x493872[_0x64f836(0x2e3)],_0x493872[_0x64f836(0x1e4)]);_0xe58e33&&$gameSwitches[_0x64f836(0x20a)](_0xe58e33,!!_0x12bdf6);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x3e9),_0x2342fa=>{const _0x1504fc=_0xe91ae0;VisuMZ['ConvertParams'](_0x2342fa,_0x2342fa);const _0x36c957=$gameTemp[_0x1504fc(0x1b5)]();$gameMap[_0x1504fc(0x5a5)](_0x2342fa['EventID']||_0x36c957['eventId']());}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x18e),_0x204ed5=>{const _0x38f8bd=_0xe91ae0;VisuMZ[_0x38f8bd(0x5b7)](_0x204ed5,_0x204ed5);const _0x1f8cac=_0x204ed5[_0x38f8bd(0x424)],_0x498d2a=_0x204ed5[_0x38f8bd(0x4cb)];$gameMap[_0x38f8bd(0x53e)](_0x1f8cac,_0x498d2a);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x5b2),_0x4467f7=>{const _0x3167da=_0xe91ae0;VisuMZ['ConvertParams'](_0x4467f7,_0x4467f7),$gameMap[_0x3167da(0x56e)](_0x4467f7[_0x3167da(0x58c)]);}),PluginManager['registerCommand'](pluginData[_0xe91ae0(0x531)],_0xe91ae0(0x177),_0x432e7d=>{const _0x29294b=_0xe91ae0;VisuMZ[_0x29294b(0x5b7)](_0x432e7d,_0x432e7d),$gameMap[_0x29294b(0x12e)](_0x432e7d['TerrainTags']);}),PluginManager[_0xe91ae0(0x56d)](pluginData[_0xe91ae0(0x531)],'SpawnEventDespawnEverything',_0x5b3649=>{const _0x1a96a9=_0xe91ae0;VisuMZ['ConvertParams'](_0x5b3649,_0x5b3649),$gameMap[_0x1a96a9(0x5bb)]();}),VisuMZ[_0xe91ae0(0x24e)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0xe91ae0(0x36f)]['onDatabaseLoaded'],Scene_Boot[_0xe91ae0(0x36f)][_0xe91ae0(0x2d3)]=function(){const _0x507665=_0xe91ae0;VisuMZ[_0x507665(0x24e)][_0x507665(0x381)][_0x507665(0x24f)](this),this[_0x507665(0x28c)](),this[_0x507665(0x20e)]();if(VisuMZ[_0x507665(0x24e)]['CustomPageConditions'])VisuMZ['EventsMoveCore'][_0x507665(0x54f)][_0x507665(0x2f0)]();},VisuMZ[_0xe91ae0(0x15c)]=[],VisuMZ[_0xe91ae0(0x301)]={},Scene_Boot[_0xe91ae0(0x36f)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x529c62=_0xe91ae0;if(DataManager['isBattleTest']()||DataManager[_0x529c62(0x367)]())return;const _0x1c12c3=VisuMZ['EventsMoveCore']['Settings'][_0x529c62(0x43c)],_0x4d4f73=_0x1c12c3[_0x529c62(0x219)][_0x529c62(0x232)](0x0);for(const _0x14220a of _0x1c12c3[_0x529c62(0x50d)]){_0x14220a[_0x529c62(0x1f2)]=_0x14220a[_0x529c62(0x1f2)]['toUpperCase']()[_0x529c62(0x41a)](),VisuMZ[_0x529c62(0x301)][_0x14220a[_0x529c62(0x1f2)]]=_0x14220a;if(!_0x4d4f73['includes'](_0x14220a[_0x529c62(0x1d4)]))_0x4d4f73['push'](_0x14220a['MapID']);}for(const _0x154647 of _0x4d4f73){if(VisuMZ['PreloadedMaps'][_0x154647])continue;const _0x3a96ee=_0x529c62(0x2c8)['format'](_0x154647[_0x529c62(0x425)](0x3)),_0x484142=_0x529c62(0x47b)[_0x529c62(0x54a)](_0x154647);DataManager[_0x529c62(0x4d4)](_0x484142,_0x3a96ee),setTimeout(this[_0x529c62(0x218)][_0x529c62(0x42a)](this,_0x154647,_0x484142),0x64);}},Scene_Boot[_0xe91ae0(0x36f)][_0xe91ae0(0x218)]=function(_0x40a829,_0x40ff3b){const _0x3d80a6=_0xe91ae0;window[_0x40ff3b]?(VisuMZ[_0x3d80a6(0x15c)][_0x40a829]=window[_0x40ff3b],window[_0x40ff3b]=undefined):setTimeout(this[_0x3d80a6(0x218)][_0x3d80a6(0x42a)](this,_0x40a829,_0x40ff3b),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0xe91ae0(0x386)]=[],VisuMZ[_0xe91ae0(0x43a)]=[],VisuMZ['RefSwitches']={},VisuMZ[_0xe91ae0(0x1f9)]=[],VisuMZ[_0xe91ae0(0x3bd)]=[],VisuMZ['MapVariables']=[],VisuMZ['RefVariables']={},Scene_Boot[_0xe91ae0(0x36f)][_0xe91ae0(0x20e)]=function(){const _0x1af2a0=_0xe91ae0;for(let _0x541dd1=0x1;_0x541dd1<$dataSystem[_0x1af2a0(0x319)][_0x1af2a0(0x235)];_0x541dd1++){if($dataSystem[_0x1af2a0(0x319)][_0x541dd1]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x1af2a0(0x44a)][_0x1af2a0(0x17a)](_0x541dd1);if($dataSystem[_0x1af2a0(0x319)][_0x541dd1][_0x1af2a0(0x18c)](/<SELF>/i))VisuMZ[_0x1af2a0(0x386)]['push'](_0x541dd1);if($dataSystem[_0x1af2a0(0x319)][_0x541dd1][_0x1af2a0(0x18c)](/<MAP>/i))VisuMZ['MapSwitches'][_0x1af2a0(0x17a)](_0x541dd1);if($dataSystem['switches'][_0x541dd1][_0x1af2a0(0x18c)](/\(\((.*)\)\)/i)){const _0x44c6ac=String(RegExp['$1'])[_0x1af2a0(0x36b)]()[_0x1af2a0(0x41a)]();VisuMZ[_0x1af2a0(0x1f6)][_0x44c6ac]=_0x541dd1;}else{if($dataSystem[_0x1af2a0(0x319)][_0x541dd1]['match'](/\（\（(.*)\）\）/i)){const _0x4b28f6=String(RegExp['$1'])[_0x1af2a0(0x36b)]()[_0x1af2a0(0x41a)]();VisuMZ['RefSwitches'][_0x4b28f6]=_0x541dd1;}}}for(let _0x30331c=0x1;_0x30331c<$dataSystem[_0x1af2a0(0x3c1)][_0x1af2a0(0x235)];_0x30331c++){if($dataSystem[_0x1af2a0(0x3c1)][_0x30331c]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x1af2a0(0x17a)](_0x30331c);if($dataSystem['variables'][_0x30331c][_0x1af2a0(0x18c)](/<SELF>/i))VisuMZ[_0x1af2a0(0x3bd)][_0x1af2a0(0x17a)](_0x30331c);if($dataSystem[_0x1af2a0(0x3c1)][_0x30331c][_0x1af2a0(0x18c)](/<MAP>/i))VisuMZ[_0x1af2a0(0x2f4)]['push'](_0x30331c);if($dataSystem[_0x1af2a0(0x3c1)][_0x30331c][_0x1af2a0(0x18c)](/\(\((.*)\)\)/i)){const _0x5b1429=String(RegExp['$1'])[_0x1af2a0(0x36b)]()[_0x1af2a0(0x41a)]();VisuMZ['RefVariables'][_0x5b1429]=_0x30331c;}else{if($dataSystem[_0x1af2a0(0x3c1)][_0x30331c][_0x1af2a0(0x18c)](/\（\（(.*)\）\）/i)){const _0x1a6106=String(RegExp['$1'])[_0x1af2a0(0x36b)]()['trim']();VisuMZ[_0x1af2a0(0x2a1)][_0x1a6106]=_0x30331c;}}}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x54f)]={},VisuMZ[_0xe91ae0(0x24e)]['CustomPageConditions'][_0xe91ae0(0x2f0)]=function(){const _0x45a04d=_0xe91ae0;this['_interpreter']=new Game_CPCInterpreter(),this[_0x45a04d(0x318)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x54f)]['determineCommonEventsWithCPC']=function(){const _0xcf5476=_0xe91ae0;this[_0xcf5476(0x46f)]=[];for(const _0x4f4eef of $dataCommonEvents){if(!_0x4f4eef)continue;VisuMZ['EventsMoveCore'][_0xcf5476(0x54f)][_0xcf5476(0x379)](_0x4f4eef);if(_0x4f4eef[_0xcf5476(0x577)][_0xcf5476(0x235)]>0x0)this[_0xcf5476(0x46f)][_0xcf5476(0x17a)](_0x4f4eef['id']);}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x54f)][_0xe91ae0(0x430)]=function(_0x40022b,_0x4e8210,_0x3afbed){const _0xc912fe=_0xe91ae0;return this['_interpreter'][_0xc912fe(0x15b)](_0x40022b,_0x4e8210),_0x3afbed?this[_0xc912fe(0x21b)][_0xc912fe(0x151)](_0x3afbed):this[_0xc912fe(0x21b)][_0xc912fe(0x1a2)](),this[_0xc912fe(0x21b)]['_cpc'];},VisuMZ[_0xe91ae0(0x24e)]['CustomPageConditions'][_0xe91ae0(0x379)]=function(_0x44df6e){const _0x20cad9=_0xe91ae0;let _0xac2cbf=![];_0x44df6e[_0x20cad9(0x577)]=[];for(const _0x47e80f of _0x44df6e[_0x20cad9(0x22b)]){if([0x6c,0x198][_0x20cad9(0x575)](_0x47e80f[_0x20cad9(0x497)])){const _0x540841=_0x47e80f[_0x20cad9(0x3f0)][0x0];if(_0x540841[_0x20cad9(0x18c)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0xac2cbf=!![];else _0x540841['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0xac2cbf=![]);}_0xac2cbf&&_0x44df6e[_0x20cad9(0x577)][_0x20cad9(0x17a)](_0x47e80f);}},getSelfSwitchValue=function(_0x18aa30,_0x57e3b7,_0x14cdbd){const _0x556dcb=_0xe91ae0;let _0x54df81=[_0x18aa30,_0x57e3b7,_0x556dcb(0x35c)[_0x556dcb(0x54a)](_0x14cdbd)];return typeof _0x14cdbd===_0x556dcb(0x13a)&&(_0x54df81=[_0x18aa30,_0x57e3b7,_0x14cdbd[_0x556dcb(0x36b)]()['trim']()]),$gameSelfSwitches['value'](_0x54df81);},getMapSwitchValue=function(_0x361d2a,_0x59530d){const _0x4de2ff=_0xe91ae0;let _0x26a477=[0x0,0x0,_0x4de2ff(0x388)[_0x4de2ff(0x54a)](_0x361d2a,_0x59530d)];return $gameSelfSwitches[_0x4de2ff(0x46a)](_0x26a477);},getMapVariableValue=function(_0x1413a1,_0x3b6486){const _0x18b320=_0xe91ae0;let _0x1b10cf=[0x0,0x0,_0x18b320(0x2cf)['format'](_0x1413a1,_0x3b6486)];return $gameSelfSwitches[_0x18b320(0x46a)](_0x1b10cf);},getSelfVariableValue=function(_0xd8d10d,_0x16b9e6,_0x2b6b00){const _0x4f0716=_0xe91ae0,_0x5cdcf8=[_0xd8d10d,_0x16b9e6,_0x4f0716(0x370)[_0x4f0716(0x54a)](_0x2b6b00)];return $gameSelfSwitches[_0x4f0716(0x46a)](_0x5cdcf8);},setSelfSwitchValue=function(_0x11b89c,_0x31059f,_0x2e9bfd,_0x59627e){const _0x18861b=_0xe91ae0;let _0xfc466=[_0x11b89c,_0x31059f,'Self\x20Switch\x20%1'[_0x18861b(0x54a)](_0x2e9bfd)];typeof _0x2e9bfd===_0x18861b(0x13a)&&(_0xfc466=[_0x11b89c,_0x31059f,_0x2e9bfd['toUpperCase']()[_0x18861b(0x41a)]()]),$gameSelfSwitches['setValue'](_0xfc466,_0x59627e);},setSelfVariableValue=function(_0x9baff1,_0x377707,_0x3e27d5,_0x209567){const _0x4802a5=_0xe91ae0,_0x378d4e=[_0x9baff1,_0x377707,_0x4802a5(0x370)[_0x4802a5(0x54a)](_0x3e27d5)];$gameSelfSwitches[_0x4802a5(0x20a)](_0x378d4e,_0x209567);},setMapSwitchValue=function(_0x529ff0,_0x2efacf,_0x3a9878){const _0x16cdbd=_0xe91ae0;let _0x3ffe9c=[0x0,0x0,_0x16cdbd(0x388)[_0x16cdbd(0x54a)](_0x529ff0,_0x2efacf)];$gameSelfSwitches['setValue'](_0x3ffe9c,_0x3a9878);},setMapVariableValue=function(_0x1e0e48,_0x5e0f92,_0x2ea31b){const _0x5797a5=_0xe91ae0;let _0x2c7896=[0x0,0x0,_0x5797a5(0x2cf)[_0x5797a5(0x54a)](_0x1e0e48,_0x5e0f92)];$gameSelfSwitches[_0x5797a5(0x20a)](_0x2c7896,_0x2ea31b);},DataManager[_0xe91ae0(0x489)]=function(_0xf34fd0){const _0x14990a=_0xe91ae0;if(SceneManager['_scene'][_0x14990a(0xf3)]===Scene_Debug)return![];return VisuMZ[_0x14990a(0x44a)]['includes'](_0xf34fd0);},DataManager[_0xe91ae0(0x57e)]=function(_0x5875c5){const _0x220ade=_0xe91ae0;if(SceneManager['_scene'][_0x220ade(0xf3)]===Scene_Debug)return![];return VisuMZ[_0x220ade(0x1f9)][_0x220ade(0x575)](_0x5875c5);},DataManager[_0xe91ae0(0x1f7)]=function(_0x355186){const _0x32f5bc=_0xe91ae0;if(SceneManager['_scene'][_0x32f5bc(0xf3)]===Scene_Debug)return![];return VisuMZ[_0x32f5bc(0x386)]['includes'](_0x355186);},DataManager[_0xe91ae0(0x544)]=function(_0x44f969){const _0x1d817e=_0xe91ae0;if(SceneManager[_0x1d817e(0xf5)][_0x1d817e(0xf3)]===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x1d817e(0x575)](_0x44f969);},DataManager[_0xe91ae0(0x332)]=function(_0x595a73){const _0x5216c4=_0xe91ae0;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x5216c4(0x43a)][_0x5216c4(0x575)](_0x595a73);},DataManager[_0xe91ae0(0x418)]=function(_0x3e4c1b){const _0xd1bbbe=_0xe91ae0;if(BattleManager[_0xd1bbbe(0x352)]())return![];return VisuMZ['MapVariables'][_0xd1bbbe(0x575)](_0x3e4c1b);},ImageManager[_0xe91ae0(0x211)]=function(_0x1ba1d6){const _0x54e3b8=_0xe91ae0;return _0x1ba1d6[_0x54e3b8(0x18c)](/\[INV(?:|ISIBLE)\]/i);},SceneManager['isSceneMap']=function(){const _0x20d8ac=_0xe91ae0;return this[_0x20d8ac(0xf5)]&&this[_0x20d8ac(0xf5)][_0x20d8ac(0xf3)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x56ad6b=_0xe91ae0;return this[_0x56ad6b(0xf5)]&&this[_0x56ad6b(0xf5)]instanceof Scene_Map;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3fc)]=Game_Temp['prototype']['setDestination'],Game_Temp[_0xe91ae0(0x36f)][_0xe91ae0(0x1b4)]=function(_0x284e62,_0x3e2835){const _0x17eea2=_0xe91ae0;if(this['isEventClickTriggered'](_0x284e62,_0x3e2835))return;VisuMZ[_0x17eea2(0x24e)][_0x17eea2(0x3fc)][_0x17eea2(0x24f)](this,_0x284e62,_0x3e2835);},Game_Temp[_0xe91ae0(0x36f)]['isEventClickTriggered']=function(_0x452198,_0xbfabe7){const _0x2429ac=_0xe91ae0,_0x57cb09=$gameMap[_0x2429ac(0x50e)](_0x452198,_0xbfabe7);for(const _0x53bbc5 of _0x57cb09){if(_0x53bbc5&&_0x53bbc5[_0x2429ac(0x2f6)]())return _0x53bbc5['onClickTrigger'](),!![];}return TouchInput['isLongPressed']()&&_0x57cb09[_0x2429ac(0x235)]>0x0&&_0x57cb09['some'](_0x1258ca=>_0x1258ca&&_0x1258ca[_0x2429ac(0x267)]())&&TouchInput[_0x2429ac(0xfe)](),![];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x267)]=function(){const _0x57d37c=_0xe91ae0;if(this[_0x57d37c(0x1ee)])return![];if(!this[_0x57d37c(0xd9)]())return![];if(!this['list']())return![];let _0x55db09=this[_0x57d37c(0x22b)]()['clone']();return _0x55db09=_0x55db09[_0x57d37c(0x3d1)](_0x865fe3=>![0x0,0x6c,0x198][_0x57d37c(0x575)](_0x865fe3['code'])),_0x55db09[_0x57d37c(0x235)]>0x0;},Game_Temp['prototype'][_0xe91ae0(0x3d6)]=function(_0x4ae0ff){const _0x3b2ac8=_0xe91ae0;this[_0x3b2ac8(0x584)]=_0x4ae0ff;},Game_Temp[_0xe91ae0(0x36f)][_0xe91ae0(0x1b5)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0xe91ae0(0x36f)][_0xe91ae0(0x3ab)]=function(_0x280344){this['_selfTarget']=_0x280344;},Game_Temp[_0xe91ae0(0x36f)]['clearSelfTarget']=function(){const _0x543708=_0xe91ae0;this[_0x543708(0xd8)]=undefined;},Game_Temp[_0xe91ae0(0x36f)]['getSelfTarget']=function(){const _0x208b4b=_0xe91ae0;return this[_0x208b4b(0xd8)];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x5ba)]=Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)],Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)]=function(){const _0x2184ef=_0xe91ae0;VisuMZ['EventsMoveCore'][_0x2184ef(0x5ba)]['call'](this),this['initEventsMoveCore'](),this['initFollowerController']();},Game_System['prototype'][_0xe91ae0(0x2ac)]=function(){const _0x4615e0=_0xe91ae0;this[_0x4615e0(0x15f)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x4615e0(0x5ae)]=[],this[_0x4615e0(0x2aa)]={},this[_0x4615e0(0x2c3)]={},this[_0x4615e0(0x1cf)]=![],this[_0x4615e0(0x2d2)]=_0x4615e0(0x226);},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2ee)]=function(){const _0x51288f=_0xe91ae0;if(this[_0x51288f(0x15f)]===undefined)this[_0x51288f(0x2ac)]();if(this[_0x51288f(0x15f)][_0x51288f(0x26a)]===undefined)this[_0x51288f(0x2ac)]();return this['_EventsMoveCoreSettings'][_0x51288f(0x26a)];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x59a)]=function(_0x1849ef){const _0x4fd416=_0xe91ae0;if(this[_0x4fd416(0x15f)]===undefined)this[_0x4fd416(0x2ac)]();if(this[_0x4fd416(0x15f)][_0x4fd416(0x26a)]===undefined)this['initEventsMoveCore']();this[_0x4fd416(0x15f)][_0x4fd416(0x26a)]=_0x1849ef;},Game_System['prototype']['isAllowEventAutoMovement']=function(){const _0x143609=_0xe91ae0;if(this[_0x143609(0x15f)]===undefined)this[_0x143609(0x2ac)]();if(this['_EventsMoveCoreSettings'][_0x143609(0x42e)]===undefined)this['initEventsMoveCore']();return this[_0x143609(0x15f)][_0x143609(0x42e)];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x23c)]=function(_0x3bb60a){const _0x59e948=_0xe91ae0;if(this[_0x59e948(0x15f)]===undefined)this[_0x59e948(0x2ac)]();if(this[_0x59e948(0x15f)][_0x59e948(0x42e)]===undefined)this[_0x59e948(0x2ac)]();this[_0x59e948(0x15f)]['EventAutoMovement']=_0x3bb60a;},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x5af)]=function(){const _0xb086ae=_0xe91ae0;if(this[_0xb086ae(0x15f)]===undefined)this[_0xb086ae(0x2ac)]();if(this[_0xb086ae(0x15f)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();return this[_0xb086ae(0x15f)][_0xb086ae(0x574)];},Game_System[_0xe91ae0(0x36f)]['setEventLabelsVisible']=function(_0x195682){const _0x20d9a2=_0xe91ae0;if(this['_EventsMoveCoreSettings']===undefined)this[_0x20d9a2(0x2ac)]();if(this[_0x20d9a2(0x15f)][_0x20d9a2(0x574)]===undefined)this[_0x20d9a2(0x2ac)]();this[_0x20d9a2(0x15f)]['VisibleEventLabels']=_0x195682;},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x334)]=function(){const _0x23b71a=_0xe91ae0;return this[_0x23b71a(0x1cf)]===undefined&&(this[_0x23b71a(0x1cf)]=![]),this[_0x23b71a(0x1cf)];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x4ff)]=function(_0x5e38a7){const _0x151267=_0xe91ae0;this[_0x151267(0x1cf)]=_0x5e38a7;},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x1ac)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0xe91ae0(0x36f)]['setPlayerDiagonalSetting']=function(_0x30011e){const _0x86e21c=_0xe91ae0;this['_PlayerDiagonalSetting']=String(_0x30011e)[_0x86e21c(0x4a6)]()[_0x86e21c(0x41a)]();},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x4b8)]=function(_0x3f4b8e){const _0x426c5e=_0xe91ae0;if(this[_0x426c5e(0x460)]===undefined)this[_0x426c5e(0x2ac)]();if(!_0x3f4b8e)return null;if(_0x3f4b8e===$gamePlayer)return this[_0x426c5e(0x460)][_0x426c5e(0x3a1)];else{const _0x558aee=VisuMZ['EventsMoveCore']['Settings'],_0x4dc6b8='Map%1-Event%2'[_0x426c5e(0x54a)](_0x3f4b8e[_0x426c5e(0x34f)],_0x3f4b8e[_0x426c5e(0x19b)]);return this[_0x426c5e(0x460)][_0x4dc6b8]=this['_EventIcons'][_0x4dc6b8]||{'iconIndex':0x0,'bufferX':_0x558aee[_0x426c5e(0x4b0)][_0x426c5e(0x193)],'bufferY':_0x558aee[_0x426c5e(0x4b0)][_0x426c5e(0x28a)],'blendMode':_0x558aee[_0x426c5e(0x4b0)][_0x426c5e(0xcc)]},this[_0x426c5e(0x460)][_0x4dc6b8];}},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x14a)]=function(_0x4be36c,_0x52186a,_0x5a6ea3,_0x4109fd,_0x2152c0){const _0x9529cf=_0xe91ae0;if(this[_0x9529cf(0x460)]===undefined)this[_0x9529cf(0x2ac)]();const _0x1a0470=_0x4be36c===$gamePlayer?'Player':'Map%1-Event%2'['format'](_0x4be36c[_0x9529cf(0x34f)],_0x4be36c[_0x9529cf(0x19b)]);this[_0x9529cf(0x460)][_0x1a0470]={'iconIndex':_0x52186a,'bufferX':_0x5a6ea3,'bufferY':_0x4109fd,'blendMode':_0x2152c0};},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x444)]=function(_0x2704dd,_0x372104,_0x1c084e,_0x54af09,_0x36e5e2,_0x5cd83c,_0x14c5b6){const _0x1fc8d2=_0xe91ae0;if(this[_0x1fc8d2(0x460)]===undefined)this[_0x1fc8d2(0x2ac)]();const _0x3cd20e=_0x1fc8d2(0x3a5)['format'](_0x2704dd,_0x372104);this['_EventIcons'][_0x3cd20e]={'iconIndex':_0x1c084e,'forced':_0x14c5b6,'bufferX':_0x54af09,'bufferY':_0x36e5e2,'blendMode':_0x5cd83c};},Game_System['prototype'][_0xe91ae0(0x361)]=function(_0x14e0d9){const _0x4a3d87=_0xe91ae0;if(this[_0x4a3d87(0x460)]===undefined)this[_0x4a3d87(0x2ac)]();if(!_0x14e0d9)return null;_0x14e0d9===$gamePlayer?delete this['_EventIcons'][_0x4a3d87(0x3a1)]:this[_0x4a3d87(0x4bc)](_0x14e0d9['_mapId'],_0x14e0d9[_0x4a3d87(0x19b)]);},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x4bc)]=function(_0x36977d,_0x56398d){const _0x4c9087=_0xe91ae0;if(this[_0x4c9087(0x460)]===undefined)this[_0x4c9087(0x2ac)]();this['setEventIconDataKey'](_0x36977d,_0x56398d,-0x1,0x0,0x0,0x0,![]);},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x187)]=function(_0x1bd020){const _0x5350ac=_0xe91ae0;if(this[_0x5350ac(0x460)]===undefined)this['initEventsMoveCore']();if(!_0x1bd020)return null;_0x1bd020===$gamePlayer?delete this[_0x5350ac(0x460)][_0x5350ac(0x3a1)]:this['resetIconsOnEventsDataKey'](_0x1bd020[_0x5350ac(0x34f)],_0x1bd020[_0x5350ac(0x19b)]);},Game_System['prototype'][_0xe91ae0(0x100)]=function(_0x36be0a,_0x2031ba){const _0x51b7a1=_0xe91ae0;if(this['_EventIcons']===undefined)this[_0x51b7a1(0x2ac)]();const _0x4dd144=_0x51b7a1(0x3a5)[_0x51b7a1(0x54a)](_0x36be0a,_0x2031ba);if(this[_0x51b7a1(0x460)][_0x4dd144]){if(this[_0x51b7a1(0x460)][_0x4dd144]['iconIndex']<0x0)return;if(this[_0x51b7a1(0x460)][_0x4dd144][_0x51b7a1(0x516)])return;}delete this[_0x51b7a1(0x460)][_0x4dd144];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2d6)]=function(_0x2b1ce8,_0x57d2a3){const _0x583844=_0xe91ae0;if(this['_EventIcons']===undefined)this[_0x583844(0x2ac)]();const _0x418604=_0x583844(0x3a5)[_0x583844(0x54a)](_0x2b1ce8,_0x57d2a3);delete this[_0x583844(0x460)][_0x418604];if(_0x2b1ce8!==$gameMap[_0x583844(0x55b)]())return;const _0x2d88b0=$gameMap[_0x583844(0x130)](_0x57d2a3);if(!_0x2d88b0)return;_0x2d88b0[_0x583844(0x1c0)]();},Game_System['prototype'][_0xe91ae0(0x354)]=function(_0x19f182){const _0x4a0af3=_0xe91ae0;if(this[_0x4a0af3(0x2c3)]===undefined)this[_0x4a0af3(0x2ac)]();if(!_0x19f182)return null;const _0x533792=_0x4a0af3(0x3a5)[_0x4a0af3(0x54a)](_0x19f182['_mapId'],_0x19f182[_0x4a0af3(0x19b)]);return this['_SavedEventLocations'][_0x533792];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x1bb)]=function(_0x2235a5){const _0x26c50a=_0xe91ae0;if(this[_0x26c50a(0x2c3)]===undefined)this[_0x26c50a(0x2ac)]();if(!_0x2235a5)return;const _0x773b34=_0x26c50a(0x3a5)[_0x26c50a(0x54a)](_0x2235a5[_0x26c50a(0x34f)],_0x2235a5[_0x26c50a(0x19b)]);this[_0x26c50a(0x2c3)][_0x773b34]={'direction':_0x2235a5[_0x26c50a(0x3c3)](),'x':Math[_0x26c50a(0x583)](_0x2235a5['x']),'y':Math['round'](_0x2235a5['y']),'pageIndex':_0x2235a5[_0x26c50a(0x4fa)],'moveRouteIndex':_0x2235a5[_0x26c50a(0x2f1)]};},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x4bd)]=function(_0x47c4c4){const _0x1bbac3=_0xe91ae0;if(this[_0x1bbac3(0x2c3)]===undefined)this[_0x1bbac3(0x2ac)]();if(!_0x47c4c4)return;this[_0x1bbac3(0x4aa)](_0x47c4c4[_0x1bbac3(0x34f)],_0x47c4c4[_0x1bbac3(0x19b)]);},Game_System['prototype'][_0xe91ae0(0x4aa)]=function(_0x2d9f4f,_0x29d812){const _0x2a444c=_0xe91ae0;if(this[_0x2a444c(0x2c3)]===undefined)this[_0x2a444c(0x2ac)]();const _0x3d6699='Map%1-Event%2'[_0x2a444c(0x54a)](_0x2d9f4f,_0x29d812);delete this[_0x2a444c(0x2c3)][_0x3d6699];},Game_System['prototype'][_0xe91ae0(0x1d9)]=function(_0x1e8adc,_0x5923ed,_0x5c709d,_0x219a41,_0x574a92,_0x4dbc7a,_0x1fb4fc){const _0x5ae39f=_0xe91ae0;if(this[_0x5ae39f(0x2c3)]===undefined)this['initEventsMoveCore']();const _0x235069='Map%1-Event%2'['format'](_0x1e8adc,_0x5923ed);this[_0x5ae39f(0x2c3)][_0x235069]={'direction':_0x574a92,'x':Math['round'](_0x5c709d),'y':Math[_0x5ae39f(0x583)](_0x219a41),'pageIndex':_0x4dbc7a,'moveRouteIndex':_0x1fb4fc};},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2f5)]=function(_0x15fb8d){const _0x1aec4b=_0xe91ae0;if(this[_0x1aec4b(0x2aa)]===undefined)this['initEventsMoveCore']();if(!_0x15fb8d)return;const _0x1087e8='Map%1-Event%2'[_0x1aec4b(0x54a)](_0x15fb8d[_0x1aec4b(0x34f)],_0x15fb8d[_0x1aec4b(0x19b)]);return this['_PreservedEventMorphData'][_0x1087e8];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x474)]=function(_0x2e3efb,_0x2c911a,_0x290a88,_0x54c36d,_0xdd27d9){const _0x2b215e=_0xe91ae0;if(this[_0x2b215e(0x2aa)]===undefined)this['initEventsMoveCore']();const _0x1eaa10='Map%1-Event%2'[_0x2b215e(0x54a)](_0x2e3efb,_0x2c911a);this[_0x2b215e(0x2aa)][_0x1eaa10]={'template':_0x290a88,'mapId':_0x54c36d,'eventId':_0xdd27d9};},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x4c2)]=function(_0x21ac13,_0x5b2042){const _0xf46069=_0xe91ae0;if(this[_0xf46069(0x2aa)]===undefined)this[_0xf46069(0x2ac)]();const _0x55aea5='Map%1-Event%2'[_0xf46069(0x54a)](_0x21ac13,_0x5b2042);delete this[_0xf46069(0x2aa)][_0x55aea5];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x43f)]=function(_0x5acf6c){const _0x26a822=_0xe91ae0;if(this['_MapSpawnedEventData']===undefined)this[_0x26a822(0x2ac)]();return this[_0x26a822(0x5ae)][_0x5acf6c]=this['_MapSpawnedEventData'][_0x5acf6c]||[],this['_MapSpawnedEventData'][_0x5acf6c];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x452)]=function(_0x381be0){const _0x50a813=_0xe91ae0,_0x5d61b1=this['getMapSpawnedEventData'](_0x381be0);for(const _0x392e8c of _0x5d61b1){if(!_0x392e8c)continue;if(_0x392e8c[_0x50a813(0x2c1)])continue;const _0x503a6c=_0x5d61b1[_0x50a813(0x28f)](_0x392e8c);_0x5d61b1[_0x503a6c]=null;}},Game_System[_0xe91ae0(0x36f)]['initFollowerController']=function(){const _0x221a12=_0xe91ae0;this[_0x221a12(0x203)]=0x0,this[_0x221a12(0x328)]=![];},Game_System[_0xe91ae0(0x36f)]['getControlledFollowerID']=function(){const _0x36c4a8=_0xe91ae0;if(this[_0x36c4a8(0x203)]===undefined)this[_0x36c4a8(0x173)]();return this[_0x36c4a8(0x203)];},Game_System['prototype'][_0xe91ae0(0x14b)]=function(_0x8a6f64){const _0x669b95=_0xe91ae0;if(this[_0x669b95(0x203)]===undefined)this[_0x669b95(0x173)]();this[_0x669b95(0x203)]=_0x8a6f64;;},VisuMZ['EventsMoveCore'][_0xe91ae0(0x262)]=Game_Interpreter['prototype'][_0xe91ae0(0x538)],Game_Interpreter['prototype']['character']=function(_0x3360df){const _0x3fb90c=_0xe91ae0;if(!$gameParty['inBattle']()&&_0x3360df<0x0){let _0x46a627=$gameSystem[_0x3fb90c(0x594)]();if(_0x46a627>0x0)return $gamePlayer['followers']()[_0x3fb90c(0x47e)](_0x46a627-0x1);}return VisuMZ[_0x3fb90c(0x24e)][_0x3fb90c(0x262)]['call'](this,_0x3360df);},Game_System['prototype'][_0xe91ae0(0x553)]=function(){const _0x3bec94=_0xe91ae0;if(this['_followerChaseOff']===undefined)this[_0x3bec94(0x173)]();return this[_0x3bec94(0x328)];},Game_System[_0xe91ae0(0x36f)][_0xe91ae0(0x2ae)]=function(_0x481e5c){const _0xeecc0e=_0xe91ae0;if(this['_followerChaseOff']===undefined)this[_0xeecc0e(0x173)]();this[_0xeecc0e(0x328)]=_0x481e5c;;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x19e)]=Game_Followers[_0xe91ae0(0x36f)][_0xe91ae0(0x429)],Game_Followers[_0xe91ae0(0x36f)]['jumpAll']=function(){const _0x2f3bd0=_0xe91ae0;if($gameSystem[_0x2f3bd0(0x553)]())return;VisuMZ[_0x2f3bd0(0x24e)]['Game_Followers_jumpAll'][_0x2f3bd0(0x24f)](this);},VisuMZ[_0xe91ae0(0x24e)]['Game_Timer_initialize']=Game_Timer['prototype'][_0xe91ae0(0x2f0)],Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)]=function(){const _0x1ff04a=_0xe91ae0;VisuMZ[_0x1ff04a(0x24e)][_0x1ff04a(0x4d3)][_0x1ff04a(0x24f)](this),this[_0x1ff04a(0x2ac)]();},Game_Timer['prototype']['initEventsMoveCore']=function(){const _0x207af6=_0xe91ae0;this[_0x207af6(0x273)]=![],this[_0x207af6(0x3d0)]=-0x1,this[_0x207af6(0x3d2)]=0x0;},Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x464)]=function(_0x99e334){const _0x4eb367=_0xe91ae0;if(!_0x99e334)return;if(!this[_0x4eb367(0xfb)])return;if(this[_0x4eb367(0x273)])return;if(this[_0x4eb367(0x4fb)]<=0x0)return;if(this[_0x4eb367(0x3d0)]===undefined)this['initEventsMoveCore']();this[_0x4eb367(0x4fb)]+=this['_speed'],this[_0x4eb367(0x4fb)]<=0x0&&this['onExpire']();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x393)]=Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x4c4)],Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x4c4)]=function(_0x304901){const _0x2ba0ec=_0xe91ae0;VisuMZ['EventsMoveCore'][_0x2ba0ec(0x393)][_0x2ba0ec(0x24f)](this,_0x304901);if(this['_paused']===undefined)this[_0x2ba0ec(0x2ac)]();this[_0x2ba0ec(0x273)]=![];},VisuMZ['EventsMoveCore']['Game_Timer_stop']=Game_Timer['prototype'][_0xe91ae0(0x4f8)],Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x4f8)]=function(){const _0x10cd58=_0xe91ae0;VisuMZ[_0x10cd58(0x24e)]['Game_Timer_stop']['call'](this);if(this[_0x10cd58(0x273)]===undefined)this['initEventsMoveCore']();this[_0x10cd58(0x273)]=![];},Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x2df)]=function(){const _0x489dee=_0xe91ae0;if(this[_0x489dee(0x4fb)]<=0x0)return;this[_0x489dee(0x273)]=!![],this[_0x489dee(0xfb)]=!![];},Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x325)]=function(){const _0x1fbda5=_0xe91ae0;if(this[_0x1fbda5(0x4fb)]<=0x0)return;this[_0x1fbda5(0x273)]=![],this[_0x1fbda5(0xfb)]=!![];},Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x463)]=function(_0x91ee2e){const _0x174c4a=_0xe91ae0;this[_0x174c4a(0x4fb)]=this[_0x174c4a(0x4fb)]||0x0,this[_0x174c4a(0x4fb)]+=_0x91ee2e,this['_working']=!![],this[_0x174c4a(0x4fb)]=Math[_0x174c4a(0x1c4)](0x1,this[_0x174c4a(0x4fb)]);},Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x52a)]=function(_0x248aaf){const _0x24f5f7=_0xe91ae0;this[_0x24f5f7(0x4fb)]=this[_0x24f5f7(0x4fb)]||0x0,this['_frames']=_0x248aaf,this[_0x24f5f7(0xfb)]=!![],this[_0x24f5f7(0x4fb)]=Math[_0x24f5f7(0x1c4)](0x1,this[_0x24f5f7(0x4fb)]);},Game_Timer[_0xe91ae0(0x36f)]['changeSpeed']=function(_0x77f3de){const _0x2edacc=_0xe91ae0;this['_speed']=_0x77f3de,this[_0x2edacc(0xfb)]=!![],_0x77f3de>0x0&&(this['_frames']=Math['max'](this[_0x2edacc(0x4fb)],0x1));},Game_Timer[_0xe91ae0(0x36f)]['setCommonEvent']=function(_0x2d7f55){const _0x18baaf=_0xe91ae0;if(this[_0x18baaf(0x3d2)]===undefined)this[_0x18baaf(0x2ac)]();this['_expireCommonEvent']=_0x2d7f55;},VisuMZ[_0xe91ae0(0x24e)]['Game_Timer_onExpire']=Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x19a)],Game_Timer[_0xe91ae0(0x36f)][_0xe91ae0(0x19a)]=function(){const _0x2de493=_0xe91ae0;if(this['_expireCommonEvent']===undefined)this['initEventsMoveCore']();this[_0x2de493(0x3d2)]?$gameTemp[_0x2de493(0x21e)](this[_0x2de493(0x3d2)]):VisuMZ[_0x2de493(0x24e)]['Game_Timer_onExpire'][_0x2de493(0x24f)](this);},VisuMZ['EventsMoveCore']['Game_Message_add']=Game_Message[_0xe91ae0(0x36f)][_0xe91ae0(0x385)],Game_Message['prototype'][_0xe91ae0(0x385)]=function(_0x3a2f25){const _0x4ee05a=_0xe91ae0;VisuMZ[_0x4ee05a(0x24e)][_0x4ee05a(0x2e4)][_0x4ee05a(0x24f)](this,_0x3a2f25),this[_0x4ee05a(0x523)]=$gameTemp[_0x4ee05a(0x562)]();},Game_Message[_0xe91ae0(0x36f)]['registerSelfEvent']=function(){$gameTemp['registerSelfTarget'](this['_selfEvent']);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1d1)]=Game_Switches[_0xe91ae0(0x36f)][_0xe91ae0(0x46a)],Game_Switches['prototype'][_0xe91ae0(0x46a)]=function(_0x4ff3a9){const _0x188b0a=_0xe91ae0;typeof _0x4ff3a9===_0x188b0a(0x13a)&&(_0x4ff3a9=VisuMZ[_0x188b0a(0x1f6)][_0x4ff3a9[_0x188b0a(0x36b)]()[_0x188b0a(0x41a)]()]||0x1);if(DataManager[_0x188b0a(0x489)](_0x4ff3a9))return!!this[_0x188b0a(0x366)](_0x4ff3a9);else{if(DataManager[_0x188b0a(0x1f7)](_0x4ff3a9))return!!this[_0x188b0a(0x22c)](_0x4ff3a9);else return DataManager[_0x188b0a(0x332)](_0x4ff3a9)?!!this[_0x188b0a(0x2c2)](_0x4ff3a9):VisuMZ[_0x188b0a(0x24e)][_0x188b0a(0x1d1)]['call'](this,_0x4ff3a9);}},Game_Switches['advancedFunc']={},Game_Switches[_0xe91ae0(0x36f)]['advancedValue']=function(_0x4cf7aa){const _0x598337=_0xe91ae0;if(!Game_Switches[_0x598337(0x2f3)][_0x4cf7aa]){$dataSystem[_0x598337(0x319)][_0x4cf7aa]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3db1f1='return\x20%1'['format'](String(RegExp['$1']));Game_Switches[_0x598337(0x2f3)][_0x4cf7aa]=new Function(_0x598337(0x456),_0x3db1f1);}const _0x359ad7=$gameTemp[_0x598337(0x562)]()||this;return Game_Switches[_0x598337(0x2f3)][_0x4cf7aa]['call'](_0x359ad7,_0x4cf7aa);},Game_Switches[_0xe91ae0(0x36f)][_0xe91ae0(0x22c)]=function(_0x4f9079){const _0x1cef0e=_0xe91ae0,_0x34bcb6=$gameTemp['getSelfTarget']()||this;if(_0x34bcb6[_0x1cef0e(0xf3)]!==Game_Event)return VisuMZ[_0x1cef0e(0x24e)]['Game_Switches_value'][_0x1cef0e(0x24f)](this,_0x4f9079);else{const _0x3fbeba=[_0x34bcb6[_0x1cef0e(0x34f)],_0x34bcb6[_0x1cef0e(0x19b)],'Self\x20Switch\x20%1'[_0x1cef0e(0x54a)](_0x4f9079)];return $gameSelfSwitches['value'](_0x3fbeba);}},Game_Switches[_0xe91ae0(0x36f)][_0xe91ae0(0x2c2)]=function(_0x5e257d){const _0x22b2c2=_0xe91ae0,_0x39e005=$gameMap?$gameMap['mapId']():0x0,_0x2bf509=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x22b2c2(0x54a)](_0x39e005,_0x5e257d)];return $gameSelfSwitches['value'](_0x2bf509);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1ad)]=Game_Switches[_0xe91ae0(0x36f)]['setValue'],Game_Switches[_0xe91ae0(0x36f)][_0xe91ae0(0x20a)]=function(_0x391315,_0x702969){const _0x4242b7=_0xe91ae0;typeof _0x391315==='string'&&(_0x391315=VisuMZ[_0x4242b7(0x1f6)][_0x391315[_0x4242b7(0x36b)]()[_0x4242b7(0x41a)]()]||0x1);if(DataManager[_0x4242b7(0x1f7)](_0x391315))this[_0x4242b7(0x34b)](_0x391315,_0x702969);else DataManager['isMapSwitch'](_0x391315)?this['setMapValue'](_0x391315,_0x702969):VisuMZ[_0x4242b7(0x24e)][_0x4242b7(0x1ad)][_0x4242b7(0x24f)](this,_0x391315,_0x702969);},Game_Switches[_0xe91ae0(0x36f)]['setSelfValue']=function(_0x5b8d38,_0x3e59d5){const _0x1c67f1=_0xe91ae0,_0x2f7daf=$gameTemp['getSelfTarget']()||this;if(_0x2f7daf[_0x1c67f1(0xf3)]!==Game_Event)VisuMZ[_0x1c67f1(0x24e)][_0x1c67f1(0x1ad)][_0x1c67f1(0x24f)](this,_0x5b8d38,_0x3e59d5);else{const _0x1f8753=[_0x2f7daf[_0x1c67f1(0x34f)],_0x2f7daf['_eventId'],_0x1c67f1(0x35c)[_0x1c67f1(0x54a)](_0x5b8d38)];$gameSelfSwitches[_0x1c67f1(0x20a)](_0x1f8753,_0x3e59d5);}},Game_Switches[_0xe91ae0(0x36f)]['setMapValue']=function(_0x458c85,_0x5392a4){const _0x3cf571=_0xe91ae0,_0x5c40a7=$gameMap?$gameMap[_0x3cf571(0x55b)]():0x0,_0x475ed5=[0x0,0x0,_0x3cf571(0x388)[_0x3cf571(0x54a)](_0x5c40a7,_0x458c85)];return $gameSelfSwitches['setValue'](_0x475ed5,_0x5392a4);},VisuMZ[_0xe91ae0(0x24e)]['Game_Variables_value']=Game_Variables[_0xe91ae0(0x36f)][_0xe91ae0(0x46a)],Game_Variables[_0xe91ae0(0x36f)]['value']=function(_0x3144a4){const _0x54c7f7=_0xe91ae0;typeof _0x3144a4===_0x54c7f7(0x13a)&&(_0x3144a4=VisuMZ['RefVariables'][switchId[_0x54c7f7(0x36b)]()[_0x54c7f7(0x41a)]()]||0x1);if(DataManager['isAdvancedVariable'](_0x3144a4))return this['advancedValue'](_0x3144a4);else{if(DataManager[_0x54c7f7(0x544)](_0x3144a4))return this[_0x54c7f7(0x22c)](_0x3144a4);else return DataManager[_0x54c7f7(0x418)](_0x3144a4)?this[_0x54c7f7(0x2c2)](_0x3144a4):VisuMZ[_0x54c7f7(0x24e)][_0x54c7f7(0xfa)][_0x54c7f7(0x24f)](this,_0x3144a4);}},Game_Variables[_0xe91ae0(0x2f3)]={},Game_Variables[_0xe91ae0(0x36f)][_0xe91ae0(0x366)]=function(_0x52f5f8){const _0x158af0=_0xe91ae0;if(!Game_Variables[_0x158af0(0x2f3)][_0x52f5f8]){$dataSystem[_0x158af0(0x3c1)][_0x52f5f8][_0x158af0(0x18c)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1f0a30='return\x20%1'[_0x158af0(0x54a)](String(RegExp['$1']));Game_Variables[_0x158af0(0x2f3)][_0x52f5f8]=new Function(_0x158af0(0x21c),_0x1f0a30);}const _0x7c89e3=$gameTemp[_0x158af0(0x562)]()||this;return Game_Variables['advancedFunc'][_0x52f5f8][_0x158af0(0x24f)](_0x7c89e3,_0x52f5f8);},Game_Variables[_0xe91ae0(0x36f)][_0xe91ae0(0x22c)]=function(_0x237f13){const _0x2bae82=_0xe91ae0,_0x5b2c62=$gameTemp[_0x2bae82(0x562)]()||this;if(_0x5b2c62[_0x2bae82(0xf3)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x2bae82(0xfa)]['call'](this,_0x237f13);else{const _0x4ef706=[_0x5b2c62[_0x2bae82(0x34f)],_0x5b2c62[_0x2bae82(0x19b)],_0x2bae82(0x370)[_0x2bae82(0x54a)](_0x237f13)];return $gameSelfSwitches[_0x2bae82(0x46a)](_0x4ef706);}},Game_Variables[_0xe91ae0(0x36f)][_0xe91ae0(0x2c2)]=function(_0x53bee4){const _0x589481=_0xe91ae0,_0x3877c2=$gameMap?$gameMap['mapId']():0x0,_0x10499a=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x589481(0x54a)](_0x3877c2,_0x53bee4)];return $gameSelfSwitches[_0x589481(0x46a)](_0x10499a)||0x0;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x168)]=Game_Variables['prototype'][_0xe91ae0(0x20a)],Game_Variables[_0xe91ae0(0x36f)]['setValue']=function(_0x423878,_0x1b6764){const _0x397920=_0xe91ae0;typeof _0x423878===_0x397920(0x13a)&&(_0x423878=VisuMZ['RefVariables'][switchId[_0x397920(0x36b)]()['trim']()]||0x1);if(DataManager[_0x397920(0x544)](_0x423878))this['setSelfValue'](_0x423878,_0x1b6764);else DataManager[_0x397920(0x418)](_0x423878)?this[_0x397920(0x2cb)](_0x423878,_0x1b6764):VisuMZ['EventsMoveCore'][_0x397920(0x168)][_0x397920(0x24f)](this,_0x423878,_0x1b6764);},Game_Variables[_0xe91ae0(0x36f)][_0xe91ae0(0x34b)]=function(_0x9d0b3c,_0x41c946){const _0x1ebc2f=_0xe91ae0,_0x4c0b65=$gameTemp[_0x1ebc2f(0x562)]()||this;if(_0x4c0b65[_0x1ebc2f(0xf3)]!==Game_Event)VisuMZ['EventsMoveCore']['Game_Variables_setValue']['call'](this,_0x9d0b3c,_0x41c946);else{const _0x6ff126=[_0x4c0b65['_mapId'],_0x4c0b65[_0x1ebc2f(0x19b)],_0x1ebc2f(0x370)[_0x1ebc2f(0x54a)](_0x9d0b3c)];$gameSelfSwitches['setValue'](_0x6ff126,_0x41c946);}},Game_Variables[_0xe91ae0(0x36f)]['setMapValue']=function(_0x54d560,_0x21816b){const _0x283fd5=_0xe91ae0,_0x2750ab=$gameMap?$gameMap['mapId']():0x0,_0x197de7=[0x0,0x0,_0x283fd5(0x2cf)[_0x283fd5(0x54a)](_0x2750ab,_0x54d560)];$gameSelfSwitches[_0x283fd5(0x20a)](_0x197de7,_0x21816b);},VisuMZ[_0xe91ae0(0x24e)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0xe91ae0(0x36f)][_0xe91ae0(0x46a)],Game_SelfSwitches[_0xe91ae0(0x36f)]['value']=function(_0x6cad5c){const _0x5b400e=_0xe91ae0;if(_0x6cad5c[0x2]['match'](/(?:SELF|MAP)/i))return this[_0x5b400e(0x22c)](_0x6cad5c);else{return VisuMZ['EventsMoveCore'][_0x5b400e(0xcb)][_0x5b400e(0x24f)](this,_0x6cad5c);;}},Game_SelfSwitches[_0xe91ae0(0x36f)][_0xe91ae0(0x22c)]=function(_0x57d112){const _0x5b2dfc=_0xe91ae0;return _0x57d112[0x2]['match'](/VAR/i)?this[_0x5b2dfc(0x501)][_0x57d112]||0x0:!!this[_0x5b2dfc(0x501)][_0x57d112];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x522)]=Game_SelfSwitches['prototype']['setValue'],Game_SelfSwitches[_0xe91ae0(0x36f)][_0xe91ae0(0x20a)]=function(_0x503754,_0x7a1584){const _0x2fd4b1=_0xe91ae0;_0x503754[0x2]['match'](/(?:SELF|MAP)/i)?this[_0x2fd4b1(0x34b)](_0x503754,_0x7a1584):VisuMZ['EventsMoveCore'][_0x2fd4b1(0x522)][_0x2fd4b1(0x24f)](this,_0x503754,_0x7a1584);},Game_SelfSwitches['prototype'][_0xe91ae0(0x34b)]=function(_0x4b46eb,_0x84dcc7){const _0x4179f3=_0xe91ae0;this['_data'][_0x4b46eb]=_0x4b46eb[0x2][_0x4179f3(0x18c)](/VAR/i)?_0x84dcc7:!!_0x84dcc7,this[_0x4179f3(0x4f7)]();},VisuMZ['EventsMoveCore']['Scene_Map_createDisplayObjects']=Scene_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x38b)],Scene_Map['prototype'][_0xe91ae0(0x38b)]=function(){const _0x2d3711=_0xe91ae0;$gameMap['resetExitSelfSwitches'](),VisuMZ['EventsMoveCore'][_0x2d3711(0x3d7)][_0x2d3711(0x24f)](this);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x35d)]=function(){const _0xb3a1d2=_0xe91ae0;if(this[_0xb3a1d2(0x12c)]===this['mapId']())return;this['_lastSesetExitSelfSwitchesMapId']=this[_0xb3a1d2(0x55b)](),this['_eventCache']=undefined;const _0x15d4c9=this[_0xb3a1d2(0x45b)]();for(const _0x376ca3 of _0x15d4c9){if(_0x376ca3)$gameSelfSwitches[_0xb3a1d2(0x598)](_0x376ca3);}},Game_SelfSwitches[_0xe91ae0(0x36f)]['resetSelfSwitchesForEvent']=function(_0x2eabaa){const _0x191a97=_0xe91ae0;if(!_0x2eabaa)return;if(!_0x2eabaa[_0x191a97(0x130)]())return;const _0x2d500=_0x2eabaa[_0x191a97(0x130)]()[_0x191a97(0x228)]||'';if(_0x2d500[_0x191a97(0x18c)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x57f596=_0x191a97(0x4b1)[_0x191a97(0x54a)]($gameMap[_0x191a97(0x34f)],_0x2eabaa[_0x191a97(0x19b)]),_0x5ef9de=Object['keys'](this[_0x191a97(0x501)])[_0x191a97(0x3d1)](_0x58b4da=>_0x58b4da[_0x191a97(0xe7)](_0x57f596));while(_0x5ef9de['length']>0x0){const _0x517543=_0x5ef9de['shift']();delete this[_0x191a97(0x501)][_0x517543];}}},Game_SelfSwitches[_0xe91ae0(0x36f)]['resetSelfSwitchesForMap']=function(_0x5c7943){const _0x1ceb0c=_0xe91ae0,_0x89e180=_0x1ceb0c(0x277)[_0x1ceb0c(0x54a)]($gameMap[_0x1ceb0c(0x34f)]),_0x23d47c=Object[_0x1ceb0c(0x2e8)](this['_data'])[_0x1ceb0c(0x3d1)](_0x16975a=>_0x16975a[_0x1ceb0c(0xe7)](_0x89e180));while(_0x23d47c['length']>0x0){const _0x31ca0f=_0x23d47c['shift']();delete this[_0x1ceb0c(0x501)][_0x31ca0f];}_0x5c7943===$gameMap['mapId']()&&$gameMap[_0x1ceb0c(0x13b)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x481)]=Game_Enemy[_0xe91ae0(0x36f)][_0xe91ae0(0x539)],Game_Enemy[_0xe91ae0(0x36f)][_0xe91ae0(0x539)]=function(_0x4d92df){const _0x44ff95=_0xe91ae0;$gameTemp[_0x44ff95(0x3ab)](this);const _0x339d5f=VisuMZ[_0x44ff95(0x24e)]['Game_Enemy_meetsSwitchCondition'][_0x44ff95(0x24f)](this,_0x4d92df);return $gameTemp[_0x44ff95(0x4da)](),_0x339d5f;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x128)]=Game_Party['prototype']['hasEncounterHalf'],Game_Party[_0xe91ae0(0x36f)][_0xe91ae0(0x4b9)]=function(){const _0x5d74ce=_0xe91ae0;if(this[_0x5d74ce(0x108)]())return!![];return VisuMZ[_0x5d74ce(0x24e)]['Game_Party_hasEncounterHalf'][_0x5d74ce(0x24f)](this);},Game_Party[_0xe91ae0(0x36f)][_0xe91ae0(0x108)]=function(){const _0x435b48=_0xe91ae0;if(this[_0x435b48(0x1fe)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0xe91ae0(0x24e)]['Game_Party_hasEncounterNone']=Game_Party[_0xe91ae0(0x36f)][_0xe91ae0(0x3bf)],Game_Party[_0xe91ae0(0x36f)][_0xe91ae0(0x3bf)]=function(){const _0x2002cf=_0xe91ae0;if(this[_0x2002cf(0x1ba)]())return!![];return VisuMZ[_0x2002cf(0x24e)][_0x2002cf(0x518)][_0x2002cf(0x24f)](this);},Game_Party[_0xe91ae0(0x36f)][_0xe91ae0(0x1ba)]=function(){const _0x18b6d9=_0xe91ae0;if(this[_0x18b6d9(0x1fe)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x4873f2,_0x2a2697){const _0x352a10=_0xe91ae0;if(!$gameMap)return![];_0x4873f2=Math[_0x352a10(0x583)](_0x4873f2||0x0),_0x2a2697=Math[_0x352a10(0x583)](_0x2a2697||0x0);const _0x55c40a=$gameMap['events']();for(const _0x2bfccc of _0x55c40a){if(!_0x2bfccc)continue;if(_0x2bfccc[_0x352a10(0x202)])continue;const _0x2e9827=_0x2bfccc[_0x352a10(0x392)](!![]),_0xd61114=_0x2bfccc[_0x352a10(0xe3)](!![]);if($gameMap['checkEventProximity'](_0x4873f2,_0x2a2697,_0x2bfccc,_0x2e9827,_0xd61114))return!![];}return![];},$isTileEncounterNone=function(_0x3f8462,_0x30b2c1){const _0x5d3c31=_0xe91ae0;if(!$gameMap)return![];_0x3f8462=Math['round'](_0x3f8462||0x0),_0x30b2c1=Math[_0x5d3c31(0x583)](_0x30b2c1||0x0);const _0x42952f=$gameMap['events']();for(const _0x46480b of _0x42952f){if(!_0x46480b)continue;if(_0x46480b[_0x5d3c31(0x202)])continue;const _0x39cd8e=_0x46480b[_0x5d3c31(0x392)](![]),_0x24ec75=_0x46480b['encounterProximityDistance'](![]);if($gameMap['checkEventProximity'](_0x3f8462,_0x30b2c1,_0x46480b,_0x39cd8e,_0x24ec75))return!![];}return![];};VisuMZ['EventsMoveCore'][_0xe91ae0(0x136)]=Game_Troop[_0xe91ae0(0x36f)][_0xe91ae0(0x296)],Game_Troop['prototype'][_0xe91ae0(0x296)]=function(_0x37f2c3){const _0x492e2b=_0xe91ae0;$gameTemp[_0x492e2b(0x3ab)](this);const _0x154887=VisuMZ[_0x492e2b(0x24e)][_0x492e2b(0x136)][_0x492e2b(0x24f)](this,_0x37f2c3);return $gameTemp[_0x492e2b(0x4da)](),_0x154887;},VisuMZ[_0xe91ae0(0x24e)]['Game_Map_setup']=Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x15b)],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x15b)]=function(_0x2d2eaf){const _0x168e57=_0xe91ae0;this[_0x168e57(0x452)](_0x2d2eaf),this['clearEventCache'](),VisuMZ['EventsMoveCore'][_0x168e57(0x4a9)][_0x168e57(0x24f)](this,_0x2d2eaf),this[_0x168e57(0x275)](),this[_0x168e57(0x405)](),this[_0x168e57(0xfd)](),this['setupSaveEventLocations'](),this[_0x168e57(0x33a)](),this[_0x168e57(0x3be)](),this[_0x168e57(0x445)](),this['processEraseEncounterEvents'](),this[_0x168e57(0x170)](),this[_0x168e57(0x142)](),this['clearEventCache']();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x303)]=Game_Map['prototype'][_0xe91ae0(0x24b)],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x24b)]=function(){const _0x37e556=_0xe91ae0;VisuMZ['EventsMoveCore'][_0x37e556(0x303)][_0x37e556(0x24f)](this),this[_0x37e556(0x4d1)]();},Game_Map[_0xe91ae0(0x24a)]=0xc8,Game_Map['prototype'][_0xe91ae0(0x46c)]=function(){const _0xb3b345=_0xe91ae0,_0x20a666=Game_Map[_0xb3b345(0x24a)];this['_eventOverload']=this[_0xb3b345(0x45b)]()[_0xb3b345(0x235)]>_0x20a666;if(this['_eventOverload']&&$gameTemp[_0xb3b345(0x175)]()){}},Game_Map[_0xe91ae0(0x36f)]['isEventOverloaded']=function(){const _0xc2f19=_0xe91ae0;return this[_0xc2f19(0x3b8)];},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x275)]=function(){const _0x32f5ec=_0xe91ae0;this[_0x32f5ec(0x468)]=undefined;},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x405)]=function(){const _0x42e4df=_0xe91ae0;this['_diagonalSupport']=VisuMZ[_0x42e4df(0x24e)][_0x42e4df(0x477)][_0x42e4df(0xdf)][_0x42e4df(0x38d)];const _0x33ef94=$dataMap[_0x42e4df(0x228)]||'';if(_0x33ef94[_0x42e4df(0x18c)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x42e4df(0x5b9)]=!![];else _0x33ef94[_0x42e4df(0x18c)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x42e4df(0x5b9)]=![]);},Game_Map[_0xe91ae0(0x2f7)]=VisuMZ['EventsMoveCore'][_0xe91ae0(0x477)]['Movement'][_0xe91ae0(0x27e)]??![],Game_Map['prototype'][_0xe91ae0(0x4fc)]=function(){const _0x35256a=_0xe91ae0;if(Utils[_0x35256a(0x1f0)]()){if(!Game_Map[_0x35256a(0x2f7)])return![];}const _0x481e16=$gameSystem['getPlayerDiagonalSetting']();if(_0x481e16==='enable')return!![];if(_0x481e16===_0x35256a(0x294))return![];if(this[_0x35256a(0x5b9)]===undefined)this['setupDiagonalSupport']();return this[_0x35256a(0x5b9)];},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x208)]=function(_0x5ca4cd,_0x26b58b){const _0x497b98=_0xe91ae0;if([0x1,0x4,0x7]['includes'](_0x26b58b))_0x5ca4cd-=0x1;if([0x3,0x6,0x9][_0x497b98(0x575)](_0x26b58b))_0x5ca4cd+=0x1;return this[_0x497b98(0x4ef)](_0x5ca4cd);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x3c7)]=function(_0x1ed691,_0xcae97e){const _0x1c375e=_0xe91ae0;if([0x1,0x2,0x3][_0x1c375e(0x575)](_0xcae97e))_0x1ed691+=0x1;if([0x7,0x8,0x9][_0x1c375e(0x575)](_0xcae97e))_0x1ed691-=0x1;return this[_0x1c375e(0x35b)](_0x1ed691);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x50c)]=function(_0x8d052b,_0x790043,_0x3dec45,_0x2d3890){const _0x25ac08=_0xe91ae0;return Math[_0x25ac08(0x1c4)](Math['abs'](this['deltaX'](_0x8d052b,_0x3dec45)),Math[_0x25ac08(0x500)](this['deltaY'](_0x790043,_0x2d3890)));},Game_Map[_0xe91ae0(0x36f)]['setupRegionRestrictions']=function(){const _0x395bd4=_0xe91ae0,_0x1becbf=VisuMZ['EventsMoveCore'][_0x395bd4(0x477)][_0x395bd4(0x58c)],_0x1d3b85={},_0x284098=['Allow',_0x395bd4(0x414),_0x395bd4(0x16a)],_0x25daa9=[_0x395bd4(0xeb),_0x395bd4(0x2e9),'Player','Event',_0x395bd4(0x260),_0x395bd4(0x11a),_0x395bd4(0x563),_0x395bd4(0x520)];for(const _0x674d70 of _0x284098){for(const _0x4ca9fd of _0x25daa9){const _0x33a58f=_0x395bd4(0x402)[_0x395bd4(0x54a)](_0x4ca9fd,_0x674d70);_0x1becbf[_0x33a58f]&&(_0x1d3b85[_0x33a58f]=_0x1becbf[_0x33a58f][_0x395bd4(0x232)](0x0));}}const _0x21688c=$dataMap[_0x395bd4(0x228)]||'',_0x1bdc74=_0x21688c[_0x395bd4(0x18c)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x1bdc74)for(const _0x6b02dd of _0x1bdc74){_0x6b02dd[_0x395bd4(0x18c)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x1d4e2c=String(RegExp['$1'])[_0x395bd4(0x4a6)]()[_0x395bd4(0x41a)](),_0x527d8e=String(RegExp['$2'])[_0x395bd4(0x4a6)]()['trim']();const _0x5466ed=JSON[_0x395bd4(0x476)]('['+RegExp['$3'][_0x395bd4(0x18c)](/\d+/g)+']');_0x1d4e2c=_0x1d4e2c[_0x395bd4(0x35f)](0x0)[_0x395bd4(0x36b)]()+_0x1d4e2c[_0x395bd4(0x232)](0x1),_0x527d8e=_0x527d8e[_0x395bd4(0x35f)](0x0)[_0x395bd4(0x36b)]()+_0x527d8e['slice'](0x1);const _0x4a1b7f=_0x395bd4(0x402)[_0x395bd4(0x54a)](_0x1d4e2c,_0x527d8e);if(_0x1d3b85[_0x4a1b7f])_0x1d3b85[_0x4a1b7f]=_0x1d3b85[_0x4a1b7f]['concat'](_0x5466ed);}this['_regionRules']=_0x1d3b85;},Game_Map[_0xe91ae0(0x36f)]['isRegionAllowPass']=function(_0x4fdb13,_0x86ef2f,_0x1a484e,_0x1ed63c){const _0x4b6934=_0xe91ae0,_0x4ee4aa=this[_0x4b6934(0x208)](_0x4fdb13,_0x1a484e),_0x523288=this[_0x4b6934(0x3c7)](_0x86ef2f,_0x1a484e),_0x972aa1=this[_0x4b6934(0x3ac)](_0x4ee4aa,_0x523288),_0x52e7c2=this[_0x4b6934(0x358)];if(_0x52e7c2[_0x4b6934(0x4ab)]['includes'](_0x972aa1))return!![];else{if(_0x1ed63c==='player')return _0x52e7c2[_0x4b6934(0x176)][_0x4b6934(0x575)](_0x972aa1)||_0x52e7c2[_0x4b6934(0x23a)][_0x4b6934(0x575)](_0x972aa1);else{if(_0x1ed63c===_0x4b6934(0x130))return _0x52e7c2[_0x4b6934(0x40c)][_0x4b6934(0x575)](_0x972aa1)||_0x52e7c2[_0x4b6934(0x23a)]['includes'](_0x972aa1);else{if(_0x52e7c2[_0x4b6934(0x1a7)][_0x4b6934(0x575)](_0x972aa1))return!![];else{const _0x26777d=_0x4b6934(0x434)[_0x4b6934(0x54a)](_0x1ed63c['charAt'](0x0)[_0x4b6934(0x36b)]()+_0x1ed63c[_0x4b6934(0x232)](0x1));if(_0x52e7c2[_0x26777d])return _0x52e7c2[_0x26777d][_0x4b6934(0x575)](_0x972aa1);}}}}return![];},Game_Map['prototype'][_0xe91ae0(0x188)]=function(_0x582210,_0x2f9eb8,_0x4677dd,_0x2b0bbb){const _0x2a61ae=_0xe91ae0,_0x4903c5=this[_0x2a61ae(0x208)](_0x582210,_0x4677dd),_0x53ffc9=this[_0x2a61ae(0x3c7)](_0x2f9eb8,_0x4677dd),_0x474daa=this[_0x2a61ae(0x3ac)](_0x4903c5,_0x53ffc9),_0x5eac99=this[_0x2a61ae(0x358)];if(_0x5eac99['AllForbid']['includes'](_0x474daa))return!![];else{if(_0x2b0bbb==='player')return _0x5eac99[_0x2a61ae(0x56a)]['includes'](_0x474daa)||_0x5eac99[_0x2a61ae(0x13d)]['includes'](_0x474daa);else{if(_0x2b0bbb===_0x2a61ae(0x130))return _0x5eac99[_0x2a61ae(0x415)][_0x2a61ae(0x575)](_0x474daa)||_0x5eac99[_0x2a61ae(0x13d)][_0x2a61ae(0x575)](_0x474daa);else{if(_0x5eac99['VehicleForbid'][_0x2a61ae(0x575)](_0x474daa))return!![];else{const _0x4a4495=_0x2a61ae(0x511)[_0x2a61ae(0x54a)](_0x2b0bbb[_0x2a61ae(0x35f)](0x0)[_0x2a61ae(0x36b)]()+_0x2b0bbb[_0x2a61ae(0x232)](0x1));if(_0x5eac99[_0x4a4495])return _0x5eac99[_0x4a4495][_0x2a61ae(0x575)](_0x474daa);}}}}return![];},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x470)]=function(_0x30d2d6,_0x551dd5,_0x3c9fc6,_0x7600da){const _0x3dd7ef=_0xe91ae0;_0x3c9fc6=_0x7600da===_0x3dd7ef(0x2cd)?0x5:_0x3c9fc6;const _0x988dd8=this['roundXWithDirection'](_0x30d2d6,_0x3c9fc6),_0x3229cb=this['roundYWithDirection'](_0x551dd5,_0x3c9fc6),_0x48b1bd=this['regionId'](_0x988dd8,_0x3229cb),_0x2390ff=this['_regionRules'];if(_0x2390ff[_0x3dd7ef(0x4b2)][_0x3dd7ef(0x575)](_0x48b1bd))return!![];else{const _0x5a5939=_0x3dd7ef(0x541)[_0x3dd7ef(0x54a)](_0x7600da[_0x3dd7ef(0x35f)](0x0)[_0x3dd7ef(0x36b)]()+_0x7600da[_0x3dd7ef(0x232)](0x1));if(_0x2390ff[_0x5a5939])return _0x2390ff[_0x5a5939][_0x3dd7ef(0x575)](_0x48b1bd);}return![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x59c)]=Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0xe8)],Game_Map['prototype'][_0xe91ae0(0xe8)]=function(){const _0x359a30=_0xe91ae0;VisuMZ[_0x359a30(0x24e)][_0x359a30(0x59c)][_0x359a30(0x24f)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x199)]=function(){const _0x59cd7b=_0xe91ae0;this['_needsPeriodicRefresh']=![];if(this[_0x59cd7b(0x45b)]()[_0x59cd7b(0x20b)](_0x76309a=>_0x76309a['hasAdvancedSwitchVariable']())){this[_0x59cd7b(0x5b8)]=!![];return;}if(this[_0x59cd7b(0x45b)]()[_0x59cd7b(0x20b)](_0x16a2e7=>_0x16a2e7[_0x59cd7b(0x10a)]())){this[_0x59cd7b(0x5b8)]=!![];return;}if(this[_0x59cd7b(0x46f)][_0x59cd7b(0x20b)](_0x5778b7=>_0x5778b7[_0x59cd7b(0x1a5)]())){this[_0x59cd7b(0x5b8)]=!![];return;}if(this[_0x59cd7b(0x46f)]['some'](_0x349032=>_0x349032[_0x59cd7b(0x10a)]())){this[_0x59cd7b(0x5b8)]=!![];return;}},VisuMZ['EventsMoveCore'][_0xe91ae0(0x2b2)]=Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x464)],Game_Map['prototype']['update']=function(_0x289383){const _0xbe9532=_0xe91ae0;this[_0xbe9532(0x560)](),VisuMZ[_0xbe9532(0x24e)]['Game_Map_update'][_0xbe9532(0x24f)](this,_0x289383);},Game_Map['prototype'][_0xe91ae0(0x560)]=function(){const _0x1d5b9e=_0xe91ae0;if(!this[_0x1d5b9e(0x5b8)])return;this[_0x1d5b9e(0x4d2)]=this[_0x1d5b9e(0x4d2)]||0x3c,this[_0x1d5b9e(0x4d2)]--,this[_0x1d5b9e(0x4d2)]<=0x0&&(this[_0x1d5b9e(0x13b)](),this[_0x1d5b9e(0x4d2)]=0x3c);},VisuMZ[_0xe91ae0(0x24e)]['Game_Map_isDashDisabled']=Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x33f)],Game_Map[_0xe91ae0(0x36f)]['isDashDisabled']=function(){const _0x4bd82e=_0xe91ae0;if(!$gameSystem[_0x4bd82e(0x2ee)]())return!![];return VisuMZ['EventsMoveCore']['Game_Map_isDashDisabled'][_0x4bd82e(0x24f)](this);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x4d0)]=function(){const _0x1147f3=_0xe91ae0;this['_saveEventLocations']=![];const _0x46b2c7=$dataMap[_0x1147f3(0x228)]||'';_0x46b2c7[_0x1147f3(0x18c)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x347)]=function(){const _0x181a75=_0xe91ae0;if(this[_0x181a75(0x433)]===undefined)this[_0x181a75(0x4d0)]();return this[_0x181a75(0x433)];},Game_Map['prototype'][_0xe91ae0(0x452)]=function(_0xc97c24){const _0x34b691=_0xe91ae0;_0xc97c24!==this[_0x34b691(0x55b)]()&&$gamePlayer&&$gameSystem[_0x34b691(0x452)](this[_0x34b691(0x55b)]());},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x33a)]=function(){const _0x219f64=_0xe91ae0;this[_0x219f64(0x350)]=$gameSystem[_0x219f64(0x43f)](this[_0x219f64(0x55b)]()),this[_0x219f64(0x394)]=!![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x4f3)]=Game_Map[_0xe91ae0(0x36f)]['events'],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x45b)]=function(){const _0x5cb642=_0xe91ae0;if(this[_0x5cb642(0x468)])return this['_eventCache'];const _0x414c9e=VisuMZ['EventsMoveCore'][_0x5cb642(0x4f3)][_0x5cb642(0x24f)](this),_0x16f551=_0x414c9e[_0x5cb642(0x33c)](this['_spawnedEvents']||[]);return this[_0x5cb642(0x468)]=_0x16f551[_0x5cb642(0x3d1)](_0x4a3383=>!!_0x4a3383),this[_0x5cb642(0x468)];},VisuMZ['EventsMoveCore'][_0xe91ae0(0x4d7)]=Game_Map[_0xe91ae0(0x36f)]['event'],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x130)]=function(_0x4b38b3){const _0x3a4859=_0xe91ae0;return _0x4b38b3>=0x3e8?(_0x4b38b3-=0x3e8,this['_spawnedEvents'][_0x4b38b3]):VisuMZ[_0x3a4859(0x24e)][_0x3a4859(0x4d7)][_0x3a4859(0x24f)](this,_0x4b38b3);},Game_Map['prototype'][_0xe91ae0(0x543)]=function(_0x35259d){const _0x293966=_0xe91ae0,_0x38365a=this[_0x293966(0x130)](_0x35259d);if(_0x38365a)_0x38365a[_0x293966(0x15e)]();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x182)]=function(){const _0x76674=_0xe91ae0,_0x3020d1={'template':_0x76674(0x5bd),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents']['length']+0x3e8};this[_0x76674(0x495)](_0x3020d1);},Game_Map['prototype']['checkExistingEntitiesAt']=function(_0xaf3b85,_0xa7d7d0){const _0xfd3607=_0xe91ae0;if(this[_0xfd3607(0x50e)](_0xaf3b85,_0xa7d7d0)['length']>0x0)return!![];if($gamePlayer['x']===_0xaf3b85&&$gamePlayer['y']===_0xa7d7d0)return!![];if(this[_0xfd3607(0x55c)]()[_0xfd3607(0x11e)](_0xaf3b85,_0xa7d7d0))return!![];if(this[_0xfd3607(0xc7)]()[_0xfd3607(0x11e)](_0xaf3b85,_0xa7d7d0))return!![];return![];},Game_Map['prototype'][_0xe91ae0(0x384)]=function(_0x498f7d,_0x40da65,_0x17fd38){const _0x572ae7=_0xe91ae0;$gameTemp['_spawnData']=_0x498f7d;const _0x232036=new Game_Event(_0x498f7d[_0x572ae7(0x55b)],_0x498f7d[_0x572ae7(0x247)]);$gameTemp[_0x572ae7(0x401)]=undefined,_0x232036[_0x572ae7(0xe8)]();let _0x466359=_0x40da65-_0x232036[_0x572ae7(0x5a9)][_0x572ae7(0xe5)],_0x581673=_0x40da65+_0x232036['_addedHitbox'][_0x572ae7(0x49c)],_0x2b2354=_0x17fd38-_0x232036[_0x572ae7(0x5a9)]['up'],_0x3f0ed1=_0x17fd38+_0x232036['_addedHitbox']['down'];for(let _0x233c3a=_0x466359;_0x233c3a<=_0x581673;_0x233c3a++){for(let _0x1da5f9=_0x2b2354;_0x1da5f9<=_0x3f0ed1;_0x1da5f9++){if(this[_0x572ae7(0x469)](_0x233c3a,_0x1da5f9))return![];}}return!![];},Game_Map[_0xe91ae0(0x36f)]['createSpawnedEventWithData']=function(_0x16f39a){const _0x14f8a2=_0xe91ae0;$gameTemp['_spawnData']=_0x16f39a;const _0x1d559e=new Game_Event(_0x16f39a[_0x14f8a2(0x55b)],_0x16f39a[_0x14f8a2(0x247)]);$gameTemp['_spawnData']=undefined,this[_0x14f8a2(0x350)][_0x14f8a2(0x17a)](_0x1d559e),_0x1d559e[_0x14f8a2(0x55e)](_0x16f39a),this['clearEventCache']();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x32f)]=function(_0x13652b,_0x112f2d,_0x2aa655){const _0x36075b=_0xe91ae0,_0x446a31=_0x13652b[_0x36075b(0x3ef)]['toUpperCase']()[_0x36075b(0x41a)]();if(_0x446a31!==_0x36075b(0x48f)){const _0x240802=VisuMZ[_0x36075b(0x301)][_0x446a31];_0x240802&&(_0x13652b[_0x36075b(0x55b)]=_0x240802[_0x36075b(0x1d4)],_0x13652b[_0x36075b(0x247)]=_0x240802['EventID']);}const _0x145b84=_0x13652b['x'],_0x32fe0b=_0x13652b['y'];if(!this[_0x36075b(0x309)](_0x145b84,_0x32fe0b))return![];if(_0x112f2d){if(this[_0x36075b(0x469)](_0x145b84,_0x32fe0b))return![];if(!this[_0x36075b(0x384)](_0x13652b,_0x145b84,_0x32fe0b))return![];}if(_0x2aa655){if(!this[_0x36075b(0x30a)](_0x145b84,_0x32fe0b))return![];}return this[_0x36075b(0x495)](_0x13652b),!![];},Game_Map[_0xe91ae0(0x36f)]['prepareSpawnedEventAtRegion']=function(_0xc290a1,_0x219d35,_0x48d49f,_0x4abd2b){const _0x419f22=_0xe91ae0,_0x3cc3c1=_0xc290a1[_0x419f22(0x3ef)][_0x419f22(0x36b)]()['trim']();if(_0x3cc3c1!==_0x419f22(0x48f)){const _0x19bf3a=VisuMZ['EventTemplates'][_0x3cc3c1];_0x19bf3a&&(_0xc290a1['mapId']=_0x19bf3a[_0x419f22(0x1d4)],_0xc290a1[_0x419f22(0x247)]=_0x19bf3a[_0x419f22(0x207)]);}const _0x3c3340=[],_0x464bf8=this[_0x419f22(0x1dc)](),_0xf19ab1=this[_0x419f22(0x578)]();for(let _0x118813=0x0;_0x118813<_0x464bf8;_0x118813++){for(let _0xdcc0db=0x0;_0xdcc0db<_0xf19ab1;_0xdcc0db++){if(!_0x219d35['includes'](this[_0x419f22(0x3ac)](_0x118813,_0xdcc0db)))continue;if(!this[_0x419f22(0x309)](_0x118813,_0xdcc0db))continue;if(_0x48d49f){if(this[_0x419f22(0x469)](_0x118813,_0xdcc0db))continue;if(!this[_0x419f22(0x384)](_0xc290a1,_0x118813,_0xdcc0db))continue;}if(_0x4abd2b){if(!this[_0x419f22(0x30a)](_0x118813,_0xdcc0db))continue;}_0x3c3340[_0x419f22(0x17a)]([_0x118813,_0xdcc0db]);}}if(_0x3c3340[_0x419f22(0x235)]>0x0){const _0x51c20=_0x3c3340[Math[_0x419f22(0x441)](_0x3c3340[_0x419f22(0x235)])];return _0xc290a1['x']=_0x51c20[0x0],_0xc290a1['y']=_0x51c20[0x1],this[_0x419f22(0x495)](_0xc290a1),!![];}return![];},Game_Map[_0xe91ae0(0x36f)]['prepareSpawnedEventAtTerrainTag']=function(_0x468b2b,_0x28d6f3,_0x3e7e22,_0x4210d8){const _0x2d11ab=_0xe91ae0,_0x418f4c=_0x468b2b[_0x2d11ab(0x3ef)][_0x2d11ab(0x36b)]()[_0x2d11ab(0x41a)]();if(_0x418f4c!=='UNTITLED'){const _0x30d4c0=VisuMZ['EventTemplates'][_0x418f4c];_0x30d4c0&&(_0x468b2b['mapId']=_0x30d4c0[_0x2d11ab(0x1d4)],_0x468b2b['eventId']=_0x30d4c0['EventID']);}const _0x2563e2=[],_0x47068d=this['width'](),_0x17caef=this[_0x2d11ab(0x578)]();for(let _0x12e551=0x0;_0x12e551<_0x47068d;_0x12e551++){for(let _0x27c1c1=0x0;_0x27c1c1<_0x17caef;_0x27c1c1++){if(!_0x28d6f3['includes'](this[_0x2d11ab(0x28b)](_0x12e551,_0x27c1c1)))continue;if(!this[_0x2d11ab(0x309)](_0x12e551,_0x27c1c1))continue;if(_0x3e7e22){if(this[_0x2d11ab(0x469)](_0x12e551,_0x27c1c1))continue;if(!this[_0x2d11ab(0x384)](_0x468b2b,_0x12e551,_0x27c1c1))continue;}if(_0x4210d8){if(!this['isPassableByAnyDirection'](_0x12e551,_0x27c1c1))continue;}_0x2563e2[_0x2d11ab(0x17a)]([_0x12e551,_0x27c1c1]);}}if(_0x2563e2[_0x2d11ab(0x235)]>0x0){const _0x467f69=_0x2563e2[Math['randomInt'](_0x2563e2[_0x2d11ab(0x235)])];return _0x468b2b['x']=_0x467f69[0x0],_0x468b2b['y']=_0x467f69[0x1],this['createSpawnedEventWithData'](_0x468b2b),!![];}return![];},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x30a)]=function(_0x2209a3,_0x23a61f){const _0x4ecce8=_0xe91ae0;if(this[_0x4ecce8(0x3ee)](_0x2209a3,_0x23a61f,0x2))return!![];if(this['isPassable'](_0x2209a3,_0x23a61f,0x4))return!![];if(this[_0x4ecce8(0x3ee)](_0x2209a3,_0x23a61f,0x6))return!![];if(this[_0x4ecce8(0x3ee)](_0x2209a3,_0x23a61f,0x8))return!![];return![];},Game_Map['prototype'][_0xe91ae0(0x5a5)]=function(_0x30134a){const _0x4cdbc4=_0xe91ae0;if(_0x30134a<0x3e8)return;if(!this[_0x4cdbc4(0x350)])return;const _0x449f74=this[_0x4cdbc4(0x130)](_0x30134a);_0x449f74[_0x4cdbc4(0x555)](-0x1,-0x1),_0x449f74[_0x4cdbc4(0x15e)](),this[_0x4cdbc4(0x350)][_0x30134a-0x3e8]=null,this['clearEventCache']();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0xd0)]=function(){const _0x261df3=_0xe91ae0;for(const _0x9dcc39 of this[_0x261df3(0x350)]){if(_0x9dcc39)return _0x9dcc39;}return null;},Game_Map['prototype'][_0xe91ae0(0x453)]=function(){const _0x3d4f6e=_0xe91ae0,_0x5ae4fa=this[_0x3d4f6e(0xd0)]();return _0x5ae4fa?_0x5ae4fa[_0x3d4f6e(0x19b)]:0x0;},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0xe6)]=function(){const _0x2ccef4=_0xe91ae0,_0x3eb911=this[_0x2ccef4(0x350)][_0x2ccef4(0x232)](0x0)['reverse']();for(const _0x386a3c of _0x3eb911){if(_0x386a3c)return _0x386a3c;}return null;},Game_Map['prototype']['lastSpawnedEventID']=function(){const _0x5d67bb=_0xe91ae0,_0x3bf695=this[_0x5d67bb(0xe6)]();return _0x3bf695?_0x3bf695[_0x5d67bb(0x19b)]:0x0;},Game_Map[_0xe91ae0(0x36f)]['despawnAtXY']=function(_0x5c4f59,_0x1863b0){const _0xfcd2da=_0xe91ae0,_0x1dc9f1=this[_0xfcd2da(0x50e)](_0x5c4f59,_0x1863b0);for(const _0x50d73f of _0x1dc9f1){if(!_0x50d73f)continue;if(_0x50d73f[_0xfcd2da(0x11b)]())this['despawnEventId'](_0x50d73f[_0xfcd2da(0x19b)]);}},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x56e)]=function(_0x3feeab){const _0x880ff=_0xe91ae0;for(const _0x4a1bc6 of this[_0x880ff(0x350)]){if(!_0x4a1bc6)continue;_0x3feeab[_0x880ff(0x575)](_0x4a1bc6[_0x880ff(0x3ac)]())&&this['despawnEventId'](_0x4a1bc6['_eventId']);}},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x12e)]=function(_0x46b2ba){const _0x15faad=_0xe91ae0;for(const _0xef3108 of this[_0x15faad(0x350)]){if(!_0xef3108)continue;_0x46b2ba[_0x15faad(0x575)](_0xef3108[_0x15faad(0x28b)]())&&this[_0x15faad(0x5a5)](_0xef3108[_0x15faad(0x19b)]);}},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x5bb)]=function(){const _0x562497=_0xe91ae0;for(const _0x279ffc of this[_0x562497(0x350)]){if(!_0x279ffc)continue;this[_0x562497(0x5a5)](_0x279ffc['_eventId']);}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0xf0)]=Game_Map['prototype'][_0xe91ae0(0x349)],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x349)]=function(_0xfbf16d){const _0x5e62c5=_0xe91ae0;VisuMZ[_0x5e62c5(0x24e)]['Game_Map_unlockEvent'][_0x5e62c5(0x24f)](this,_0xfbf16d);if(_0xfbf16d>=0x3e8){const _0x9fa792=this[_0x5e62c5(0x130)](_0xfbf16d);if(_0x9fa792)_0x9fa792[_0x5e62c5(0x2eb)]();}},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x3be)]=function(){const _0x5e4bc9=_0xe91ae0;this['_forceShowPlayer']=![],this[_0x5e4bc9(0x3aa)]=![];if(!$dataMap)return;const _0x5d5ba2=$dataMap['note']||'';if(_0x5d5ba2[_0x5e4bc9(0x18c)](/<HIDE PLAYER>/i))this[_0x5e4bc9(0x2a4)]=![],this[_0x5e4bc9(0x3aa)]=!![];else _0x5d5ba2[_0x5e4bc9(0x18c)](/<SHOW PLAYER>/i)&&(this[_0x5e4bc9(0x2a4)]=!![],this[_0x5e4bc9(0x3aa)]=![]);},Game_Map['prototype'][_0xe91ae0(0x510)]=function(){const _0x2144ec=_0xe91ae0;return this[_0x2144ec(0x2a4)]===undefined&&this[_0x2144ec(0x3be)](),this[_0x2144ec(0x2a4)];},Game_Map[_0xe91ae0(0x36f)]['isPlayerForceHidden']=function(){const _0x52472b=_0xe91ae0;return this['_forceHidePlayer']===undefined&&this[_0x52472b(0x3be)](),this['_forceHidePlayer'];},VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_isTransparent']=Game_CharacterBase[_0xe91ae0(0x36f)]['isTransparent'],Game_CharacterBase['prototype'][_0xe91ae0(0x131)]=function(){const _0x3ff1e4=_0xe91ae0;if(this===$gamePlayer){if($gameMap[_0x3ff1e4(0x510)]())return![];if($gameMap[_0x3ff1e4(0x39b)]())return!![];}return VisuMZ['EventsMoveCore'][_0x3ff1e4(0x4b4)][_0x3ff1e4(0x24f)](this);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x445)]=function(){const _0x2b0c5b=_0xe91ae0;this[_0x2b0c5b(0x58d)]=![],this[_0x2b0c5b(0x40b)]=![];if(!$dataMap)return;const _0x370a63=$dataMap[_0x2b0c5b(0x228)]||'';if(_0x370a63['match'](/<HIDE FOLLOWERS>/i))this[_0x2b0c5b(0x58d)]=![],this['_forceHideFollower']=!![];else _0x370a63[_0x2b0c5b(0x18c)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x2b0c5b(0x40b)]=![]);},Game_Map['prototype']['areFollowersForceShown']=function(){const _0x3dd7f7=_0xe91ae0;return this['_forceShowFollower']===undefined&&this[_0x3dd7f7(0x445)](),this[_0x3dd7f7(0x58d)];},Game_Map[_0xe91ae0(0x36f)]['areFollowersForceHidden']=function(){const _0xee043d=_0xe91ae0;return this[_0xee043d(0x40b)]===undefined&&this[_0xee043d(0x445)](),this['_forceHideFollower'];},VisuMZ['EventsMoveCore'][_0xe91ae0(0x3d9)]=Game_Followers[_0xe91ae0(0x36f)][_0xe91ae0(0x3a9)],Game_Followers[_0xe91ae0(0x36f)][_0xe91ae0(0x3a9)]=function(){const _0xa1c119=_0xe91ae0;if($gameMap['areFollowersForceShown']())return!![];if($gameMap[_0xa1c119(0x4d6)]())return![];return VisuMZ[_0xa1c119(0x24e)][_0xa1c119(0x3d9)][_0xa1c119(0x24f)](this);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x123)]=function(){const _0xe3d46e=_0xe91ae0,_0x338d93=this[_0xe3d46e(0x45b)](),_0x278c5e=[];$gameParty[_0xe3d46e(0x1fe)]=!![];for(const _0x59780d of _0x338d93){if(!_0x59780d)continue;if(_0x59780d[_0xe3d46e(0x202)])continue;_0x59780d['processEraseEncounterSpawn']()&&_0x278c5e[_0xe3d46e(0x17a)](_0x59780d);}$gameParty['_checkEncounterRaw']=undefined;for(const _0x1f48a0 of _0x278c5e){if(!_0x1f48a0)continue;if(_0x1f48a0[_0xe3d46e(0x202)])continue;this[_0xe3d46e(0x543)](_0x1f48a0[_0xe3d46e(0x247)]());}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2f9)]=function(){const _0x77f2f3=_0xe91ae0,_0x341a5a=this[_0x77f2f3(0x130)]()[_0x77f2f3(0x228)]||'';if(_0x341a5a[_0x77f2f3(0x18c)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x77f2f3(0x4b9)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x341a5a[_0x77f2f3(0x18c)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty['hasEncounterNone']())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x160)]=Scene_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x3ce)],Scene_Map['prototype']['onMapLoaded']=function(){const _0x49cc6a=_0xe91ae0;VisuMZ['EventsMoveCore'][_0x49cc6a(0x160)]['call'](this),$gameMap[_0x49cc6a(0x123)]();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x170)]=function(){const _0x34ba03=_0xe91ae0;if(!$dataMap)return;if(!$dataMap[_0x34ba03(0x228)])return;const _0x18b01d=$dataMap[_0x34ba03(0x228)];if(_0x18b01d[_0x34ba03(0x18c)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x359b4c=String(RegExp['$1'])[_0x34ba03(0x1b7)](',')[_0x34ba03(0x421)](_0x49fd78=>Number(_0x49fd78));for(const _0x1b926f of _0x359b4c){$gameTemp[_0x34ba03(0x21e)](_0x1b926f);}}},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x142)]=function(){const _0x5ea7d6=_0xe91ae0;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x48e094=$dataMap['note'];if(_0x48e094[_0x5ea7d6(0x18c)](/<JS ON MAP LOAD>\s*([\s\S]*)\s*<\/JS ON MAP LOAD>/i)){const _0x3fc8e3=String(RegExp['$1']);try{eval(_0x3fc8e3);}catch(_0xe8d555){console[_0x5ea7d6(0x184)](_0x5ea7d6(0x36d));}}},Game_Map[_0xe91ae0(0x36f)]['requestMapExitCustomJS']=function(){const _0xeb7a9c=_0xe91ae0;if(!$gamePlayer)return;if(!$gamePlayer[_0xeb7a9c(0x20d)]())return;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x23ee65=$dataMap['note'];if(_0x23ee65['match'](/<JS ON MAP EXIT>\s*([\s\S]*)\s*<\/JS ON MAP EXIT>/i)){const _0x290034=String(RegExp['$1']);try{eval(_0x290034);}catch(_0x3ee621){console[_0xeb7a9c(0x184)]('<JS\x20ON\x20MAP\x20EXIT>\x20code\x20error');}}},VisuMZ['EventsMoveCore']['Scene_Map_createOnMapExit']=Scene_Map['prototype'][_0xe91ae0(0x29d)],Scene_Map[_0xe91ae0(0x36f)]['create']=function(){const _0x2c6f2e=_0xe91ae0;if($gameMap)$gameMap['requestMapExitCustomJS']();VisuMZ[_0x2c6f2e(0x24e)][_0x2c6f2e(0x527)]['call'](this);},Game_CommonEvent['prototype']['hasAdvancedSwitchVariable']=function(){const _0x3ba8b4=_0xe91ae0,_0x5ec9a9=this[_0x3ba8b4(0x130)]();return this['isActive']()&&_0x5ec9a9[_0x3ba8b4(0x14e)]>=0x1&&DataManager[_0x3ba8b4(0x489)](_0x5ec9a9[_0x3ba8b4(0x456)]);},Game_CommonEvent[_0xe91ae0(0x36f)]['hasCPCs']=function(){const _0x28dd03=_0xe91ae0;return VisuMZ[_0x28dd03(0x24e)][_0x28dd03(0x54f)][_0x28dd03(0x46f)][_0x28dd03(0x575)](this[_0x28dd03(0x2b1)]);},VisuMZ[_0xe91ae0(0x24e)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0xe91ae0(0x36f)][_0xe91ae0(0x484)],Game_CommonEvent[_0xe91ae0(0x36f)]['isActive']=function(){const _0x31575d=_0xe91ae0;if(VisuMZ[_0x31575d(0x24e)][_0x31575d(0x576)][_0x31575d(0x24f)](this))return!![];else{const _0x376ad2=this[_0x31575d(0x130)]();return VisuMZ[_0x31575d(0x24e)]['CustomPageConditions'][_0x31575d(0x430)](this[_0x31575d(0x130)]()[_0x31575d(0x577)],this[_0x31575d(0x2b1)],_0x376ad2);}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3fe)]=Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x322)],Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x322)]=function(){const _0x537fa6=_0xe91ae0,_0x11358d=VisuMZ[_0x537fa6(0x24e)][_0x537fa6(0x3fe)][_0x537fa6(0x24f)](this),_0x56f676=VisuMZ[_0x537fa6(0x24e)][_0x537fa6(0x54f)][_0x537fa6(0x46f)][_0x537fa6(0x421)](_0x43d56a=>$dataCommonEvents[_0x43d56a]);return _0x11358d['concat'](_0x56f676)['filter']((_0xe90443,_0x3c0f37,_0x5d5a39)=>_0x5d5a39[_0x537fa6(0x28f)](_0xe90443)===_0x3c0f37);},Game_CharacterBase[_0xe91ae0(0x2bc)]=VisuMZ['EventsMoveCore']['Settings'][_0xe91ae0(0xdf)][_0xe91ae0(0x121)]??![],VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3da)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3da)]=function(){const _0x5bca44=_0xe91ae0;VisuMZ[_0x5bca44(0x24e)]['Game_CharacterBase_initMembers'][_0x5bca44(0x24f)](this),this[_0x5bca44(0x246)]();},Game_CharacterBase[_0xe91ae0(0x36f)]['initEventsMoveCoreSettings']=function(){const _0x2c0874=_0xe91ae0;this['_scaleBaseX']=0x1,this[_0x2c0874(0x263)]=0x1,this[_0x2c0874(0x200)]=![],this[_0x2c0874(0x5a2)](),this['clearDashing'](),this[_0x2c0874(0x249)](),this[_0x2c0874(0x261)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x561)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x282)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x282)]=function(){const _0x3df9b9=_0xe91ae0;let _0xc1893a=VisuMZ['EventsMoveCore'][_0x3df9b9(0x561)][_0x3df9b9(0x24f)](this);return _0xc1893a=this['adjustMoveSynchOpacityDelta'](_0xc1893a),_0xc1893a;},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x4ae)]=function(_0x2a398d){return _0x2a398d;},Game_CharacterBase['prototype'][_0xe91ae0(0x3b0)]=function(){const _0xa6fd1f=_0xe91ae0;if(this[_0xa6fd1f(0xf3)]===Game_Player&&this[_0xa6fd1f(0x5b4)]())return this[_0xa6fd1f(0x2ef)]()['characterName']()[_0xa6fd1f(0x18c)](/\[VS8\]/i);else return Imported[_0xa6fd1f(0x4ed)]&&this['hasDragonbones']()?!![]:this[_0xa6fd1f(0x365)]()['match'](/\[VS8\]/i);},VisuMZ['EventsMoveCore'][_0xe91ae0(0x26f)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3c3)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3c3)]=function(){const _0xd7525d=_0xe91ae0;if(!$dataMap)return this[_0xd7525d(0x380)]||0x2;if(this[_0xd7525d(0x3c5)]()&&!this[_0xd7525d(0x22f)]()&&this['isSpriteVS8dir']())return this[_0xd7525d(0x2d4)]();else{if(this['isOnLadder']()&&!this[_0xd7525d(0x22f)]())return 0x8;else return this[_0xd7525d(0x16f)]()&&this[_0xd7525d(0x3b0)]()?this['getPosingCharacterDirection']():VisuMZ[_0xd7525d(0x24e)][_0xd7525d(0x26f)][_0xd7525d(0x24f)](this);}},VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_setDirection']=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3e6)],Game_CharacterBase[_0xe91ae0(0x36f)]['setDirection']=function(_0x2b8eb3){const _0x29b9ad=_0xe91ae0;if(!this[_0x29b9ad(0x3b0)]())_0x2b8eb3=this['correctFacingDirection'](_0x2b8eb3);VisuMZ[_0x29b9ad(0x24e)][_0x29b9ad(0x5a6)]['call'](this,_0x2b8eb3),this[_0x29b9ad(0x338)]();},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x49b)]=function(_0x2596c7){const _0x32f45a=_0xe91ae0;if(_0x2596c7===0x1)return this[_0x32f45a(0x153)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x2596c7===0x3)return this[_0x32f45a(0x153)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x2596c7===0x7)return this[_0x32f45a(0x153)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x2596c7===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x2596c7;},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x16d)]=function(_0x1b6f09){const _0x4a7fd6=_0xe91ae0;return[0x1,0x3,0x5,0x7,0x9][_0x4a7fd6(0x575)](_0x1b6f09);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1ab)]=function(){const _0xec5132=_0xe91ae0;return this[_0xec5132(0x487)]||0x0;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x13f)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0xc9)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0xc9)]=function(_0x300abf){const _0x4d40a8=_0xe91ae0;this['_lastMovedDirection']=_0x300abf,VisuMZ['EventsMoveCore'][_0x4d40a8(0x13f)][_0x4d40a8(0x24f)](this,_0x300abf);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x109)]=function(_0x4bd268){const _0x7c74f0=_0xe91ae0;if(!this[_0x7c74f0(0x16d)](_0x4bd268))return this[_0x7c74f0(0xc9)](_0x4bd268);let _0x423e3e=0x0,_0x38775a=0x0;switch(_0x4bd268){case 0x1:_0x423e3e=0x4,_0x38775a=0x2;break;case 0x3:_0x423e3e=0x6,_0x38775a=0x2;break;case 0x7:_0x423e3e=0x4,_0x38775a=0x8;break;case 0x9:_0x423e3e=0x6,_0x38775a=0x8;break;}if(VisuMZ[_0x7c74f0(0x24e)][_0x7c74f0(0x477)][_0x7c74f0(0xdf)][_0x7c74f0(0x2d9)]){if(!this[_0x7c74f0(0x153)](this['_x'],this['_y'],_0x423e3e))return this[_0x7c74f0(0xc9)](_0x38775a);if(!this[_0x7c74f0(0x153)](this['_x'],this['_y'],_0x38775a))return this[_0x7c74f0(0xc9)](_0x423e3e);if(!this[_0x7c74f0(0x47f)](this['_x'],this['_y'],_0x423e3e,_0x38775a)){let _0x2e640a=VisuMZ[_0x7c74f0(0x24e)]['Settings'][_0x7c74f0(0xdf)]['FavorHorz']?_0x423e3e:_0x38775a;return this[_0x7c74f0(0xc9)](_0x2e640a);}}this[_0x7c74f0(0x487)]=_0x4bd268,this[_0x7c74f0(0x1d8)](_0x423e3e,_0x38775a);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x5aa)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x34e)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x34e)]=function(){const _0x57018c=_0xe91ae0;let _0x220984=this[_0x57018c(0x570)];return this[_0x57018c(0x233)]()&&(_0x220984+=this['dashSpeedModifier']()),this['adjustDir8MovementSpeed'](_0x220984);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x251)]=function(){const _0x14d6de=_0xe91ae0,_0x55fdcd=VisuMZ[_0x14d6de(0x24e)]['Settings'][_0x14d6de(0xdf)];return _0x55fdcd[_0x14d6de(0x548)]!==undefined?_0x55fdcd['DashModifier']:VisuMZ[_0x14d6de(0x24e)]['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x14d6de(0x570)];},Game_CharacterBase[_0xe91ae0(0x36f)]['adjustDir8MovementSpeed']=function(_0x124b0c){const _0x20b016=_0xe91ae0,_0x1d4333=VisuMZ[_0x20b016(0x24e)][_0x20b016(0x477)]['Movement'];if(!_0x1d4333[_0x20b016(0x2b7)])return _0x124b0c;return[0x1,0x3,0x7,0x9][_0x20b016(0x575)](this['_lastMovedDirection'])&&(_0x124b0c*=_0x1d4333[_0x20b016(0x475)]||0.01),_0x124b0c;},VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0xe91ae0(0x36f)]['isDashing'],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x233)]=function(){const _0x17c5c2=_0xe91ae0;if(!Game_CharacterBase[_0x17c5c2(0x2bc)]&&this[_0x17c5c2(0x3c5)]())return![];if(this[_0x17c5c2(0x320)])return!![];return VisuMZ['EventsMoveCore'][_0x17c5c2(0x54d)][_0x17c5c2(0x24f)](this);},Game_CharacterBase[_0xe91ae0(0x36f)]['isDashingAndMoving']=function(){const _0x569515=_0xe91ae0;return this['isDashing']()&&this[_0x569515(0x2e1)]===0x0;},VisuMZ['EventsMoveCore'][_0xe91ae0(0x3e0)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x196)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x196)]=function(){const _0x32f35d=_0xe91ae0;return this[_0x32f35d(0x16f)]()?this[_0x32f35d(0x413)]():VisuMZ[_0x32f35d(0x24e)][_0x32f35d(0x3e0)]['call'](this);},VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x4e0)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x4e0)]=function(){const _0x25d808=_0xe91ae0;VisuMZ[_0x25d808(0x24e)]['Game_CharacterBase_increaseSteps']['call'](this),this[_0x25d808(0x5a2)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x375)]=Game_CharacterBase['prototype'][_0xe91ae0(0x27b)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x27b)]=function(){const _0x59aa4a=_0xe91ae0;if(this[_0x59aa4a(0x3b0)]())return this['characterIndexVS8']();return VisuMZ['EventsMoveCore'][_0x59aa4a(0x375)][_0x59aa4a(0x24f)](this);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x589)]=function(){const _0x239689=_0xe91ae0,_0x442137=this['direction']();if(this[_0x239689(0x22f)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x442137))return 0x4;if([0x1,0x3,0x7,0x9][_0x239689(0x575)](_0x442137))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x239689(0x16f)]())return this[_0x239689(0x377)]();else{if(this[_0x239689(0x111)]){if([0x2,0x4,0x6,0x8][_0x239689(0x575)](_0x442137))return 0x4;if([0x1,0x3,0x7,0x9][_0x239689(0x575)](_0x442137))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x239689(0x579)]()){if([0x2,0x4,0x6,0x8][_0x239689(0x575)](_0x442137))return 0x4;if([0x1,0x3,0x7,0x9][_0x239689(0x575)](_0x442137))return 0x5;}else{if(this[_0x239689(0x3f2)]()){if([0x2,0x4,0x6,0x8][_0x239689(0x575)](_0x442137))return 0x2;if([0x1,0x3,0x7,0x9][_0x239689(0x575)](_0x442137))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x442137))return 0x0;if([0x1,0x3,0x7,0x9][_0x239689(0x575)](_0x442137))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0xe91ae0(0x579)]=function(){const _0x26a0cf=_0xe91ae0;return VisuMZ[_0x26a0cf(0x24e)][_0x26a0cf(0x477)][_0x26a0cf(0x298)]['CarryPose'];},Game_CharacterBase[_0xe91ae0(0x36f)]['isOnRope']=function(){const _0x381fb0=_0xe91ae0;return this[_0x381fb0(0x3c5)]()&&this[_0x381fb0(0x28b)]()===VisuMZ[_0x381fb0(0x24e)][_0x381fb0(0x477)]['TerrainTag'][_0x381fb0(0x4f5)];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2d4)]=function(){const _0xd58028=_0xe91ae0;return this[_0xd58028(0x505)]()?0x4:0x2;},VisuMZ[_0xe91ae0(0x24e)]['Game_CharacterBase_update']=Game_CharacterBase[_0xe91ae0(0x36f)]['update'],Game_CharacterBase[_0xe91ae0(0x36f)]['update']=function(){const _0x33bf68=_0xe91ae0;this[_0x33bf68(0x14f)](),VisuMZ[_0x33bf68(0x24e)]['Game_CharacterBase_update'][_0x33bf68(0x24f)](this),this[_0x33bf68(0x1e9)]();},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x14f)]=function(){const _0x57b814=_0xe91ae0;this[_0x57b814(0x461)]=this[_0x57b814(0x195)]??0x1,this['_scaleY']=this[_0x57b814(0x263)]??0x1;},VisuMZ['EventsMoveCore']['Game_CharacterBase_bushDepth']=Game_CharacterBase[_0xe91ae0(0x36f)]['bushDepth'],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x47c)]=function(){const _0x3aaa41=_0xe91ae0;let _0x43da44=VisuMZ['EventsMoveCore']['Game_CharacterBase_bushDepth'][_0x3aaa41(0x24f)](this);return this['_scaleY']!==undefined&&(_0x43da44/=Math[_0x3aaa41(0x1c4)](this[_0x3aaa41(0x149)],0.00001)),Math['floor'](_0x43da44);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1e9)]=function(){const _0x27a06a=_0xe91ae0;this[_0x27a06a(0x56f)]=this['_poseDuration']||0x0;if(this[_0x27a06a(0x56f)]>0x0){this[_0x27a06a(0x56f)]--;if(this[_0x27a06a(0x56f)]<=0x0&&this[_0x27a06a(0x19d)]!=='ZZZ')this[_0x27a06a(0x5a2)]();}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x408)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1d8)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1d8)]=function(_0x543f46,_0x45fd92){const _0x27f9a7=_0xe91ae0;VisuMZ[_0x27f9a7(0x24e)]['Game_CharacterBase_moveDiagonally'][_0x27f9a7(0x24f)](this,_0x543f46,_0x45fd92);if(this[_0x27f9a7(0x3b0)]())this[_0x27f9a7(0x5bc)](_0x543f46,_0x45fd92);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x5bc)]=function(_0x2cd76e,_0x5863cd){const _0x3c4423=_0xe91ae0;if(_0x2cd76e===0x4&&_0x5863cd===0x2)this[_0x3c4423(0x3e6)](0x1);if(_0x2cd76e===0x6&&_0x5863cd===0x2)this['setDirection'](0x3);if(_0x2cd76e===0x4&&_0x5863cd===0x8)this[_0x3c4423(0x3e6)](0x7);if(_0x2cd76e===0x6&&_0x5863cd===0x8)this[_0x3c4423(0x3e6)](0x9);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x11c)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x530)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x530)]=function(){const _0x1cd9fd=_0xe91ae0;if(this['isPosing']()&&this[_0x1cd9fd(0x2b3)]()==='ZZZ')return!![];return VisuMZ[_0x1cd9fd(0x24e)][_0x1cd9fd(0x11c)][_0x1cd9fd(0x24f)](this);},Game_CharacterBase[_0xe91ae0(0x36f)]['setPose']=function(_0x378e8d,_0xf03e83){const _0x346909=_0xe91ae0;if(_0x378e8d[_0x346909(0x18c)](/Z/i))_0x378e8d=_0x346909(0x1ea);if(_0x378e8d['match'](/SLEEP/i))_0x378e8d=_0x346909(0x1ea);this[_0x346909(0x3b0)]()&&(this[_0x346909(0x19d)]=_0x378e8d[_0x346909(0x36b)]()[_0x346909(0x41a)](),this[_0x346909(0x56f)]=_0xf03e83||Infinity);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2b3)]=function(){const _0x22812f=_0xe91ae0;return this[_0x22812f(0x3b0)]()?(this[_0x22812f(0x19d)]||'')[_0x22812f(0x36b)]()['trim']():''[_0x22812f(0x36b)]()[_0x22812f(0x41a)]();},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3f1)]=function(_0x598821,_0x229898){const _0x518695=_0xe91ae0;if(this['isSpriteVS8dir']()){const _0x4c128b=['',_0x518695(0xee),_0x518695(0x30c),_0x518695(0x4a2),'HEART',_0x518695(0x588),_0x518695(0x566),_0x518695(0x56b),_0x518695(0xff),_0x518695(0x1ef),_0x518695(0x1ea),'','','','',''][_0x598821];this[_0x518695(0x4df)](_0x4c128b,_0x229898);}},Game_CharacterBase['prototype']['clearPose']=function(){const _0x567867=_0xe91ae0;this[_0x567867(0x19d)]='',this[_0x567867(0x56f)]=0x0;},Game_CharacterBase['prototype'][_0xe91ae0(0x16f)]=function(){const _0x72726f=_0xe91ae0;return this[_0x72726f(0x3b0)]()&&!!this['_pose'];},Game_CharacterBase[_0xe91ae0(0x36f)]['getPosingCharacterIndex']=function(){const _0x59fec2=_0xe91ae0,_0x37990a=this['_pose']['toUpperCase']();switch(this[_0x59fec2(0x19d)]['toUpperCase']()[_0x59fec2(0x41a)]()){case'ITEM':case _0x59fec2(0x3e8):case'VICTORY':case _0x59fec2(0x10c):case _0x59fec2(0x46d):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x542)]=function(){const _0x56cfb7=_0xe91ae0;switch(this[_0x56cfb7(0x19d)][_0x56cfb7(0x36b)]()){case _0x56cfb7(0xee):case _0x56cfb7(0x30c):case _0x56cfb7(0x4a2):case'!':case'?':return 0x2;break;case _0x56cfb7(0x38c):case _0x56cfb7(0x588):case'SWEAT':return 0x4;break;case _0x56cfb7(0x496):case _0x56cfb7(0x3e8):case _0x56cfb7(0x57d):case'COBWEB':case _0x56cfb7(0xff):case _0x56cfb7(0x1ef):return 0x6;break;case _0x56cfb7(0x10c):case _0x56cfb7(0x46d):case _0x56cfb7(0x1de):case _0x56cfb7(0x1ea):case _0x56cfb7(0x292):return 0x8;break;default:return VisuMZ[_0x56cfb7(0x24e)][_0x56cfb7(0x5a6)][_0x56cfb7(0x24f)](this);break;}},Game_CharacterBase['prototype']['getPosingCharacterPattern']=function(){const _0x14d72f=_0xe91ae0;switch(this[_0x14d72f(0x19d)][_0x14d72f(0x36b)]()){case'ITEM':case'HURT':case _0x14d72f(0xee):case'!':case _0x14d72f(0x38c):case _0x14d72f(0x56b):return 0x0;break;case _0x14d72f(0x3e8):case _0x14d72f(0x46d):case'QUESTION':case'?':case _0x14d72f(0x588):case _0x14d72f(0xff):return 0x1;break;case _0x14d72f(0x57d):case _0x14d72f(0x1de):case _0x14d72f(0x4a2):case _0x14d72f(0x566):case _0x14d72f(0x1ef):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x14d72f(0x3e0)][_0x14d72f(0x24f)](this);break;}},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2a5)]=function(){const _0x5c6add=_0xe91ae0;this[_0x5c6add(0x111)]=!![];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x404)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0xe91ae0(0x36f)]['forceDashing']=function(){const _0x3c2cef=_0xe91ae0;this[_0x3c2cef(0x320)]=!![];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x5ad)]=function(){const _0x5e1f02=_0xe91ae0;this[_0x5e1f02(0x320)]=![];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x422)]=function(){const _0x41210c=_0xe91ae0;if(this[_0x41210c(0x346)]())return![];if(this[_0x41210c(0x559)])return![];if(this[_0x41210c(0x3cb)]==='')return![];if(this[_0x41210c(0xf3)]===Game_Vehicle)return![];if(this[_0x41210c(0x131)]())return![];if(this[_0x41210c(0x4e9)])return![];return!![];},Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x422)]=function(){const _0x2748e6=_0xe91ae0;if($gamePlayer[_0x2748e6(0x442)])return![];return Game_CharacterBase[_0x2748e6(0x36f)][_0x2748e6(0x422)]['call'](this);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2c0)]=function(){const _0x527426=_0xe91ae0;if(this[_0x527426(0x3c5)]())return!![];if(this[_0x527426(0xf3)]===Game_Player&&this[_0x527426(0x5b4)]())return!![];return![];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2d1)]=function(){const _0x405f35=_0xe91ae0;return VisuMZ[_0x405f35(0x24e)][_0x405f35(0x477)][_0x405f35(0xdf)][_0x405f35(0x4fe)];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x3e5)]=function(){const _0x3f6a14=_0xe91ae0;return this[_0x3f6a14(0x1f8)]();},Game_CharacterBase[_0xe91ae0(0x36f)]['shadowY']=function(){const _0x7ae16a=_0xe91ae0,_0x4d6074=$gameMap['tileHeight']();return Math[_0x7ae16a(0x549)](this[_0x7ae16a(0x326)]()*_0x4d6074+_0x4d6074);},Game_CharacterBase[_0xe91ae0(0x2bd)]=0x64,Game_CharacterBase['prototype'][_0xe91ae0(0x3b4)]=function(_0x43954d,_0x5259cd){const _0x145052=_0xe91ae0;if(TouchInput[_0x145052(0x22d)]())return![];if(!$gameMap[_0x145052(0x4fc)]())return![];if($gameMap[_0x145052(0x1ff)](_0x43954d,_0x5259cd)['length']>0x0)return![];if(!$gameMap[_0x145052(0x30a)](_0x43954d,_0x5259cd))return![];const _0x30c115=$gameMap[_0x145052(0x37a)][_0x145052(0x235)];if(_0x30c115>=Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT'])return![];return!![];},Game_Character[_0xe91ae0(0x36f)]['findDiagonalDirectionTo']=function(_0x1b7869,_0x4743dd){const _0x50815f=_0xe91ae0;let _0x1d5b67=this[_0x50815f(0x5b0)](_0x1b7869,_0x4743dd);if(!this[_0x50815f(0x3b4)](_0x1b7869,_0x4743dd))return _0x1d5b67;if(this['isCollidedWithEvents'](_0x1b7869,_0x4743dd))return _0x1d5b67;const _0x6c3c63=_0x1d5b67;if(_0x1d5b67===0x2){if(_0x1b7869>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0x1d5b67=0x3;if(_0x1b7869<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0x1d5b67=0x1;}else{if(_0x1d5b67===0x4){if(_0x4743dd>this['y']&&this[_0x50815f(0x153)](this['x'],this['y'],0x4))_0x1d5b67=0x1;if(_0x4743dd<this['y']&&this[_0x50815f(0x153)](this['x'],this['y'],0x6))_0x1d5b67=0x7;}else{if(_0x1d5b67===0x6){if(_0x4743dd>this['y']&&this[_0x50815f(0x153)](this['x'],this['y'],0x4))_0x1d5b67=0x3;if(_0x4743dd<this['y']&&this[_0x50815f(0x153)](this['x'],this['y'],0x6))_0x1d5b67=0x9;}else{if(_0x1d5b67===0x8){if(_0x1b7869>this['x']&&this[_0x50815f(0x153)](this['x'],this['y'],0x6))_0x1d5b67=0x9;if(_0x1b7869<this['x']&&this[_0x50815f(0x153)](this['x'],this['y'],0x4))_0x1d5b67=0x7;}}}}if(!this[_0x50815f(0x153)](this['x'],this['y'],_0x1d5b67))return _0x6c3c63;const _0xc9722f=$gameMap['roundXWithDirection'](this['x'],_0x1d5b67),_0x516151=$gameMap[_0x50815f(0x3c7)](this['y'],_0x1d5b67);if(this[_0x50815f(0x592)](_0xc9722f,_0x516151))_0x1d5b67=_0x6c3c63;return _0x1d5b67;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x436)]=Game_CharacterBase['prototype'][_0xe91ae0(0x153)],Game_CharacterBase[_0xe91ae0(0x36f)]['canPass']=function(_0x5c88b5,_0x204b91,_0x3776e2){const _0x1277c9=_0xe91ae0;return this['_vehicleType']==='airship'?this[_0x1277c9(0x2ef)]()[_0x1277c9(0x3c2)](_0x5c88b5,_0x204b91,_0x3776e2):VisuMZ[_0x1277c9(0x24e)][_0x1277c9(0x436)]['call'](this,_0x5c88b5,_0x204b91,_0x3776e2);},Game_CharacterBase['prototype'][_0xe91ae0(0x249)]=function(){const _0x1b974d=_0xe91ae0;this['_spriteOffsetX']=0x0,this[_0x1b974d(0x2ed)]=0x0;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x2f2)]=Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1f8)],Game_CharacterBase[_0xe91ae0(0x36f)]['screenX']=function(){const _0x476e14=_0xe91ae0;return VisuMZ[_0x476e14(0x24e)][_0x476e14(0x2f2)][_0x476e14(0x24f)](this)+(this[_0x476e14(0x459)]||0x0);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x255)]=Game_CharacterBase[_0xe91ae0(0x36f)]['screenY'],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x528)]=function(){const _0x539519=_0xe91ae0;return VisuMZ[_0x539519(0x24e)][_0x539519(0x255)][_0x539519(0x24f)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x477)][_0xe91ae0(0xdf)][_0xe91ae0(0x2ba)]??-0x6,Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x595)]=function(){const _0x106fae=_0xe91ae0;let _0x1788d4=this[_0x106fae(0x2a6)]()?0x0:-Game_CharacterBase[_0x106fae(0x116)];return this[_0x106fae(0x149)]&&(_0x1788d4*=this['_scaleY']),Math[_0x106fae(0x583)](_0x1788d4);},Game_CharacterBase[_0xe91ae0(0x36f)]['clearStepPattern']=function(){const _0x1e8c23=_0xe91ae0;this[_0x1e8c23(0x1b8)]='';},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x24c)]=Game_CharacterBase['prototype'][_0xe91ae0(0x58a)],Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x58a)]=function(){const _0x3f72fe=_0xe91ae0;if(this[_0x3f72fe(0x200)])return;if(this[_0x3f72fe(0x237)]())return;VisuMZ[_0x3f72fe(0x24e)][_0x3f72fe(0x24c)][_0x3f72fe(0x24f)](this);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x237)]=function(){const _0x5600a6=_0xe91ae0;if(!this[_0x5600a6(0x530)]()&&this[_0x5600a6(0x2e1)]>0x0)return![];switch(String(this[_0x5600a6(0x1b8)])[_0x5600a6(0x36b)]()['trim']()){case _0x5600a6(0xda):this['_pattern']+=0x1;if(this[_0x5600a6(0x3e3)]>0x2)this['setPattern'](0x0);break;case'RIGHT\x20TO\x20LEFT':this['_pattern']-=0x1;if(this['_pattern']<0x0)this['setPattern'](0x2);break;case _0x5600a6(0x36e):case _0x5600a6(0x229):this['turnRight90']();break;case _0x5600a6(0x593):case _0x5600a6(0x5ab):case _0x5600a6(0x1fb):case _0x5600a6(0x49e):this[_0x5600a6(0x5a3)]();break;default:return![];}return!![];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x4b8)]=function(){const _0x3672b8=_0xe91ae0;return $gameSystem[_0x3672b8(0x4b8)](this);},Game_CharacterBase[_0xe91ae0(0x36f)]['hasEventIcon']=function(){const _0x5dd7f7=this['getEventIconData']();if(!_0x5dd7f7)return![];return _0x5dd7f7['iconIndex']>0x0;},Game_CharacterBase[_0xe91ae0(0x36f)]['frontX']=function(){const _0x12374e=_0xe91ae0,_0x3da0c2=this[_0x12374e(0x3c3)]();return $gameMap[_0x12374e(0x208)](this['x'],_0x3da0c2);},Game_CharacterBase['prototype'][_0xe91ae0(0x244)]=function(){const _0x256860=_0xe91ae0,_0x5522c2=this[_0x256860(0x3c3)]();return $gameMap[_0x256860(0x3c7)](this['y'],_0x5522c2);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2bb)]=function(){const _0x1c7060=_0xe91ae0,_0x3136aa=this['reverseDir'](this[_0x1c7060(0x3c3)]());return $gameMap[_0x1c7060(0x208)](this['x'],_0x3136aa);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x1a1)]=function(){const _0x503e99=_0xe91ae0,_0x4c08c9=this[_0x503e99(0x536)](this['direction']());return $gameMap[_0x503e99(0x3c7)](this['y'],_0x4c08c9);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x2dd)]=function(){const _0x322e91=_0xe91ae0,_0xe377c2=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x322e91(0x3c3)]()];return $gameMap[_0x322e91(0x208)](this['x'],_0xe377c2);},Game_CharacterBase[_0xe91ae0(0x36f)]['ccwY']=function(){const _0x23699d=_0xe91ae0,_0x3c6a49=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x23699d(0x3c3)]()];return $gameMap[_0x23699d(0x3c7)](this['y'],_0x3c6a49);},Game_CharacterBase['prototype'][_0xe91ae0(0xe9)]=function(){const _0x57546d=_0xe91ae0,_0xd44935=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x57546d(0x3c3)]()];return $gameMap[_0x57546d(0x208)](this['x'],_0xd44935);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x502)]=function(){const _0x45d3a2=_0xe91ae0,_0x2c8b83=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x45d3a2(0x3c3)]()];return $gameMap[_0x45d3a2(0x3c7)](this['y'],_0x2c8b83);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3a7)]=Game_Character['prototype'][_0xe91ae0(0x1a6)],Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x1a6)]=function(_0x4401ff){const _0x27be28=_0xe91ae0;route=JsonEx[_0x27be28(0x40d)](_0x4401ff),VisuMZ[_0x27be28(0x24e)]['Game_Character_setMoveRoute'][_0x27be28(0x24f)](this,route);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x230)]=Game_Character['prototype']['forceMoveRoute'],Game_Character['prototype'][_0xe91ae0(0x432)]=function(_0x21a31d){const _0x1151c9=_0xe91ae0;route=JsonEx[_0x1151c9(0x40d)](_0x21a31d),VisuMZ[_0x1151c9(0x24e)][_0x1151c9(0x230)][_0x1151c9(0x24f)](this,route);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x37f)]=Game_Character['prototype'][_0xe91ae0(0x363)],Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x363)]=function(_0x17d404){const _0x25c7bb=_0xe91ae0,_0x32bee5=Game_Character,_0x15eab0=_0x17d404['parameters'];if(_0x17d404['code']===_0x32bee5[_0x25c7bb(0x1fa)]){let _0x355bb9=_0x17d404[_0x25c7bb(0x3f0)][0x0];_0x355bb9=this[_0x25c7bb(0x297)](_0x355bb9),_0x355bb9=this['convertSelfVariableValuesInScriptCall'](_0x355bb9),this[_0x25c7bb(0x471)](_0x17d404,_0x355bb9);}else VisuMZ[_0x25c7bb(0x24e)][_0x25c7bb(0x37f)][_0x25c7bb(0x24f)](this,_0x17d404);},Game_Character['prototype']['convertVariableValuesInScriptCall']=function(_0x20bb68){const _0x50d2f1=_0xe91ae0,_0x1ff9f7=/\$gameVariables\.value\((\d+)\)/gi,_0x28242c=/\\V\[(\d+)\]/gi;while(_0x20bb68[_0x50d2f1(0x18c)](_0x1ff9f7)){_0x20bb68=_0x20bb68[_0x50d2f1(0xdb)](_0x1ff9f7,(_0x189cc8,_0x5803ee)=>$gameVariables['value'](parseInt(_0x5803ee)));}while(_0x20bb68[_0x50d2f1(0x18c)](_0x28242c)){_0x20bb68=_0x20bb68[_0x50d2f1(0xdb)](_0x28242c,(_0x4988db,_0x29fd2a)=>$gameVariables[_0x50d2f1(0x46a)](parseInt(_0x29fd2a)));}return _0x20bb68;},Game_Character[_0xe91ae0(0x36f)]['convertSelfVariableValuesInScriptCall']=function(_0x372afe){const _0x5ac439=_0xe91ae0,_0xfe1862=/\\SELFVAR\[(\d+)\]/gi;while(_0x372afe[_0x5ac439(0x18c)](_0xfe1862)){_0x372afe=_0x372afe[_0x5ac439(0xdb)](_0xfe1862,(_0x422a62,_0x3be068)=>getSelfVariableValue(this[_0x5ac439(0x34f)],this[_0x5ac439(0x19b)],parseInt(_0x3be068)));}return _0x372afe;},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x471)]=function(_0x30c05e,_0x1e0163){const _0x530b10=_0xe91ae0;if(_0x1e0163[_0x530b10(0x18c)](/ANIMATION:[ ](\d+)/i))return this[_0x530b10(0x216)](Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/FADE IN:[ ](\d+)/i))return this[_0x530b10(0x4e8)](Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/FADE OUT:[ ](\d+)/i))return this[_0x530b10(0x17c)](Number(RegExp['$1']));if(_0x1e0163['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x530b10(0x2a5)]();if(_0x1e0163[_0x530b10(0x18c)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x1e0163[_0x530b10(0x18c)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x530b10(0x382)]();if(_0x1e0163[_0x530b10(0x18c)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x1e0163[_0x530b10(0x18c)](/HUG:[ ]LEFT/i))return this[_0x530b10(0x189)](_0x530b10(0xe5));if(_0x1e0163[_0x530b10(0x18c)](/HUG:[ ]RIGHT/i))return this[_0x530b10(0x189)](_0x530b10(0x49c));if(_0x1e0163[_0x530b10(0x18c)](/INDEX:[ ](\d+)/i))return this[_0x530b10(0x4a5)](Number(RegExp['$1']));if(_0x1e0163['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x53a99a=this[_0x530b10(0x183)]+Number(RegExp['$1']);return this[_0x530b10(0x4a5)](_0x53a99a);}if(_0x1e0163['match'](/JUMP FORWARD:[ ](\d+)/i))return this[_0x530b10(0x591)](Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x530b10(0x29c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e0163[_0x530b10(0x18c)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x16de4f=$gameMap['event'](Number(RegExp['$1']));return this[_0x530b10(0x37d)](_0x16de4f);}if(_0x1e0163['match'](/JUMP TO PLAYER/i))return this[_0x530b10(0x37d)]($gamePlayer);if(_0x1e0163[_0x530b10(0x18c)](/JUMP TO HOME/i)&&this['eventId']){const _0x5ccce3=this[_0x530b10(0x1e7)],_0x418b93=this['_randomHomeY'];return this[_0x530b10(0x29c)](_0x5ccce3,_0x418b93);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x36b6e5=String(RegExp['$1']),_0xcda3e9=this[_0x530b10(0x351)](_0x1e0163);return this['processMoveRouteMoveUntilStop'](_0x36b6e5,_0xcda3e9);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x6f6c77=Number(RegExp['$1']),_0xedcd6d=Number(RegExp['$2']),_0x305369=this[_0x530b10(0x351)](_0x1e0163);return this[_0x530b10(0x271)](_0x6f6c77,_0xedcd6d,_0x305369);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x4e380d=$gameMap[_0x530b10(0x130)](Number(RegExp['$1'])),_0x3f8030=this['checkCollisionKeywords'](_0x1e0163);return this[_0x530b10(0x417)](_0x4e380d,_0x3f8030);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE TO PLAYER/i)){const _0x1b3152=this['checkCollisionKeywords'](_0x1e0163);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x1b3152);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE TO HOME/i)&&this['eventId']){const _0x356eec=this[_0x530b10(0x1e7)],_0x5a98ff=this[_0x530b10(0x3ff)],_0x5b43b8=this[_0x530b10(0x351)](_0x1e0163);return this[_0x530b10(0x271)](_0x356eec,_0x5a98ff,_0x5b43b8);}if(_0x1e0163[_0x530b10(0x18c)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x530b10(0x10e)](0x1,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE DOWN:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x530b10(0x10e)](0x6,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x530b10(0x10e)](0x7,Number(RegExp['$1']));if(_0x1e0163['match'](/MOVE UP:[ ](\d+)/i))return this[_0x530b10(0x10e)](0x8,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x1e0163[_0x530b10(0x18c)](/OPACITY:[ ](\d+)([%％])/i)){const _0xd637ff=Math[_0x530b10(0x583)](Number(RegExp['$1'])/0x64*0xff);return this[_0x530b10(0x22a)](_0xd637ff['clamp'](0x0,0xff));}if(_0x1e0163[_0x530b10(0x18c)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x300465=this[_0x530b10(0xde)]+Math[_0x530b10(0x583)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x300465[_0x530b10(0x1b0)](0x0,0xff));}if(_0x1e0163[_0x530b10(0x18c)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x3e8267=this[_0x530b10(0xde)]+Number(RegExp['$1']);return this[_0x530b10(0x22a)](_0x3e8267[_0x530b10(0x1b0)](0x0,0xff));}if(_0x1e0163[_0x530b10(0x18c)](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x1e0163['match'](/PATTERN UNLOCK/i))return this[_0x530b10(0x200)]=![];if(_0x1e0163[_0x530b10(0x18c)](/POSE:[ ](.*)/i)){const _0x193e6f=String(RegExp['$1'])[_0x530b10(0x36b)]()['trim']();return this['setPose'](_0x193e6f);}if(_0x1e0163[_0x530b10(0x18c)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2907c9=Number(RegExp['$1']),_0x2b16cd=Number(RegExp['$2']);return this[_0x530b10(0x317)](_0x2907c9,_0x2b16cd);}if(_0x1e0163[_0x530b10(0x18c)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x319aee=$gameMap[_0x530b10(0x130)](Number(RegExp['$1']));return this[_0x530b10(0x1d5)](_0x319aee);}if(_0x1e0163[_0x530b10(0x18c)](/STEP TOWARD PLAYER/i))return this[_0x530b10(0x1d5)]($gamePlayer);if(_0x1e0163['match'](/STEP TOWARD HOME/i)&&this[_0x530b10(0x247)]){const _0x408ea7=this[_0x530b10(0x1e7)],_0x3f693e=this['_randomHomeY'];return this[_0x530b10(0x317)](_0x408ea7,_0x3f693e);}if(_0x1e0163[_0x530b10(0x18c)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e0163[_0x530b10(0x18c)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x11bc9c=$gameMap[_0x530b10(0x130)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x11bc9c);}if(_0x1e0163[_0x530b10(0x18c)](/STEP AWAY FROM PLAYER/i))return this[_0x530b10(0x3ed)]($gamePlayer);if(_0x1e0163[_0x530b10(0x18c)](/STEP AWAY FROM HOME/i)&&this[_0x530b10(0x247)]){const _0x2cb3e7=this[_0x530b10(0x1e7)],_0x24a2be=this[_0x530b10(0x3ff)];return this[_0x530b10(0x4f9)](_0x2cb3e7,_0x24a2be);}if(_0x1e0163[_0x530b10(0x18c)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x530b10(0x582)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e0163[_0x530b10(0x18c)](/TURN TO EVENT:[ ](\d+)/i)){const _0x5c6a44=$gameMap[_0x530b10(0x130)](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x5c6a44);}if(_0x1e0163[_0x530b10(0x18c)](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x1e0163[_0x530b10(0x18c)](/TURN TO HOME/i)&&this[_0x530b10(0x247)]){const _0xd0e4b9=this[_0x530b10(0x1e7)],_0x5b0b5c=this[_0x530b10(0x3ff)];return this[_0x530b10(0x4f4)](_0xd0e4b9,_0x5b0b5c);}if(_0x1e0163[_0x530b10(0x18c)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x530b10(0x285)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e0163[_0x530b10(0x18c)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x24e628=$gameMap[_0x530b10(0x130)](Number(RegExp['$1']));return this[_0x530b10(0x23d)](_0x24e628);}if(_0x1e0163[_0x530b10(0x18c)](/TURN AWAY FROM PLAYER/i))return this[_0x530b10(0x23d)]($gamePlayer);if(_0x1e0163['match'](/TURN AWAY FROM HOME/i)&&this[_0x530b10(0x247)]){const _0x1c3330=this['_randomHomeX'],_0x221da8=this[_0x530b10(0x3ff)];return this[_0x530b10(0x285)](_0x1c3330,_0x221da8);}if(_0x1e0163[_0x530b10(0x18c)](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x1e0163[_0x530b10(0x18c)](/TURN LOWER RIGHT/i))return this[_0x530b10(0x3e6)](0x3);if(_0x1e0163['match'](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x1e0163[_0x530b10(0x18c)](/TURN UPPER RIGHT/i))return this[_0x530b10(0x3e6)](0x9);if(_0x1e0163[_0x530b10(0x18c)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x530b10(0x241)](RegExp['$1'],RegExp['$2']);if(_0x1e0163['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x530b10(0x59e)](RegExp['$1'],RegExp['$2']);if(_0x1e0163[_0x530b10(0x18c)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x530b10(0x1ca)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x1e0163['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x52bc87=$gameMap[_0x530b10(0x130)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x52bc87);}if(_0x1e0163[_0x530b10(0x18c)](/TELEPORT TO PLAYER/i))return this[_0x530b10(0x590)]($gamePlayer);if(_0x1e0163[_0x530b10(0x18c)](/TELEPORT TO HOME/i)&&this[_0x530b10(0x247)]){const _0x2911f1=this[_0x530b10(0x1e7)],_0x1598bb=this[_0x530b10(0x3ff)];return this[_0x530b10(0x1ca)](_0x2911f1,_0x1598bb);}try{VisuMZ[_0x530b10(0x24e)][_0x530b10(0x37f)][_0x530b10(0x24f)](this,_0x30c05e);}catch(_0x5249cb){if($gameTemp[_0x530b10(0x175)]())console[_0x530b10(0x184)](_0x5249cb);}},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x216)]=function(_0x14dbb3){const _0x9af6fd=_0xe91ae0;$gameTemp[_0x9af6fd(0xdc)]([this],_0x14dbb3);},Game_Character['prototype'][_0xe91ae0(0x551)]=function(_0x5b60f7){const _0x554bab=_0xe91ae0;let _0x30011f=0x0;switch(_0x5b60f7[_0x554bab(0x36b)]()[_0x554bab(0x41a)]()){case'!':case _0x554bab(0xee):_0x30011f=0x1;break;case'?':case _0x554bab(0x30c):_0x30011f=0x2;break;case _0x554bab(0x360):case _0x554bab(0x5ac):case _0x554bab(0x4a2):case _0x554bab(0x280):case _0x554bab(0x331):_0x30011f=0x3;break;case _0x554bab(0x38c):case _0x554bab(0x159):_0x30011f=0x4;break;case'ANGER':_0x30011f=0x5;break;case _0x554bab(0x566):_0x30011f=0x6;break;case _0x554bab(0x56b):case _0x554bab(0xf7):case'FRUSTRATION':_0x30011f=0x7;break;case _0x554bab(0xff):case'...':_0x30011f=0x8;break;case _0x554bab(0x345):case _0x554bab(0x53c):case _0x554bab(0x1ef):case _0x554bab(0x54e):case _0x554bab(0x4af):_0x30011f=0x9;break;case'Z':case'ZZ':case _0x554bab(0x1ea):case _0x554bab(0x292):_0x30011f=0xa;break;case _0x554bab(0x3f3):_0x30011f=0xb;break;case _0x554bab(0x454):_0x30011f=0xc;break;case _0x554bab(0x254):_0x30011f=0xd;break;case _0x554bab(0x37b):_0x30011f=0xe;break;case'USER-DEFINED\x205':_0x30011f=0xf;break;}$gameTemp[_0x554bab(0x35a)](this,_0x30011f);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x4e8)]=function(_0x4d532e){const _0x253478=_0xe91ae0;_0x4d532e+=this[_0x253478(0xde)],this[_0x253478(0x22a)](_0x4d532e['clamp'](0x0,0xff));if(this[_0x253478(0xde)]<0xff)this['_moveRouteIndex']--;},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteFadeOut']=function(_0x372231){const _0xa1ac77=_0xe91ae0;_0x372231=this[_0xa1ac77(0xde)]-_0x372231,this[_0xa1ac77(0x22a)](_0x372231['clamp'](0x0,0xff));if(this['_opacity']>0x0)this['_moveRouteIndex']--;},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x189)]=function(_0x4779aa){const _0x17bcd6=_0xe91ae0,_0x56a579=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4ff6ff=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x59ee35=this[_0x17bcd6(0x3c3)](),_0x128cb5=(_0x4779aa===_0x17bcd6(0xe5)?_0x56a579:_0x4ff6ff)[_0x59ee35],_0x53da79=(_0x4779aa===_0x17bcd6(0xe5)?_0x4ff6ff:_0x56a579)[_0x59ee35];if(this[_0x17bcd6(0x153)](this['x'],this['y'],_0x128cb5))_0x4779aa==='left'?this['turnLeft90']():this['turnRight90']();else!this['canPass'](this['x'],this['y'],this[_0x17bcd6(0x3c3)]())&&(this[_0x17bcd6(0x153)](this['x'],this['y'],_0x53da79)?_0x4779aa===_0x17bcd6(0xe5)?this['turnRight90']():this[_0x17bcd6(0x5a3)]():this[_0x17bcd6(0x180)]());this[_0x17bcd6(0x153)](this['x'],this['y'],this['direction']())&&this[_0x17bcd6(0x1a0)]();},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x4a5)]=function(_0x2a1b9f){const _0x14376c=_0xe91ae0;if(ImageManager[_0x14376c(0x498)](this[_0x14376c(0x3cb)]))return;_0x2a1b9f=_0x2a1b9f[_0x14376c(0x1b0)](0x0,0x7),this[_0x14376c(0x283)](this['_characterName'],_0x2a1b9f);},Game_Character['prototype']['processMoveRouteJumpForward']=function(_0x4b2be8){const _0x22d7f1=_0xe91ae0;switch(this[_0x22d7f1(0x3c3)]()){case 0x1:this[_0x22d7f1(0x134)](-_0x4b2be8,_0x4b2be8);break;case 0x2:this[_0x22d7f1(0x134)](0x0,_0x4b2be8);break;case 0x3:this[_0x22d7f1(0x134)](_0x4b2be8,_0x4b2be8);break;case 0x4:this['jump'](-_0x4b2be8,0x0);break;case 0x6:this['jump'](_0x4b2be8,0x0);break;case 0x7:this['jump'](-_0x4b2be8,-_0x4b2be8);break;case 0x8:this['jump'](0x0,-_0x4b2be8);break;case 0x9:this[_0x22d7f1(0x134)](_0x4b2be8,-_0x4b2be8);break;}},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x29c)]=function(_0x556dee,_0x14e42d){const _0x3cecb7=_0xe91ae0,_0x384b60=Math['round'](_0x556dee-this['x']),_0x12c916=Math['round'](_0x14e42d-this['y']);this[_0x3cecb7(0x134)](_0x384b60,_0x12c916);},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteJumpToCharacter']=function(_0x1162e9){if(_0x1162e9)this['processMoveRouteJumpTo'](_0x1162e9['x'],_0x1162e9['y']);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x317)]=function(_0x1cb252,_0x221c4c,_0x478de9){const _0xd98790=_0xe91ae0;let _0x4f817c=0x0;if(_0x478de9)$gameTemp[_0xd98790(0x2fc)]=!![];$gameMap['isSupportDiagonalMovement']()?_0x4f817c=this[_0xd98790(0x4e6)](_0x1cb252,_0x221c4c):_0x4f817c=this[_0xd98790(0x5b0)](_0x1cb252,_0x221c4c);if(_0x478de9)$gameTemp[_0xd98790(0x2fc)]=![];this[_0xd98790(0x109)](_0x4f817c),this[_0xd98790(0x17e)](!![]);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x1d5)]=function(_0x38ecc1){const _0x1d83c3=_0xe91ae0;if(_0x38ecc1)this[_0x1d83c3(0x317)](_0x38ecc1['x'],_0x38ecc1['y']);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x457)]=function(_0x5785b7,_0x47bd7d){const _0x22dbd4=_0xe91ae0,_0x447bef=this[_0x22dbd4(0x31e)](_0x5785b7),_0x58e6c0=this[_0x22dbd4(0x480)](_0x47bd7d);},Game_Character[_0xe91ae0(0x36f)]['checkCollisionKeywords']=function(_0x4b92e5){const _0x5f0f77=_0xe91ae0;if(_0x4b92e5[_0x5f0f77(0x18c)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x4b92e5[_0x5f0f77(0x18c)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0xe91ae0(0x24e)]['Game_Event_isCollidedWithPlayerCharacters']=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x148)],Game_Event[_0xe91ae0(0x36f)]['isCollidedWithPlayerCharacters']=function(_0x2e4419,_0xd02283){const _0x18046b=_0xe91ae0;if($gameTemp[_0x18046b(0x2fc)])return![];return VisuMZ['EventsMoveCore'][_0x18046b(0x423)][_0x18046b(0x24f)](this,_0x2e4419,_0xd02283);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x3cc)]=function(_0x4b8ecb,_0x2bcafa){const _0x25dddd=_0xe91ae0,_0x405259=['',_0x25dddd(0x2de),_0x25dddd(0x51b),_0x25dddd(0x540),_0x25dddd(0x435),'',_0x25dddd(0x3db),_0x25dddd(0x162),'UP',_0x25dddd(0x39a)],_0x21daae=_0x405259[_0x25dddd(0x28f)](_0x4b8ecb[_0x25dddd(0x36b)]()[_0x25dddd(0x41a)]());if(_0x21daae<=0x0)return;_0x2bcafa&&($gameTemp['_moveAllowPlayerCollision']=!![]),this[_0x25dddd(0x153)](this['x'],this['y'],_0x21daae)&&(_0x2bcafa&&($gameTemp[_0x25dddd(0x2fc)]=![]),this[_0x25dddd(0x109)](_0x21daae),this[_0x25dddd(0x2f1)]-=0x1),_0x2bcafa&&($gameTemp[_0x25dddd(0x2fc)]=![]);},VisuMZ['EventsMoveCore'][_0xe91ae0(0x1e5)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4ea)],Game_Event['prototype'][_0xe91ae0(0x4ea)]=function(_0x401be8,_0x4c71a6){const _0x48afb2=_0xe91ae0;if(VisuMZ[_0x48afb2(0x24e)][_0x48afb2(0x1e5)][_0x48afb2(0x24f)](this,_0x401be8,_0x4c71a6))return!![];if($gameMap[_0x48afb2(0x42c)]())return![];for(let _0x5beada=-this[_0x48afb2(0x5a9)][_0x48afb2(0xe5)];_0x5beada<=this[_0x48afb2(0x5a9)][_0x48afb2(0x49c)];_0x5beada++){for(let _0x95e783=-this[_0x48afb2(0x5a9)]['up'];_0x95e783<=this['_addedHitbox'][_0x48afb2(0x419)];_0x95e783++){if(VisuMZ[_0x48afb2(0x24e)]['Game_Event_checkEventTriggerTouch'][_0x48afb2(0x24f)](this,_0x401be8+_0x5beada,_0x4c71a6+_0x95e783))return!![];}}return![];},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x271)]=function(_0x406a51,_0x178867,_0x41c8ed){const _0x2e392c=_0xe91ae0;this[_0x2e392c(0x317)](_0x406a51,_0x178867,_0x41c8ed);if(this['x']!==_0x406a51||this['y']!==_0x178867)this[_0x2e392c(0x2f1)]--;},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x417)]=function(_0x4b9003,_0x512bd4){const _0x4fbecf=_0xe91ae0;if(_0x4b9003&&!_0x4b9003[_0x4fbecf(0x202)]){this[_0x4fbecf(0x271)](_0x4b9003['x'],_0x4b9003['y'],_0x512bd4);if(_0x4b9003['isNormalPriority']()&&this['isNormalPriority']()){const _0x49f1bb=$gameMap[_0x4fbecf(0x443)](this['x'],this['y'],_0x4b9003['x'],_0x4b9003['y']);if(_0x49f1bb<=0x1)this['_moveRouteIndex']++;}}},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x10e)]=function(_0x1f1092,_0x50ad94){const _0x132ea1=_0xe91ae0;_0x50ad94=_0x50ad94||0x0;const _0x6ba475={'code':0x1,'indent':null,'parameters':[]};_0x6ba475[_0x132ea1(0x497)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1f1092],this[_0x132ea1(0x1f5)][_0x132ea1(0x22b)][this[_0x132ea1(0x2f1)]][_0x132ea1(0x3f0)][0x0]='';while(_0x50ad94--){this[_0x132ea1(0x1f5)][_0x132ea1(0x22b)][_0x132ea1(0x231)](this[_0x132ea1(0x2f1)]+0x1,0x0,_0x6ba475);}},Game_Character[_0xe91ae0(0x36f)]['processMoveRoutePatternLock']=function(_0xf51d87){const _0x56017e=_0xe91ae0;this[_0x56017e(0x200)]=!![],this[_0x56017e(0x2ff)](_0xf51d87);},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteSelfSwitch']=function(_0x1803c7,_0x1b5165){const _0x233978=_0xe91ae0;if(this===$gamePlayer)return;const _0x397f68=[this[_0x233978(0x34f)],this[_0x233978(0x19b)],'A'];_0x1803c7['match'](/\b[ABCD]\b/i)?_0x397f68[0x2]=String(_0x1803c7)[_0x233978(0x35f)](0x0)['toUpperCase']()[_0x233978(0x41a)]():_0x397f68[0x2]=_0x233978(0x35c)[_0x233978(0x54a)](_0x1803c7);switch(_0x1b5165[_0x233978(0x36b)]()[_0x233978(0x41a)]()){case'ON':case _0x233978(0x18a):$gameSelfSwitches['setValue'](_0x397f68,!![]);break;case _0x233978(0x42b):case'FALSE':$gameSelfSwitches[_0x233978(0x20a)](_0x397f68,![]);break;case _0x233978(0x395):$gameSelfSwitches['setValue'](_0x397f68,!$gameSelfSwitches['value'](_0x397f68));break;}},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteSelfVariable']=function(_0x572443,_0x365b68){const _0x5ec31b=_0xe91ae0;if(this===$gamePlayer)return;const _0x17533c=[this[_0x5ec31b(0x34f)],this[_0x5ec31b(0x19b)],_0x5ec31b(0x370)[_0x5ec31b(0x54a)](_0x572443)];$gameSelfSwitches[_0x5ec31b(0x20a)](_0x17533c,Number(_0x365b68));},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteTeleportTo']=function(_0x429d63,_0x1e9d8b){this['locate'](_0x429d63,_0x1e9d8b);},Game_Character[_0xe91ae0(0x36f)]['processMoveRouteTeleportToCharacter']=function(_0x5ecb46){const _0x53522f=_0xe91ae0;if(_0x5ecb46)this[_0x53522f(0x1ca)](_0x5ecb46['x'],_0x5ecb46['y']);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x597)]=function(){const _0x1356e8=_0xe91ae0;switch(this[_0x1356e8(0x3c3)]()){case 0x1:this[_0x1356e8(0x3e6)](0x7);break;case 0x2:this[_0x1356e8(0x3e6)](0x4);break;case 0x3:this[_0x1356e8(0x3e6)](0x1);break;case 0x4:this[_0x1356e8(0x3e6)](0x8);break;case 0x6:this[_0x1356e8(0x3e6)](0x2);break;case 0x7:this[_0x1356e8(0x3e6)](0x9);break;case 0x8:this[_0x1356e8(0x3e6)](0x6);break;case 0x9:this[_0x1356e8(0x3e6)](0x3);break;}},Game_Character[_0xe91ae0(0x36f)]['turnLeft90']=function(){const _0x17ae2c=_0xe91ae0;switch(this[_0x17ae2c(0x3c3)]()){case 0x1:this[_0x17ae2c(0x3e6)](0x3);break;case 0x2:this[_0x17ae2c(0x3e6)](0x6);break;case 0x3:this[_0x17ae2c(0x3e6)](0x9);break;case 0x4:this[_0x17ae2c(0x3e6)](0x2);break;case 0x6:this['setDirection'](0x8);break;case 0x7:this[_0x17ae2c(0x3e6)](0x1);break;case 0x8:this[_0x17ae2c(0x3e6)](0x4);break;case 0x9:this[_0x17ae2c(0x3e6)](0x7);break;}},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x15a)]=function(_0x3ac1be,_0xe5203f,_0x4210a0){const _0x361392=_0xe91ae0,_0x20efc6=this['deltaXFrom'](_0x3ac1be),_0xe4e6cc=this['deltaYFrom'](_0xe5203f);if($gameMap[_0x361392(0x4fc)]()){if(_0x4210a0||this[_0x361392(0x3b0)]()){if(_0x20efc6>0x0&&_0xe4e6cc<0x0)return 0x1;if(_0x20efc6<0x0&&_0xe4e6cc<0x0)return 0x3;if(_0x20efc6>0x0&&_0xe4e6cc>0x0)return 0x7;if(_0x20efc6<0x0&&_0xe4e6cc>0x0)return 0x9;}}if(Math[_0x361392(0x500)](_0x20efc6)>Math[_0x361392(0x500)](_0xe4e6cc))return _0x20efc6>0x0?0x4:0x6;else{if(_0xe4e6cc!==0x0)return _0xe4e6cc>0x0?0x8:0x2;}return 0x0;},Game_Character[_0xe91ae0(0x36f)]['getDirectionFromPoint']=function(_0x164d26,_0x1bf674,_0x1386e6){const _0x13a28e=_0xe91ae0,_0x5ae707=this[_0x13a28e(0x31e)](_0x164d26),_0x1ecac7=this[_0x13a28e(0x480)](_0x1bf674);if($gameMap[_0x13a28e(0x4fc)]()){if(_0x1386e6||this[_0x13a28e(0x3b0)]()){if(_0x5ae707>0x0&&_0x1ecac7<0x0)return 0x9;if(_0x5ae707<0x0&&_0x1ecac7<0x0)return 0x7;if(_0x5ae707>0x0&&_0x1ecac7>0x0)return 0x3;if(_0x5ae707<0x0&&_0x1ecac7>0x0)return 0x1;}}if(Math[_0x13a28e(0x500)](_0x5ae707)>Math['abs'](_0x1ecac7))return _0x5ae707>0x0?0x6:0x4;else{if(_0x1ecac7!==0x0)return _0x1ecac7>0x0?0x2:0x8;}return 0x0;},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x582)]=function(_0x3a10bc,_0x2ce5d6){const _0x57f664=_0xe91ae0,_0x720993=this[_0x57f664(0x15a)](_0x3a10bc,_0x2ce5d6,!![]);if(_0x720993)this[_0x57f664(0x109)](_0x720993);},Game_Character['prototype'][_0xe91ae0(0x4f9)]=function(_0x1ae53e,_0x244925){const _0x53d6ec=_0xe91ae0,_0x304ea8=this[_0x53d6ec(0x45c)](_0x1ae53e,_0x244925,!![]);if(_0x304ea8)this['executeMoveDir8'](_0x304ea8);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x4f4)]=function(_0x298820,_0x175daf){const _0x1d9d62=_0xe91ae0,_0x50911b=this[_0x1d9d62(0x15a)](_0x298820,_0x175daf,![]);if(_0x50911b)this[_0x1d9d62(0x3e6)](_0x50911b);},Game_Character['prototype'][_0xe91ae0(0x285)]=function(_0x56d18e,_0x1154a8){const _0x165b52=_0xe91ae0,_0x11d68f=this['getDirectionFromPoint'](_0x56d18e,_0x1154a8,![]);if(_0x11d68f)this[_0x165b52(0x3e6)](_0x11d68f);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x2b5)]=function(_0x54f3be){const _0x3d8c44=_0xe91ae0;if(_0x54f3be)this[_0x3d8c44(0x582)](_0x54f3be['x'],_0x54f3be['y']);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x3ed)]=function(_0x531f5c){const _0x4b7303=_0xe91ae0;if(_0x531f5c)this[_0x4b7303(0x4f9)](_0x531f5c['x'],_0x531f5c['y']);},Game_Character['prototype'][_0xe91ae0(0xf4)]=function(_0x2880d7){const _0x116ced=_0xe91ae0;if(_0x2880d7)this[_0x116ced(0x4f4)](_0x2880d7['x'],_0x2880d7['y']);},Game_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x23d)]=function(_0x51ab40){if(_0x51ab40)this['turnAwayFromPoint'](_0x51ab40['x'],_0x51ab40['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player['prototype']['isDashing'],Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x233)]=function(){const _0x411fae=_0xe91ae0;if(!Game_CharacterBase[_0x411fae(0x2bc)]&&this['isOnLadder']())return![];if(this[_0x411fae(0x320)])return!![];return VisuMZ[_0x411fae(0x24e)][_0x411fae(0x4ac)][_0x411fae(0x24f)](this);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x178)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x2b6)],Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x2b6)]=function(){const _0x39c81d=_0xe91ae0;return $gameMap[_0x39c81d(0x4fc)]()?this['getInputDir8']():VisuMZ[_0x39c81d(0x24e)][_0x39c81d(0x178)][_0x39c81d(0x24f)](this);},Game_Player[_0xe91ae0(0x36f)]['getInputDir8']=function(){const _0x54e994=_0xe91ae0;return Input[_0x54e994(0x1a3)];},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x343)]=function(){const _0x4ca5b2=_0xe91ae0;if($gameSystem[_0x4ca5b2(0x334)]())return 0x0;if(!this[_0x4ca5b2(0x299)]()&&this[_0x4ca5b2(0x3f5)]()){let _0x27bb15=this[_0x4ca5b2(0x2b6)]();if(_0x27bb15>0x0)$gameTemp[_0x4ca5b2(0x50f)]();else{if($gameTemp['isDestinationValid']()){const _0x175711=$gameTemp[_0x4ca5b2(0x3b1)](),_0x573b4c=$gameTemp[_0x4ca5b2(0x327)]();this[_0x4ca5b2(0x3b4)](_0x175711,_0x573b4c)?_0x27bb15=this['findDiagonalDirectionTo'](_0x175711,_0x573b4c):_0x27bb15=this[_0x4ca5b2(0x5b0)](_0x175711,_0x573b4c);}}_0x27bb15>0x0?(this[_0x4ca5b2(0x3de)]=this[_0x4ca5b2(0x3de)]||0x0,this[_0x4ca5b2(0x276)]()?this[_0x4ca5b2(0x3e6)](_0x27bb15):this[_0x4ca5b2(0x113)](_0x27bb15),this['_inputTime']++):this['_inputTime']=0x0;}},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x276)]=function(){const _0x2d3b13=_0xe91ae0,_0x38d633=VisuMZ['EventsMoveCore'][_0x2d3b13(0x477)][_0x2d3b13(0xdf)];if(!_0x38d633['EnableTurnInPlace'])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x2d3b13(0x233)]()||this[_0x2d3b13(0x299)]()||this[_0x2d3b13(0x3c5)]())return![];return this[_0x2d3b13(0x3de)]<_0x38d633[_0x2d3b13(0x143)];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x4b3)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x113)],Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x113)]=function(_0x103895){const _0x328c98=_0xe91ae0;$gameMap[_0x328c98(0x4fc)]()?this[_0x328c98(0x109)](_0x103895):VisuMZ[_0x328c98(0x24e)][_0x328c98(0x4b3)][_0x328c98(0x24f)](this,_0x103895);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x172)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x488)],Game_Player['prototype']['isMapPassable']=function(_0xf4b987,_0x535f8e,_0x22411a){const _0x199764=_0xe91ae0;if($gameMap[_0x199764(0xed)](_0xf4b987,_0x535f8e,_0x22411a,_0x199764(0x52e)))return this[_0x199764(0x5b4)]()&&this[_0x199764(0x2ef)]()?this[_0x199764(0x2ef)]()[_0x199764(0x488)](_0xf4b987,_0x535f8e,_0x22411a):!![];if($gameMap[_0x199764(0x188)](_0xf4b987,_0x535f8e,_0x22411a,_0x199764(0x52e)))return![];return VisuMZ[_0x199764(0x24e)][_0x199764(0x172)]['call'](this,_0xf4b987,_0x535f8e,_0x22411a);},VisuMZ['EventsMoveCore'][_0xe91ae0(0x20c)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x2cc)],Game_Player[_0xe91ae0(0x36f)]['checkEventTriggerHere']=function(_0x48113d){const _0x33c73a=_0xe91ae0;VisuMZ[_0x33c73a(0x24e)][_0x33c73a(0x20c)][_0x33c73a(0x24f)](this,_0x48113d);if(this[_0x33c73a(0x5a7)]()){this['checkEventTriggerEventsMoveCore'](_0x48113d);if(_0x48113d['includes'](0x0)&&this[_0x33c73a(0x482)]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x48113d[_0x33c73a(0x575)](0x1)||_0x48113d[_0x33c73a(0x575)](0x2))&&this[_0x33c73a(0x103)]();}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0xd5)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x4c1)],Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x4c1)]=function(_0x315386){const _0x3f10b3=_0xe91ae0;VisuMZ[_0x3f10b3(0x24e)][_0x3f10b3(0xd5)][_0x3f10b3(0x24f)](this,_0x315386);if(this[_0x3f10b3(0x5a7)]()&&_0x315386[_0x3f10b3(0x575)](0x0)&&this[_0x3f10b3(0x482)]()===_0x3f10b3(0x1cd)){const _0x55c65f=this[_0x3f10b3(0x3c3)](),_0x2ea7fb=$gameMap[_0x3f10b3(0x208)](this['x'],_0x55c65f),_0x5c7aed=$gameMap[_0x3f10b3(0x3c7)](this['y'],_0x55c65f);this[_0x3f10b3(0x1b9)](_0x2ea7fb,_0x5c7aed);}},Game_Player['prototype'][_0xe91ae0(0x558)]=function(_0x277890){const _0x2ebfee=_0xe91ae0;if($gameMap[_0x2ebfee(0x42c)]())return;if($gameMap['isAnyEventStarting']())return;const _0x3fc7ee=$gameMap[_0x2ebfee(0x45b)]();for(const _0x459b83 of _0x3fc7ee){if(!_0x459b83)continue;if(!_0x459b83[_0x2ebfee(0x14d)](_0x277890))continue;if(this[_0x2ebfee(0x238)](_0x459b83))return _0x459b83[_0x2ebfee(0x4c4)]();if(this['meetActivationProximityConditions'](_0x459b83))return _0x459b83[_0x2ebfee(0x4c4)]();}},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x238)]=function(_0x172871){const _0x5d2853=_0xe91ae0;if($gameMap[_0x5d2853(0x42c)]())return![];if($gameMap[_0x5d2853(0x164)]())return![];return _0x172871[_0x5d2853(0xd4)]()[_0x5d2853(0x575)](this[_0x5d2853(0x3ac)]());},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x53a)]=function(_0x415584){const _0x3e5314=_0xe91ae0;if($gameMap[_0x3e5314(0x42c)]())return![];if($gameMap[_0x3e5314(0x164)]())return![];if([_0x3e5314(0x4c6),_0x3e5314(0x220)][_0x3e5314(0x575)](_0x415584[_0x3e5314(0x587)]()))return![];const _0x89a4e8=_0x415584[_0x3e5314(0x587)](),_0x417a0d=_0x415584[_0x3e5314(0x139)]();return this[_0x3e5314(0x4c7)](_0x415584,_0x89a4e8,_0x417a0d);},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x4c7)]=function(_0x33413a,_0x4ec975,_0x3627ca,_0x3ffa14,_0x196e26){const _0x3a20af=_0xe91ae0;switch(_0x3ffa14){case _0x3a20af(0x2da):return _0x196e26>=Math[_0x3a20af(0x500)](_0x3627ca[_0x3a20af(0x31e)](_0x33413a))&&_0x196e26>=Math[_0x3a20af(0x500)](_0x3627ca[_0x3a20af(0x480)](_0x4ec975));break;case _0x3a20af(0x4be):const _0xe4b690=Math[_0x3a20af(0x132)](_0x3627ca['x']-_0x33413a,0x2),_0x70491c=Math[_0x3a20af(0x132)](_0x3627ca['y']-_0x4ec975,0x2);return _0x196e26>=Math[_0x3a20af(0x583)](Math[_0x3a20af(0x449)](_0xe4b690+_0x70491c));break;case'radius':case'delta':case'diamond':const _0x5bb617=$gameMap[_0x3a20af(0x443)](_0x33413a,_0x4ec975,_0x3627ca['x'],_0x3627ca['y']);return _0x196e26>=_0x5bb617;break;case _0x3a20af(0x2dc):return _0x196e26>=Math[_0x3a20af(0x500)](_0x3627ca[_0x3a20af(0x480)](_0x4ec975));break;case _0x3a20af(0x4f1):return _0x196e26>=Math[_0x3a20af(0x500)](_0x3627ca['deltaXFrom'](_0x33413a));break;}return![];},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x4c7)]=function(_0x122ff6,_0x169353,_0x3f749d){const _0x31985f=_0xe91ae0,_0x2df649=this['x'],_0x49ceaf=this['y'];return $gameMap[_0x31985f(0x4c7)](_0x2df649,_0x49ceaf,_0x122ff6,_0x169353,_0x3f749d);},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x1b9)]=function(_0x4249fe,_0x17e8ea){const _0x16f78d=_0xe91ae0;if($gameMap[_0x16f78d(0x42c)]())return;if($gameMap['isAnyEventStarting']())return;let _0x239eb3=VisuMZ['EventsMoveCore'][_0x16f78d(0x477)][_0x16f78d(0x336)],_0x3dd5b7=$gameMap['regionId'](_0x4249fe,_0x17e8ea);const _0x3ed7fa=_0x16f78d(0x3d5)[_0x16f78d(0x54a)](_0x3dd5b7);_0x239eb3[_0x3ed7fa]&&$gameTemp[_0x16f78d(0x21e)](_0x239eb3[_0x3ed7fa]);},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x482)]=function(){const _0x2a02ae=_0xe91ae0;return VisuMZ['EventsMoveCore']['Settings'][_0x2a02ae(0x214)];},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x103)]=function(){const _0x50189e=_0xe91ae0;if($gameMap[_0x50189e(0x42c)]())return;if($gameMap[_0x50189e(0x164)]())return;let _0x1318af=VisuMZ[_0x50189e(0x24e)]['Settings']['RegionTouch'];const _0x3ab8ae=_0x50189e(0x3d5)[_0x50189e(0x54a)](this[_0x50189e(0x3ac)]());_0x1318af[_0x3ab8ae]&&$gameTemp[_0x50189e(0x21e)](_0x1318af[_0x3ab8ae]);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x448)]=Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x4e0)],Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x4e0)]=function(){const _0x25e66e=_0xe91ae0;VisuMZ[_0x25e66e(0x24e)][_0x25e66e(0x448)][_0x25e66e(0x24f)](this),VisuMZ[_0x25e66e(0x1eb)](0x0);},Game_Player[_0xe91ae0(0x36f)][_0xe91ae0(0x338)]=function(){VisuMZ['FaceSynchAllSynchTargets'](0x0);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x150)]=Game_Follower['prototype']['initialize'],Game_Follower['prototype'][_0xe91ae0(0x2f0)]=function(_0x3d39fd){const _0x523c40=_0xe91ae0;VisuMZ[_0x523c40(0x24e)][_0x523c40(0x150)][_0x523c40(0x24f)](this,_0x3d39fd),this[_0x523c40(0x21f)]=![];},Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x233)]=function(){const _0x1afa2d=_0xe91ae0;if(this[_0x1afa2d(0x21f)])return Game_Character[_0x1afa2d(0x36f)][_0x1afa2d(0x233)][_0x1afa2d(0x24f)](this);return $gamePlayer[_0x1afa2d(0x233)]();},Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x3f2)]=function(){const _0x1e3ef0=_0xe91ae0;if(this['_chaseOff'])return Game_Character[_0x1e3ef0(0x36f)][_0x1e3ef0(0x3f2)]['call'](this);return $gamePlayer[_0x1e3ef0(0x3f2)]()&&this[_0x1e3ef0(0x3bb)];},Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x34e)]=function(){const _0x4abb9a=_0xe91ae0;return $gamePlayer[_0x4abb9a(0x34e)]();},Game_Follower[_0xe91ae0(0x36f)]['updateStop']=function(){const _0xfb6e6c=_0xe91ae0;Game_Character[_0xfb6e6c(0x36f)][_0xfb6e6c(0x155)][_0xfb6e6c(0x24f)](this),this[_0xfb6e6c(0x2e1)]>0x0&&(this['_actuallyMoving']=![]);},Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x2d8)]=function(_0x1ace8e){this['_chaseOff']=_0x1ace8e;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x323)]=Game_Follower[_0xe91ae0(0x36f)][_0xe91ae0(0x1c2)],Game_Follower[_0xe91ae0(0x36f)]['chaseCharacter']=function(_0x494b27){const _0x489463=_0xe91ae0;if(this[_0x489463(0x21f)])return;if($gameSystem[_0x489463(0x553)]())return;VisuMZ[_0x489463(0x24e)]['Game_Follower_chaseCharacter']['call'](this,_0x494b27),this[_0x489463(0x3bb)]=!![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x145)]=Game_Vehicle[_0xe91ae0(0x36f)][_0xe91ae0(0x488)],Game_Vehicle['prototype']['isMapPassable']=function(_0x41315a,_0x27342e,_0x235fbb){const _0x356e3d=_0xe91ae0;if($gameMap[_0x356e3d(0xed)](_0x41315a,_0x27342e,_0x235fbb,this[_0x356e3d(0x310)]))return!![];if($gameMap[_0x356e3d(0x188)](_0x41315a,_0x27342e,_0x235fbb,this[_0x356e3d(0x310)]))return![];return VisuMZ[_0x356e3d(0x24e)][_0x356e3d(0x145)][_0x356e3d(0x24f)](this,_0x41315a,_0x27342e,_0x235fbb);},Game_Vehicle[_0xe91ae0(0x36f)][_0xe91ae0(0x3c2)]=function(_0x3c50a8,_0x164628,_0x209377){const _0x5bc857=_0xe91ae0;if($gameMap[_0x5bc857(0xed)](_0x3c50a8,_0x164628,_0x209377,this[_0x5bc857(0x310)]))return!![];if($gameMap[_0x5bc857(0x188)](_0x3c50a8,_0x164628,_0x209377,this['_type']))return![];return VisuMZ['EventsMoveCore'][_0x5bc857(0x436)]['call']($gamePlayer,_0x3c50a8,_0x164628,_0x209377);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x58f)]=Game_Vehicle[_0xe91ae0(0x36f)][_0xe91ae0(0x225)],Game_Vehicle[_0xe91ae0(0x36f)][_0xe91ae0(0x225)]=function(_0x434238,_0x18f6ba,_0x4428d5){const _0x3b5a3d=_0xe91ae0;if($gameMap[_0x3b5a3d(0x470)](_0x434238,_0x18f6ba,_0x4428d5,this[_0x3b5a3d(0x310)]))return!![];const _0x4a5e12=this[_0x3b5a3d(0x310)][_0x3b5a3d(0x35f)](0x0)[_0x3b5a3d(0x36b)]()+this['_type']['slice'](0x1),_0x215e76=_0x3b5a3d(0x473)[_0x3b5a3d(0x54a)](_0x4a5e12);return VisuMZ[_0x3b5a3d(0x24e)][_0x3b5a3d(0x477)][_0x3b5a3d(0x58c)][_0x215e76]?![]:VisuMZ[_0x3b5a3d(0x24e)][_0x3b5a3d(0x58f)]['call'](this,_0x434238,_0x18f6ba,_0x4428d5);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x44d)]=Game_Vehicle[_0xe91ae0(0x36f)]['initMoveSpeed'],Game_Vehicle[_0xe91ae0(0x36f)][_0xe91ae0(0x1b3)]=function(){const _0x45d693=_0xe91ae0;VisuMZ[_0x45d693(0x24e)][_0x45d693(0x44d)][_0x45d693(0x24f)](this);const _0x3b9655=VisuMZ[_0x45d693(0x24e)]['Settings']['Movement'];if(this['isBoat']()){if(_0x3b9655[_0x45d693(0x257)])this[_0x45d693(0x329)](_0x3b9655['BoatSpeed']);}else{if(this[_0x45d693(0x291)]()){if(_0x3b9655[_0x45d693(0x506)])this['setMoveSpeed'](_0x3b9655[_0x45d693(0x506)]);}else{if(this[_0x45d693(0x201)]()){if(_0x3b9655[_0x45d693(0xc6)])this[_0x45d693(0x329)](_0x3b9655[_0x45d693(0xc6)]);}}}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x51d)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)]=function(_0x50bdec,_0x2ce7c0){const _0x497049=_0xe91ae0;this[_0x497049(0xd7)]=!![],VisuMZ[_0x497049(0x24e)][_0x497049(0x51d)]['call'](this,_0x50bdec,_0x2ce7c0),this[_0x497049(0xd7)]=undefined,this[_0x497049(0x250)](),this[_0x497049(0x565)](),this[_0x497049(0x306)]();},Game_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x557)]=function(_0x48d16c,_0x5453f7){const _0x228dc1=_0xe91ae0;return _0x48d16c===$gameMap[_0x228dc1(0x55b)]()?$dataMap[_0x228dc1(0x45b)][_0x5453f7]:VisuMZ[_0x228dc1(0x15c)][_0x48d16c][_0x228dc1(0x45b)][_0x5453f7];},VisuMZ['EventsMoveCore'][_0xe91ae0(0x293)]=Game_Event[_0xe91ae0(0x36f)]['event'],Game_Event['prototype'][_0xe91ae0(0x130)]=function(){const _0x4eada5=_0xe91ae0;if(this[_0x4eada5(0x32c)]!==undefined){const _0x3151f1=this['_eventMorphData'][_0x4eada5(0x55b)],_0x5bacc8=this[_0x4eada5(0x32c)][_0x4eada5(0x247)];return $gameMap[_0x4eada5(0x557)](_0x3151f1,_0x5bacc8);}if(this[_0x4eada5(0x3a4)]!==undefined){const _0x1e28d4=this[_0x4eada5(0x3a4)][_0x4eada5(0x55b)],_0x53a545=this[_0x4eada5(0x3a4)][_0x4eada5(0x247)];return $gameMap[_0x4eada5(0x557)](_0x1e28d4,_0x53a545);}if(this[_0x4eada5(0x35e)]!==undefined){const _0x39c93d=this[_0x4eada5(0x35e)]['mapId'],_0x4eec36=this[_0x4eada5(0x35e)][_0x4eada5(0x247)];return $gameMap[_0x4eada5(0x557)](_0x39c93d,_0x4eec36);}if($gameTemp[_0x4eada5(0x401)]!==undefined){const _0x31ba11=$gameTemp[_0x4eada5(0x401)]['mapId'],_0xf98236=$gameTemp[_0x4eada5(0x401)]['eventId'];return $gameMap[_0x4eada5(0x557)](_0x31ba11,_0xf98236);}return VisuMZ[_0x4eada5(0x24e)][_0x4eada5(0x293)][_0x4eada5(0x24f)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x446)]=function(_0x39d6c5,_0x39e8c6){const _0x4bedeb=_0xe91ae0;if(_0x39d6c5===0x0||_0x39e8c6===0x0)return![];if(_0x39d6c5===$gameMap[_0x4bedeb(0x55b)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x39d6c5]&&_0x39d6c5!==$gameMap[_0x4bedeb(0x55b)]())return $gameTemp[_0x4bedeb(0x175)]()&&console[_0x4bedeb(0x184)](_0x4bedeb(0x221)[_0x4bedeb(0x54a)](_0x39d6c5)),![];return!![];},VisuMZ['EventsMoveCore'][_0xe91ae0(0x16b)]=Game_Event['prototype'][_0xe91ae0(0x4c4)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4c4)]=function(){const _0x8dc300=_0xe91ae0;VisuMZ[_0x8dc300(0x24e)]['Game_Event_start'][_0x8dc300(0x24f)](this),Imported[_0x8dc300(0x490)]&&Input[_0x8dc300(0x22d)](VisuMZ[_0x8dc300(0x1e6)][_0x8dc300(0x477)][_0x8dc300(0x39e)]['FastForwardKey'])&&Input[_0x8dc300(0xfe)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x250)]=function(){const _0x53f8e4=_0xe91ae0,_0x4527ee=this['event']()[_0x53f8e4(0x228)];if(_0x4527ee==='')return;if(DataManager[_0x53f8e4(0x352)]()||DataManager[_0x53f8e4(0x367)]())return;const _0x4e9d76=VisuMZ['EventsMoveCore']['Settings']['Template'];let _0x13b93e=null,_0x5dfaff=0x0,_0xb48595=0x0;if(_0x4527ee[_0x53f8e4(0x18c)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x5dfaff=Number(RegExp['$1']),_0xb48595=Number(RegExp['$2']);if(_0x5dfaff===0x0)_0x5dfaff=$gameMap[_0x53f8e4(0x55b)]();}else{if(_0x4527ee['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x5dfaff=Number(RegExp['$1']),_0xb48595=Number(RegExp['$2']);if(_0x5dfaff===0x0)_0x5dfaff=$gameMap['mapId']();}else{if(_0x4527ee['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x43d82d=String(RegExp['$1'])[_0x53f8e4(0x36b)]()[_0x53f8e4(0x41a)]();_0x13b93e=VisuMZ[_0x53f8e4(0x301)][_0x43d82d];if(!_0x13b93e)return;_0x5dfaff=_0x13b93e['MapID'],_0xb48595=_0x13b93e['EventID'];}}}if(!this[_0x53f8e4(0x446)](_0x5dfaff,_0xb48595))return;_0x4e9d76[_0x53f8e4(0x24d)][_0x53f8e4(0x24f)](this,_0x5dfaff,_0xb48595,this);if(_0x13b93e)_0x13b93e[_0x53f8e4(0x24d)][_0x53f8e4(0x24f)](this,_0x5dfaff,_0xb48595,this);this['_eventCopyData']={'mapId':_0x5dfaff,'eventId':_0xb48595},this['_pageIndex']=-0x2,this[_0x53f8e4(0xe8)](),_0x4e9d76[_0x53f8e4(0x1c7)][_0x53f8e4(0x24f)](this,_0x5dfaff,_0xb48595,this);if(_0x13b93e)_0x13b93e[_0x53f8e4(0x1c7)][_0x53f8e4(0x24f)](this,_0x5dfaff,_0xb48595,this);$gameMap[_0x53f8e4(0x275)]();},Game_Event[_0xe91ae0(0x36f)]['setupMorphEvent']=function(){const _0x4c65b3=_0xe91ae0,_0x338df9=$gameSystem[_0x4c65b3(0x2f5)](this);if(!_0x338df9)return;const _0x188d97=_0x338df9[_0x4c65b3(0x3ef)]['toUpperCase']()[_0x4c65b3(0x41a)]();_0x188d97!==_0x4c65b3(0x48f)?this[_0x4c65b3(0x11d)](_0x188d97,!![]):this[_0x4c65b3(0x158)](_0x338df9[_0x4c65b3(0x55b)],_0x338df9[_0x4c65b3(0x247)],!![]);},Game_Event['prototype'][_0xe91ae0(0x158)]=function(_0x982d5a,_0xab5f86,_0xf09024){const _0x4d4f5e=_0xe91ae0;if(!this['checkValidEventerMap'](_0x982d5a,_0xab5f86))return;const _0x5ee1b0=VisuMZ[_0x4d4f5e(0x24e)][_0x4d4f5e(0x477)][_0x4d4f5e(0x43c)];if(!_0xf09024)_0x5ee1b0[_0x4d4f5e(0x25c)]['call'](this,_0x982d5a,_0xab5f86,this);this['_eventMorphData']={'mapId':_0x982d5a,'eventId':_0xab5f86},this['_pageIndex']=-0x2,this[_0x4d4f5e(0xe8)]();if(!_0xf09024)_0x5ee1b0[_0x4d4f5e(0x33e)][_0x4d4f5e(0x24f)](this,_0x982d5a,_0xab5f86,this);$gameMap[_0x4d4f5e(0x275)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x11d)]=function(_0x3dc82c,_0x5ef918){const _0xbb69ac=_0xe91ae0;_0x3dc82c=_0x3dc82c[_0xbb69ac(0x36b)]()[_0xbb69ac(0x41a)]();const _0x153837=VisuMZ[_0xbb69ac(0x301)][_0x3dc82c];if(!_0x153837)return;const _0x1bc323=_0x153837['MapID'],_0x46c8fc=_0x153837[_0xbb69ac(0x207)];if(!this[_0xbb69ac(0x446)](_0x1bc323,_0x46c8fc))return;if(!_0x5ef918)_0x153837[_0xbb69ac(0x25c)][_0xbb69ac(0x24f)](this,_0x1bc323,_0x46c8fc,this);this['morphInto'](_0x1bc323,_0x46c8fc,_0x5ef918);if(!_0x5ef918)_0x153837[_0xbb69ac(0x33e)][_0xbb69ac(0x24f)](this,_0x1bc323,_0x46c8fc,this);if($gameMap)$gameMap[_0xbb69ac(0x275)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x171)]=function(){const _0x20acfc=_0xe91ae0;this[_0x20acfc(0x32c)]=undefined,this[_0x20acfc(0x4fa)]=-0x2,this[_0x20acfc(0xe8)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x55e)]=function(_0x573aa9){const _0x11e621=_0xe91ae0,_0x513714=VisuMZ['EventsMoveCore'][_0x11e621(0x477)]['Template'],_0x31e2a0=_0x573aa9['template'][_0x11e621(0x36b)]()[_0x11e621(0x41a)](),_0x3dddb5=!['',_0x11e621(0x48f)][_0x11e621(0x575)](_0x31e2a0);let _0x4d6086=0x0,_0x66e894=0x0;if(_0x3dddb5){const _0x309660=VisuMZ[_0x11e621(0x301)][_0x31e2a0];if(!_0x309660)return;_0x4d6086=_0x309660[_0x11e621(0x1d4)],_0x66e894=_0x309660[_0x11e621(0x207)];}else _0x4d6086=_0x573aa9[_0x11e621(0x55b)],_0x66e894=_0x573aa9['eventId'];if(!this[_0x11e621(0x446)](_0x4d6086,_0x66e894))return;if(_0x3dddb5){const _0x27b736=VisuMZ['EventTemplates'][_0x31e2a0];_0x27b736['PreSpawnJS'][_0x11e621(0x24f)](this,_0x4d6086,_0x66e894,this);}_0x513714[_0x11e621(0x270)][_0x11e621(0x24f)](this,_0x4d6086,_0x66e894,this),this['_eventSpawnData']=_0x573aa9,this[_0x11e621(0x4fa)]=-0x2,this[_0x11e621(0x34f)]=$gameMap[_0x11e621(0x55b)](),this[_0x11e621(0x19b)]=_0x573aa9[_0x11e621(0x2a7)],this[_0x11e621(0x2c1)]=_0x573aa9[_0x11e621(0x4e1)],this[_0x11e621(0x555)](_0x573aa9['x'],_0x573aa9['y']),this[_0x11e621(0x3e6)](_0x573aa9['direction']),this[_0x11e621(0xe8)]();if(_0x3dddb5){const _0x36da1a=VisuMZ[_0x11e621(0x301)][_0x31e2a0];if(!_0x36da1a)return;_0x36da1a[_0x11e621(0x223)][_0x11e621(0x24f)](this,_0x4d6086,_0x66e894,this);}_0x513714['PostSpawnJS']['call'](this,_0x4d6086,_0x66e894,this);const _0xdec31=SceneManager[_0x11e621(0xf5)];if(_0xdec31&&_0xdec31[_0x11e621(0x39f)])_0xdec31['_spriteset'][_0x11e621(0x519)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x11b)]=function(){const _0xddf9c8=_0xe91ae0;return!!this[_0xddf9c8(0x35e)];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4c4)]=function(){const _0x1d2920=_0xe91ae0;if(!this[_0x1d2920(0x22b)]())return;const _0x45cf9a=this[_0x1d2920(0x22b)]()['filter'](_0x46a64b=>_0x46a64b[_0x1d2920(0x497)]!==0x6c&&_0x46a64b[_0x1d2920(0x497)]!==0x198);_0x45cf9a[_0x1d2920(0x235)]>0x1&&(this[_0x1d2920(0x3f6)]=!![],this[_0x1d2920(0x14d)]([0x0,0x1,0x2])&&this['lock']());},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x2fa)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x315)],Game_Event[_0xe91ae0(0x36f)]['clearPageSettings']=function(){const _0x29086c=_0xe91ae0;VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings'][_0x29086c(0x24f)](this),this[_0x29086c(0x135)](),this[_0x29086c(0x428)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x40a)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x1c0)],Game_Event[_0xe91ae0(0x36f)]['setupPageSettings']=function(){const _0x2e90dd=_0xe91ae0;this[_0x2e90dd(0x2be)]=!![],VisuMZ[_0x2e90dd(0x24e)][_0x2e90dd(0x40a)]['call'](this),this[_0x2e90dd(0x224)](),this[_0x2e90dd(0x428)](),this[_0x2e90dd(0x2be)]=![];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x224)]=function(){const _0x15bba3=_0xe91ae0;if(!this[_0x15bba3(0x130)]())return;this[_0x15bba3(0x135)](),this[_0x15bba3(0x472)](),this['setupEventsMoveCoreCommentTags'](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0xe91ae0(0x36f)]['setupEventsMoveCoreNotetags']=function(){const _0xe6c6fd=_0xe91ae0,_0x1eed64=this[_0xe6c6fd(0x130)]()['note'];if(_0x1eed64==='')return;this[_0xe6c6fd(0x256)](_0x1eed64);},Game_Event[_0xe91ae0(0x36f)]['setupEventsMoveCoreCommentTags']=function(){const _0x3e89ab=_0xe91ae0;if(!this[_0x3e89ab(0xd9)]())return;const _0x4c7b64=this[_0x3e89ab(0x22b)]();let _0x2bda80='';for(const _0x4a3e4d of _0x4c7b64){if([0x6c,0x198][_0x3e89ab(0x575)](_0x4a3e4d['code'])){if(_0x2bda80!=='')_0x2bda80+='\x0a';_0x2bda80+=_0x4a3e4d[_0x3e89ab(0x3f0)][0x0];}}this[_0x3e89ab(0x256)](_0x2bda80);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x135)]=function(){const _0x526dc4=_0xe91ae0,_0x17b168=VisuMZ['EventsMoveCore'][_0x526dc4(0x477)];this[_0x526dc4(0x29f)]={'type':_0x526dc4(0x4c6),'distance':0x0,'regionList':[]},this[_0x526dc4(0x3f9)]=![],this[_0x526dc4(0x1ee)]=![],this[_0x526dc4(0x341)](),this[_0x526dc4(0x304)]=![],this[_0x526dc4(0x2c7)]=![],(this[_0x526dc4(0x346)]()||this[_0x526dc4(0x2a6)]())&&this[_0x526dc4(0x356)]===0x0&&(this[_0x526dc4(0x2c7)]=0x0),this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x526dc4(0x4c8)]={'type':'none','distance':0x0},this[_0x526dc4(0x5b3)]={'type':_0x526dc4(0x4c6),'distance':0x0},$gameSystem[_0x526dc4(0x187)](this),this[_0x526dc4(0x25e)]=$gameSystem['getEventIconData'](this),this[_0x526dc4(0x198)]={'originalText':'','text':'','visibleRange':_0x17b168[_0x526dc4(0x3cf)]['VisibleRange'],'rangeType':_0x17b168[_0x526dc4(0x3cf)]['RangeType'],'offsetX':_0x17b168[_0x526dc4(0x3cf)][_0x526dc4(0x210)],'offsetY':_0x17b168[_0x526dc4(0x3cf)][_0x526dc4(0x308)],'hueShift':0x0},this[_0x526dc4(0x5a4)]=![],this[_0x526dc4(0xef)]=[],this[_0x526dc4(0x3a3)]={'target':-0x1,'type':_0x526dc4(0x5a8),'delay':0x1,'opacityDelta':0x0},this['_randomMoveWeight']=_0x17b168['Movement'][_0x526dc4(0x1bd)]??0x0,this[_0x526dc4(0x117)]=![],this['_scaleBaseX']=0x1,this[_0x526dc4(0x263)]=0x1,this[_0x526dc4(0x114)]=![],this['_screenParallel']=![],this['_screenParallelOnce']=![],this[_0x526dc4(0x252)]={'visible':!![],'filename':_0x17b168[_0x526dc4(0xdf)][_0x526dc4(0x4fe)]},this[_0x526dc4(0x316)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x526dc4(0x249)](),this['clearStepPattern']();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x256)]=function(_0x59cde6){const _0x577edf=_0xe91ae0;if(_0x59cde6['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x577edf(0x29f)][_0x577edf(0x1a4)]=JSON[_0x577edf(0x476)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x577edf(0x29f)]['type']=_0x577edf(0x220);else _0x59cde6['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x577edf(0x4a6)]()[_0x577edf(0x41a)](),this['_activationProximity']['type']=type,this['_activationProximity']['distance']=Number(RegExp['$2']));_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x3e2)]=String(RegExp['$1']),this['_attachPicture'][_0x577edf(0xce)]=_0x577edf(0x32e));if(_0x59cde6['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x506287=String(RegExp['$1'])[_0x577edf(0x36b)]()['trim'](),_0xe844ea=['NORMAL','ADDITIVE',_0x577edf(0x398),_0x577edf(0x1b1)];this[_0x577edf(0x4db)]['blendMode']=_0xe844ea[_0x577edf(0x28f)](_0x506287)[_0x577edf(0x1b0)](0x0,0x3);}_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x215)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x577edf(0x409)]=Number(RegExp['$1']));_0x59cde6['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x10d)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x409)]=Number(RegExp['$1']),this[_0x577edf(0x4db)][_0x577edf(0x10d)]=Number(RegExp['$2']));_0x59cde6['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x466)]=Number(RegExp['$1'])*0.01);_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x577edf(0x4db)]['type']=String(RegExp['$1'])[_0x577edf(0x4a6)]()[_0x577edf(0x41a)]());_0x59cde6[_0x577edf(0x18c)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x3e2)]=String(RegExp['$1']),this[_0x577edf(0x4db)][_0x577edf(0xce)]=_0x577edf(0x28d));_0x59cde6['match'](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x577edf(0x4db)][_0x577edf(0x3e2)]=String(RegExp['$1']),this['_attachPicture'][_0x577edf(0xce)]=_0x577edf(0x4a7));_0x59cde6['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x577edf(0x3f9)]=!![]);_0x59cde6[_0x577edf(0x18c)](/<BYPASS CLICK STOP>/i)&&(this[_0x577edf(0x1ee)]=!![]);_0x59cde6['match'](/<CLICK TRIGGER>/i)&&(this[_0x577edf(0x304)]=!![]);_0x59cde6[_0x577edf(0x18c)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x577edf(0x2c7)]=Number(RegExp['$1'])||0x0);_0x59cde6[_0x577edf(0x18c)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x577edf(0x4a6)]()['trim'](),this[_0x577edf(0x4c8)][_0x577edf(0xce)]=type,this['_encounterHalfProximity'][_0x577edf(0x443)]=Number(RegExp['$2']));_0x59cde6[_0x577edf(0x18c)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x577edf(0x4a6)]()['trim'](),this[_0x577edf(0x5b3)][_0x577edf(0xce)]=type,this['_encounterNoneProximity'][_0x577edf(0x443)]=Number(RegExp['$2']));const _0x427f4d=_0x59cde6['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x427f4d)for(const _0x241d6f of _0x427f4d){if(_0x241d6f[_0x577edf(0x18c)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x45a0af=String(RegExp['$1'])[_0x577edf(0x4a6)]()[_0x577edf(0x41a)](),_0x285068=Number(RegExp['$2']);this[_0x577edf(0x5a9)][_0x45a0af]=_0x285068;}}if(this[_0x577edf(0x25e)][_0x577edf(0x34d)]>=0x0&&!this['_eventIcon'][_0x577edf(0x516)]){_0x59cde6['match'](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x577edf(0x34d)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x25e)][_0x577edf(0x279)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferY']=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x25e)][_0x577edf(0x279)]=Number(RegExp['$1']),this[_0x577edf(0x25e)]['bufferY']=Number(RegExp['$2']));if(_0x59cde6[_0x577edf(0x18c)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x25def8=String(RegExp['$1'])['toUpperCase']()[_0x577edf(0x41a)](),_0x4da2ea=[_0x577edf(0x206),'ADDITIVE',_0x577edf(0x398),'SCREEN'];this[_0x577edf(0x25e)][_0x577edf(0x2d5)]=_0x4da2ea['indexOf'](_0x25def8)['clamp'](0x0,0x3);}$gameSystem[_0x577edf(0x14a)](this,this[_0x577edf(0x25e)][_0x577edf(0x34d)],this[_0x577edf(0x25e)][_0x577edf(0x279)],this[_0x577edf(0x25e)]['bufferY'],this[_0x577edf(0x25e)]['blendMode']);}if(_0x59cde6[_0x577edf(0x18c)](/<LABEL:[ ](.*?)>/i)){let _0x1d4162=String(RegExp['$1'])[_0x577edf(0x41a)]();this[_0x577edf(0x198)][_0x577edf(0x137)]=_0x1d4162,this[_0x577edf(0x198)][_0x577edf(0x374)]=_0x1d4162;}if(_0x59cde6[_0x577edf(0x18c)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0xfde38c=String(RegExp['$1'])[_0x577edf(0x41a)]();this[_0x577edf(0x198)][_0x577edf(0x137)]=_0xfde38c,this[_0x577edf(0x198)][_0x577edf(0x374)]=_0xfde38c;}_0x59cde6['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x198)]['offsetX']=Number(RegExp['$1']));_0x59cde6['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x198)][_0x577edf(0x10d)]=Number(RegExp['$1']));_0x59cde6['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x577edf(0x409)]=Number(RegExp['$1']),this['_labelWindow'][_0x577edf(0x10d)]=Number(RegExp['$2']));_0x59cde6[_0x577edf(0x18c)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this['_labelWindow'][_0x577edf(0x420)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x577edf(0x198)][_0x577edf(0x1bc)]=Number(RegExp['$1']));_0x59cde6[_0x577edf(0x18c)](/<LABEL RANGE TYPE: SQUARE>/i)&&(this[_0x577edf(0x198)][_0x577edf(0x586)]=_0x577edf(0x2da));_0x59cde6['match'](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x577edf(0x198)][_0x577edf(0x586)]=_0x577edf(0x573));_0x59cde6[_0x577edf(0x18c)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this['_labelWindow'][_0x577edf(0x586)]=_0x577edf(0x4be));this[_0x577edf(0x4e5)]();_0x59cde6[_0x577edf(0x18c)](/<MIRROR SPRITE>/i)&&(this['_mirrorSprite']=!![]);if(_0x59cde6[_0x577edf(0x18c)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x43224c=JSON['parse']('['+RegExp['$1'][_0x577edf(0x18c)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x577edf(0xef)][_0x577edf(0x33c)](_0x43224c),this[_0x577edf(0xef)][_0x577edf(0x376)](0x0);}if(_0x59cde6[_0x577edf(0x18c)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x440521=String(RegExp['$1']);if(_0x440521[_0x577edf(0x18c)](/PLAYER/i))this['_moveSynch'][_0x577edf(0x17f)]=0x0;else _0x440521[_0x577edf(0x18c)](/EVENT[ ](\d+)/i)&&(this[_0x577edf(0x3a3)][_0x577edf(0x17f)]=Number(RegExp['$1']));}_0x59cde6[_0x577edf(0x18c)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x577edf(0x3a3)][_0x577edf(0xce)]=String(RegExp['$1'])[_0x577edf(0x4a6)]()['trim']());_0x59cde6[_0x577edf(0x18c)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x577edf(0x3a3)][_0x577edf(0x209)]=Number(RegExp['$1']));_0x59cde6['match'](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x577edf(0x3a3)][_0x577edf(0x23f)]=Number(RegExp['$1']));if(_0x59cde6[_0x577edf(0x18c)](/<TRUE RANDOM MOVE>/i))this[_0x577edf(0x161)]=0x0;else _0x59cde6[_0x577edf(0x18c)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x577edf(0x161)]=Number(RegExp['$1'])||0x0);_0x59cde6[_0x577edf(0x18c)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x577edf(0x117)]=!![]);_0x59cde6[_0x577edf(0x18c)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this['_scaleBaseX']=Number(RegExp['$1'])*0.01);_0x59cde6[_0x577edf(0x18c)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this['_scaleBaseY']=Number(RegExp['$1'])*0.01);if(_0x59cde6['match'](/<SCALE:[ ](\d+)([%％])>/i)){const _0x1915ac=Number(RegExp['$1'])*0.01;this['_scaleBaseX']=_0x1915ac,this['_scaleBaseY']=_0x1915ac;}_0x59cde6[_0x577edf(0x18c)](/<SCREEN ACTIVATION>/i)&&(this[_0x577edf(0x114)]=!![],this[_0x577edf(0x39c)]=![],this[_0x577edf(0x44c)]=![]);if(_0x59cde6[_0x577edf(0x18c)](/<SCREEN PARALLEL>/i))this[_0x577edf(0x114)]=![],this[_0x577edf(0x39c)]=!![],this[_0x577edf(0x44c)]=![];else _0x59cde6[_0x577edf(0x18c)](/<SCREEN PARALLEL ONCE>/i)&&(this[_0x577edf(0x114)]=![],this[_0x577edf(0x39c)]=!![],this[_0x577edf(0x44c)]=!![]);_0x59cde6['match'](/<HIDE SHADOW>/i)&&(this['_shadowGraphic'][_0x577edf(0xf1)]=![]),_0x59cde6[_0x577edf(0x18c)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x577edf(0x252)][_0x577edf(0x3e2)]=String(RegExp['$1'])),_0x59cde6[_0x577edf(0x18c)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0x59cde6[_0x577edf(0x18c)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x2ed)]=Number(RegExp['$1'])),_0x59cde6[_0x577edf(0x18c)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x577edf(0x459)]=Number(RegExp['$1']),this[_0x577edf(0x2ed)]=Number(RegExp['$2'])),_0x59cde6[_0x577edf(0x18c)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x577edf(0x1b8)]=String(RegExp['$1'])[_0x577edf(0x36b)]()[_0x577edf(0x41a)]()),_0x59cde6['match'](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x577edf(0x316)]||{},this[_0x577edf(0x316)]['up']=Number(RegExp['$1'])),_0x59cde6[_0x577edf(0x18c)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this['_tileExpand']=this[_0x577edf(0x316)]||{},this['_tileExpand'][_0x577edf(0x419)]=Number(RegExp['$1'])),_0x59cde6['match'](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this[_0x577edf(0x316)]=this[_0x577edf(0x316)]||{},this[_0x577edf(0x316)][_0x577edf(0xe5)]=Number(RegExp['$1'])),_0x59cde6['match'](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this['_tileExpand']=this['_tileExpand']||{},this[_0x577edf(0x316)][_0x577edf(0x49c)]=Number(RegExp['$1']));},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4e5)]=function(){const _0x400341=_0xe91ae0;$gameTemp['registerSelfTarget'](this),this[_0x400341(0x198)][_0x400341(0x137)]=this[_0x400341(0x198)][_0x400341(0x374)];for(;;){if(this[_0x400341(0x198)][_0x400341(0x137)][_0x400341(0x18c)](/\\V\[(\d+)\]/gi))this[_0x400341(0x198)][_0x400341(0x137)]=this['_labelWindow'][_0x400341(0x374)]['replace'](/\\V\[(\d+)\]/gi,(_0x4e4cca,_0x578919)=>$gameVariables[_0x400341(0x46a)](parseInt(_0x578919)));else break;}$gameTemp[_0x400341(0x4da)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x483)]=function(){const _0x20b35e=_0xe91ae0;this[_0x20b35e(0x38a)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x45d)]=function(){const _0x515a45=_0xe91ae0;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x515a45(0x36f)]['isNearTheScreen'][_0x515a45(0x24f)](this);},VisuMZ['EventsMoveCore'][_0xe91ae0(0x46e)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x307)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x307)]=function(){const _0x232b85=_0xe91ae0;if(this['isPreventSelfMovement']())return;VisuMZ[_0x232b85(0x24e)][_0x232b85(0x46e)][_0x232b85(0x24f)](this),this[_0x232b85(0x299)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x232b85(0x19b)]);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x313)]=function(){const _0x3f7bad=_0xe91ae0,_0x27bba0=VisuMZ[_0x3f7bad(0x24e)]['Settings'][_0x3f7bad(0xdf)];if($gameMap['isEventRunning']()&&_0x27bba0[_0x3f7bad(0xdd)])return!![];if($gameMessage[_0x3f7bad(0xfc)]()&&_0x27bba0[_0x3f7bad(0x53f)])return!![];if(!$gameSystem[_0x3f7bad(0x45a)]())return!![];if(this[_0x3f7bad(0x167)]()>=0x0)return!![];if(!SceneManager[_0x3f7bad(0xf5)][_0x3f7bad(0x353)])return!![];return![];},Game_Event[_0xe91ae0(0x36f)]['updateShadowChanges']=function(){const _0x4487df=_0xe91ae0,_0x53e666=SceneManager[_0x4487df(0xf5)][_0x4487df(0x39f)];if(_0x53e666){const _0x42b5c3=_0x53e666[_0x4487df(0x4ad)](this);_0x42b5c3&&_0x42b5c3['_shadowSprite']&&_0x42b5c3['_shadowSprite'][_0x4487df(0x49a)]!==this[_0x4487df(0x2d1)]()&&(_0x42b5c3[_0x4487df(0x26d)][_0x4487df(0x49a)]=this[_0x4487df(0x2d1)](),_0x42b5c3[_0x4487df(0x26d)][_0x4487df(0x14c)]=ImageManager['loadSystem'](_0x42b5c3[_0x4487df(0x26d)]['_filename']));}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2d1)]=function(){const _0x17d422=_0xe91ae0;return this[_0x17d422(0x252)]['filename'];},Game_Event['prototype'][_0xe91ae0(0x422)]=function(){const _0x1a008e=_0xe91ae0;if(!this[_0x1a008e(0x252)][_0x1a008e(0xf1)])return![];if($gamePlayer[_0x1a008e(0x4c3)])return![];return Game_CharacterBase[_0x1a008e(0x36f)]['isShadowVisible'][_0x1a008e(0x24f)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x13c)]=function(){const _0x3851fd=_0xe91ae0;return this[_0x3851fd(0x198)][_0x3851fd(0x137)];},Game_Event[_0xe91ae0(0x36f)]['labelWindowRange']=function(){const _0x548fba=_0xe91ae0;return this[_0x548fba(0x198)]['visibleRange']??VisuMZ[_0x548fba(0x24e)][_0x548fba(0x477)][_0x548fba(0x3cf)][_0x548fba(0x2e5)];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x49d)]=function(){const _0x46b4ca=_0xe91ae0;return this[_0x46b4ca(0x198)][_0x46b4ca(0x586)]??VisuMZ[_0x46b4ca(0x24e)]['Settings'][_0x46b4ca(0x3cf)][_0x46b4ca(0x339)]??_0x46b4ca(0x2da);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x166)]=function(_0x303265){const _0x360ef3=_0xe91ae0,_0x3af1d9=_0x303265[_0x360ef3(0x49d)](),_0x34a241=_0x303265['labelWindowRange']();return $gameMap[_0x360ef3(0x4c7)]($gamePlayer['x'],$gamePlayer['y'],_0x303265,_0x3af1d9,_0x34a241);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x488)]=function(_0x560a06,_0x558223,_0x382bd5){const _0x5a5a89=_0xe91ae0;if(this[_0x5a5a89(0x2e2)]())return this[_0x5a5a89(0x41d)](_0x560a06,_0x558223,_0x382bd5);if($gameMap['isRegionAllowPass'](_0x560a06,_0x558223,_0x382bd5,_0x5a5a89(0x130)))return!![];if($gameMap['isRegionForbidPass'](_0x560a06,_0x558223,_0x382bd5,_0x5a5a89(0x130)))return![];return Game_Character[_0x5a5a89(0x36f)][_0x5a5a89(0x488)][_0x5a5a89(0x24f)](this,_0x560a06,_0x558223,_0x382bd5);},Game_Event['prototype'][_0xe91ae0(0x2e2)]=function(){const _0x41164d=_0xe91ae0;if(this[_0x41164d(0xef)]===undefined)this[_0x41164d(0x135)]();return this[_0x41164d(0xef)][_0x41164d(0x235)]>0x0;},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x41d)]=function(_0x6c6bbd,_0x464bb6,_0x149c8c){const _0x38b03e=_0xe91ae0,_0x30819e=$gameMap[_0x38b03e(0x208)](_0x6c6bbd,_0x149c8c),_0x5040f9=$gameMap[_0x38b03e(0x3c7)](_0x464bb6,_0x149c8c),_0x4182da=$gameMap['regionId'](_0x30819e,_0x5040f9);return this[_0x38b03e(0xef)]['includes'](_0x4182da);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x515)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4bb)],Game_Event['prototype'][_0xe91ae0(0x4bb)]=function(){const _0x433c24=_0xe91ae0;if(this[_0x433c24(0x130)]()&&!$gameTemp[_0x433c24(0x175)]()){if(this[_0x433c24(0x130)]()[_0x433c24(0x228)][_0x433c24(0x18c)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x433c24(0x571)]=![],this[_0x433c24(0x512)]=![],this[_0x433c24(0x130)]()?VisuMZ[_0x433c24(0x24e)][_0x433c24(0x515)][_0x433c24(0x24f)](this):-0x1;},VisuMZ[_0xe91ae0(0x24e)]['Game_Event_meetsConditions']=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x296)],Game_Event['prototype'][_0xe91ae0(0x296)]=function(_0x47536b){const _0x238f06=_0xe91ae0;this['checkAdvancedSwitchVariablePresent'](_0x47536b),$gameTemp[_0x238f06(0x3ab)](this);const _0x249546=VisuMZ[_0x238f06(0x24e)]['Game_Event_meetsConditions'][_0x238f06(0x24f)](this,_0x47536b);return $gameTemp['clearSelfTarget'](),_0x249546;},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x1a5)]=function(){return this['_advancedSwitchVariable'];},Game_Event['prototype'][_0xe91ae0(0x122)]=function(_0x50864b){const _0xd6bcff=_0xe91ae0,_0x29ff16=_0x50864b[_0xd6bcff(0x312)];if(_0x29ff16[_0xd6bcff(0x3bc)]&&DataManager[_0xd6bcff(0x489)](_0x29ff16['switch1Id']))this[_0xd6bcff(0x571)]=!![];else{if(_0x29ff16[_0xd6bcff(0x513)]&&DataManager['isAdvancedSwitch'](_0x29ff16[_0xd6bcff(0x2a9)]))this[_0xd6bcff(0x571)]=!![];else _0x29ff16['variableValid']&&DataManager[_0xd6bcff(0x57e)](_0x29ff16['variableId'])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0xe91ae0(0x36f)]['hasClickTrigger']=function(){const _0x25106f=_0xe91ae0;if(this[_0x25106f(0x202)])return![];return this[_0x25106f(0x304)];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x58e)]=function(){const _0xbbe8ea=_0xe91ae0;$gameTemp[_0xbbe8ea(0x50f)](),this[_0xbbe8ea(0x4c4)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x485)]=function(_0x17918e,_0x167dd2){const _0x5605dc=_0xe91ae0;return this[_0x5605dc(0x5a9)]?this[_0x5605dc(0x537)](_0x17918e,_0x167dd2):Game_Character[_0x5605dc(0x36f)][_0x5605dc(0x485)]['call'](this,_0x17918e,_0x167dd2);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x537)]=function(_0x351a49,_0x12d880){const _0x42cb11=_0xe91ae0;var _0x4fb8c0=this['x']-this[_0x42cb11(0x5a9)][_0x42cb11(0xe5)],_0x5a47df=this['x']+this[_0x42cb11(0x5a9)]['right'],_0x203dc=this['y']-this[_0x42cb11(0x5a9)]['up'],_0x23f976=this['y']+this[_0x42cb11(0x5a9)][_0x42cb11(0x419)];return _0x4fb8c0<=_0x351a49&&_0x351a49<=_0x5a47df&&_0x203dc<=_0x12d880&&_0x12d880<=_0x23f976;},VisuMZ[_0xe91ae0(0x24e)]['Game_Event_canPass']=Game_Event[_0xe91ae0(0x36f)]['canPass'],Game_Event[_0xe91ae0(0x36f)]['canPass']=function(_0x4ff117,_0x10575c,_0x5c64d2){const _0x258a07=_0xe91ae0;for(let _0x54b943=-this[_0x258a07(0x5a9)][_0x258a07(0xe5)];_0x54b943<=this[_0x258a07(0x5a9)][_0x258a07(0x49c)];_0x54b943++){for(let _0x16097f=-this['_addedHitbox']['up'];_0x16097f<=this[_0x258a07(0x5a9)][_0x258a07(0x419)];_0x16097f++){if(!Game_Character[_0x258a07(0x36f)][_0x258a07(0x153)][_0x258a07(0x24f)](this,_0x4ff117+_0x54b943,_0x10575c+_0x16097f,_0x5c64d2))return![];}}return!![];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x592)]=function(_0x2f7922,_0x914a77){const _0x4a07c1=_0xe91ae0;if(Imported[_0x4a07c1(0x364)]&&this[_0x4a07c1(0x532)]())return this[_0x4a07c1(0x4eb)](_0x2f7922,_0x914a77);else{const _0x4856ce=$gameMap[_0x4a07c1(0x1ff)](_0x2f7922,_0x914a77)[_0x4a07c1(0x3d1)](_0x42992e=>_0x42992e!==this);return _0x4856ce[_0x4a07c1(0x235)]>0x0;}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4eb)]=function(_0x243aea,_0x3fcbd3){const _0x1d2854=_0xe91ae0;if(!this['isNormalPriority']())return![];else{const _0xea134d=$gameMap['eventsXyNt'](_0x243aea,_0x3fcbd3)['filter'](_0x56ccd0=>_0x56ccd0!==this&&_0x56ccd0[_0x1d2854(0x120)]());return _0xea134d['length']>0x0;}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x587)]=function(){const _0x3ab93b=_0xe91ae0;if(!this[_0x3ab93b(0x29f)])return'none';return this[_0x3ab93b(0x29f)][_0x3ab93b(0xce)]||_0x3ab93b(0x4c6);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x139)]=function(){const _0x9616b7=_0xe91ae0;if(!this[_0x9616b7(0x29f)])return 0x0;return this[_0x9616b7(0x29f)]['distance']||0x0;},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0xd4)]=function(){const _0x1bdf98=_0xe91ae0;if(!this[_0x1bdf98(0x29f)])return[];return this['_activationProximity'][_0x1bdf98(0x1a4)]||[];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4e0)]=function(){const _0x430860=_0xe91ae0;Game_Character[_0x430860(0x36f)][_0x430860(0x4e0)][_0x430860(0x24f)](this);if([_0x430860(0x4c6),_0x430860(0x220)][_0x430860(0x575)](this[_0x430860(0x587)]()))return;$gamePlayer[_0x430860(0x558)]([0x2]);},Game_Event['prototype']['isOnScreen']=function(){const _0xf5dfe6=_0xe91ae0,_0x2c1c80=Math[_0xf5dfe6(0x583)]($gameMap[_0xf5dfe6(0x34c)]),_0x3ae3e8=_0x2c1c80+Math[_0xf5dfe6(0xd6)]($gameMap[_0xf5dfe6(0xf9)]())-0x1,_0x48be6d=Math[_0xf5dfe6(0x583)]($gameMap[_0xf5dfe6(0x44f)]),_0xc490f6=_0x48be6d+Math['ceil']($gameMap[_0xf5dfe6(0x1d0)]())-0x1;return this['x']>=_0x2c1c80&&this['x']<=_0x3ae3e8&&this['y']>=_0x48be6d&&this['y']<=_0xc490f6;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3c9)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4de)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4de)]=function(){const _0x46d236=_0xe91ae0;if(this[_0x46d236(0x114)]||this['_screenParallel']){if(this[_0x46d236(0x287)]()){if(!this['_screenActivated']){this[_0x46d236(0x2bf)]=!![];if(this['_screenActivation'])this[_0x46d236(0x4c4)]();else this[_0x46d236(0x39c)]&&(!this[_0x46d236(0x21b)]&&(this[_0x46d236(0x21b)]=new Game_Interpreter()),this[_0x46d236(0x21b)][_0x46d236(0x15b)](this[_0x46d236(0x22b)](),this['_eventId']));}return;}else{this['_screenActivated']=![];return;}}if(this['_trigger']!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x46d236(0x348)](![]))return;if(!this[_0x46d236(0x3ea)](![]))return;VisuMZ[_0x46d236(0x24e)][_0x46d236(0x3c9)]['call'](this);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x16e)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x407)],Game_Event[_0xe91ae0(0x36f)]['updateParallel']=function(){const _0x581a5f=_0xe91ae0;if(!this[_0x581a5f(0x21b)])return;if(!this[_0x581a5f(0x348)](!![]))return;if(!this['checkActivationProximity'](!![]))return;if(this[_0x581a5f(0x21b)]&&!this[_0x581a5f(0x21b)][_0x581a5f(0x344)]()&&this[_0x581a5f(0x39c)]){!this[_0x581a5f(0x44c)]&&(this[_0x581a5f(0x2bf)]=![]);return;}VisuMZ['EventsMoveCore']['Game_Event_updateParallel'][_0x581a5f(0x24f)](this);},Game_Event[_0xe91ae0(0x36f)]['checkRegionEventTrigger']=function(_0x1623ac){const _0x477eac=_0xe91ae0;if(!_0x1623ac&&$gameMap[_0x477eac(0x42c)]())return![];if(!_0x1623ac&&$gameMap[_0x477eac(0x164)]())return![];if(this[_0x477eac(0xd4)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x3ea)]=function(_0x54ea6c){const _0x5f2621=_0xe91ae0;if(!_0x54ea6c&&$gameMap[_0x5f2621(0x42c)]())return![];if(!_0x54ea6c&&$gameMap[_0x5f2621(0x164)]())return![];if(['none',_0x5f2621(0x220)][_0x5f2621(0x575)](this[_0x5f2621(0x587)]()))return!![];return $gamePlayer[_0x5f2621(0x53a)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x392)]=function(_0x1ab8c3){const _0x19bfa8=_0xe91ae0,_0x12fdec=_0x1ab8c3?this[_0x19bfa8(0x4c8)]:this[_0x19bfa8(0x5b3)];return _0x12fdec?_0x12fdec[_0x19bfa8(0xce)]:_0x19bfa8(0x4c6);},Game_Event['prototype']['encounterProximityDistance']=function(_0x163004){const _0x38d7fd=_0xe91ae0,_0x3f38b3=_0x163004?this[_0x38d7fd(0x4c8)]:this[_0x38d7fd(0x5b3)];return _0x3f38b3?_0x3f38b3[_0x38d7fd(0x443)]:0x0;},VisuMZ[_0xe91ae0(0x1eb)]=function(_0x12656a){const _0x2a41bb=_0xe91ae0;for(const _0x87b684 of $gameMap[_0x2a41bb(0x45b)]()){if(!_0x87b684)continue;_0x87b684[_0x2a41bb(0x167)]()===_0x12656a&&_0x87b684[_0x2a41bb(0x3a0)]();}},VisuMZ[_0xe91ae0(0x31d)]=function(_0x583b90){const _0xbf0eb0=_0xe91ae0;if(_0x583b90===0x0)return $gamePlayer;return $gameMap[_0xbf0eb0(0x130)](_0x583b90);},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x338)]=function(){},Game_Event[_0xe91ae0(0x36f)]['updateMoveSynchDirection']=function(){const _0x45c1f8=_0xe91ae0;VisuMZ[_0x45c1f8(0x2ea)](this[_0x45c1f8(0x19b)]);},VisuMZ[_0xe91ae0(0x2ea)]=function(_0x34421b){const _0x3aea2f=_0xe91ae0;for(const _0x3b85d3 of $gameMap['events']()){if(!_0x3b85d3)continue;_0x3b85d3[_0x3aea2f(0x167)]()===_0x34421b&&_0x3b85d3[_0x3aea2f(0x2e0)]();}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x167)]=function(){return this['_moveSynch']['target'];},Game_Event[_0xe91ae0(0x36f)]['moveSynchType']=function(){const _0x114ee7=_0xe91ae0;return this[_0x114ee7(0x3a3)]['type'];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x34e)]=function(){const _0x20b760=_0xe91ae0;if(this['moveSynchTarget']()>=0x0){const _0x4d3771=VisuMZ['GetMoveSynchTarget'](this[_0x20b760(0x167)]());if(_0x4d3771)return _0x4d3771[_0x20b760(0x34e)]();}return Game_Character[_0x20b760(0x36f)][_0x20b760(0x34e)][_0x20b760(0x24f)](this);},Game_Event['prototype']['updateMoveSynch']=function(){const _0x35e06b=_0xe91ae0;this['_moveSynch'][_0x35e06b(0x52f)]=this['_moveSynch']['timer']||0x0,this[_0x35e06b(0x3a3)][_0x35e06b(0x52f)]--;if(this[_0x35e06b(0x3a3)][_0x35e06b(0x52f)]>0x0)return;this[_0x35e06b(0x3a3)][_0x35e06b(0x52f)]=this[_0x35e06b(0x3a3)][_0x35e06b(0x209)],this['processMoveSynch']();},Game_Event['prototype']['adjustMoveSynchOpacityDelta']=function(_0x353f81){const _0x1198dc=_0xe91ae0;if(this['moveSynchTarget']()>=0x0){const _0x38f30f=VisuMZ['GetMoveSynchTarget'](this[_0x1198dc(0x167)]());if(_0x38f30f){const _0x1fc400=$gameMap[_0x1198dc(0x443)](this['_realX'],this[_0x1198dc(0x197)],_0x38f30f[_0x1198dc(0x1be)],_0x38f30f[_0x1198dc(0x197)])-0x1,_0x6cb29a=Math[_0x1198dc(0x259)]($gameMap[_0x1198dc(0x46b)](),$gameMap[_0x1198dc(0x3af)]()),_0x52f45a=this[_0x1198dc(0x3a3)][_0x1198dc(0x23f)]||0x0;_0x353f81-=Math[_0x1198dc(0x1c4)](0x0,_0x1fc400)*_0x6cb29a*_0x52f45a;}}return _0x353f81;},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2b9)]=function(){const _0x257777=_0xe91ae0;switch(this[_0x257777(0x526)]()){case'random':this['processMoveSynchRandom']();break;case _0x257777(0x2ce):this[_0x257777(0x2c5)]();break;case _0x257777(0x411):this[_0x257777(0x4ec)]();break;case _0x257777(0x4ba):this[_0x257777(0x533)]();break;case _0x257777(0x5b6):case _0x257777(0x190):this['processMoveSynchMimic']();break;case _0x257777(0x3d8):case _0x257777(0x53d):this['processMoveSynchReverseMimic']();break;case _0x257777(0x3ca):case _0x257777(0x2e6):case _0x257777(0x102):case _0x257777(0xf8):this[_0x257777(0x4e7)]();break;case _0x257777(0x36a):case'vertical\x20mirror':case _0x257777(0x3a8):case'vert\x20mirror':this['processMoveSynchMirrorVert']();break;default:this[_0x257777(0x146)]();break;}this[_0x257777(0x464)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x146)]=function(){const _0x239054=_0xe91ae0,_0x47901d=[0x2,0x4,0x6,0x8];$gameMap[_0x239054(0x4fc)]()&&_0x47901d['push'](0x1,0x3,0x7,0x9);const _0x270048=[];for(const _0x23aede of _0x47901d){if(this[_0x239054(0x153)](this['x'],this['y'],_0x23aede))_0x270048[_0x239054(0x17a)](_0x23aede);}if(_0x270048[_0x239054(0x235)]>0x0){const _0x3b43b5=_0x270048[Math[_0x239054(0x441)](_0x270048[_0x239054(0x235)])];this[_0x239054(0x109)](_0x3b43b5);}},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x2c5)]=function(){const _0x3975a3=_0xe91ae0,_0x43d515=VisuMZ['GetMoveSynchTarget'](this[_0x3975a3(0x167)]());this[_0x3975a3(0x2b5)](_0x43d515);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4ec)]=function(){const _0x432e29=_0xe91ae0,_0x58c3fa=VisuMZ[_0x432e29(0x31d)](this[_0x432e29(0x167)]());this[_0x432e29(0x3ed)](_0x58c3fa);},Game_Event['prototype'][_0xe91ae0(0x533)]=function(){const _0x3be43f=_0xe91ae0;this[_0x3be43f(0x4ce)]();},Game_Event['prototype'][_0xe91ae0(0x1da)]=function(){const _0x22381f=_0xe91ae0,_0x59e6fe=VisuMZ[_0x22381f(0x31d)](this[_0x22381f(0x167)]());this[_0x22381f(0x109)](_0x59e6fe['lastMovedDirection']());},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x41f)]=function(){const _0x58cb50=_0xe91ae0,_0x5a4a1a=VisuMZ[_0x58cb50(0x31d)](this['moveSynchTarget']());this['executeMoveDir8'](this[_0x58cb50(0x536)](_0x5a4a1a[_0x58cb50(0x1ab)]()));},Game_Event['prototype'][_0xe91ae0(0x4e7)]=function(){const _0x3e5cd1=_0xe91ae0,_0x8c4008=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x5320c9=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x8c4008[_0x3e5cd1(0x1ab)]()];this[_0x3e5cd1(0x109)](_0x5320c9);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x234)]=function(){const _0x94289c=_0xe91ae0,_0x1dbc21=VisuMZ[_0x94289c(0x31d)](this[_0x94289c(0x167)]()),_0x206b2f=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x1dbc21[_0x94289c(0x1ab)]()];this['executeMoveDir8'](_0x206b2f);},Game_Event['prototype'][_0xe91ae0(0x2e0)]=function(){const _0x434e03=_0xe91ae0,_0x2af33a=VisuMZ[_0x434e03(0x31d)](this[_0x434e03(0x167)]()),_0x7fd20a=_0x2af33a[_0x434e03(0x3c3)]();switch(this[_0x434e03(0x526)]()){case _0x434e03(0x5b6):case _0x434e03(0x190):this[_0x434e03(0x3e6)](_0x7fd20a);break;case _0x434e03(0x3d8):case _0x434e03(0x53d):this[_0x434e03(0x3e6)](this[_0x434e03(0x536)](_0x7fd20a));break;case'mirror\x20horizontal':case _0x434e03(0x2e6):case _0x434e03(0x102):case _0x434e03(0xf8):this[_0x434e03(0x3e6)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x7fd20a]);break;case _0x434e03(0x36a):case'vertical\x20mirror':case'mirror\x20vert':case _0x434e03(0x545):this[_0x434e03(0x3e6)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x7fd20a]);break;default:return;}this[_0x434e03(0x464)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x306)]=function(){const _0x31d0f8=_0xe91ae0,_0x2c8ac5=$gameSystem['getSavedEventLocation'](this);if(!_0x2c8ac5)return;this['setPosition'](_0x2c8ac5['x'],_0x2c8ac5['y']),this[_0x31d0f8(0x1c9)](),this['setDirection'](_0x2c8ac5[_0x31d0f8(0x3c3)]),this['_pageIndex']===_0x2c8ac5[_0x31d0f8(0x5b5)]&&(this[_0x31d0f8(0x2f1)]=_0x2c8ac5[_0x31d0f8(0x324)]);},VisuMZ[_0xe91ae0(0x24e)]['Game_Event_update']=Game_Event['prototype'][_0xe91ae0(0x464)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x464)]=function(){const _0x3d7533=_0xe91ae0;VisuMZ[_0x3d7533(0x24e)][_0x3d7533(0x186)][_0x3d7533(0x24f)](this),!Utils[_0x3d7533(0x1f0)]()&&this[_0x3d7533(0x378)]();},Game_Event['prototype']['updateMove']=function(){const _0xe58ed7=_0xe91ae0;Game_Character[_0xe58ed7(0x36f)]['updateMove'][_0xe58ed7(0x24f)](this),this['autosaveEventLocation']();},Game_Event['prototype'][_0xe91ae0(0x373)]=function(){const _0x21578f=_0xe91ae0;if($gameMap[_0x21578f(0x347)]())return!![];return this[_0x21578f(0x117)];},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x428)]=function(){const _0x417c23=_0xe91ae0;if(!this[_0x417c23(0x373)]())return;this[_0x417c23(0x1bb)]();},Game_Event['prototype'][_0xe91ae0(0x1bb)]=function(){const _0x2be0a8=_0xe91ae0;this[_0x2be0a8(0xc5)]=!![];},Game_Event['prototype'][_0xe91ae0(0x378)]=function(){this['_requestSaveEventLocation']&&this['processSaveEventLocation']();},Game_Event['prototype'][_0xe91ae0(0x397)]=function(){const _0x198a8b=_0xe91ae0;this[_0x198a8b(0xc5)]=![],$gameSystem[_0x198a8b(0x1bb)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x1e2)]=function(){const _0x500633=_0xe91ae0;$gameSystem[_0x500633(0x4bd)](this);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x4b8)]=function(){const _0x3fe73f=_0xe91ae0;return $gameSystem['getEventIconData'](this)?Game_Character[_0x3fe73f(0x36f)][_0x3fe73f(0x4b8)][_0x3fe73f(0x24f)](this):{'iconIndex':0x0,'bufferX':settings['Icon'][_0x3fe73f(0x193)],'bufferY':settings[_0x3fe73f(0x4b0)][_0x3fe73f(0x28a)],'blendMode':settings['Icon']['BlendMode']};},Game_Event['prototype']['hasCPCs']=function(){return this['_CPCs'];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x192)]=Game_Event[_0xe91ae0(0x36f)]['meetsConditions'],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x296)]=function(_0x4c9227){const _0x3b3647=_0xe91ae0,_0x330a73=VisuMZ[_0x3b3647(0x24e)]['Game_Event_meetsConditionsCPC'][_0x3b3647(0x24f)](this,_0x4c9227);if(!_0x330a73)return![];return this['meetsCPC'](_0x4c9227);},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x1f3)]=function(_0x54af07){const _0x4d77ad=_0xe91ae0;VisuMZ[_0x4d77ad(0x24e)][_0x4d77ad(0x54f)][_0x4d77ad(0x379)](_0x54af07),this['_CPCs']=_0x54af07[_0x4d77ad(0x577)][_0x4d77ad(0x235)]>0x0;_0x54af07[_0x4d77ad(0x577)]===undefined&&VisuMZ[_0x4d77ad(0x24e)][_0x4d77ad(0x54f)][_0x4d77ad(0x379)](_0x54af07);if(_0x54af07['CPC'][_0x4d77ad(0x235)]>0x0)return $gameMap['event'](this[_0x4d77ad(0x19b)])&&VisuMZ[_0x4d77ad(0x24e)]['CustomPageConditions']['metCPC'](_0x54af07['CPC'],this[_0x4d77ad(0x19b)]);return!![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x286)]=Game_Troop[_0xe91ae0(0x36f)]['meetsConditions'],Game_Troop['prototype'][_0xe91ae0(0x296)]=function(_0x54849e){const _0x23e49a=_0xe91ae0;var _0x4b6546=VisuMZ['EventsMoveCore'][_0x23e49a(0x286)][_0x23e49a(0x24f)](this,_0x54849e);return _0x4b6546&&this[_0x23e49a(0x55d)](_0x54849e);},Game_Troop[_0xe91ae0(0x36f)][_0xe91ae0(0x55d)]=function(_0x3791ce){const _0x4ad0e6=_0xe91ae0;_0x3791ce[_0x4ad0e6(0x577)]===undefined&&VisuMZ[_0x4ad0e6(0x24e)]['CustomPageConditions'][_0x4ad0e6(0x379)](_0x3791ce);if(_0x3791ce[_0x4ad0e6(0x577)]['length']>0x0)return VisuMZ[_0x4ad0e6(0x24e)][_0x4ad0e6(0x54f)]['metCPC'](_0x3791ce[_0x4ad0e6(0x577)],0x0);return!![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x2c6)]=Game_Event[_0xe91ae0(0x36f)]['locate'],Game_Event['prototype']['locate']=function(_0x5cb883,_0x282137){const _0x2dd3e6=_0xe91ae0;if(this[_0x2dd3e6(0xd7)]){const _0x435670=this[_0x2dd3e6(0x130)]()[_0x2dd3e6(0x228)]||'';if(_0x435670[_0x2dd3e6(0x18c)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x33fc2e=String(RegExp['$1'])[_0x2dd3e6(0x1b7)](',')[_0x2dd3e6(0x421)](_0x5ecf8e=>Number(_0x5ecf8e));_0x5cb883+=Number(_0x33fc2e[0x0]||0x0)||0x0,_0x282137+=Number(_0x33fc2e[0x1]||0x0)||0x0;}_0x435670[_0x2dd3e6(0x18c)](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x5cb883+=Number(RegExp['$1'])),_0x435670[_0x2dd3e6(0x18c)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0x282137+=Number(RegExp['$1']));}VisuMZ[_0x2dd3e6(0x24e)][_0x2dd3e6(0x2c6)][_0x2dd3e6(0x24f)](this,_0x5cb883,_0x282137),this[_0x2dd3e6(0x1e7)]=_0x5cb883,this['_randomHomeY']=_0x282137,this['autosaveEventLocation']();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1f1)]=Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x546)],Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x546)]=function(){const _0x5e7341=_0xe91ae0,_0x3fc20e=$gameMap[_0x5e7341(0x443)](this['x'],this['y'],this['_randomHomeX'],this[_0x5e7341(0x3ff)]),_0x330edf=_0x3fc20e*(this[_0x5e7341(0x161)]||0x0);Math[_0x5e7341(0x5a8)]()>=_0x330edf?VisuMZ['EventsMoveCore'][_0x5e7341(0x1f1)][_0x5e7341(0x24f)](this):this[_0x5e7341(0x372)]();},Game_Event[_0xe91ae0(0x36f)][_0xe91ae0(0x372)]=function(){const _0x9fde11=_0xe91ae0,_0x5b0744=this[_0x9fde11(0x31e)](this[_0x9fde11(0x1e7)]),_0x23914c=this[_0x9fde11(0x480)](this['_randomHomeY']);if(Math['abs'](_0x5b0744)>Math[_0x9fde11(0x500)](_0x23914c))this[_0x9fde11(0xc9)](_0x5b0744>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x23914c!==0x0&&this[_0x9fde11(0xc9)](_0x23914c>0x0?0x8:0x2);else _0x23914c!==0x0&&(this[_0x9fde11(0xc9)](_0x23914c>0x0?0x8:0x2),!this[_0x9fde11(0x387)]()&&_0x5b0744!==0x0&&this[_0x9fde11(0xc9)](_0x5b0744>0x0?0x4:0x6));},Game_CharacterBase[_0xe91ae0(0x36f)]['clearAttachPictureSettings']=function(){const _0xffa429=_0xe91ae0;this[_0xffa429(0x4db)]={'filename':'','type':'picture','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0xe91ae0(0x36f)]['attachPictureSettings']=function(){const _0x320eb8=_0xe91ae0;if(this['_attachPicture']===undefined)this[_0x320eb8(0x341)]();return this[_0x320eb8(0x4db)];},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x4a4)]=function(){const _0x2792b2=_0xe91ae0;return this['attachPictureSettings']()[_0x2792b2(0x3e2)]??'';},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x554)]=function(){const _0x1475ed=_0xe91ae0;return this['attachPictureSettings']()[_0x1475ed(0x32e)]??'picture';},Game_CharacterBase[_0xe91ae0(0x36f)]['attachPictureBlendMode']=function(){const _0x408bfd=_0xe91ae0;return this[_0x408bfd(0x4c0)]()['blendMode']??0x0;},Game_CharacterBase['prototype'][_0xe91ae0(0x357)]=function(){const _0xc99916=_0xe91ae0;return this[_0xc99916(0x4c0)]()['maxSize']??0x0;},Game_CharacterBase[_0xe91ae0(0x36f)]['attachPictureOffsetX']=function(){const _0x3b0e95=_0xe91ae0;return this['attachPictureSettings']()[_0x3b0e95(0x409)]??0x0;},Game_CharacterBase['prototype']['attachPictureOffsetY']=function(){const _0x586d0d=_0xe91ae0;return this[_0x586d0d(0x4c0)]()[_0x586d0d(0x10d)]??0x0;},Game_CharacterBase[_0xe91ae0(0x36f)][_0xe91ae0(0x31a)]=function(){const _0x51539c=_0xe91ae0;return this['attachPictureSettings']()[_0x51539c(0x466)]??0x1;},VisuMZ['EventsMoveCore'][_0xe91ae0(0x12a)]=Game_Interpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x101)],Game_Interpreter[_0xe91ae0(0x36f)]['updateWaitMode']=function(){const _0x4cd1fa=_0xe91ae0;if(this[_0x4cd1fa(0x26c)]===_0x4cd1fa(0x31b)){if(window[this[_0x4cd1fa(0x23e)]])this[_0x4cd1fa(0x26c)]='',this[_0x4cd1fa(0x314)]();else return!![];}else return VisuMZ[_0x4cd1fa(0x24e)]['Game_Interpreter_updateWaitMode'][_0x4cd1fa(0x24f)](this);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x4c9)]=Game_Interpreter[_0xe91ae0(0x36f)]['executeCommand'],Game_Interpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x51e)]=function(){const _0x10c50f=_0xe91ae0,_0x208e64=$gameMap&&this[_0x10c50f(0x19b)]?$gameMap[_0x10c50f(0x130)](this['_eventId']):null;$gameTemp[_0x10c50f(0x3ab)](_0x208e64);const _0x5ce1b5=VisuMZ[_0x10c50f(0x24e)][_0x10c50f(0x4c9)][_0x10c50f(0x24f)](this);return $gameTemp[_0x10c50f(0x4da)](),_0x5ce1b5;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x534)]=Game_Interpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x355)],Game_Interpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x355)]=function(_0x26fc40){const _0x360f08=_0xe91ae0;return $gameTemp[_0x360f08(0x3d6)](this),VisuMZ[_0x360f08(0x24e)][_0x360f08(0x534)][_0x360f08(0x24f)](this,_0x26fc40);},Game_Interpreter[_0xe91ae0(0x36f)]['pluginCommandCallEvent']=function(_0x188c30){const _0x5c5039=_0xe91ae0;this[_0x5c5039(0x4dc)]=_0x188c30;const _0x4ebf5b=_0x5c5039(0x2c8)[_0x5c5039(0x54a)](_0x188c30[_0x5c5039(0x55b)][_0x5c5039(0x425)](0x3));this['_callEventMap']='$callEventMap'+Graphics['frameCount']+'_'+this[_0x5c5039(0x247)](),DataManager[_0x5c5039(0x4d4)](this[_0x5c5039(0x23e)],_0x4ebf5b),window[this[_0x5c5039(0x23e)]]?this[_0x5c5039(0x314)]():this[_0x5c5039(0x185)]('CallEvent');},Game_Interpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x314)]=function(){const _0x5ed290=_0xe91ae0,_0x4f2247=this[_0x5ed290(0x4dc)],_0x4523d7=window[this[_0x5ed290(0x23e)]],_0xce2ec4=_0x4523d7[_0x5ed290(0x45b)][_0x4f2247[_0x5ed290(0x247)]];if(_0xce2ec4&&_0xce2ec4[_0x5ed290(0x572)][_0x4f2247[_0x5ed290(0x227)]-0x1]){const _0x2f2cb4=_0xce2ec4['pages'][_0x4f2247[_0x5ed290(0x227)]-0x1][_0x5ed290(0x22b)];this[_0x5ed290(0x450)](_0x2f2cb4,this[_0x5ed290(0x247)]());}window[this['_callEventMap']]=undefined,this['_callEventMap']=undefined,this[_0x5ed290(0x4dc)]=undefined;};function Game_CPCInterpreter(){const _0x8f88a0=_0xe91ae0;this[_0x8f88a0(0x2f0)][_0x8f88a0(0x126)](this,arguments);};Game_CPCInterpreter[_0xe91ae0(0x36f)]=Object[_0xe91ae0(0x29d)](Game_Interpreter[_0xe91ae0(0x36f)]),Game_CPCInterpreter[_0xe91ae0(0x36f)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0xe91ae0(0x36f)][_0xe91ae0(0xfe)]=function(){const _0xeaecaa=_0xe91ae0;Game_Interpreter[_0xeaecaa(0x36f)][_0xeaecaa(0xfe)][_0xeaecaa(0x24f)](this),this[_0xeaecaa(0x12f)]=![];},Game_CPCInterpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x1a2)]=function(){const _0x2feb58=_0xe91ae0;while(this[_0x2feb58(0x344)]()){this[_0x2feb58(0x51e)]();}},Game_CPCInterpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x151)]=function(_0x382873){const _0x1a5b16=_0xe91ae0;while(this['isRunning']()){this[_0x1a5b16(0x1d3)](_0x382873);}},Game_CPCInterpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x1d3)]=function(_0x2921d0){const _0x3c2a9e=_0xe91ae0,_0x4c2b05=_0x2921d0;$gameTemp[_0x3c2a9e(0x3ab)](_0x4c2b05);const _0x172e37=VisuMZ['EventsMoveCore'][_0x3c2a9e(0x4c9)][_0x3c2a9e(0x24f)](this);return $gameTemp[_0x3c2a9e(0x4da)](),_0x172e37;},Game_CPCInterpreter[_0xe91ae0(0x36f)][_0xe91ae0(0x399)]=function(_0x2f73ee){const _0x51cc1a=_0xe91ae0;return Game_Interpreter[_0x51cc1a(0x36f)][_0x51cc1a(0x399)][_0x51cc1a(0x24f)](this,_0x2f73ee),this[_0x51cc1a(0x30b)]['some'](_0x188449=>_0x188449[_0x51cc1a(0x18c)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x51cc1a(0x12f)]=!![]),!![];},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3b2)]=Scene_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x508)],Scene_Map['prototype'][_0xe91ae0(0x508)]=function(){const _0x2e8ad1=_0xe91ae0;VisuMZ['EventsMoveCore'][_0x2e8ad1(0x3b2)][_0x2e8ad1(0x24f)](this),this[_0x2e8ad1(0x39f)][_0x2e8ad1(0x4a1)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x10f)]=Scene_Load['prototype'][_0xe91ae0(0xe0)],Scene_Load['prototype']['onLoadSuccess']=function(){const _0x3c2014=_0xe91ae0;if($gameMap)$gameMap[_0x3c2014(0x275)]();VisuMZ[_0x3c2014(0x24e)][_0x3c2014(0x10f)]['call'](this);},VisuMZ['EventsMoveCore']['Game_System_onAfterLoad']=Game_System[_0xe91ae0(0x36f)]['onAfterLoad'],Game_System['prototype'][_0xe91ae0(0x3b6)]=function(){const _0x7c14a4=_0xe91ae0;VisuMZ[_0x7c14a4(0x24e)][_0x7c14a4(0x57a)][_0x7c14a4(0x24f)](this);if($gameMap)$gameMap[_0x7c14a4(0x275)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x157)]=Sprite_Character[_0xe91ae0(0x36f)]['initMembers'],Sprite_Character[_0xe91ae0(0x36f)]['initMembers']=function(){const _0x4d603a=_0xe91ae0;VisuMZ[_0x4d603a(0x24e)][_0x4d603a(0x157)][_0x4d603a(0x24f)](this),this['initMembersEventsMoveCore'](),this[_0x4d603a(0x112)](),this[_0x4d603a(0x141)]();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x3f7)]=function(){this['_shadowOpacity']=0xff,this['_isCharacterSpriteSheetInvisible']=![];},Sprite_Character['prototype']['isSpriteVS8dir']=function(){const _0x16e31d=_0xe91ae0;return this[_0x16e31d(0x3cb)]&&this[_0x16e31d(0x3cb)][_0x16e31d(0x18c)](/\[VS8\]/i);},Sprite_Character['prototype'][_0xe91ae0(0x2c9)]=function(){const _0x474213=_0xe91ae0;return this[_0x474213(0x3b0)]()&&VisuMZ[_0x474213(0x24e)]['Settings'][_0x474213(0x298)][_0x474213(0x2a2)];},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x112)]=function(){const _0x3131e6=_0xe91ae0;this[_0x3131e6(0x13e)]=new Sprite(),this[_0x3131e6(0x13e)][_0x3131e6(0x144)]['x']=0.5,this[_0x3131e6(0x13e)][_0x3131e6(0x144)]['y']=0x1,this[_0x3131e6(0x3dc)](this['_attachPictureSprite']),this[_0x3131e6(0x2c4)]();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x141)]=function(){const _0x1377d9=_0xe91ae0;this[_0x1377d9(0x58b)]=new Sprite(),this[_0x1377d9(0x58b)][_0x1377d9(0x14c)]=ImageManager[_0x1377d9(0x19f)]('IconSet'),this[_0x1377d9(0x58b)]['bitmap']['smooth']=![],this['_eventIconSprite']['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x1377d9(0x144)]['x']=0.5,this[_0x1377d9(0x58b)]['anchor']['y']=0x1,this[_0x1377d9(0x3dc)](this['_eventIconSprite']);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1dd)]=Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x464)],Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x464)]=function(){const _0x5baafe=_0xe91ae0;VisuMZ[_0x5baafe(0x24e)][_0x5baafe(0x1dd)][_0x5baafe(0x24f)](this),this[_0x5baafe(0x15d)]();},Sprite_Character[_0xe91ae0(0x36f)]['updateVisibility']=function(){const _0x1ca5f1=_0xe91ae0;Sprite[_0x1ca5f1(0x36f)][_0x1ca5f1(0x3fb)]['call'](this),this[_0x1ca5f1(0x2fd)]()&&(this[_0x1ca5f1(0xf1)]=![]);},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x2fd)]=function(){const _0x2cb24c=_0xe91ae0;if(this[_0x2cb24c(0x569)]()>0x0)return![];if(this[_0x2cb24c(0x37c)]){if(this[_0x2cb24c(0x37c)]['attachPictureFilename']()!=='')return![];}return this[_0x2cb24c(0x48a)]()||this['_character']&&this['_character'][_0x2cb24c(0x131)]();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x524)]=function(){const _0x2b755a=_0xe91ae0;if(!this[_0x2b755a(0x14c)])return;this[_0x2b755a(0x14c)][_0x2b755a(0x31f)]=!!VisuMZ[_0x2b755a(0x24e)][_0x2b755a(0x477)]['Movement'][_0x2b755a(0x1b2)];},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x15d)]=function(){const _0x121a25=_0xe91ae0;this[_0x121a25(0x14f)](),this[_0x121a25(0x107)](),this['updateShadow'](),this[_0x121a25(0x529)](),this['updateEventCustomZ'](),this['updateEventMirrorSprite'](),this[_0x121a25(0x2c4)]();},VisuMZ['EventsMoveCore'][_0xe91ae0(0x48e)]=Sprite_Character['prototype']['setTileBitmap'],Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x222)]=function(){const _0x504908=_0xe91ae0;VisuMZ[_0x504908(0x24e)][_0x504908(0x48e)]['call'](this),this['bitmap']['addLoadListener'](this[_0x504908(0x524)][_0x504908(0x42a)](this));},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x403)]=function(){const _0x30e3e8=_0xe91ae0,_0x5b61b0=this[_0x30e3e8(0x2a3)],_0x232633=this[_0x30e3e8(0x138)](),_0x11ab5e=this[_0x30e3e8(0x552)](),_0x2fbc9c=(Math['floor'](_0x5b61b0/0x80)%0x2*0x8+_0x5b61b0%0x8)*_0x232633,_0x35a8a6=Math[_0x30e3e8(0x549)](_0x5b61b0%0x100/0x8)%0x10*_0x11ab5e,_0x4c2925=this[_0x30e3e8(0x253)]();let _0x2dcb9e=_0x2fbc9c,_0x27d96a=_0x35a8a6,_0x206945=_0x232633,_0x319d93=_0x11ab5e;_0x4c2925['up']&&_0x4c2925['up']>0x0&&(_0x27d96a-=_0x11ab5e*_0x4c2925['up'],_0x319d93+=_0x11ab5e*_0x4c2925['up']),_0x4c2925['down']&&_0x4c2925[_0x30e3e8(0x419)]>0x0&&(_0x319d93+=_0x11ab5e*_0x4c2925['down']),_0x4c2925['left']&&_0x4c2925[_0x30e3e8(0xe5)]>0x0&&(_0x2dcb9e-=_0x232633*_0x4c2925[_0x30e3e8(0xe5)],_0x206945+=_0x232633*_0x4c2925['left']),_0x4c2925['right']&&_0x4c2925[_0x30e3e8(0x49c)]>0x0&&(_0x206945+=_0x232633*_0x4c2925[_0x30e3e8(0x49c)]),this[_0x30e3e8(0x29b)](_0x2dcb9e,_0x27d96a,_0x206945,_0x319d93);},Sprite_Character[_0xe91ae0(0x36f)]['getTileExpandData']=function(){const _0x47876d=_0xe91ae0;return this['_character']?this[_0x47876d(0x37c)]['_tileExpand']||{}:{};},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x3c6)]=Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x47a)],Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x47a)]=function(){const _0x10df97=_0xe91ae0;VisuMZ[_0x10df97(0x24e)][_0x10df97(0x3c6)][_0x10df97(0x24f)](this),this[_0x10df97(0x14c)][_0x10df97(0x140)](this[_0x10df97(0x524)][_0x10df97(0x42a)](this)),this['_isCharacterSpriteSheetInvisible']=ImageManager[_0x10df97(0x211)](this['_characterName']),this[_0x10df97(0x147)]&&this[_0x10df97(0x14c)]['addLoadListener'](this[_0x10df97(0x118)][_0x10df97(0x42a)](this));},Sprite_Character['prototype'][_0xe91ae0(0x118)]=function(){const _0x3e21db=_0xe91ae0;this[_0x3e21db(0x14c)]=new Bitmap(this[_0x3e21db(0x14c)][_0x3e21db(0x1dc)],this[_0x3e21db(0x14c)]['height']);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1a8)]=Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x4ee)],Sprite_Character['prototype'][_0xe91ae0(0x4ee)]=function(){const _0x59ed6f=_0xe91ae0;return this['isSpriteVS8dir']()?this['characterPatternYVS8']():this[_0x59ed6f(0x54b)]();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x556)]=function(){const _0x10ff79=_0xe91ae0,_0x25aa7b=this['_character'][_0x10ff79(0x3c3)]();let _0xc5754a=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character']['_mirrorSprite']&&(_0xc5754a=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0xc5754a[_0x25aa7b]-0x2)/0x2;},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x54b)]=function(){const _0x482d8d=_0xe91ae0;let _0x3b409a=this[_0x482d8d(0x37c)][_0x482d8d(0x3c3)]();if(this[_0x482d8d(0x37c)][_0x482d8d(0x5a4)]){if(_0x3b409a===0x4)_0x3b409a=0x6;else _0x3b409a===0x6&&(_0x3b409a=0x4);}return(_0x3b409a-0x2)/0x2;},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x14f)]=function(){const _0x3933b5=_0xe91ae0;this[_0x3933b5(0x466)]['x']=this['_character'][_0x3933b5(0x461)]??0x1,this[_0x3933b5(0x466)]['y']=this['_character'][_0x3933b5(0x149)]??0x1;},Sprite_Character['prototype'][_0xe91ae0(0x107)]=function(){const _0x11ecde=_0xe91ae0;if(!VisuMZ[_0x11ecde(0x24e)]['Settings'][_0x11ecde(0xdf)]['EnableDashTilt'])return;this[_0x11ecde(0x12b)]=0x0;if(this[_0x11ecde(0x4c5)]()){const _0x1253e8=VisuMZ[_0x11ecde(0x24e)][_0x11ecde(0x477)][_0x11ecde(0xdf)],_0x519571=this[_0x11ecde(0x37c)]['direction']();let _0x1cb7bd=0x0;if([0x1,0x4,0x7][_0x11ecde(0x575)](_0x519571))_0x1cb7bd=_0x1253e8[_0x11ecde(0x57f)];if([0x3,0x6,0x9][_0x11ecde(0x575)](_0x519571))_0x1cb7bd=_0x1253e8[_0x11ecde(0x585)];[0x2,0x8][_0x11ecde(0x575)](_0x519571)&&(_0x1cb7bd=[-_0x1253e8[_0x11ecde(0x1df)],0x0,_0x1253e8['TiltVert']][this[_0x11ecde(0x37c)][_0x11ecde(0x196)]()]);if(this['_reflection'])_0x1cb7bd*=-0x1;this[_0x11ecde(0x12b)]=_0x1cb7bd;}},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x4c5)]=function(){const _0x21b3ab=_0xe91ae0;if(this[_0x21b3ab(0x40f)])return![];return this['_character']['isDashingAndMoving']()&&!this['_character'][_0x21b3ab(0x3c5)]()&&!this['_character']['isPosing']()&&this[_0x21b3ab(0x569)]()===0x0;},Sprite_Character[_0xe91ae0(0x36f)]['updateShadow']=function(){const _0x160b91=_0xe91ae0;if(!this[_0x160b91(0x26d)])return;this[_0x160b91(0x26d)]['x']=this['_character'][_0x160b91(0x3e5)](),this[_0x160b91(0x26d)]['y']=this[_0x160b91(0x37c)][_0x160b91(0x458)](),this['_shadowSprite']['opacity']=this['opacity'],this[_0x160b91(0x26d)][_0x160b91(0xf1)]=this[_0x160b91(0x37c)]['isShadowVisible'](),this[_0x160b91(0x26d)][_0x160b91(0x4d5)]=this['_hidden'];if(this[_0x160b91(0x37c)]['isShadowShrink']())this['_shadowSprite'][_0x160b91(0x466)]['x']=Math[_0x160b91(0x1c4)](0x0,this['_shadowSprite'][_0x160b91(0x466)]['x']-0.1),this['_shadowSprite'][_0x160b91(0x466)]['y']=Math[_0x160b91(0x1c4)](0x0,this[_0x160b91(0x26d)]['scale']['y']-0.1);else{if(this[_0x160b91(0x26d)][_0x160b91(0x466)]['x']!==this[_0x160b91(0x466)]['x']){if(this['_shadowSprite']['scale']['x']>this['scale']['x'])this['_shadowSprite'][_0x160b91(0x466)]['x']=Math[_0x160b91(0x259)](this[_0x160b91(0x26d)][_0x160b91(0x466)]['x']+0.1,this['scale']['x']);if(this[_0x160b91(0x26d)][_0x160b91(0x466)]['x']<this['scale']['x'])this['_shadowSprite']['scale']['x']=Math['max'](this[_0x160b91(0x26d)]['scale']['x']-0.1,this[_0x160b91(0x466)]['x']);}if(this[_0x160b91(0x26d)][_0x160b91(0x466)]['y']!==this['scale']['y']){if(this[_0x160b91(0x26d)][_0x160b91(0x466)]['y']>this[_0x160b91(0x466)]['y'])this[_0x160b91(0x26d)]['scale']['y']=Math[_0x160b91(0x259)](this[_0x160b91(0x26d)][_0x160b91(0x466)]['y']+0.1,this[_0x160b91(0x466)]['y']);if(this[_0x160b91(0x26d)][_0x160b91(0x466)]['y']<this[_0x160b91(0x466)]['y'])this[_0x160b91(0x26d)][_0x160b91(0x466)]['y']=Math['max'](this['_shadowSprite'][_0x160b91(0x466)]['y']-0.1,this[_0x160b91(0x466)]['y']);}}},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x529)]=function(){const _0x2f57f6=_0xe91ae0;if(!this['_eventIconSprite'])return;const _0x4ecb28=this[_0x2f57f6(0x58b)],_0x43373b=this[_0x2f57f6(0x569)]();if(_0x43373b<=0x0)return _0x4ecb28['setFrame'](0x0,0x0,0x0,0x0);else{const _0x23a09b=ImageManager[_0x2f57f6(0x27c)],_0x501480=ImageManager[_0x2f57f6(0x21d)],_0x574a05=_0x43373b%0x10*_0x23a09b,_0x50a992=Math[_0x2f57f6(0x549)](_0x43373b/0x10)*_0x501480;_0x4ecb28[_0x2f57f6(0x29b)](_0x574a05,_0x50a992,_0x23a09b,_0x501480),this['visible']=!![];}const _0x51b13b=this[_0x2f57f6(0x37c)][_0x2f57f6(0x4b8)]();this[_0x2f57f6(0x2c9)]()?this[_0x2f57f6(0x47d)](_0x4ecb28):(_0x4ecb28['x']=_0x51b13b?_0x51b13b[_0x2f57f6(0x279)]:0x0,_0x4ecb28['y']=_0x51b13b?-this[_0x2f57f6(0x578)]+_0x51b13b[_0x2f57f6(0x169)]:0x0),_0x4ecb28[_0x2f57f6(0x2d5)]=_0x51b13b?_0x51b13b[_0x2f57f6(0x2d5)]:0x0,this[_0x2f57f6(0x4cf)](_0x4ecb28),this[_0x2f57f6(0x3dc)](_0x4ecb28),_0x4ecb28[_0x2f57f6(0x12b)]=-this[_0x2f57f6(0x12b)];},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x47d)]=function(_0xe39898){const _0x499d4d=_0xe91ae0;_0xe39898['x']=0x0,_0xe39898['y']=-this['height']+this[_0x499d4d(0x578)]*0x2/0x5,this['_character']['pattern']()!==0x1&&(_0xe39898['y']+=0x1);},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x569)]=function(){const _0x334c97=_0xe91ae0;if(!this[_0x334c97(0x37c)])return 0x0;if(this[_0x334c97(0x37c)]['_erased'])return 0x0;const _0xbc63c5=this['_character'][_0x334c97(0x4b8)]();return _0xbc63c5?_0xbc63c5['iconIndex']||0x0:0x0;},Sprite_Character['prototype'][_0xe91ae0(0x59f)]=function(){const _0x50c0b7=_0xe91ae0;if(!this['_character'])return;if(this[_0x50c0b7(0x37c)][_0x50c0b7(0x2c7)]===undefined)return;if(this[_0x50c0b7(0x37c)][_0x50c0b7(0x2c7)]===![])return;this['z']=this[_0x50c0b7(0x37c)][_0x50c0b7(0x2c7)],this[_0x50c0b7(0x26d)]&&(this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0);},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x17b)]=function(){const _0x516592=_0xe91ae0;if(!this['_character'])return;let _0x379d2e=!!this[_0x516592(0x37c)]['_mirrorSprite'];this[_0x516592(0x466)]['x']=Math[_0x516592(0x500)](this[_0x516592(0x466)]['x'])*(_0x379d2e?-0x1:0x1);},Sprite_Character['prototype'][_0xe91ae0(0x2c4)]=function(){const _0x326477=_0xe91ae0;if(!this[_0x326477(0x13e)])return;if(!this[_0x326477(0x37c)])return;this[_0x326477(0x580)](),this['updateAttachPictureBitmap']();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x580)]=function(){const _0x4f95cc=_0xe91ae0;if(!this[_0x4f95cc(0x41e)]())return;const _0x54d351=this[_0x4f95cc(0x37c)][_0x4f95cc(0x4c0)]();this[_0x4f95cc(0x42d)]=_0x54d351['filename'],this[_0x4f95cc(0x4b5)]=_0x54d351[_0x4f95cc(0xce)],this[_0x4f95cc(0x507)]=_0x54d351[_0x4f95cc(0x215)],this[_0x4f95cc(0x133)]=_0x54d351[_0x4f95cc(0x466)];if(_0x54d351[_0x4f95cc(0x3e2)]!==''){if(_0x54d351['type']===_0x4f95cc(0x28d)){const _0x2afa50=ImageManager[_0x4f95cc(0x3d4)](_0x54d351[_0x4f95cc(0x3e2)]);_0x2afa50[_0x4f95cc(0x140)](this[_0x4f95cc(0x25a)][_0x4f95cc(0x42a)](this,_0x2afa50));}else{if(_0x54d351[_0x4f95cc(0xce)]===_0x4f95cc(0x4a7)){const _0x40b1c9=ImageManager[_0x4f95cc(0x19c)](_0x54d351[_0x4f95cc(0x3e2)]);_0x40b1c9[_0x4f95cc(0x140)](this[_0x4f95cc(0x25a)][_0x4f95cc(0x42a)](this,_0x40b1c9));}else{const _0x9a1b91=ImageManager[_0x4f95cc(0x213)](_0x54d351[_0x4f95cc(0x3e2)]);_0x9a1b91[_0x4f95cc(0x140)](this[_0x4f95cc(0x25a)][_0x4f95cc(0x42a)](this,_0x9a1b91));}}}else this[_0x4f95cc(0x13e)][_0x4f95cc(0x14c)]=new Bitmap(0x1,0x1);},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x437)]=function(){const _0x4b87b0=_0xe91ae0,_0x1f7f75=this[_0x4b87b0(0x13e)];_0x1f7f75['x']=this[_0x4b87b0(0x37c)][_0x4b87b0(0x412)](),_0x1f7f75['y']=this[_0x4b87b0(0x37c)][_0x4b87b0(0x32a)](),_0x1f7f75[_0x4b87b0(0x2d5)]=this[_0x4b87b0(0x37c)]['attachPictureBlendMode']();},Sprite_Character[_0xe91ae0(0x36f)]['needsAttachPictureUpdate']=function(){const _0x84580e=_0xe91ae0,_0x5a7dd2=this[_0x84580e(0x37c)]['attachPictureSettings']();if(_0x5a7dd2){if(this[_0x84580e(0x42d)]!==_0x5a7dd2[_0x84580e(0x3e2)])return!![];if(this[_0x84580e(0x4b5)]!==_0x5a7dd2[_0x84580e(0xce)])return!![];if(this[_0x84580e(0x507)]!==_0x5a7dd2['maxSize'])return!![];if(this[_0x84580e(0x133)]!==_0x5a7dd2[_0x84580e(0x466)])return!![];}return![];},Sprite_Character['prototype'][_0xe91ae0(0x25a)]=function(_0x1af02e){const _0x3d196e=_0xe91ae0,_0x3823d3=this[_0x3d196e(0x13e)];_0x3823d3[_0x3d196e(0x14c)]=_0x1af02e;const _0x318d98=this[_0x3d196e(0x37c)]['attachPictureSettings'](),_0x1d6bb8=_0x318d98[_0x3d196e(0x215)],_0x21e9f1=_0x318d98['scale'];let _0x5b659d=0x1;if(_0x1d6bb8>0x0){let _0x194d09=this[_0x3d196e(0x525)]()||0x1,_0x5546ac=this[_0x3d196e(0x426)]()||0x1;const _0x3c669e=Math[_0x3d196e(0x1c4)](0x1,_0x194d09,_0x5546ac);_0x5b659d=_0x1d6bb8/_0x3c669e;}_0x5b659d*=_0x21e9f1,_0x5b659d!==0x1&&(this[_0x3d196e(0x13e)]['bitmap']['smooth']=!![]),_0x3823d3['scale']['x']=_0x5b659d,_0x3823d3['scale']['y']=_0x5b659d,this[_0x3d196e(0xf1)]=!![],this[_0x3d196e(0x437)]();},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x525)]=function(){const _0x129c68=this['_attachPictureSprite'];if(!_0x129c68)return 0x0;return _0x129c68['bitmap']['width'];},Sprite_Character[_0xe91ae0(0x36f)][_0xe91ae0(0x426)]=function(){const _0x37f773=_0xe91ae0,_0x15ece9=this[_0x37f773(0x13e)];if(!_0x15ece9)return 0x0;return _0x15ece9['bitmap'][_0x37f773(0x578)];},VisuMZ['EventsMoveCore'][_0xe91ae0(0x330)]=Sprite_Balloon['prototype'][_0xe91ae0(0x15b)],Sprite_Balloon[_0xe91ae0(0x36f)][_0xe91ae0(0x15b)]=function(_0x492421,_0x3201b9){const _0x4f6f63=_0xe91ae0;VisuMZ[_0x4f6f63(0x24e)][_0x4f6f63(0x330)]['call'](this,_0x492421,_0x3201b9),VisuMZ[_0x4f6f63(0x24e)][_0x4f6f63(0x477)][_0x4f6f63(0x298)]['AutoBalloon']&&this[_0x4f6f63(0x3f8)][_0x4f6f63(0x37c)][_0x4f6f63(0x3f1)](_0x3201b9,this[_0x4f6f63(0x4b7)]);},VisuMZ['EventsMoveCore'][_0xe91ae0(0x4cd)]=Sprite_Balloon['prototype']['updatePosition'],Sprite_Balloon[_0xe91ae0(0x36f)][_0xe91ae0(0x288)]=function(){const _0x246016=_0xe91ae0;VisuMZ[_0x246016(0x24e)][_0x246016(0x4cd)][_0x246016(0x24f)](this),this[_0x246016(0x406)]();},Sprite_Balloon[_0xe91ae0(0x36f)][_0xe91ae0(0x406)]=function(){const _0x17284f=_0xe91ae0;this[_0x17284f(0x3f8)]['_character']['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x17284f(0x24e)][_0x17284f(0x477)][_0x17284f(0x298)][_0x17284f(0x129)],this['y']+=VisuMZ[_0x17284f(0x24e)][_0x17284f(0x477)][_0x17284f(0x298)][_0x17284f(0x514)]);},Sprite_Timer[_0xe91ae0(0x36f)]['createBitmap']=function(){const _0x2b1cd9=_0xe91ae0;this['bitmap']=new Bitmap(Math[_0x2b1cd9(0x583)](Graphics[_0x2b1cd9(0x440)]/0x2),0x30),this[_0x2b1cd9(0x14c)][_0x2b1cd9(0x1c6)]=this[_0x2b1cd9(0x1c6)](),this[_0x2b1cd9(0x14c)]['fontSize']=this['fontSize'](),this[_0x2b1cd9(0x14c)][_0x2b1cd9(0x51c)]=ColorManager['outlineColor']();},Sprite_Timer['prototype'][_0xe91ae0(0xca)]=function(){const _0x555a3a=_0xe91ae0,_0x289786=Math[_0x555a3a(0x549)](this[_0x555a3a(0x59b)]/0x3c/0x3c),_0x555bbe=Math[_0x555a3a(0x549)](this[_0x555a3a(0x59b)]/0x3c)%0x3c,_0x1426d2=this[_0x555a3a(0x59b)]%0x3c;let _0x276860=_0x555bbe['padZero'](0x2)+':'+_0x1426d2['padZero'](0x2);if(_0x289786>0x0)_0x276860='%1:%2'[_0x555a3a(0x54a)](_0x289786,_0x276860);return _0x276860;};function Sprite_EventLabel(){const _0x23d0a2=_0xe91ae0;this[_0x23d0a2(0x2f0)](...arguments);}Sprite_EventLabel['prototype']=Object[_0xe91ae0(0x29d)](Sprite[_0xe91ae0(0x36f)]),Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0xf3)]=Sprite_EventLabel,Sprite_EventLabel['prototype']['initialize']=function(_0x83cdf3){const _0x172d0d=_0xe91ae0;this[_0x172d0d(0x1d6)]=_0x83cdf3,Sprite['prototype'][_0x172d0d(0x2f0)][_0x172d0d(0x24f)](this),this[_0x172d0d(0x3da)](),this[_0x172d0d(0x52c)]();},Sprite_EventLabel['prototype']['initMembers']=function(){this['anchor']['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x52c)]=function(){const _0x463afb=_0xe91ae0,_0x46cb40=new Rectangle(0x0,0x0,0x1,0x1);this[_0x463afb(0x295)]=new Window_Base(_0x46cb40),this[_0x463afb(0x295)][_0x463afb(0x156)]=0x0,this[_0x463afb(0x282)]=this[_0x463afb(0x4cc)]()?0xff:0x0;},Sprite_EventLabel['prototype'][_0xe91ae0(0x464)]=function(){const _0x515c6b=_0xe91ae0;Sprite[_0x515c6b(0x36f)][_0x515c6b(0x464)][_0x515c6b(0x24f)](this),this[_0x515c6b(0x236)](),this[_0x515c6b(0x509)](),this[_0x515c6b(0x288)](),this['updateOpacity'](),this['updateHueShift']();},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x236)]=function(){const _0x2ce8a5=_0xe91ae0;this['_event'][_0x2ce8a5(0x13c)]()!==this[_0x2ce8a5(0x45e)]&&(this[_0x2ce8a5(0x45e)]=this[_0x2ce8a5(0x1d6)][_0x2ce8a5(0x13c)](),this[_0x2ce8a5(0xe8)]());},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0xe8)]=function(){const _0x5859e3=_0xe91ae0;if(!this[_0x5859e3(0x295)])return;this[_0x5859e3(0x36c)](),this[_0x5859e3(0x40e)]();},Sprite_EventLabel['prototype'][_0xe91ae0(0x36c)]=function(){const _0x4d7b26=_0xe91ae0,_0x114984=this[_0x4d7b26(0x295)][_0x4d7b26(0x302)](this[_0x4d7b26(0x45e)]),_0x1bb7ea=this[_0x4d7b26(0x295)][_0x4d7b26(0x11f)](),_0x12cda7=_0x114984[_0x4d7b26(0x1dc)]+_0x1bb7ea*0x2,_0x1405ea=_0x114984[_0x4d7b26(0x578)];this['_proxyWindow'][_0x4d7b26(0x599)](0x0,0x0,_0x12cda7,_0x1405ea),this[_0x4d7b26(0x295)][_0x4d7b26(0x163)](),this[_0x4d7b26(0x14c)]=this[_0x4d7b26(0x295)][_0x4d7b26(0x390)];},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x40e)]=function(){const _0x15795d=_0xe91ae0,_0x3bde82=this['_proxyWindow']['itemPadding']();this['_proxyWindow']['drawTextEx'](this[_0x15795d(0x45e)],_0x3bde82,0x0);},Sprite_EventLabel['prototype'][_0xe91ae0(0x509)]=function(){const _0x57cda6=_0xe91ae0,_0x4fcda6=VisuMZ[_0x57cda6(0x24e)][_0x57cda6(0x477)][_0x57cda6(0x3cf)]['FontSize'],_0x249e49=$gameSystem[_0x57cda6(0x4fd)]()||0x1;this[_0x57cda6(0x466)]['x']=this[_0x57cda6(0x466)]['y']=_0x4fcda6/_0x249e49;},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x288)]=function(){const _0x38698c=_0xe91ae0;if(!SceneManager[_0x38698c(0xf5)])return;if(!SceneManager[_0x38698c(0xf5)][_0x38698c(0x39f)])return;const _0x14b26e=SceneManager[_0x38698c(0xf5)]['_spriteset'][_0x38698c(0x4ad)](this[_0x38698c(0x1d6)]);if(!_0x14b26e)return;this['x']=this['_event'][_0x38698c(0x1f8)](),this['x']+=this['_event'][_0x38698c(0x198)]['offsetX'];if(_0x14b26e[_0x38698c(0x42d)]){const _0x4dd731=_0x14b26e[_0x38698c(0x13e)];this['y']=this[_0x38698c(0x1d6)][_0x38698c(0x528)]()-_0x4dd731['height']*_0x4dd731[_0x38698c(0x466)]['y'];}else this['y']=this['_event']['screenY']()-_0x14b26e[_0x38698c(0x578)]*_0x14b26e[_0x38698c(0x466)]['y'];this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this['_event'][_0x38698c(0x198)]['offsetY'];},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x492)]=function(){const _0x2ba808=_0xe91ae0;if(this['isLabelVisible']())this['opacity']+=this['opacitySpeed']();else SceneManager[_0x2ba808(0xf5)][_0x2ba808(0x1cb)]>0x0?this[_0x2ba808(0x282)]=0x0:this[_0x2ba808(0x282)]-=this[_0x2ba808(0x48b)]();},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x465)]=function(){const _0xfc12ad=_0xe91ae0;if(this[_0xfc12ad(0x4cc)]()&&this[_0xfc12ad(0x1d6)]&&this['_event']['_labelWindow']['hueShift']){const _0x36787d=this[_0xfc12ad(0x1e3)]+(this[_0xfc12ad(0x1d6)][_0xfc12ad(0x198)][_0xfc12ad(0x420)]||0x0);this[_0xfc12ad(0x25f)](_0x36787d);}},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x4cc)]=function(){const _0x105b2e=_0xe91ae0;if(!$gameSystem[_0x105b2e(0x5af)]())return![];if(this['_event']?.[_0x105b2e(0x202)])return![];if(this['_event']&&this[_0x105b2e(0x1d6)]['_pageIndex']<0x0)return![];if(SceneManager[_0x105b2e(0xf5)][_0x105b2e(0x1cb)]>0x0)return![];const _0x34138a=$gamePlayer['x'],_0x164954=$gamePlayer['y'],_0x53a62f=this[_0x105b2e(0x1d6)]['x'],_0x5da2e8=this[_0x105b2e(0x1d6)]['y'];if(this['_visiblePlayerX']===_0x34138a&&this[_0x105b2e(0x165)]===_0x164954&&this[_0x105b2e(0x48c)]===_0x53a62f&&this[_0x105b2e(0x38e)]===_0x5da2e8)return this[_0x105b2e(0x305)];this[_0x105b2e(0x55a)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x105b2e(0x48c)]=this[_0x105b2e(0x1d6)]['x'],this[_0x105b2e(0x38e)]=this['_event']['y'];if(!VisuMZ[_0x105b2e(0x24e)][_0x105b2e(0x166)](this[_0x105b2e(0x1d6)]))return this[_0x105b2e(0x305)]=![],![];return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x48b)]=function(){const _0x3daa21=_0xe91ae0;return VisuMZ[_0x3daa21(0x24e)]['Settings']['Label'][_0x3daa21(0x400)];};function Sprite_VisuMz_MessagePopup(){const _0x560f0c=_0xe91ae0;this[_0x560f0c(0x2f0)](...arguments);}Sprite_VisuMz_MessagePopup['prototype']=Object[_0xe91ae0(0x29d)](Sprite['prototype']),Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0xf3)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)]['initialize']=function(_0x452b04){const _0x5c2511=_0xe91ae0;this[_0x5c2511(0x2b0)]=_0x452b04,Sprite['prototype']['initialize'][_0x5c2511(0x24f)](this),this['initMembers'](),this[_0x5c2511(0x517)](),this[_0x5c2511(0x39d)](),this[_0x5c2511(0x464)]();},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)]['initMembers']=function(){const _0x5a1bfe=_0xe91ae0;this[_0x5a1bfe(0x4b7)]=this['_settings'][_0x5a1bfe(0x110)],this[_0x5a1bfe(0x2b8)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x110)],this['z']=0x6,this['_fadeInDuration']=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x289)][_0x5a1bfe(0x3cd)],this[_0x5a1bfe(0x5a1)]>0x0&&this[_0x5a1bfe(0x5a1)]>=Math['floor'](this[_0x5a1bfe(0x4b7)]*0.48)&&(this['_fadeInDuration']=Math['floor'](this[_0x5a1bfe(0x4b7)]*0.48)),this[_0x5a1bfe(0x282)]=this[_0x5a1bfe(0x5a1)]>0x0?0x0:0xff,this[_0x5a1bfe(0x410)]=this['_settings'][_0x5a1bfe(0x289)]['fadeOut'],this[_0x5a1bfe(0x410)]>0x0&&this[_0x5a1bfe(0x410)]>=Math[_0x5a1bfe(0x549)](this[_0x5a1bfe(0x4b7)]*0.48)&&(this[_0x5a1bfe(0x410)]=Math['floor'](this[_0x5a1bfe(0x4b7)]*0.48)),this[_0x5a1bfe(0x369)]=this[_0x5a1bfe(0x410)],this[_0x5a1bfe(0x1af)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x42f)]['x'],this[_0x5a1bfe(0x3a6)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x42f)]['y'],this[_0x5a1bfe(0x1d2)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0xd3)]['x'],this['_targetY']=this['_settings'][_0x5a1bfe(0xd3)]['y'],this[_0x5a1bfe(0x362)]=this[_0x5a1bfe(0x1af)],this['_offsetY']=this['_startY'],this[_0x5a1bfe(0x239)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x311)]['x'],this[_0x5a1bfe(0x1ec)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x311)]['y'],this[_0x5a1bfe(0x4bf)]=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x266)]['x'],this['_targetScaleY']=this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x266)]['y'],this[_0x5a1bfe(0xf6)]=-this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0x179)][_0x5a1bfe(0x4c4)],this[_0x5a1bfe(0x278)]=-this[_0x5a1bfe(0x2b0)]['angle'][_0x5a1bfe(0x181)],this[_0x5a1bfe(0xcf)]=-this[_0x5a1bfe(0x2b0)][_0x5a1bfe(0xec)][_0x5a1bfe(0x2ec)],this[_0x5a1bfe(0x3c0)]=0x0;},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x517)]=function(){const _0x3ec4eb=_0xe91ae0,_0x10d2f=this[_0x3ec4eb(0x2b0)],_0x4c3a20=new Rectangle(0x0,0x0,Graphics[_0x3ec4eb(0x1dc)],Graphics[_0x3ec4eb(0x578)]);this['_dummyWindow']=new Window_Base(_0x4c3a20);const _0x13ba46=this['_dummyWindow'][_0x3ec4eb(0x302)](_0x10d2f[_0x3ec4eb(0x137)]),_0x385ece=_0x13ba46[_0x3ec4eb(0x1dc)],_0x128694=_0x13ba46['height'],_0x3506aa=_0x385ece+$gameSystem[_0x3ec4eb(0x154)]()*0x2,_0x16f04b=_0x128694+$gameSystem['windowPadding']()*0x2;this[_0x3ec4eb(0x4d8)][_0x3ec4eb(0x599)](0x0,0x0,_0x3506aa,_0x16f04b),this[_0x3ec4eb(0x4d8)][_0x3ec4eb(0x163)](),this[_0x3ec4eb(0x4d8)][_0x3ec4eb(0x1bf)](_0x10d2f[_0x3ec4eb(0x137)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x39d)]=function(){const _0x2a9bb5=_0xe91ae0;this['_textSprite']=new Sprite(),this[_0x2a9bb5(0x368)]['bitmap']=this[_0x2a9bb5(0x4d8)]['contents'],this['_textSprite']['anchor']['x']=0.5,this['_textSprite']['anchor']['y']=0.5,this['_textSprite']['x']=this[_0x2a9bb5(0x1af)],this[_0x2a9bb5(0x368)]['y']=this['_startY'],this[_0x2a9bb5(0x368)][_0x2a9bb5(0x466)]['x']=this[_0x2a9bb5(0x239)],this[_0x2a9bb5(0x368)]['scale']['y']=this[_0x2a9bb5(0x1ec)],this[_0x2a9bb5(0x368)]['angle']=this[_0x2a9bb5(0xf6)],this[_0x2a9bb5(0x3dc)](this[_0x2a9bb5(0x368)]);},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x464)]=function(){const _0x5caf4c=_0xe91ae0;Sprite['prototype'][_0x5caf4c(0x464)][_0x5caf4c(0x24f)](this);if(!this[_0x5caf4c(0x359)]())return;this[_0x5caf4c(0x3ae)](),this[_0x5caf4c(0x191)](),this[_0x5caf4c(0x18b)](),this['updateTextAngle'](),this[_0x5caf4c(0x492)](),this['updateDuration']();},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x359)]=function(){const _0x191dd8=_0xe91ae0;return!!this[_0x191dd8(0x368)];},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x3ae)]=function(){const _0x50e892=_0xe91ae0,_0x4289d7=this[_0x50e892(0x2b0)];{const _0x3d9ff6=$gameMap[_0x50e892(0x46b)](),_0x586e82=_0x4289d7[_0x50e892(0x3e4)]['x'],_0x24e8bc=$gameMap[_0x50e892(0x2ad)](_0x586e82);this['x']=Math[_0x50e892(0x549)](_0x24e8bc*_0x3d9ff6+_0x3d9ff6/0x2);}{const _0x4a5760=$gameMap['tileHeight'](),_0x2b644d=_0x4289d7[_0x50e892(0x3e4)]['y'],_0x1df73b=$gameMap[_0x50e892(0x1a9)](_0x2b644d);this['y']=Math[_0x50e892(0x549)](_0x1df73b*_0x4a5760+_0x4a5760);}},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x191)]=function(){const _0x473f5b=_0xe91ae0;if(this['_duration']<=0x0)return;const _0x3c198e=this[_0x473f5b(0x4b7)],_0x5aa60d=this[_0x473f5b(0x2b8)];{this[_0x473f5b(0x362)]=(this[_0x473f5b(0x362)]*(_0x3c198e-0x1)+this[_0x473f5b(0x1d2)])/_0x3c198e,this[_0x473f5b(0x504)]=(this[_0x473f5b(0x504)]*(_0x3c198e-0x1)+this['_targetY'])/_0x3c198e;}{const _0x19c217=_0x5aa60d-_0x3c198e,_0x66bac1=_0x5aa60d/0x2,_0x15e922=this[_0x473f5b(0xcf)],_0x3acb17=-_0x15e922/Math[_0x473f5b(0x132)](_0x66bac1,0x2);this[_0x473f5b(0x3c0)]=_0x3acb17*Math[_0x473f5b(0x132)](_0x19c217-_0x66bac1,0x2)+_0x15e922;}this[_0x473f5b(0x368)]['x']=this[_0x473f5b(0x362)],this[_0x473f5b(0x368)]['y']=this['_offsetY']+this[_0x473f5b(0x3c0)];},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x18b)]=function(){const _0x34dc3e=_0xe91ae0;if(this[_0x34dc3e(0x4b7)]<=0x0)return;const _0xdae8cf=this[_0x34dc3e(0x4b7)];this['_textSprite'][_0x34dc3e(0x466)]['x']=(this['_textSprite'][_0x34dc3e(0x466)]['x']*(_0xdae8cf-0x1)+this[_0x34dc3e(0x4bf)])/_0xdae8cf,this[_0x34dc3e(0x368)]['scale']['y']=(this[_0x34dc3e(0x368)][_0x34dc3e(0x466)]['y']*(_0xdae8cf-0x1)+this[_0x34dc3e(0x51f)])/_0xdae8cf;},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x53b)]=function(){const _0x2cb2ef=_0xe91ae0;if(this[_0x2cb2ef(0x4b7)]<=0x0)return;const _0x176860=this[_0x2cb2ef(0x4b7)];this[_0x2cb2ef(0x368)][_0x2cb2ef(0x179)]=(this[_0x2cb2ef(0x368)][_0x2cb2ef(0x179)]*(_0x176860-0x1)+this[_0x2cb2ef(0x278)])/_0x176860;},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x492)]=function(){const _0x1d92fc=_0xe91ae0;this[_0x1d92fc(0x4d9)](),this[_0x1d92fc(0x212)]();},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x4d9)]=function(){const _0x4b4008=_0xe91ae0;if(this['_fadeInDuration']<=0x0)return;const _0x38b42f=this[_0x4b4008(0x5a1)];this[_0x4b4008(0x282)]=(this['opacity']*(_0x38b42f-0x1)+0xff)/_0x38b42f,this[_0x4b4008(0x5a1)]--,this['_fadeInDuration']<=0x0&&(this['opacity']=0xff);},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x212)]=function(){const _0x2204bb=_0xe91ae0;if(this[_0x2204bb(0x410)]<=0x0)return;if(this[_0x2204bb(0x4b7)]>this[_0x2204bb(0x369)])return;const _0x24b051=this['_fadeOutDuration'];this[_0x2204bb(0x282)]=(this[_0x2204bb(0x282)]*(_0x24b051-0x1)+0x0)/_0x24b051,this[_0x2204bb(0x410)]--,this[_0x2204bb(0x410)]<=0x0&&(this[_0x2204bb(0x282)]=0x0);},Sprite_VisuMz_MessagePopup[_0xe91ae0(0x36f)][_0xe91ae0(0x4e2)]=function(){const _0xae5f3d=_0xe91ae0;if(this['_duration']<=0x0)return;this['_duration']--;if(this['_duration']<=0x0){if(this[_0xae5f3d(0x17d)])this[_0xae5f3d(0x17d)][_0xae5f3d(0x4cf)](this);this[_0xae5f3d(0x368)][_0xae5f3d(0x14c)]&&this['_textSprite']['bitmap'][_0xae5f3d(0x4a3)]();}},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x243)]=Spriteset_Map[_0xe91ae0(0x36f)]['createLowerLayer'],Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x290)]=function(){const _0x3475c1=_0xe91ae0;VisuMZ[_0x3475c1(0x24e)][_0x3475c1(0x243)][_0x3475c1(0x24f)](this),this[_0x3475c1(0x4f6)]();},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x51a)]=Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x281)],Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x281)]=function(){const _0x22867b=_0xe91ae0;VisuMZ[_0x22867b(0x24e)]['Spriteset_Map_createShadow'][_0x22867b(0x24f)](this),this['createShadows']();},Spriteset_Map[_0xe91ae0(0x36f)]['createShadows']=function(){const _0x3e9dd8=_0xe91ae0;if(!VisuMZ[_0x3e9dd8(0x24e)]['Settings']['Movement']['ShowShadows'])return;for(const _0x155300 of this['_characterSprites']){this['createCharacterShadow'](_0x155300);}},Spriteset_Map[_0xe91ae0(0x36f)]['createCharacterShadow']=function(_0x6ae51b){const _0x4e0878=_0xe91ae0;_0x6ae51b[_0x4e0878(0x26d)]=new Sprite(),_0x6ae51b[_0x4e0878(0x26d)][_0x4e0878(0x49a)]=_0x6ae51b[_0x4e0878(0x37c)]['shadowFilename'](),_0x6ae51b[_0x4e0878(0x26d)][_0x4e0878(0x14c)]=ImageManager[_0x4e0878(0x19f)](_0x6ae51b[_0x4e0878(0x26d)]['_filename']),_0x6ae51b['_shadowSprite'][_0x4e0878(0x144)]['x']=0.5,_0x6ae51b[_0x4e0878(0x26d)][_0x4e0878(0x144)]['y']=0x1;const _0x1ae873=VisuMZ['EventsMoveCore'][_0x4e0878(0x477)]['Movement'][_0x4e0878(0x10b)]??0.5;_0x6ae51b[_0x4e0878(0x26d)]['z']=_0x1ae873,this['_tilemap'][_0x4e0878(0x3dc)](_0x6ae51b[_0x4e0878(0x26d)]);},Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x4a1)]=function(){const _0x2c1f35=_0xe91ae0;if(!VisuMZ['EventsMoveCore']['Settings']['Movement']['ShowShadows'])return;for(const _0x28cfd1 of this[_0x2c1f35(0x2fe)]){this[_0x2c1f35(0x29a)][_0x2c1f35(0x4cf)](_0x28cfd1[_0x2c1f35(0x26d)]);}},Spriteset_Map['prototype'][_0xe91ae0(0x4f6)]=function(){const _0x375806=_0xe91ae0;this['_labelWindows']=[];for(const _0x76a407 of $gameMap['events']()){this[_0x375806(0x4a8)](_0x76a407);}},Spriteset_Map[_0xe91ae0(0x115)]=VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x477)]['Label']['MobileEnabled']??!![],Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x4a8)]=function(_0x51c6c8){const _0x1391d8=_0xe91ae0;if(!this[_0x1391d8(0x50a)](_0x51c6c8))return;if(Utils[_0x1391d8(0x1f0)]()){if(!Spriteset_Map[_0x1391d8(0x115)])return;}let _0x3a9883;const _0x212b01=VisuMZ[_0x1391d8(0x24e)]['Settings'][_0x1391d8(0x3cf)][_0x1391d8(0x57c)]??!![];_0x3a9883=_0x212b01?new Sprite_EventLabel(_0x51c6c8):new Window_EventLabel(_0x51c6c8),_0x3a9883['z']=0x8,_0x3a9883['spriteId']=Sprite[_0x1391d8(0x462)]++,this[_0x1391d8(0x29a)]['addChild'](_0x3a9883),this[_0x1391d8(0xe1)][_0x1391d8(0x17a)](_0x3a9883);},Spriteset_Map[_0xe91ae0(0x36f)]['isTargetEventValidForLabelWindow']=function(_0x532cbe){const _0x241bab=_0xe91ae0,_0x14df5b=_0x532cbe[_0x241bab(0x130)]();if(_0x14df5b[_0x241bab(0x228)][_0x241bab(0x18c)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x14df5b[_0x241bab(0x228)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x246e09 of _0x14df5b[_0x241bab(0x572)]){let _0x1c7f27='';for(const _0x132308 of _0x246e09[_0x241bab(0x22b)]){[0x6c,0x198][_0x241bab(0x575)](_0x132308[_0x241bab(0x497)])&&(_0x1c7f27+=_0x132308['parameters'][0x0]);}if(_0x1c7f27[_0x241bab(0x18c)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1c7f27[_0x241bab(0x18c)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x519)]=function(_0x555579){const _0x3fd6ca=_0xe91ae0;this[_0x3fd6ca(0x2fe)]=this[_0x3fd6ca(0x2fe)]||[];const _0x5a8aa9=new Sprite_Character(_0x555579);this[_0x3fd6ca(0x2fe)][_0x3fd6ca(0x17a)](_0x5a8aa9),this[_0x3fd6ca(0x29a)][_0x3fd6ca(0x3dc)](_0x5a8aa9),this['createCharacterShadow'](_0x5a8aa9),this['createLabelWindowForTarget'](_0x555579),_0x5a8aa9[_0x3fd6ca(0x464)](),_0x555579['resetPattern'](),_0x5a8aa9[_0x3fd6ca(0x467)]();},Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x1e0)]=function(){const _0x5cbedb=_0xe91ae0;if(!this[_0x5cbedb(0xe1)])return;for(const _0x3465f5 of this[_0x5cbedb(0xe1)]){_0x3465f5&&(_0x3465f5[_0x5cbedb(0x55a)]=undefined,_0x3465f5[_0x5cbedb(0xe8)]());}},Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x2db)]=function(_0x4d944a,_0x4d9722){const _0x1dc52f=_0xe91ae0;if(!_0x4d944a)return;_0x4d9722[_0x1dc52f(0x3e4)]={'x':_0x4d944a['x'],'y':_0x4d944a['y']},this[_0x1dc52f(0x37e)](_0x4d9722);},Spriteset_Map[_0xe91ae0(0x36f)][_0xe91ae0(0x37e)]=function(_0x189b86){const _0xc9ab0e=_0xe91ae0;if(!this[_0xc9ab0e(0x29a)])return;const _0x1e166e=new Sprite_VisuMz_MessagePopup(_0x189b86);this['_tilemap'][_0xc9ab0e(0x3dc)](_0x1e166e);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0xc8)]=Game_Message['prototype'][_0xe91ae0(0x3b7)],Game_Message['prototype']['setNumberInput']=function(_0xfec039,_0x441519){const _0x175e26=_0xe91ae0;this[_0x175e26(0x30d)]=$gameTemp[_0x175e26(0x562)](),VisuMZ['EventsMoveCore'][_0x175e26(0xc8)][_0x175e26(0x24f)](this,_0xfec039,_0x441519);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1e8)]=Window_NumberInput[_0xe91ae0(0x36f)][_0xe91ae0(0x4c4)],Window_NumberInput['prototype'][_0xe91ae0(0x4c4)]=function(){const _0x199880=_0xe91ae0;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x199880(0x24e)][_0x199880(0x1e8)][_0x199880(0x24f)](this),$gameTemp[_0x199880(0x4da)]();},VisuMZ['EventsMoveCore'][_0xe91ae0(0x56c)]=Window_NumberInput[_0xe91ae0(0x36f)][_0xe91ae0(0x568)],Window_NumberInput[_0xe91ae0(0x36f)][_0xe91ae0(0x568)]=function(){const _0x1dbafd=_0xe91ae0;$gameTemp[_0x1dbafd(0x3ab)]($gameMessage[_0x1dbafd(0x30d)]),VisuMZ[_0x1dbafd(0x24e)]['Window_NumberInput_processOk']['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x1dbafd(0x30d)]=undefined;},VisuMZ['EventsMoveCore'][_0xe91ae0(0x1cc)]=Game_Message[_0xe91ae0(0x36f)]['setItemChoice'],Game_Message['prototype'][_0xe91ae0(0x204)]=function(_0x4ec2ac,_0x2e4914){const _0x49d845=_0xe91ae0;this[_0x49d845(0x27f)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x49d845(0x24e)]['Game_Message_setItemChoice'][_0x49d845(0x24f)](this,_0x4ec2ac,_0x2e4914);},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x1fd)]=Window_EventItem[_0xe91ae0(0x36f)]['onOk'],Window_EventItem[_0xe91ae0(0x36f)][_0xe91ae0(0x3c4)]=function(){const _0xee8469=_0xe91ae0;$gameTemp[_0xee8469(0x3ab)]($gameMessage[_0xee8469(0x27f)]),VisuMZ[_0xee8469(0x24e)][_0xee8469(0x1fd)][_0xee8469(0x24f)](this),$gameTemp[_0xee8469(0x4da)](),$gameMessage[_0xee8469(0x27f)]=undefined;},VisuMZ['EventsMoveCore']['Window_EventItem_onCancel']=Window_EventItem[_0xe91ae0(0x36f)][_0xe91ae0(0xe4)],Window_EventItem['prototype'][_0xe91ae0(0xe4)]=function(){const _0x5a8582=_0xe91ae0;$gameTemp[_0x5a8582(0x3ab)]($gameMessage[_0x5a8582(0x27f)]),VisuMZ[_0x5a8582(0x24e)][_0x5a8582(0x31c)][_0x5a8582(0x24f)](this),$gameTemp[_0x5a8582(0x4da)](),$gameMessage[_0x5a8582(0x27f)]=undefined;},VisuMZ[_0xe91ae0(0x24e)][_0xe91ae0(0x57b)]=Window_Message[_0xe91ae0(0x36f)][_0xe91ae0(0x300)],Window_Message[_0xe91ae0(0x36f)][_0xe91ae0(0x300)]=function(){const _0x3b4120=_0xe91ae0;$gameMessage[_0x3b4120(0x439)](),VisuMZ[_0x3b4120(0x24e)]['Window_Message_startMessage'][_0x3b4120(0x24f)](this),$gameTemp[_0x3b4120(0x4da)]();},VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']=Window_ScrollText['prototype'][_0xe91ae0(0x300)],Window_ScrollText[_0xe91ae0(0x36f)][_0xe91ae0(0x300)]=function(){const _0x2bb5e8=_0xe91ae0;$gameMessage[_0x2bb5e8(0x439)](),VisuMZ['EventsMoveCore'][_0x2bb5e8(0x1ed)][_0x2bb5e8(0x24f)](this),$gameTemp[_0x2bb5e8(0x4da)]();};function _0x36c0(_0x412293,_0x3e9462){const _0x38eb9c=_0x38eb();return _0x36c0=function(_0x36c032,_0x18ace9){_0x36c032=_0x36c032-0xc5;let _0x38e263=_0x38eb9c[_0x36c032];return _0x38e263;},_0x36c0(_0x412293,_0x3e9462);}function Window_EventLabel(){const _0x50f71e=_0xe91ae0;this[_0x50f71e(0x2f0)](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base[_0xe91ae0(0x36f)]),Window_EventLabel[_0xe91ae0(0x36f)]['constructor']=Window_EventLabel,Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x2f0)]=function(_0x4513b8){const _0x1ffdd7=_0xe91ae0;this[_0x1ffdd7(0x1d6)]=_0x4513b8;const _0x4d19b6=new Rectangle(0x0,0x0,Graphics[_0x1ffdd7(0x440)]/0x4,this[_0x1ffdd7(0x451)](0x1));this[_0x1ffdd7(0x3da)](),Window_Base[_0x1ffdd7(0x36f)]['initialize'][_0x1ffdd7(0x24f)](this,_0x4d19b6),this[_0x1ffdd7(0x494)]=0x0,this[_0x1ffdd7(0x3eb)](0x2),this['_text']='';},Window_EventLabel['prototype'][_0xe91ae0(0x3da)]=function(){const _0x4ac9dd=_0xe91ae0;this[_0x4ac9dd(0x2af)]=![],this['_screenZoomScale']=$gameScreen[_0x4ac9dd(0x5a0)](),this['_eventScreenX']=this[_0x4ac9dd(0x1d6)]['screenX'](),this['_eventScreenY']=this[_0x4ac9dd(0x1d6)][_0x4ac9dd(0x528)](),this[_0x4ac9dd(0x1ae)]=this[_0x4ac9dd(0x1d6)][_0x4ac9dd(0x198)][_0x4ac9dd(0x409)],this['_eventLabelOffsetY']=this[_0x4ac9dd(0x1d6)][_0x4ac9dd(0x198)][_0x4ac9dd(0x10d)],this[_0x4ac9dd(0x1fc)]=this[_0x4ac9dd(0x1d6)][_0x4ac9dd(0x4fa)],this[_0x4ac9dd(0x305)]=this[_0x4ac9dd(0x4cc)](),this[_0x4ac9dd(0x2d7)]=$gameSystem[_0x4ac9dd(0x5af)](),this[_0x4ac9dd(0x55a)]=$gamePlayer['x'],this[_0x4ac9dd(0x165)]=$gamePlayer['y'],this[_0x4ac9dd(0x48c)]=this[_0x4ac9dd(0x1d6)]['x'],this[_0x4ac9dd(0x38e)]=this[_0x4ac9dd(0x1d6)]['y'];},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x464)]=function(){const _0x36c785=_0xe91ae0;Window_Base[_0x36c785(0x36f)]['update'][_0x36c785(0x24f)](this);if(!this['needsUpdate']())return;this[_0x36c785(0x236)](),this[_0x36c785(0x509)](),this[_0x36c785(0x288)](),this['updateOpacity']();},Window_EventLabel['prototype']['needsUpdate']=function(){const _0x45266b=_0xe91ae0;if(!this['_event'])return![];if(!this[_0x45266b(0x1d6)][_0x45266b(0x198)])return![];if(this[_0x45266b(0x1fc)]!==this[_0x45266b(0x1d6)][_0x45266b(0x4fa)])return!![];if(this[_0x45266b(0x1d6)][_0x45266b(0x202)]&&!this['_eventErased'])return!![];if(this[_0x45266b(0x1d6)]['_labelWindow']['text']==='')return![];if(this[_0x45266b(0x4e3)]!==$gameScreen[_0x45266b(0x5a0)]())return!![];if(this['_eventScreenX']!==this['_event'][_0x45266b(0x1f8)]())return!![];if(this['_eventScreenY']!==this[_0x45266b(0x1d6)][_0x45266b(0x528)]())return!![];if(this[_0x45266b(0x1ae)]!==this[_0x45266b(0x1d6)][_0x45266b(0x198)][_0x45266b(0x409)])return!![];if(this[_0x45266b(0x22e)]!==this[_0x45266b(0x1d6)][_0x45266b(0x198)][_0x45266b(0x10d)])return!![];if(this[_0x45266b(0x55a)]!==$gamePlayer['x'])return!![];if(this[_0x45266b(0x165)]!==$gamePlayer['y'])return!![];if(this[_0x45266b(0x48c)]!==this[_0x45266b(0x1d6)]['x'])return!![];if(this[_0x45266b(0x38e)]!==this[_0x45266b(0x1d6)]['y'])return!![];if(this[_0x45266b(0x2d7)]!==$gameSystem[_0x45266b(0x5af)]())return!![];if(this[_0x45266b(0x305)]&&this[_0x45266b(0x494)]<0xff)return!![];if(!this[_0x45266b(0x305)]&&this[_0x45266b(0x494)]>0x0)return!![];if(SceneManager[_0x45266b(0xf5)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0xe91ae0(0x36f)]['updateText']=function(){const _0x143d89=_0xe91ae0;this[_0x143d89(0x1d6)][_0x143d89(0x13c)]()!==this[_0x143d89(0x45e)]&&(this['_text']=this['_event'][_0x143d89(0x13c)](),this[_0x143d89(0xe8)]());},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x509)]=function(){const _0x465240=_0xe91ae0;this[_0x465240(0x466)]['x']=0x1/$gameScreen['zoomScale'](),this[_0x465240(0x466)]['y']=0x1/$gameScreen[_0x465240(0x5a0)](),this[_0x465240(0x4e3)]=$gameScreen[_0x465240(0x5a0)]();},Window_EventLabel[_0xe91ae0(0x36f)]['updatePosition']=function(){const _0x48e540=_0xe91ae0;if(!SceneManager[_0x48e540(0xf5)])return;if(!SceneManager[_0x48e540(0xf5)][_0x48e540(0x39f)])return;const _0x300156=SceneManager[_0x48e540(0xf5)][_0x48e540(0x39f)]['findTargetSprite'](this[_0x48e540(0x1d6)]);if(!_0x300156)return;this['x']=Math['round'](this[_0x48e540(0x1d6)][_0x48e540(0x1f8)]()-Math[_0x48e540(0x549)](this[_0x48e540(0x1dc)]*this[_0x48e540(0x466)]['x']/0x2)),this['x']+=this[_0x48e540(0x1d6)][_0x48e540(0x198)]['offsetX'],this['y']=this[_0x48e540(0x1d6)][_0x48e540(0x528)]()-_0x300156['height'],this['y']+=Math[_0x48e540(0x583)]($gameSystem[_0x48e540(0x154)]()*0.5),this['y']-=Math[_0x48e540(0x583)](this[_0x48e540(0x578)]*this[_0x48e540(0x466)]['y']),this['y']+=this[_0x48e540(0x1d6)][_0x48e540(0x198)]['offsetY'],this[_0x48e540(0x2af)]=this['_event'][_0x48e540(0x202)],this[_0x48e540(0x491)]=this['_event'][_0x48e540(0x1f8)](),this['_eventScreenY']=this[_0x48e540(0x1d6)]['screenY'](),this[_0x48e540(0x1ae)]=this['_event']['_labelWindow'][_0x48e540(0x409)],this['_eventLabelOffsetY']=this['_event'][_0x48e540(0x198)][_0x48e540(0x10d)],this[_0x48e540(0x1fc)]=this[_0x48e540(0x1d6)]['_pageIndex'],this[_0x48e540(0x2af)]&&(this[_0x48e540(0x494)]=0x0);},Window_EventLabel[_0xe91ae0(0x36f)]['updateOpacity']=function(){const _0x3d6084=_0xe91ae0;if(this[_0x3d6084(0x4cc)]())this[_0x3d6084(0x494)]+=this['opacitySpeed']();else SceneManager[_0x3d6084(0xf5)][_0x3d6084(0x1cb)]>0x0?this[_0x3d6084(0x494)]=0x0:this[_0x3d6084(0x494)]-=this[_0x3d6084(0x48b)]();},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x56f4d5=_0xe91ae0;if(!$gameSystem[_0x56f4d5(0x5af)]())return![];if(this[_0x56f4d5(0x1d6)]?.[_0x56f4d5(0x202)])return![];if(SceneManager[_0x56f4d5(0xf5)][_0x56f4d5(0x1cb)]>0x0)return![];const _0x46b87f=$gamePlayer['x'],_0x1d58b4=$gamePlayer['y'],_0x54160c=this[_0x56f4d5(0x1d6)]['x'],_0x41272f=this[_0x56f4d5(0x1d6)]['y'];if(this['_visiblePlayerX']===_0x46b87f&&this[_0x56f4d5(0x165)]===_0x1d58b4&&this[_0x56f4d5(0x48c)]===_0x54160c&&this['_visibleEventY']===_0x41272f)return this[_0x56f4d5(0x305)];this[_0x56f4d5(0x55a)]=$gamePlayer['x'],this[_0x56f4d5(0x165)]=$gamePlayer['y'],this[_0x56f4d5(0x48c)]=this[_0x56f4d5(0x1d6)]['x'],this[_0x56f4d5(0x38e)]=this[_0x56f4d5(0x1d6)]['y'];if(!VisuMZ['EventsMoveCore'][_0x56f4d5(0x166)](this[_0x56f4d5(0x1d6)]))return this['_cacheVisibility']=![],![];return this[_0x56f4d5(0x305)]=!![],!![];},Window_EventLabel[_0xe91ae0(0x36f)]['opacitySpeed']=function(){const _0x2b114c=_0xe91ae0;return VisuMZ[_0x2b114c(0x24e)]['Settings'][_0x2b114c(0x3cf)][_0x2b114c(0x400)];},Window_EventLabel['prototype'][_0xe91ae0(0x36c)]=function(){const _0x1961eb=_0xe91ae0,_0x525cda=this[_0x1961eb(0x302)](this[_0x1961eb(0x45e)]);this[_0x1961eb(0x1dc)]=_0x525cda[_0x1961eb(0x1dc)]+($gameSystem['windowPadding']()+this[_0x1961eb(0x11f)]())*0x2,this[_0x1961eb(0x578)]=Math['max'](this['lineHeight'](),_0x525cda[_0x1961eb(0x578)])+$gameSystem['windowPadding']()*0x2,this[_0x1961eb(0x163)]();},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0xcd)]=function(){const _0x4e147b=_0xe91ae0;return VisuMZ[_0x4e147b(0x24e)][_0x4e147b(0x477)][_0x4e147b(0x3cf)][_0x4e147b(0x33b)];},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x41c)]=function(){const _0x405443=_0xe91ae0;Window_Base[_0x405443(0x36f)]['resetFontSettings'][_0x405443(0x24f)](this),this[_0x405443(0x390)][_0x405443(0x106)]=this['defaultFontSize']();},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x493)]=function(){const _0x5764a4=_0xe91ae0;return VisuMZ[_0x5764a4(0x24e)]['Settings'][_0x5764a4(0x3cf)][_0x5764a4(0x49f)];},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0xe8)]=function(){const _0x54a992=_0xe91ae0;this[_0x54a992(0x36c)](),this[_0x54a992(0x390)][_0x54a992(0xfe)]();const _0x191480=this['_text'][_0x54a992(0x1b7)](/[\r\n]+/);let _0x37816e=0x0;for(const _0x36cf3f of _0x191480){const _0x56373e=this[_0x54a992(0x302)](_0x36cf3f),_0x240066=Math[_0x54a992(0x549)]((this[_0x54a992(0x4ca)]-_0x56373e['width'])/0x2);this[_0x54a992(0x1bf)](_0x36cf3f,_0x240066,_0x37816e),_0x37816e+=_0x56373e[_0x54a992(0x578)];}},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0x27a)]=function(_0x5e990a,_0x57d8b5){const _0x4afda1=_0xe91ae0;_0x57d8b5['drawing']&&this['drawIcon'](_0x5e990a,_0x57d8b5['x']+0x2,_0x57d8b5['y']),_0x57d8b5['x']+=Math[_0x4afda1(0x259)](this['iconSize'](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0xe91ae0(0x36f)]['drawIcon']=function(_0x5acae6,_0x266f39,_0xb30a23){const _0xe1ba33=_0xe91ae0,_0x2b0b32=ImageManager[_0xe1ba33(0x19f)](_0xe1ba33(0x34a)),_0x49efdd=ImageManager[_0xe1ba33(0x27c)],_0x47bd33=ImageManager['iconHeight'],_0x1d1491=_0x5acae6%0x10*_0x49efdd,_0x40263a=Math[_0xe1ba33(0x549)](_0x5acae6/0x10)*_0x47bd33,_0x3a2fe2=Math['min'](this['iconSize']()),_0x3406da=Math['min'](this[_0xe1ba33(0xd2)]());this[_0xe1ba33(0x390)]['blt'](_0x2b0b32,_0x1d1491,_0x40263a,_0x49efdd,_0x47bd33,_0x266f39,_0xb30a23,_0x3a2fe2,_0x3406da);},Window_EventLabel[_0xe91ae0(0x36f)][_0xe91ae0(0xd2)]=function(){const _0x880e5e=_0xe91ae0;return VisuMZ[_0x880e5e(0x24e)][_0x880e5e(0x477)][_0x880e5e(0x3cf)]['IconSize'];};