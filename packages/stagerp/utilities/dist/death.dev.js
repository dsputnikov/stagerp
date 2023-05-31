"use strict";

var chat = require('../events/hud');

var methods = require('../modules/methods');

mp.events.add('playerDeath', function (player) {
  player.spawn(new mp.Vector3(1819.9295654296875, 3675.97509765625, 34.274879455566406));
  chat.addNotify(player, 3, "\u0412\u044B \u0443\u043C\u0435\u0440\u043B\u0438", 4000);
  player.setHealth(50);
  player.call(playerDeath);
});