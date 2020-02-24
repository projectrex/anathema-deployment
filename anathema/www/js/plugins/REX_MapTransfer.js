var Imported = Imported || {};
Imported.REX_MapTransfer = true;

var REX = REX || {};

REX.setTransferCoordinates = function (x, y) {
    $gameTemp.transferCoordinates = [];
    $gameTemp.transferCoordinates[0] = x;
    $gameTemp.transferCoordinates[1] = y;
}

REX.getTransferCoordinates = function() {
    if (!$gameTemp.transferCoordinates) REX.setTransferCoordinates(-1, -1);

    return $gameTemp.transferCoordinates;
}

REX.locateViaEvVar = function() {
    var ev = $gameMap.event($gameVariables.value(2));
    var x = ev.x;
    var y = ev.y;

    // dir is numpad based
    var dir = $gameVariables.value(6) ? $gameVariables.value(6) : $gamePlayer.direction();

    switch (dir) {
        case 2: // Down
            y++; 
            break;
        case 4: // Left
            x--;
            break;
        case 6: // Right
            x++;
            break;
        case 8:// Up
            y--;
            break;
    }

    $gamePlayer.locate(x, y);
    $gamePlayer.setDirection(dir);
}