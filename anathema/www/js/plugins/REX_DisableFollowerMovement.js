/*:
 * @plugindesc Add plugin command to disable follower movemen.
 * @author Nicholas J. Duque
 * 
 * @help
 * ==Plugin Commands==
 * EnableFollowerMovement
 * DisableFollowerMovement
 * 
 * The commands are self-explanatory.
 * 
 */

var REX = REX || {};
REX.DFM = REX.DFM || {};
REX.DFM.movementEnabled = REX.DFM.movementEnabled || true;

var _Game_Followers_prototype_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function() {
    if (REX.DFM.movementEnabled) 
        _Game_Followers_prototype_updateMove.call(this);
};

REX.DFM.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    REX.DFM.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EnableFollowerMovement') REX.DFM.movementEnabled = true;
    if (command === 'DisableFollowerMovement') REX.DFM.movementEnabled = false;
};