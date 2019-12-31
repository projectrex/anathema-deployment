/*~struct~ItemGood:
@param Level
@type number
@default 1

@param Item
@type item

@param Use Custom Price
@type number
@min 0
@max 1
@default 0

@param Custom Price
@type number
@default 0
*/
/*~struct~WeaponGood:
@param Level
@type number
@default 1

@param Weapon
@type weapon

@param Use Custom Price
@type number
@min 0
@max 1
@default 0

@param Custom Price
@type number
@default 0
*/

/*~struct~ArmorGood:
@param Level
@type number
@default 1

@param Armor
@type armor

@param Use Custom Price
@type number
@min 0
@max 1
@default 0

@param Custom Price
@type number
@default 0
*/

/*~struct~LeveledItemShop:
@param Name
@type text

@param Item Goods
@type struct<ItemGood>[]

@param Weapon Goods
@type struct<WeaponGood>[]

@param Armor Goods
@type struct<ArmorGood>[]
*/

/*:
@plugindesc A function and table of item shops to generate goods tables based on level.

@param Shops
@type struct<LeveledItemShop>[]
*/

// Good = [(item,weapon,armor), (id), (default price = 0), (if not default price, custom price here)]
// Array of [x,y,z,a]; is pushed to goods if level requirement is met

var Imported = Imported || {};
Imported.REX_LeveledItemShops = true;
REX.PluginParams = PluginManager.parameters('REX_LeveledItemShops');
REX.PluginParams = JSON.parse(REX.PluginParams['Shops']);

var REX = REX || {};
REX.LeveledItemShops = {};

for (var i = 0; i < REX.PluginParams.length; i++) {
    var shop = JSON.parse(REX.PluginParams[i]);
    if (!shop['Name']) continue;
    var shopName = shop['Name'];
    REX.LeveledItemShops[shopName] = {};
    var str = ['Item', 'Weapon', 'Armor']
    for (var k = 0; k < str.length; k++) {
        var goodStr = str[k] + ' Goods';
        if(!shop[goodStr]) continue;
        var iGoods = JSON.parse(shop[goodStr]);
        if (iGoods && iGoods.length > 0) {
            for (var j = 0; j < iGoods.length; j++) {
                var iGood = JSON.parse(iGoods[j]);
                var good = [k, Number(iGood[str[k]]), Number(iGood['Use Custom Price']), Number(iGood['Custom Price'])];
                if (!REX.LeveledItemShops[shopName][iGood['Level']]) REX.LeveledItemShops[shopName][iGood['Level']] = [];
                REX.LeveledItemShops[shopName][iGood['Level']].push(good);
            }
        }
    }
};

REX.pushLeveledShop = function (name) {
    var shop = REX.LeveledItemShops[name];
    if(!shop) return;

    var level = $gameParty.highestLevelAllMembers();
    var goods = [];
    for (var key in shop) {
        if (level >= key) {
            for (var i = 0; i < shop[key].length; i ++)
                goods.push(shop[key][i]);
        }
    }

    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene(goods, 0);
}