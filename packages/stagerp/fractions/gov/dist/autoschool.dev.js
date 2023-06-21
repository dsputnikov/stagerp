"use strict";

var chat = require('../../events/basic/hud');

var methods = require('../../modules/methods');

var autoschoolTimeout = 105;
var autoSchoolInterval;
var secs = 100;
var vehs = [];
var vehsPosition = [{
  x: -604.0018920898438,
  y: -2220.6328125,
  z: 6,
  heading: 179.98362731933594,
  model: '350z',
  vehId: 1
}, {
  x: -609.0723266601562,
  y: -2216.541015625,
  z: 6,
  heading: -179.24368286132812,
  model: '350z',
  vehId: 2
}, {
  x: -614.2157592773438,
  y: -2211.9169921875,
  z: 6,
  heading: -177.21542358398438,
  model: 'surge',
  vehId: 3
}, {
  x: -618.8040161132812,
  y: -2208.107177734375,
  z: 6.002011299133301,
  heading: -176.26431274414062,
  model: 'surge',
  vehId: 4
}, {
  x: -623.83056640625,
  y: -2204.359619140625,
  z: 5.999294281005859,
  heading: -170.76583862304688,
  model: 'fugitive',
  vehId: 5
}, {
  x: -628.6629638671875,
  y: -2200.165283203125,
  z: 5.996785640716553,
  heading: -178.72802734375,
  model: 'fugitive',
  vehId: 6
}, {
  x: -633.4185180664062,
  y: -2196.209716796875,
  z: 5.994228363037109,
  heading: -172.87240600585938,
  model: 'landstalker',
  vehId: 7
}, {
  x: -638.2359619140625,
  y: -2191.4912109375,
  z: 5.993213653564453,
  heading: -176.1611785888672,
  model: 'landstalker',
  vehId: 8
}, {
  x: -643.1668701171875,
  y: -2187.626708984375,
  z: 5.993215084075928,
  heading: 178.1157989501953,
  model: 'rocoto',
  vehId: 9
}, {
  x: -647.8755493164062,
  y: -2184.0390625,
  z: 5.993215084075928,
  heading: -176.2241973876953,
  model: 'rocoto',
  vehId: 10
}, {
  x: -600.22607421875,
  y: -2215.2548828125,
  z: 5.993213653564453,
  heading: 3.5871331691741943,
  model: '350z',
  vehId: 11
}, {
  x: -605.2181396484375,
  y: -2210.96826171875,
  z: 5.993214130401611,
  heading: 1.4958386421203613,
  model: '350z',
  vehId: 12
}, {
  x: -610.0564575195312,
  y: -2206.73583984375,
  z: 5.993211269378662,
  heading: 5.569568157196045,
  model: 'surge',
  vehId: 13
}, {
  x: -614.8767700195312,
  y: -2202.69677734375,
  z: 5.993215084075928,
  heading: 2.515695095062256,
  model: 'surge',
  vehId: 14
}, {
  x: -619.5994262695312,
  y: -2198.896240234375,
  z: 5.996767997741699,
  heading: 4.005386829376221,
  model: 'fugitive',
  vehId: 15
}, {
  x: -624.5321655273438,
  y: -2194.916259765625,
  z: 5.996584415435791,
  heading: 2.8652095794677734,
  model: 'fugitive',
  vehId: 16
}, {
  x: -629.2779541015625,
  y: -2190.367919921875,
  z: 5.99386739730835,
  heading: 2.3266217708587646,
  model: 'landstalker',
  vehId: 17
}, {
  x: -634.3181762695312,
  y: -2186.47509765625,
  z: 5.993213176727295,
  heading: 3.6329636573791504,
  model: 'landstalker',
  vehId: 18
}, {
  x: -639.0682983398438,
  y: -2182.51953125,
  z: 5.993213653564453,
  heading: 1.8396157026290894,
  model: 'rocoto',
  vehId: 19
}, {
  x: -643.8656616210938,
  y: -2178.706787109375,
  z: 5.993217468261719,
  heading: -7.339174270629883,
  model: 'rocoto',
  vehId: 20
}, {
  x: -648.7033081054688,
  y: -2174.3720703125,
  z: 5.993214130401611,
  heading: -0.8991260528564453,
  model: '911turbos',
  vehId: 21
}];

for (var i = 0; i < vehsPosition.length; i++) {
  try {
    var veh = mp.vehicles["new"](mp.joaat(vehsPosition[i].model), new mp.Vector3(vehsPosition[i].x, vehsPosition[i].y, vehsPosition[i].z), {
      heading: vehsPosition[i].heading
    });
    veh.setColor(70, 0);
    veh.setVariable('carid', vehsPosition[i].vehId); // id car

    veh.setVariable('testVeh', true); // То что она рабочая

    veh.setVariable('testBusy', false); // Занята ли машина

    vehs.push(veh); // Запушить машину в массив
  } catch (e) {
    console.log(e);
  }
}

