"use strict";

var hidden = false;
var playerFreeze = false;
global.chatOpened = false;
mp.events.add('render', function () {
  // const __playerPosition__ = player.position;
  // const distance = vdist(__playerPosition__, __playerPosition__);
  // if (distance <= 25 && player.getVariable('INVISIBLE') != true) {
  //     const headPosition = player.getBoneCoords(12844, 0, 0, 0);
  //     const headPosition2d = mp.game.graphics.world3dToScreen2d(headPosition.x, headPosition.y, headPosition.z + 0.5);
  //     if (!headPosition2d) {
  //         return false;
  //     }
  //     const scale = scalable(distance, 25);
  //     const scaleSprite = 0.7 * scale;
  //     // const voiceDistance = clamp(3, 50, safeGetVoiceInfo(player, 'distance') || __CONFIG__.defaultDistance);
  //     // const isConnected = safeGetVoiceInfo(player, 'stateConnection') === 'connected';
  //     // const isMuted = !!safeGetVoiceInfo(player, 'muted');
  //     // const sprite = !isMuted ?
  //     //     isConnected ?
  //     //         safeGetVoiceInfo(player, 'enabled') ?
  //     //             voiceDistance < 10 ?
  //     //                 'leaderboard_audio_1'
  //     //                 :
  //     //                 voiceDistance <= 20 ?
  //     //                     'leaderboard_audio_2'
  //     //                     :
  //     //                     voiceDistance > 20 ?
  //     //                         'leaderboard_audio_3'
  //     //                         :
  //     //                         ''
  //     //             :
  //     //             'leaderboard_audio_inactive'
  //     //         : 'leaderboard_audio_mute'
  //     //     : 'leaderboard_audio_mute';
  //     // const spriteColor = isConnected ? [255, 255, 255, 255] : [244, 80, 66, 255];
  //     //drawSprite("mpleaderboard", sprite, [scaleSprite, scaleSprite], 0, spriteColor, headPosition2d.x, headPosition2d.y + 0.038 * scale);
  //     if (!mp.game.graphics.hasStreamedTextureDictLoaded("mpleaderboard")) {
  //         mp.game.graphics.requestStreamedTextureDict("mpleaderboard", true);
  //     }
  //     if (mp.game.graphics.hasStreamedTextureDictLoaded("mpleaderboard")) {
  //         mp.game.graphics.drawSprite("mpleaderboard", "leaderboard_audio_2", headPosition2d.x, headPosition2d.y + 0.038 * scale, 0.020, 0.020, 0, 255, 255, 255, 100);
  //     }
  // }
  mp.game.vehicle.setExperimentalAttachmentSyncEnabled(true); // Hide default hud component

  mp.discord.update('Играет на STAGE MODE FOR SALE', 'Пространствует по штату stage'); //

  mp.game.audio.setRadioToStationName("OFF");
  mp.game.audio.setUserRadioControlEnabled(false); //

  mp.game.ui.hideHudComponentThisFrame(7); // area name

  mp.game.ui.hideHudComponentThisFrame(9); // street name

  mp.game.ui.hideHudComponentThisFrame(6);
  mp.game.ui.hideHudComponentThisFrame(2);
  mp.game.ui.hideHudComponentThisFrame(3);
  mp.gui.chat.show(false);
  mp.gui.chat.activate(false); // Disables the chat

  var plocation = mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z);
  var location = mp.game.ui.getLabelText(plocation);
  var zone_hash = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
  var zone = mp.game.ui.getStreetNameFromHashKey(zone_hash.streetName);
  browser.call('HUD_updateLocation::CEF', getMinimapTopRight().y + 130, getMinimapTopRight().x + 15, location, zone);
  var vehicle = player.vehicle;

  if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
    if (hidden == false) {
      browser.execute("Speedometer.active = true");
    }

    var vel = vehicle.getSpeed();
    var speed = Math.round(parseInt(vel) * 3.6);
    browser.execute("Speedometer.speed = ".concat(speed));
  } else {
    browser.execute("Speedometer.active = false");
  } //     


  var online = mp.players.length;
  browser.execute("HUD.server.online = ".concat(online, ";"));
  browser.execute("HUD.server.login = '".concat(player.getVariable('login'), "(").concat(player.getVariable('id'), ")'"));

  if (playerFreeze) {
    mp.game.controls.disableAllControlActions(0);
  } // browser.emit('HUD_updateInfo::CEF', players.length, `${alt.Player.local.getSyncedMeta('login')}(${alt.Player.local.getSyncedMeta('id')})`)

});
mp.keys.bind(0x54, true, function () {
  if (hidden == true) return;
  global.chatOpened = true;
  global.browser.execute("Chat.open = true");
  playerFreeze = true;
}); // F7

