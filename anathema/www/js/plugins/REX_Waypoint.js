/*:
 * @plugindesc Waypoints for Rex Anathema. Place UNDER REX_CastleDB as that is where Waypoint data is defined.
 * @author Nicholas J. Duque
 * 
 * @help 
 * 
 */
var REX = REX || {};
REX.Waypoints = REX.Waypoints || {};

REX.Waypoints.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    REX.Waypoints.Game_System_initialize.call(this);
    this.initWaypointsEnabled();
};

Game_System.prototype.initWaypointsEnabled = function() {
    this._waypointsEnabled = [];
};

Game_System.prototype.enableWaypoint = function (wpId) {
    if (!$dataWaypoints.hasOwnProperty(wpId))
        return false;

    if (!this._waypointsEnabled) this.initWaypointSettings();

    this._waypointsEnabled.push(wpId);
    this._waypointsEnabled.sort(function (a, b) {
       return ($dataWaypoints[a].index - $dataWaypoints[b].index); 
    });
};

Game_System.prototype.isWaypointEnabled = function (wpId) {
    return this._waypointsEnabled.contains(wpId);
};

REX.Waypoints.locateViaWpId = function () {
    var wpInfo = $dataWaypoints[$gameTemp.waypointTele];
    
    if (!wpInfo)
    {
        console.error("Invalid wpInfo " + wpInfo);
    }

    var ev = $gameMap.event(wpInfo.eventId);
    var x = ev.x + wpInfo.xOffset;
    var y = ev.y + wpInfo.yOffset;

    $gamePlayer.locate(x, y);
};

REX.Waypoints.pushChoices = function () {
    choices = []; params = []; callbackArr = [];

    var i = 1;

    for (var key in $dataWaypoints) {
        var txt = "????"
        if ($gameSystem.isWaypointEnabled(String(key))) {
            txt = $dataWaypoints[key].displayName
            if ($gameMap.mapId() == $dataWaypoints[key].mapId) {
                txt = "\\c[6]>" +  txt + "<";
                $gameSystem.disableChoice(i);
            }
        } else {
            $gameSystem.disableChoice(i);
        }
        choices.push(txt);
        callbackArr.push(key);
        i++;
    }

    choices.push("Cancel");

    $gameMessage.setChoicePositionType(1);
    $gameMessage.setChoices(choices, [2,choices.length - 1]);
    $gameMessage.setChoiceCallback(function(n) {
        $gameSystem.clearChoiceSettings();
        if (n != (choices.length - 1)) {
            //REX.Waypoints.waypointTele(callbackArr[n]);
            var wpId = callbackArr[n];
            if (!wpId || !$dataWaypoints[wpId]) return false;
            $gameTemp.waypointTele = wpId;
            $gameVariables.setValue(3, $dataWaypoints[wpId].mapId);
            $gameTemp.reserveCommonEvent(17);
        }
    });
};