

var Imported = Imported || {};

var REX = REX || {};

/*~struct~PhaseMapIDs:
@param SquareID
@type number

@param VillageID
@type number
*/

/*:
* @plugindesc Place BELOW REX_MapTransfer.
*
* @param Eloa Phases
* @type struct<PhaseMapIDs>[]
*/

if (!Imported.REX_EloaTransfer) {
    REX.EloaSquare = 0;
    REX.EloaVillage = 1;

    REX.EloaTransfers = [];

    REX.PluginParams = PluginManager.parameters('REX_EloaTransfer');
    REX.PluginEloaPhases = JSON.parse(REX.PluginParams['Eloa Phases']);

    for (var i = 0; i < REX.PluginEloaPhases.length; i++) {
        var phase = JSON.parse(REX.PluginEloaPhases[i]);
        var sqId = Number(phase['SquareID']);
        var vId = Number(phase['VillageID']);
        if (!sqId || !vId) {
            console.log("Error: Invalid id in " + phase);
            continue;
        }
        REX.EloaTransfers.push([Number(sqId), Number(vId)]);
    }

    Imported.REX_EloaTransfer = true;
}

REX.getEloaMapID = function(phase, loc) {
    return REX.EloaTransfers[phase][loc];
}