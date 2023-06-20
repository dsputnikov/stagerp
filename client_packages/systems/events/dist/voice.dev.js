"use strict";

var Use3d = true;
var UseAutoVolume = false;
var MaxRange = 50.0;
mp.keys.bind(0x4E, true, function () {
  if (!player.getVariable('logged')) return;
  if (chatOpened) return;
  mp.voiceChat.muted = !mp.voiceChat.muted;
  mp.events.callRemote('Hud_addNotify::SERVER', 3, "".concat(!mp.voiceChat.muted ? "Войс включен" : "Войс выключен"), 2000);
});
var g_voiceMgr = {
  listeners: [],
  add: function add(player) {
    this.listeners.push(player);
    player.isListening = true;
    mp.events.callRemote("add_voice_listener", player);

    if (UseAutoVolume) {
      player.voiceAutoVolume = true;
    } else {
      player.voiceVolume = 1.0;
    }

    if (Use3d) {
      player.voice3d = true;
    }
  },
  remove: function remove(player, notify) {
    var idx = this.listeners.indexOf(player);
    if (idx !== -1) this.listeners.splice(idx, 1);
    player.isListening = false;

    if (notify) {
      mp.events.callRemote("remove_voice_listener", player);
    }
  }
};
mp.events.add("playerQuit", function (player) {
  if (player.isListening) {
    g_voiceMgr.remove(player, false);
  }
});
setInterval(function () {
  var localPlayer = mp.players.local;
  var localPos = localPlayer.position;
  mp.players.forEachInStreamRange(function (player) {
    if (player != localPlayer) {
      if (!player.isListening) {
        var playerPos = player.position;
        var dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

        if (dist <= MaxRange) {
          g_voiceMgr.add(player);
        }
      }
    }
  });
  g_voiceMgr.listeners.forEach(function (player) {
    if (player.handle !== 0) {
      var playerPos = player.position;
      var dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

      if (dist > MaxRange) {
        g_voiceMgr.remove(player, true);
      } else if (!UseAutoVolume) {
        player.voiceVolume = 1 - dist / MaxRange;
      }
    } else {
      g_voiceMgr.remove(player, true);
    }
  });
}, 500);