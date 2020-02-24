/*~struct~Sound:
@param name
@dir audio/se/
@type file
@require 1

@param volume
@type number
@default 90

@param pitch
@type number
@default 100
*/

/*:
@plugindesc v1.00 Extension for Yanfly's Quest Journal to give a small, dynamic popup window whenever a quest is added or updated.
@author Nicholas Duque

@param Quest Added SFX
@type struct<Sound>

@param Quest Updated SFX
@type struct<Sound>

@param Quest Completed SFX
@type struct<Sound>
*/

var REX = REX || {};
REX.QuestSFX = {};
REX.PluginParams = PluginManager.parameters('REX_X_QuestPopupWindow');

for (var key in REX.PluginParams) {
    if (REX.PluginParams[key].length <= 0) continue;
    REX.QuestSFX[key] = JSON.parse(REX.PluginParams[key]);
};

REX.AddQuestInfoWindow = function (text) {
    spriteSet = SceneManager._scene._spriteset;

    spriteSet.addQuestInfoWindow(text, 1);
}
// ======================
// - Information Window -
// ======================
// - Small window display to inform the player
// - of quest modifications (TinyGetInfoWnd, KADOKAWA)

  //
  // variable initialization
  //
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.strEffect = [];
    this.getInfoOccupied = [];
  };

  //
  // process spriteset
  //
  var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    $gameTemp.strEffect = [];
    $gameTemp.getInfoOccupied = [];
    _Scene_Map_onMapLoaded.call(this);
  };

  Spriteset_Map.prototype.addQuestInfoWindow = function(quest, winPos) {
    var w = new Window_GetInfo(quest, winPos);
    $gameTemp.strEffect.push(w);
    this._baseSprite.addChild(w);
  };

  var _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.call(this);
    for(var i = 0; i < $gameTemp.strEffect.length; i++) {
      if($gameTemp.strEffect[i].disposed) {
        $gameTemp.strEffect[i] = null;
        continue;
      }

      $gameTemp.strEffect[i].update();

    }
    $gameTemp.strEffect = 
     $gameTemp.strEffect.filter(function(window){return window != null;});
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    $gameTemp.strEffect = [];
    $gameTemp.getInfoOccupied = [];
    _Scene_Map_terminate.call(this);
  };

  function Window_GetInfo(){
    this.initialize.apply(this, arguments);
  }

  // ===========================
  // - Modified Window_GetInfo -
  // ===========================

  Window_GetInfo.prototype = Object.create(Window_Base.prototype);
  Window_GetInfo.prototype.constructor = Window_GetInfo;

  Window_GetInfo.prototype.initialize = function(text, winPos) {
    //var xPos = Graphics.boxWidth / 2 - 200; // -24
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, 105);
    var textWidth = this.textWidthEx(text);
    this.width = textWidth + 128;
    this.disposed = false;
    // set opacities
    this.opacity = 0;
    this.backOpacity = 0;
    this.contentsOpacity = 0;
    // set count
    this.count = 0;
    // make room for new index
    this.index = $gameTemp.getInfoOccupied.indexOf(null);
    if(this.index === -1) {
      this.index = $gameTemp.getInfoOccupied.length;
    }
    $gameTemp.getInfoOccupied[this.index] = true;
    // set Y position
    var yBuffer = 48;
    /*if(yPosType == 0){
      this.y = this.index * 60;
    } else {
      this.y = 520 - (this.index * 60);
    } --NJD: Getting rid of this and adding a middle option*/
    /*var yPosType = 2;
	switch(yPosType) {
	case 0:
		this.y = this.index * yBuffer;
		break;
	case 1:
		this.y = 520 - (this.index * yBuffer);
		break;
	case 2:
		this.y = (Graphics.boxHeight / 2) + (this.index * yBuffer);
		break;
	default:
		this.y = this.index * yBuffer;
		break;
    }*/

    /* This one is for different Y values depending on this index
    switch(winPos){
        case 0: // ctr
            this.y = (Graphics.boxHeight / 2) + (this.index * yBuffer);
            break;
        case 1: // ur
            this.y = this.index * yBuffer - 20;
            this.x = Graphics.boxWidth - 390;
            break;
        case 2: // lr
            this.y = Graphics.boxHeight - (this.index * yBuffer) - 84;
            this.x = Graphics.boxWidth - 390;
    } */

    switch(winPos){
        case 0: // ctr
            this.y = (Graphics.boxHeight / 2) + yBuffer;
            break;
        case 1: // ur
            this.y -= 20;
            this.x = Math.max(0, Graphics.boxWidth - (textWidth + 64));
            break;
        case 2: // lr
            this.y = Graphics.boxHeight - 84;
            this.x = Graphics.boxWidth - 390;
    }
	
    // draw and get item
    this.setup(text);
  };

  Window_GetInfo.prototype.setup = function(text) {
    
    // fill background
    this.contents.paintOpacity = 160;
    this.contents.fillRect(0, 21, Graphics.boxWidth, 36, '#000000');
    // draw txt
      this.contents.paintOpacity = 255;
      this.changeTextColor(this.normalColor());
      var w = this.textWidthEx(text);
      this.drawTextEx(text, 16, 21, w, 'left');
  };

  Window_GetInfo.prototype.update = function() {
    Window_Base.prototype.update.call(this);

    var popupLength = Number(this.width).clamp(120, 340);

    this.count++;

    if (this.count < (popupLength * this.index))
        return;

    if(this.count < (popupLength * (this.index + 1))) { // Amount of frames window will be up
      this.contentsOpacity += 32;
    } else {
      this.y -= 2;
      this.contentsOpacity -= 32;
      if(this.contentsOpacity == 0){
        this.remove();
      }
    }
  };

  Window_GetInfo.prototype.remove = function() {
    $gameTemp.getInfoOccupied[this.index] = null;
    this.parent.removeChild(this);
    this.disposed = true;
  };