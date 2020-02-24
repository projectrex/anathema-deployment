/*:
 * @plugindesc Extend Tsukimi's FilterController
 * @author Nicholas Duque
 * 
 * @help
 * 
 */

var REX = REX || {};
REX.FC = REX.FC || {};

 //-----------------------------------------------------------------------------
 // ! OVERRIDE !
 //
 // Make an array a valid 

REX.FC.Scene_Base_prototype_getTKMFilterObj = 
    Scene_Base.prototype.getTKMFilterObj;
Scene_Base.prototype.getTKMFilterObj = function(targetObj) {
    var targets = [];
    if (Array.isArray(targetObj)) {
        targetObj.forEach(function(e){
            // If the array is a valid sprite or picture ID
            if((e >= 3990 && e <= 4999) || (e > 5000 && e <= 5999))
                targets.push(REX.FC.Scene_Base_prototype_getTKMFilterObj.call(this,e));
        });
    }
    else {
        targets = REX.FC.Scene_Base_prototype_getTKMFilterObj.call(this, targetObj);
    }
    return targets;
};