mp.keys.bind(0x76, true, function () {
  if (player.getVariable('logged') == false) return;
  if (inTestdrive) return;
  if (hidden == true) return mp.events.call('HUD_setShow::CLIENT', !false);
  mp.events.call('HUD_setShow::CLIENT', !true);
});
mp.keys.bind(0x71, true, function () {
  if (mp.gui.cursor.visible == false) return mp.gui.cursor.show(true, true);
  mp.gui.cursor.show(false, false);
});
mp.events.add('HUD_setShow::CLIENT', function (bool) {
  hidden = !bool;
  mp.game.ui.displayRadar(bool);
  global.browser.execute("Chat.active = ".concat(bool));
  global.browser.execute("HUD.active = ".concat(bool));
  global.browser.execute("Speedometer.active = ".concat(bool));
}); //////////////

mp.events.add('Hud_updateMoney::CLIENT', function (money, bank) {
  money = formatNumber(money);
  bank = formatNumber(bank);
  if (bank == undefined) return browser.execute("HUD.money = '".concat(money, "'; HUD.bank = '0';"));
  browser.execute("HUD.money = '".concat(money, "'; HUD.bank = '").concat(bank, "';"));
});

function formatNumber(x) {
  if (x == null) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} // Чат


mp.events.add('Hud_sendMessage::CEF', function (text) {
  mp.events.callRemote('Chat_sendMessage::SERVER', text);
  playerFreeze = false;
  global.chatOpened = false;
});
mp.events.add('Hud_addString::CLIENT', function (text) {
  browser.execute("Chat.acceptMessage('".concat(text, "')"));
});
mp.events.add('HUD_addNotify::CLIENT', function (type, text, time) {
  browser.call('HUD_addNotification::CEF', type, text, time);
});
mp.events.add('HUD_freezePlayer::CLIENT', function (bool) {
  playerFreeze = bool;
  global.chatOpened = false;
}); ////////////////////////////////

function getMinimapWidth() {
  var aspectRatio = getScreenAspectRatio();
  var resolution = getScreenResolution();
  return resolution.x / (4 * aspectRatio);
}

function getMinimapHeight() {
  var resolution = getScreenResolution();
  return resolution.y / 5.674;
}

function getMinimapTopLeft() {
  var resolution = getScreenResolution();
  var safeZone = getSafeZoneSize();
  var height = getMinimapHeight();
  var x = resolution.x * (1.0 / 20.0 * (Math.abs(safeZone - 1.0) * 10));
  var y = resolution.y - resolution.y * (1.0 / 20.0 * (Math.abs(safeZone - 1.0) * 10)) - height;
  return {
    x: x,
    y: y
  };
}

function getMinimapTopRight() {
  var _getMinimapTopLeft = getMinimapTopLeft(),
      x = _getMinimapTopLeft.x,
      y = _getMinimapTopLeft.y;

  return {
    x: x + getMinimapWidth(),
    y: y
  };
}

function getSafeZoneSize() {
  return mp.game.graphics.getSafeZoneSize();
}

function getScreenAspectRatio() {
  return mp.game.graphics.getScreenAspectRatio(false);
}

function getScreenResolution() {
  var _mp$game$graphics$get = mp.game.graphics.getScreenActiveResolution(0, 0),
      _ = _mp$game$graphics$get._,
      x = _mp$game$graphics$get.x,
      y = _mp$game$graphics$get.y;

  return {
    x: x,
    y: y
  };
}

var vdist = function vdist(v1, v2) {
  var diffY = v1.y - v2.y;
  var diffX = v1.x - v2.x;
  var diffZ = v1.z - v2.z;
  return Math.sqrt(diffY * diffY + diffX * diffX + diffZ * diffZ);
};

var scalable = function scalable(dist, maxDist) {
  return Math.max(0.1, 1 - dist / maxDist);
};