
let chat = require('./basic/hud');

mp.events.addCommand('me',(player,args) => {
    if(args == undefined) return chat.send(player,'!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /me [Действие]')
    chat.sendLocal(player,`!{#C2A2DA} ${player.name}[${player.getVariable('id')}]: ${args}`,15)
})

mp.events.addCommand('do',(player,args) => {
    if(args == undefined) return chat.send(player,'!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /do [Действие от 3-го лица]')
    chat.sendLocal(player,`!{#C2A2DA} ${args} (( ${player.name}[${player.getVariable('id')}] ))`,15)
})

mp.events.addCommand('try',(player,args) => {
    if(args == undefined) return chat.send(player,'!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /try [Действие]')
    let random = Math.floor(Math.random() * 2);
    if (random == 1) {
        chat.send(player, `!{#C2A2DA} ${player.name}[${player.getVariable('id')}] ${args} | !{#008000}удачно`,15)
    } else {
        chat.send(player, `!{#C2A2DA}${player.name}[${player.getVariable('id')}] ${args} | !{#DC143C}неудачно`,15)
    }
})


