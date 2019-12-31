
var Imported = Imported || {};
Imported.REX_X_AugmentSlotChance = true;

var REX = REX || {};

/*~struct~WeapAugmentChances:
@param Augment
@type select
@option Glyph
@option Rune
@option Gem

@param PercentChance
@type number
*/

/*~struct~ArmorAugmentChances:
@param Augment
@type select
@option Sphere
@option Gem

@param PercentChance
@type number
*/

/*:
@plugindesc v1.00 Extension for Yanfly's Augment Attachment to give items a chance for added attachment slots.
@author Nicholas Duque

@param Weapons

@param L12Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L20Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L30Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L39Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L47Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L55Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param L61Weapon
@parent Weapons
@type struct<WeapAugmentChances>[]

@param Armors

@param L11Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L21Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L31Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L40Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L49Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L56Armor
@parent Armors
@type struct<ArmorAugmentChances>[]

@param L62Armor
@parent Armors
@type struct<ArmorAugmentChances>[]
*/

REX.AugmentChances = {};
REX.PluginParams = PluginManager.parameters('REX_X_AugmentSlotChance');

for (var key in REX.PluginParams) {
    if (REX.PluginParams[key].length <= 0) continue;
    REX.AugmentChances[key] = [];
    var arr = JSON.parse(REX.PluginParams[key]);
    for (var i = 0; i < arr.length; i++) {
        REX.AugmentChances[key].push(JSON.parse(arr[i]));
        REX.AugmentChances[key][i]['PercentChance'] = Number(REX.AugmentChances[key][i]['PercentChance']);
    }
};

// TOTAL OVERRIDE
DataManager.processAugmentNotetags1 = function(group, isWeapon) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);
  
      if (isWeapon) {
        obj.augmentSlots = JsonEx.makeDeepCopy(Yanfly.Param.AugmentWeapons);
      } else {
        obj.augmentSlots = JsonEx.makeDeepCopy(Yanfly.Param.AugmentArmors);
      }
      
      var evalMode = 'none';
  
      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:AUGMENT SLOT|AUGMENT SLOTS)>/i)) {
          var evalMode = 'augment slots';
          obj.augmentSlots = [];
        } else if (line.match(/<\/(?:AUGMENT SLOT|AUGMENT SLOTS)>/i)) {
          var evalMode = 'none';
        } else if (evalMode === 'augment slots') {
          obj.augmentSlots.push(line.trim());
        } else if (line.match(/<(?:NO AUGMENTS|NO AUGMENT SLOTS)>/i)) {
          obj.augmentSlots = [];
        }
      }

      if (obj.augmentSlots && obj.augmentSlots.length > 0) {
          for (var i = 0; i < obj.augmentSlots.length; i++) {
              if (obj.augmentSlots[i] === "") obj.augmentSlots.splice(i);
              i--;
          }
      }
    }
};

REX.GetNewItemAugments = function (key) {
    var augmentArray = [];
    if (!REX.AugmentChances[key]) return;

    for (var i = 0; i < REX.AugmentChances[key].length; i++){
        if (Math.random() <= (REX.AugmentChances[key][i].PercentChance / 100)) {
            augmentArray.push(REX.AugmentChances[key][i].Augment);
        }
    }

    return augmentArray;
};

REX.AddNewItemAugments = function (obj, key) {
    if (!REX.AugmentChances[key]) return;

    for (var i = 0; i < REX.AugmentChances[key].length; i++){
        if (REX.AugmentChances[key][i].Augment != "" && Math.random() <= (REX.AugmentChances[key][i].PercentChance / 100)) {
            obj.augmentSlots.push(REX.AugmentChances[key][i].Augment);
        }
    }
};