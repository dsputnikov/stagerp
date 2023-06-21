let chat = require('../events/basic/hud');
let methods = require('../modules/methods')

mp.events.add('JoinGreen' , (player) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Ты в ЗЗ другалек');
    player.setVariable('greenzone', true);
})

mp.events.add('LeaveGreen' , (player) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Ты вышел из ЗЗ другалек');
    player.setVariable('greenzone', false);
})