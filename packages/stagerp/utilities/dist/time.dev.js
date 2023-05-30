"use strict";

var moment = require('moment-timezone');

var chat = require('../events/hud');

function updateTime() {
  var moscowTime = moment().tz('Europe/Moscow');
  var hours = moscowTime.hours();
  var minutes = moscowTime.minutes();
  var seconds = moscowTime.seconds();
  mp.world.time.set(hours, minutes, seconds);
}

setInterval(updateTime, 10000);
console.log('Смена времени');
mp.events.addCommand('time', function (player) {
  var moscowTime = moment().tz('Europe/Moscow');
  var hours = moscowTime.hours();
  var minutes = moscowTime.minutes();
  var seconds = moscowTime.seconds();
  chat.send(player, "!{#BAFE2A}[\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F] !{#FFFFFF}\u0412\u0440\u0435\u043C\u044F \u0441\u0435\u0439\u0447\u0430\u0441: ".concat(hours, " \u0447\u0430\u0441\u043E\u0432 ").concat(minutes, " \u043C\u0438\u043D\u0443\u0442(\u044B) ").concat(seconds, " \u0441\u0435\u043A\u0443\u043D\u0434(\u044B)"));
});