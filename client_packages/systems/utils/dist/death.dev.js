"use strict";

var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local;
mp.events.add('playerDeath', function () {
  mp.players.local.freezePosition(true);
  setTimeout(function () {
    mp.players.local.freezePosition(false);
  }, 5000);
});
mp.events.add('playerAlive', function () {
  mp.players.local.freezePosition(false);
});