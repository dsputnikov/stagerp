"use strict";

var chat = require('../events/basic/hud');

var methods = require('../modules/methods');

mp.events.add('playerDeath', function (player) {
  player.spawn(new mp.Vector3(320.3235168457031, -583.7880859375, 43.28410339355469));
  chat.addNotify(player, 3, "\u0412\u044B \u0443\u043C\u0435\u0440\u043B\u0438", 4000);
  player.call('playerDeath');
});