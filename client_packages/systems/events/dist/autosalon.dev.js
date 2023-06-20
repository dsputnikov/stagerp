"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var salons = {};
var opened = false;
var previewVehicle;
var type = 0;
var localPlayer = mp.players.local;
var inTestdrive = false;
var carBlip;
var carColshape;
mp.events.add('playerEnterColshape', function (shape) {
  if (shape == carColshape) {
    carBlip.destroy();
    carColshape.destroy();
    mp.events.callRemote('Hud_addNotify::SERVER', 1, "Маршрут закончен", 7000);
  }
});
mp.events.add('setBlip::CLIENT', function (carObject) {
  console_log(carObject + ' blay');
  setBlip(JSON.parse(carObject));
});

function setBlip(carObject) {
  var spawnedCar, carObj, nowCar, pos;
  return regeneratorRuntime.async(function setBlip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(carObject);

        case 2:
          carObj = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(carObj);

        case 5:
          nowCar = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(JSON.parse(nowCar.parkpos));

        case 8:
          pos = _context.sent;
          console_log(pos);
          _context.next = 12;
          return regeneratorRuntime.awrap(mp.colshapes.newSphere(pos.x, pos.y, pos.z, 3, 0));

        case 12:
          carColshape = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(mp.blips["new"](825, new mp.Vector3(pos.x, pos.y, pos.z), _defineProperty({
            name: "\u041C\u0430\u0448\u0438\u043D\u0430",
            scale: 1,
            color: 17,
            dimension: 0,
            shortRange: true
          }, "scale", 0.9)));

        case 15:
          carBlip = _context.sent;
          mp.events.callRemote('Hud_addNotify::SERVER', 1, "Точка парковки указана на GPS", 7000);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}

mp.events.add('Autosalon_create::CLIENT', function (data, pos) {
  salons = JSON.parse(data);
  type = pos;
});
mp.events.add('Autosalon_create::CLIENT', function (data, pos) {
  salons = JSON.parse(data);
  type = pos;
});
mp.events.add('Autosalon_openWindow::CLIENT', function (money, bank, salon) {
  browser.call('Autosalon_openWindow::CEF', true, salons);
  mp.gui.cursor.show(true, true);
  mp.game.ui.displayRadar(false);
  mp.events.call('HUD_setShow::CLIENT', false);
  opened = true;
  createCamera();
  previewVehicle = 0;
  browser.execute("Autosalon.money = ".concat(money, "; Autosalon.bank = ").concat(bank, ";"));
  browser.execute("Autosalon.currentSalon = '".concat(salon, "'"));
});
mp.events.add('TOWTRUCK::CLIENT', function (carArray) {
  mp.events.callRemote('TOWTRUCK::SERVER', carArray);
});
mp.events.add('GPSCAR::CLIENT', function (carArray) {
  mp.events.callRemote('GPSCAR::SERVER', carArray);
});
mp.events.add('cars_show::CLIENT', function (carArray) {
  mp.gui.cursor.show(true, true);
  var carArr = JSON.parse(carArray);
  mp.events.call('HUD_setShow::CLIENT', false); //browser.execute(`cars.updateCars(${carArr})`)
  //browser.execute(`cars.active = 'true'`)

  browser.call('cars_show::CEF', carArr);
});
mp.events.add('sendToCarUved::CLIENT', function (bool) {
  browser.call('miniuvedi::CEF', bool);
  setTimeout(function () {
    browser.call('miniuvediClose::CEF', bool);
  }, 5000);
});
mp.events.add('showHUD::CLIENT', function () {
  mp.gui.cursor.show(false, false);
  mp.events.call('HUD_setShow::CLIENT', true);
});
mp.events.add('LockVehicle::CLIENT', function (carArray) {
  var carArr = JSON.parse(carArray);
  mp.vehicles.forEachInStreamRange(function (veh) {
    var playerPos = mp.players.local.position;
    var vehDist = mp.game.gameplay.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, veh.position.x, veh.position.y, veh.position.z, true);
    if (vehDist > 5) return; // если дистанция > 15 то он не будет рендерить

    console_log(veh.getVariable('id'));

    for (var i = 0; i <= 6; i++) {
      if (veh.getVariable('id') == carArr[i].id) {
        console_log(1);
        mp.events.callRemote('lockCar::SERVER', veh);
      } else {
        console_log(2);
        console_log(carArr[i].id);
      }
    }
  });
});
mp.events.add('Autosalon_selectVehicle::CLIENT', function (model, _color, _color2) {
  var color = JSON.parse(_color);
  var color2 = JSON.parse(_color2);

  if (!previewVehicle == 0) {
    previewVehicle.destroy();
  }

  previewVehicle = mp.vehicles["new"](mp.game.joaat(model), new mp.Vector3(type.x, type.y, type.z), {
    dimension: player.getVariable('id') + 12
  });
  var ifxd = mp.vehicles.exists(previewVehicle);

  if (ifxd) {
    var interval = setInterval(function () {
      var primaryColor = previewVehicle.getCustomPrimaryColour(0);

      if (primaryColor.r == color[0]) {
        clearInterval(interval);
      }

      previewVehicle.setCustomPrimaryColour(color[0], color[1], color[2]);
      previewVehicle.setCustomSecondaryColour(color2[0], color2[1], color2[2]);
    }, 10);
  } // previewVehicle.freezePosition(true);
  // Характеристики


  var maxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(mp.game.joaat(model));
  var acceleration = mp.game.vehicle.getVehicleModelAcceleration(mp.game.joaat(model));
  var traction = previewVehicle.getMaxTraction();
  var maxBraking = mp.game.vehicle.getVehicleModelMaxBraking(mp.game.joaat(model));
  var maxP = mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(mp.game.joaat(model));
  browser.call('Autosalon_updateStat::CEF', maxSpeed, acceleration, maxBraking, maxP);
});
mp.events.add('Autosalon_changeColor::CLIENT', function (_color, _color2) {
  var color = JSON.parse(_color);
  var color2 = JSON.parse(_color2);
  previewVehicle.setCustomPrimaryColour(color[0], color[1], color[2]);
  previewVehicle.setCustomSecondaryColour(color2[0], color2[1], color2[2]);
});
mp.events.add('Autosalon_buyVehicle::CLIENT', function (t, model, price, color1, color2) {
  mp.events.callRemote('Autosalon_buyVehicle::SERVER', t, model, price, color1, color2);
});
mp.events.add('Autosalon_vehicleBuyed::CLIENT', function () {
  browser.execute('Autosalon.successBuy()');
});
mp.events.add('Autosalon_successBuy::CLIENT', function () {
  browser.call('Autosalon_openWindow::CEF', false);
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call('HUD_setShow::CLIENT', true);
  opened = false;
  camera.destroy();
  previewVehicle.destroy();
  mp.game.cam.renderScriptCams(false, true, 0, true, false);
  mp.events.callRemote('Autosalon_exit::SERVER');
});

