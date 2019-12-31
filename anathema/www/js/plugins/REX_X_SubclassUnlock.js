var Imported = Imported || {};
Imported.REX_X_SubclassUnlock = true;

var REX = REX || {};
REX.SubclassUnlock = REX.SubclassUnlock || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 Extension for Yanfly's Subclass to allow for Subclass change
 * to be unlocked at a certain level.
 * @author Nicholas Duque
 * 
 * @param Unlock Level
 * @type number
 * @desc The level at which Subclasses are unlocked.
 * @default 10
 *
 * @help
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 *  Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_X_Subclass) {

REX.Parameters = PluginManager.parameters('REX_X_SubclassUnlock');
REX.Param = REX.Param || {};

REX.Param.SubclassUnlockLv = String(REX.Parameters['Unlock Level']);

REX.SubclassUnlock.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    REX.SubclassUnlock.Game_Actor_levelUp.call(this);

    this._canChangeSubclass = this._level >= REX.Param.SubclassUnlockLv ? true : false;
};

};