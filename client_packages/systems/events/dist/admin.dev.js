"use strict";

mp.events.add('freezePlayer', function () {
  mp.players.local.freezePosition(true);
});
mp.events.add('unfreezePlayer', function () {
  mp.players.local.freezePosition(false);
});
var g_bIslandLoaded = false;
mp.keys.bind(0x72
/* F3 */
, false, function () {
  g_bIslandLoaded = !g_bIslandLoaded;
  mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", g_bIslandLoaded);
  mp.gui.chat.push("Island ".concat(g_bIslandLoaded ? "loaded" : "unloaded"));
});