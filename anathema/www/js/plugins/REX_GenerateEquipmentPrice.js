
var Imported = Imported || {};
Imported.REX_GenerateEquipmentPrice = true;

var REX = REX || {};

REX.generateEquipmentPrice = function(baseItem) {
    var statWorth = [5,
                     5,
                     50,
                     50,
                     50,
                     50,
                     50,
                     50,
                     25,
                     60];

    var price = 0;

    for (var i = 0; i < 8; i++) {
        price += baseItem.params[i] * statWorth[i];
    }

    return price;
}