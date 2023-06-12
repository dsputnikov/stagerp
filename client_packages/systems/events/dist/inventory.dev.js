"use strict";

var open = false;
mp.keys.bind(0x49, true, function () {
  if (chatOpened == true) return;
  mp.events.callRemote('Inventory_loadPlayerItems::SERVER');
});
mp.events.add('Inventory_openWindow::CLIENT', function (items) {
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
});
mp.events.add('Inventory_useItem::CLIENT', function (item) {
  mp.events.callRemote('Inventory_useItem::SERVER', item);
});
mp.events.add('Inventory_syncItems::CLIENT', function (items) {
  mp.events.callRemote('Inventory_syncItems::SERVER', items);
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