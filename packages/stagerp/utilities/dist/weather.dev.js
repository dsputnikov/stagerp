"use strict";

var https = require('https');

require('moment-timezone');

var apiKey = '1cb9827a5c6d29de111566621572b029';
var cityId = 524901;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=".concat(cityId, "&units=metric&appid=").concat(apiKey); // Обновление информации о погоде в игре

function updateWeather(weatherData) {
  mp.world.setWeatherTransition(weatherData.weather[0].main, 30);
} // Получение данных о погоде из API


function getWeather() {
  https.get(apiUrl, function (response) {
    var data = '';
    response.on('data', function (chunk) {
      data += chunk;
    });
    response.on('end', function () {
      var weatherData = JSON.parse(data);
      updateWeather(weatherData);
    });
  }).on('error', function (error) {
    console.error(error.message);
  });
}

getWeather();

function changeWeather() {
  setInterval(getWeather, 600000);
  console.log('Смена погоды');
}

changeWeather();
mp.events.addCommand('setweather', function (player, weather) {
  mp.world.weather = weather;
});