//=============================================================================
// Astfgl YanflyBattleAI extension
// by Astfgl
// Date: 10/03/2017
// V1.01 added target eval
// TOU: Yanfly's terms of use apply, please credit me with any of the following
// Astfgl66/Pierre MATEO/Pierre MATEO (Astfgl66).
//=============================================================================
 
 
/*:
 * @plugindesc Extension of Yanfly AI plugin
 * @author Astfgl
 * @help Allows to check the target for buffs
 * use: Buff >=0 Buff [paramId] to check if target has a buff or neutral
 * use: Buff <=0 Buff [paramId] to check it target has a debuff or neutral
 * use: Buff <0 Buff [paramId] to check if target strictly has debuff
 * use: Buff >0 Buff [paramId] to check if target strictly has buff
 * use: Buff ===0 Buff [paramId] to check if target is strictly neutral
 * to check for buffs on the user use Eval (user._buffs[paramId] [condition])
 * Replace paramId with 0 -> MHP, 1 -> MMP, 2 -> ATK, 3 -> DEF, 4 -> MATK
 * 5 -> MDF, 6 -> AGI, 7 -> LUK.
 *
 *
 * Ex: Buff >0 Buff 0: Skill 1
 * Will make the enemy target only actors that are max hp buffed.
 *
 * IMPORTANT: there is a space between Buff and the parameter id here.
 *
 * Also allows to use Buff condition for targeting:
 * Lowest Buff[parameterId]
 * Highest Buff[parameterId]
 *
 * Replace [parameterId] with the parameter id as described above.
 * Ex: Buff0 : check for MHP, Buff1: check for MMP, Buff2: check for ATK
 *
 * IMPORTANT: There is no space here between buff and the parameter id here.
 *
 * Ex: Buff <0 Buff0: Skill 1, Lowest Buff0
 * Enemy will use skill 1 only on mhp debuffed actors, targeting the most
 * debuffed actor first.
 *
 * Ex: Buff >0 Buff 2: Skill 1, Highest Buff 2
 * Enemy will use skill 1 only on atk buffed actors, targeting the most buffed
 * actor first.
 *
 * Ex: Buff ===0 Buff 3: Skill 1, Highest Def
 * Enemy will use skill 1 only on actors that aren't defense buffed or debuffed
 * targeting the highest defense actor first.
 */
 
(function(){
var _Astfgl_newAIPAC = AIManager.passAIConditions
AIManager.passAIConditions = function(line) {
    // BUFF >=0 X
    if (line.match(/BUFF[ ]>=0[ ](.*)/i)) {
      return this.conditionBuffHas(String(RegExp.$1));
    }
    // BUFF <=0 X
    if (line.match(/BUFF[ ]<=0[ ](.*)/i)) {
      return this.conditionBuffNot(String(RegExp.$1));
    }
    // BUFF >0 X
    if (line.match(/BUFF[ ]>0[ ](.*)/i)) {
      return this.conditionBuffHasStrict(String(RegExp.$1));
    }
    // BUFF <0 X
    if (line.match(/BUFF[ ]<0[ ](.*)/i)) {
      return this.conditionBuffNotStrict(String(RegExp.$1));
    }
    // BUFF ===0 X
    if (line.match(/BUFF[ ]===0[ ](.*)/i)) {
      return this.conditionBuffNeutral(String(RegExp.$1));
    }
    // TARGETEVAL
    if (line.match(/TARGETEVAL[ ](.*)/i)) {
      var condition = String(RegExp.$1);
      return this.conditionTargetEval(condition);
    }
   
    return _Astfgl_newAIPAC.call(this,line)
 }
 
AIManager.conditionBuffHas = function(condition) {
    if (condition.match(/BUFF[ ](\d+)/i)) {
      var buffId = parseInt(RegExp.$1);
    } else {
        return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target._buffs[buffId] >= 0) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};
 
AIManager.conditionBuffNot = function(condition) {
    if (condition.match(/BUFF[ ](\d+)/i)) {
      var buffId = parseInt(RegExp.$1);
    } else {
        return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target._buffs[buffId] <= 0) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};
 
AIManager.conditionBuffHasStrict = function(condition) {
    if (condition.match(/BUFF[ ](\d+)/i)) {
      var buffId = parseInt(RegExp.$1);
    } else {
        return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target._buffs[buffId] > 0) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};
 
AIManager.conditionBuffNotStrict = function(condition) {
    if (condition.match(/BUFF[ ](\d+)/i)) {
      var buffId = parseInt(RegExp.$1);
    } else {
        return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target._buffs[buffId] < 0) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};
 
AIManager.conditionBuffNeutral = function(condition) {
    if (condition.match(/BUFF[ ](\d+)/i)) {
      var buffId = parseInt(RegExp.$1);
    } else {
        return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target._buffs[buffId] === 0) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};
 
AIManager.conditionTargetEval = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (eval(condition)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
}
 
var _Astfgl_newAISPT = AIManager.setProperTarget
AIManager.setProperTarget = function(group) {
    _Astfgl_newAISPT.call(this, group)
    this.setActionGroup(group);
    var action = this.action();
    var randomTarget = group[Math.floor(Math.random() * group.length)];
    if (!randomTarget) return action.setTarget(0);
    if (group.length <= 0) return action.setTarget(randomTarget.index());
    var line = this._aiTarget.toUpperCase();
    if (line.match(/HIGHEST[ ](.*)/i)) {
        var param = this.getBuffId(String(RegExp.$1));
        if (param < 0) return action.setTarget(randomTarget.index());
        if (param > 7) return action.setTarget(randomTarget.index());
        return this.setHighestBuffTarget(group,param)
    } else if (line.match(/LOWEST[ ](.*)/i)) {
        var param = this.getBuffId(String(RegExp.$1));
        if (param < 0) return action.setTarget(randomTarget.index());
        if (param > 7) return action.setTarget(randomTarget.index());
        return this.setLowestBuffTarget(group,param)
    }
}
 
AIManager.getBuffId = function(string) {
    string = string.toUpperCase();
    switch (string) {
        case "BUFF0":
            return 0;
            break;
        case "BUFF1":
            return 1;
            break;
        case "BUFF2":
            return 2;
            break;
        case "BUFF3":
            return 3;
            break;
        case "BUFF4":
            return 4;
            break;
        case "BUFF5":
            return 5;
            break;
        case "BUFF6":
            return 6;
            break;
        case "BUFF7":
            return 7;
            break;
    }
    return -1;
}
 
AIManager.setHighestBuffTarget = function(group,paramId) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target._buffs[paramId] > maintarget._buffs[paramId]) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};
 
AIManager.setLowestBuffTarget = function(group,paramId) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target._buffs[paramId] < maintarget._buffs[paramId]) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};
 
}())