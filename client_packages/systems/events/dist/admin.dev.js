"use strict";

mp.events.add('freezePlayer', function () {
  mp.players.local.freezePosition(true);
});
mp.events.add('unfreezePlayer', function () {
  mp.players.local.freezePosition(false);
});