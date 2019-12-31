
var Imported = Imported || {};
Imported.REX_ModClassJPDisplay = true;

var REX = REX || {};
REX.ModClassJPDisplay = REX.ModClassJPDisplay || {};


Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    this._drawMenuJP = Yanfly.Param.JpShowMenu;

    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x + width - 80, y);
    this.drawActorIcons(actor, x, y + lineHeight * 1);
    this.drawActorClass(actor, x + 16, y + lineHeight * 1, xpad - 16);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    if (eval(Yanfly.Param.MenuTpGauge)) {
      this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
    }

    this._drawMenuJP = undefined;
};

REX.ModClassJPDisplay.Window_Base_drawActorJp = Window_Base.prototype.drawActorJp;
Window_Base.prototype.drawActorJp = function(actor, id, wx, wy, ww, align) {
    align = 'right';
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    wx = wx + xpad - 32;
    wy = wy - this.lineHeight();
    
    REX.ModClassJPDisplay.Window_Base_drawActorJp.call(this, actor, id, wx, wy, ww, align);
};

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