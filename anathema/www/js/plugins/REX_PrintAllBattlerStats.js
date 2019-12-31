
var Imported = Imported || {};
Imported.REX_PrintAllBattlerStats = true;

var REX = REX || {};

/*:
* @plugindesc Use REX.printAllBattlerStats() to print the stats of all battlers 
* in the current battle.
* 
* @help
* REX.printAllBattlerStats() console command will print stats of all battlers in the current battle.
*/

REX.printAllBattlerStats = function() {
    var statNames = ["MHP",
                    "MMP",
                    "ATK",
                    "DEF",
                    "MAT",
                    "MDF",
                    "AGI",
                    "LUK"];

    console.log("==ALIVE FRIENDS==");
    var pMembers = $gameParty.aliveMembers();
    for (var i = 0; i < pMembers.length; i++)
    {
        console.log("Lv" + pMembers[i].level + " " + pMembers[i].name());
        for (var j = 2; j < 8; j++)
        {
            console.log("   " + statNames[j] + ": " + pMembers[i].param(j));
        }
    }

    console.log("==ALIVE ENEMIES==");
    var tMembers = $gameTroop.aliveMembers();
    for (var i = 0; i < tMembers.length; i++)
    {
        console.log(tMembers[i].name() + "(MAXHP:" + tMembers[i].param(0) + ")");
        for (var j = 2; j < 8; j++)
        {
            console.log("   " + statNames[j] + ": " + tMembers[i].param(j));
        }
    }
}