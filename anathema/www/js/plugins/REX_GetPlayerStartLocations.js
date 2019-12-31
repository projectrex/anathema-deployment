
var Imported = Imported || {};
Imported.REX_GetPlayerStartLocations = true;

var REX = REX || {};

/*~struct~ActorStartMarker:
@param MapID
@type number

@param EventID
@type number
*/

/*:
@param Actor 1 Start
@type struct<ActorStartMarker>

@param Actor 2 Start
@type struct<ActorStartMarker>

@param Actor 3 Start
@type struct<ActorStartMarker>

@param Actor 4 Start
@type struct<ActorStartMarker>

@param Actor 5 Start
@type struct<ActorStartMarker>

@param Actor 6 Start
@type struct<ActorStartMarker>

@param Actor 7 Start
@type struct<ActorStartMarker>
*/

REX.PlayerStartLocations = {};

REX.getPlayerStartLocations = function () {
    var playerStartLocations = PluginManager.parameters('REX_GetPlayerStartLocations');
    for (var i = 0; i < 7; i++) {
        REX.PlayerStartLocations[i] = JSON.parse(playerStartLocations["Actor " + (i + 1) + " Start"] || null);
        if (REX.PlayerStartLocations[i]) {
            REX.PlayerStartLocations[i].MapID = Number(REX.PlayerStartLocations[i].MapID);
            REX.PlayerStartLocations[i].EventID = Number(REX.PlayerStartLocations[i].EventID);
        }
    }
}