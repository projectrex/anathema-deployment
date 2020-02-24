/*:
* @plugindesc Custom menu for Rex: Anathema.
* @author Nicholas J. Duque
*/

var Imported = Imported || {};
Imported.REX_MainMenu = true;

var REX = REX || {};
REX.MM = REX.MM || {};

// ==============================================
// Window_MenuStatus
// ==============================================

REX.MM.Window_MenuStatus_initialize =
    Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(wx, wy) {
    wx += 144; // Add _initX to increase width via Yanfly's plugins (hacky af idgaf >w<\m/)
    REX.MM.Window_MenuStatus_initialize.call(this, wx, wy);
    //this.x = this.x + 48;
};

Window_MenuStatus.prototype.windowHeight = function() {
    return Graphics.boxHeight - (this.lineHeight() * 4);
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 3;
};

Window_MenuStatus.prototype.maxItems = function() {
    return 3;
};

Window_MenuStatus.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};


Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    var fw = Window_Base._faceWidth;
    this.drawActorFace(actor, rect.x + 1, rect.y + this.lineHeight(), fw, Window_Base._faceHeight - 16);
    this.changePaintOpacity(true);
};

// ==============================================
// Window_MenuActor
// ==============================================

Window_MenuActor.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorCharacter(actor, rect.x + 72, rect.y + 48 + this.lineHeight()); //this.drawSvActor(actor, rect.x + 48, rect.y + 60 + this.lineHeight(),48, 48);
    this.changePaintOpacity(true);
    //this.refresh();
};

Window_MenuActor.prototype.drawActorJp = function(actor, id, wx, wy, ww, align, useIcon) {
    var jp = actor.jp(id);
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    text = "\\}" + text;
    if (align === 'left') {
      //wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

Window_MenuActor.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    this.contents.fontSize = 18;
    var lineHeight = this.lineHeight() - 8;
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    x += 16;
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    width2 -= 16;

    // Segment 1
    this.drawActorName(actor, x - Window_Base._faceWidth, y);
    this.drawActorClass(actor, x, y, xpad);
    this.drawActorLevel(actor, x, y + lineHeight);
    if (Yanfly.Param.JpShowMenu) {
        var classId = actor.currentClass().id;
        this.drawActorJp(actor, classId, x, y + lineHeight * 2, xpad, 'left', true);
    }

    // Segment 2
    this.drawActorIcons(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    //lineHeight += 4;
    if (eval(Yanfly.Param.MenuTpGauge)) {
        this.drawActorMp(actor, x2, y + lineHeight * 2, (width2 / 2) - 4);
        this.drawActorTp(actor, x2 + (width2/2) + 8, y + lineHeight * 2, width2 / 2 - 8);
    }
    else {
        this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    }

    /*if (SceneManager._scene instanceof Scene_Menu) {
        // Draw Actor EXP To Next Level
        var expcolor1 = this.textColor(Yanfly.Param.ColorExp1);
        var expcolor2 = this.textColor(Yanfly.Param.ColorExp2);
        var expRate = 0.0;
        if (actor.level == actor.maxLevel())
            expRate = 1.0;
        else
            expRate = (1.0 * actor.currentExp() / actor.expForLevel(actor.level + 1)).clamp(0.0, 1.0);
        this.drawGauge(x2, y + lineHeight * 3, width2, expRate, expcolor1, expcolor2);
        this.changeTextColor(this.systemColor());
        text = TextManager.exp;
        this.drawText(text, x2, y + lineHeight * 3, width2, 'left');
    }*/
};

Window_MenuActor.prototype.numVisibleRows = function() {
    return $gameParty.size();
};

/*Window_MenuActor.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};*/

Window_MenuActor.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_MenuActor.prototype.maxItems = function() {
    return $gameParty.size();
};

// ==============================================
// Window_MenuPlaytime
// ==============================================

function Window_MenuPlaytime() {
    this.initialize.apply(this, arguments);
}

Window_MenuPlaytime.prototype = Object.create(Window_Base.prototype);
Window_MenuPlaytime.prototype.constructor = Window_MenuPlaytime;

Window_MenuPlaytime.prototype.initialize = function(x, y, width, height) {
    var width = 160; //var width = this.textWidth("00:00:00") + this.textPadding();
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.refresh();
};

Window_MenuPlaytime.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_MenuPlaytime.prototype.refresh = function() {
    var x = this.textPadding();
    this.contents.clear();
    this.resetTextColor();
    var width = this.contents.width - this.textPadding() * 2;
    this.drawText($gameSystem.playtimeText(), x, 0, width, 'left');
};


Window_MenuPlaytime.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

Window_MenuPlaytime.prototype.update = function() {
    this.refresh();
    Window_Base.prototype.update.call(this);
};

// ==============================================
// Window_MenuLocation
// ==============================================

function Window_MenuLocation() {
    this.initialize.apply(this, arguments);
}

Window_MenuLocation.prototype = Object.create(Window_Base.prototype);
Window_MenuLocation.prototype.constructor = Window_MenuLocation;

Window_MenuLocation.prototype.initialize = function(x, y, width, height) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.refresh();
};

Window_MenuLocation.prototype.windowWidth = function() {
    return 480;
};

Window_MenuLocation.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_MenuLocation.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    var mapName = $gameMap.displayName() ? $gameMap.displayName() : $dataMapInfos[$gameMap.mapId()].name;
    this.drawText(mapName, x, 0, width, 'center');
};

Window_MenuLocation.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

// ==============================================
// Other modifications
// ==============================================

