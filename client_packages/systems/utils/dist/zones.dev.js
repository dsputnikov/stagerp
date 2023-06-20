"use strict";

// Массив зеленых зон
var greenZones = [{
  x: -1022,
  y: -2711,
  z: 13,
  radius: 150
} // Пример первой зеленой зоны
]; // Создание зеленых зон 

var greenZoneColshapes = greenZones.map(function (zone) {
  var x = zone.x,
      y = zone.y,
      z = zone.z,
      radius = zone.radius;
  var colshape = mp.colshapes.newSphere(x, y, z, radius);
  return colshape;
});
var playerInGreenZone = false;
mp.events.add('playerEnterColshape', function (player, shape) {
  if (shape != greenZoneColshapes) return;
  mp.events.callRemote("JoinGreen");
  playerInGreenZone = true;
}); // Обработка выхода игрока из зеленой зоны

mp.events.add('playerExitColshape', function (player, shape) {
  mp.events.callRemote("LeaveGreen");
  playerInGreenZone = false;
});
setInterval(function () {
  if (playerInGreenZone, true) {
    // mp.game.controls.disableControlAction(2, 142, true); // ЛКМ обычный удар
    // mp.game.controls.disableControlAction(0, 24, true); //disable attack
    // mp.game.controls.disableControlAction(2, 140, true);
    // mp.game.controls.disableControlAction(2, 141, true);
    // mp.game.controls.disableControlAction(0, 47, true); //disable weapon
    // mp.game.controls.disableControlAction(0, 58, true); //disable weapon
    // mp.game.controls.disableControlAction(0, 263, true); //disable melee
    // mp.game.controls.disableControlAction(0, 264, true); //disable melee
    // mp.game.controls.disableControlAction(0, 257, true); //disable melee
    // mp.game.controls.disableControlAction(0, 140, true); //disable melee
    // mp.game.controls.disableControlAction(0, 141, true); //disable melee
    // mp.game.controls.disableControlAction(0, 142, true); //disable melee
    // mp.game.controls.disableControlAction(0, 143, true); //disable melee
    return;
  } else {
    mp.game.controls.enableAllControlActions(2);
    return;
  }
}, 10);