/*~struct~ItemDrop:
@param Item
@type item

@param Conditions
@type text[]
*/
/*~struct~WeaponDrop:
@param Weapon
@type weapon

@param Conditions
@type text[]
*/
/*~struct~ArmorDrop:
@param Armor
@type armor

@param Conditions
@type text[]
*/

/*
-@param DropConditions
-@type select
-@option None
-@option Eval
-@option Alive Members
-@option Always
-@option Count
-@option Dead Members
-@option Death Turn
-@option Enemy Level
-@option Last Strike
-@option Party Members
-@option Random
-@option Times Struck
-@option Switch
-@option Turn
-@option Variable*/

/*~struct~EnemyDropTable:
@param name
@text Identifier
@type text

@param Item Drops
@type struct<ItemDrop>[]

@param Weapon Drops
@type struct<WeaponDrop>[]

@param Armor Drops
@type struct<ArmorDrop>[]
*/

/*:
@plugindesc v1.00 Extension for Yanfly's Extra Enemy Drops to be able to have preset tables of enemy drops.
@author Nicholas Duque

@param Drop Tables
@type struct<EnemyDropTable>[]

@help
* The following are various conditions used by Yanfly's Extra Enemy Drops:
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALIVE MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of alive party members the player has when the drops
 * are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Alive Members > 1: +20%
 *            Alive Members === 2: +25%
 *            Alive Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALWAYS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This condition will always pass. This can be used as setting a base rate for
 * the item drop.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Always: +50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * item x COUNT EVAL
 * weapon x COUNT EVAL
 * armor x COUNT EVAL
 * named item COUNT EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the quantity of specific items, weapons, armors, and/or named
 * items you have. If you choose a named item and multiple database entries
 * share the name of that named item, priority will be given to the highest ID
 * in the order of items, weapons, and then armor.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Item 1 Count > 1: +20%
 *            Weapon 2 Count === 2: +25%
 *            Armor 3 Count <= 3: -30%
 *            Potion Count >= 4: +35%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEAD MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of dead party members the player has when the drops
 * are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Dead Members > 1: +20%
 *            Dead Members === 2: +25%
 *            Dead Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEATH TURN EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the turn number the enemy has died.
 * This effect requires the Battle Engine Core.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Death Turn > 5: +10%
 *            Death Turn === 5: +20%
 *            Death Turn <= 4: +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ENEMY LEVEL EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the enemy's level. This effect
 * requires the YEP Enemy Levels plugin.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Enemy Level === 10: +30%
 *            Enemy Level <= 5: -20%
 *            Enemy Level >= 15: +10%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check for the code you've inserted. If it returns true
 * then the condition is met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval user.name() === 'Bat A': +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * LAST STRIKE SKILL X
 * LAST STRIKE ITEM X
 * LAST STRIKE named
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks to see if the last strike on the enemy is item x, skill x, or a
 * named action. If a named action is used and multiple database entries share
 * the name of the action, priority will be given to the highest ID in the
 * order of skills then items.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Last Strike Skill 40: +20%
 *            Last Strike Item 50: -30%
 *            Last Strike Firaga: +40%
 *            Last Strike Ice Bomb: -50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PARTY MEMBERS EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This checks the number of party members (dead or alive) the player has when
 * the drops are being calculated and made and runs it against an eval check.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Members > 1: +20%
 *            Party Members === 2: +25%
 *            Party Members <= 3: -30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM X%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This condition has a random x% chance to pass.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random 20%: +40%
 *            Random 30%: -60%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES ELEMENT X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by element x.
 * You can also replace x with the name of the item.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Element Fire Struck > 6: +10%
 *            Times Element 3 Struck === 5: -10%
 *            Times Element Thunder <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES ITEM X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by item x. You
 * can also replace x with the name of the item.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Item Bomb Struck > 6: +10%
 *            Times Item 42 Struck === 5: -10%
 *            Times Item Uni Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES SKILL X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by skill x. You
 * can also replace x with the name of the skill.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times Skill Firaga Struck > 6: +10%
 *            Times Skill 40 Struck === 5: -10%
 *            Times Skill Thundaga Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES STATE X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by state x.
 * You can also replace x with the name of the state.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times State 4 Struck > 6: +10%
 *            Times State Blind Struck === 5: -10%
 *            Times State Silence Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TIMES STYPE X STRUCK EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This compares the number of times the enemy has been struck by skill type x.
 * You can also replace x with the name of the skill type.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Times SType 1 Struck > 6: +10%
 *            Times SType Magic Struck === 5: -10%
 *            Times SType Special Struck <= 4: +20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH X ON
 * SWITCH X OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace X with a switch ID. If switch X is ON or OFF, the condition is met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 5 ON: +10%
 *            Switch 6 OFF: -10%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN EVAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run an eval check to compare the number of turns the battle has
 * gone on for until the time the drops have been made.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Turn > 5: +10%
 *            Turn === 5: +20%
 *            Turn <= 4: +30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
*/

var Imported = Imported || {};
Imported.REX_X_EnemyDropTables = true;

var REX = REX || {};

REX.PluginParams = PluginManager.parameters('REX_X_EnemyDropTables');
REX.DropTablesRaw = JSON.parse(REX.PluginParams['Drop Tables']);
REX.DropTables = {};

