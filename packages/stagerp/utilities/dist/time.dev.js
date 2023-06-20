"use strict";

var moment = require('moment-timezone');

var chat = require('../events/basic/hud');

function updateTime() {
  var moscowTime = moment().tz('Europe/Moscow');
  var hours = moscowTime.hours();
  var minutes = moscowTime.minutes();
  var seconds = moscowTime.seconds();
  mp.world.time.set(hours, minutes, seconds);
}

setInterval(updateTime, 10000);
console.log('\x1b[34m[TIME]\x1b[0m Загружена система времени');
mp.events.addCommand('time', function (player) {
  var moscowTime = moment().tz('Europe/Moscow');
  var hours = moscowTime.hours();
  var minutes = moscowTime.minutes();
  var seconds = moscowTime.seconds();
  chat.send(player, "!{#0077FF}[\u0412\u0440\u0435\u043C\u044F] !{#FFFFFF}\u0421\u0435\u0439\u0447\u0430\u0441: ".concat(hours, ":").concat(minutes, ":").concat(seconds));
});
mp.events.addCommand('settime', function (player, id) {
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /time [время]');
  mp.world.time.set(id, id, id);
});