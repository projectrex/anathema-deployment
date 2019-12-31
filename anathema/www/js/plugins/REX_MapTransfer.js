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
