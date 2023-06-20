"use strict";

var open = false;
var open2 = false;
mp.keys.bind(0x31, true, function () {
  if (chatOpened == true) return;
  browser.execute("Inventory.useItem(true,1);");
});
mp.keys.bind(0x32, true, function () {
  if (chatOpened == true) return;
  browser.execute("Inventory.useItem(true,2);");
});
mp.keys.bind(0x33, true, function () {
  if (chatOpened == true) return;
  browser.execute("Inventory.useItem(true,3);");
});
mp.keys.bind(0x49, true, function () {
  if (chatOpened == true) return;
  mp.events.callRemote('Inventory_loadPlayerItems::SERVER');
});
mp.events.add('Inventory_openWindow::CLIENT', function _callee(items) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (open) {
            browser.call('Inventory_open::CEF', false, items);
            open = false;
            mp.gui.cursor.show(false, false);
            mp.game.ui.displayRadar(true);
            mp.events.call('HUD_setShow::CLIENT', true);
            browser.call('Inventory_clearSlots::CEF', items);
          } else {
            browser.call('Inventory_open::CEF', true, items);
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.events.call('HUD_setShow::CLIENT', false);
            open = true;
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
mp.events.add('Inventory_openWindow2::CLIENT', function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(mp.events.callRemote('Inventory_loadPlayerItems::SERVER'));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
mp.events.add('Inventory_useItem::CLIENT', function (item) {
  mp.events.callRemote('Inventory_useItem::SERVER', item);
});
mp.events.add('Inventory_syncItems::CLIENT', function (items) {
  mp.events.callRemote('Inventory_syncItems::SERVER', items);
});
mp.events.add('Inventory_clearSlots::CLIENT', function (none) {
  browser.call('Inventory_clearSlots::CEF');
});
mp.events.add('Inventory_equipClothes::CLIENT', function (data) {
  mp.events.callRemote('Inventory_equipClothes::SERVER', data);
});
mp.events.add('Inventory_unequipClothes::CLIENT', function (data) {
  mp.events.callRemote('Inventory_unequipClothes::SERVER', data);
});
mp.events.add('xdddd', function (vehicle, seat) {
  player.setIntoVehicle(vehicle.handle, parseInt(seat));
});