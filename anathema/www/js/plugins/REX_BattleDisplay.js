//=============================================================================
 /*:
 * @plugindesc Added and modified functionality to the Battle windows.
 * @author Nicholas J. Duque
 * */

 //=============================================================================
 // Sprite_BattleAction
 //=============================================================================

 /*
 * Currently (1/7/2020 12:23AM) update will kill all contents of sprite every frame,
 *    and update based on currently acting entity's action
 * Next iteration should include:
 *  - Y-coordinate starts at spriteHeight / 2, ends at sprightHeight after (30?) frames, lingers for 60 more frames
 *  - New displaySpriteText clears previous text to make way for latest acting entity
 *  - End of turn signals clear for this sprite so item display name doesn't linger while player is deciding moves
 * Currently (1/8/2020 2:02AM) drawSpriteText clears bitmap and draws text and potential icon of action/item
 * Next iteration should:
 *  - End of turn signals clear for this sprite so item display name doesn't linger while player is deciding moves
 *  - POSSIBLY refactor as a Spriteset that creates new Sprites for each call of displaySpriteText
 *  - - This would cause sprite text to linger until timer runs out
 */

 var Imported = Imported || {};
 Imported.REX_MainMenu = true;
 
 var REX = REX || {};
 REX.BattleDisplay = REX.BattleDisplay || {};
 REX.BattleDisplay.yMoveTime = 10;
 REX.BattleDisplay.holdTime = 70;
 REX.BattleDisplay.decayFactor = 5;

 function Sprite_BattleAction() {
    this.initialize.apply(this, arguments);
    this._target = null;
    this._tHeight = 38;
    this.bitmap = new Bitmap(Graphics.boxWidth, this._tHeight);
    this._yBase = Graphics.boxHeight / 2;
    this._yTarget = Graphics.boxHeight / 2;
    this._yDiff = this._yBase - this._yTarget;
    this._yMoveFrames = 0;
    this._iconOffset = 0;
    this._displayText = "";
}

Sprite_BattleAction.prototype = Object.create(Sprite_Base.prototype);
Sprite_BattleAction.prototype.constructor = Sprite_Base;

Sprite_BattleAction.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};

Sprite_BattleAction.prototype.displaySpriteText = function(battler, text, icon) {
    this.bitmap.clear();

    this._target = battler;
    this._displayText = text;
    this._iconOffset = (icon ? 32 : 0);

    var w = this.bitmap.measureTextWidth(this._displayText) + this._iconOffset;

    this._yTarget = this._target.spritePosY() - this._target.spriteHeight() - this._tHeight;
    this._yBase = this._target.spritePosY() - this._tHeight; // Set a base for the Lerp function
    this._yDiff = this._yBase - this._yTarget; // yBase is a higher value than yTarget, so subtract yTarget from yBase for a positive value
    this._moveFrames = 0; // Set 0 so update can add to it until we hit REX.BattleDisplay.yMoveTime

    this.x = this._target.spritePosX() - (w / 2) - (this._iconOffset);
    this.y = this._yBase;
    this.opacity = 255;

    this.bitmap.drawText(this._displayText, 0 + this._iconOffset, 0, w, this._tHeight, 'left');
    if (icon)
        this.drawIcon(icon, 0, 0);
};

Sprite_BattleAction.prototype.updateXPos = function() {
    var w = this.bitmap.measureTextWidth(this._displayText) + this._iconOffset;

    this.x = this._target.spritePosX() - (w / 2) - (this._iconOffset / 3);
};



Sprite_BattleAction.prototype.updateYPos = function() {
    var moveTime = (this._moveFrames / REX.BattleDisplay.yMoveTime);

    this.y = this._yBase - REX.lerp(0, this._yDiff, moveTime);
    this.scale.y = REX.lerp(0, 1, moveTime);
};

Sprite_BattleAction.prototype.update = function() {
    if (!this._target) return;

    this._moveFrames++;
    
    this.updateXPos();
    if (this._moveFrames < REX.BattleDisplay.yMoveTime)
        this.updateYPos();
    else if (this._moveFrames > REX.BattleDisplay.holdTime) {
        this.opacity -= REX.BattleDisplay.decayFactor;
        if (this.opacity <= 0) this.clear();
    }
};

Sprite_BattleAction.prototype.clear = function() {
    this.bitmap.clear();
    this._target = null;
    this._iconOffset = 0;
    this._displayText = "";
};


REX.BattleDisplay.Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
Window_BattleLog.prototype.initialize = function() {
    this.rActionDisplay = new Sprite_BattleAction();
    REX.BattleDisplay.Window_BattleLog_initialize.call(this, arguments);
    this.addChild(this.rActionDisplay);
};

REX.BattleDisplay.Window_BattleLog_displayAction =
    Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    //REX.BattleDisplay.Window_BattleLog_displayAction.call(this, subject, item);
    console.log(item);
    this.rActionDisplay.displaySpriteText(subject, this.displayText(item), item.iconIndex);
};

REX.BattleDisplay.Window_BattleLog_clear =
    Window_BattleLog.prototype.clear;
Window_BattleLog.prototype.clear = function() {
    REX.BattleDisplay.Window_BattleLog_clear.call(this, arguments);
    this.rActionDisplay.clear();
};

REX.BattleDisplay.Window_BattleLog_update =
    Window_BattleLog.prototype.update;
Window_BattleLog.prototype.update = function() {
    REX.BattleDisplay.Window_BattleLog_update.call(this, arguments);
    this.rActionDisplay.update();
};