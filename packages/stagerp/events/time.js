
// Время
let hour = 6;
let minute = 1;
let second = 1;

setInterval(() => {
    if (second == 59) {
        minute++;
        second = 0;
    }
    if (minute == 59) {
        hour++;
        minute = 0;
    }
    if (hour == 23) {
        hour = 0;
    }
    second++;
    mp.world.time.set(hour, minute, second);
}, 50);

// Погода

let weathertime = 60;

let weathers = [
    'EXTRASUNNY',
    'CLEAR',
    'CLOUDS',
    'SMOG',
    'FOGGY',
    'OVERCAST',
    'RAIN',
    'THUNDER'
]

setInterval(() => {
    console.log('Смена погоды')
    let random = getRandomInt(weathers.length-1);
    mp.world.weather = weathers[random]; // SETTER
}, weathertime*10000);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


mp.events.addCommand('settime', (player, _hour) => {
    hour = _hour;
})

mp.events.addCommand('setweather', (player, weather) => {
    mp.world.weather = weather; 
})