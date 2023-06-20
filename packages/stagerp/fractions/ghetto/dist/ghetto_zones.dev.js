"use strict";

mp.events.add('playerJoin', function (player) {
  // Предположим, что у вас есть массив объектов с данными о зонах банд
  var gangZonesDataParam = [{
    gangId: 1,
    color: 1
  }, {
    gangId: 2,
    color: 5
  }, {
    gangId: 3,
    color: 6
  }, {
    gangId: 4,
    color: 7
  }]; // Отправляем данные о зонах банд конкретному игроку

  player.call('SRV::CL::CreateGangZones', [JSON.stringify(gangZonesDataParam)]);
});