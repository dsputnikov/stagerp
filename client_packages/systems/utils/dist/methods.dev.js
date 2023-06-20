"use strict";

var SET_CURRENT_PED_WEAPON = '0xADF692B254977C0C';
mp.events.add("playerWeaponShot", function _callee(targetPosition, targetEntity) {
  var weapon;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(mp.players.local.getAmmoInClip(mp.players.local.weapon) == 0)) {
            _context.next = 6;
            break;
          }

          weapon = mp.players.local.weapon;
          mp.game.invoke(SET_CURRENT_PED_WEAPON, mp.players.local.handle, mp.game.joaat('weapon_unarmed') >> 0, true);
          _context.next = 5;
          return regeneratorRuntime.awrap(mp.game.waitAsync(0));

        case 5:
          mp.game.invoke(SET_CURRENT_PED_WEAPON, mp.players.local.handle, weapon >> 0, true);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});