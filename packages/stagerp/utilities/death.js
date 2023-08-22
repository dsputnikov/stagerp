
let chat = require('../events/basic/hud');
let methods = require('../modules/methods')

mp.events.add('playerDeath', (player) => {
    player.spawn(new mp.Vector3(320.3235168457031, -583.7880859375, 43.28410339355469));
    chat.addNotify(player, 3, `Вы умерли`, 4000);
    player.call('playerDeath')
})

mp.events.addCommand('phonestart', (player) => {
    player.call('PhoneAnimShow')
    chat.addNotify(player, 3, `Нету`, 4000);
  })


  mp.events.addCommand('phonestop', (player) => {
    player.call('PhoneAnimHide')
    chat.addNotify(player, 3, `Нету`, 4000);
  })
