"use strict";

var menuOpen = false;
var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local; // mp.keys.bind(0x09, true, () => {
//     mp.events.callRemote('Menu_openWindow::SERVER')
// })

mp.events.add('Menu_openWindow::CLIENT', function (name, gender, id, lvl, money, bank) {
  if (menuOpen == true) {
    browser.execute('Autoschool.active = false');
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true);
    menuOpen = false;
    return;
  }

  browser.execute('Menu.active = true');
  browser.execute("Menu.name = '".concat(name, "'; Menu.gender = '").concat(gender, "'; Menu.id = ").concat(id, "; Menu.lvl = ").concat(lvl, "; Menu.money = '").concat(formatNumber(money), "'; Menu.bank = '").concat(formatNumber(bank), "'"));
  mp.gui.cursor.show(true, true);
  mp.game.ui.displayRadar(false);
  mp.events.call('HUD_setShow::CLIENT', false);
  menuOpen = true;
});
mp.events.add('Menu_updateProperty::CLIENT', function (prop) {
  browser.call('Menu_updateProperty::CEF', prop);
});

function formatNumber(x) {
  if (x == null) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}