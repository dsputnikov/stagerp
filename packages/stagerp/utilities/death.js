
let chat = require('../events/hud');
let methods = require('../modules/methods')

mp.events.add('playerDeath', (player) => {
    player.spawn(new mp.Vector3(1819.9295654296875, 3675.97509765625, 34.274879455566406));
    chat.addNotify(player, 3, `Вы умерли`, 4000);
    player.setHealth(50)
    player.call(playerDeath)
})