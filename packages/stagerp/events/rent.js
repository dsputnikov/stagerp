let chat = require('./hud');
let methods = require('../modules/methods');

// Language
let config = require('../../../languages/config.js');
const language = config.language;
let translations = require(`../../../languages/${language}.json`);

// Объект, хранящий информацию о транспорте, арендованном игроком
const rentedVehicles = {};

mp.events.add("rentVehicle", (player) => {

    let rentPosition = new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809);
    let radius = 10;

    if (player.dist(rentPosition) > radius) {
        chat.addNotify(player, 2, translations.rent_away, 4000);
        return;
    }

    if (player.getMoney() < 150) {
        chat.addNotify(player, 2, translations.rent_no_money, 4000);
        return;
    }

    // Проверяем, арендовал ли игрок уже транспорт
    if (rentedVehicles[player.id]) {
        chat.addNotify(player, 3, translations.rent_rented, 4000);
        return;
    }

    // Снимаем бабки у игрока
    player.removeMoney(150);
    
    // Получить позицию игрока и вычислить позицию для спавна транспорта
    const playerPos = player.position;
    const spawnPos = new mp.Vector3(
    playerPos.x + 2,
    playerPos.y + 2,
    playerPos.z
    );
    
    // Создать объект Faggio и сохранить его в переменную vehicle
    const vehicle = mp.vehicles.new(mp.joaat("faggio"), playerPos, {
        numberPlate: "RENT",
        color: [[255, 255, 255], [255, 255, 255]]
      });
        
      player.putIntoVehicle(vehicle, 0);

    // Установить владельцем транспорта текущего игрока
    vehicle.setVariable("owner", player);

    // Сохраняем информацию о транспорте, арендованном игроком
    rentedVehicles[player.id] = vehicle;

    // Сообщаем игроку об аренде
    chat.addNotify(player, 1, translations.rent_succes, 4000)
    chat.send(player, `!{#BAFE2A}${translations.chat_info}!{#FFFFFF} ${translations.chat_rent} !{#a0a0a0}/unrent`);

    setTimeout(() => {
        // Если транспорт не был удален другим способом, то удаляем его сами
        if (vehicle && !vehicle.destroyed) {
            vehicle.destroy();
        }

        // Удаляем информацию о транспорте из объекта rentedVehicles
        delete rentedVehicles[player.id];

        chat.addNotify(player, 3, translations.rent_back, 4000)
    }, 900000);
});

mp.events.addCommand("unrent", (player) => {
    // Проверяем, арендовал ли игрок транспорт
    if (!rentedVehicles[player.id]) {
      chat.addNotify(player, 3, translations.rent_not_rented, 4000);
      return;
    }
  
    // Получаем транспорт, арендованный игроком
    const vehicle = rentedVehicles[player.id];
  
    // Проверяем, находится ли транспорт в игре и не был ли он уничтожен
    if (vehicle && !vehicle.destroyed) {
      // Проверяем, является ли игрок владельцем транспорта
      if (vehicle.getVariable("owner") !== player) {
        chat.addNotify(player, 3, translations.rent_not_owner, 4000);
        return;
      }
  
      // Удаляем транспорт
      vehicle.destroy();
  
      // Удаляем информацию о транспорте из объекта rentedVehicles
      delete rentedVehicles[player.id];
  
      // Сообщаем игроку об успешном возврате транспорта
      chat.addNotify(player, 3, translations.rent_back, 4000);
    } else {
      // Если транспорт не был найден или был уничтожен, то удаляем информацию о нем из объекта rentedVehicles
      delete rentedVehicles[player.id];
    }
  });