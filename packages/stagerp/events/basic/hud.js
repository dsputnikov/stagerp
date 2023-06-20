
let chatRange = 100;

// Language
let config = require('../../../../languages/config.js');
const language = config.language;
let translations = require(`../../../../languages/${language}.json`);


mp.events.add('Chat_sendMessage::SERVER', (player, text) => {
    mp.players.forEachInRange(player.position, chatRange,
		(_player) => {
			// _player.call('Hud_addString::CLIENT',[`${player.name}[${player.getVariable('id')}]: ${text}`])
			_player.call('Hud_addString::CLIENT',[`${player.name} ${translations.chat_say} ${text}`])
		}
	);
})

function sendLocal(player,text,range) {
    mp.players.forEachInRange(player.position, range,
		(_player) => {
			_player.call('Hud_addString::CLIENT',[text])
		}
	);
}

function send(player,text) {
    player.call('Hud_addString::CLIENT', [text]);
}


function sendAll(text) {
	mp.players.forEach(player => {
		player.call('Hud_addString::CLIENT', [text]);
	})
}

function addNotify(player, type, text, time) {
    player.call('HUD_addNotify::CLIENT', [type, text, time]);
}

mp.events.add('Hud_addNotify::SERVER',addNotify)
mp.events.add('Hud_chatSendLocal::SERVER',addNotify)
mp.events.add('Hud_chatSendMessage::SERVER',send)

module.exports.send = send;
module.exports.sendLocal = sendLocal;
module.exports.sendAll = sendAll;
module.exports.addNotify = addNotify;