"use strict";

var chat = require('../events/hud');

var methods = require('../modules/methods');

var vehs = [];
var vehsPosition = [{
  x: -652.669677734375,
  y: -2286.48583984375,
  z: 8.275339126586914,
  heading: -102.36421966552734,
  model: '911turbos'
}, {
  x: -688.9263305664062,
  y: -2294.243896484375,
  z: 13.113988876342773,
  heading: -40.50196838378906,
  model: '911turbos'
}, {
  x: -698.869873046875,
  y: -2301.1826171875,
  z: 12.986425399780273,
  heading: -143.59425354003906,
  model: '911turbos'
}, {
  x: -687.4171142578125,
  y: -2331.513916015625,
  z: 13.102848052978516,
  heading: 175.50885009765625,
  model: '911turbos'
}];
mp.events.add('packagesLoaded', function () {
  for (var i = 0; i < vehsPosition.length; i++) {
    var taxiClass = vehsPosition[i]["class"];
    var veh = mp.vehicles["new"](mp.joaat(vehsPosition[i].model), new mp.Vector3(vehsPosition[i].x, vehsPosition[i].y, vehsPosition[i].z), {
      heading: vehsPosition[i].heading
    });
    veh.setColor(70, 50);
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