<Custom Apply Effect>
if (!target._eleGuardLevel) {
   target._eleGuardLevel = [];
   target._eleGuardLevel[3] = 1;
}
else
   target._eleGuardLevel[3] += 1;

if (target._eleGuardLevel[3] >= 2) {
   target.addState(89);
   target.removeState(81);
}
</Custom Apply Effect>

<Custom Remove Effect>
if (target._eleGuardLevel[3] == 1) {
   target._eleGuardLevel[3] = undefined;
}
</Custom Remove Effect>