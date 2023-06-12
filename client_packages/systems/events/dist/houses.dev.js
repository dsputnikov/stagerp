"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var houseColshapes = [];
var houseBlips = [];
var houseLabels = [];
var garageColshapes = [];
var garageMarkers = [];
var garageBlips = [];
var inHouseColshapes = [];
var inHouseMarkers = [];
var _houses = [];
var _garages = [];
var currentId = null;
var localPlayer = mp.players.local;
var windowOpened = false;
var render = false;
mp.events.add({
  'House_loadHousesObjects::CLIENT': function House_loadHousesObjectsCLIENT(houses, id) {
    _houses = houses;

    for (var i = 0; i < houses[0].length; i++) {
      console_log(JSON.stringify(houses[0][i]));
      var labelStatus = houses[0][i].status == 1 ? "~g~(\u0421\u0432\u043E\u0431\u043E\u0434\u0435\u043D)" : '~r~(Занят)';
      var blipColor = houses[0][i].status == 2 ? 59 : 25;
      houseBlips.push(mp.blips["new"](40, new mp.Vector3(houses[0][i].x, houses[0][i].y, houses[0][i].z), {
        name: "\u0414\u043E\u043C",
        scale: 0.6,
        color: blipColor,
        dimension: 0,
        shortRange: true
      }));
      houseLabels.push(mp.labels["new"]("\u0414\u043E\u043C #".concat(i + 1, " ").concat(labelStatus), new mp.Vector3(houses[0][i].x, houses[0][i].y, houses[0][i].z), {
        id: houses[0][i].id,
        los: true,
        drawDistance: 20,
        dimension: 0
      }));
      houseColshapes.push(mp.colshapes.newSphere(houses[0][i].x, houses[0][i].y, houses[0][i].z, 1, 0));
    }

    render = true;
  },
  'House_loadInHouseObjects::CLIENT': function House_loadInHouseObjectsCLIENT(houses, ids) {
    for (var i = 0; i < houses[0].length; i++) {
      switch (houses[0][i]["class"]) {
        case 'high':
          inHouseMarkers.push(mp.markers["new"](20, new mp.Vector3(-785.083, 323.596, 211.997), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          inHouseColshapes.push(mp.colshapes.newSphere(-785.083, 323.596, 211.997, 1, ids[i] + 10));
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(240.311, -1004.840, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(240.311, -1004.840, -99.000, 1, ids[i] + 10));
          break;

        case 'medium':
          inHouseMarkers.push(mp.markers["new"](20, new mp.Vector3(346.491, -1012.418, -99.196), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          inHouseColshapes.push(mp.colshapes.newSphere(346.491, -1012.418, -99.196, 1, ids[i] + 10));
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(212.012, -999.059, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(212.012, -999.059, -99.000, 1, ids[i] + 10));
          break;

        case 'low':
          inHouseMarkers.push(mp.markers["new"](20, new mp.Vector3(266.033, -1007.094, -100.953), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          inHouseColshapes.push(mp.colshapes.newSphere(266.033, -1007.094, -100.953, 1, ids[i] + 10));
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(179.086, -1000.814, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(179.086, -1000.814, -99.000, 1, ids[i] + 10));
          break;
      }
    }
  }
});
mp.events.add({
  'Garage_loadGaragesObjects::CLIENT': function Garage_loadGaragesObjectsCLIENT(garages, id) {
    _garages = garages;

    for (var i = 0; i < garages[0].length; i++) {
      console_log(JSON.stringify(garages[0][i]));
      var labelStatus = garages[0][i].status == 1 ? "~g~(\u0421\u0432\u043E\u0431\u043E\u0434\u0435\u043D)" : '~r~(Занят)';
      var blipColor = garages[0][i].status == 2 ? 59 : 25;
      garageBlips.push(mp.blips["new"](50, new mp.Vector3(garages[0][i].x, garages[0][i].y, garages[0][i].z), {
        name: "\u0413\u0430\u0440\u0430\u0436",
        scale: 0.6,
        color: blipColor,
        dimension: 0,
        shortRange: true
      }));
      garageLabels.push(mp.labels["new"]("\u0413\u0430\u0440\u0430\u0436 #".concat(i + 1, " ").concat(labelStatus), new mp.Vector3(garages[0][i].x, garages[0][i].y, garages[0][i].z), {
        name: "\u0413\u0430\u0440\u0430\u0436",
        scale: 0.6,
        color: blipColor,
        dimension: 0,
        shortRange: true
      }));
      garageColshapes.push(mp.colshapes.newSphere(garages[0][i].x, garages[0][i].y, garages[0][i].z, 1, 0));
    }

    render = true;
  },
  'Garage_loadInGarageObjects::CLIENT': function Garage_loadInGarageObjectsCLIENT(garages, ids) {
    for (var i = 0; i < garages[0].length; i++) {
      switch (garages[0][i]["class"]) {
        case 'high':
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(240.311, -1004.840, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(240.311, -1004.840, -99.000, 1, ids[i] + 10));
          break;

        case 'medium':
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(212.012, -999.059, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(212.012, -999.059, -99.000, 1, ids[i] + 10));
          break;

        case 'low':
          garageMarkers.push(mp.markers["new"](20, new mp.Vector3(179.086, -1000.814, -99.000), 1, {
            visible: true,
            dimension: ids[i] + 10
          }));
          garageColshapes.push(mp.colshapes.newSphere(179.086, -1000.814, -99.000, 1, ids[i] + 10));
          break;
      }
    }
  }
});
mp.events.add({
  'playerEnterColshape': function playerEnterColshape(shape) {
    inHouseColshapes.forEach(function (el) {
      if (shape == el) {
        global.browser.execute('HUD.usebutton.active = true;');
        mp.keys.bind(0x45, true, function () {
          browser.call('Houses_showWindow::CEF', 2, true);
          windowOpened = true;
          mp.gui.cursor.show(true, true);
          mp.game.ui.displayRadar(false);
          mp.events.call('HUD_setShow::CLIENT', false);
        });
      }
    });
    garageColshapes.forEach(function (el) {
      if (shape == el) {
        global.browser.execute('HUD.usebutton.active = true;');
        mp.keys.bind(0x45, true, function () {
          browser.call('Houses_showWindow::CEF', 2, true);
          mp.gui.cursor.show(true, true);
          mp.game.ui.displayRadar(false);
          mp.events.call('HUD_setShow::CLIENT', false);
        });
      }
    });
  },
  'playerExitColshape': function playerExitColshape(shape) {
    inHouseColshapes.forEach(function (el) {
      if (shape == el) {
        global.browser.execute('HUD.usebutton.active = false;');
        mp.keys.unbind(0x45, true);
      }
    });
    garageColshapes.forEach(function (el) {
      if (shape == el) {
        global.browser.execute('HUD.usebutton.active = false;');
        mp.keys.unbind(0x45, true);
      }
    });
  }
});
mp.events.add({
  'playerEnterColshape': function playerEnterColshape(shape) {
    for (var _i = 0, _Object$entries = Object.entries(houseColshapes); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (shape == value) {
        mp.events.call('House_bindMainColshape::CLIENT', _houses[0][key].id);
        global.browser.execute('HUD.usebutton.active = true;');
      }
    }
  },
  'playerExitColshape': function playerExitColshape(shape) {
    houseColshapes.forEach(function (colshape) {
      if (shape == colshape) {
        mp.events.call('House_unbindEkey::CLIENT');
        global.browser.execute('HUD.usebutton.active = false;');
      }
    });
  }
});
mp.events.add({
  'House_setOwnHouseColor::CLIENT': function House_setOwnHouseColorCLIENT(id, color) {
    houseBlips[parseInt(id) - 5].setColour(parseInt(color));
  },
  'House_setLabelStatus::CLIENT': function House_setLabelStatusCLIENT(id, status) {
    houseLabels[parseInt(id) - 5].text = "\u0414\u043E\u043C #".concat(id, " ~r~(").concat(status, ")");
  }
}); //

mp.events.add('House_executeHouseInfo::CLIENT', function (ifOwner, ownerName, houseClass, gm, price, locked) {
  global.browser.execute("houses.ifOwner = ".concat(ifOwner));
  global.browser.execute("houses.ownerName = '".concat(ownerName, "'"));
  global.browser.execute("houses.houseClass = '".concat(houseClass, "'"));
  global.browser.execute("houses.price = ".concat(price, " + '$'"));
  global.browser.execute("houses.ifLocked = ".concat(locked));
  global.browser.execute("houses.id = ".concat(currentId));
});
mp.events.add({
  'House_bindMainColshape::CLIENT': function House_bindMainColshapeCLIENT(id) {
    mp.keys.bind(0x45, true, function () {
      currentId = id;
      mp.events.callRemote('House_sendHouseInfo::SERVER', currentId);
      browser.call('Houses_showWindow::CEF', 1, true);
      mp.gui.cursor.show(true, true);
      mp.game.ui.displayRadar(false);
      mp.events.call('HUD_setShow::CLIENT', false);
      windowOpened = true;
    });
  },
  'House_unbindEkey::CLIENT': function House_unbindEkeyCLIENT() {
    mp.keys.unbind(0x45, true);
  }
});
mp.events.add({
  'House_buyHouse::CLIENT': function House_buyHouseCLIENT() {
    mp.events.callRemote('House_buyHouse::SERVER', currentId);
  },
  'House_sellHouse::CLIENT': function House_sellHouseCLIENT() {
    mp.events.callRemote('House_sellHouse::SERVER', currentId);
  },
  'House_enterHouse::CLIENT': function House_enterHouseCLIENT() {
    mp.events.callRemote('House_enterHouse::SERVER', currentId);
    browser.call('Houses_showWindow::CEF', 1, false);
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true);
  },
  'House_enterGarage::CLIENT': function House_enterGarageCLIENT() {
    mp.events.callRemote('House_enterGarage::SERVER', currentId);
    browser.call('Houses_showWindow::CEF', 1, false);
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true);
  },
  'House_enterStreet::CLIENT': function House_enterStreetCLIENT() {
    mp.events.callRemote('House_enterStreet::SERVER', currentId);
    browser.call('Houses_showWindow::CEF', 2, false);
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true);
  },
  'House_closeHouse::CLIENT': function House_closeHouseCLIENT() {
    mp.events.callRemote('House_closeHouse::SERVER', currentId);
  },
  'House_openHouse::CLIENT': function House_openHouseCLIENT() {
    mp.events.callRemote('House_openHouse::SERVER', currentId);
  },
  'House_showWindow::CLIENT': function House_showWindowCLIENT(bool) {
    browser.call('Houses_showWindow::CEF', 1, bool);
    mp.gui.cursor.show(bool, bool);
    mp.game.ui.displayRadar(!bool);
    mp.events.call('HUD_setShow::CLIENT', !bool);
  }
});
var windowDisabled = false;
mp.events.add('render', function () {
  if (mp.game.controls.isDisabledControlPressed(2, 200)) {
    if (windowOpened == true) {
      windowDisabled = true;
      windowOpened = false;
      browser.call('Houses_showWindow::CEF', 1, false);
      mp.gui.cursor.show(false, false);
      mp.game.ui.displayRadar(true);
      mp.events.call('HUD_setShow::CLIENT', true);
    }
  }

  if (windowDisabled == true) {
    mp.game.controls.disableControlAction(2, 200, true);
    setTimeout(function () {
      windowDisabled = false;
    }, 1000);
  }
});