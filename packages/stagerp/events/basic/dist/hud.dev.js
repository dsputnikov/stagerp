"use strict";

var chatRange = 100; // Language

var config = require('../../../../languages/config.js');

var language = config.language;

var translations = require("../../../../languages/".concat(language, ".json"));

mp.events.add('Chat_sendMessage::SERVER', function (player, text) {
  mp.players.forEachInRange(player.position, chatRange, function (_player) {
    // _player.call('Hud_addString::CLIENT',[`${player.name}[${player.getVariable('id')}]: ${text}`])
    _player.call('Hud_addString::CLIENT', ["".concat(player.name, " ").concat(translations.chat_say, " ").concat(text)]);
  });
});

function sendLocal(player, text, range) {
  mp.players.forEachInRange(player.position, range, function (_player) {
    _player.call('Hud_addString::CLIENT', [text]);
  });
}

function send(player, text) {
  player.call('Hud_addString::CLIENT', [text]);
}

function sendAll(text) {
  mp.players.forEach(function (player) {
    player.call('Hud_addString::CLIENT', [text]);
  });
}

function addNotify(player, type, text, time) {
  player.call('HUD_addNotify::CLIENT', [type, text, time]);
}

mp.events.add('Hud_addNotify::SERVER', addNotify);
mp.events.add('Hud_chatSendLocal::SERVER', addNotify);
mp.events.add('Hud_chatSendMessage::SERVER', send);
module.exports.send = send;
module.exports.sendLocal = sendLocal;
module.exports.sendAll = sendAll;
module.exports.addNotify = addNotify;