let moment = require('moment-timezone');
let chat = require('../events/hud');

function updateTime() {
  let moscowTime = moment().tz('Europe/Moscow');
  let hours = moscowTime.hours();
  let minutes = moscowTime.minutes();
  let seconds = moscowTime.seconds();
  mp.world.time.set(hours, minutes, seconds);
}

setInterval(updateTime, 100000) 
console.log('Система времени: работает');

mp.events.addCommand('time', (player) => {
  let moscowTime = moment().tz('Europe/Moscow');
  let hours = moscowTime.hours();
  let minutes = moscowTime.minutes();
  let seconds = moscowTime.seconds();
  chat.send(player, `!{#0077FF}[Время] !{#FFFFFF}Сейчас: ${hours}:${minutes}:${seconds}`);
})

mp.events.addCommand('settime', (player, id) => {
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /time [время]');
  mp.world.time.set(id, id, id);
})
