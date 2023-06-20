"use strict";

mp.events.add('playerDeath', function () {
  mp.players.local.freezePosition(true);
  setTimeout(function () {
    mp.players.local.freezePosition(false);
  }, 1000);
});