// Pad the height of the menu commands for easier visuals
Window_MenuCommand.prototype.lineHeight = function() {
    return 58;
};

// Draw icons next to certain symbols
REX.MM.Window_MenuCommand_prototype_drawItem = Window_MenuCommand.prototype.drawItem;
Window_MenuCommand.prototype.drawItem = function(index) {
    /*var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);*/
    REX.MM.Window_MenuCommand_prototype_drawItem.call(this, index);
    var sym = this.commandSymbol(index);
    if (!sym) return;
    if (!rect) var rect = this.itemRectForText(index);
    var iconIndex = {item: 208,
                    skill: 127,
                    equip: 132,
                    class: 80,
                    status: 92,
                    formation: 82,
                    quest: 189,
                    options: 83,
                    save: 121,
                    gameEnd: 168};
    if (iconIndex[sym])
        this.drawIcon(iconIndex[sym], rect.x, rect.y + 14);
};

// Reposition menu status window for aesthetics and to accommodate potential help window
REX.MM.Scene_Menu_prototype_createStatusWindow =
    Scene_Menu.prototype.createStatusWindow;
Scene_Menu.prototype.createStatusWindow = function() {    
    REX.MM.Scene_Menu_prototype_createStatusWindow.call(this);
    console.log(this._statusWindow);
    this._statusWindow.y += 72;
};

// Add playtime and map name windows
var _Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this._playtime = new Window_MenuPlaytime(0, Graphics.boxHeight);
    this._playtime.y -= this._playtime.height;
    this._maplocation = new Window_MenuLocation(0,0);
    this.addWindow(this._playtime);
    this.addWindow(this._maplocation);
}


// Mod this window to display partial face graphic to accommodate extra line for name display
Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.lineHeight() - this.padding * 2;
        var y = h / 2 - this.lineHeight() * 1.5;
        var width = w - 162 - this.textPadding();
        this.drawActorFace(this._actor, 0, this.lineHeight(), Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, 162, y, width);
    }
};

// New function to combine drawActorClass and drawActorLevel
Window_Base.prototype.drawActorClassLevel = function(actor,x,y,width) {
    this.changeTextColor(this.systemColor());
    var textWidth = this.textWidth(TextManager.levelA);
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + textWidth, y, 36, 'left');
    var lvWidth = this.textWidth(actor.level);
    this.resetTextColor();
    this.drawText(actor.className(), x + textWidth + lvWidth + this.padding, y, width);
}

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    x += 16;
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    width2 -= 16;

    // Segment 1
    this.drawActorName(actor, x - Window_Base._faceWidth, y);
    this.drawActorClass(actor, x, y, xpad);
    if(SceneManager._scene instanceof Scene_Menu) {
        // Draw Actor EXP To Next Level
        var expcolor1 = this.textColor(Yanfly.Param.ColorExp1);
        var expcolor2 = this.textColor(Yanfly.Param.ColorExp2);
        var expRate = 0.0;
        var expX = x;
        var expY = y + lineHeight;
        var expWidth = xpad - 16;
        if (actor.level == actor.maxLevel())
            expRate = 1.0;
        else
            expRate = (1.0 * actor.currentExp() / actor.expForLevel(actor.level + 1)).clamp(0.0, 1.0);
        this.drawGauge(expX, expY, expWidth, expRate, expcolor1, expcolor2);
        //this.changeTextColor(this.systemColor());
        //text = TextManager.exp;
        //this.drawText(text, expX, expY, expWidth, 'left');
    }
    this.drawActorLevel(actor, x, y + lineHeight);
    if (Yanfly.Param.JpShowMenu) {
        var classId = actor.currentClass().id;
        this.drawActorJp(actor, classId, x, y + lineHeight * 3, xpad, 'left');
    }

    // Segment 2
    this.drawActorIcons(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    //lineHeight += 4;
    if (eval(Yanfly.Param.MenuTpGauge)) {
        this.drawActorMp(actor, x2, y + lineHeight * 2, (width2 / 2) + 56);
        this.drawActorTp(actor, x2 + (width2/2) + 64, y + lineHeight * 2, (width2 / 2) - 64);
    }
    else {
        this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    }
};

Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    var jp = actor.jp(id);
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    //text = "\\}" + text;
    if (align === 'left') {
      //wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.className(), x, y, width);
};


/* REX.ModClassJPDisplay.Window_Base_drawActorJp = Window_Base.prototype.drawActorJp;
Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    align = 'right';
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    wx = wx + xpad;
    wy = wy;
    
    REX.ModClassJPDisplay.Window_Base_drawActorJp.call(this, actor, id, wx, wy, ww, align);
}; */

/*Yanfly.JP.Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function(actor, wx, wy, ww) {
    ww = ww || 168;
    Yanfly.JP.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);
    if (!this._drawMenuJP) return;
    var classId = actor.currentClass().id;
    this.drawActorJp(actor, classId, wx, wy, ww, 'right');
};*/

/*Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x, y + lineHeight * 3);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
};*/

/*REX.DrawActorSimpleStatus.Window_Base_drawActorClass = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function(actor, wx, wy, ww) {
    var lineHeight = this.lineHeight();
    wx = wx - 156;
    wy = wy + lineHeight * 2;

    //REX.DrawActorSimpleStatus.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);


    //ww = ww || 168;
    Yanfly.JP.Window_Base_drawActorClass.call(this, actor, wx, wy, ww);
    if (!this._drawMenuJP) return;
    var classId = actor.currentClass().id;
    this.drawActorJp(actor, classId, wx, wy + lineHeight, ww, 'right');
};*/