mp.events.add('startAuto::SERVER', function (player) {
  if (player.getVariable('drivingtest') == true) {
    chat.addNotify(player, 2, 'Вы уже оплатили тестирование', 4000);
    return;
  }

  if (player.getVariable('carpass') == 1) {
    chat.addNotify(player, 2, 'У вас уже есть права', 4000);
    return;
  }

  if (player.getMoney() < 500) {
    chat.addNotify(player, 2, 'Для того чтобы сдать на права необходимо 500$', 4000);
    return;
  }

  player.removeMoney(500);
  chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободную машину');
  player.setVariable('drivingtest', true);
});
mp.events.add('playerEnterVehicle', function _callee(player, vehicle) {
  var carid;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(vehicle.getVariable('testVeh') == true)) {
            _context.next = 19;
            break;
          }

          carid = vehicle.getVariable('carid');

          if (!(player.seat == 0 && player.getVariable('drivingtest') == true)) {
            _context.next = 16;
            break;
          }

          if (!(autoschoolTimeout != 105)) {
            _context.next = 11;
            break;
          }

          if (!(player.getVariable('testcarid') != carid)) {
            _context.next = 7;
            break;
          }

          chat.addNotify(player, 2, 'Вы начинали тест не в этой машине', 7000);
          return _context.abrupt("return", player.removeFromVehicle());

        case 7:
          secs = 100;
          chat.addNotify(player, 3, 'Вы продолжили тест!', 3000);
          clearInterval(autoSchoolInterval);
          return _context.abrupt("return", clearTimeout(autoschoolTimeout));

        case 11:
          player.call('DriveTest_startRoute::CLIENT');
          player.setVariable('testcarid', carid);
          player.setVariable('testcar', vehicle);
          _context.next = 19;
          break;

        case 16:
          if (!(player.seat == 0 && vehicle != player.getVariable('drivingtest') == true)) {
            _context.next = 19;
            break;
          }

          chat.addNotify(player, 2, 'Эта машина только для учеников автошколы', 7000);
          return _context.abrupt("return", player.removeFromVehicle());

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
});
mp.events.add('playerExitVehicle', function (player, vehicle) {
  if (vehicle.getVariable('testVeh') == true) {
    if (player.seat == 0 && player.getVariable('drivingtest') == true) {
      if (player.getVariable('testcarid') != vehicle.getVariable('carid')) {
        return;
      }

      chat.addNotify(player, 2, "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C 100 \u0441\u0435\u043A\u0443\u043D\u0434 \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u0422/\u0421", 9000);
      autoSchoolInterval = setInterval(function () {
        secs = secs - 10;
        chat.addNotify(player, 2, "\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C ".concat(secs, " \u0441\u0435\u043A\u0443\u043D\u0434 \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u0422/\u0421"), 9000);
      }, 10000);
      autoschoolTimeout = setTimeout(function () {
        player.setVariable('drivingtest', false);
        chat.addNotify(player, 3, "\u0412\u044B \u043D\u0435 \u0441\u0434\u0430\u043B\u0438 \u0442\u0435\u0441\u0442!", 5000);
        clearTimeout(autoschoolTimeout);
        clearInterval(autoSchoolInterval);
      }, 100000);
    }
  }
});
mp.events.add('FinalCheckpoint::SERVER', function _callee2(player) {
  var vehic, carid, currcar, veh;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Вы успешно сдали тест!');
          chat.addNotify(player, 1, "\u0412\u044B \u0441\u0434\u0430\u043B\u0438 \u0442\u0435\u0441\u0442 \u043D\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E B", 4000);
          player.setVariable('carpass', 1);
          player.setVariable('drivingtest', false);
          vehic = player.getVariable('testcar');
          _context2.next = 7;
          return regeneratorRuntime.awrap(vehic.destroy());

        case 7:
          carid = player.getVariable('testcarid');
          currcar = vehsPosition.find(function (o) {
            return o.vehId === carid;
          });
          veh = mp.vehicles["new"](mp.joaat(currcar.model), new mp.Vector3(currcar.x, currcar.y, currcar.z), {
            heading: currcar.heading
          });
          veh.setColor(70, 0);
          veh.setVariable('carid', currcar.vehId);
          veh.setVariable('testVeh', true);
          veh.setVariable('testBusy', false);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
mp.events.addCommand('carpass', function (player) {
  var carpass = player.getVariable('carpass');

  if (carpass == null) {
    return chat.addNotify(player, 2, 'У вас нет прав', 4000);
  }

  chat.addNotify(player, 1, "\u0412\u0430\u0448\u0438 \u043F\u0440\u0430\u0432\u0430: ".concat(carpass), 4000);
});