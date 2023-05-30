let moment = require('moment-timezone');
let chat = require('../events/hud');

function updateTime() {
  let moscowTime = moment().tz('Europe/Moscow');
  let hours = moscowTime.hours();
  let minutes = moscowTime.minutes();
  let seconds = moscowTime.seconds();
  mp.world.time.set(hours, minutes, seconds);
}

setInterval(updateTime, 10000) 
console.log('Система време');

mp.events.addCommand('time', (player) => {
  let moscowTime = moment().tz('Europe/Moscow');
  let hours = moscowTime.hours();
  let minutes = moscowTime.minutes();
  let seconds = moscowTime.seconds();
  chat.send(player, `!{#0077FF}[Время] !{#FFFFFF}Сейчас: ${hours}:${minutes}:${seconds}`);
})
