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
console.log('Смена времени');

mp.events.addCommand('time', (player) => {
  let moscowTime = moment().tz('Europe/Moscow');
  let hours = moscowTime.hours();
  let minutes = moscowTime.minutes();
  let seconds = moscowTime.seconds();
  chat.send(player, `!{#BAFE2A}[Информация] !{#FFFFFF}Время сейчас: ${hours} часов ${minutes} минут(ы) ${seconds} секунд(ы)`);
})
