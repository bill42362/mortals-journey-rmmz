//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.56;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.56] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * As of Message Core version 1.53, we've decided to add support for TSV.
 * 
 * This is because we have done our research and decided that CSV's are too
 * restricted to use due to their default nature of wanting to use commas as
 * separators. Thus, we've decided to switch to TSV where the default separator
 * is a tab space, something that is almost never used in RPG Maker text.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV/TSV file that will contain all of the text
 * used to translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV/TSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv/tsv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV/TSV ===
 * 
 * The Language CSV/TSV is structured as a normal CSV/TSV file would be, which
 * also means it can be modified in programs like Microsoft Excel or Google
 * Sheets. We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV/TSV file in programs like notepad
 * directly due to the way certain things like commas (,) and tabs are handled
 * and how easy it is to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV/TSV file via the spreadsheet editor (Excel or
 * Google Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV/TSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV/TSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "https://sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV/TSV file that was created in
 *     your game project's /data/ folder. You may need to select "All Files"
 *     for file type if uploading a TSV.
 * #4. For "Separator Type", if you are using CSV, change it to "Custom" and
 *     insert the Semicolon ";". Otherwise, if you are using TSV, select "tab"
 *     as your separator type.
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== How to Load the CSV/TSV in VS Code ===
 * 
 * #1. Go to "https://code.visualstudio.com/"
 * #2. Download and install it
 * #3. Open up VS Code and go to View > Extensions
 * #4. Search for an extension called "Edit CSV"
 * #5. Load the CSV/TSV file into VS Code and view with the CSV Editor
 * #6. Click the button that says "Edit CSV" in the upper right
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons (CSV Only) ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV/TSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV/TSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV/TSV and insert in a new key for that particular
 * database name. For example, the equip type "Accessory" will use "Accessory"
 * as the automatic key to look for a translated phrase. If there isn't any in
 * the CSV/TSV file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 * 
 * While these text codes are available globally, they are best suited for use
 * in the message window or any other window that does not change its contents.
 * The reason being is because the picture drawn is drawn into the background
 * of the window.
 * 
 * Therefore, we do not recommend using this in windows that change contents
 * often like Help Windows or Quest Descriptions. Instead, we recommend using
 * icons instead.
 * 
 * As of the version 1.53 update, the Help Window now supports both of these
 * text codes. However, we still recommend using icons over using pictures as
 * there will be loading delays.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index. *Note2*
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * Note2: This text code is used under the assumption that you are using an
 * existing face graphic to change from (doesn't matter which). The text code
 * will not automatically shift text from no-face graphic to having a face
 * graphic mid-message.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   File Type:
 *   - Which file type do you wish to use?
 *     - CSV (Legacy)
 *     - TSV (Recommended)
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 *   TSV Filename:
 *   - What is the filename of the TSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.56: June 15, 2026
 * * Feature Update!
 * ** Comments no longer break continuous Show Choices when making larger
 *    Show Choice lists. Update made by Irina.
 * 
 * Version 1.55: January 19, 2026
 * * Documentation Update!
 * ** \ChangeFace<x,y> text codegets a note added:
 * *** This text code is used under the assumption that you are using an
 *     existing face graphic to change from (doesn't matter which). The text
 *     code will not automatically shift text from no-face graphic to having a
 *     face graphic mid-message.
 * 
 * Version 1.54: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the text width of translated text was not taken into
 *    account. Fix made by Arisu
 * 
 * Version 1.53: February 20, 2025, 2025
 * * Bug Fixes!
 * ** Fixed an error with text language translations not working properly for
 *    the last listed language in the translation sheet. Fix made by Irina.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Text Language Information section included for TSV.
 * ** Updated text code note for \picture<x> and \CenterPicture<x>
 * *** As of the version 1.53 update, the Help Window now supports both of
 *     these text codes. However, we still recommend using icons over using
 *     pictures as there will be loading delays.
 * * Plugin Parameters
 * ** New plugin parameters added by Irina:
 * *** Parameters > Text Language Settings > File Type:
 * **** Which file type do you wish to use?
 * ***** CSV (Legacy)
 * ***** TSV (Recommended)
 * *** Parameters > Text Language Settings > TSV Filename
 * **** What is the filename of the TSV file to read from?
 * **** Located within the project's /data/ folder.
 * * Feature Updates!
 * ** We have done our research and decided that CSV's are too restricted to
 *    use due to their default nature of wanting to use commas as separators.
 *    Thus, we've decided to switch to TSV where the default separator is a tab
 *    space, something that is almost never used in RPG Maker text.
 * ** CSV support will remain as a legacy option but TSV will be recommended as
 *    the main text languaging switching filetype.
 * ** When creating a new Language TSV, the plugin will check if a Language CSV
 *    exists and asks you if you wish to convert the existing CSV to TSV. The
 *    original CSV file will remain intact as a backup.
 * 
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @parent Main
 * @type select
 * @option CSV (Legacy)
 * @value csv
 * @option TSV (Recommended)
 * @value tsv
 * @desc Which file type do you wish to use?
 * @default tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @parent Main
 * @desc What is the filename of the TSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.tsv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x1d4f35=_0x40bb;(function(_0x374cf5,_0x633113){const _0xc2dbb4=_0x40bb,_0x4132ee=_0x374cf5();while(!![]){try{const _0x11cbe9=-parseInt(_0xc2dbb4(0x313))/0x1+parseInt(_0xc2dbb4(0x186))/0x2*(parseInt(_0xc2dbb4(0x18e))/0x3)+-parseInt(_0xc2dbb4(0x50b))/0x4+parseInt(_0xc2dbb4(0x520))/0x5*(parseInt(_0xc2dbb4(0x3f7))/0x6)+parseInt(_0xc2dbb4(0x23e))/0x7*(parseInt(_0xc2dbb4(0x476))/0x8)+-parseInt(_0xc2dbb4(0x2ca))/0x9+-parseInt(_0xc2dbb4(0x3c9))/0xa*(-parseInt(_0xc2dbb4(0x4b1))/0xb);if(_0x11cbe9===_0x633113)break;else _0x4132ee['push'](_0x4132ee['shift']());}catch(_0x2dc7ce){_0x4132ee['push'](_0x4132ee['shift']());}}}(_0x358d,0xeb74f));function _0x358d(){const _0x15c75c=['autoPositionOffsetX','setChoiceListTextAlign','getSkillTypes','NameBoxWindowOffsetY','Enemies','resetPositionX','VisuMZ_3_ActSeqCamera','isWeapon','open\x20.\x5cdata','requestChoiceForegroundImage','onNewPageMessageCore','black','Game_Screen_clearPictures','type','drawCustomBackgroundColor','ParseWeaponNotetags','</B>','up\x20right','Undefined','addMessageCoreCommands','callOkHandler','refreshDimmerBitmap','PictureTextErase','prepareForcedPositionEscapeCharacters','createTextState','ConvertParams','ParseAddedText','iconIndex','Scene_Options_maxCommands','getChoiceListMaxRows','Window_Message_isTriggered','_lastAltCase','ว้าว','AddOption','makeData','item','Window_Options_changeVolume','startX','\x1bTEXTALIGNMENT','Greeting','_choiceCancelType','getColor','<COLORLOCK>','databaseObjectName','こんにちは','setChoiceListMaxRows','contentsBack','csv','addExtraShowChoices','paintOpacity','Game_Screen_erasePicture','reduce','updateNameBoxMove','Rows','LanguageImages','1135412oJTKOD','Press\x20OK\x20to\x20convert\x20to\x20TSV.\x0a','_cancelButton','drawItem','ConvertDefault','requestChoiceBackgroundImage','(((','getMessageWindowWidth','battleActionName','MsgWindowOffsetY','itemChoiceActor','Spanish','\x1bC[%1]%2\x1bPREVCOLOR[0]','_textCasing','setTextAlignment','Italian','MinWidth','CASING','startY','createTsvFile','width','5wbeomE','updateChoiceListHelpWindowPlacement','Hola','canMove','DefaultOutlineWidth','etypeId','mainModule','Key','SWITCHES','getPreservedFontSettings','Αντίο','apply','itemChoiceWtypeId','choiceMinWidth','format','round','resetFontSettings','addMessageCommonEvent','fallbackFonts','upper\x20right','synchronizeNameBox','isPlaytest','getCurrentLanguage','prepareAutoSizeEscapeCharacters','outLineColor','crisisColor','numVisibleRows','<CENTER>','WordWrap','registerCommand','upperright','_textDelayCount','Window_EventItem_includes','red','makeDeepCopy','#7cc576','constructor','_messageWindow','ChoiceWindowLineHeight','Window_Base_changeTextColor','isSceneBattle','ParseAllNotetags','pagedown','\x1bCOLORLOCK[1]','You\x20do\x20not\x20have\x20a\x20language\x20%1\x20set\x20up.\x0a','addChoiceDistance','includes','Au\x20revoir','CreateAutoColorFor','Window_Message_processEscapeCharacter','downleft','choiceListHelpWindowRect','OffsetY','getLanguageAt','adjustShowChoiceCancel','isAutoColorAffected','JSON','안녕하세요','ARRAYEVAL','Hallo','Viszontlátásra','call','ParseStateNotetags','EachMessageStart','String_format','MessageWindowXyOffsets','actor','textCodeResult','TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.','maxChoiceWidth','ParseClassNotetags','_pictureTextSprite','AddAutoColor','বিদায়','WAIT','processFailsafeChoice','%1\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','getMessageWindowXyOffsets','updateMove','loadGameFonts','Hejdå','processNewLine','Tot\x20ziens','colSpacing','applyMoveEasing','clearPictureTextRefresh','buffer','clearActorNameAutoColor','choice','fontSize','map\x20player','English','shift','cancel','_moveTargetY','midcenter','some','143194TFJaDW','processPyTextCode','lastGainedObjectIcon','<WORDWRAP>','MaxCols','maxCommands','CreateAutoColorRegExpListEntries','Uau','12YjvHVB','setText','Hello','createChoiceListWindow','CSV','right','setRelativePosition','getPictureTextData','send','_itemChoiceWtypeId','messageRows','হ্যালো','getMessageWindowRows','event','followers','createContents','<%1>','Japanese','remove','battle\x20enemy','CENTERPICTURE','</RIGHT>','drawTextEx','setWordWrap','process_VisuMZ_MessageCore_TextCodes_Replace','choiceDistance','maxFontSizeInLine','setWaitMode','Вау','makeFontSmaller','Game_Interpreter_setupChoices','max','calcMoveEasing','processDrawCenteredPicture','ChoiceWindowProperties','battle\x20actor','clear','ARRAYSTR','none','CreateAutoColorRegExpLists','VisuMZ_0_CoreEngine','initMessageCore','getPictureTextBuffer','_targets','partyMemberName','MessageCore','setBackground','Window_Base_processNewLine','prototype','updateOffsetPosition','SelectWeapon','Korean','Ουάου','_showFast','Game_System_initialize','clampPlacementPosition','isTriggered','setLastGainedItemData','needsNewPage','Hej','Thai','ArmorTypeID','false','outputWidth','choiceTextAlign','itemRectWithPadding','setChoiceListMinChoiceWidth','Window_Options_statusText','upcenter','requestPictureTextRefresh','convertHardcodedEscapeReplacements','Hűha','setChoiceListLineHeight','LineBreakSpace','flushTextState','_dimmerSprite','getStartingChoiceWidth','update','rtl','_resetRect','downcenter','makeCommandListShuffle','loadLocalization','_moveEasingType','Window_Message_needsNewPage','downright','convertButtonAssistText','lastGainedObjectQuantity','\x1bCASING[2]','_moveTargetWidth','attachPictureText','toUpperCase','_pictureTextWidth','_target','</WORDWRAP>','AutoColor','indexOf','isSkillHidden','EVAL','_list','match','Portuguese','registerActorNameAutoColorChanges','escapeStart','autoPositionOffsetY','Window_Base_processEscapeCharacter','prepareWordWrapEscapeCharacters','Window_Base_processControlCharacter','convertBackslashCharacters','Chinese(Traditional)','_MessageCoreSettings','obtainEscapeString','setPictureText','processWrapBreak','openLocalizationFolder','random','\x1bTEXTALIGNMENT[3]','adjustShowChoiceExtension','Window_Message_updatePlacement','OffsetX','add','NonSupportedTextCodes','upperleft','processDrawPicture','push','_pictures','drawPictureText','Romanian','drawPictureTextZone','SWITCH','#ffffff','isChoiceEnabled','tsv','General','#f26c4f','Bitmap_drawText','clearChoiceHelpDescriptions','clearCommandList','Window_Message_terminateMessage','applyData','powerDownColor','MessageWindow','pageup','VisuMZ_4_ExtraEnemyDrops','Norwegian','Game_Map_setupEvents','<RIGHT>','Farewell','down-center','choicePositionType','States','getTextAlignment','calcWindowHeight','_lastPluginCommandInterpreter','isVisuMzLocalizationEnabled','choiceAlignText','defaultColor','isItem','isClosing','lower-right','setLastPluginCommandInterpreter','MessageWidth','systemColor','VisuMZ_1_SkillsStatesCore','changeOutlineColor','start\x20.\x5cdata','DISABLE','visible','さようなら','outputHeight','updateEvents','CheckCompatibility','equipTypes','_pictureTextCache','_textAlignment','textSpeed','328867DTEMUC','HIDE','close','isChoiceWindow','onProcessCharacter','\x1bCASING[3]','onChoice','contents','updateHelp','refresh','processColorLock','isCommandEnabled','lowerleft','Game_Map_initialize','DefaultLocale','lowerright','processPxTextCode','returnPreservedFontSettings','ShuffleArray','hasPictureText','updateXyOffsets','_relativePosition','processCustomWait','midleft','ARRAYNUM','windowPadding','ParseEnemyNotetags','placeCancelButton','up\x20left','processCommonEvent','clamp','atypeId','lower-left','fontFace','changeChoiceBackgroundColor','setPositionType','setMessageWindowWidth','processFontChangeItalic','stringify','\x1bITALIC[1]','Γειά\x20σου','updatePlacement','isSkill','MsgWindowOffsetX','battleTargetName','boxHeight','Wah','<BR>','ChoiceWindowMinWidth','getPictureText','Items','getLocalizedText','Game_Party_initialize','Hindi','AutoColorRegExp','Window_Help_refresh','join','ChoiceWindowMaxCols','inBattle','VariableID','splice','command357','substr','setup','addGeneralOptions','changeTextSpeed','TextCodeActions','Sprite_Picture_updateBitmap','Game_Map_refresh','VisuMZ_1_EventsMoveCore','#ffc8e0','createChoiceListHelpWindow','setSkillChoice','_pictureTextWindow','resetRect','EquipTypeID','faceName','CustomFonts','updateDimensions','choices','lower\x20left','clearRect','eraseAllPictureTexts','length','value','addCommand','textSizeExTextAlignment','choiceRows','textLocale','crisis','filter','Actors','messageWordWrap','normalColor','isInputting','setWeaponChoice','bitmap','gainItem','convertNewPageTextStateMacros','updateAutoSizePosition','checkConvertCsvToTsv','isClosed','initTextAlignement','battle\x20party','erasePicture','hide','Arrivederci','isBreakShowTextCommands','scale','system','_choiceIndexArray','resetTextColor','zoomScale','NameBoxWindowDefaultColor','lastGainedObjectName','ParseItemNotetags','return\x20\x27','isRunning','currentCommand','Slovak','BOLD','text','Waouh','parseLocalizedText','Halo','ParseSkillNotetags','convertLockColorsEscapeCharacters','LangFiletype','addWindow','Window_ChoiceList','Window_NameBox_refresh','process_VisuMZ_MessageCore_AutoColor','SkillTypeID','wtypeId','Window_Base_processAllText','drawSkillCost','pink','isHelpWindowWordWrap','commandName','newPage','4161564bUEviD','_centerMessageWindow','prepareShowTextCommand','child_process','setupShuffleChoices','ImageManager_loadBitmap','convertShowChoiceEscapeCodes','loadDatabase','_commonEventId','Distance','isBusy','NameBoxWindowOffsetX','findTargetSprite','_textColorStack','helpWordWrap','prepareShowTextFollowups','MessageTextDelay','createLocalizationCsvFile','processTextCasing','open','Armors','setTextDelay','TextSpeed','itemBackColor1','uppercenter','addWrapBreakAfterPunctuation','LocalizationType','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','isColorLocked','loadCustomFontsMessageCore','actorSlotName','parameters','_itemChoiceVariableId','\x5c%1','choiceIndexArray','Game_Map_updateEvents','processPreviousColor','default','outlineWidth','textColor','FUNC','windowX','padding','Scene_Boot_loadGameFonts','makeSkillList','visuMzTextLocaleStatusText','min','getChoiceIndent','path','Chinese(Simplified)','processEscapeCharacter','quantity','messagePositionReset','getInputButtonString','setupChoices','convertMessageCoreEscapeActions','startWait','Bitmap_measureTextWidth','getChoiceListTextAlign','preemptive','convertButtonAssistEscapeCharacters','up-center','Dutch','messageCoreWindowX','Finnish','contentsHeight','LanguageFonts','Default','blt','Languages.csv','Window_ChoiceList_updatePlacement','callCancelHandler','drawing','1553835WMVzUX','setSpeakerName','middlecenter','makeCommandListScriptCall','_helpWindow','addMessageCoreTextSpeedCommand','StretchDimmedBg','realPictureId','ParseLocalizationCsv','obtainExp','Languages','_autoSizeCheck','_pictureText','processStoredAutoColorChanges','left','list','</CENTER>','TextAlign','erasePictureTextBuffer','_index','getChoiceListLineHeight','_interpreter','वाह','isRTL','பிரியாவிடை','isOptionValid','getLanguageName','Szia','Adiós','launchMessageCommonEvent','Greek','yellow','WeaponTypeID','\x1bWrapJpBreak[0]','%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.','_pictureId','processAutoPosition','Instant','_lastGainedItemData','updateForcedPlacement','Wow','_autoPosRegExp','_textDelay','choiceLineHeight','_messageCommonEvents','clearAllPictureTexts','parse','_pictureTextHeight',')))','_pictureTextRefresh','armor','addChildAt','convertTextMacros','innerWidth','dimColor2','parseChoiceText','Tamil','MaxRows','isWordWrapEnabled','setupEvents','ALL','itemChoiceAtypeId','map\x20party','writeFileSync','ParseArmorNotetags','Hoşça\x20kal','_messageOffsetY','makeFontBigger','clearFlags','\x1bCASING[0]','#fbaf5d','anchor','%1\x20file\x20detected.\x0a','messageCoreTextSpeed','follower','Window_Command_addCommand','COMMONEVENT','\x1bWrapBreak[0]','Window_ChoiceList_callCancelHandler','#fff799','processTextAlignmentChange','_nameBoxWindow','preConvertEscapeCharacters','getLastGainedItemData','purple','Selamat\x20tinggal','Привет','onerror','_messageOffsetX','windowWidth','realignMapName','Game_Interpreter_PluginCommand','textSpeedStatusText','updateAutoPosition','obtainItem','Classes','_subject','Bonjour','UNDEFINED!','_currentAutoSize','adjustShowChoiceDefault','dirname','getLastPluginCommandInterpreter','upper-left','floor','_macroBypassWordWrap','\x1bI[%1]','status','processCharacter','ChoiceWindowMaxRows','itemChoiceEtypeId','unshift','getChoiceListMaxColumns','WORD_WRAP_PADDING','moveBy','exec','brown','grey','addLoadListener','isVolumeSymbol','ஆஹா','ceil','addedHeight','_autoColorActorNames','loadBitmap','terminateMessage','isChoiceVisible','Indonesian','map\x20actor','measureTextWidth','lower\x20center','_choiceHelpDescriptions','anyPictureTextChanges','changeVisuMzTextLocale','upper\x20center','नमस्ते','EachMessageEnd','filename','center','postConvertEscapeCharacters','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateOverlappingY','setMessageWindowRows','stretchDimmerSprite','SelectArmor','setHelpWindow','every','convertEscapeCharacters','GET','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SplitJpCnCharacters','onDatabaseLoaded','changeVolume','processControlCharacter','TextCodeReplace','convertVariableEscapeCharacters','WRAPBREAK','version','Match','easeIn','_pictureTextBuffer','TextStr','clearPictures','_moveTargetX','onload','responseText','down-left','convertCsvToTsvFile','\x1bTEXTALIGNMENT[0]','getConfigValue','NUM','updateTransform','Window_ItemList_drawItemNumber','processAutoSize','Ciao','TsvFilename','สวัสดี','isMessageWindowWordWrap','maxLines','_maxShuffleChoices','getRandomTextFromPool','command101','150JRZpfh','Press\x20Cancel\x20to\x20create\x20new\x20TSV.','choiceCols','updateMessageCommonEvents','_moveTargetHeight','CsvFilename','upper\x20left','<LINE\x20BREAK>','</I>','<LEFT>','surprise','drawBackCenteredPicture','loadMessageFace','processTextAlignmentX','Ahoj','Vau','actorName','Sprite_Picture_update','messageCoreLocalization','Window_Message_clearFlags','Polish','updateBitmap','fontBold','setMessageWindowWordWrap','currencyUnit','isContinuePrepareShowTextCommands','Swedish','_textCasingUpperState','substring','updatePictureText','_colorLock','AdjustRect','bind','faceWidth','drawText','prepareShowTextPluginCommandFollowups','SelectSkill','RelativePXPY','Window_ChoiceList_windowX','message','getChoiceListMinChoiceWidth','setColorLock','Bengali','Merhaba','slice','setHelpWindowWordWrap','7311966TOCUrD','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20%1\x20file?\x0a\x0a','index','TightWrap','Window_Message_synchronizeNameBox','LineHeight','textFont','gradientFillRect','_forcedPosition','messageWidth','description','FastForwardKey','_messagePositionReset','application/csv','textSizeExWordWrap','Game_System_mainFontFace','Bitmap_drawTextTopAligned','members','drawBackPicture','Enable','map','Sbohem','_choices','Hei','_indent','drawChoiceLocationImage','onLocalizationXhrLoad','onLocalizationXhrError','openness','skills','TextJS','midright','nextEventCode','Localization','Window_Base_update','ওহে','Window_NameBox_updatePlacement','refreshWithTextCodeSupport','_data','drawItemContents','DataManager_loadDatabase','ConfigManager_applyData','_moveDuration','ARRAYFUNC','AutoColorBypassList','selectDefault','SortObjectByKeyLength','_wordWrap','maxShuffleChoices','weapon','Type','loadPicture','_itemChoiceItypeId','show','resetWordWrap','Please\x20restart\x20the\x20game.','applyChoiceHelpDescriptions','setupItemChoice','mainFontFace','TextMacros','Settings','ConvertTextAutoColorRegExpFriendly','Window_MessageLog','centered','moveTo','FontSmallerCap','isSceneMap','boxWidth','Game_Party_gainItem','isArmor','createPictureText','battleUserName','processFsTextCode','Zbohom','textWidth','initialize','_textMacroFound','Cześć','commandSymbol','PictureTextChange','itemChoiceActorId','processAutoColorWords','PictureIDs','makeItemList','Russian','innerHeight','_autoSizeRegexp','overrideMimeType','powerUpColor','Olá','textSizeEx','makeCommandList','trim','registerResetRect','test','needsPictureTextRefresh','SHOW','Window_Message_newPage','itemPadding','levelUp','changeValue','STR','obtainEscapeParam','Window_Base_textSizeEx','_refreshPauseSign','itemChoiceStypeId','addContinuousShowTextCommands','drawTextTopAligned','itemBackColor2','isOpen','obtainGold','Weapons','convertChoiceMacros','lower-center','postFlushTextState','setChoiceMessageDistance','name','_wholeMoveDuration','<B>','white','_scene','height','upper-right','_itemChoiceStypeId','До\x20свидания','_itemChoiceEtypeId','convertBaseEscapeCharacters','88mhlnCp','Turkish','setArmorChoice','activate','startPause','registerSelfEvent','setupNumInput','advanced','enabled','Game_Message_setChoices','updateRelativePosition','itemChoiceItypeId','up\x20center','FontChangeValue','%1\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','_scriptCall','toLowerCase','[0]','Auf\x20Wiedersehen','drawBackground','exit','Scene_Message_createChoiceListWindow','convertFontSettingsEscapeCharacters','setMessageWindowXyOffsets','French','_autoPositionTarget','split','upleft','itemHeight','ARRAYSTRUCT','equipSlots','ITALIC','PICTURE','requestPictureTextRefreshAll','statusText','setChoices','violet','_itemChoiceActorId','Scene_Boot_onDatabaseLoaded','process_VisuMZ_MessageCore_TextMacros','switchOutTextForLocalization','displayName','convertTextAlignmentEscapeCharacters','victory','confirmConvertCsvToTsv','Czech','_eventId','map\x20event','start','\x1bCASING[5]','skill','processMessageCoreEscapeActions','_positionType','Window_Options_addGeneralOptions','replace','textSizeExRaw','안녕히\x20가세요','anchorPictureText','addMessageCoreLocalizationCommand','911295DKuxNX','\x1bITALIC[0]','#c69c6d','maxCols','textCodeCheck','code','convertMessageCoreEscapeReplacements','down','TextManager_message','setChoiceListMaxColumns','processAllText','FontBiggerCap','changeTextColor','resizePictureText','addedWidth','#a186be','getChoiceMessageDistance','fontItalic','lineHeight','processActorNameAutoColorChanges','\x1bCOLORLOCK[0]','preFlushTextState','messageWindowRect','itemRect','application/%1','ConfigManager_makeData','applyDatabaseAutoColor','sort','data/','processFontChangeBold','_choiceListHelpWindow','ลาก่อน','load','PictureTextRefresh','move'];_0x358d=function(){return _0x15c75c;};return _0x358d();}var label=_0x1d4f35(0x1bb),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x34aefa){const _0x41a7cf=_0x1d4f35;return _0x34aefa['status']&&_0x34aefa['description'][_0x41a7cf(0x54e)]('['+label+']');})[0x0];function _0x40bb(_0x9b386e,_0x433785){const _0x358d22=_0x358d();return _0x40bb=function(_0x40bbb1,_0x3b3df1){_0x40bbb1=_0x40bbb1-0x15b;let _0x466d00=_0x358d22[_0x40bbb1];return _0x466d00;},_0x40bb(_0x9b386e,_0x433785);}VisuMZ[label][_0x1d4f35(0x433)]=VisuMZ[label][_0x1d4f35(0x433)]||{},VisuMZ[_0x1d4f35(0x4ed)]=function(_0xc59420,_0x120d12){const _0x53ac9b=_0x1d4f35;for(const _0x2d8a21 in _0x120d12){if(_0x2d8a21[_0x53ac9b(0x1f2)](/(.*):(.*)/i)){const _0x455b0d=String(RegExp['$1']),_0x1811aa=String(RegExp['$2'])['toUpperCase']()[_0x53ac9b(0x453)]();let _0x27553a,_0x31afc5,_0x148490;switch(_0x1811aa){case _0x53ac9b(0x3bd):_0x27553a=_0x120d12[_0x2d8a21]!==''?Number(_0x120d12[_0x2d8a21]):0x0;break;case _0x53ac9b(0x256):_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON['parse'](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5['map'](_0x491e25=>Number(_0x491e25));break;case _0x53ac9b(0x1f0):_0x27553a=_0x120d12[_0x2d8a21]!==''?eval(_0x120d12[_0x2d8a21]):null;break;case _0x53ac9b(0x15f):_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON['parse'](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5[_0x53ac9b(0x40b)](_0x4be423=>eval(_0x4be423));break;case _0x53ac9b(0x15d):_0x27553a=_0x120d12[_0x2d8a21]!==''?JSON[_0x53ac9b(0x341)](_0x120d12[_0x2d8a21]):'';break;case'ARRAYJSON':_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON[_0x53ac9b(0x341)](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5[_0x53ac9b(0x40b)](_0x1bd37c=>JSON[_0x53ac9b(0x341)](_0x1bd37c));break;case _0x53ac9b(0x2f2):_0x27553a=_0x120d12[_0x2d8a21]!==''?new Function(JSON[_0x53ac9b(0x341)](_0x120d12[_0x2d8a21])):new Function('return\x200');break;case _0x53ac9b(0x422):_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON['parse'](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5[_0x53ac9b(0x40b)](_0x122ddb=>new Function(JSON[_0x53ac9b(0x341)](_0x122ddb)));break;case _0x53ac9b(0x45c):_0x27553a=_0x120d12[_0x2d8a21]!==''?String(_0x120d12[_0x2d8a21]):'';break;case _0x53ac9b(0x1b3):_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON['parse'](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5[_0x53ac9b(0x40b)](_0x35e78a=>String(_0x35e78a));break;case'STRUCT':_0x148490=_0x120d12[_0x2d8a21]!==''?JSON[_0x53ac9b(0x341)](_0x120d12[_0x2d8a21]):{},_0xc59420[_0x455b0d]={},VisuMZ[_0x53ac9b(0x4ed)](_0xc59420[_0x455b0d],_0x148490);continue;case _0x53ac9b(0x493):_0x31afc5=_0x120d12[_0x2d8a21]!==''?JSON[_0x53ac9b(0x341)](_0x120d12[_0x2d8a21]):[],_0x27553a=_0x31afc5[_0x53ac9b(0x40b)](_0x3d4de6=>VisuMZ[_0x53ac9b(0x4ed)]({},JSON[_0x53ac9b(0x341)](_0x3d4de6)));break;default:continue;}_0xc59420[_0x455b0d]=_0x27553a;}}return _0xc59420;},(_0x452f29=>{const _0x1c599b=_0x1d4f35,_0x2aec70=_0x452f29[_0x1c599b(0x46b)];for(const _0xcca9e9 of dependencies){if(!Imported[_0xcca9e9]){alert(_0x1c599b(0x39f)['format'](_0x2aec70,_0xcca9e9)),SceneManager[_0x1c599b(0x48a)]();break;}}const _0xd39a57=_0x452f29[_0x1c599b(0x401)];if(_0xd39a57[_0x1c599b(0x1f2)](/\[Version[ ](.*?)\]/i)){const _0x5b35a3=Number(RegExp['$1']);_0x5b35a3!==VisuMZ[label][_0x1c599b(0x3b0)]&&(alert(_0x1c599b(0x3a8)[_0x1c599b(0x52e)](_0x2aec70,_0x5b35a3)),SceneManager[_0x1c599b(0x48a)]());}if(_0xd39a57[_0x1c599b(0x1f2)](/\[Tier[ ](\d+)\]/i)){const _0x148d86=Number(RegExp['$1']);_0x148d86<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1c599b(0x52e)](_0x2aec70,_0x148d86,tier)),SceneManager[_0x1c599b(0x48a)]()):tier=Math[_0x1c599b(0x1ad)](_0x148d86,tier);}VisuMZ[_0x1c599b(0x4ed)](VisuMZ[label]['Settings'],_0x452f29[_0x1c599b(0x2e9)]);})(pluginData),PluginManager[_0x1d4f35(0x53d)](pluginData[_0x1d4f35(0x46b)],'ChoiceWindowDistance',_0x7cec75=>{const _0x3868d0=_0x1d4f35;VisuMZ[_0x3868d0(0x4ed)](_0x7cec75,_0x7cec75);const _0x55109d=Number(_0x7cec75[_0x3868d0(0x2d3)])||0x0;$gameSystem[_0x3868d0(0x46a)](_0x55109d);}),PluginManager['registerCommand'](pluginData['name'],_0x1d4f35(0x1b0),_0x2978e4=>{const _0x7dfd1a=_0x1d4f35;VisuMZ[_0x7dfd1a(0x4ed)](_0x2978e4,_0x2978e4);const _0x322c46=_0x2978e4[_0x7dfd1a(0x3fc)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x2cdadf=_0x2978e4[_0x7dfd1a(0x51b)]??0x60,_0x58a3f8=_0x2978e4[_0x7dfd1a(0x34c)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x580ff4=_0x2978e4[_0x7dfd1a(0x18a)]||$gameSystem[_0x7dfd1a(0x383)]()||0x1,_0x1b5e19=_0x2978e4[_0x7dfd1a(0x324)][_0x7dfd1a(0x486)]()||_0x7dfd1a(0x2ef);$gameSystem[_0x7dfd1a(0x1d6)](_0x322c46),$gameSystem[_0x7dfd1a(0x1d0)](_0x2cdadf),$gameSystem[_0x7dfd1a(0x501)](_0x58a3f8),$gameSystem[_0x7dfd1a(0x4ba)](_0x580ff4),$gameSystem['setChoiceListTextAlign'](_0x1b5e19);}),PluginManager[_0x1d4f35(0x53d)](pluginData['name'],'MessageWindowProperties',_0x47bdd0=>{const _0x1943b5=_0x1d4f35;VisuMZ[_0x1943b5(0x4ed)](_0x47bdd0,_0x47bdd0);const _0x50bf2d=_0x47bdd0[_0x1943b5(0x509)]||$gameSystem['getMessageWindowRows']()||0x1,_0x153725=_0x47bdd0['Width']||$gameSystem[_0x1943b5(0x512)]()||0x1;$gameTemp[_0x1943b5(0x2cb)]=!![];const _0x28fd9f=_0x47bdd0[_0x1943b5(0x53c)][_0x1943b5(0x486)]();$gameSystem[_0x1943b5(0x3a1)](_0x50bf2d),$gameSystem['setMessageWindowWidth'](_0x153725);['true',_0x1943b5(0x1cc)][_0x1943b5(0x54e)](_0x28fd9f)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x28fd9f));const _0x3921f7=SceneManager[_0x1943b5(0x46f)][_0x1943b5(0x545)];_0x3921f7&&(_0x3921f7[_0x1943b5(0x42d)](),_0x3921f7[_0x1943b5(0x28c)](),_0x3921f7[_0x1943b5(0x19d)]());}),PluginManager[_0x1d4f35(0x53d)](pluginData['name'],_0x1d4f35(0x166),_0x3ee3bd=>{const _0x3baee3=_0x1d4f35;VisuMZ[_0x3baee3(0x4ed)](_0x3ee3bd,_0x3ee3bd),$gameSystem[_0x3baee3(0x48d)](_0x3ee3bd[_0x3baee3(0x205)],_0x3ee3bd[_0x3baee3(0x554)]);const _0x1ba9e6=SceneManager[_0x3baee3(0x46f)]['_messageWindow'];_0x1ba9e6&&(_0x1ba9e6[_0x3baee3(0x42d)](),_0x1ba9e6['updateDimensions'](),_0x1ba9e6[_0x3baee3(0x19d)]());}),PluginManager[_0x1d4f35(0x53d)](pluginData['name'],_0x1d4f35(0x1c0),_0x6ebe19=>{const _0x5208bd=_0x1d4f35;VisuMZ[_0x5208bd(0x4ed)](_0x6ebe19,_0x6ebe19),$gameMessage['setWeaponChoice'](_0x6ebe19['VariableID']||0x0,_0x6ebe19['WeaponTypeID']||0x0);const _0x3f3a6d=$gameTemp['getLastPluginCommandInterpreter']();if(_0x3f3a6d)_0x3f3a6d[_0x5208bd(0x1a9)](_0x5208bd(0x3f0));}),PluginManager[_0x1d4f35(0x53d)](pluginData[_0x1d4f35(0x46b)],_0x1d4f35(0x3a3),_0x4dfefc=>{const _0x436002=_0x1d4f35;VisuMZ['ConvertParams'](_0x4dfefc,_0x4dfefc),$gameMessage[_0x436002(0x478)](_0x4dfefc[_0x436002(0x279)]||0x0,_0x4dfefc[_0x436002(0x1cb)]||0x0,_0x4dfefc[_0x436002(0x289)]||0x0);const _0x53328a=$gameTemp['getLastPluginCommandInterpreter']();if(_0x53328a)_0x53328a[_0x436002(0x1a9)](_0x436002(0x3f0));}),PluginManager[_0x1d4f35(0x53d)](pluginData[_0x1d4f35(0x46b)],_0x1d4f35(0x3ed),_0x5e18b6=>{const _0x3a114a=_0x1d4f35;VisuMZ[_0x3a114a(0x4ed)](_0x5e18b6,_0x5e18b6),$gameMessage[_0x3a114a(0x286)](_0x5e18b6[_0x3a114a(0x279)]||0x0,_0x5e18b6['ActorID']||0x0,_0x5e18b6['SkillTypeID']||0x0);const _0x2169d8=$gameTemp[_0x3a114a(0x379)]();if(_0x2169d8)_0x2169d8[_0x3a114a(0x1a9)]('message');}),PluginManager[_0x1d4f35(0x53d)](pluginData[_0x1d4f35(0x46b)],_0x1d4f35(0x446),_0x5b217c=>{const _0x505183=_0x1d4f35;VisuMZ[_0x505183(0x4ed)](_0x5b217c,_0x5b217c);const _0xb009ec=_0x5b217c[_0x505183(0x449)]||[],_0x5d4074=_0x5b217c['Padding']||0x0,_0x58d8f9=[_0x505183(0x208),'up',_0x505183(0x53e),_0x505183(0x321),_0x505183(0x39d),_0x505183(0x193),_0x505183(0x24a),_0x505183(0x4b8),'lowerright'];for(const _0x4b6133 of _0xb009ec){$gameScreen['setPictureTextBuffer'](_0x4b6133,_0x5d4074);for(const _0x3c57d6 of _0x58d8f9){if(_0x5b217c[_0x3c57d6]===undefined)continue;$gameScreen[_0x505183(0x1fe)](_0x4b6133,_0x5b217c[_0x3c57d6],_0x3c57d6);}}}),PluginManager[_0x1d4f35(0x53d)](pluginData[_0x1d4f35(0x46b)],_0x1d4f35(0x4ea),_0x1ef428=>{const _0x454450=_0x1d4f35;VisuMZ['ConvertParams'](_0x1ef428,_0x1ef428);const _0x4d4d69=_0x1ef428[_0x454450(0x449)]||[];for(const _0x2364ee of _0x4d4d69){$gameScreen[_0x454450(0x290)](_0x2364ee),$gameScreen[_0x454450(0x325)](_0x2364ee);}}),PluginManager['registerCommand'](pluginData[_0x1d4f35(0x46b)],_0x1d4f35(0x4d2),_0x575ca8=>{$gameScreen['requestPictureTextRefreshAll']();}),VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x49c)]=Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x3aa)],Scene_Boot[_0x1d4f35(0x1be)]['onDatabaseLoaded']=function(){const _0x4f36d8=_0x1d4f35;VisuMZ[_0x4f36d8(0x1bb)][_0x4f36d8(0x49c)][_0x4f36d8(0x162)](this),VisuMZ[_0x4f36d8(0x1bb)]['CheckCompatibility'](),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x4f36d8(0x1a6)](),this[_0x4f36d8(0x49d)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x239)]=function(){const _0x21c00c=_0x1d4f35;if(Imported[_0x21c00c(0x21d)]&&VisuMZ['ExtraEnemyDrops'][_0x21c00c(0x3b0)]<1.09){let _0x1507dc='';_0x1507dc+=_0x21c00c(0x2e5),_0x1507dc+='in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.',alert(_0x1507dc),SceneManager[_0x21c00c(0x48a)]();}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x425)]=function(_0x49bdde){const _0x1bb206=_0x1d4f35,_0x4f3654=VisuMZ[_0x1bb206(0x1bb)][_0x1bb206(0x433)][_0x49bdde];_0x4f3654[_0x1bb206(0x4cc)]((_0x54f639,_0x388da0)=>{const _0x1d32c2=_0x1bb206;if(!_0x54f639||!_0x388da0)return-0x1;return _0x388da0[_0x1d32c2(0x3b1)]['length']-_0x54f639[_0x1d32c2(0x3b1)][_0x1d32c2(0x291)];});},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x1d0559=_0x1d4f35;VisuMZ[_0x1d0559(0x1bb)][_0x1d0559(0x425)](_0x1d0559(0x280));for(const _0x574529 of VisuMZ[_0x1d0559(0x1bb)]['Settings'][_0x1d0559(0x280)]){_0x574529[_0x1d0559(0x3b1)]=_0x574529[_0x1d0559(0x3b1)][_0x1d0559(0x1e9)](),_0x574529[_0x1d0559(0x4b5)]=new RegExp('\x1b'+_0x574529[_0x1d0559(0x3b1)],'gi'),_0x574529[_0x1d0559(0x168)]='\x1b'+_0x574529[_0x1d0559(0x3b1)];if(_0x574529[_0x1d0559(0x429)]==='')_0x574529['textCodeResult']+=_0x1d0559(0x487);}},Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x1a6)]=function(){const _0x6d8052=_0x1d4f35;VisuMZ[_0x6d8052(0x1bb)]['SortObjectByKeyLength'](_0x6d8052(0x3ad));for(const _0x4477c6 of VisuMZ[_0x6d8052(0x1bb)][_0x6d8052(0x433)][_0x6d8052(0x3ad)]){_0x4477c6[_0x6d8052(0x4b5)]=new RegExp('\x1b'+_0x4477c6[_0x6d8052(0x3b1)]+_0x4477c6[_0x6d8052(0x429)],'gi'),_0x4477c6[_0x6d8052(0x3b4)]!==''&&_0x4477c6[_0x6d8052(0x3b4)]!==_0x6d8052(0x4e6)?_0x4477c6[_0x6d8052(0x168)]=new Function(_0x6d8052(0x2b2)+_0x4477c6[_0x6d8052(0x3b4)][_0x6d8052(0x4ac)](/\\/g,'\x1b')+'\x27'):_0x4477c6[_0x6d8052(0x168)]=_0x4477c6[_0x6d8052(0x415)];}},Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x49d)]=function(){const _0x1c5648=_0x1d4f35;for(const _0x2e768c of VisuMZ[_0x1c5648(0x1bb)][_0x1c5648(0x433)][_0x1c5648(0x432)]){_0x2e768c[_0x1c5648(0x4b5)]=new RegExp('\x5c['+_0x2e768c[_0x1c5648(0x3b1)]+'\x5c]','gi');if(_0x2e768c[_0x1c5648(0x3b4)]!==''&&_0x2e768c[_0x1c5648(0x3b4)]!==_0x1c5648(0x4e6)){let _0x562365=_0x2e768c[_0x1c5648(0x3b4)];_0x562365=_0x562365['replace'](/\\/g,'\x1b'),_0x562365=_0x562365['replace']('\x27','\x5c\x27'),_0x562365=_0x562365[_0x1c5648(0x4ac)]('\x22','\x5c\x22'),_0x2e768c[_0x1c5648(0x168)]=new Function(_0x1c5648(0x2b2)+_0x562365+'\x27');}else _0x2e768c[_0x1c5648(0x168)]=_0x2e768c[_0x1c5648(0x415)];}},Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x2c1)]=function(){const _0x54ff6e=_0x1d4f35,_0x1775b8=VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x433)][_0x54ff6e(0x1ed)];!VisuMZ[_0x54ff6e(0x549)]&&(VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x16d)]($dataClasses,_0x1775b8[_0x54ff6e(0x372)]),VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x16d)]($dataSkills,_0x1775b8['Skills']),VisuMZ['MessageCore']['AddAutoColor']($dataItems,_0x1775b8['Items']),VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x16d)]($dataWeapons,_0x1775b8[_0x54ff6e(0x466)]),VisuMZ['MessageCore']['AddAutoColor']($dataArmors,_0x1775b8['Armors']),VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x16d)]($dataEnemies,_0x1775b8[_0x54ff6e(0x4d8)]),VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x16d)]($dataStates,_0x1775b8[_0x54ff6e(0x224)])),VisuMZ[_0x54ff6e(0x1bb)][_0x54ff6e(0x1b5)]();},VisuMZ['MessageCore']['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x1d4f35(0x46d),_0x1d4f35(0x4e4),'<I>',_0x1d4f35(0x3d1),_0x1d4f35(0x3d2),'</LEFT>',_0x1d4f35(0x53b),_0x1d4f35(0x323),_0x1d4f35(0x220),_0x1d4f35(0x1a3),_0x1d4f35(0x4fe),'</COLORLOCK>',_0x1d4f35(0x511),_0x1d4f35(0x343),_0x1d4f35(0x189),_0x1d4f35(0x1ec),_0x1d4f35(0x26d),_0x1d4f35(0x3d0),_0x1d4f35(0x496),_0x1d4f35(0x1a2),_0x1d4f35(0x35f),_0x1d4f35(0x16f),_0x1d4f35(0x457),_0x1d4f35(0x23f),'ENABLE',_0x1d4f35(0x234),_0x1d4f35(0x20f),_0x1d4f35(0x528),_0x1d4f35(0x34f),'ANY'],VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x16d)]=function(_0x4c5f22,_0x40cf17){const _0x1c4176=_0x1d4f35;if(_0x40cf17<=0x0)return;const _0x4291ce=_0x4c5f22;for(const _0x248e2e of _0x4291ce){if(!_0x248e2e)continue;VisuMZ['MessageCore'][_0x1c4176(0x550)](_0x248e2e,_0x40cf17);}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x1b5)]=function(){const _0x5ca94c=_0x1d4f35;VisuMZ[_0x5ca94c(0x1bb)][_0x5ca94c(0x274)]=[];for(let _0x14b70a=0x1;_0x14b70a<=0x1f;_0x14b70a++){const _0x18a383='TextColor%1'[_0x5ca94c(0x52e)](_0x14b70a),_0x9c76e9=VisuMZ['MessageCore'][_0x5ca94c(0x433)][_0x5ca94c(0x1ed)][_0x18a383];_0x9c76e9['sort']((_0xd6f2fc,_0x1659fd)=>{const _0x109f95=_0x5ca94c;if(!_0xd6f2fc||!_0x1659fd)return-0x1;return _0x1659fd[_0x109f95(0x291)]-_0xd6f2fc['length'];}),this[_0x5ca94c(0x18c)](_0x9c76e9,_0x14b70a);}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x18c)]=function(_0x19fe38,_0x251b5c){const _0x551223=_0x1d4f35;for(const _0x490c46 of _0x19fe38){if(_0x490c46[_0x551223(0x291)]<=0x0)continue;if(/^\d+$/[_0x551223(0x455)](_0x490c46))continue;let _0x317db7=VisuMZ[_0x551223(0x1bb)][_0x551223(0x434)](_0x490c46);if(_0x490c46[_0x551223(0x1f2)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x11e460=new RegExp(_0x317db7,'i');else var _0x11e460=new RegExp('\x5cb'+_0x317db7+'\x5cb','g');VisuMZ[_0x551223(0x1bb)][_0x551223(0x274)]['push']([_0x11e460,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x551223(0x52e)](_0x251b5c,_0x490c46)]);}},VisuMZ['MessageCore'][_0x1d4f35(0x434)]=function(_0x33a13c){const _0x26a84f=_0x1d4f35;return _0x33a13c=_0x33a13c['replace'](/(\W)/gi,(_0x3cd5c9,_0x2634e1)=>_0x26a84f(0x2eb)[_0x26a84f(0x52e)](_0x2634e1)),_0x33a13c;},VisuMZ['MessageCore'][_0x1d4f35(0x16b)]=VisuMZ[_0x1d4f35(0x16b)],VisuMZ[_0x1d4f35(0x16b)]=function(_0x32254e){const _0x2aae23=_0x1d4f35;VisuMZ['MessageCore']['ParseClassNotetags'][_0x2aae23(0x162)](this,_0x32254e);const _0x17585c=VisuMZ[_0x2aae23(0x1bb)]['Settings']['AutoColor'];VisuMZ[_0x2aae23(0x1bb)]['CreateAutoColorFor'](_0x32254e,_0x17585c[_0x2aae23(0x372)]);},VisuMZ['MessageCore'][_0x1d4f35(0x2bb)]=VisuMZ[_0x1d4f35(0x2bb)],VisuMZ[_0x1d4f35(0x2bb)]=function(_0x5b816e){const _0x280553=_0x1d4f35;VisuMZ[_0x280553(0x1bb)][_0x280553(0x2bb)][_0x280553(0x162)](this,_0x5b816e);const _0x8aaaec=VisuMZ[_0x280553(0x1bb)]['Settings'][_0x280553(0x1ed)];VisuMZ[_0x280553(0x1bb)][_0x280553(0x550)](_0x5b816e,_0x8aaaec['Skills']);},0x7,VisuMZ['MessageCore'][_0x1d4f35(0x2b1)]=VisuMZ[_0x1d4f35(0x2b1)],VisuMZ[_0x1d4f35(0x2b1)]=function(_0x38d974){const _0x2bca90=_0x1d4f35;VisuMZ['MessageCore'][_0x2bca90(0x2b1)][_0x2bca90(0x162)](this,_0x38d974);const _0x4080a0=VisuMZ['MessageCore']['Settings'][_0x2bca90(0x1ed)];VisuMZ[_0x2bca90(0x1bb)][_0x2bca90(0x550)](_0x38d974,_0x4080a0[_0x2bca90(0x270)]);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4e3)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x1d4f35(0x4e3)]=function(_0x1516ca){const _0x286a98=_0x1d4f35;VisuMZ[_0x286a98(0x1bb)]['ParseWeaponNotetags']['call'](this,_0x1516ca);const _0x5b7509=VisuMZ[_0x286a98(0x1bb)][_0x286a98(0x433)][_0x286a98(0x1ed)];VisuMZ[_0x286a98(0x1bb)][_0x286a98(0x550)](_0x1516ca,_0x5b7509[_0x286a98(0x466)]);},VisuMZ['MessageCore'][_0x1d4f35(0x353)]=VisuMZ[_0x1d4f35(0x353)],VisuMZ[_0x1d4f35(0x353)]=function(_0x38582c){const _0x1eb8b8=_0x1d4f35;VisuMZ['MessageCore']['ParseArmorNotetags']['call'](this,_0x38582c);const _0x248b85=VisuMZ['MessageCore'][_0x1eb8b8(0x433)][_0x1eb8b8(0x1ed)];VisuMZ['MessageCore'][_0x1eb8b8(0x550)](_0x38582c,_0x248b85[_0x1eb8b8(0x2de)]);},VisuMZ['MessageCore'][_0x1d4f35(0x258)]=VisuMZ[_0x1d4f35(0x258)],VisuMZ[_0x1d4f35(0x258)]=function(_0x357ac1){const _0x766418=_0x1d4f35;VisuMZ['MessageCore']['ParseEnemyNotetags']['call'](this,_0x357ac1);const _0xf761ee=VisuMZ[_0x766418(0x1bb)][_0x766418(0x433)][_0x766418(0x1ed)];VisuMZ[_0x766418(0x1bb)][_0x766418(0x550)](_0x357ac1,_0xf761ee[_0x766418(0x4d8)]);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x163)]=VisuMZ[_0x1d4f35(0x163)],VisuMZ[_0x1d4f35(0x163)]=function(_0x1fbc32){const _0xc4818a=_0x1d4f35;VisuMZ[_0xc4818a(0x1bb)][_0xc4818a(0x163)][_0xc4818a(0x162)](this,_0x1fbc32);const _0x18f2a4=VisuMZ[_0xc4818a(0x1bb)][_0xc4818a(0x433)][_0xc4818a(0x1ed)];VisuMZ[_0xc4818a(0x1bb)]['CreateAutoColorFor'](_0x1fbc32,_0x18f2a4[_0xc4818a(0x224)]);},VisuMZ[_0x1d4f35(0x1bb)]['CreateAutoColorFor']=function(_0x4c7626,_0x35bc2a){const _0x42f0cf=_0x1d4f35;if(_0x35bc2a<=0x0)return;const _0x60fe21=VisuMZ['MessageCore'][_0x42f0cf(0x433)][_0x42f0cf(0x1ed)]['TextColor'+_0x35bc2a];let _0x2f33f2=_0x4c7626[_0x42f0cf(0x46b)]['trim']();if(/^\d+$/['test'](_0x2f33f2))return;if(VisuMZ['MessageCore'][_0x42f0cf(0x423)][_0x42f0cf(0x54e)](_0x2f33f2[_0x42f0cf(0x1e9)]()))return;_0x2f33f2=_0x2f33f2[_0x42f0cf(0x4ac)](/\\I\[(\d+)\]/gi,''),_0x2f33f2=_0x2f33f2[_0x42f0cf(0x4ac)](/\x1bI\[(\d+)\]/gi,'');if(_0x2f33f2[_0x42f0cf(0x291)]<=0x0)return;if(_0x2f33f2['match'](/-----/i))return;_0x60fe21[_0x42f0cf(0x20a)](_0x2f33f2);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x2f5)]=Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x174)],Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x174)]=function(){const _0x3611a4=_0x1d4f35;VisuMZ[_0x3611a4(0x1bb)][_0x3611a4(0x2f5)][_0x3611a4(0x162)](this),this[_0x3611a4(0x2e7)]();},Scene_Boot[_0x1d4f35(0x1be)][_0x1d4f35(0x2e7)]=function(){const _0x499679=_0x1d4f35,_0x3c3706=VisuMZ['MessageCore'][_0x499679(0x433)][_0x499679(0x28b)]||[];for(const _0x57189d of _0x3c3706){if(!_0x57189d)continue;const _0x492b8e=_0x57189d['FontFamily'];if(_0x492b8e['trim']()==='')continue;if(_0x492b8e[_0x499679(0x486)]()[_0x499679(0x453)]()==='unnamed')continue;const _0x2fd628=_0x57189d['Filename'];if(_0x2fd628==='Unnamed.ttf')continue;FontManager[_0x499679(0x4d1)](_0x492b8e,_0x2fd628);}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x2e4)]=VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x433)][_0x1d4f35(0x418)][_0x1d4f35(0x2bd)]??_0x1d4f35(0x212),VisuMZ[_0x1d4f35(0x1bb)]['DataManager_loadDatabase']=DataManager[_0x1d4f35(0x2d1)],DataManager[_0x1d4f35(0x2d1)]=function(){const _0x555a2d=_0x1d4f35;VisuMZ[_0x555a2d(0x1bb)][_0x555a2d(0x41f)]['call'](this),this[_0x555a2d(0x1e0)]();},DataManager[_0x1d4f35(0x1e0)]=function(){const _0x5f820d=_0x1d4f35;if(!TextManager[_0x5f820d(0x228)]())return;const _0x1e5092=VisuMZ[_0x5f820d(0x1bb)][_0x5f820d(0x433)]['Localization'];let _0x444830='';const _0x569b34=VisuMZ[_0x5f820d(0x1bb)][_0x5f820d(0x2e4)]??_0x5f820d(0x212);if(_0x569b34===_0x5f820d(0x503))_0x444830=(_0x1e5092[_0x5f820d(0x3ce)]??_0x5f820d(0x30f))||'';if(_0x569b34===_0x5f820d(0x212))_0x444830=(_0x1e5092[_0x5f820d(0x3c2)]??'Languages.tsv')||'';if(!_0x444830)return;const _0x55b053='$dataLocalization',_0x31032a=new XMLHttpRequest(),_0x53ba47=_0x5f820d(0x4cd)+_0x444830;window[_0x55b053]=null,_0x31032a[_0x5f820d(0x2dd)](_0x5f820d(0x3a7),_0x53ba47),_0x31032a[_0x5f820d(0x44e)](_0x5f820d(0x4c9)[_0x5f820d(0x52e)](_0x569b34['toLowerCase']())),_0x31032a[_0x5f820d(0x3b7)]=()=>this['onLocalizationXhrLoad'](_0x31032a,_0x55b053),_0x31032a[_0x5f820d(0x36a)]=()=>this[_0x5f820d(0x412)](),_0x31032a['send']();},DataManager[_0x1d4f35(0x411)]=function(_0x57d7ef,_0x31c4dd){const _0x5824b7=_0x1d4f35;if(_0x57d7ef[_0x5824b7(0x37e)]>=0x190)return;const _0x35671d=_0x57d7ef[_0x5824b7(0x3b8)];window[_0x31c4dd]=VisuMZ['MessageCore'][_0x5824b7(0x31b)](_0x35671d);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x31b)]=function(_0x10ceac){const _0x4636fd=_0x1d4f35,_0xd0678f=VisuMZ['MessageCore'][_0x4636fd(0x2e4)]??_0x4636fd(0x212),_0x5f0cba=_0xd0678f===_0x4636fd(0x503)?';':'\x09',_0x16e598=_0x10ceac[_0x4636fd(0x490)]('\x0a'),_0x19b692=_0x16e598[0x0][_0x4636fd(0x490)](_0x5f0cba),_0x52b673={};return _0x16e598[_0x4636fd(0x3f5)](0x1)['forEach'](_0x1ef3c5=>{const _0x5a759b=_0x4636fd;let _0x3167b0=[],_0x366ae0='',_0x40c071=![];for(let _0x12d97e=0x0;_0x12d97e<_0x1ef3c5['length'];_0x12d97e++){let _0x506d88=_0x1ef3c5[_0x12d97e];if(_0x506d88==='\x22')_0x40c071&&_0x1ef3c5[_0x12d97e+0x1]==='\x22'?(_0x366ae0+=_0x506d88,_0x12d97e++):_0x40c071=!_0x40c071;else _0x506d88===_0x5f0cba&&!_0x40c071?(_0x3167b0[_0x5a759b(0x20a)](_0x366ae0),_0x366ae0=''):_0x366ae0+=_0x506d88;}if(_0x366ae0)_0x3167b0[_0x5a759b(0x20a)](_0x366ae0);if(!_0x3167b0[0x0])_0x3167b0[0x0]='';const _0x1be5c2=_0x3167b0[0x0][_0x5a759b(0x4ac)](/^"|"$/g,'')['toLowerCase']()[_0x5a759b(0x453)]();_0x52b673[_0x1be5c2]=_0x19b692[_0x5a759b(0x3f5)](0x1)[_0x5a759b(0x507)]((_0x140a60,_0x321380,_0x193cb6)=>{const _0x52af92=_0x5a759b;return _0x140a60[_0x321380['trim']()]=(_0x3167b0[_0x193cb6+0x1]||'')[_0x52af92(0x4ac)](/^"|"$/g,''),_0x140a60;},{});}),_0x52b673;},DataManager['onLocalizationXhrError']=function(){const _0x14c8ad=_0x1d4f35,_0x5a2904=(VisuMZ[_0x14c8ad(0x1bb)][_0x14c8ad(0x2e4)]??_0x14c8ad(0x212))['toUpperCase']();let _0x4dc252='';_0x4dc252+=_0x14c8ad(0x54c),_0x4dc252+=_0x14c8ad(0x3f8),_0x4dc252=_0x4dc252[_0x14c8ad(0x52e)](_0x5a2904);if(confirm(_0x4dc252)){if(Utils[_0x14c8ad(0x32c)](_0x14c8ad(0x455))){if(_0x5a2904===_0x14c8ad(0x192))_0x4dc252=_0x14c8ad(0x484),_0x4dc252=_0x4dc252[_0x14c8ad(0x52e)](_0x5a2904),alert(_0x4dc252),this[_0x14c8ad(0x2db)](),this[_0x14c8ad(0x200)]();else return this[_0x14c8ad(0x2a2)]();_0x4dc252='';}else _0x4dc252=_0x14c8ad(0x171);}else _0x4dc252='%1\x20file\x20has\x20not\x20been\x20made.\x0a';_0x4dc252+=_0x14c8ad(0x42e),_0x4dc252=_0x4dc252[_0x14c8ad(0x52e)](_0x5a2904),alert(_0x4dc252),SceneManager[_0x14c8ad(0x48a)]();},DataManager[_0x1d4f35(0x2a2)]=function(){const _0xa042fe=_0x1d4f35,_0x530196=VisuMZ[_0xa042fe(0x1bb)][_0xa042fe(0x433)][_0xa042fe(0x418)],_0x268b11=_0x530196[_0xa042fe(0x3ce)]??_0xa042fe(0x30f),_0x16115b=new XMLHttpRequest(),_0x3753de=_0xa042fe(0x4cd)+_0x268b11;_0x16115b[_0xa042fe(0x2dd)](_0xa042fe(0x3a7),_0x3753de),_0x16115b[_0xa042fe(0x44e)](_0xa042fe(0x404)),_0x16115b['onload']=()=>this[_0xa042fe(0x4a2)](_0x16115b),_0x16115b[_0xa042fe(0x36a)]=()=>this[_0xa042fe(0x51e)](),_0x16115b[_0xa042fe(0x196)]();},DataManager[_0x1d4f35(0x4a2)]=function(_0x481c76){const _0x36005b=_0x1d4f35,_0x488ba6=VisuMZ['MessageCore']['Settings']['Localization'],_0x27f1bb=_0x488ba6[_0x36005b(0x3ce)]??_0x36005b(0x30f);let _0x1fadbe=_0x36005b(0x35b)[_0x36005b(0x52e)](_0x27f1bb);_0x1fadbe+=_0x36005b(0x50c),_0x1fadbe+=_0x36005b(0x3ca),confirm(_0x1fadbe)?this[_0x36005b(0x3ba)](_0x481c76):this[_0x36005b(0x51e)]();},DataManager[_0x1d4f35(0x3ba)]=function(_0x14dfed){const _0x3c54df=_0x1d4f35;if(_0x14dfed[_0x3c54df(0x37e)]>=0x190)return;const _0x31d932=_0x14dfed[_0x3c54df(0x3b8)],_0x44d358=_0x31d932[_0x3c54df(0x4ac)](/\;/gi,'\x09'),_0x25209e=VisuMZ['MessageCore'][_0x3c54df(0x433)]['Localization'],_0xb67b28=_0x25209e[_0x3c54df(0x3c2)]||'Languages.tsv',_0x5c51f8=require(_0x3c54df(0x2fa)),_0x52dd6e=_0x5c51f8[_0x3c54df(0x378)](process[_0x3c54df(0x526)][_0x3c54df(0x39c)]),_0x38e47a=_0x5c51f8[_0x3c54df(0x276)](_0x52dd6e,'data/'),_0x46e3a3=_0x38e47a+_0xb67b28,_0x52428d=require('fs');_0x52428d[_0x3c54df(0x352)](_0x46e3a3,_0x44d358);let _0x7e171e=_0x3c54df(0x169);alert(_0x7e171e),_0x7e171e=_0x3c54df(0x42e),alert(_0x7e171e),SceneManager[_0x3c54df(0x48a)]();},DataManager['createTsvFile']=function(){const _0x22136b=_0x1d4f35;let _0x2e8de0=_0x22136b(0x169);alert(_0x2e8de0),this[_0x22136b(0x2db)](),this[_0x22136b(0x200)](),_0x2e8de0=_0x22136b(0x42e),alert(_0x2e8de0),SceneManager[_0x22136b(0x48a)]();},DataManager[_0x1d4f35(0x2db)]=function(){const _0x10d1a9=_0x1d4f35,_0x4fcbcf=[_0x10d1a9(0x527),_0x10d1a9(0x180),_0x10d1a9(0x3f3),_0x10d1a9(0x2fb),_0x10d1a9(0x1fb),_0x10d1a9(0x4a3),'Danish',_0x10d1a9(0x308),_0x10d1a9(0x30a),_0x10d1a9(0x48e),'German',_0x10d1a9(0x331),_0x10d1a9(0x273),'Hungarian',_0x10d1a9(0x392),_0x10d1a9(0x51a),_0x10d1a9(0x19f),_0x10d1a9(0x1c1),_0x10d1a9(0x21e),_0x10d1a9(0x3dd),_0x10d1a9(0x1f3),_0x10d1a9(0x20d),_0x10d1a9(0x44b),_0x10d1a9(0x2b5),_0x10d1a9(0x516),_0x10d1a9(0x3e3),_0x10d1a9(0x34b),_0x10d1a9(0x1ca),_0x10d1a9(0x477)],_0x492af6=[_0x10d1a9(0x4fb),_0x10d1a9(0x190),_0x10d1a9(0x199),'你好','你好',_0x10d1a9(0x3d7),_0x10d1a9(0x1c9),_0x10d1a9(0x160),'Hei',_0x10d1a9(0x374),_0x10d1a9(0x160),_0x10d1a9(0x266),_0x10d1a9(0x39a),_0x10d1a9(0x32e),_0x10d1a9(0x2ba),_0x10d1a9(0x3c1),_0x10d1a9(0x500),_0x10d1a9(0x15e),_0x10d1a9(0x40e),_0x10d1a9(0x444),_0x10d1a9(0x450),'Salut',_0x10d1a9(0x369),_0x10d1a9(0x3d7),_0x10d1a9(0x522),_0x10d1a9(0x1c9),'வணக்கம்',_0x10d1a9(0x3c3),_0x10d1a9(0x3f4)],_0x5af1b4=[_0x10d1a9(0x221),'Good-bye',_0x10d1a9(0x16e),'再见','再見',_0x10d1a9(0x40c),'Farvel',_0x10d1a9(0x177),'Näkemiin',_0x10d1a9(0x54f),_0x10d1a9(0x488),_0x10d1a9(0x52a),'अलविदा',_0x10d1a9(0x161),_0x10d1a9(0x368),_0x10d1a9(0x2a8),_0x10d1a9(0x236),_0x10d1a9(0x4ae),'Ha\x20det','Do\x20widzenia','Adeus','La\x20revedere',_0x10d1a9(0x473),_0x10d1a9(0x440),_0x10d1a9(0x32f),_0x10d1a9(0x175),_0x10d1a9(0x32b),_0x10d1a9(0x4d0),_0x10d1a9(0x354)],_0x499b29=[_0x10d1a9(0x33b),_0x10d1a9(0x33b),_0x10d1a9(0x41a),'哇','哇','Ó','Wow','Wauw',_0x10d1a9(0x3d8),_0x10d1a9(0x2b8),_0x10d1a9(0x33b),_0x10d1a9(0x1c2),_0x10d1a9(0x329),_0x10d1a9(0x1d5),_0x10d1a9(0x26c),_0x10d1a9(0x33b),'ワオ','와우','Oi','O',_0x10d1a9(0x18d),_0x10d1a9(0x18d),_0x10d1a9(0x1aa),'Ó','Guau','Oj',_0x10d1a9(0x38b),_0x10d1a9(0x4f4),'Vay'],_0x1092cb=[_0x4fcbcf,_0x492af6,_0x5af1b4,_0x499b29],_0x35a47c=VisuMZ[_0x10d1a9(0x1bb)][_0x10d1a9(0x2e4)]??_0x10d1a9(0x212),_0xc68bf0=_0x35a47c==='csv'?';':'\x09',_0x3e8902=_0x1092cb['map'](_0x2f3131=>_0x2f3131[_0x10d1a9(0x276)](_0xc68bf0))[_0x10d1a9(0x276)]('\x0a'),_0x525de7=VisuMZ[_0x10d1a9(0x1bb)][_0x10d1a9(0x433)][_0x10d1a9(0x418)];let _0x3754fe='';if(_0x35a47c===_0x10d1a9(0x503))_0x3754fe=_0x525de7['CsvFilename']||_0x10d1a9(0x30f);if(_0x35a47c===_0x10d1a9(0x212))_0x3754fe=_0x525de7['TsvFilename']||'Languages.tsv';const _0x3e7cb2=require(_0x10d1a9(0x2fa)),_0x4e75a1=_0x3e7cb2[_0x10d1a9(0x378)](process[_0x10d1a9(0x526)][_0x10d1a9(0x39c)]),_0x2b4023=_0x3e7cb2['join'](_0x4e75a1,_0x10d1a9(0x4cd)),_0x495ee2=_0x2b4023+_0x3754fe,_0x36a9f8=require('fs');return _0x36a9f8[_0x10d1a9(0x352)](_0x495ee2,_0x3e8902),_0x495ee2;},DataManager[_0x1d4f35(0x200)]=function(){const _0x2ebf2c=_0x1d4f35,{exec:_0xe8358e}=require(_0x2ebf2c(0x2cd));_0xe8358e(_0x2ebf2c(0x233)),_0xe8358e(_0x2ebf2c(0x4dc));},VisuMZ[_0x1d4f35(0x1bb)]['ImageManager_loadBitmap']=ImageManager['loadBitmap'],ImageManager[_0x1d4f35(0x38f)]=function(_0x87be4d,_0x416a1e){const _0x438a99=_0x1d4f35;if(ConfigManager[_0x438a99(0x296)]!==undefined){const _0x3a96ec=VisuMZ['MessageCore'][_0x438a99(0x433)][_0x438a99(0x418)]||{},_0x3e3e70=_0x3a96ec[_0x438a99(0x24c)]||_0x438a99(0x180),_0x26c057=VisuMZ['MessageCore']['Settings'][_0x438a99(0x50a)]||{},_0x46e192=ConfigManager['textLocale']||_0x3e3e70;if(_0x46e192===_0x3e3e70&&!_0x26c057[_0x438a99(0x50f)]){}else{const _0x514d36=_0x26c057[_0x46e192]||'[XX]';_0x87be4d&&_0x87be4d[_0x438a99(0x1f2)](/\[XX\]/g)&&console['log'](_0x87be4d,_0x416a1e),_0x416a1e&&_0x416a1e[_0x438a99(0x1f2)](/\[XX\]/g)&&(_0x416a1e=_0x416a1e[_0x438a99(0x4ac)](/\[XX\]/g,_0x514d36));}}return VisuMZ[_0x438a99(0x1bb)][_0x438a99(0x2cf)][_0x438a99(0x162)](this,_0x87be4d,_0x416a1e);},SceneManager[_0x1d4f35(0x548)]=function(){const _0xb5a26b=_0x1d4f35;return this['_scene']&&this[_0xb5a26b(0x46f)][_0xb5a26b(0x544)]===Scene_Battle;},SceneManager[_0x1d4f35(0x439)]=function(){const _0x316ca1=_0x1d4f35;return this[_0x316ca1(0x46f)]&&this['_scene'][_0x316ca1(0x544)]===Scene_Map;},ConfigManager[_0x1d4f35(0x296)]=VisuMZ[_0x1d4f35(0x1bb)]['Settings'][_0x1d4f35(0x418)][_0x1d4f35(0x24c)]||_0x1d4f35(0x180),ConfigManager['textSpeed']=VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x433)][_0x1d4f35(0x2e0)][_0x1d4f35(0x30d)],VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4ca)]=ConfigManager[_0x1d4f35(0x4f6)],ConfigManager['makeData']=function(){const _0x390707=_0x1d4f35,_0x36c6cc=VisuMZ[_0x390707(0x1bb)][_0x390707(0x4ca)]['call'](this);return TextManager[_0x390707(0x228)]()&&(_0x36c6cc['textLocale']=this['textLocale']),_0x36c6cc[_0x390707(0x23d)]=this['textSpeed'],_0x36c6cc;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x420)]=ConfigManager[_0x1d4f35(0x219)],ConfigManager['applyData']=function(_0x211a97){const _0xed4f8a=_0x1d4f35;VisuMZ[_0xed4f8a(0x1bb)]['ConfigManager_applyData'][_0xed4f8a(0x162)](this,_0x211a97),TextManager[_0xed4f8a(0x228)]()&&(_0xed4f8a(0x296)in _0x211a97?this['textLocale']=String(_0x211a97[_0xed4f8a(0x296)]):this['textLocale']=VisuMZ[_0xed4f8a(0x1bb)][_0xed4f8a(0x433)][_0xed4f8a(0x418)][_0xed4f8a(0x24c)]||_0xed4f8a(0x180)),'textSpeed'in _0x211a97?this['textSpeed']=Number(_0x211a97[_0xed4f8a(0x23d)])[_0xed4f8a(0x25c)](0x1,0xb):this['textSpeed']=VisuMZ['MessageCore'][_0xed4f8a(0x433)][_0xed4f8a(0x2e0)]['Default'];},TextManager[_0x1d4f35(0x3db)]=VisuMZ[_0x1d4f35(0x1bb)]['Settings']['Localization']['Name'],TextManager['messageCoreTextSpeed']=VisuMZ['MessageCore']['Settings']['TextSpeed']['Name'],TextManager['instantTextSpeed']=VisuMZ['MessageCore'][_0x1d4f35(0x433)][_0x1d4f35(0x2e0)][_0x1d4f35(0x338)],VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4b9)]=TextManager['message'],TextManager[_0x1d4f35(0x3f0)]=function(_0x3da73f){const _0x3405b3=_0x1d4f35,_0x1682b7=[_0x3405b3(0x45a),'emerge',_0x3405b3(0x305),_0x3405b3(0x3d3),_0x3405b3(0x4a1),'defeat',_0x3405b3(0x1f5),_0x3405b3(0x31c),_0x3405b3(0x465),_0x3405b3(0x371)];let _0x2f2745=VisuMZ[_0x3405b3(0x1bb)][_0x3405b3(0x4b9)]['call'](this,_0x3da73f);return _0x1682b7[_0x3405b3(0x54e)](_0x3da73f)&&(_0x2f2745=_0x3405b3(0x1ec)+_0x2f2745),_0x2f2745;},TextManager['isVisuMzLocalizationEnabled']=function(){const _0x507a1f=_0x1d4f35;return VisuMZ['MessageCore'][_0x507a1f(0x433)][_0x507a1f(0x418)][_0x507a1f(0x40a)];},TextManager[_0x1d4f35(0x2b9)]=function(_0x4cd374){const _0x460dcd=_0x1d4f35;if(!this[_0x460dcd(0x228)]())return _0x4cd374;return _0x4cd374=String(_0x4cd374)[_0x460dcd(0x4ac)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x1971c9,_0x2cf680)=>this[_0x460dcd(0x271)](String(_0x2cf680))),_0x4cd374=String(_0x4cd374)[_0x460dcd(0x4ac)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0xe23d72,_0x3e4aca)=>this['getLocalizedText'](String(_0x3e4aca))),_0x4cd374=String(_0x4cd374)[_0x460dcd(0x4ac)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x3a6fb4,_0x378274)=>this[_0x460dcd(0x271)](String(_0x378274))),_0x4cd374;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x303)]=Bitmap[_0x1d4f35(0x1be)][_0x1d4f35(0x394)],Bitmap['prototype'][_0x1d4f35(0x394)]=function(_0x256e32){const _0x2569ba=_0x1d4f35;return _0x256e32=TextManager[_0x2569ba(0x2b9)](_0x256e32),VisuMZ['MessageCore']['Bitmap_measureTextWidth']['call'](this,_0x256e32);},TextManager['getLocalizedText']=function(_0x10bc4e){const _0x3807fd=_0x1d4f35;if(!$dataLocalization)return'';const _0x5eee1a=$dataLocalization[_0x10bc4e[_0x3807fd(0x486)]()[_0x3807fd(0x453)]()];if(!_0x5eee1a)return;const _0x3e570a=ConfigManager[_0x3807fd(0x296)]||_0x3807fd(0x180);let _0x41eaf1=_0x5eee1a[_0x3e570a]||'UNDEFINED!';return _0x41eaf1=_0x41eaf1[_0x3807fd(0x4ac)](/\\/g,'\x1b'),_0x41eaf1=_0x41eaf1[_0x3807fd(0x4ac)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x41eaf1;},TextManager['getLanguageName']=function(_0x1377c0){const _0x572c45=_0x1d4f35;return VisuMZ[_0x572c45(0x1bb)][_0x572c45(0x433)][_0x572c45(0x418)][_0x1377c0]||'';},TextManager[_0x1d4f35(0x536)]=function(){const _0x29848c=_0x1d4f35,_0x226e76=ConfigManager['textLocale']||_0x29848c(0x180);return this[_0x29848c(0x32d)](_0x226e76);},TextManager[_0x1d4f35(0x555)]=function(_0x361a2c){const _0x34d547=_0x1d4f35,_0x3429ae=VisuMZ[_0x34d547(0x1bb)][_0x34d547(0x433)][_0x34d547(0x418)][_0x34d547(0x31d)]||[];let _0x35e23d=_0x3429ae['indexOf'](ConfigManager[_0x34d547(0x296)]||'English');_0x35e23d+=_0x361a2c;const _0x17fdec=_0x3429ae[_0x35e23d]||'';return this[_0x34d547(0x32d)](_0x17fdec);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x406)]=Game_System['prototype'][_0x1d4f35(0x431)],Game_System['prototype'][_0x1d4f35(0x431)]=function(){const _0x891169=_0x1d4f35;let _0x4d9a89=VisuMZ['MessageCore'][_0x891169(0x406)][_0x891169(0x162)](this);if(ConfigManager&&ConfigManager[_0x891169(0x3fd)]!==undefined&&ConfigManager[_0x891169(0x3fd)]>0x0)return _0x4d9a89;else{const _0x2d0925=ConfigManager[_0x891169(0x296)]||'English',_0xbc0084=VisuMZ['MessageCore']['Settings'][_0x891169(0x30c)];return _0xbc0084[_0x2d0925]!==undefined&&(_0x4d9a89=_0xbc0084[_0x2d0925]+',\x20'+$dataSystem[_0x891169(0x47d)][_0x891169(0x532)]),_0x4d9a89;}},VisuMZ['MessageCore'][_0x1d4f35(0x35e)]=Window_Command['prototype'][_0x1d4f35(0x293)],Window_Command[_0x1d4f35(0x1be)][_0x1d4f35(0x293)]=function(_0x54fbf5,_0x3af3c5,_0x42d9d9,_0x15356e){const _0x3151e3=_0x1d4f35;if(TextManager[_0x3151e3(0x2b9)]&&TextManager[_0x3151e3(0x228)]()){const _0x347638=String(_0x54fbf5)[_0x3151e3(0x486)]()[_0x3151e3(0x453)]();if($dataLocalization[_0x347638]&&_0x347638[_0x3151e3(0x291)]>0x0){const _0x3b6758=ConfigManager[_0x3151e3(0x296)]||_0x3151e3(0x180);_0x54fbf5=$dataLocalization[_0x347638][_0x3b6758]||_0x3151e3(0x375);}}VisuMZ[_0x3151e3(0x1bb)][_0x3151e3(0x35e)][_0x3151e3(0x162)](this,_0x54fbf5,_0x3af3c5,_0x42d9d9,_0x15356e);},Window_StatusBase[_0x1d4f35(0x1be)][_0x1d4f35(0x2e8)]=function(_0x225f58,_0x59694b){const _0x41c247=_0x1d4f35,_0x38f0de=_0x225f58[_0x41c247(0x494)]();let _0x143275=$dataSystem[_0x41c247(0x23a)][_0x38f0de[_0x59694b]];if(TextManager['parseLocalizedText']){const _0x275793=String(_0x143275)[_0x41c247(0x486)]()[_0x41c247(0x453)]();if(TextManager[_0x41c247(0x228)]()&&$dataLocalization[_0x275793]){const _0x14506c=ConfigManager['textLocale']||_0x41c247(0x180);_0x143275=$dataLocalization[_0x275793][_0x14506c]||_0x41c247(0x375);}}return _0x143275;},Game_Temp[_0x1d4f35(0x1be)][_0x1d4f35(0x22e)]=function(_0x26f835){const _0x444ad5=_0x1d4f35;this[_0x444ad5(0x227)]=_0x26f835;},Game_Temp[_0x1d4f35(0x1be)][_0x1d4f35(0x379)]=function(){const _0x4194b4=_0x1d4f35;return this[_0x4194b4(0x227)];},VisuMZ[_0x1d4f35(0x1bb)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x1d4f35(0x27b)],Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x27b)]=function(_0x497b3b){const _0x52ca26=_0x1d4f35;return $gameTemp[_0x52ca26(0x22e)](this),VisuMZ[_0x52ca26(0x1bb)][_0x52ca26(0x36e)][_0x52ca26(0x162)](this,_0x497b3b);},VisuMZ['MessageCore'][_0x1d4f35(0x1c4)]=Game_System[_0x1d4f35(0x1be)]['initialize'],Game_System[_0x1d4f35(0x1be)]['initialize']=function(){const _0x18d77a=_0x1d4f35;VisuMZ[_0x18d77a(0x1bb)][_0x18d77a(0x1c4)][_0x18d77a(0x162)](this),this['initMessageCore']();},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x1b7)]=function(){const _0x447871=_0x1d4f35,_0x5c02c2=VisuMZ[_0x447871(0x1bb)][_0x447871(0x433)][_0x447871(0x213)],_0x299a02=VisuMZ[_0x447871(0x1bb)][_0x447871(0x433)][_0x447871(0x53c)];this[_0x447871(0x1fc)]={'messageRows':_0x5c02c2['MessageRows'],'messageWidth':_0x5c02c2[_0x447871(0x22f)],'messageWordWrap':_0x299a02[_0x447871(0x21b)],'helpWordWrap':_0x299a02['HelpWindow'],'choiceLineHeight':_0x5c02c2[_0x447871(0x546)],'choiceMinWidth':_0x5c02c2[_0x447871(0x26e)]??0x60,'choiceRows':_0x5c02c2[_0x447871(0x380)],'choiceCols':_0x5c02c2[_0x447871(0x277)],'choiceTextAlign':_0x5c02c2['ChoiceWindowTextAlign'],'choiceDistance':0x0},this['_messageOffsetX']===undefined&&(this[_0x447871(0x36b)]=_0x5c02c2[_0x447871(0x269)],this[_0x447871(0x355)]=_0x5c02c2[_0x447871(0x514)]);},Game_System[_0x1d4f35(0x1be)]['getMessageWindowRows']=function(){const _0x4a8b77=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x4a8b77(0x1fc)][_0x4a8b77(0x198)]===undefined)this['initMessageCore']();return this[_0x4a8b77(0x1fc)][_0x4a8b77(0x198)];},Game_System[_0x1d4f35(0x1be)]['setMessageWindowRows']=function(_0x3fef45){const _0x2c0b61=_0x1d4f35;if(this[_0x2c0b61(0x1fc)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x2c0b61(0x198)]===undefined)this[_0x2c0b61(0x1b7)]();this[_0x2c0b61(0x1fc)][_0x2c0b61(0x198)]=_0x3fef45||0x1;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x512)]=function(){const _0x32c8a0=_0x1d4f35;if(this[_0x32c8a0(0x1fc)]===undefined)this['initMessageCore']();if(this[_0x32c8a0(0x1fc)]['messageWidth']===undefined)this['initMessageCore']();return this[_0x32c8a0(0x1fc)][_0x32c8a0(0x400)];},Game_System[_0x1d4f35(0x1be)]['setMessageWindowWidth']=function(_0x3ceb80){const _0x4093ab=_0x1d4f35;if(this[_0x4093ab(0x1fc)]===undefined)this[_0x4093ab(0x1b7)]();if(this[_0x4093ab(0x1fc)]['messageWidth']===undefined)this[_0x4093ab(0x1b7)]();_0x3ceb80=Math[_0x4093ab(0x38c)](_0x3ceb80);if(_0x3ceb80%0x2!==0x0)_0x3ceb80+=0x1;this['_MessageCoreSettings'][_0x4093ab(0x400)]=_0x3ceb80||0x2;},Game_System['prototype'][_0x1d4f35(0x3c4)]=function(){const _0x4d267b=_0x1d4f35;if(this[_0x4d267b(0x1fc)]===undefined)this[_0x4d267b(0x1b7)]();if(this['_MessageCoreSettings'][_0x4d267b(0x29a)]===undefined)this[_0x4d267b(0x1b7)]();return this['_MessageCoreSettings'][_0x4d267b(0x29a)];},Game_System['prototype'][_0x1d4f35(0x3e0)]=function(_0x54c74c){const _0x508fce=_0x1d4f35;if(this[_0x508fce(0x1fc)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x508fce(0x29a)]===undefined)this[_0x508fce(0x1b7)]();this['_MessageCoreSettings']['messageWordWrap']=_0x54c74c;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x172)]=function(){const _0x261058=_0x1d4f35;if(this[_0x261058(0x36b)]===undefined){const _0x31321b=VisuMZ[_0x261058(0x1bb)][_0x261058(0x433)]['General'];this[_0x261058(0x36b)]=_0x31321b['MsgWindowOffsetX'],this['_messageOffsetY']=_0x31321b[_0x261058(0x514)];}return{'x':this[_0x261058(0x36b)]||0x0,'y':this[_0x261058(0x355)]||0x0};},Game_System['prototype']['setMessageWindowXyOffsets']=function(_0x40380a,_0x472465){const _0x560a1a=_0x1d4f35;if(this[_0x560a1a(0x1fc)]===undefined)this[_0x560a1a(0x1b7)]();this[_0x560a1a(0x36b)]=_0x40380a,this[_0x560a1a(0x355)]=_0x472465;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x2c7)]=function(){const _0x47be7d=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this[_0x47be7d(0x1b7)]();if(this['_MessageCoreSettings'][_0x47be7d(0x2d8)]===undefined)this[_0x47be7d(0x1b7)]();return this[_0x47be7d(0x1fc)][_0x47be7d(0x2d8)];},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x3f6)]=function(_0x247cf3){const _0x468601=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x468601(0x1fc)][_0x468601(0x2d8)]===undefined)this[_0x468601(0x1b7)]();this[_0x468601(0x1fc)][_0x468601(0x2d8)]=_0x247cf3;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x327)]=function(){const _0x2e5396=_0x1d4f35;if(this[_0x2e5396(0x1fc)]===undefined)this[_0x2e5396(0x1b7)]();if(this[_0x2e5396(0x1fc)][_0x2e5396(0x33e)]===undefined)this[_0x2e5396(0x1b7)]();return this['_MessageCoreSettings'][_0x2e5396(0x33e)];},Game_System[_0x1d4f35(0x1be)]['setChoiceListLineHeight']=function(_0x3e904a){const _0x5161af=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x5161af(0x1fc)]['choiceLineHeight']===undefined)this[_0x5161af(0x1b7)]();this[_0x5161af(0x1fc)][_0x5161af(0x33e)]=_0x3e904a||0x1;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x3f1)]=function(){const _0x1c6ce0=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this[_0x1c6ce0(0x1b7)]();return this[_0x1c6ce0(0x1fc)][_0x1c6ce0(0x52d)]??0x60;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x1d0)]=function(_0x1b5835){const _0x50595a=_0x1d4f35;if(this[_0x50595a(0x1fc)]===undefined)this[_0x50595a(0x1b7)]();this['_MessageCoreSettings'][_0x50595a(0x52d)]=_0x1b5835||0x0;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x4f1)]=function(){const _0x5f0561=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x5f0561(0x1fc)]['choiceRows']===undefined)this[_0x5f0561(0x1b7)]();return this[_0x5f0561(0x1fc)]['choiceRows'];},Game_System['prototype'][_0x1d4f35(0x501)]=function(_0x1d25fe){const _0x26f636=_0x1d4f35;if(this[_0x26f636(0x1fc)]===undefined)this[_0x26f636(0x1b7)]();if(this['_MessageCoreSettings'][_0x26f636(0x295)]===undefined)this[_0x26f636(0x1b7)]();this[_0x26f636(0x1fc)][_0x26f636(0x295)]=_0x1d25fe||0x1;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x383)]=function(){const _0x125a32=_0x1d4f35;if(this[_0x125a32(0x1fc)]===undefined)this[_0x125a32(0x1b7)]();if(this[_0x125a32(0x1fc)]['choiceCols']===undefined)this[_0x125a32(0x1b7)]();return this[_0x125a32(0x1fc)][_0x125a32(0x3cb)];},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x4ba)]=function(_0x288917){const _0xe45b4=_0x1d4f35;if(this[_0xe45b4(0x1fc)]===undefined)this[_0xe45b4(0x1b7)]();if(this[_0xe45b4(0x1fc)][_0xe45b4(0x3cb)]===undefined)this[_0xe45b4(0x1b7)]();this[_0xe45b4(0x1fc)]['choiceCols']=_0x288917||0x1;},Game_System['prototype']['getChoiceListTextAlign']=function(){const _0x36d1f5=_0x1d4f35;if(this[_0x36d1f5(0x1fc)]===undefined)this[_0x36d1f5(0x1b7)]();if(this[_0x36d1f5(0x1fc)]['choiceTextAlign']===undefined)this[_0x36d1f5(0x1b7)]();return this[_0x36d1f5(0x1fc)][_0x36d1f5(0x1ce)];},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x4d5)]=function(_0x10bab5){const _0x10ce75=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this[_0x10ce75(0x1b7)]();if(this[_0x10ce75(0x1fc)][_0x10ce75(0x1ce)]===undefined)this[_0x10ce75(0x1b7)]();this[_0x10ce75(0x1fc)]['choiceTextAlign']=_0x10bab5[_0x10ce75(0x486)]();},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x4c1)]=function(){const _0x406606=_0x1d4f35;if(this[_0x406606(0x1fc)]===undefined)this[_0x406606(0x1b7)]();return this[_0x406606(0x1fc)][_0x406606(0x1a7)]||0x0;},Game_System[_0x1d4f35(0x1be)][_0x1d4f35(0x46a)]=function(_0x234377){const _0x22af71=_0x1d4f35;if(this['_MessageCoreSettings']===undefined)this[_0x22af71(0x1b7)]();this[_0x22af71(0x1fc)][_0x22af71(0x1a7)]=_0x234377||0x0;},Game_Message[_0x1d4f35(0x1be)]['setWeaponChoice']=function(_0x515f45,_0x3877ad){const _0x4d4734=_0x1d4f35;this[_0x4d4734(0x2ea)]=_0x515f45,this[_0x4d4734(0x42b)]=_0x4d4734(0x428),this[_0x4d4734(0x197)]=_0x3877ad,this[_0x4d4734(0x474)]=0x0;},Game_Message[_0x1d4f35(0x1be)]['itemChoiceWtypeId']=function(){const _0x177d66=_0x1d4f35;return this[_0x177d66(0x197)]||0x0;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x478)]=function(_0x457091,_0x547eea,_0x2fc7e4){const _0x26d93a=_0x1d4f35;this[_0x26d93a(0x2ea)]=_0x457091,this[_0x26d93a(0x42b)]='armor',this['_itemChoiceAtypeId']=_0x547eea,this[_0x26d93a(0x474)]=_0x2fc7e4;},Game_Message['prototype'][_0x1d4f35(0x350)]=function(){return this['_itemChoiceAtypeId']||0x0;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x381)]=function(){const _0x1e8183=_0x1d4f35;return this[_0x1e8183(0x474)]||0x0;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x286)]=function(_0x38db86,_0x4e8a00,_0x23e545){const _0x10dfea=_0x1d4f35;this[_0x10dfea(0x2ea)]=_0x38db86,this[_0x10dfea(0x42b)]='skill',this[_0x10dfea(0x49b)]=_0x4e8a00,this[_0x10dfea(0x472)]=_0x23e545;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x447)]=function(){const _0x1b61b5=_0x1d4f35;return this[_0x1b61b5(0x49b)]||0x0;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x515)]=function(){const _0x1c26fe=_0x1d4f35;return $gameActors[_0x1c26fe(0x167)](this[_0x1c26fe(0x447)]())||$gameParty['leader']()||null;},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x460)]=function(){return this['_itemChoiceStypeId']||0x0;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x47f)]=Game_Message['prototype'][_0x1d4f35(0x499)],Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x499)]=function(_0x425740,_0x3e1fa3,_0x235965){const _0x284e2e=_0x1d4f35;this['_scriptCall']=!![],VisuMZ[_0x284e2e(0x1bb)][_0x284e2e(0x47f)][_0x284e2e(0x162)](this,_0x425740,_0x3e1fa3,_0x235965);},Game_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x2ce)]=function(){const _0x4cc8d7=_0x1d4f35;this[_0x4cc8d7(0x485)]=![],this[_0x4cc8d7(0x2ac)]=[];const _0x445887=this[_0x4cc8d7(0x40d)][_0x4cc8d7(0x291)];this[_0x4cc8d7(0x3c6)]=_0x445887;let _0x1eb43e=![];for(let _0x3e7772=0x0;_0x3e7772<_0x445887;_0x3e7772++){let _0x45b2b6=this[_0x4cc8d7(0x40d)][_0x3e7772];_0x45b2b6[_0x4cc8d7(0x1f2)](/<SHUFFLE>/gi)&&(_0x1eb43e=!![],_0x45b2b6=_0x45b2b6['replace'](/<SHUFFLE>/gi,'')),_0x45b2b6[_0x4cc8d7(0x1f2)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x1eb43e=!![],this[_0x4cc8d7(0x3c6)]=Math[_0x4cc8d7(0x2f8)](Number(RegExp['$1']),this[_0x4cc8d7(0x3c6)]),_0x45b2b6=_0x45b2b6[_0x4cc8d7(0x4ac)](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x45b2b6[_0x4cc8d7(0x1f2)](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x1eb43e=!![],this[_0x4cc8d7(0x3c6)]=Math[_0x4cc8d7(0x2f8)]($gameVariables['value'](Number(RegExp['$1']))||0x1,this[_0x4cc8d7(0x3c6)]),_0x45b2b6=_0x45b2b6['replace'](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x4cc8d7(0x2ac)][_0x4cc8d7(0x20a)](_0x3e7772),this[_0x4cc8d7(0x40d)][_0x3e7772]=_0x45b2b6;}if(_0x1eb43e){this[_0x4cc8d7(0x2ac)]=VisuMZ[_0x4cc8d7(0x1bb)][_0x4cc8d7(0x250)](this[_0x4cc8d7(0x2ac)]);if(this['choiceCancelType']()!==-0x2)this[_0x4cc8d7(0x4fc)]=-0x1;}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x250)]=function(_0x1b4edf){const _0x5b50d6=_0x1d4f35;var _0xda1b3e,_0x257c5a,_0x6c2b78;for(_0x6c2b78=_0x1b4edf[_0x5b50d6(0x291)]-0x1;_0x6c2b78>0x0;_0x6c2b78--){_0xda1b3e=Math['floor'](Math['random']()*(_0x6c2b78+0x1)),_0x257c5a=_0x1b4edf[_0x6c2b78],_0x1b4edf[_0x6c2b78]=_0x1b4edf[_0xda1b3e],_0x1b4edf[_0xda1b3e]=_0x257c5a;}return _0x1b4edf;},Game_Message[_0x1d4f35(0x1be)]['choiceIndexArray']=function(){const _0x5c9607=_0x1d4f35;if(!this[_0x5c9607(0x2ac)])this[_0x5c9607(0x2ce)]();return this[_0x5c9607(0x2ac)];},Game_Message['prototype'][_0x1d4f35(0x427)]=function(){const _0x4f19aa=_0x1d4f35;if(this[_0x4f19aa(0x3c6)]===undefined)this['setupShuffleChoices']();return this[_0x4f19aa(0x3c6)];},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4e0)]=Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x3b5)],Game_Screen['prototype'][_0x1d4f35(0x3b5)]=function(){const _0x2aad51=_0x1d4f35;VisuMZ['MessageCore']['Game_Screen_clearPictures']['call'](this),this[_0x2aad51(0x340)]();},Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x340)]=function(){const _0x4ddd40=_0x1d4f35;this[_0x4ddd40(0x31f)]=[],this[_0x4ddd40(0x3b3)]=[],this[_0x4ddd40(0x344)]=[];},Game_Screen['prototype'][_0x1d4f35(0x195)]=function(_0x3ebc6a){const _0x33b1bb=_0x1d4f35;if(this[_0x33b1bb(0x31f)]===undefined)this[_0x33b1bb(0x340)]();const _0x406201=this[_0x33b1bb(0x31a)](_0x3ebc6a);return this[_0x33b1bb(0x31f)][_0x406201]=this['_pictureText'][_0x406201]||{},this[_0x33b1bb(0x31f)][_0x406201];},Game_Screen['prototype'][_0x1d4f35(0x26f)]=function(_0x195b1c,_0x398aed){const _0x5a6612=_0x1d4f35;return _0x398aed=_0x398aed[_0x5a6612(0x486)]()[_0x5a6612(0x453)](),this[_0x5a6612(0x195)](_0x195b1c)[_0x398aed]||'';},Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x1fe)]=function(_0xaccf4b,_0x23e945,_0x43287d){const _0xb02546=_0x1d4f35;_0x43287d=_0x43287d['toLowerCase']()[_0xb02546(0x453)](),this['getPictureTextData'](_0xaccf4b)[_0x43287d]=_0x23e945||'',this['requestPictureTextRefresh'](_0xaccf4b,!![]);},Game_Screen['prototype'][_0x1d4f35(0x290)]=function(_0x39244d){const _0x14a369=_0x1d4f35;if(this[_0x14a369(0x31f)]===undefined)this['clearAllPictureTexts']();const _0x15c105=this['realPictureId'](_0x39244d);this[_0x14a369(0x31f)][_0x15c105]=null,this[_0x14a369(0x1d3)](_0x39244d,!![]);},Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x1b8)]=function(_0x18ad44){const _0x339107=_0x1d4f35;if(this['_pictureText']===undefined)this[_0x339107(0x340)]();const _0x5d3641=this['realPictureId'](_0x18ad44);return this['_pictureTextBuffer'][_0x5d3641]||0x0;},Game_Screen[_0x1d4f35(0x1be)]['setPictureTextBuffer']=function(_0x43b7e3,_0x4cfbd0){const _0x5afc8e=_0x1d4f35;if(this['_pictureText']===undefined)this[_0x5afc8e(0x340)]();const _0x560026=this[_0x5afc8e(0x31a)](_0x43b7e3);this[_0x5afc8e(0x3b3)][_0x560026]=Math[_0x5afc8e(0x1ad)](0x0,_0x4cfbd0);},Game_Screen['prototype']['erasePictureTextBuffer']=function(_0x4b2292){const _0x350ed8=_0x1d4f35;if(this[_0x350ed8(0x31f)]===undefined)this['clearAllPictureTexts']();const _0x42e049=this[_0x350ed8(0x31a)](_0x4b2292);this[_0x350ed8(0x3b3)][_0x42e049]=undefined;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x506)]=Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x2a6)],Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x2a6)]=function(_0x2f290f){const _0x223a42=_0x1d4f35;VisuMZ['MessageCore'][_0x223a42(0x506)][_0x223a42(0x162)](this,_0x2f290f),this[_0x223a42(0x290)](_0x2f290f),this[_0x223a42(0x325)](_0x2f290f),this[_0x223a42(0x1d3)](_0x2f290f,!![]);},Game_Screen['prototype'][_0x1d4f35(0x497)]=function(){const _0x25f582=_0x1d4f35;for(const _0x55e743 of this[_0x25f582(0x20b)]){if(_0x55e743){let _0x274bbd=this[_0x25f582(0x20b)]['indexOf'](_0x55e743);this[_0x25f582(0x1d3)](_0x274bbd);}}},Game_Screen[_0x1d4f35(0x1be)]['requestPictureTextRefresh']=function(_0x4bd1e8,_0x5994a8){const _0x224140=_0x1d4f35;this['_pictureTextRefresh']=this[_0x224140(0x344)]||[],(this['hasPictureText'](_0x4bd1e8)||_0x5994a8)&&this[_0x224140(0x344)]['push'](_0x4bd1e8);},Game_Screen['prototype'][_0x1d4f35(0x456)]=function(_0x45b524){const _0x31afc1=_0x1d4f35;return this[_0x31afc1(0x344)]=this[_0x31afc1(0x344)]||[],this[_0x31afc1(0x344)][_0x31afc1(0x54e)](_0x45b524);},Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x17a)]=function(_0x544683){const _0x5710a3=_0x1d4f35;this['_pictureTextRefresh']=this[_0x5710a3(0x344)]||[],this[_0x5710a3(0x344)]['remove'](_0x544683);},Game_Screen[_0x1d4f35(0x1be)][_0x1d4f35(0x251)]=function(_0xbd95ab){const _0x62a10e=_0x1d4f35,_0x32b6c8=[_0x62a10e(0x208),'up',_0x62a10e(0x53e),_0x62a10e(0x321),_0x62a10e(0x39d),_0x62a10e(0x193),_0x62a10e(0x24a),'down',_0x62a10e(0x24d)];return _0x32b6c8[_0x62a10e(0x185)](_0x3e11a9=>this[_0x62a10e(0x26f)](_0xbd95ab,_0x3e11a9)!=='');},VisuMZ['MessageCore'][_0x1d4f35(0x272)]=Game_Party[_0x1d4f35(0x1be)][_0x1d4f35(0x442)],Game_Party[_0x1d4f35(0x1be)][_0x1d4f35(0x442)]=function(){const _0x5c00d3=_0x1d4f35;VisuMZ[_0x5c00d3(0x1bb)]['Game_Party_initialize']['call'](this),this[_0x5c00d3(0x1b7)]();},Game_Party[_0x1d4f35(0x1be)][_0x1d4f35(0x1b7)]=function(){const _0x209233=_0x1d4f35;this[_0x209233(0x339)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype']['getLastGainedItemData']=function(){const _0x138310=_0x1d4f35;if(this['_lastGainedItemData']===undefined)this['initMessageCore']();return this[_0x138310(0x339)];},Game_Party[_0x1d4f35(0x1be)][_0x1d4f35(0x1c7)]=function(_0x43c0f7,_0x5dc89a){const _0x1f45b9=_0x1d4f35;if(this['_lastGainedItemData']===undefined)this[_0x1f45b9(0x1b7)]();if(!_0x43c0f7)return;if(DataManager[_0x1f45b9(0x22b)](_0x43c0f7))this['_lastGainedItemData'][_0x1f45b9(0x4e1)]=0x0;else{if(DataManager['isWeapon'](_0x43c0f7))this[_0x1f45b9(0x339)][_0x1f45b9(0x4e1)]=0x1;else DataManager['isArmor'](_0x43c0f7)&&(this['_lastGainedItemData']['type']=0x2);}this[_0x1f45b9(0x339)]['id']=_0x43c0f7['id'],this['_lastGainedItemData'][_0x1f45b9(0x2fd)]=_0x5dc89a;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party['prototype']['gainItem'],Game_Party[_0x1d4f35(0x1be)][_0x1d4f35(0x29f)]=function(_0x3becba,_0x2a38fe,_0x1d8202){const _0x35728e=_0x1d4f35;VisuMZ[_0x35728e(0x1bb)][_0x35728e(0x43b)][_0x35728e(0x162)](this,_0x3becba,_0x2a38fe,_0x1d8202),_0x2a38fe>0x0&&this[_0x35728e(0x1c7)](_0x3becba,_0x2a38fe);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x24b)]=Game_Map[_0x1d4f35(0x1be)][_0x1d4f35(0x442)],Game_Map[_0x1d4f35(0x1be)]['initialize']=function(){const _0x1a9acb=_0x1d4f35;VisuMZ['MessageCore'][_0x1a9acb(0x24b)][_0x1a9acb(0x162)](this),this[_0x1a9acb(0x33f)]=[];},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x21f)]=Game_Map[_0x1d4f35(0x1be)][_0x1d4f35(0x34e)],Game_Map[_0x1d4f35(0x1be)][_0x1d4f35(0x34e)]=function(){const _0x3bf145=_0x1d4f35;VisuMZ[_0x3bf145(0x1bb)][_0x3bf145(0x21f)][_0x3bf145(0x162)](this),this[_0x3bf145(0x33f)]=[];},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x2ed)]=Game_Map[_0x1d4f35(0x1be)][_0x1d4f35(0x238)],Game_Map[_0x1d4f35(0x1be)]['updateEvents']=function(){const _0x413276=_0x1d4f35;VisuMZ[_0x413276(0x1bb)][_0x413276(0x2ed)]['call'](this),this['updateMessageCommonEvents']();},Game_Map[_0x1d4f35(0x1be)]['addMessageCommonEvent']=function(_0x350159){const _0x1a2151=_0x1d4f35;if(!$dataCommonEvents[_0x350159])return;this[_0x1a2151(0x33f)]=this[_0x1a2151(0x33f)]||[];const _0x5c8b5b=this['_interpreter'][_0x1a2151(0x4a4)],_0x4cbbbe=new Game_MessageCommonEvent(_0x350159,_0x5c8b5b);this[_0x1a2151(0x33f)][_0x1a2151(0x20a)](_0x4cbbbe);},Game_Map['prototype'][_0x1d4f35(0x3cc)]=function(){const _0x34b41b=_0x1d4f35;this[_0x34b41b(0x33f)]=this['_messageCommonEvents']||[];for(const _0x3e6f4a of this['_messageCommonEvents']){!_0x3e6f4a[_0x34b41b(0x328)]?this[_0x34b41b(0x33f)]['remove'](_0x3e6f4a):_0x3e6f4a[_0x34b41b(0x1db)]();}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x282)]=Game_Map[_0x1d4f35(0x1be)][_0x1d4f35(0x247)],Game_Map['prototype'][_0x1d4f35(0x247)]=function(){const _0x45f2ee=_0x1d4f35;VisuMZ['MessageCore']['Game_Map_refresh'][_0x45f2ee(0x162)](this),$gameScreen[_0x45f2ee(0x497)]();},Game_Interpreter['MESSAGE_CORE_PLUGIN_NAME']=pluginData[_0x1d4f35(0x46b)],Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x3c8)]=function(_0x365b97){const _0x21c8ee=_0x1d4f35;if($gameMessage[_0x21c8ee(0x2d4)]())return![];return this[_0x21c8ee(0x2cc)](_0x365b97),this[_0x21c8ee(0x461)](_0x365b97),this[_0x21c8ee(0x2d9)](_0x365b97),this[_0x21c8ee(0x1a9)]('message'),!![];},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x2cc)]=function(_0x4a8c7a){const _0x38ea26=_0x1d4f35;$gameMessage['setFaceImage'](_0x4a8c7a[0x0],_0x4a8c7a[0x1]),$gameMessage[_0x38ea26(0x1bc)](_0x4a8c7a[0x2]),$gameMessage[_0x38ea26(0x261)](_0x4a8c7a[0x3]),$gameMessage[_0x38ea26(0x314)](_0x4a8c7a[0x4]);},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x461)]=function(_0x287846){const _0x17fc73=_0x1d4f35;while(this[_0x17fc73(0x3e2)]()){this[_0x17fc73(0x326)]++;if(this[_0x17fc73(0x2b4)]()[_0x17fc73(0x4b6)]===0x191){let _0x579856=this['currentCommand']()['parameters'][0x0];_0x579856=VisuMZ[_0x17fc73(0x1bb)][_0x17fc73(0x4ee)](_0x579856),$gameMessage[_0x17fc73(0x206)](_0x579856);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x1d4f35(0x1be)]['isContinuePrepareShowTextCommands']=function(){const _0x4b8579=_0x1d4f35;return this[_0x4b8579(0x417)]()===0x65&&$gameSystem[_0x4b8579(0x19a)]()>0x4?!![]:this[_0x4b8579(0x417)]()===0x191;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4ee)]=function(_0x98dc23){const _0x29ffcd=_0x1d4f35,_0x55bf75=VisuMZ[_0x29ffcd(0x1bb)][_0x29ffcd(0x433)]['General'];return _0x98dc23=(_0x55bf75[_0x29ffcd(0x164)]||'')+_0x98dc23+(_0x55bf75[_0x29ffcd(0x39b)]||''),_0x98dc23=_0x98dc23[_0x29ffcd(0x4ac)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x98dc23=_0x98dc23[_0x29ffcd(0x4ac)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x3336b7,_0x5601c2)=>this['getRandomTextFromPool'](_0x5601c2)),_0x98dc23;},VisuMZ['MessageCore'][_0x1d4f35(0x3c7)]=function(_0x43d93d){const _0x56c079=_0x1d4f35,_0x354043=_0x43d93d[_0x56c079(0x490)]('|')[_0x56c079(0x40b)](_0x1869e7=>_0x1869e7[_0x56c079(0x453)]())[_0x56c079(0x1a0)]('')[_0x56c079(0x1a0)](null);return _0x354043[Math['randomInt'](_0x354043['length'])];},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x2a9)]=function(){const _0x242c34=_0x1d4f35;if(this['currentCommand']()&&this['currentCommand']()[_0x242c34(0x2e9)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage['_texts'][_0x242c34(0x291)]>=$gameSystem[_0x242c34(0x19a)]()&&this[_0x242c34(0x417)]()!==0x191;},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x2d9)]=function(_0x34fff9){const _0x35f1a8=_0x1d4f35;switch(this[_0x35f1a8(0x417)]()){case 0x66:this[_0x35f1a8(0x326)]++,this['setupChoices'](this[_0x35f1a8(0x2b4)]()[_0x35f1a8(0x2e9)]);break;case 0x67:this[_0x35f1a8(0x326)]++,this[_0x35f1a8(0x47c)](this[_0x35f1a8(0x2b4)]()['parameters']);break;case 0x68:this[_0x35f1a8(0x326)]++,this[_0x35f1a8(0x430)](this[_0x35f1a8(0x2b4)]()[_0x35f1a8(0x2e9)]);break;case 0x165:const _0x3293f8=this[_0x35f1a8(0x1f1)][this[_0x35f1a8(0x326)]+0x1],_0x12b973=_0x3293f8[_0x35f1a8(0x2e9)];_0x12b973[0x0]===Game_Interpreter['MESSAGE_CORE_PLUGIN_NAME']&&this[_0x35f1a8(0x3ec)](_0x12b973);break;}},VisuMZ['MessageCore'][_0x1d4f35(0x1ac)]=Game_Interpreter['prototype']['setupChoices'],Game_Interpreter['prototype'][_0x1d4f35(0x300)]=function(_0x2c6623){const _0x46086c=_0x1d4f35;_0x2c6623=this['addContinuousShowChoices'](),VisuMZ['MessageCore']['Game_Interpreter_setupChoices'][_0x46086c(0x162)](this,_0x2c6623),$gameMessage[_0x46086c(0x2ce)]();},Game_Interpreter[_0x1d4f35(0x1be)]['addContinuousShowChoices']=function(){const _0x36a433=_0x1d4f35,_0x441338=this[_0x36a433(0x326)],_0x311015=[];let _0x4b1d2f=0x0;this[_0x36a433(0x326)]++;while(this[_0x36a433(0x326)]<this[_0x36a433(0x1f1)][_0x36a433(0x291)]){if(this[_0x36a433(0x2b4)]()['indent']===this[_0x36a433(0x40f)]){if(this[_0x36a433(0x2b4)]()['code']===0x194&&![0x66,0x6c,0x198]['includes'](this[_0x36a433(0x417)]()))break;else{if(this[_0x36a433(0x2b4)]()['code']===0x66)this[_0x36a433(0x203)](_0x4b1d2f,this[_0x36a433(0x2b4)](),_0x441338),this[_0x36a433(0x326)]-=0x2;else this[_0x36a433(0x2b4)]()['code']===0x192&&(this[_0x36a433(0x2b4)]()[_0x36a433(0x2e9)][0x0]=_0x4b1d2f,_0x4b1d2f++);}}this[_0x36a433(0x326)]++;}return this[_0x36a433(0x326)]=_0x441338,this['currentCommand']()[_0x36a433(0x2e9)];},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x203)]=function(_0x3e28f7,_0x298e6c,_0x2ba411){const _0x523ce2=_0x1d4f35;this[_0x523ce2(0x377)](_0x3e28f7,_0x298e6c,_0x2ba411),this[_0x523ce2(0x15b)](_0x3e28f7,_0x298e6c,_0x2ba411),this['addExtraShowChoices'](_0x298e6c,_0x2ba411);},Game_Interpreter['prototype'][_0x1d4f35(0x377)]=function(_0xdb92d2,_0x18f88e,_0x2cfbb5){const _0x468de1=_0x1d4f35;if(_0x18f88e[_0x468de1(0x2e9)][0x2]<0x0)return;const _0x13d109=_0x18f88e[_0x468de1(0x2e9)][0x2]+_0xdb92d2;this[_0x468de1(0x1f1)][_0x2cfbb5][_0x468de1(0x2e9)][0x2]=_0x13d109;},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x15b)]=function(_0x39e891,_0x885fa,_0x471f86){const _0x369b78=_0x1d4f35;if(_0x885fa[_0x369b78(0x2e9)][0x1]>=0x0){var _0x965990=_0x885fa[_0x369b78(0x2e9)][0x1]+_0x39e891;this['_list'][_0x471f86][_0x369b78(0x2e9)][0x1]=_0x965990;}else _0x885fa[_0x369b78(0x2e9)][0x1]===-0x2&&(this[_0x369b78(0x1f1)][_0x471f86][_0x369b78(0x2e9)][0x1]=_0x885fa[_0x369b78(0x2e9)][0x1]);},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x504)]=function(_0x52cf17,_0x427e45){const _0x5f3717=_0x1d4f35;for(const _0x345457 of _0x52cf17[_0x5f3717(0x2e9)][0x0]){this[_0x5f3717(0x1f1)][_0x427e45][_0x5f3717(0x2e9)][0x0][_0x5f3717(0x20a)](_0x345457);}this[_0x5f3717(0x1f1)][_0x5f3717(0x27a)](this[_0x5f3717(0x326)]-0x1,0x2);},Game_Interpreter['prototype'][_0x1d4f35(0x3ec)]=function(_0x40e6df){const _0x28f3b2=_0x1d4f35,_0x11913e=_0x40e6df[0x1];if(_0x11913e==='SelectWeapon')this[_0x28f3b2(0x326)]++,this[_0x28f3b2(0x29d)](_0x40e6df);else{if(_0x11913e==='SelectArmor')this[_0x28f3b2(0x326)]++,this[_0x28f3b2(0x478)](_0x40e6df);else _0x11913e===_0x28f3b2(0x3ed)&&Imported[_0x28f3b2(0x231)]&&(this[_0x28f3b2(0x326)]++,this[_0x28f3b2(0x286)](_0x40e6df));}},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x29d)]=function(_0x38c6d9){const _0x519ae6=_0x1d4f35,_0x49d269=JSON[_0x519ae6(0x341)](JSON[_0x519ae6(0x264)](_0x38c6d9[0x3]));VisuMZ[_0x519ae6(0x4ed)](_0x49d269,_0x49d269),$gameMessage['setWeaponChoice'](_0x49d269[_0x519ae6(0x279)]||0x0,_0x49d269[_0x519ae6(0x333)]||0x0);},Game_Interpreter[_0x1d4f35(0x1be)][_0x1d4f35(0x478)]=function(_0x28f53a){const _0x357281=_0x1d4f35,_0x68669f=JSON['parse'](JSON[_0x357281(0x264)](_0x28f53a[0x3]));VisuMZ[_0x357281(0x4ed)](_0x68669f,_0x68669f),$gameMessage[_0x357281(0x478)](_0x68669f[_0x357281(0x279)]||0x0,_0x68669f[_0x357281(0x1cb)]||0x0,_0x68669f['EquipTypeID']||0x0);},Game_Interpreter['prototype']['setSkillChoice']=function(_0x294d54){const _0x174f90=_0x1d4f35,_0x1c50a4=JSON[_0x174f90(0x341)](JSON['stringify'](_0x294d54[0x3]));VisuMZ['ConvertParams'](_0x1c50a4,_0x1c50a4),$gameMessage[_0x174f90(0x286)](_0x1c50a4[_0x174f90(0x279)]||0x0,_0x1c50a4['ActorID']||0x0,_0x1c50a4[_0x174f90(0x2c2)]||0x0);};function Game_MessageCommonEvent(){this['initialize'](...arguments);}Game_MessageCommonEvent['prototype'][_0x1d4f35(0x442)]=function(_0x5e9f4d,_0x37bc92){const _0x47e379=_0x1d4f35;this[_0x47e379(0x2d2)]=_0x5e9f4d,this[_0x47e379(0x4a4)]=_0x37bc92||0x0,this[_0x47e379(0x247)]();},Game_MessageCommonEvent[_0x1d4f35(0x1be)][_0x1d4f35(0x19b)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent['prototype'][_0x1d4f35(0x322)]=function(){const _0x2e7c66=_0x1d4f35;return this[_0x2e7c66(0x19b)]()[_0x2e7c66(0x322)];},Game_MessageCommonEvent[_0x1d4f35(0x1be)][_0x1d4f35(0x247)]=function(){const _0x19a82a=_0x1d4f35;this['_interpreter']=new Game_Interpreter(),this[_0x19a82a(0x328)][_0x19a82a(0x27d)](this[_0x19a82a(0x322)](),this[_0x19a82a(0x4a4)]);},Game_MessageCommonEvent[_0x1d4f35(0x1be)][_0x1d4f35(0x1db)]=function(){const _0x278180=_0x1d4f35;this[_0x278180(0x328)]&&(this[_0x278180(0x328)][_0x278180(0x2b3)]()?this[_0x278180(0x328)]['update']():this['clear']());},Game_MessageCommonEvent[_0x1d4f35(0x1be)][_0x1d4f35(0x1b2)]=function(){const _0xc58e8d=_0x1d4f35;this[_0xc58e8d(0x328)]=null;},Scene_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4c7)]=function(){const _0x25da9d=_0x1d4f35,_0x103119=Math[_0x25da9d(0x2f8)](Graphics[_0x25da9d(0x51f)],$gameSystem['getMessageWindowWidth']()),_0x432b40=$gameSystem['getMessageWindowRows'](),_0x5c24b7=this[_0x25da9d(0x226)](_0x432b40,![]),_0x51c527=(Graphics['boxWidth']-_0x103119)/0x2,_0x3ab291=0x0;return new Rectangle(_0x51c527,_0x3ab291,_0x103119,_0x5c24b7);},VisuMZ['MessageCore'][_0x1d4f35(0x48b)]=Scene_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x191)],Scene_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x191)]=function(){const _0x358150=_0x1d4f35;VisuMZ[_0x358150(0x1bb)][_0x358150(0x48b)][_0x358150(0x162)](this),this[_0x358150(0x285)]();},Scene_Message['prototype'][_0x1d4f35(0x285)]=function(){const _0x36df72=_0x1d4f35,_0x55649e=this['choiceListHelpWindowRect'](),_0x582fd4=new Window_Help(_0x55649e);_0x582fd4[_0x36df72(0x2a7)](),this['_choiceListWindow'][_0x36df72(0x3a4)](_0x582fd4),this[_0x36df72(0x545)]['setChoiceListHelpWindow'](_0x582fd4),this[_0x36df72(0x2be)](_0x582fd4),this['_choiceListHelpWindow']=_0x582fd4;},Scene_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x553)]=function(){const _0x27d9f4=_0x1d4f35,_0x4a35c2=0x0,_0x11a910=0x0,_0x512709=Graphics[_0x27d9f4(0x43a)],_0x25d82d=this[_0x27d9f4(0x226)](0x2,![]);return new Rectangle(_0x4a35c2,_0x11a910,_0x512709,_0x25d82d);},Window_Message[_0x1d4f35(0x1be)]['setChoiceListHelpWindow']=function(_0x453242){const _0x505151=_0x1d4f35;this[_0x505151(0x4cf)]=_0x453242;},Window_Message[_0x1d4f35(0x1be)]['updateChoiceListHelpWindowPlacement']=function(){const _0x108308=_0x1d4f35;if(!this[_0x108308(0x4cf)])return;const _0x166204=this[_0x108308(0x4cf)];_0x166204&&(_0x166204['y']=this['y']>0x0?0x0:Graphics[_0x108308(0x26b)]-_0x166204[_0x108308(0x470)]);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4f0)]=Scene_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x18b)],Scene_Options['prototype']['maxCommands']=function(){const _0x2c26c0=_0x1d4f35;let _0xba9eb0=VisuMZ[_0x2c26c0(0x1bb)][_0x2c26c0(0x4f0)][_0x2c26c0(0x162)](this);const _0x291173=VisuMZ[_0x2c26c0(0x1bb)][_0x2c26c0(0x433)];if(_0x291173['TextSpeed'][_0x2c26c0(0x3e8)]){_0x291173[_0x2c26c0(0x418)][_0x2c26c0(0x4f5)]&&TextManager[_0x2c26c0(0x228)]()&&_0xba9eb0++;if(_0x291173[_0x2c26c0(0x2e0)]['AddOption'])_0xba9eb0++;}return _0xba9eb0;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x281)]=Sprite_Picture[_0x1d4f35(0x1be)][_0x1d4f35(0x3de)],Sprite_Picture['prototype'][_0x1d4f35(0x3de)]=function(){const _0x41ff6f=_0x1d4f35;VisuMZ[_0x41ff6f(0x1bb)][_0x41ff6f(0x281)][_0x41ff6f(0x162)](this),this[_0x41ff6f(0x43d)]();},VisuMZ['MessageCore'][_0x1d4f35(0x3da)]=Sprite_Picture[_0x1d4f35(0x1be)]['update'],Sprite_Picture[_0x1d4f35(0x1be)][_0x1d4f35(0x1db)]=function(){const _0x2ee493=_0x1d4f35;VisuMZ[_0x2ee493(0x1bb)][_0x2ee493(0x3da)][_0x2ee493(0x162)](this),this[_0x2ee493(0x3e6)]();},Sprite_Picture[_0x1d4f35(0x1be)]['updatePictureText']=function(){const _0xf2fc05=_0x1d4f35;if(!this[_0xf2fc05(0x235)])return;this['resizePictureText'](),this[_0xf2fc05(0x4af)](),this[_0xf2fc05(0x20c)](),this['attachPictureText']();},Sprite_Picture[_0x1d4f35(0x1be)][_0x1d4f35(0x43d)]=function(){const _0x3dc875=_0x1d4f35;if(this[_0x3dc875(0x287)])return;if(this[_0x3dc875(0x16c)])return;const _0x1dc697=new Rectangle(0x0,0x0,0x0,0x0);this[_0x3dc875(0x287)]=new Window_Base(_0x1dc697),this[_0x3dc875(0x287)]['padding']=0x0,this[_0x3dc875(0x16c)]=new Sprite(),this[_0x3dc875(0x346)](this[_0x3dc875(0x16c)],0x0),this[_0x3dc875(0x1ea)]=0x0,this[_0x3dc875(0x342)]=0x0,this[_0x3dc875(0x23b)]={};},Sprite_Picture['prototype'][_0x1d4f35(0x4be)]=function(){const _0x1d4014=_0x1d4f35;if(!this[_0x1d4014(0x287)])return;if(this['_pictureTextWidth']===this[_0x1d4014(0x51f)]&&this['_pictureTextHeight']===this[_0x1d4014(0x470)])return;this['_pictureTextWidth']=this[_0x1d4014(0x51f)],this[_0x1d4014(0x342)]=this[_0x1d4014(0x470)],this[_0x1d4014(0x23b)]={},this['_pictureTextWindow'][_0x1d4014(0x4d3)](0x0,0x0,this[_0x1d4014(0x51f)],this[_0x1d4014(0x470)]);},Sprite_Picture[_0x1d4f35(0x1be)]['anchorPictureText']=function(){const _0x220edd=_0x1d4f35;if(!this[_0x220edd(0x16c)])return;this[_0x220edd(0x16c)][_0x220edd(0x35a)]['x']=this['anchor']['x'],this[_0x220edd(0x16c)]['anchor']['y']=this[_0x220edd(0x35a)]['y'];},Sprite_Picture[_0x1d4f35(0x1be)][_0x1d4f35(0x20c)]=function(){const _0x8f5533=_0x1d4f35;if(!this[_0x8f5533(0x287)])return;if(!this[_0x8f5533(0x397)]())return;const _0x54f9b0=[_0x8f5533(0x208),'up',_0x8f5533(0x53e),_0x8f5533(0x321),_0x8f5533(0x39d),_0x8f5533(0x193),_0x8f5533(0x24a),_0x8f5533(0x4b8),'lowerright'];this[_0x8f5533(0x287)]['createContents']();for(const _0x151a51 of _0x54f9b0){this['drawPictureTextZone'](_0x151a51);}},Sprite_Picture[_0x1d4f35(0x1be)]['anyPictureTextChanges']=function(){const _0xc02ada=_0x1d4f35;if($gameScreen[_0xc02ada(0x456)](this[_0xc02ada(0x336)]))return!![];const _0x19c55d=['upperleft','up',_0xc02ada(0x53e),_0xc02ada(0x321),_0xc02ada(0x39d),_0xc02ada(0x193),'lowerleft',_0xc02ada(0x4b8),_0xc02ada(0x24d)];for(const _0x148050 of _0x19c55d){const _0x31504e=$gameScreen['getPictureText'](this['_pictureId'],_0x148050);if(this[_0xc02ada(0x23b)][_0x148050]===_0x31504e)continue;return!![];}return![];},Sprite_Picture['prototype'][_0x1d4f35(0x20e)]=function(_0x4d84a3){const _0x31c782=_0x1d4f35;$gameScreen['clearPictureTextRefresh'](this[_0x31c782(0x336)]);const _0x403102=$gameScreen[_0x31c782(0x26f)](this['_pictureId'],_0x4d84a3);this['_pictureTextCache'][_0x4d84a3]=_0x403102;const _0x3b16b6=this['_pictureTextWindow'][_0x31c782(0x451)](_0x403102);let _0x160413=$gameScreen['getPictureTextBuffer'](this[_0x31c782(0x336)]),_0x2874a7=_0x160413,_0x24ef4c=_0x160413;if(['up',_0x31c782(0x39d),_0x31c782(0x4b8)][_0x31c782(0x54e)](_0x4d84a3))_0x2874a7=Math['floor']((this[_0x31c782(0x51f)]-_0x3b16b6[_0x31c782(0x51f)])/0x2);else[_0x31c782(0x53e),_0x31c782(0x193),'lowerright'][_0x31c782(0x54e)](_0x4d84a3)&&(_0x2874a7=Math[_0x31c782(0x37b)](this[_0x31c782(0x51f)]-_0x3b16b6[_0x31c782(0x51f)]-_0x160413));if(['left',_0x31c782(0x39d),_0x31c782(0x193)][_0x31c782(0x54e)](_0x4d84a3))_0x24ef4c=Math[_0x31c782(0x37b)]((this['height']-_0x3b16b6[_0x31c782(0x470)])/0x2);else['lowerleft',_0x31c782(0x4b8),'lowerright'][_0x31c782(0x54e)](_0x4d84a3)&&(_0x24ef4c=Math[_0x31c782(0x37b)](this[_0x31c782(0x470)]-_0x3b16b6[_0x31c782(0x470)]-_0x160413));this['_pictureTextWindow'][_0x31c782(0x1a4)](_0x403102,_0x2874a7,_0x24ef4c);},Sprite_Picture[_0x1d4f35(0x1be)][_0x1d4f35(0x1e8)]=function(){const _0x1c83a1=_0x1d4f35;if(!this[_0x1c83a1(0x287)])return;if(!this[_0x1c83a1(0x16c)])return;this['_pictureTextSprite'][_0x1c83a1(0x29e)]=this[_0x1c83a1(0x287)]['contents'];},VisuMZ[_0x1d4f35(0x1bb)]['Window_Base_initialize']=Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x442)],Window_Base[_0x1d4f35(0x1be)]['initialize']=function(_0xa2b0f2){const _0x45cff6=_0x1d4f35;this[_0x45cff6(0x1b7)](_0xa2b0f2),VisuMZ['MessageCore']['Window_Base_initialize'][_0x45cff6(0x162)](this,_0xa2b0f2);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1b7)]=function(_0x21fe10){const _0x7609ef=_0x1d4f35;this['initTextAlignement'](),this[_0x7609ef(0x42d)](),this[_0x7609ef(0x454)](_0x21fe10);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2a4)]=function(){const _0x3b7988=_0x1d4f35;this[_0x3b7988(0x519)](_0x3b7988(0x2ef));},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x519)]=function(_0x13f972){const _0x12c20e=_0x1d4f35;this[_0x12c20e(0x23c)]=_0x13f972;},Window_Base[_0x1d4f35(0x1be)]['getTextAlignment']=function(){const _0xfa508f=_0x1d4f35;return this[_0xfa508f(0x23c)];},VisuMZ[_0x1d4f35(0x1bb)]['Window_Base_textSizeEx']=Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x451)],Window_Base[_0x1d4f35(0x1be)]['textSizeEx']=function(_0x117108){const _0x2bf506=_0x1d4f35;return this[_0x2bf506(0x42d)](),VisuMZ[_0x2bf506(0x1bb)][_0x2bf506(0x45e)][_0x2bf506(0x162)](this,_0x117108);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4ad)]=function(_0x27193f){const _0x43d704=_0x1d4f35;return VisuMZ[_0x43d704(0x1bb)][_0x43d704(0x45e)][_0x43d704(0x162)](this,_0x27193f);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x2c4)]=Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4bb)],Window_Base[_0x1d4f35(0x1be)]['processAllText']=function(_0x3ee53e){const _0x2d6fc1=_0x1d4f35;VisuMZ[_0x2d6fc1(0x1bb)][_0x2d6fc1(0x2c4)][_0x2d6fc1(0x162)](this,_0x3ee53e);if(_0x3ee53e[_0x2d6fc1(0x312)])this[_0x2d6fc1(0x519)](_0x2d6fc1(0x2ef));},Window_Base[_0x1d4f35(0x1be)]['resetWordWrap']=function(){const _0x511a0e=_0x1d4f35;this[_0x511a0e(0x1a5)](![]);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x34d)]=function(){const _0x2b34b1=_0x1d4f35;return this[_0x2b34b1(0x426)];},Window_Base['prototype']['setWordWrap']=function(_0x591610){const _0x532689=_0x1d4f35;return this[_0x532689(0x426)]=_0x591610,'';},Window_Base[_0x1d4f35(0x1be)]['registerResetRect']=function(_0x1f9e52){const _0xbc5408=_0x1d4f35;this[_0xbc5408(0x1dd)]=JsonEx[_0xbc5408(0x542)](_0x1f9e52);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x530)]=function(){const _0x4fc607=_0x1d4f35;this[_0x4fc607(0x245)][_0x4fc607(0x25f)]=$gameSystem[_0x4fc607(0x431)](),this[_0x4fc607(0x245)][_0x4fc607(0x17e)]=$gameSystem['mainFontSize'](),this[_0x4fc607(0x245)][_0x4fc607(0x3df)]=![],this[_0x4fc607(0x245)][_0x4fc607(0x4c2)]=![],this[_0x4fc607(0x518)]=0x0,this[_0x4fc607(0x3e4)]=!![],this[_0x4fc607(0x2ad)]();},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2ad)]=function(){const _0x54a179=_0x1d4f35;this[_0x54a179(0x4bd)](ColorManager[_0x54a179(0x29b)]()),this[_0x54a179(0x232)](ColorManager['outlineColor']());const _0x43079d=VisuMZ['MessageCore']['Settings'][_0x54a179(0x213)];_0x43079d[_0x54a179(0x524)]===undefined&&(_0x43079d['DefaultOutlineWidth']=0x3),this[_0x54a179(0x245)][_0x54a179(0x2f0)]=_0x43079d[_0x54a179(0x524)],this[_0x54a179(0x3f2)](![]);},Window_Base[_0x1d4f35(0x1be)]['setColorLock']=function(_0x2f048e){this['_colorLock']=_0x2f048e;},Window_Base['prototype'][_0x1d4f35(0x2e6)]=function(){const _0x331684=_0x1d4f35;return this[_0x331684(0x3e7)];},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x15c)]=function(){return![];},Window_Base['prototype'][_0x1d4f35(0x529)]=function(){const _0x5805f0=_0x1d4f35,_0x3905aa=[_0x5805f0(0x25f),_0x5805f0(0x17e),_0x5805f0(0x3df),_0x5805f0(0x4c2),_0x5805f0(0x2f1),_0x5805f0(0x538),_0x5805f0(0x2f0),_0x5805f0(0x505)];let _0x25b840={};for(const _0xca3c53 of _0x3905aa){_0x25b840[_0xca3c53]=this[_0x5805f0(0x245)][_0xca3c53];}return _0x25b840;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x24f)]=function(_0x39152d){const _0x52edef=_0x1d4f35;for(const _0x940a99 in _0x39152d){this[_0x52edef(0x245)][_0x940a99]=_0x39152d[_0x940a99];}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x419)]=Window_Base['prototype'][_0x1d4f35(0x1db)],Window_Base[_0x1d4f35(0x1be)]['update']=function(){const _0x4ca4d7=_0x1d4f35;VisuMZ[_0x4ca4d7(0x1bb)][_0x4ca4d7(0x419)][_0x4ca4d7(0x162)](this),this[_0x4ca4d7(0x173)]();},Window_Base['prototype'][_0x1d4f35(0x523)]=function(){return![];},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x173)]=function(){const _0x42a2db=_0x1d4f35;this['_moveDuration']>0x0&&(this['canMove']()&&(this['x']=this[_0x42a2db(0x179)](this['x'],this[_0x42a2db(0x3b6)]),this['y']=this[_0x42a2db(0x179)](this['y'],this[_0x42a2db(0x183)]),this[_0x42a2db(0x51f)]=this[_0x42a2db(0x179)](this[_0x42a2db(0x51f)],this[_0x42a2db(0x1e7)]),this[_0x42a2db(0x470)]=this['applyMoveEasing'](this['height'],this['_moveTargetHeight']),this[_0x42a2db(0x1c5)]()),this[_0x42a2db(0x421)]--);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1c5)]=function(_0x4eafb6,_0x2e5ef7){const _0x5b691a=_0x1d4f35;!_0x4eafb6&&(this[_0x5b691a(0x51f)]=Math['min'](this[_0x5b691a(0x51f)],Graphics[_0x5b691a(0x51f)]),this[_0x5b691a(0x470)]=Math['min'](this[_0x5b691a(0x470)],Graphics[_0x5b691a(0x470)]));if(!_0x2e5ef7){const _0x5551d=-(Math[_0x5b691a(0x37b)](Graphics[_0x5b691a(0x51f)]-Graphics[_0x5b691a(0x43a)])/0x2),_0x57dac0=_0x5551d+Graphics[_0x5b691a(0x51f)]-this['width'],_0x11045f=-(Math[_0x5b691a(0x37b)](Graphics['height']-Graphics[_0x5b691a(0x26b)])/0x2),_0xf6bce=_0x11045f+Graphics[_0x5b691a(0x470)]-this[_0x5b691a(0x470)];this['x']=this['x'][_0x5b691a(0x25c)](_0x5551d,_0x57dac0),this['y']=this['y']['clamp'](_0x11045f,_0xf6bce);}},Window_Base['prototype'][_0x1d4f35(0x179)]=function(_0x34ec06,_0x32342b){const _0x48dd18=_0x1d4f35,_0x5c3b3f=this['_moveDuration'],_0x3e6973=this[_0x48dd18(0x46c)],_0x4eb377=this[_0x48dd18(0x1ae)]((_0x3e6973-_0x5c3b3f)/_0x3e6973),_0x3b9e2d=this[_0x48dd18(0x1ae)]((_0x3e6973-_0x5c3b3f+0x1)/_0x3e6973),_0x1a24ca=(_0x34ec06-_0x32342b*_0x4eb377)/(0x1-_0x4eb377);return _0x1a24ca+(_0x32342b-_0x1a24ca)*_0x3b9e2d;},Window_Base['prototype'][_0x1d4f35(0x1ae)]=function(_0x5d8fd1){const _0x54bdd0=_0x1d4f35,_0x34305c=0x2;switch(this[_0x54bdd0(0x1e1)]){case 0x0:return _0x5d8fd1;case 0x1:return this[_0x54bdd0(0x3b2)](_0x5d8fd1,_0x34305c);case 0x2:return this['easeOut'](_0x5d8fd1,_0x34305c);case 0x3:return this['easeInOut'](_0x5d8fd1,_0x34305c);default:return Imported[_0x54bdd0(0x1b6)]?VisuMZ[_0x54bdd0(0x179)](_0x5d8fd1,this['_moveEasingType']):_0x5d8fd1;}},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x437)]=function(_0x1e3870,_0x1ecc98,_0x354346,_0x202604,_0x3d3aa7,_0x54fb00){const _0x47ccc8=_0x1d4f35;this['_moveTargetX']=_0x1e3870,this[_0x47ccc8(0x183)]=_0x1ecc98,this[_0x47ccc8(0x1e7)]=_0x354346||this[_0x47ccc8(0x51f)],this[_0x47ccc8(0x3cd)]=_0x202604||this['height'],this[_0x47ccc8(0x421)]=_0x3d3aa7||0x1;if(this[_0x47ccc8(0x421)]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x47ccc8(0x1e1)]=_0x54fb00||0x0;if(_0x3d3aa7<=0x0)this[_0x47ccc8(0x173)]();},Window_Base['prototype'][_0x1d4f35(0x385)]=function(_0x4488f9,_0x204b9b,_0x36d9ed,_0x5b387a,_0x446492,_0x323c84){const _0x37a88f=_0x1d4f35;this[_0x37a88f(0x3b6)]=this['x']+_0x4488f9,this[_0x37a88f(0x183)]=this['y']+_0x204b9b,this['_moveTargetWidth']=this['width']+(_0x36d9ed||0x0),this['_moveTargetHeight']=this[_0x37a88f(0x470)]+(_0x5b387a||0x0),this[_0x37a88f(0x421)]=_0x446492||0x1;if(this['_moveDuration']<=0x0)this[_0x37a88f(0x421)]=0x1;this[_0x37a88f(0x46c)]=this[_0x37a88f(0x421)],this[_0x37a88f(0x1e1)]=_0x323c84||0x0;if(_0x446492<=0x0)this['updateMove']();},Window_Base[_0x1d4f35(0x1be)]['resetRect']=function(_0x1d7b9d,_0x1b5b64){const _0x34bea3=_0x1d4f35;this[_0x34bea3(0x437)](this[_0x34bea3(0x1dd)]['x'],this[_0x34bea3(0x1dd)]['y'],this['_resetRect'][_0x34bea3(0x51f)],this[_0x34bea3(0x1dd)][_0x34bea3(0x470)],_0x1d7b9d,_0x1b5b64);},VisuMZ[_0x1d4f35(0x1bb)]['Window_Base_changeTextColor']=Window_Base['prototype'][_0x1d4f35(0x4bd)],Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4bd)]=function(_0x38bf55){const _0x4d8ca0=_0x1d4f35;if(this[_0x4d8ca0(0x2e6)]())return;_0x38bf55=_0x38bf55[_0x4d8ca0(0x4ac)](/\,/g,''),this[_0x4d8ca0(0x2d7)]=this[_0x4d8ca0(0x2d7)]||[],this[_0x4d8ca0(0x2d7)][_0x4d8ca0(0x382)](this[_0x4d8ca0(0x245)][_0x4d8ca0(0x2f1)]),VisuMZ[_0x4d8ca0(0x1bb)][_0x4d8ca0(0x547)][_0x4d8ca0(0x162)](this,_0x38bf55);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2ee)]=function(_0x366078){const _0x2ed899=_0x1d4f35;this[_0x2ed899(0x45d)](_0x366078);if(this['isColorLocked']())return;_0x366078[_0x2ed899(0x312)]&&(this[_0x2ed899(0x2d7)]=this[_0x2ed899(0x2d7)]||[],this[_0x2ed899(0x245)][_0x2ed899(0x2f1)]=this[_0x2ed899(0x2d7)][_0x2ed899(0x181)]()||ColorManager[_0x2ed899(0x29b)]());},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3a6)]=function(_0x43838c){const _0x5bbed1=_0x1d4f35;return _0x43838c=this[_0x5bbed1(0x347)](_0x43838c),_0x43838c=this[_0x5bbed1(0x1fa)](_0x43838c),_0x43838c=this[_0x5bbed1(0x3ae)](_0x43838c),_0x43838c=this[_0x5bbed1(0x306)](_0x43838c),_0x43838c=this[_0x5bbed1(0x365)](_0x43838c),_0x43838c=this['convertShowChoiceEscapeCodes'](_0x43838c),_0x43838c=this[_0x5bbed1(0x48c)](_0x43838c),_0x43838c=this[_0x5bbed1(0x4a0)](_0x43838c),_0x43838c=this[_0x5bbed1(0x2bc)](_0x43838c),_0x43838c=this['convertCasingEscapeCharacters'](_0x43838c),_0x43838c=this[_0x5bbed1(0x475)](_0x43838c),_0x43838c=this[_0x5bbed1(0x1d4)](_0x43838c),_0x43838c=this[_0x5bbed1(0x301)](_0x43838c),_0x43838c=this[_0x5bbed1(0x4b7)](_0x43838c),_0x43838c=this[_0x5bbed1(0x39e)](_0x43838c),_0x43838c=this[_0x5bbed1(0x3ae)](_0x43838c),_0x43838c=this[_0x5bbed1(0x448)](_0x43838c),_0x43838c=this[_0x5bbed1(0x1f8)](_0x43838c),_0x43838c;},Window_Base['prototype']['convertTextMacros']=function(_0x15aa34){const _0x4c8c60=_0x1d4f35;this[_0x4c8c60(0x443)]=![];for(const _0x1e12be of VisuMZ['MessageCore'][_0x4c8c60(0x433)][_0x4c8c60(0x432)]){_0x15aa34&&_0x15aa34[_0x4c8c60(0x1f2)](_0x1e12be['textCodeCheck'])&&(this[_0x4c8c60(0x443)]=!![],_0x15aa34=_0x15aa34['replace'](_0x1e12be[_0x4c8c60(0x4b5)],_0x1e12be[_0x4c8c60(0x168)][_0x4c8c60(0x3e9)](this)));}return _0x15aa34||'';},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1fa)]=function(_0x3761da){const _0xb4fd55=_0x1d4f35;return _0x3761da=_0x3761da[_0xb4fd55(0x4ac)](/\\/g,'\x1b'),_0x3761da=_0x3761da[_0xb4fd55(0x4ac)](/\x1b\x1b/g,'\x5c'),_0x3761da;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3ae)]=function(_0x18c7be){const _0x48b240=_0x1d4f35;for(;;){if(_0x18c7be[_0x48b240(0x1f2)](/\\V\[(\d+)\]/gi))_0x18c7be=_0x18c7be[_0x48b240(0x4ac)](/\\V\[(\d+)\]/gi,(_0x21f429,_0x235363)=>this[_0x48b240(0x1fa)](String($gameVariables[_0x48b240(0x292)](parseInt(_0x235363)))));else{if(_0x18c7be[_0x48b240(0x1f2)](/\x1bV\[(\d+)\]/gi))_0x18c7be=_0x18c7be['replace'](/\x1bV\[(\d+)\]/gi,(_0x2b5050,_0x12b066)=>this['convertBackslashCharacters'](String($gameVariables[_0x48b240(0x292)](parseInt(_0x12b066)))));else break;}}return _0x18c7be;},Window_Base[_0x1d4f35(0x1be)]['convertButtonAssistEscapeCharacters']=function(_0x4d1b9c){const _0x931d52=_0x1d4f35;return Imported['VisuMZ_0_CoreEngine']&&(_0x4d1b9c=_0x4d1b9c['replace'](/<Up (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('up')),_0x4d1b9c=_0x4d1b9c['replace'](/<Left (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)]('left')),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<Right (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('right')),_0x4d1b9c=_0x4d1b9c['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('down')),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)]('ok')),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<Cancel (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)](_0x931d52(0x182))),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('menu')),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)](_0x931d52(0x181))),_0x4d1b9c=_0x4d1b9c['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)](_0x931d52(0x21c))),_0x4d1b9c=_0x4d1b9c[_0x931d52(0x4ac)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x931d52(0x1e4)](_0x931d52(0x54a)))),_0x4d1b9c;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1e4)]=function(_0x5288b1){const _0x4412e9=_0x1d4f35;let _0x28d375=TextManager[_0x4412e9(0x2ff)](_0x5288b1)||'';return _0x28d375=this[_0x4412e9(0x1fa)](_0x28d375),_0x28d375=this['convertVariableEscapeCharacters'](_0x28d375),_0x28d375[_0x4412e9(0x453)]();},Window_Base['prototype']['preConvertEscapeCharacters']=function(_0x192c6d){const _0x226e7a=_0x1d4f35;return _0x192c6d=this['switchOutTextForLocalization'](_0x192c6d),this[_0x226e7a(0x1f4)](),_0x192c6d;},Window_Base['prototype'][_0x1d4f35(0x49e)]=function(_0x84a539){const _0x5ca7b2=_0x1d4f35;return _0x84a539=TextManager[_0x5ca7b2(0x2b9)](_0x84a539),_0x84a539;},VisuMZ[_0x1d4f35(0x1bb)]['String_format']=String[_0x1d4f35(0x1be)][_0x1d4f35(0x52e)],String[_0x1d4f35(0x1be)][_0x1d4f35(0x52e)]=function(){const _0x1228d8=_0x1d4f35;let _0x5e65e8=this;return _0x5e65e8=TextManager['parseLocalizedText'](_0x5e65e8),VisuMZ[_0x1228d8(0x1bb)][_0x1228d8(0x165)][_0x1228d8(0x52b)](_0x5e65e8,arguments);},VisuMZ['MessageCore'][_0x1d4f35(0x215)]=Bitmap['prototype'][_0x1d4f35(0x3eb)],Bitmap[_0x1d4f35(0x1be)][_0x1d4f35(0x3eb)]=function(_0x4ef15a,_0x4030c6,_0x5355d9,_0xdcf332,_0x48fc,_0x1409b5){const _0x39cb49=_0x1d4f35;_0x4ef15a=TextManager[_0x39cb49(0x2b9)](_0x4ef15a),VisuMZ[_0x39cb49(0x1bb)][_0x39cb49(0x215)][_0x39cb49(0x162)](this,_0x4ef15a,_0x4030c6,_0x5355d9,_0xdcf332,_0x48fc,_0x1409b5);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x407)]=Bitmap[_0x1d4f35(0x1be)][_0x1d4f35(0x462)],Bitmap[_0x1d4f35(0x1be)]['drawTextTopAligned']=function(_0x20fa13,_0x4c928b,_0x237d69,_0x2ec382,_0x2a449c,_0x3c176f){const _0x5a2929=_0x1d4f35;_0x20fa13=TextManager[_0x5a2929(0x2b9)](_0x20fa13),VisuMZ[_0x5a2929(0x1bb)]['Bitmap_drawTextTopAligned'][_0x5a2929(0x162)](this,_0x20fa13,_0x4c928b,_0x237d69,_0x2ec382,_0x2a449c,_0x3c176f);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x39e)]=function(_0x2a5645){return _0x2a5645;},Window_Base['prototype'][_0x1d4f35(0x2d0)]=function(_0x111ffc){const _0x4d6bb9=_0x1d4f35;return this[_0x4d6bb9(0x241)]()&&(_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x111ffc=_0x111ffc['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x111ffc=_0x111ffc['replace'](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x111ffc=_0x111ffc[_0x4d6bb9(0x4ac)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x111ffc;},Window_Base['prototype']['isChoiceWindow']=function(){const _0x8c978f=_0x1d4f35,_0x5a051a=[_0x8c978f(0x2bf),_0x8c978f(0x435)];return _0x5a051a[_0x8c978f(0x54e)](this['constructor'][_0x8c978f(0x46b)]);},Window_Base[_0x1d4f35(0x1be)]['convertFontSettingsEscapeCharacters']=function(_0x50195d){const _0x173ca8=_0x1d4f35;return _0x50195d=_0x50195d[_0x173ca8(0x4ac)](/<B>/gi,'\x1bBOLD[1]'),_0x50195d=_0x50195d['replace'](/<\/B>/gi,'\x1bBOLD[0]'),_0x50195d=_0x50195d[_0x173ca8(0x4ac)](/<I>/gi,_0x173ca8(0x265)),_0x50195d=_0x50195d[_0x173ca8(0x4ac)](/<\/I>/gi,_0x173ca8(0x4b2)),_0x50195d;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4a0)]=function(_0x5376d1){const _0x9765ea=_0x1d4f35;return _0x5376d1=_0x5376d1['replace'](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x5376d1=_0x5376d1['replace'](/<\/LEFT>/gi,_0x9765ea(0x3bb)),_0x5376d1=_0x5376d1['replace'](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x5376d1=_0x5376d1[_0x9765ea(0x4ac)](/<\/CENTER>/gi,_0x9765ea(0x3bb)),_0x5376d1=_0x5376d1[_0x9765ea(0x4ac)](/<RIGHT>/gi,_0x9765ea(0x202)),_0x5376d1=_0x5376d1[_0x9765ea(0x4ac)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x5376d1;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2bc)]=function(_0x40e6b3){const _0x43d737=_0x1d4f35;return _0x40e6b3=_0x40e6b3[_0x43d737(0x4ac)](/<COLORLOCK>/gi,_0x43d737(0x54b)),_0x40e6b3=_0x40e6b3[_0x43d737(0x4ac)](/<\/COLORLOCK>/gi,_0x43d737(0x4c5)),_0x40e6b3=_0x40e6b3[_0x43d737(0x4ac)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x40e6b3=_0x40e6b3[_0x43d737(0x4ac)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x40e6b3;},Window_Base[_0x1d4f35(0x1be)]['convertCasingEscapeCharacters']=function(_0x260484){const _0x27904c=_0x1d4f35;return _0x260484=_0x260484[_0x27904c(0x4ac)](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[1]'),_0x260484=_0x260484[_0x27904c(0x4ac)](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[0]'),_0x260484=_0x260484['replace'](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x27904c(0x1e6)),_0x260484=_0x260484[_0x27904c(0x4ac)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x27904c(0x358)),_0x260484=_0x260484[_0x27904c(0x4ac)](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x27904c(0x243)),_0x260484=_0x260484['replace'](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x27904c(0x358)),_0x260484=_0x260484[_0x27904c(0x4ac)](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[4]'),_0x260484=_0x260484[_0x27904c(0x4ac)](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x27904c(0x358)),_0x260484=_0x260484[_0x27904c(0x4ac)](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x27904c(0x4a7)),_0x260484=_0x260484[_0x27904c(0x4ac)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[0]'),_0x260484;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x475)]=function(_0x207196){const _0x3a68e4=_0x1d4f35;return _0x207196=_0x207196[_0x3a68e4(0x4ac)](/\x1bN\[(\d+)\]/gi,(_0x16503f,_0x5e57c2)=>this[_0x3a68e4(0x3d9)](parseInt(_0x5e57c2))),_0x207196=_0x207196[_0x3a68e4(0x4ac)](/\x1bP\[(\d+)\]/gi,(_0x22380d,_0x1badc4)=>this['partyMemberName'](parseInt(_0x1badc4))),_0x207196=_0x207196['replace'](/\x1bG/gi,TextManager[_0x3a68e4(0x3e1)]),_0x207196;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1d4)]=function(_0x2dc020){const _0x12e950=_0x1d4f35;return _0x2dc020=_0x2dc020['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x12e950(0x26a)]()),_0x2dc020=_0x2dc020[_0x12e950(0x4ac)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x12e950(0x43e)]()),_0x2dc020=_0x2dc020[_0x12e950(0x4ac)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x2dc020=_0x2dc020[_0x12e950(0x4ac)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x12e950(0x513)](![])),_0x2dc020;},Window_Base['prototype'][_0x1d4f35(0x26a)]=function(){const _0x3d6eb5=_0x1d4f35;if(!SceneManager[_0x3d6eb5(0x548)]())return'';if(BattleManager['_target'])return BattleManager[_0x3d6eb5(0x1eb)][_0x3d6eb5(0x46b)]();if(BattleManager[_0x3d6eb5(0x1b9)][0x0])return BattleManager[_0x3d6eb5(0x1b9)][0x0][_0x3d6eb5(0x46b)]();return'';},Window_Base[_0x1d4f35(0x1be)]['battleUserName']=function(){const _0x271255=_0x1d4f35;if(!SceneManager[_0x271255(0x548)]())return'';let _0x3a0b3f=null;return _0x3a0b3f=BattleManager[_0x271255(0x373)],!_0x3a0b3f&&BattleManager[_0x271255(0x29c)]()&&(_0x3a0b3f=BattleManager[_0x271255(0x167)]()),_0x3a0b3f?_0x3a0b3f['name']():'';},Window_Base[_0x1d4f35(0x1be)]['battleActionName']=function(_0x2a8f6e){const _0x2bb91c=_0x1d4f35;if(!SceneManager[_0x2bb91c(0x548)]())return'';let _0xf7de1a=BattleManager['_action']||null;!_0xf7de1a&&BattleManager['isInputting']()&&(_0xf7de1a=BattleManager['inputtingAction']());if(_0xf7de1a&&_0xf7de1a[_0x2bb91c(0x4f7)]()){let _0x29c77a='';if(_0x2a8f6e)_0x29c77a+=_0x2bb91c(0x37d)[_0x2bb91c(0x52e)](_0xf7de1a[_0x2bb91c(0x4f7)]()[_0x2bb91c(0x4ef)]);return _0x29c77a+=_0xf7de1a[_0x2bb91c(0x4f7)]()[_0x2bb91c(0x46b)],_0x29c77a;}return'';},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x301)]=function(_0x28de77){const _0x4fc010=_0x1d4f35;for(const _0x47c257 of VisuMZ[_0x4fc010(0x1bb)][_0x4fc010(0x433)]['TextCodeActions']){_0x28de77[_0x4fc010(0x1f2)](_0x47c257[_0x4fc010(0x4b5)])&&(_0x28de77=_0x28de77[_0x4fc010(0x4ac)](_0x47c257[_0x4fc010(0x4b5)],_0x47c257[_0x4fc010(0x168)]),_0x28de77=this['convertVariableEscapeCharacters'](_0x28de77));}return _0x28de77;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4b7)]=function(_0x5ec9a2){const _0x4effb7=_0x1d4f35;for(const _0x315107 of VisuMZ[_0x4effb7(0x1bb)]['Settings'][_0x4effb7(0x3ad)]){_0x5ec9a2['match'](_0x315107[_0x4effb7(0x4b5)])&&(_0x5ec9a2=_0x5ec9a2[_0x4effb7(0x4ac)](_0x315107[_0x4effb7(0x4b5)],_0x315107[_0x4effb7(0x168)][_0x4effb7(0x3e9)](this)),_0x5ec9a2=this[_0x4effb7(0x3ae)](_0x5ec9a2));}return _0x5ec9a2;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3d9)]=function(_0x124f64){const _0x439999=_0x1d4f35,_0x2d7460=_0x124f64>=0x1?$gameActors[_0x439999(0x167)](_0x124f64):null,_0x8905ac=_0x2d7460?_0x2d7460[_0x439999(0x46b)]():'',_0x3babcf=Number(VisuMZ['MessageCore']['Settings']['AutoColor'][_0x439999(0x299)]);return this['isAutoColorAffected']()&&_0x3babcf!==0x0?_0x439999(0x517)['format'](_0x3babcf,_0x8905ac):_0x8905ac;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1ba)]=function(_0x2fb7ce){const _0x4aeec6=_0x1d4f35,_0x5e7622=_0x2fb7ce>=0x1?$gameParty[_0x4aeec6(0x408)]()[_0x2fb7ce-0x1]:null,_0x13c07b=_0x5e7622?_0x5e7622[_0x4aeec6(0x46b)]():'',_0x7b89=Number(VisuMZ['MessageCore']['Settings'][_0x4aeec6(0x1ed)]['Actors']);return this['isAutoColorAffected']()&&_0x7b89!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x7b89,_0x13c07b):_0x13c07b;},Window_Base[_0x1d4f35(0x1be)]['processAutoColorWords']=function(_0x254041){const _0x3175d6=_0x1d4f35;return this[_0x3175d6(0x15c)]()&&(_0x254041=this[_0x3175d6(0x320)](_0x254041),_0x254041=this['processActorNameAutoColorChanges'](_0x254041)),_0x254041;},Window_Base[_0x1d4f35(0x1be)]['processStoredAutoColorChanges']=function(_0x320f17){const _0x29d01f=_0x1d4f35;for(autoColor of VisuMZ[_0x29d01f(0x1bb)][_0x29d01f(0x274)]){_0x320f17=_0x320f17['replace'](autoColor[0x0],autoColor[0x1]);}return _0x320f17;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x17c)]=function(){const _0x9df5df=_0x1d4f35;this[_0x9df5df(0x38e)]=[];},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1f4)]=function(){const _0x3ae0e5=_0x1d4f35;this['clearActorNameAutoColor']();const _0x42d835=VisuMZ[_0x3ae0e5(0x1bb)][_0x3ae0e5(0x433)]['AutoColor'],_0x55fda1=_0x42d835[_0x3ae0e5(0x299)];if(_0x55fda1<=0x0)return;for(const _0x326b53 of $gameActors[_0x3ae0e5(0x41d)]){if(!_0x326b53)continue;const _0x2c25ed=_0x326b53[_0x3ae0e5(0x46b)]();if(_0x2c25ed[_0x3ae0e5(0x453)]()[_0x3ae0e5(0x291)]<=0x0)continue;if(/^\d+$/[_0x3ae0e5(0x455)](_0x2c25ed))continue;if(_0x2c25ed[_0x3ae0e5(0x1f2)](/-----/i))continue;let _0xad2767=VisuMZ[_0x3ae0e5(0x1bb)][_0x3ae0e5(0x434)](_0x2c25ed);const _0x2b5a80=new RegExp('\x5cb'+_0xad2767+'\x5cb','g'),_0x16bcb0=_0x3ae0e5(0x517)[_0x3ae0e5(0x52e)](_0x55fda1,_0x2c25ed);this['_autoColorActorNames']['push']([_0x2b5a80,_0x16bcb0]);}},Window_Base['prototype'][_0x1d4f35(0x4c4)]=function(_0x122809){const _0x12d4e7=_0x1d4f35;this[_0x12d4e7(0x38e)]===undefined&&this[_0x12d4e7(0x1f4)]();for(autoColor of this['_autoColorActorNames']){_0x122809=_0x122809[_0x12d4e7(0x4ac)](autoColor[0x0],autoColor[0x1]);}return _0x122809;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4ff)]=function(_0x28db37,_0x48f74c,_0x24cabd){const _0x2abf5b=_0x1d4f35;if(!_0x28db37)return'';const _0x3c0e5c=_0x28db37[_0x48f74c];let _0x16237a='';if(_0x3c0e5c&&_0x24cabd&&_0x3c0e5c[_0x2abf5b(0x4ef)]){const _0x2f4067='\x1bi[%1]%2';_0x16237a=_0x2f4067['format'](_0x3c0e5c[_0x2abf5b(0x4ef)],_0x3c0e5c[_0x2abf5b(0x46b)]);}else _0x3c0e5c?_0x16237a=_0x3c0e5c[_0x2abf5b(0x46b)]:_0x16237a='';return _0x16237a=TextManager['parseLocalizedText'](_0x16237a),this[_0x2abf5b(0x15c)]()&&(_0x16237a=this[_0x2abf5b(0x4cb)](_0x16237a,_0x28db37)),_0x16237a;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x188)]=function(){const _0x54cf53=_0x1d4f35,_0x52f183=$gameParty[_0x54cf53(0x366)]();if(_0x52f183['id']<0x0)return'';let _0x3913a7=null;if(_0x52f183['type']===0x0)_0x3913a7=$dataItems[_0x52f183['id']];if(_0x52f183[_0x54cf53(0x4e1)]===0x1)_0x3913a7=$dataWeapons[_0x52f183['id']];if(_0x52f183[_0x54cf53(0x4e1)]===0x2)_0x3913a7=$dataArmors[_0x52f183['id']];if(!_0x3913a7)return'';return'\x1bi[%1]'[_0x54cf53(0x52e)](_0x3913a7[_0x54cf53(0x4ef)]);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2b0)]=function(_0x2f07ff){const _0x579dac=_0x1d4f35,_0x56a5b1=$gameParty['getLastGainedItemData']();if(_0x56a5b1['id']<0x0)return'';let _0x220aa1=null;if(_0x56a5b1[_0x579dac(0x4e1)]===0x0)_0x220aa1=$dataItems[_0x56a5b1['id']];if(_0x56a5b1[_0x579dac(0x4e1)]===0x1)_0x220aa1=$dataWeapons[_0x56a5b1['id']];if(_0x56a5b1[_0x579dac(0x4e1)]===0x2)_0x220aa1=$dataArmors[_0x56a5b1['id']];if(!_0x220aa1)return'';let _0x211399=_0x220aa1[_0x579dac(0x46b)]||'';return TextManager[_0x579dac(0x228)]()&&(_0x211399=TextManager[_0x579dac(0x2b9)](_0x211399)),_0x2f07ff?'\x1bi[%1]%2'[_0x579dac(0x52e)](_0x220aa1[_0x579dac(0x4ef)],_0x211399):_0x211399;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1e5)]=function(){const _0x56c83e=_0x1d4f35,_0x383e60=$gameParty[_0x56c83e(0x366)]();if(_0x383e60['id']<=0x0)return'';return _0x383e60[_0x56c83e(0x2fd)];},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4cb)]=function(_0x41903c,_0x166958){const _0x3df49a=_0x1d4f35,_0xcfef04=VisuMZ[_0x3df49a(0x1bb)][_0x3df49a(0x433)][_0x3df49a(0x1ed)];let _0x43d945=0x0;if(_0x166958===$dataActors)_0x43d945=_0xcfef04['Actors'];if(_0x166958===$dataClasses)_0x43d945=_0xcfef04['Classes'];if(_0x166958===$dataSkills)_0x43d945=_0xcfef04['Skills'];if(_0x166958===$dataItems)_0x43d945=_0xcfef04[_0x3df49a(0x270)];if(_0x166958===$dataWeapons)_0x43d945=_0xcfef04[_0x3df49a(0x466)];if(_0x166958===$dataArmors)_0x43d945=_0xcfef04['Armors'];if(_0x166958===$dataEnemies)_0x43d945=_0xcfef04[_0x3df49a(0x4d8)];if(_0x166958===$dataStates)_0x43d945=_0xcfef04[_0x3df49a(0x224)];return _0x43d945>0x0&&(_0x41903c=_0x3df49a(0x517)['format'](_0x43d945,_0x41903c)),_0x41903c;},Window_Base['prototype']['prepareWordWrapEscapeCharacters']=function(_0x5691f2){const _0x36af7d=_0x1d4f35;if(_0x5691f2[_0x36af7d(0x54e)]('\x1bTEXTALIGNMENT'))return this['setWordWrap'](![]),_0x5691f2=_0x5691f2['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x5691f2;_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0xc4aac5,_0x25a1b6)=>this[_0x36af7d(0x1a5)](!![])),_0x5691f2=_0x5691f2['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x2890a7,_0x5bb0d7)=>this[_0x36af7d(0x1a5)](![])),_0x5691f2=_0x5691f2['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x12c93f,_0x158fe2)=>this[_0x36af7d(0x1a5)](![]));if(_0x5691f2[_0x36af7d(0x1f2)](Window_Message['_autoSizeRegexp']))this[_0x36af7d(0x1a5)](![]);else _0x5691f2[_0x36af7d(0x1f2)](Window_Message[_0x36af7d(0x33c)])&&this[_0x36af7d(0x1a5)](![]);if(!this[_0x36af7d(0x34d)]())return _0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x5691f2;if(_0x5691f2[_0x36af7d(0x291)]<=0x0)return _0x5691f2;return _0x5691f2[_0x36af7d(0x1f2)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x5691f2=VisuMZ['MessageCore'][_0x36af7d(0x3a9)](_0x5691f2)[_0x36af7d(0x276)]('')),VisuMZ[_0x36af7d(0x1bb)][_0x36af7d(0x433)][_0x36af7d(0x53c)][_0x36af7d(0x1d7)]?(_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/[\n\r]+/g,'\x20'),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/[\n\r]+/g,''),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x5691f2=this[_0x36af7d(0x2e3)](_0x5691f2),_0x5691f2=_0x5691f2[_0x36af7d(0x490)]('\x20')[_0x36af7d(0x276)](_0x36af7d(0x360)),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5691f2=_0x5691f2[_0x36af7d(0x4ac)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5691f2;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x3a9)]=function(_0x40ce6b){const _0x25b075=_0x1d4f35;let _0xf10a01=[],_0x5f477b='';while(_0x40ce6b[_0x25b075(0x291)]>0x0){const _0x709613=_0x40ce6b['charAt'](0x0);_0x40ce6b=_0x40ce6b['slice'](0x1),_0x709613['match'](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x5f477b[_0x25b075(0x291)]>0x0&&(_0xf10a01['push'](_0x5f477b),_0x5f477b=''),_0xf10a01[_0x25b075(0x20a)](_0x709613+'\x1bWrapJpBreak[0]')):_0x5f477b+=_0x709613;}return _0x5f477b['length']>0x0&&(_0xf10a01[_0x25b075(0x20a)](_0x5f477b),_0x5f477b=''),_0xf10a01;},Window_Base['prototype'][_0x1d4f35(0x2e3)]=function(_0x12c76d){return _0x12c76d;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x1bd)]=Window_Base['prototype'][_0x1d4f35(0x176)],Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x176)]=function(_0x37cb97){const _0x795611=_0x1d4f35;VisuMZ[_0x795611(0x1bb)][_0x795611(0x1bd)][_0x795611(0x162)](this,_0x37cb97),this['processTextAlignmentX'](_0x37cb97);},Window_Base[_0x1d4f35(0x1be)]['processCharacter']=function(_0x275086){const _0x5e9846=_0x1d4f35;let _0x3033df=_0x275086[_0x5e9846(0x2b7)][_0x275086['index']++];if(_0x3033df['charCodeAt'](0x0)<0x20)this['flushTextState'](_0x275086),this[_0x5e9846(0x3ac)](_0x275086,_0x3033df);else{if(this['_textCasing']===0x1)_0x3033df=_0x3033df[_0x5e9846(0x486)]();if(this[_0x5e9846(0x518)]===0x2){if(this[_0x5e9846(0x3e4)])_0x3033df=_0x3033df[_0x5e9846(0x1e9)]();this[_0x5e9846(0x3e4)]=/\s/[_0x5e9846(0x455)](_0x3033df);}if(this['_textCasing']===0x3)_0x3033df=_0x3033df[_0x5e9846(0x1e9)]();this['_textCasing']===0x4&&(_0x3033df=this['_lastAltCase']?_0x3033df['toUpperCase']():_0x3033df[_0x5e9846(0x486)](),this[_0x5e9846(0x4f3)]=!this[_0x5e9846(0x4f3)]),this[_0x5e9846(0x518)]===0x5&&(_0x3033df=Math[_0x5e9846(0x201)]()<0.5?_0x3033df[_0x5e9846(0x1e9)]():_0x3033df[_0x5e9846(0x486)]()),_0x275086[_0x5e9846(0x17b)]+=_0x3033df;}},VisuMZ[_0x1d4f35(0x1bb)]['Window_Base_processControlCharacter']=Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3ac)],Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3ac)]=function(_0x404976,_0x529e36){const _0xd075ca=_0x1d4f35;VisuMZ[_0xd075ca(0x1bb)][_0xd075ca(0x1f9)]['call'](this,_0x404976,_0x529e36);if(_0x529e36===_0xd075ca(0x360))this[_0xd075ca(0x1ff)](_0x404976);else _0x529e36===_0xd075ca(0x334)&&this[_0xd075ca(0x1ff)](_0x404976,!![]);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1fd)]=function(_0x94d97){const _0x123a6f=_0x1d4f35;var _0x4cd64c=/^\<(.*?)\>/['exec'](_0x94d97[_0x123a6f(0x2b7)][_0x123a6f(0x3f5)](_0x94d97[_0x123a6f(0x3f9)]));return _0x4cd64c?(_0x94d97['index']+=_0x4cd64c[0x0][_0x123a6f(0x291)],String(_0x4cd64c[0x0][_0x123a6f(0x3f5)](0x1,_0x4cd64c[0x0][_0x123a6f(0x291)]-0x1))):'';},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x1f7)]=Window_Base[_0x1d4f35(0x1be)]['processEscapeCharacter'],Window_Base['prototype']['processEscapeCharacter']=function(_0x5c54e5,_0x501458){const _0x1bd268=_0x1d4f35;switch(_0x5c54e5){case'C':_0x501458[_0x1bd268(0x312)]?VisuMZ[_0x1bd268(0x1bb)][_0x1bd268(0x1f7)][_0x1bd268(0x162)](this,_0x5c54e5,_0x501458):this[_0x1bd268(0x45d)](_0x501458);break;case'I':case'{':case'}':VisuMZ['MessageCore'][_0x1bd268(0x1f7)][_0x1bd268(0x162)](this,_0x5c54e5,_0x501458);break;case'FS':this[_0x1bd268(0x43f)](_0x501458);break;case'PX':this['processPxTextCode'](_0x501458);break;case'PY':this[_0x1bd268(0x187)](_0x501458);break;case _0x1bd268(0x2b6):this[_0x1bd268(0x4ce)](this['obtainEscapeParam'](_0x501458));break;case _0x1bd268(0x51c):this[_0x1bd268(0x2dc)](_0x501458);break;case _0x1bd268(0x1a2):this['processDrawCenteredPicture'](_0x501458);break;case'COLORLOCK':this['processColorLock'](_0x501458);break;case _0x1bd268(0x35f):this[_0x1bd268(0x25b)](_0x501458);break;case _0x1bd268(0x495):this['processFontChangeItalic'](this[_0x1bd268(0x45d)](_0x501458));break;case'PICTURE':this['processDrawPicture'](_0x501458);break;case'PREVCOLOR':this[_0x1bd268(0x2ee)](_0x501458);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0x501458);break;case'WAIT':this[_0x1bd268(0x254)](_0x501458);break;case _0x1bd268(0x3af):this[_0x1bd268(0x1ff)](_0x501458);break;case'WRAPJPBREAK':this['processWrapBreak'](_0x501458,!![]);break;default:this[_0x1bd268(0x4a9)](_0x5c54e5,_0x501458);}},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x4a9)]=function(_0x14da6c,_0x320e9d){const _0x55f089=_0x1d4f35;for(const _0x416c1e of VisuMZ[_0x55f089(0x1bb)]['Settings'][_0x55f089(0x280)]){if(_0x416c1e[_0x55f089(0x3b1)]===_0x14da6c){if(_0x416c1e[_0x55f089(0x429)]==='')this[_0x55f089(0x45d)](_0x320e9d);_0x416c1e['ActionJS'][_0x55f089(0x162)](this,_0x320e9d);if(this[_0x55f089(0x544)]===Window_Message){const _0x158f04=_0x416c1e['CommonEvent']||0x0;if(_0x158f04>0x0)this['launchMessageCommonEvent'](_0x158f04);}}}},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x356)]=function(){const _0x3a44ae=_0x1d4f35;this[_0x3a44ae(0x245)]['fontSize']+=VisuMZ[_0x3a44ae(0x1bb)][_0x3a44ae(0x433)][_0x3a44ae(0x213)][_0x3a44ae(0x483)],this[_0x3a44ae(0x245)][_0x3a44ae(0x17e)]=Math[_0x3a44ae(0x2f8)](this[_0x3a44ae(0x245)]['fontSize'],VisuMZ[_0x3a44ae(0x1bb)][_0x3a44ae(0x433)][_0x3a44ae(0x213)][_0x3a44ae(0x4bc)]);},Window_Base['prototype'][_0x1d4f35(0x1ab)]=function(){const _0x452e8f=_0x1d4f35;this[_0x452e8f(0x245)]['fontSize']-=VisuMZ['MessageCore'][_0x452e8f(0x433)][_0x452e8f(0x213)]['FontChangeValue'],this[_0x452e8f(0x245)][_0x452e8f(0x17e)]=Math[_0x452e8f(0x1ad)](this[_0x452e8f(0x245)][_0x452e8f(0x17e)],VisuMZ['MessageCore'][_0x452e8f(0x433)][_0x452e8f(0x213)]['FontSmallerCap']);},Window_Base['prototype'][_0x1d4f35(0x43f)]=function(_0x28ac51){const _0x22ea3e=_0x1d4f35,_0x544bcf=this[_0x22ea3e(0x45d)](_0x28ac51);this[_0x22ea3e(0x245)]['fontSize']=_0x544bcf[_0x22ea3e(0x25c)](VisuMZ[_0x22ea3e(0x1bb)][_0x22ea3e(0x433)][_0x22ea3e(0x213)][_0x22ea3e(0x438)],VisuMZ[_0x22ea3e(0x1bb)]['Settings'][_0x22ea3e(0x213)]['FontBiggerCap']);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1a8)]=function(_0x157c03){const _0x18e36d=_0x1d4f35;let _0x16b5ea=this[_0x18e36d(0x245)][_0x18e36d(0x17e)];const _0x4fd3d5=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x4f5fd7=_0x4fd3d5[_0x18e36d(0x386)](_0x157c03);if(!_0x4f5fd7)break;const _0xf54559=String(_0x4f5fd7[0x1])[_0x18e36d(0x1e9)]();if(_0xf54559==='{')this[_0x18e36d(0x356)]();else{if(_0xf54559==='}')this[_0x18e36d(0x1ab)]();else _0xf54559==='FS'&&(this[_0x18e36d(0x245)][_0x18e36d(0x17e)]=parseInt(_0x4f5fd7[0x3])[_0x18e36d(0x25c)](VisuMZ['MessageCore']['Settings'][_0x18e36d(0x213)]['FontSmallerCap'],VisuMZ[_0x18e36d(0x1bb)][_0x18e36d(0x433)]['General'][_0x18e36d(0x4bc)]));}this[_0x18e36d(0x245)][_0x18e36d(0x17e)]>_0x16b5ea&&(_0x16b5ea=this['contents']['fontSize']);}return _0x16b5ea;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x24e)]=function(_0x4f280b){const _0x5886e5=_0x1d4f35;_0x4f280b['x']=this['obtainEscapeParam'](_0x4f280b),VisuMZ[_0x5886e5(0x1bb)][_0x5886e5(0x433)][_0x5886e5(0x213)][_0x5886e5(0x3ee)]&&(_0x4f280b['x']+=_0x4f280b[_0x5886e5(0x4f9)]);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x187)]=function(_0xcaeb3c){const _0xc54cb3=_0x1d4f35;_0xcaeb3c['y']=this['obtainEscapeParam'](_0xcaeb3c),VisuMZ[_0xc54cb3(0x1bb)][_0xc54cb3(0x433)][_0xc54cb3(0x213)][_0xc54cb3(0x3ee)]&&(_0xcaeb3c['y']+=_0xcaeb3c[_0xc54cb3(0x51d)]);},Window_Base[_0x1d4f35(0x1be)]['processFontChangeBold']=function(_0x204fdb){const _0x58fcb3=_0x1d4f35;this['contents'][_0x58fcb3(0x3df)]=!!_0x204fdb;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x263)]=function(_0x4fcf5a){const _0x1e01b3=_0x1d4f35;this[_0x1e01b3(0x245)][_0x1e01b3(0x4c2)]=!!_0x4fcf5a;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x363)]=function(_0x5857cf){const _0x559789=_0x1d4f35,_0x17aae9=this[_0x559789(0x45d)](_0x5857cf);if(!_0x5857cf['drawing'])return;switch(_0x17aae9){case 0x0:this['setTextAlignment'](_0x559789(0x2ef));return;case 0x1:this[_0x559789(0x519)](_0x559789(0x321));break;case 0x2:this['setTextAlignment'](_0x559789(0x39d));break;case 0x3:this[_0x559789(0x519)](_0x559789(0x193));break;}this[_0x559789(0x3d6)](_0x5857cf);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3d6)]=function(_0x3e83f8){const _0x5cdef4=_0x1d4f35;if(!_0x3e83f8[_0x5cdef4(0x312)])return;if(_0x3e83f8[_0x5cdef4(0x1dc)])return;if(this['getTextAlignment']()===_0x5cdef4(0x2ef))return;let _0x57710d=_0x3e83f8[_0x5cdef4(0x2b7)][_0x5cdef4(0x1ee)](_0x5cdef4(0x4fa),_0x3e83f8[_0x5cdef4(0x3f9)]+0x1),_0x1770d6=_0x3e83f8['text'][_0x5cdef4(0x1ee)]('\x0a',_0x3e83f8[_0x5cdef4(0x3f9)]+0x1);if(_0x57710d<0x0)_0x57710d=_0x3e83f8[_0x5cdef4(0x2b7)]['length']+0x1;if(_0x1770d6>0x0)_0x57710d=Math[_0x5cdef4(0x2f8)](_0x57710d,_0x1770d6);const _0x2da4e3=_0x3e83f8['text'][_0x5cdef4(0x3e5)](_0x3e83f8[_0x5cdef4(0x3f9)],_0x57710d),_0x3c1b7f=this[_0x5cdef4(0x294)](_0x2da4e3)[_0x5cdef4(0x51f)],_0xb1e804=_0x3e83f8[_0x5cdef4(0x51f)]||this[_0x5cdef4(0x348)]-0x8,_0x3877ed=this[_0x5cdef4(0x544)]===Window_Message&&$gameMessage[_0x5cdef4(0x28a)]()!=='';switch(this[_0x5cdef4(0x225)]()){case _0x5cdef4(0x321):_0x3e83f8['x']=_0x3e83f8[_0x5cdef4(0x4f9)];break;case _0x5cdef4(0x39d):_0x3e83f8['x']=_0x3e83f8[_0x5cdef4(0x4f9)],_0x3e83f8['x']+=Math[_0x5cdef4(0x37b)]((_0xb1e804-_0x3c1b7f)/0x2);_0x3877ed&&(_0x3e83f8['x']-=_0x3e83f8[_0x5cdef4(0x4f9)]/0x2);break;case _0x5cdef4(0x193):_0x3e83f8['x']=_0xb1e804-_0x3c1b7f+_0x3e83f8[_0x5cdef4(0x4f9)];_0x3877ed&&(_0x3e83f8['x']-=_0x3e83f8[_0x5cdef4(0x4f9)]);break;}},Window_Base['prototype'][_0x1d4f35(0x294)]=function(_0x5e8c34){const _0x40faa3=_0x1d4f35;_0x5e8c34=_0x5e8c34[_0x40faa3(0x4ac)](/\x1b!/g,''),_0x5e8c34=_0x5e8c34[_0x40faa3(0x4ac)](/\x1b\|/g,''),_0x5e8c34=_0x5e8c34[_0x40faa3(0x4ac)](/\x1b\./g,'');const _0x206e8c=this['createTextState'](_0x5e8c34,0x0,0x0,0x0),_0x1adcbc=this[_0x40faa3(0x529)]();return _0x206e8c['drawing']=![],this[_0x40faa3(0x4bb)](_0x206e8c),this[_0x40faa3(0x24f)](_0x1adcbc),{'width':_0x206e8c[_0x40faa3(0x1cd)],'height':_0x206e8c[_0x40faa3(0x237)]};},Window_Base[_0x1d4f35(0x384)]=VisuMZ[_0x1d4f35(0x1bb)]['Settings']['WordWrap']['EndPadding']||0x0,Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x1ff)]=function(_0x2b00d4,_0x1b8120){const _0x154f18=_0x1d4f35,_0x2a376b=(_0x2b00d4[_0x154f18(0x1dc)]?-0x1:0x1)*this[_0x154f18(0x441)]('\x20');if(!_0x1b8120)_0x2b00d4['x']+=_0x2a376b;if(this['obtainEscapeParam'](_0x2b00d4)>0x0&&!_0x1b8120)_0x2b00d4['x']+=_0x2a376b;if(_0x2b00d4[_0x154f18(0x1dc)])return;let _0x606c26;_0x1b8120?_0x606c26=_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x1ee)](_0x154f18(0x334),_0x2b00d4['index']+0x1):_0x606c26=_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x1ee)](_0x154f18(0x360),_0x2b00d4[_0x154f18(0x3f9)]+0x1);let _0x1a02ad=_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x1ee)]('\x0a',_0x2b00d4['index']+0x1);if(_0x606c26<0x0)_0x606c26=_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x291)]+0x1;if(_0x1a02ad>0x0)_0x606c26=Math[_0x154f18(0x2f8)](_0x606c26,_0x1a02ad);const _0x3434ee=_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x3e5)](_0x2b00d4[_0x154f18(0x3f9)],_0x606c26),_0x18d1c3=this[_0x154f18(0x405)](_0x3434ee)[_0x154f18(0x51f)];let _0x17998f=_0x2b00d4[_0x154f18(0x51f)]||this[_0x154f18(0x348)];_0x17998f-=Window_Base['WORD_WRAP_PADDING'];if(this['constructor']===Window_Message){const _0x6616ea=$gameMessage[_0x154f18(0x28a)]()===''?0x0:ImageManager[_0x154f18(0x3ea)]+0x14;_0x17998f-=_0x6616ea,VisuMZ[_0x154f18(0x1bb)]['Settings'][_0x154f18(0x53c)][_0x154f18(0x3fa)]&&(_0x17998f-=_0x6616ea);}let _0x11cfb0=![];_0x2b00d4['x']+_0x18d1c3>_0x2b00d4[_0x154f18(0x4f9)]+_0x17998f&&(_0x11cfb0=!![]),_0x18d1c3===0x0&&(_0x11cfb0=![]),_0x11cfb0&&(_0x2b00d4[_0x154f18(0x2b7)]=_0x2b00d4['text'][_0x154f18(0x3f5)](0x0,_0x2b00d4['index'])+'\x0a'+_0x2b00d4[_0x154f18(0x2b7)][_0x154f18(0x27c)](_0x2b00d4[_0x154f18(0x3f9)]));},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x405)]=function(_0x31bb97){const _0x15a48d=_0x1d4f35,_0x3fc3c8=this[_0x15a48d(0x4ec)](_0x31bb97,0x0,0x0,0x0),_0x48cc44=this[_0x15a48d(0x529)]();return _0x3fc3c8[_0x15a48d(0x312)]=![],this[_0x15a48d(0x1a5)](![]),this[_0x15a48d(0x4bb)](_0x3fc3c8),this[_0x15a48d(0x1a5)](!![]),this[_0x15a48d(0x24f)](_0x48cc44),{'width':_0x3fc3c8[_0x15a48d(0x1cd)],'height':_0x3fc3c8['outputHeight']};},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x25b)]=function(_0x2ea4a4){const _0xe063bc=_0x1d4f35;return this[_0xe063bc(0x45d)](_0x2ea4a4);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x209)]=function(_0xef790b){const _0x39461e=_0x1d4f35,_0x21bfbc=this[_0x39461e(0x1fd)](_0xef790b)[_0x39461e(0x490)](',');if(!_0xef790b[_0x39461e(0x312)])return;const _0x151579=_0x21bfbc[0x0][_0x39461e(0x453)](),_0xa9a1=_0x21bfbc[0x1]||0x0,_0x2ad4fd=_0x21bfbc[0x2]||0x0,_0x3635d3=ImageManager[_0x39461e(0x42a)](_0x151579),_0x4715e1=this[_0x39461e(0x245)][_0x39461e(0x505)];_0x3635d3[_0x39461e(0x389)](this[_0x39461e(0x409)][_0x39461e(0x3e9)](this,_0x3635d3,_0xef790b['x'],_0xef790b['y'],_0xa9a1,_0x2ad4fd,_0x4715e1));},Window_Base['prototype']['drawBackPicture']=function(_0x898d9,_0x3f1250,_0x280e65,_0x5155b8,_0x569441,_0xb298ac){const _0x155577=_0x1d4f35;_0x5155b8=_0x5155b8||_0x898d9[_0x155577(0x51f)],_0x569441=_0x569441||_0x898d9[_0x155577(0x470)],this[_0x155577(0x502)]['paintOpacity']=_0xb298ac,this[_0x155577(0x502)][_0x155577(0x30e)](_0x898d9,0x0,0x0,_0x898d9[_0x155577(0x51f)],_0x898d9[_0x155577(0x470)],_0x3f1250,_0x280e65,_0x5155b8,_0x569441),this[_0x155577(0x502)]['paintOpacity']=0xff;},Window_Base['prototype'][_0x1d4f35(0x1af)]=function(_0x20dbd6){const _0x53bcf4=_0x1d4f35,_0x2f6bc0=this['obtainEscapeString'](_0x20dbd6)['split'](',');if(!_0x20dbd6[_0x53bcf4(0x312)])return;const _0x28fc1a=_0x2f6bc0[0x0][_0x53bcf4(0x453)](),_0x2e5dc2=ImageManager[_0x53bcf4(0x42a)](_0x28fc1a),_0x3700fe=JsonEx['makeDeepCopy'](_0x20dbd6),_0x3f60e2=this[_0x53bcf4(0x245)][_0x53bcf4(0x505)];_0x2e5dc2['addLoadListener'](this['drawBackCenteredPicture'][_0x53bcf4(0x3e9)](this,_0x2e5dc2,_0x3700fe,_0x3f60e2));},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3d4)]=function(_0x41c149,_0x4196c8,_0x577638){const _0x565e4f=_0x1d4f35,_0xee29d0=_0x4196c8[_0x565e4f(0x51f)]||this[_0x565e4f(0x348)],_0x4222cc=this[_0x565e4f(0x326)]!==undefined?this['itemHeight']():this[_0x565e4f(0x44c)],_0x42f591=_0xee29d0/_0x41c149[_0x565e4f(0x51f)],_0x3faa95=_0x4222cc/_0x41c149[_0x565e4f(0x470)],_0x1f1c23=Math[_0x565e4f(0x2f8)](_0x42f591,_0x3faa95,0x1),_0x4a35c5=this['_index']!==undefined?(this[_0x565e4f(0x1cf)](0x0)[_0x565e4f(0x470)]-this[_0x565e4f(0x4c3)]())/0x2:0x0,_0x3cf680=_0x41c149[_0x565e4f(0x51f)]*_0x1f1c23,_0xd1c62f=_0x41c149[_0x565e4f(0x470)]*_0x1f1c23,_0x1bcaf2=Math[_0x565e4f(0x37b)]((_0xee29d0-_0x3cf680)/0x2)+_0x4196c8[_0x565e4f(0x4f9)],_0x2eda94=Math['floor']((_0x4222cc-_0xd1c62f)/0x2)+_0x4196c8[_0x565e4f(0x51d)]-_0x4a35c5*0x2;this['contentsBack'][_0x565e4f(0x505)]=_0x577638,this[_0x565e4f(0x502)][_0x565e4f(0x30e)](_0x41c149,0x0,0x0,_0x41c149[_0x565e4f(0x51f)],_0x41c149[_0x565e4f(0x470)],_0x1bcaf2,_0x2eda94,_0x3cf680,_0xd1c62f),this[_0x565e4f(0x502)][_0x565e4f(0x505)]=0xff;},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x248)]=function(_0x436d07){const _0x2dc7b8=_0x1d4f35,_0x598dc4=this[_0x2dc7b8(0x45d)](_0x436d07);if(_0x436d07[_0x2dc7b8(0x312)])this[_0x2dc7b8(0x3f2)](_0x598dc4>0x0);},Window_Base['prototype'][_0x1d4f35(0x254)]=function(_0xccc606){const _0x501306=_0x1d4f35,_0x1cf52d=this['obtainEscapeParam'](_0xccc606);this['constructor']===Window_Message&&_0xccc606[_0x501306(0x312)]&&this[_0x501306(0x302)](_0x1cf52d);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2dc)]=function(_0x5e598e){const _0x12ff43=_0x1d4f35;this[_0x12ff43(0x518)]=this['obtainEscapeParam'](_0x5e598e),this['_textCasingUpperState']=!![],this['_lastAltCase']=!![];},VisuMZ['MessageCore'][_0x1d4f35(0x207)]=function(_0x502ef0){const _0x47ef43=_0x1d4f35;if($gameTemp[_0x47ef43(0x535)]()){let _0x4837ac=_0x47ef43(0x335)[_0x47ef43(0x52e)](_0x502ef0[_0x47ef43(0x544)]['name']);alert(_0x4837ac),SceneManager['exit']();}},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x3d5)]=function(){const _0x3dee82=_0x1d4f35;VisuMZ[_0x3dee82(0x1bb)][_0x3dee82(0x207)](this);},Window_Base[_0x1d4f35(0x1be)]['drawMessageFace']=function(){const _0x54b03f=_0x1d4f35;VisuMZ[_0x54b03f(0x1bb)][_0x54b03f(0x207)](this);},Window_Base[_0x1d4f35(0x1be)][_0x1d4f35(0x2df)]=function(){const _0x19f5ae=_0x1d4f35;VisuMZ[_0x19f5ae(0x1bb)]['NonSupportedTextCodes'](this);},Window_Help[_0x1d4f35(0x1be)][_0x1d4f35(0x42d)]=function(){const _0x559883=_0x1d4f35;this['setWordWrap']($gameSystem[_0x559883(0x2c7)]());},Window_Help[_0x1d4f35(0x1be)][_0x1d4f35(0x15c)]=function(){return!![];},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x275)]=Window_Help[_0x1d4f35(0x1be)][_0x1d4f35(0x247)],Window_Help[_0x1d4f35(0x1be)]['refresh']=function(){const _0x933542=_0x1d4f35;this[_0x933542(0x17c)]();if(this[_0x933542(0x502)])this[_0x933542(0x502)]['clear']();VisuMZ['MessageCore']['Window_Help_refresh'][_0x933542(0x162)](this),this[_0x933542(0x42d)]();},VisuMZ['MessageCore'][_0x1d4f35(0x4ab)]=Window_Options['prototype'][_0x1d4f35(0x27e)],Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x27e)]=function(){const _0x15392a=_0x1d4f35;VisuMZ['MessageCore']['Window_Options_addGeneralOptions']['call'](this),this[_0x15392a(0x4e7)]();},Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x4e7)]=function(){const _0x128c57=_0x1d4f35;VisuMZ[_0x128c57(0x1bb)]['Settings'][_0x128c57(0x418)][_0x128c57(0x4f5)]&&TextManager[_0x128c57(0x228)]()&&this[_0x128c57(0x4b0)](),VisuMZ['MessageCore'][_0x128c57(0x433)][_0x128c57(0x2e0)][_0x128c57(0x4f5)]&&this[_0x128c57(0x318)]();},Window_Options['prototype']['addMessageCoreLocalizationCommand']=function(){const _0x4ce166=_0x1d4f35,_0x438677=TextManager[_0x4ce166(0x3db)],_0xe6e662=_0x4ce166(0x296);this[_0x4ce166(0x293)](_0x438677,_0xe6e662);},Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x318)]=function(){const _0x5b690f=_0x1d4f35,_0x1a36be=TextManager[_0x5b690f(0x35c)],_0x1bbfe4='textSpeed';this[_0x5b690f(0x293)](_0x1a36be,_0x1bbfe4);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x1d1)]=Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x498)],Window_Options[_0x1d4f35(0x1be)]['statusText']=function(_0x293544){const _0x41f31d=_0x1d4f35,_0x45ec0f=this[_0x41f31d(0x445)](_0x293544);if(_0x45ec0f===_0x41f31d(0x296))return this[_0x41f31d(0x2f7)]();if(_0x45ec0f===_0x41f31d(0x23d))return this[_0x41f31d(0x36f)]();return VisuMZ[_0x41f31d(0x1bb)][_0x41f31d(0x1d1)][_0x41f31d(0x162)](this,_0x293544);},Window_Options['prototype'][_0x1d4f35(0x2f7)]=function(){const _0x3cfd3e=_0x1d4f35,_0x352f8f=ConfigManager[_0x3cfd3e(0x296)];return TextManager[_0x3cfd3e(0x32d)](_0x352f8f);},Window_Options['prototype'][_0x1d4f35(0x36f)]=function(){const _0x1bf986=_0x1d4f35,_0x46e42e=this[_0x1bf986(0x3bc)](_0x1bf986(0x23d));return _0x46e42e>0xa?TextManager['instantTextSpeed']:_0x46e42e;},VisuMZ[_0x1d4f35(0x1bb)]['Window_Options_isVolumeSymbol']=Window_Options['prototype']['isVolumeSymbol'],Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x38a)]=function(_0x13982d){const _0x24b89a=_0x1d4f35;if(_0x13982d===_0x24b89a(0x296))return!![];if(_0x13982d===_0x24b89a(0x23d))return!![];return VisuMZ[_0x24b89a(0x1bb)]['Window_Options_isVolumeSymbol'][_0x24b89a(0x162)](this,_0x13982d);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x4f8)]=Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x3ab)],Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x3ab)]=function(_0x1236c2,_0x5106ed,_0x31bd73){const _0x3434f4=_0x1d4f35;if(_0x1236c2===_0x3434f4(0x296))return this[_0x3434f4(0x398)](_0x5106ed,_0x31bd73);if(_0x1236c2===_0x3434f4(0x23d))return this[_0x3434f4(0x27f)](_0x1236c2,_0x5106ed,_0x31bd73);VisuMZ['MessageCore'][_0x3434f4(0x4f8)]['call'](this,_0x1236c2,_0x5106ed,_0x31bd73);},Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x398)]=function(_0x5e9893,_0x4e15e4){const _0x18b72d=_0x1d4f35,_0x528d99=VisuMZ[_0x18b72d(0x1bb)]['Settings']['Localization'][_0x18b72d(0x31d)]||[],_0x3e5e89=ConfigManager[_0x18b72d(0x296)];let _0x44a5d8=_0x528d99[_0x18b72d(0x1ee)](_0x3e5e89);_0x44a5d8+=_0x5e9893?0x1:-0x1;if(_0x44a5d8>=_0x528d99['length'])_0x44a5d8=_0x4e15e4?0x0:_0x528d99[_0x18b72d(0x291)]-0x1;if(_0x44a5d8<0x0)_0x44a5d8=_0x4e15e4?_0x528d99[_0x18b72d(0x291)]-0x1:0x0;this[_0x18b72d(0x45b)](_0x18b72d(0x296),_0x528d99[_0x44a5d8]);},Window_Options[_0x1d4f35(0x1be)][_0x1d4f35(0x27f)]=function(_0xe7ad6e,_0x302199,_0x2c1923){const _0x152144=_0x1d4f35,_0x59cabb=this[_0x152144(0x3bc)](_0xe7ad6e),_0x124aa7=0x1,_0x4c9ac5=_0x59cabb+(_0x302199?_0x124aa7:-_0x124aa7);_0x4c9ac5>0xb&&_0x2c1923?this[_0x152144(0x45b)](_0xe7ad6e,0x1):this['changeValue'](_0xe7ad6e,_0x4c9ac5[_0x152144(0x25c)](0x1,0xb));},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x30b)]=function(){const _0x36e4f7=_0x1d4f35;let _0x4be044=Window_Base[_0x36e4f7(0x1be)][_0x36e4f7(0x30b)][_0x36e4f7(0x162)](this);return _0x4be044-=this['addedHeight'](),_0x4be044;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4e9)]=function(){const _0x39b784=_0x1d4f35;Window_Base['prototype'][_0x39b784(0x4e9)]['call'](this),VisuMZ[_0x39b784(0x1bb)][_0x39b784(0x433)]['General'][_0x39b784(0x319)]&&this[_0x39b784(0x3a2)]();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x3a2)]=function(){const _0x5aed8d=_0x1d4f35;this[_0x5aed8d(0x1d9)]['x']=Math[_0x5aed8d(0x52f)](this[_0x5aed8d(0x51f)]/0x2),this[_0x5aed8d(0x1d9)][_0x5aed8d(0x35a)]['x']=0.5,this['_dimmerSprite']['scale']['x']=Graphics[_0x5aed8d(0x51f)];},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x3dc)]=Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x357)],Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x357)]=function(){const _0x844c38=_0x1d4f35;VisuMZ[_0x844c38(0x1bb)][_0x844c38(0x3dc)][_0x844c38(0x162)](this),this[_0x844c38(0x17c)](),this[_0x844c38(0x42d)](),this['setColorLock'](![]),this[_0x844c38(0x519)](_0x844c38(0x2ef)),this['setTextDelay'](VisuMZ[_0x844c38(0x1bb)][_0x844c38(0x433)][_0x844c38(0x213)][_0x844c38(0x2da)]);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x42d)]=function(){this['setWordWrap']($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x15c)]=function(){return!![];},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x2df)]=function(_0x13e4e7){const _0x707a0d=_0x1d4f35,_0x118f90=0xb-ConfigManager[_0x707a0d(0x23d)];_0x13e4e7=Math[_0x707a0d(0x52f)](_0x13e4e7*_0x118f90),this[_0x707a0d(0x53f)]=_0x13e4e7,this[_0x707a0d(0x33d)]=_0x13e4e7;},VisuMZ['MessageCore']['Window_Message_isTriggered']=Window_Message[_0x1d4f35(0x1be)]['isTriggered'],Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x1c6)]=function(){const _0x301255=_0x1d4f35;return VisuMZ[_0x301255(0x1bb)][_0x301255(0x4f2)][_0x301255(0x162)](this)||Input['isPressed'](VisuMZ['MessageCore'][_0x301255(0x433)][_0x301255(0x213)][_0x301255(0x402)]);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x204)]=Window_Message['prototype'][_0x1d4f35(0x267)],Window_Message[_0x1d4f35(0x1be)]['updatePlacement']=function(){const _0x430549=_0x1d4f35;let _0x436e55=this['y'];this['x']=Math['round']((Graphics[_0x430549(0x43a)]-this[_0x430549(0x51f)])/0x2),VisuMZ[_0x430549(0x1bb)][_0x430549(0x204)][_0x430549(0x162)](this);if(this['_autoPositionTarget'])this['y']=_0x436e55;this[_0x430549(0x252)](),this[_0x430549(0x33a)](),this[_0x430549(0x1c5)](),this[_0x430549(0x521)]();},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x458)]=Window_Message['prototype']['newPage'],Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x2c9)]=function(_0x1ed18c){const _0xe0a060=_0x1d4f35;this[_0xe0a060(0x2a0)](_0x1ed18c),this[_0xe0a060(0x4de)](_0x1ed18c),VisuMZ[_0xe0a060(0x1bb)]['Window_Message_newPage'][_0xe0a060(0x162)](this,_0x1ed18c),this['createContents']();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x2a0)]=function(_0xc46570){const _0x359f50=_0x1d4f35;if(!_0xc46570)return;this[_0x359f50(0x37c)]=![],_0xc46570['text']=this[_0x359f50(0x347)](_0xc46570[_0x359f50(0x2b7)]),this[_0x359f50(0x443)]&&(_0xc46570['text']=this[_0x359f50(0x1f8)](_0xc46570['text']),this[_0x359f50(0x37c)]=!![]);},Window_Message[_0x1d4f35(0x1be)]['prepareWordWrapEscapeCharacters']=function(_0x27401d){const _0x2c08e5=_0x1d4f35;if(this['_macroBypassWordWrap'])return _0x27401d;return Window_Base[_0x2c08e5(0x1be)]['prepareWordWrapEscapeCharacters'][_0x2c08e5(0x162)](this,_0x27401d);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4de)]=function(_0x23bf68){const _0x1ce1f6=_0x1d4f35;this[_0x1ce1f6(0x4eb)](_0x23bf68),this[_0x1ce1f6(0x537)](_0x23bf68),this[_0x1ce1f6(0x28c)]();},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x218)]=Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x390)],Window_Message['prototype'][_0x1d4f35(0x390)]=function(){const _0x3abbfb=_0x1d4f35;VisuMZ[_0x3abbfb(0x1bb)][_0x3abbfb(0x218)][_0x3abbfb(0x162)](this),this[_0x3abbfb(0x357)]();if(this[_0x3abbfb(0x403)])this[_0x3abbfb(0x2fe)]();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x28c)]=function(){const _0x44c245=_0x1d4f35;this['width']=$gameSystem[_0x44c245(0x512)]()+this['addedWidth']();;this[_0x44c245(0x51f)]=Math['min'](Graphics['width'],this[_0x44c245(0x51f)]);const _0x16c7d1=$gameSystem[_0x44c245(0x19a)]();this['height']=SceneManager[_0x44c245(0x46f)][_0x44c245(0x226)](_0x16c7d1,![])+this[_0x44c245(0x38d)](),this[_0x44c245(0x470)]=Math[_0x44c245(0x2f8)](Graphics[_0x44c245(0x470)],this[_0x44c245(0x470)]);if($gameTemp[_0x44c245(0x2cb)])this[_0x44c245(0x4d9)]();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4bf)]=function(){return 0x0;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x38d)]=function(){return 0x0;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4d9)]=function(){const _0x182d71=_0x1d4f35;this['x']=(Graphics[_0x182d71(0x43a)]-this['width'])/0x2,$gameTemp[_0x182d71(0x2cb)]=undefined,this[_0x182d71(0x1c5)]();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x173)]=function(){const _0x44a109=_0x1d4f35,_0x54d1fe={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0x44a109(0x173)][_0x44a109(0x162)](this),this[_0x44a109(0x508)](_0x54d1fe);},Window_Message['prototype']['canMove']=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x1eccc4){const _0x1431ac=_0x1d4f35;this[_0x1431ac(0x364)]&&(this[_0x1431ac(0x364)]['x']+=this['x']-_0x1eccc4['x'],this[_0x1431ac(0x364)]['y']+=this['y']-_0x1eccc4['y']);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x288)]=function(_0x195a6b,_0x1f7b7d){const _0x50281a=_0x1d4f35;this[_0x50281a(0x437)](this[_0x50281a(0x1dd)]['x'],this[_0x50281a(0x4aa)]*(Graphics[_0x50281a(0x26b)]-this[_0x50281a(0x470)])/0x2,this[_0x50281a(0x1dd)][_0x50281a(0x51f)],this[_0x50281a(0x1dd)][_0x50281a(0x470)],_0x195a6b,_0x1f7b7d);},Window_Message['prototype'][_0x1d4f35(0x25b)]=function(_0x43b2cc){const _0x1a2056=_0x1d4f35,_0xdc5c0c=Window_Base[_0x1a2056(0x1be)][_0x1a2056(0x25b)][_0x1a2056(0x162)](this,_0x43b2cc);_0x43b2cc[_0x1a2056(0x312)]&&this['launchMessageCommonEvent'](_0xdc5c0c);},Window_Message['prototype'][_0x1d4f35(0x330)]=function(_0x2e4ba5){const _0x234120=_0x1d4f35;if($gameParty[_0x234120(0x278)]()){}else $gameMap[_0x234120(0x531)](_0x2e4ba5);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x37f)]=function(_0xa9b406){const _0x531c47=_0x1d4f35;this[_0x531c47(0x53f)]--,this['_textDelayCount']<=0x0&&(this[_0x531c47(0x242)](_0xa9b406),Window_Base[_0x531c47(0x1be)][_0x531c47(0x37f)][_0x531c47(0x162)](this,_0xa9b406));},Window_Message[_0x1d4f35(0x1be)]['onProcessCharacter']=function(_0xf20105){const _0x5d962a=_0x1d4f35;this['_textDelayCount']=this[_0x5d962a(0x33d)];if(this[_0x5d962a(0x33d)]<=0x0)this[_0x5d962a(0x1c3)]=!![];},VisuMZ[_0x1d4f35(0x1bb)]['Window_Message_processEscapeCharacter']=Window_Message['prototype']['processEscapeCharacter'],Window_Message['prototype'][_0x1d4f35(0x2fc)]=function(_0x3bcea8,_0x58b398){const _0x524777=_0x1d4f35;!_0x58b398[_0x524777(0x312)]?Window_Base[_0x524777(0x1be)]['processEscapeCharacter'][_0x524777(0x162)](this,_0x3bcea8,_0x58b398):VisuMZ[_0x524777(0x1bb)][_0x524777(0x551)][_0x524777(0x162)](this,_0x3bcea8,_0x58b398);},VisuMZ['MessageCore'][_0x1d4f35(0x1e2)]=Window_Message['prototype']['needsNewPage'],Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x1c8)]=function(_0x49119a){const _0x4d5beb=_0x1d4f35;if(this['_currentAutoSize'])return![];return VisuMZ[_0x4d5beb(0x1bb)][_0x4d5beb(0x1e2)][_0x4d5beb(0x162)](this,_0x49119a);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4eb)]=function(_0x4c46cf){const _0x5f2c5e=_0x1d4f35;let _0x521a0f=_0x4c46cf['text'];this['_forcedPosition']={};if(this[_0x5f2c5e(0x34d)]())return _0x521a0f;_0x521a0f=_0x521a0f[_0x5f2c5e(0x4ac)](/<POSITION:[ ]*(.*?)>/gi,(_0x246f96,_0x5a5bb1)=>{const _0x710dab=_0x5f2c5e,_0x512ed0=_0x5a5bb1[_0x710dab(0x490)](',')['map'](_0x1cabdd=>Number(_0x1cabdd)||0x0);if(_0x512ed0[0x0]!==undefined)this[_0x710dab(0x3ff)]['x']=Number(_0x512ed0[0x0]);if(_0x512ed0[0x1]!==undefined)this[_0x710dab(0x3ff)]['y']=Number(_0x512ed0[0x1]);if(_0x512ed0[0x2]!==undefined)this[_0x710dab(0x3ff)][_0x710dab(0x51f)]=Number(_0x512ed0[0x2]);if(_0x512ed0[0x3]!==undefined)this[_0x710dab(0x3ff)][_0x710dab(0x470)]=Number(_0x512ed0[0x3]);return'';}),_0x521a0f=_0x521a0f[_0x5f2c5e(0x4ac)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x5867da,_0x9c08f3)=>{const _0x3e1541=_0x5f2c5e,_0x58e1b5=_0x9c08f3['split'](',')[_0x3e1541(0x40b)](_0x35c03e=>Number(_0x35c03e)||0x0);if(_0x58e1b5[0x0]!==undefined)this[_0x3e1541(0x3ff)]['x']=Number(_0x58e1b5[0x0]);if(_0x58e1b5[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x58e1b5[0x1]);return'';}),_0x521a0f=_0x521a0f[_0x5f2c5e(0x4ac)](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x25659b,_0x1fbc8e)=>{const _0x15619a=_0x5f2c5e,_0x3871ba=_0x1fbc8e['split'](',')['map'](_0x528e2e=>Number(_0x528e2e)||0x0);if(_0x3871ba[0x0]!==undefined)this[_0x15619a(0x3ff)][_0x15619a(0x51f)]=Number(_0x3871ba[0x2]);if(_0x3871ba[0x1]!==undefined)this[_0x15619a(0x3ff)][_0x15619a(0x470)]=Number(_0x3871ba[0x3]);return'';}),_0x521a0f=_0x521a0f[_0x5f2c5e(0x4ac)](/<OFFSET:[ ]*(.*?)>/gi,(_0x39bd5a,_0x5a490e)=>{const _0xb257b4=_0x5f2c5e,_0x895ea5=_0x5a490e['split'](',')[_0xb257b4(0x40b)](_0x52078d=>Number(_0x52078d)||0x0);let _0x3dda41=_0x895ea5[0x0]||0x0,_0x3f433e=_0x895ea5[0x1]||0x0;return $gameSystem[_0xb257b4(0x48d)](_0x3dda41,_0x3f433e),'';}),_0x4c46cf['text']=_0x521a0f;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x252)]=function(){const _0x497f65=$gameSystem['getMessageWindowXyOffsets']();this['x']+=_0x497f65['x'],this['y']+=_0x497f65['y'];},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x33a)]=function(){const _0x1a4ce8=_0x1d4f35;this[_0x1a4ce8(0x3ff)]=this[_0x1a4ce8(0x3ff)]||{};const _0x59da72=['x','y',_0x1a4ce8(0x51f),_0x1a4ce8(0x470)];for(const _0x249cab of _0x59da72){this[_0x1a4ce8(0x3ff)][_0x249cab]!==undefined&&(this[_0x249cab]=Number(this[_0x1a4ce8(0x3ff)][_0x249cab]));}},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x537)]=function(_0x2e48c9){const _0x373784=_0x1d4f35;this[_0x373784(0x376)]=![];let _0x191530=_0x2e48c9['text'];_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x1f9f16=_0x373784;return this[_0x1f9f16(0x3c0)](_0x191530,!![],!![]),this[_0x1f9f16(0x337)]('none'),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x33d0c1=_0x373784;return this[_0x33d0c1(0x3c0)](_0x191530,!![],![]),this[_0x33d0c1(0x337)](_0x33d0c1(0x1b4)),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x2973c2=_0x373784;return this[_0x2973c2(0x3c0)](_0x191530,![],!![]),this[_0x2973c2(0x337)](_0x2973c2(0x1b4)),'';});if(SceneManager[_0x373784(0x548)]())_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x566f93,_0x271fba)=>{const _0x113d72=_0x373784;return this[_0x113d72(0x3c0)](_0x191530,!![],!![]),this[_0x113d72(0x337)](_0x113d72(0x1b1),Number(_0x271fba)||0x1),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2c2869,_0x4cf6ca)=>{const _0x3c3ede=_0x373784;return this['processAutoSize'](_0x191530,!![],!![]),this[_0x3c3ede(0x337)](_0x3c3ede(0x2a5),Number(_0x4cf6ca)||0x0),'';}),_0x191530=_0x191530['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x4e0c56,_0x502de3)=>{const _0x2c65ae=_0x373784;return this[_0x2c65ae(0x3c0)](_0x191530,!![],!![]),this[_0x2c65ae(0x337)](_0x2c65ae(0x1a1),Number(_0x502de3)||0x0),'';});else SceneManager[_0x373784(0x439)]()&&(_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x13f19e,_0x4ace6a)=>{const _0x5ca626=_0x373784;return this[_0x5ca626(0x3c0)](_0x191530,!![],!![]),this[_0x5ca626(0x337)]('map\x20player',0x0),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xb106ca,_0x42804a)=>{const _0x1b7052=_0x373784;return this[_0x1b7052(0x3c0)](_0x191530,!![],!![]),this[_0x1b7052(0x337)](_0x1b7052(0x393),Number(_0x42804a)||0x1),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3b6dc7,_0x3b9090)=>{const _0x58b839=_0x373784;return this[_0x58b839(0x3c0)](_0x191530,!![],!![]),this[_0x58b839(0x337)]('map\x20party',Number(_0x3b9090)||0x0),'';}),_0x191530=_0x191530[_0x373784(0x4ac)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2edaac,_0x597402)=>{const _0x120e9b=_0x373784;return this[_0x120e9b(0x3c0)](_0x191530,!![],!![]),this[_0x120e9b(0x337)](_0x120e9b(0x4a5),Number(_0x597402)||0x0),'';}));_0x2e48c9[_0x373784(0x2b7)]=_0x191530;},Window_Message[_0x1d4f35(0x44d)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x1d4f35(0x33c)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x1d4f35(0x3c0)]=function(_0x21078e,_0x4f8ba7,_0x321d00){const _0x1a0cde=_0x1d4f35;_0x21078e=_0x21078e[_0x1a0cde(0x4ac)](Window_Message['_autoSizeRegexp'],''),_0x21078e=_0x21078e[_0x1a0cde(0x4ac)](Window_Message[_0x1a0cde(0x33c)],''),this['_autoSizeCheck']=!![],this[_0x1a0cde(0x376)]=!![],this[_0x1a0cde(0x1a5)](![]);const _0x3e7498=this[_0x1a0cde(0x4ad)](_0x21078e);if(_0x4f8ba7){let _0x5e3eaf=_0x3e7498['width']+$gameSystem[_0x1a0cde(0x257)]()*0x2+0x6;const _0x434b27=$gameMessage[_0x1a0cde(0x28a)]()!=='',_0x27cb38=ImageManager['faceWidth'],_0x3e17f8=0x14;_0x5e3eaf+=_0x434b27?_0x27cb38+_0x3e17f8:0x4;if(_0x5e3eaf%0x2!==0x0)_0x5e3eaf+=0x1;$gameSystem[_0x1a0cde(0x262)](_0x5e3eaf);}if(_0x321d00){let _0x2c24b8=Math[_0x1a0cde(0x38c)](_0x3e7498['height']/this['lineHeight']());$gameSystem[_0x1a0cde(0x3a1)](_0x2c24b8);}this['updateAutoSizePosition'](),this[_0x1a0cde(0x45f)](),this[_0x1a0cde(0x31e)]=![],this[_0x1a0cde(0x403)]=!![];},Window_Message['prototype'][_0x1d4f35(0x2a1)]=function(){const _0x4406e8=_0x1d4f35;this[_0x4406e8(0x28c)](),this[_0x4406e8(0x267)](),this['resetPositionX'](),this[_0x4406e8(0x3be)](),this[_0x4406e8(0x245)][_0x4406e8(0x1b2)](),this['createContents']();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x337)]=function(_0x553ee2,_0x2383ab){const _0x4e5a94=_0x1d4f35;switch(_0x553ee2[_0x4e5a94(0x486)]()[_0x4e5a94(0x453)]()){case _0x4e5a94(0x1b1):this[_0x4e5a94(0x48f)]=$gameActors[_0x4e5a94(0x167)](_0x2383ab);break;case _0x4e5a94(0x2a5):this[_0x4e5a94(0x48f)]=$gameParty[_0x4e5a94(0x408)]()[_0x2383ab-0x1];break;case _0x4e5a94(0x1a1):this[_0x4e5a94(0x48f)]=$gameTroop['members']()[_0x2383ab-0x1];break;case _0x4e5a94(0x17f):this['_autoPositionTarget']=$gamePlayer;break;case _0x4e5a94(0x393):const _0x52f22d=$gameActors['actor'](_0x2383ab)[_0x4e5a94(0x3f9)]();_0x52f22d===0x0?this[_0x4e5a94(0x48f)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer[_0x4e5a94(0x19c)]()['follower'](_0x52f22d-0x1);break;case _0x4e5a94(0x351):_0x2383ab===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x4e5a94(0x48f)]=$gamePlayer[_0x4e5a94(0x19c)]()[_0x4e5a94(0x35d)](_0x2383ab-0x2);break;case _0x4e5a94(0x4a5):this[_0x4e5a94(0x48f)]=$gameMap[_0x4e5a94(0x19b)](_0x2383ab);break;}this[_0x4e5a94(0x48f)]&&this[_0x4e5a94(0x370)]();},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x3fb)]=Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x534)],Window_Message['prototype']['synchronizeNameBox']=function(){const _0x3df976=_0x1d4f35;this['updateAutoPosition'](),VisuMZ['MessageCore'][_0x3df976(0x3fb)][_0x3df976(0x162)](this);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x370)]=function(){const _0x2c2754=_0x1d4f35;if(!this['_autoPositionTarget'])return;const _0x3f72b3=SceneManager[_0x2c2754(0x46f)];if(!_0x3f72b3)return;const _0x15ef32=_0x3f72b3['_spriteset'];if(!_0x15ef32)return;const _0xc0b7b2=_0x15ef32[_0x2c2754(0x2d6)](this[_0x2c2754(0x48f)]);if(!_0xc0b7b2)return;let _0xaf8de1=_0xc0b7b2['x'];if(SceneManager['isSceneMap']())_0xaf8de1*=$gameScreen['zoomScale']();else{if(SceneManager[_0x2c2754(0x548)]()&&Imported[_0x2c2754(0x4da)]){let _0x293bf8=_0xc0b7b2['x']-Graphics[_0x2c2754(0x43a)]*_0x15ef32[_0x2c2754(0x35a)]['x'];_0xaf8de1+=_0x293bf8*(_0x15ef32[_0x2c2754(0x2aa)]['x']-0x1);}}_0xaf8de1-=this[_0x2c2754(0x51f)]/0x2,_0xaf8de1-=(Graphics[_0x2c2754(0x51f)]-Graphics[_0x2c2754(0x43a)])/0x2,_0xaf8de1+=this[_0x2c2754(0x4d4)]();let _0x116507=_0xc0b7b2['y'];if(SceneManager['isSceneMap']())_0x116507-=_0xc0b7b2[_0x2c2754(0x470)]+0x8,_0x116507*=$gameScreen[_0x2c2754(0x2ae)](),_0x116507-=this[_0x2c2754(0x470)]*$gameScreen[_0x2c2754(0x2ae)]();else{if(SceneManager[_0x2c2754(0x548)]()&&Imported[_0x2c2754(0x4da)]){let _0x4cb303=_0xc0b7b2[_0x2c2754(0x470)]*_0x15ef32[_0x2c2754(0x2aa)]['y'];_0x116507-=this[_0x2c2754(0x470)]*_0x15ef32[_0x2c2754(0x2aa)]['y']+_0x4cb303+0x8;let _0x34470b=_0xc0b7b2['y']-Graphics[_0x2c2754(0x26b)]*_0x15ef32[_0x2c2754(0x35a)]['y'];_0x116507+=_0x34470b*(_0x15ef32[_0x2c2754(0x2aa)]['y']-0x1);}else _0x116507-=_0xc0b7b2[_0x2c2754(0x470)]+0x8,_0x116507-=this[_0x2c2754(0x470)];}_0x116507-=(Graphics[_0x2c2754(0x470)]-Graphics[_0x2c2754(0x26b)])/0x2,_0x116507+=this['autoPositionOffsetY']();const _0xba02a6=$gameSystem['getMessageWindowXyOffsets']();_0xaf8de1+=_0xba02a6['x'],_0x116507+=_0xba02a6['y'],this['x']=Math[_0x2c2754(0x52f)](_0xaf8de1),this['y']=Math[_0x2c2754(0x52f)](_0x116507),this['clampPlacementPosition'](!![],![]),this['_forcedPosition']=this['_forcedPosition']||{},this[_0x2c2754(0x3ff)]['x']=this['x'],this[_0x2c2754(0x3ff)]['y']=this['y'],this[_0x2c2754(0x3ff)]['width']=this[_0x2c2754(0x51f)],this['_forcedPosition']['height']=this['height'],this[_0x2c2754(0x364)]['updatePlacement']();},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4d4)]=function(){return 0x0;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x1f6)]=function(){return 0x0;},Window_Message['prototype'][_0x1d4f35(0x2fe)]=function(){const _0x1a8c37=_0x1d4f35;this[_0x1a8c37(0x403)]=![],this[_0x1a8c37(0x48f)]=undefined,$gameSystem['initMessageCore'](),this[_0x1a8c37(0x2a1)](),this['openness']=0x0;},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x365)]=function(_0x49c019){const _0x511385=_0x1d4f35;return Window_Base[_0x511385(0x1be)][_0x511385(0x365)]['call'](this,_0x49c019);},Window_Message['prototype'][_0x1d4f35(0x39e)]=function(_0x572249){const _0x50bf0a=_0x1d4f35;return Window_Base[_0x50bf0a(0x1be)]['postConvertEscapeCharacters'][_0x50bf0a(0x162)](this,_0x572249);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x1d8)]=function(_0x4f7c4f){const _0xf97a9=_0x1d4f35;this['preFlushTextState'](_0x4f7c4f),Window_Base[_0xf97a9(0x1be)][_0xf97a9(0x1d8)][_0xf97a9(0x162)](this,_0x4f7c4f),this['postFlushTextState'](_0x4f7c4f);},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x4c6)]=function(_0x173bb6){},Window_Message[_0x1d4f35(0x1be)][_0x1d4f35(0x469)]=function(_0x5a6704){},Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x15c)]=function(){return![];},Window_NameBox[_0x1d4f35(0x1be)]['resetTextColor']=function(){const _0x40a4c3=_0x1d4f35;Window_Base['prototype'][_0x40a4c3(0x2ad)][_0x40a4c3(0x162)](this),this[_0x40a4c3(0x4bd)](this[_0x40a4c3(0x22a)]());},Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x22a)]=function(){const _0x569981=_0x1d4f35,_0x307cff=VisuMZ[_0x569981(0x1bb)][_0x569981(0x433)][_0x569981(0x213)][_0x569981(0x2af)];return ColorManager[_0x569981(0x2f1)](_0x307cff);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x41b)]=Window_NameBox[_0x1d4f35(0x1be)]['updatePlacement'],Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x267)]=function(){const _0x5c168c=_0x1d4f35;VisuMZ[_0x5c168c(0x1bb)][_0x5c168c(0x41b)]['call'](this),this[_0x5c168c(0x480)](),this[_0x5c168c(0x1bf)](),this[_0x5c168c(0x1c5)](),this['updateOverlappingY']();},Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x365)]=function(_0x2af553){const _0x5bcef9=_0x1d4f35;return _0x2af553=_0x2af553['replace'](/<LEFT>/gi,this[_0x5bcef9(0x194)][_0x5bcef9(0x3e9)](this,0x0)),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<CENTER>/gi,this[_0x5bcef9(0x194)][_0x5bcef9(0x3e9)](this,0x5)),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<RIGHT>/gi,this[_0x5bcef9(0x194)][_0x5bcef9(0x3e9)](this,0xa)),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<POSITION:[ ](\d+)>/gi,(_0x1595f5,_0x434299)=>this['setRelativePosition'](parseInt(_0x434299))),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<\/LEFT>/gi,''),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<\/CENTER>/gi,''),_0x2af553=_0x2af553[_0x5bcef9(0x4ac)](/<\/RIGHT>/gi,''),_0x2af553=_0x2af553[_0x5bcef9(0x453)](),Window_Base['prototype'][_0x5bcef9(0x365)][_0x5bcef9(0x162)](this,_0x2af553);},Window_NameBox['prototype']['setRelativePosition']=function(_0x45a01f){const _0x45f25a=_0x1d4f35;return this[_0x45f25a(0x253)]=_0x45a01f,'';},Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x480)]=function(){const _0x4b634a=_0x1d4f35;if($gameMessage[_0x4b634a(0x32a)]())return;this[_0x4b634a(0x253)]=this[_0x4b634a(0x253)]||0x0;const _0x566eae=this[_0x4b634a(0x545)],_0x31bc7e=Math[_0x4b634a(0x37b)](_0x566eae['width']*this['_relativePosition']/0xa);this['x']=_0x566eae['x']+_0x31bc7e-Math[_0x4b634a(0x37b)](this[_0x4b634a(0x51f)]/0x2),this['x']=this['x']['clamp'](_0x566eae['x'],_0x566eae['x']+_0x566eae[_0x4b634a(0x51f)]-this[_0x4b634a(0x51f)]);},Window_NameBox['prototype'][_0x1d4f35(0x1bf)]=function(){const _0x55573e=_0x1d4f35;if($gameMessage[_0x55573e(0x32a)]())return;this[_0x55573e(0x253)]=this['_relativePosition']||0x0;const _0x58c8d7=VisuMZ[_0x55573e(0x1bb)][_0x55573e(0x433)]['General'][_0x55573e(0x2d5)],_0xc4a368=VisuMZ[_0x55573e(0x1bb)][_0x55573e(0x433)]['General'][_0x55573e(0x4d7)],_0x32a3ce=(0x5-this[_0x55573e(0x253)])/0x5;this['x']+=Math['floor'](_0x58c8d7*_0x32a3ce),this['y']+=_0xc4a368;},Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x3a0)]=function(){const _0x10dfcb=_0x1d4f35,_0x336d70=this[_0x10dfcb(0x545)],_0x20e519=_0x336d70['y'],_0x2114b7=VisuMZ[_0x10dfcb(0x1bb)]['Settings']['General'][_0x10dfcb(0x4d7)];_0x20e519>this['y']&&_0x20e519<this['y']+this['height']-_0x2114b7&&(this['y']=_0x336d70['y']+_0x336d70[_0x10dfcb(0x470)]);},VisuMZ[_0x1d4f35(0x1bb)]['Window_NameBox_refresh']=Window_NameBox[_0x1d4f35(0x1be)][_0x1d4f35(0x247)],Window_NameBox[_0x1d4f35(0x1be)]['refresh']=function(){const _0xd68b7d=_0x1d4f35;this[_0xd68b7d(0x253)]=0x0,VisuMZ[_0xd68b7d(0x1bb)][_0xd68b7d(0x2c0)][_0xd68b7d(0x162)](this);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x34d)]=function(){return![];},Window_ChoiceList['prototype'][_0x1d4f35(0x15c)]=function(){return!![];},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x492)]=function(){const _0x57c570=_0x1d4f35;return $gameSystem[_0x57c570(0x327)]()+0x8;},Window_ChoiceList[_0x1d4f35(0x1be)]['maxCols']=function(){const _0x5f52ae=_0x1d4f35;return $gameSystem[_0x5f52ae(0x383)]();},Window_ChoiceList['prototype'][_0x1d4f35(0x4a6)]=function(){const _0x116749=_0x1d4f35;this['refresh'](),this[_0x116749(0x424)](),this[_0x116749(0x2dd)](),this[_0x116749(0x479)](),this['processFailsafeChoice']();},Window_ChoiceList['prototype'][_0x1d4f35(0x4e8)]=function(){const _0xb31c81=_0x1d4f35;$gameMessage[_0xb31c81(0x244)](this['currentExt']()),this[_0xb31c81(0x545)]['terminateMessage'](),this[_0xb31c81(0x240)](),this[_0xb31c81(0x317)]&&(this[_0xb31c81(0x317)][_0xb31c81(0x1b2)](),this[_0xb31c81(0x317)][_0xb31c81(0x2a7)]());},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x361)]=Window_ChoiceList['prototype'][_0x1d4f35(0x311)],Window_ChoiceList['prototype'][_0x1d4f35(0x311)]=function(){const _0x43eaf8=_0x1d4f35;VisuMZ['MessageCore'][_0x43eaf8(0x361)]['call'](this),this[_0x43eaf8(0x317)]&&(this[_0x43eaf8(0x317)][_0x43eaf8(0x1b2)](),this[_0x43eaf8(0x317)][_0x43eaf8(0x2a7)]());},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x247)]=function(){const _0x3f0e99=_0x1d4f35;this[_0x3f0e99(0x217)](),this[_0x3f0e99(0x452)](),this[_0x3f0e99(0x545)]&&(this['updatePlacement'](),this[_0x3f0e99(0x259)]()),this[_0x3f0e99(0x19d)](),this['updateBackground'](),this[_0x3f0e99(0x4e9)](),Window_Selectable[_0x3f0e99(0x1be)][_0x3f0e99(0x247)][_0x3f0e99(0x162)](this);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x452)]=function(){const _0x324678=_0x1d4f35;$gameMessage[_0x324678(0x485)]?this[_0x324678(0x316)]():this[_0x324678(0x1df)](),this[_0x324678(0x216)](),this[_0x324678(0x42f)]();},Window_ChoiceList[_0x1d4f35(0x1be)]['makeCommandListScriptCall']=function(){const _0x36ebb2=_0x1d4f35,_0x7e3a6b=$gameMessage[_0x36ebb2(0x28d)]();let _0xfa4ace=0x0;for(let _0x147822 of _0x7e3a6b){_0x147822=this[_0x36ebb2(0x467)](_0x147822);if(this[_0x36ebb2(0x391)](_0x147822)){const _0x2955d7=this[_0x36ebb2(0x34a)](_0x147822),_0x3753a0=this[_0x36ebb2(0x211)](_0x147822);this[_0x36ebb2(0x293)](_0x2955d7,_0x36ebb2(0x17d),_0x3753a0,_0xfa4ace);}_0xfa4ace++;}},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x1df)]=function(){const _0x18310a=_0x1d4f35,_0x242f0e=$gameMessage[_0x18310a(0x28d)](),_0x1f7889=$gameMessage[_0x18310a(0x2ec)](),_0x44f579=$gameMessage[_0x18310a(0x427)](),_0xfba72b=_0x242f0e['length'];let _0x467f50=0x0;for(let _0x5146a5=0x0;_0x5146a5<_0xfba72b;_0x5146a5++){if(this[_0x18310a(0x1f1)][_0x18310a(0x291)]>=_0x44f579)break;const _0x248872=_0x1f7889[_0x5146a5];let _0x2f94c0=_0x242f0e[_0x248872];if(_0x2f94c0===undefined)continue;_0x2f94c0=this[_0x18310a(0x467)](_0x2f94c0);if(this[_0x18310a(0x391)](_0x2f94c0)){const _0x42d204=this[_0x18310a(0x34a)](_0x2f94c0),_0x84036b=this[_0x18310a(0x211)](_0x2f94c0);this[_0x18310a(0x293)](_0x42d204,'choice',_0x84036b,_0x248872);}_0x467f50++;}},Window_ChoiceList[_0x1d4f35(0x1be)]['convertChoiceMacros']=function(_0x43faee){const _0x76d93a=_0x1d4f35;return Window_Base[_0x76d93a(0x1be)][_0x76d93a(0x347)][_0x76d93a(0x162)](this,_0x43faee);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x391)]=function(_0x2ec3fb){const _0x5ec1ee=_0x1d4f35;if(Imported[_0x5ec1ee(0x283)])$gameMessage[_0x5ec1ee(0x47b)]();if(_0x2ec3fb['match'](/<HIDE>/i))return![];if(_0x2ec3fb[_0x5ec1ee(0x1f2)](/<SHOW>/i))return!![];if(_0x2ec3fb[_0x5ec1ee(0x1f2)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x227971=RegExp['$1'][_0x5ec1ee(0x490)](',')[_0x5ec1ee(0x40b)](_0x46bd0b=>Number(_0x46bd0b)||0x0);if(_0x227971['some'](_0x4ffaa3=>!$gameSwitches[_0x5ec1ee(0x292)](_0x4ffaa3)))return![];}if(_0x2ec3fb[_0x5ec1ee(0x1f2)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1584e3=RegExp['$1'][_0x5ec1ee(0x490)](',')[_0x5ec1ee(0x40b)](_0x30a8a9=>Number(_0x30a8a9)||0x0);if(_0x1584e3[_0x5ec1ee(0x3a5)](_0x131a5d=>!$gameSwitches[_0x5ec1ee(0x292)](_0x131a5d)))return![];}if(_0x2ec3fb[_0x5ec1ee(0x1f2)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3cd391=RegExp['$1'][_0x5ec1ee(0x490)](',')['map'](_0x5b40fe=>Number(_0x5b40fe)||0x0);if(_0x3cd391['every'](_0x506465=>$gameSwitches[_0x5ec1ee(0x292)](_0x506465)))return![];}if(_0x2ec3fb[_0x5ec1ee(0x1f2)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x481fe2=RegExp['$1'][_0x5ec1ee(0x490)](',')['map'](_0x6bc9d3=>Number(_0x6bc9d3)||0x0);if(_0x481fe2['some'](_0x57e94d=>$gameSwitches[_0x5ec1ee(0x292)](_0x57e94d)))return![];}return!![];},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x34a)]=function(_0x5748ce){const _0x58add0=_0x1d4f35;let _0x21148c=_0x5748ce;return _0x21148c=_0x21148c['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x21148c=_0x21148c[_0x58add0(0x4ac)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x21148c;},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x211)]=function(_0x921835){const _0x111a67=_0x1d4f35;if(Imported[_0x111a67(0x283)])$gameMessage[_0x111a67(0x47b)]();if(_0x921835[_0x111a67(0x1f2)](/<DISABLE>/i))return![];if(_0x921835[_0x111a67(0x1f2)](/<ENABLE>/i))return!![];if(_0x921835[_0x111a67(0x1f2)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4ca371=RegExp['$1'][_0x111a67(0x490)](',')[_0x111a67(0x40b)](_0x11404c=>Number(_0x11404c)||0x0);if(_0x4ca371['some'](_0x110783=>!$gameSwitches[_0x111a67(0x292)](_0x110783)))return![];}if(_0x921835[_0x111a67(0x1f2)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4aec2a=RegExp['$1']['split'](',')[_0x111a67(0x40b)](_0x57feb5=>Number(_0x57feb5)||0x0);if(_0x4aec2a[_0x111a67(0x3a5)](_0x3ab178=>!$gameSwitches[_0x111a67(0x292)](_0x3ab178)))return![];}if(_0x921835[_0x111a67(0x1f2)](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x567ad4=RegExp['$1'][_0x111a67(0x490)](',')[_0x111a67(0x40b)](_0x3af9e3=>Number(_0x3af9e3)||0x0);if(_0x567ad4['every'](_0x4adc78=>$gameSwitches[_0x111a67(0x292)](_0x4adc78)))return![];}if(_0x921835[_0x111a67(0x1f2)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x50842e=RegExp['$1']['split'](',')['map'](_0x421e0e=>Number(_0x421e0e)||0x0);if(_0x50842e[_0x111a67(0x185)](_0x3cfbcf=>$gameSwitches[_0x111a67(0x292)](_0x3cfbcf)))return![];}return!![];},Window_ChoiceList['prototype'][_0x1d4f35(0x216)]=function(){const _0x595712=_0x1d4f35;this[_0x595712(0x396)]={},this['_helpWindow']&&(this[_0x595712(0x317)][_0x595712(0x1b2)](),this[_0x595712(0x317)][_0x595712(0x2a7)]());},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x42f)]=function(){const _0x12290b=_0x1d4f35,_0x2ccd6b=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x41fa25 of this['_list']){if(!_0x41fa25)continue;const _0x544edc=this[_0x12290b(0x1f1)][_0x12290b(0x1ee)](_0x41fa25);if(_0x41fa25[_0x12290b(0x46b)][_0x12290b(0x1f2)](_0x2ccd6b)){const _0x1f1526=String(RegExp['$1']);this[_0x12290b(0x396)][_0x544edc]=_0x1f1526[_0x12290b(0x453)](),_0x41fa25[_0x12290b(0x46b)]=_0x41fa25[_0x12290b(0x46b)][_0x12290b(0x4ac)](_0x2ccd6b,'')[_0x12290b(0x453)]();}else this['_choiceHelpDescriptions'][_0x544edc]='';}},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x170)]=function(){const _0x185e39=_0x1d4f35;if(this[_0x185e39(0x1f1)][_0x185e39(0x185)](_0x19b7bc=>_0x19b7bc[_0x185e39(0x47e)]))return;this['deactivate'](),this[_0x185e39(0x240)](),$gameMessage[_0x185e39(0x40d)]=[],this[_0x185e39(0x545)][_0x185e39(0x464)]()&&this[_0x185e39(0x545)][_0x185e39(0x47a)]();},VisuMZ[_0x1d4f35(0x1bb)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x267)],Window_ChoiceList[_0x1d4f35(0x1be)]['updatePlacement']=function(){const _0x182cbe=_0x1d4f35;VisuMZ[_0x182cbe(0x1bb)][_0x182cbe(0x310)][_0x182cbe(0x162)](this),this['addChoiceDistance'](),this[_0x182cbe(0x1c5)]();},Window_ChoiceList['prototype'][_0x1d4f35(0x259)]=function(){const _0x3edce7=_0x1d4f35;if(!this[_0x3edce7(0x50d)])return;const _0x481e03=0x8,_0x5e2ea5=this[_0x3edce7(0x50d)],_0x3bd5be=this['x']+this[_0x3edce7(0x51f)],_0x2f9865=Math['floor']((Graphics[_0x3edce7(0x51f)]-Graphics['boxWidth'])/0x2);_0x3bd5be>=Graphics['boxWidth']+_0x2f9865-_0x5e2ea5[_0x3edce7(0x51f)]+_0x481e03?_0x5e2ea5['x']=-_0x5e2ea5[_0x3edce7(0x51f)]-_0x481e03:_0x5e2ea5['x']=this['width']+_0x481e03,_0x5e2ea5['y']=this[_0x3edce7(0x470)]/0x2-_0x5e2ea5[_0x3edce7(0x470)]/0x2;},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x3ef)]=Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x2f3)],Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x2f3)]=function(){const _0x8445b3=_0x1d4f35;return this[_0x8445b3(0x545)]?this[_0x8445b3(0x309)]():VisuMZ['MessageCore'][_0x8445b3(0x3ef)][_0x8445b3(0x162)](this);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x309)]=function(){const _0x2c3b9b=_0x1d4f35,_0x1f5bcb=$gameMessage[_0x2c3b9b(0x223)]();if(_0x1f5bcb===0x1)return(Graphics[_0x2c3b9b(0x43a)]-this[_0x2c3b9b(0x36c)]())/0x2;else return _0x1f5bcb===0x2?this[_0x2c3b9b(0x545)]['x']+this[_0x2c3b9b(0x545)][_0x2c3b9b(0x51f)]-this['windowWidth']():this[_0x2c3b9b(0x545)]['x'];},Window_ChoiceList[_0x1d4f35(0x1be)]['windowWidth']=function(){const _0x153f3f=_0x1d4f35,_0x426871=(this[_0x153f3f(0x16a)]()+this[_0x153f3f(0x178)]())*this[_0x153f3f(0x4b4)]()+this[_0x153f3f(0x2f4)]*0x2;return Math[_0x153f3f(0x2f8)](_0x426871,Graphics[_0x153f3f(0x51f)]);},Window_ChoiceList['prototype'][_0x1d4f35(0x53a)]=function(){const _0x587c37=_0x1d4f35,_0x2ad35d=$gameMessage[_0x587c37(0x28d)]()[_0x587c37(0x40b)](_0x4a99a7=>this[_0x587c37(0x467)](_0x4a99a7))[_0x587c37(0x298)](_0x35ea52=>this['isChoiceVisible'](_0x35ea52));let _0x1fda17=Math[_0x587c37(0x38c)](_0x2ad35d[_0x587c37(0x291)]/this[_0x587c37(0x4b4)]());if(!$gameMessage[_0x587c37(0x485)]){const _0x3ed348=$gameMessage[_0x587c37(0x427)]();_0x1fda17=Math[_0x587c37(0x38c)](Math[_0x587c37(0x2f8)](_0x3ed348,_0x2ad35d[_0x587c37(0x291)])/this['maxCols']());}return Math['max'](0x1,Math[_0x587c37(0x2f8)](_0x1fda17,this[_0x587c37(0x3c5)]()));},Window_ChoiceList['prototype']['maxLines']=function(){const _0x36e87c=_0x1d4f35,_0x3b481d=this[_0x36e87c(0x545)],_0x2b978b=_0x3b481d?_0x3b481d['y']:0x0,_0x1b8c9b=_0x3b481d?_0x3b481d['height']:0x0,_0x200ee1=Graphics['boxHeight']/0x2;return _0x2b978b<_0x200ee1&&_0x2b978b+_0x1b8c9b>_0x200ee1?0x4:$gameSystem[_0x36e87c(0x4f1)]();},Window_ChoiceList['prototype'][_0x1d4f35(0x16a)]=function(){const _0x40f400=_0x1d4f35;let _0x2ee053=this[_0x40f400(0x1da)]();for(const _0x997a77 of this[_0x40f400(0x1f1)]){const _0x321ebe=_0x997a77['name'],_0x2c7b0d=this[_0x40f400(0x2f9)](_0x321ebe),_0x5b7edc=this[_0x40f400(0x451)](_0x321ebe)[_0x40f400(0x51f)]+_0x2c7b0d,_0xfff58f=Math[_0x40f400(0x38c)](_0x5b7edc)+this[_0x40f400(0x459)]()*0x2;_0x2ee053=Math['max'](_0x2ee053,_0xfff58f);}return _0x2ee053;},Window_ChoiceList['prototype'][_0x1d4f35(0x1da)]=function(){const _0x418485=_0x1d4f35;let _0x7e7920=$gameSystem[_0x418485(0x3f1)]();const _0x499ef5=$gameMessage[_0x418485(0x28d)]();for(const _0x3a1d4c of _0x499ef5){_0x3a1d4c[_0x418485(0x1f2)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x7e7920=Math['max'](_0x7e7920,Number(RegExp['$1'])));}return Math['max'](_0x7e7920,0x1);},Window_ChoiceList['prototype'][_0x1d4f35(0x54d)]=function(){const _0x5d2fd4=_0x1d4f35,_0xb91dba=$gameSystem[_0x5d2fd4(0x4c1)]()||0x0,_0x10e1d5=this[_0x5d2fd4(0x545)]['y'],_0x5c9f23=this[_0x5d2fd4(0x545)][_0x5d2fd4(0x470)],_0x534f17=this[_0x5d2fd4(0x545)][_0x5d2fd4(0x364)],_0x2d3d4a=_0x534f17[_0x5d2fd4(0x413)]>0x0&&_0x534f17[_0x5d2fd4(0x51f)]>0x0,_0x15b5f9=_0x2d3d4a?_0x534f17[_0x5d2fd4(0x470)]:0x0;if(_0xb91dba<0x0&&(this[_0x5d2fd4(0x545)][_0x5d2fd4(0x2a3)]()||this['_messageWindow'][_0x5d2fd4(0x22c)]()))this['y']=Math[_0x5d2fd4(0x52f)]((Graphics['boxHeight']-this['height'])/0x2);else{if(_0x10e1d5>=Graphics['boxHeight']/0x2)_0xb91dba>=0x0?this['y']-=_0xb91dba:this['y']=Math[_0x5d2fd4(0x37b)]((_0x10e1d5-this[_0x5d2fd4(0x470)]-_0x15b5f9)/0x2);else{if(_0xb91dba>=0x0)this['y']+=_0xb91dba;else{const _0x354844=Graphics[_0x5d2fd4(0x26b)]-(_0x10e1d5+_0x5c9f23+_0x15b5f9);this['y']+=Math[_0x5d2fd4(0x37b)]((_0x354844-this[_0x5d2fd4(0x470)])/0x2)+_0x15b5f9;}}}},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x50e)]=function(_0x3d3575){const _0xf861c0=_0x1d4f35,_0x3ad55a=this['requestChoiceForegroundImage'](_0x3d3575);if(_0x3ad55a){const _0x1d6a49=ImageManager[_0xf861c0(0x42a)](_0x3ad55a),_0xa6b0cc=this[_0xf861c0(0x229)](),_0x178868=_0xa6b0cc+this['commandName'](_0x3d3575),_0x5e1301=this['itemRectWithPadding'](_0x3d3575);_0x1d6a49[_0xf861c0(0x389)](this[_0xf861c0(0x410)][_0xf861c0(0x3e9)](this,_0x3d3575,!![],_0x178868,_0x5e1301,_0x1d6a49));return;}this['drawItemContents'](_0x3d3575);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x41e)]=function(_0x3e4146){const _0x4ec7ed=_0x1d4f35,_0x56433f=this['itemRectWithPadding'](_0x3e4146),_0x455736=this[_0x4ec7ed(0x229)](),_0x17ad62=_0x455736+this[_0x4ec7ed(0x2c8)](_0x3e4146);this['changePaintOpacity'](this[_0x4ec7ed(0x249)](_0x3e4146));const _0x19c10b=this[_0x4ec7ed(0x451)](_0x17ad62)['height'],_0x588d3d=_0x56433f['x']+this[_0x4ec7ed(0x2f9)](_0x17ad62),_0x4ad9b2=Math['max'](_0x56433f['y'],_0x56433f['y']+Math[_0x4ec7ed(0x52f)]((_0x56433f[_0x4ec7ed(0x470)]-_0x19c10b)/0x2));this['drawTextEx'](_0x17ad62,_0x588d3d,_0x4ad9b2,_0x56433f[_0x4ec7ed(0x51f)]),this[_0x4ec7ed(0x260)](_0x3e4146),this[_0x4ec7ed(0x510)](_0x3e4146,_0x17ad62,_0x56433f);},Window_ChoiceList['prototype'][_0x1d4f35(0x229)]=function(){const _0x31b78a=_0x1d4f35;return $gameSystem[_0x31b78a(0x304)]()!==_0x31b78a(0x2ef)?_0x31b78a(0x19e)['format']($gameSystem[_0x31b78a(0x304)]()):'';},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x2f9)]=function(_0x24dc41){const _0x56dffd=_0x1d4f35;let _0x468660=0x0;return _0x24dc41[_0x56dffd(0x1f2)](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x468660=Number(RegExp['$1'])),_0x468660;},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x260)]=function(_0x585118){const _0x3336fe=_0x1d4f35;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x233e76=this['commandName'](_0x585118);let _0x27f80a=![],_0x1b6544=![],_0x563aee=ColorManager[_0x3336fe(0x2e1)](),_0x5bdf71=ColorManager[_0x3336fe(0x463)]();if(_0x233e76[_0x3336fe(0x1f2)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x563aee=ColorManager['getColor'](RegExp['$1'])[_0x3336fe(0x453)](),_0x5bdf71=ColorManager['getColor'](RegExp['$2'])['trim'](),_0x27f80a=!![];else{if(_0x233e76[_0x3336fe(0x1f2)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x31a60f=String(RegExp['$1'])[_0x3336fe(0x486)]()[_0x3336fe(0x453)]();switch(_0x31a60f){case _0x3336fe(0x541):_0x563aee=_0x5bdf71=_0x3336fe(0x214),_0x1b6544=!![];break;case'orange':_0x563aee=_0x5bdf71=_0x3336fe(0x359),_0x1b6544=!![];break;case _0x3336fe(0x332):_0x563aee=_0x5bdf71=_0x3336fe(0x362),_0x1b6544=!![];break;case'green':_0x563aee=_0x5bdf71=_0x3336fe(0x543),_0x1b6544=!![];break;case'blue':_0x563aee=_0x5bdf71='#6dcff6',_0x1b6544=!![];break;case _0x3336fe(0x367):case _0x3336fe(0x49a):_0x563aee=_0x5bdf71=_0x3336fe(0x4c0),_0x1b6544=!![];break;case _0x3336fe(0x387):_0x563aee=_0x5bdf71=_0x3336fe(0x4b3),_0x1b6544=!![];break;case _0x3336fe(0x2c6):_0x563aee=_0x5bdf71=_0x3336fe(0x284),_0x1b6544=!![];break;case _0x3336fe(0x46e):_0x563aee=_0x5bdf71=_0x3336fe(0x210),_0x1b6544=!![];break;case'gray':case _0x3336fe(0x388):_0x563aee=_0x5bdf71='#acacac',_0x1b6544=!![];break;case _0x3336fe(0x4df):_0x563aee=_0x5bdf71='#707070',_0x1b6544=!![];break;case'yes':_0x563aee=_0x5bdf71=ColorManager[_0x3336fe(0x44f)](),_0x1b6544=!![];break;case'no':_0x563aee=_0x5bdf71=ColorManager[_0x3336fe(0x21a)](),_0x1b6544=!![];break;case _0x3336fe(0x2ab):_0x563aee=_0x5bdf71=ColorManager[_0x3336fe(0x230)](),_0x1b6544=!![];break;case _0x3336fe(0x297):_0x563aee=_0x5bdf71=ColorManager[_0x3336fe(0x539)](),_0x1b6544=!![];break;default:_0x563aee=_0x5bdf71=ColorManager[_0x3336fe(0x4fd)](_0x31a60f),_0x1b6544=!![];break;}_0x27f80a=!![];}}if(!_0x27f80a)return;const _0x457c87=this[_0x3336fe(0x4c8)](_0x585118);this['contentsBack'][_0x3336fe(0x28f)](_0x457c87['x'],_0x457c87['y'],_0x457c87['width'],_0x457c87[_0x3336fe(0x470)]),this[_0x3336fe(0x4e2)](_0x457c87,_0x563aee,_0x5bdf71,_0x1b6544);},Window_ChoiceList['prototype'][_0x1d4f35(0x4e2)]=function(_0xeabb01,_0x1d0761,_0x310deb,_0x3a476c){const _0x1db7f1=_0x1d4f35,_0x5d807e=ColorManager['itemBackColor1'](),_0x30c27d=ColorManager[_0x1db7f1(0x349)](),_0x3ea327=_0x1d0761??ColorManager[_0x1db7f1(0x2e1)](),_0xe8ed7f=_0x310deb??_0x1d0761,_0x410ab4=_0xeabb01['x'],_0x3392ba=_0xeabb01['y'],_0x15943b=_0xeabb01[_0x1db7f1(0x51f)],_0x5b6ad7=_0xeabb01[_0x1db7f1(0x470)];this[_0x1db7f1(0x502)][_0x1db7f1(0x3fe)](_0x410ab4,_0x3392ba,_0x15943b,_0x5b6ad7,_0x3ea327,_0xe8ed7f,!![]),_0x3a476c&&this[_0x1db7f1(0x502)][_0x1db7f1(0x3fe)](_0x410ab4,_0x3392ba,_0x15943b,_0x5b6ad7,_0x5d807e,_0xe8ed7f,!![]),this['contentsBack']['strokeRect'](_0x410ab4,_0x3392ba,_0x15943b,_0x5b6ad7,_0x5d807e);},Window_ChoiceList['prototype'][_0x1d4f35(0x4dd)]=function(_0x385ad2){const _0x25aa74=_0x1d4f35,_0xa6a1de=this[_0x25aa74(0x229)](),_0x3c7d98=_0xa6a1de+this[_0x25aa74(0x2c8)](_0x385ad2);let _0xed3ac9='';if(_0x3c7d98[_0x25aa74(0x1f2)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0xed3ac9=String(RegExp['$1'])[_0x25aa74(0x453)]();else _0x3c7d98['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0xed3ac9=String(RegExp['$2'])[_0x25aa74(0x453)]());return _0xed3ac9;},Window_ChoiceList['prototype'][_0x1d4f35(0x510)]=function(_0x4e832c,_0x3abaa9,_0x15642c){const _0x4df27b=_0x1d4f35;let _0x36ffad='';if(_0x3abaa9[_0x4df27b(0x1f2)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x36ffad=String(RegExp['$1'])[_0x4df27b(0x453)]();else _0x3abaa9[_0x4df27b(0x1f2)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x36ffad=String(RegExp['$2'])['trim']());if(_0x36ffad){const _0x4c1937=ImageManager['loadPicture'](_0x36ffad);_0x4c1937[_0x4df27b(0x389)](this[_0x4df27b(0x410)]['bind'](this,_0x4e832c,![],_0x3abaa9,_0x15642c,_0x4c1937));}},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x410)]=function(_0x4fdd56,_0x2d62e3,_0x30c669,_0xf8319e,_0x426567){const _0x451626=_0x1d4f35,_0x48ef99=this[_0x451626(0x229)](),_0x9a5f79=_0x48ef99+this[_0x451626(0x2c8)](_0x4fdd56);if(_0x30c669!==_0x9a5f79)return;const _0x5e3e78=this['itemRectWithPadding'](_0x4fdd56);if(['x','y','width','height'][_0x451626(0x185)](_0x13981b=>_0x5e3e78[_0x13981b]!==_0xf8319e[_0x13981b]))return;let _0xdcb190=0x0,_0x1e864a='';if(_0x2d62e3&&_0x9a5f79[_0x451626(0x1f2)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x2d62e3&&_0x9a5f79['match'](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x1e864a=String(RegExp['$1'])['toLowerCase']()[_0x451626(0x453)]();else!_0x2d62e3&&_0x9a5f79[_0x451626(0x1f2)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x1e864a=String(RegExp['$1'])['toLowerCase']()[_0x451626(0x453)]());}switch(_0x1e864a){case _0x451626(0x24a):case _0x451626(0x25e):case _0x451626(0x28e):case _0x451626(0x552):case _0x451626(0x3b9):case'down\x20left':case'1':_0xdcb190=0x1;break;case'lowercenter':case _0x451626(0x468):case _0x451626(0x395):case _0x451626(0x1de):case _0x451626(0x222):case'down\x20center':case _0x451626(0x4b8):case'2':_0xdcb190=0x2;break;case'lowerright':case _0x451626(0x22d):case'lower\x20right':case _0x451626(0x1e3):case'down-right':case'down\x20right':case'3':_0xdcb190=0x3;break;case _0x451626(0x255):case'middleleft':case _0x451626(0x321):case'4':_0xdcb190=0x4;break;case _0x451626(0x184):case _0x451626(0x315):case _0x451626(0x39d):case _0x451626(0x436):case'5':_0xdcb190=0x5;break;case _0x451626(0x416):case'middleright':case'right':case'6':_0xdcb190=0x6;break;case _0x451626(0x208):case _0x451626(0x37a):case _0x451626(0x3cf):case _0x451626(0x491):case'up-left':case _0x451626(0x25a):case'7':_0xdcb190=0x7;break;case _0x451626(0x2e2):case'upper-center':case _0x451626(0x399):case _0x451626(0x1d2):case _0x451626(0x307):case _0x451626(0x482):case'up':case'8':_0xdcb190=0x8;break;case _0x451626(0x53e):case _0x451626(0x471):case _0x451626(0x533):case'upright':case'up-right':case _0x451626(0x4e5):case'9':_0xdcb190=0x9;break;}const _0x5481b2=_0x2d62e3?this[_0x451626(0x245)]:this['contentsBack'],_0x494b95=this['itemRect'](_0x4fdd56);!_0x2d62e3&&_0x5481b2[_0x451626(0x28f)](_0x494b95['x']-0x1,_0x494b95['y']-0x1,_0x494b95[_0x451626(0x51f)]+0x2,_0x494b95[_0x451626(0x470)]+0x2);const _0x58f7eb=_0x494b95['x']+0x2,_0x324c5e=_0x494b95['y']+0x2,_0x47a1f7=_0x494b95['width']-0x4,_0x18cb19=_0x494b95[_0x451626(0x470)]-0x4,_0x1b52f7=_0x426567[_0x451626(0x51f)],_0x58be0f=_0x426567[_0x451626(0x470)];let _0x5be15f=_0x58f7eb,_0x584c18=_0x324c5e,_0x27a248=_0x47a1f7,_0x2b8760=_0x18cb19;const _0x442ac5=_0x47a1f7/_0x1b52f7,_0x341cac=_0x18cb19/_0x58be0f;let _0xe86ad8=Math[_0x451626(0x2f8)](_0x442ac5,_0x341cac);if(_0x2d62e3)_0xe86ad8=Math[_0x451626(0x2f8)](_0xe86ad8,0x1);_0xdcb190!==0x0&&(_0x27a248=Math[_0x451626(0x52f)](_0x1b52f7*_0xe86ad8),_0x2b8760=Math[_0x451626(0x52f)](_0x58be0f*_0xe86ad8));switch(_0xdcb190){case 0x1:case 0x4:case 0x7:_0x5be15f=_0x58f7eb;break;case 0x2:case 0x5:case 0x8:_0x5be15f+=Math['round']((_0x47a1f7-_0x27a248)/0x2);break;case 0x3:case 0x6:case 0x9:_0x5be15f+=_0x47a1f7-_0x27a248;break;}switch(_0xdcb190){case 0x7:case 0x8:case 0x9:_0x584c18=_0x324c5e;break;case 0x4:case 0x5:case 0x6:_0x584c18+=Math[_0x451626(0x52f)]((_0x18cb19-_0x2b8760)/0x2);break;case 0x1:case 0x2:case 0x3:_0x584c18+=_0x18cb19-_0x2b8760;break;}_0x5481b2[_0x451626(0x30e)](_0x426567,0x0,0x0,_0x1b52f7,_0x58be0f,_0x5be15f,_0x584c18,_0x27a248,_0x2b8760),_0x2d62e3&&this[_0x451626(0x41e)](_0x4fdd56);},Window_ChoiceList[_0x1d4f35(0x1be)][_0x1d4f35(0x246)]=function(){const _0x1c4a58=_0x1d4f35;this[_0x1c4a58(0x317)]['clear']();if(!this[_0x1c4a58(0x396)])return;const _0x25ee2f=this[_0x1c4a58(0x3f9)]();this[_0x1c4a58(0x396)][_0x25ee2f]?(this[_0x1c4a58(0x317)][_0x1c4a58(0x18f)](this[_0x1c4a58(0x396)][_0x25ee2f]),this['_helpWindow'][_0x1c4a58(0x42c)]()):(this[_0x1c4a58(0x317)]['clear'](),this[_0x1c4a58(0x317)][_0x1c4a58(0x2a7)]());},Window_EventItem[_0x1d4f35(0x1be)][_0x1d4f35(0x44a)]=function(){const _0x53026e=_0x1d4f35,_0x8ec8d5=$gameMessage[_0x53026e(0x481)]();_0x8ec8d5===_0x53026e(0x4a8)&&Imported[_0x53026e(0x231)]?this['makeSkillList']():Window_ItemList[_0x53026e(0x1be)][_0x53026e(0x44a)][_0x53026e(0x162)](this);},Window_EventItem[_0x1d4f35(0x1be)][_0x1d4f35(0x2f6)]=function(){const _0x970858=_0x1d4f35,_0x395830=$gameMessage[_0x970858(0x515)]();this['_data']=_0x395830?_0x395830[_0x970858(0x414)]()['filter'](_0x13d73a=>this['includes'](_0x13d73a)):[],this[_0x970858(0x54e)](null)&&this[_0x970858(0x41d)]['push'](null);},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x540)]=Window_EventItem[_0x1d4f35(0x1be)][_0x1d4f35(0x54e)],Window_EventItem[_0x1d4f35(0x1be)][_0x1d4f35(0x54e)]=function(_0x5b4c30){const _0x3c2877=_0x1d4f35,_0x490067=$gameMessage[_0x3c2877(0x481)]();if(_0x490067===_0x3c2877(0x428)){if(!DataManager[_0x3c2877(0x4db)](_0x5b4c30))return![];const _0x3e4302=$gameMessage[_0x3c2877(0x52c)]();if(_0x3e4302>0x0){if(_0x5b4c30[_0x3c2877(0x2c3)]!==_0x3e4302)return![];}return!![];}else{if(_0x490067===_0x3c2877(0x345)){if(!DataManager[_0x3c2877(0x43c)](_0x5b4c30))return![];const _0x43b48f=$gameMessage['itemChoiceAtypeId']();if(_0x43b48f>0x0){if(_0x5b4c30[_0x3c2877(0x25d)]!==_0x43b48f)return![];}const _0x4194c7=$gameMessage[_0x3c2877(0x381)]();if(_0x4194c7>0x0){if(_0x5b4c30[_0x3c2877(0x525)]!==_0x4194c7)return![];}return!![];}else{if(_0x490067===_0x3c2877(0x4a8)){if(!DataManager[_0x3c2877(0x268)](_0x5b4c30))return![];const _0x4396d1=$gameMessage[_0x3c2877(0x515)]();if(_0x4396d1[_0x3c2877(0x1ef)](_0x5b4c30))return![];if(!_0x4396d1['isSkillTypeMatchForUse'](_0x5b4c30))return![];const _0xc1a94e=$gameMessage[_0x3c2877(0x460)]();if(_0xc1a94e>0x0){const _0x41ed34=DataManager[_0x3c2877(0x4d6)](_0x5b4c30);if(!_0x41ed34[_0x3c2877(0x54e)](_0xc1a94e))return![];}return!![];}else return VisuMZ[_0x3c2877(0x1bb)][_0x3c2877(0x540)][_0x3c2877(0x162)](this,_0x5b4c30);}}},VisuMZ[_0x1d4f35(0x1bb)][_0x1d4f35(0x3bf)]=Window_ItemList[_0x1d4f35(0x1be)]['drawItemNumber'],Window_ItemList[_0x1d4f35(0x1be)]['drawItemNumber']=function(_0x579671,_0x11b85d,_0x4c9ae7,_0x3348fd){const _0x51b653=_0x1d4f35,_0x2544a2=$gameMessage[_0x51b653(0x481)]();if(_0x2544a2===_0x51b653(0x4a8)){const _0x33f146=$gameMessage[_0x51b653(0x515)]();this[_0x51b653(0x2c5)](_0x33f146,_0x579671,_0x11b85d,_0x4c9ae7,_0x3348fd);}else VisuMZ[_0x51b653(0x1bb)][_0x51b653(0x3bf)][_0x51b653(0x162)](this,_0x579671,_0x11b85d,_0x4c9ae7,_0x3348fd);},Window_MapName[_0x1d4f35(0x1be)][_0x1d4f35(0x41c)]=function(){const _0xd3f4ee=_0x1d4f35;this[_0xd3f4ee(0x245)][_0xd3f4ee(0x1b2)]();let _0x297e13=$gameMap[_0xd3f4ee(0x49f)]();if(_0x297e13){const _0x5c94e6=this[_0xd3f4ee(0x348)];this[_0xd3f4ee(0x489)](0x0,0x0,_0x5c94e6,this[_0xd3f4ee(0x4c3)]()),_0x297e13=this[_0xd3f4ee(0x36d)](_0x297e13);const _0x2f4cc7=this[_0xd3f4ee(0x451)](_0x297e13)[_0xd3f4ee(0x51f)];this[_0xd3f4ee(0x1a4)](_0x297e13,Math['floor']((_0x5c94e6-_0x2f4cc7)/0x2),0x0);}},Window_MapName[_0x1d4f35(0x1be)]['realignMapName']=function(_0x25b121){const _0x5c9e4a=_0x1d4f35;if(_0x25b121[_0x5c9e4a(0x1f2)](/<LEFT>/gi))this['x']=0x0;else{if(_0x25b121[_0x5c9e4a(0x1f2)](/<CENTER>/gi))this['x']=Math[_0x5c9e4a(0x37b)]((Graphics[_0x5c9e4a(0x43a)]-this[_0x5c9e4a(0x51f)])/0x2);else _0x25b121[_0x5c9e4a(0x1f2)](/<RIGHT>/gi)&&(this['x']=Graphics[_0x5c9e4a(0x43a)]-this['width']);}_0x25b121=_0x25b121['replace'](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x25b121=_0x25b121[_0x5c9e4a(0x4ac)](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x25b121[_0x5c9e4a(0x1f2)](/<TOP>/gi))this['y']=0x0;else{if(_0x25b121[_0x5c9e4a(0x1f2)](/<MIDDLE>/gi))this['y']=Math[_0x5c9e4a(0x37b)]((Graphics[_0x5c9e4a(0x26b)]-this[_0x5c9e4a(0x470)])/0x2);else _0x25b121[_0x5c9e4a(0x1f2)](/<BOTTOM>/gi)&&(this['y']=Graphics[_0x5c9e4a(0x26b)]-this[_0x5c9e4a(0x470)]);}return _0x25b121=_0x25b121[_0x5c9e4a(0x4ac)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x25b121=_0x25b121[_0x5c9e4a(0x4ac)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x25b121[_0x5c9e4a(0x1f2)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x25b121=_0x25b121[_0x5c9e4a(0x4ac)](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x25b121[_0x5c9e4a(0x1f2)](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x25b121=_0x25b121[_0x5c9e4a(0x4ac)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x25b121;};