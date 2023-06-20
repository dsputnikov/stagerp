const https = require('https');

require('moment-timezone');

let apiKey = '1cb9827a5c6d29de111566621572b029';
let cityId = 524901;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

// Обновление информации о погоде в игре
function updateWeather(weatherData) {
  mp.world.setWeatherTransition(weatherData.weather[0].main, 30);
}

// Получение данных о погоде из API
function getWeather() {
  https.get(apiUrl, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      const weatherData = JSON.parse(data);
      updateWeather(weatherData);
    });
  }).on('error', (error) => {
    console.error(error.message);
  });
}

getWeather();

function changeWeather () {
setInterval(getWeather, 600000);
console.log('\x1b[34m[WEATHER]\x1b[0m Загружена система погоды');
}

changeWeather();

mp.events.addCommand('setweather', (player, weather) => {
  mp.world.weather = weather; 
})