function createCamera() {
  if (player.getVariable('currentAutosalon') == 3) return mp.events.call('Utils_3dcamera::CLIENT', type.x, type.y, type.z, 0, 0, 285.854, 80);
  mp.events.call('Utils_3dcamera::CLIENT', type.x, type.y, type.z, 0, 0, 285.854, 70);
}

var disabled = false;
mp.events.add('render', function () {
  if (mp.game.controls.isDisabledControlPressed(2, 200)) {
    if (opened == true) {
      if (inTestdrive == true) return;
      disabled = true;
      opened = false;
      mp.events.call('Utils_delcamera::CLIENT');
      browser.call('Autosalon_openWindow::CEF', false);
      mp.gui.cursor.show(false, false);
      mp.game.ui.displayRadar(true);
      mp.events.call('HUD_setShow::CLIENT', true);
      previewVehicle.destroy();
      mp.events.callRemote('Autosalon_exit::SERVER');
    }
  }

  if (disabled == true) {
    mp.game.controls.disableControlAction(2, 200, true);
    setTimeout(function () {
      disabled = false;
    }, 1000);
  }
});
mp.events.add('Autosalon_testdrive_start::CLIENT', function (model, color_1, color_2) {
  inTestdrive = true;
  mp.game.cam.renderScriptCams(false, true, 0, true, false);
  browser.call('Autosalon_openWindow::CEF', false);
  mp.gui.cursor.show(false, false); // mp.game.ui.displayRadar(true);

  mp.events.call('HUD_setShow::CLIENT', false);
  mp.game.cam.renderScriptCams(false, true, 2000, true, false);
  mp.events.callRemote('Autosalon_testdrive_start::SERVER', model, color_1, color_2); //
  // mp.game.ped.removeScenarioBlockingArea(0, true);
  // mp.game.streaming.setPedPopulationBudget(3);
  // mp.game.ped.setCreateRandomCops(true);
  // mp.game.vehicle.setRandomBoats(true);
  // mp.game.vehicle.setRandomTrains(true);
  // mp.game.vehicle.setGarbageTrucks(true);
  // mp.game.streaming.setVehiclePopulationBudget(3);
  // mp.game.invoke('0x34AD89078831A4BC'); // SET_ALL_VEHICLE_GENERATORS_ACTIVE
  // mp.game.vehicle.setAllLowPriorityVehicleGeneratorsActive(true);
  // mp.game.vehicle.setNumberOfParkedVehicles(-1);
  // mp.game.vehicle.displayDistantVehicles(true);
  // mp.game.graphics.disableVehicleDistantlights(false);
});
mp.events.add('Autosalon_testdrive_stop::CLIENT', function () {
  inTestdrive = false;
  browser.call('Autosalon_openWindow::CEF', true);
  mp.gui.cursor.show(true, true);
  mp.game.ui.displayRadar(false);
  mp.events.call('HUD_setShow::CLIENT', false);
  mp.game.cam.renderScriptCams(true, false, 2000, true, false);
});