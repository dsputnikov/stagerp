"use strict";

mp.events.add('playerDeath', function () {
  mp.players.local.freezePosition(true);
});
mp.events.add('playerAlive', function () {
  mp.players.local.freezePosition(false);
});