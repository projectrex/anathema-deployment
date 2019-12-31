
var REX = REX || {};
REX.MiscUtil = REX.MiscUtil || {};

REX.itemGetr = function (text, item, num)
{
    // Failsafe
    num = num && num > 0 ? num : 1;

    REX.gainItemr(text, item, num);
}

REX.gainItemr = function(text, item, num)
{
    var itype;

    // Prefix for the message macro
    if (!item.etypeId)
        itype = 'i';
    if (item.etypeId === 1)
        itype = 'w';
    if (item.etypeId > 1)
        itype = 'a';

    if (!item || item == null)
    {
        console.error("Invalid item");
        return;
    }

    $gameParty.gainItem(item, num);

    //var text = preText + " " + num + "x " + "[\\i" + iType + "[" + item.id + "]]" + " " + postText;
    text = "\\m[inf]" + text.format(num, "[\\i" + itype + "[" + item.id + "]]");

    $gameMessage.setPositionType(1);
    $gameMessage.add(text);
}

REX.moveFollowerTo = function (follower, x, y) {
    var moveStr = "Move To: " + x + ", " + y;
    $gamePlayer.followers().follower(follower).forceMoveRoute({"list":[{"code":45,"parameters":[moveStr],"indent":null},{"code":0}],"repeat":false,"skippable":false,"wait":false});
}


REX.lerp = function (a, b, t)
{
    return (a + ((b - a) * t)).clamp(a,b);
}

REX.eventDistantSE = function(evId, seName, minVol, maxVol)
{
    var event = $gameMap.event(evId);
    var dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, event.x, event.y);
    var vol;

    if (dist < 5)
        vol = maxVol;
    else
        vol = REX.lerp(minVol, maxVol, 1.0 - (dist) / 30.0);

    AudioManager.playSe({name : seName, volume: vol, pitch: 100});
}