// TOTAL OVERRIDE
DataManager.processEEDNotetags1 = function(group) {
  // Prep drop tables
  for (var i = 0; i < REX.DropTablesRaw.length; i++) {
    // Get raw  Drop Tables
    var table = JSON.parse(REX.DropTablesRaw[i]);
    if (table) {
      REX.DropTables[table.name] = [];

      // Process Drop Items
      if (table['Item Drops']) {
        var dropsItems = JSON.parse(table['Item Drops']);

        for (var j = 0; j < dropsItems.length; j++) {
          var line = JSON.parse(dropsItems[j]);
          var item = $dataItems[line['Item']];
          var conditions = JSON.parse(line['Conditions']);
          REX.DropTables[table.name].push([item, conditions]);
        }
      }
      
      // Process Drop Weapons
      if (table['Weapon Drops']) {
        var dropsWeapons = JSON.parse(table['Weapon Drops']);

        for (var j = 0; j < dropsWeapons.length; j++) {
          var line = JSON.parse(dropsWeapons[j]);
          var weapon = $dataWeapons[line['Weapon']];
          var conditions = JSON.parse(line['Conditions']);
          REX.DropTables[table.name].push([weapon, conditions]);
        }
      }

      // Process Drop Armors
      if (table['Armor Drops']) {
        var dropsArmors = JSON.parse(table['Armor Drops']);
        
        for (var j = 0; j < dropsArmors.length; j++) {
          var line = JSON.parse(dropsArmors[j]);
          var armor = $dataArmors[line['Armor']];
          var conditions = JSON.parse(line['Conditions']);
          REX.DropTables[table.name].push([armor, conditions]);
        }
      }
    }
  }

  // Continue Yanfly's plugin as usual
  var noteD1 = /<(?:ITEM|DROP ITEM)[ ](\d+):[ ](\d+)([%％])>/i;
  var noteD2 = /<(?:WEAPON|DROP WEAPON)[ ](\d+):[ ](\d+)([%％])>/i;
  var noteD3 = /<(?:ARMOR|DROP armor)[ ](\d+):[ ](\d+)([%％])>/i;
  var noteD4 = /<(?:REX[ ]DROP[ ]TABLE):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.dropsMade) continue;
    var notedata = obj.note.split(/[\r\n]+/);

    obj.dropsMade = true;
    obj.conditionalDropItems = [];
    var conditionalLines = [];
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteD1)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 1);
      } else if (line.match(noteD2)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 2);
      } else if (line.match(noteD3)) {
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 3);
      } else if (line.match(noteD4)) {
        var tableName = String(RegExp.$1);
        if (!REX.DropTables[tableName]) {console.log("Can't find REX.DropTables[" + tableName + "]"); continue;}
        for (var j = 0; j < REX.DropTables[tableName].length; j++) {
          obj.conditionalDropItems.push(REX.DropTables[tableName][j]);
        }
      } else if (line.match(/<DROP[ ](.*):[ ](\d+)([%％])>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2) * 0.01;
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var kind = 1;
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var kind = 2;
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var kind = 3;
        } else {
          continue;
        }
        this.createEnemyDrop(obj, id, rate, kind);
      } else if (line.match(/<(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = 'drops';
      } else if (line.match(/<\/(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'drops') {
        if (line.match(/ITEM[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 1);
        } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 2);
        } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)([%％])/i)) {
          var id = parseInt(RegExp.$1);
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 3);
        } else if (line.match(/(.*):[ ](\d+)([%％])/i)) {
          var name = String(RegExp.$1).toUpperCase();
          var rate = parseFloat(RegExp.$2) * 0.01;
          if (Yanfly.ItemIdRef[name]) {
            var id = Yanfly.ItemIdRef[name];
            var kind = 1;
          } else if (Yanfly.WeaponIdRef[name]) {
            var id = Yanfly.WeaponIdRef[name];
            var kind = 2;
          } else if (Yanfly.ArmorIdRef[name]) {
            var id = Yanfly.ArmorIdRef[name];
            var kind = 3;
          } else {
            continue;
          }
          this.createEnemyDrop(obj, id, rate, kind);
        }
      } else if (line.match(/<CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = 'conditionalDrop';
        conditionalLines = [];
      } else if (line.match(/<\/CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = 'none';
        var name = String(RegExp.$1).toUpperCase();
        if (name.match(/ITEM[ ](\d+)/i)) {
          var item = $dataItems[parseInt(RegExp.$1)];
        } else if (name.match(/WEAPON[ ](\d+)/i)) {
          var item = $dataWeapons[parseInt(RegExp.$1)];
        } else if (name.match(/ARMOR[ ](\d+)/i)) {
          var item = $dataArmors[parseInt(RegExp.$1)];
        } else if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var item = $dataItems[id];
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var item = $dataWeapons[id];
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var item = $dataArmors[id];
        } else {
          continue;
        }
        if (!item) continue;
        var arr = [item, conditionalLines];
        obj.conditionalDropItems.push(arr);
        conditionalLines = [];
      } else if (evalMode === 'conditionalDrop') {
        conditionalLines.push(line);
      }
    }
  }
};