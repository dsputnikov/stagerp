let chat = require('../events/basic/hud');
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
    
    // Получаем позицию игрока и вычисляем позицию для спавна транспорта
    const playerPos = player.position;
    const spawnPos = new mp.Vector3(
    playerPos.x + 2,
    playerPos.y + 2,
    playerPos.z
    );
    
    // Спавн Faggio и сохранение его в переменную vehicle
    const vehicle = mp.vehicles.new(mp.joaat("faggio"), playerPos, {
        numberPlate: "RENT",
        color: [[255, 255, 255], [255, 255, 255]]
      });
        
      player.putIntoVehicle(vehicle, 0);

    // Устанавить владельца, сохранить его
    vehicle.setVariable("owner", player);
    rentedVehicles[player.id] = vehicle;

    // Сообщаем игроку об аренде
    chat.addNotify(player, 1, translations.rent_succes, 4000)
    chat.send(player, `!{#BAFE2A}${translations.chat_info}!{#FFFFFF} ${translations.chat_rent} !{#a0a0a0}/unrent`);

    setTimeout(() => {
        if (vehicle && !vehicle.destroyed) {
            vehicle.destroy();
            delete rentedVehicles[player.id];
            chat.addNotify(player, 3, translations.rent_back, 4000)
        }
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
      if (vehicle.getVariable("owner") !== player) {
        chat.addNotify(player, 3, translations.rent_not_owner, 4000);
        return;
      }
  
      vehicle.destroy();
      delete rentedVehicles[player.id];
  
      // Сообщаем игроку об успешном возврате транспорта
      chat.addNotify(player, 3, translations.rent_back, 4000);
    } else {
      delete rentedVehicles[player.id];
    }
  });