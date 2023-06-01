"use strict";

var chat = require('../events/hud');

var methods = require('../modules/methods');

var vehs = [];
var vehsPosition = [{
  x: -604.0018920898438,
  y: -2220.6328125,
  z: 5.993218421936035,
  heading: 179.98362731933594,
  model: '350z'
}, {
  x: -609.0723266601562,
  y: -2216.541015625,
  z: 5.999357223510742,
  heading: -179.24368286132812,
  model: '350z'
}, {
  x: -614.2157592773438,
  y: -2211.9169921875,
  z: 6.003799915313721,
  heading: -177.21542358398438,
  model: 'surge'
}, {
  x: -618.8040161132812,
  y: -2208.107177734375,
  z: 6.002011299133301,
  heading: -176.26431274414062,
  model: 'surge'
}, {
  x: -623.83056640625,
  y: -2204.359619140625,
  z: 5.999294281005859,
  heading: -170.76583862304688,
  model: 'fugitive'
}, {
  x: -628.6629638671875,
  y: -2200.165283203125,
  z: 5.996785640716553,
  heading: -178.72802734375,
  model: 'fugitive'
}, {
  x: -633.4185180664062,
  y: -2196.209716796875,
  z: 5.994228363037109,
  heading: -172.87240600585938,
  model: 'landstalker'
}, {
  x: -638.2359619140625,
  y: -2191.4912109375,
  z: 5.993213653564453,
  heading: -176.1611785888672,
  model: 'landstalker'
}, {
  x: -643.1668701171875,
  y: -2187.626708984375,
  z: 5.993215084075928,
  heading: 178.1157989501953,
  model: 'rocoto'
}, {
  x: -647.8755493164062,
  y: -2184.0390625,
  z: 5.993215084075928,
  heading: -176.2241973876953,
  model: 'rocoto'
}, {
  x: -600.22607421875,
  y: -2215.2548828125,
  z: 5.993213653564453,
  heading: 3.5871331691741943,
  model: '350z'
}, {
  x: -605.2181396484375,
  y: -2210.96826171875,
  z: 5.993214130401611,
  heading: 1.4958386421203613,
  model: '350z'
}, {
  x: -610.0564575195312,
  y: -2206.73583984375,
  z: 5.993211269378662,
  heading: 5.569568157196045,
  model: 'surge'
}, {
  x: -614.8767700195312,
  y: -2202.69677734375,
  z: 5.993215084075928,
  heading: 2.515695095062256,
  model: 'surge'
}, {
  x: -619.5994262695312,
  y: -2198.896240234375,
  z: 5.996767997741699,
  heading: 4.005386829376221,
  model: 'fugitive'
}, {
  x: -624.5321655273438,
  y: -2194.916259765625,
  z: 5.996584415435791,
  heading: 2.8652095794677734,
  model: 'fugitive'
}, {
  x: -629.2779541015625,
  y: -2190.367919921875,
  z: 5.99386739730835,
  heading: 2.3266217708587646,
  model: 'landstalker'
}, {
  x: -634.3181762695312,
  y: -2186.47509765625,
  z: 5.993213176727295,
  heading: 3.6329636573791504,
  model: 'landstalker'
}, {
  x: -639.0682983398438,
  y: -2182.51953125,
  z: 5.993213653564453,
  heading: 1.8396157026290894,
  model: 'rocoto'
}, {
  x: -643.8656616210938,
  y: -2178.706787109375,
  z: 5.993217468261719,
  heading: -7.339174270629883,
  model: 'rocoto'
}, {
  x: -648.7033081054688,
  y: -2174.3720703125,
  z: 5.993214130401611,
  heading: -0.8991260528564453,
  model: '911turbos'
}];
mp.events.add('packagesLoaded', function () {
  for (var i = 0; i < vehsPosition.length; i++) {
    var taxiClass = vehsPosition[i]["class"];
    var veh = mp.vehicles["new"](mp.joaat(vehsPosition[i].model), new mp.Vector3(vehsPosition[i].x, vehsPosition[i].y, vehsPosition[i].z), {
      heading: vehsPosition[i].heading
    });
    veh.setColor(70, 0);
    veh.setVariable('testClass', taxiClass); // Класс машины

    veh.setVariable('testVeh', true); // То что она рабочая

    veh.setVariable('testBusy', false); // Занята ли машина

    vehs.push(veh); // Запушить машину в массив
  }
});
mp.events.add('DrivingTest', function (player) {
  if (player.getVariable('drivingtest') == true) {
    chat.addNotify(player, 2, 'Вы уже оплатили тестирование', 4000);
    return;
  }

  if (player.getMoney() < 150) {
    chat.addNotify(player, 2, 'Для того чтобы сдать на права необходимо 1500$', 4000);
    return;
  }

  player.removeMoney(1500);
  chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободную машину');
  player.setVariable('drivingtest', true);
});
mp.events.add('playerEnterVehicle', function (player, vehicle) {
  if (vehicle.getVariable('testVeh') == true) {
    if (player.seat == 0 && player.getVariable('drivingtest') == true) {
      chat.addNotify(player, 1, 'Ура победа', 7000);
      player.call('DriveTest_startRoute::CLIENT');
    } else if (player.seat == 0 && vehicle != player.getVariable('drivingtest') == true) {
      chat.addNotify(player, 2, 'Вы не получаете водительскую лицензию, или не работаете в автошколе', 7000);
      player.removeFromVehicle();
    }
  }
});