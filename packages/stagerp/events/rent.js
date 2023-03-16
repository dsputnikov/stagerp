let chat = require('./hud');
let methods = require('../modules/methods');

// Language
let config = require('../../../languages/config.js');
const language = config.language;
let translations = require(`../../../languages/${language}.json`);

mp.events.addCommand("rent", (player) => {

    let rentPosition = new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809);
    let radius = 3;

    if (player.dist(rentPosition) > radius) {
        chat.addNotify(player, 2, `Вы находитесь слишком далеко от позиции аренды транспорта.`, 7000);
        return;
    }

    if (player.getMoney() < 150) {
        chat.addNotify(player, 2, translations.no_money, 7000);
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
    const vehicle = mp.vehicles.new(mp.joaat("faggio"), spawnPos, {
    numberPlate: "RENT",
    color: [[255, 255, 255], [255, 255, 255]]
    });
        
    // Установить владельцем транспорта текущего игрока
    vehicle.setVariable("owner", player);
    
    // Сообщаем игроку об аредне
    chat.addNotify(player, 1, `Вы успешно арендовали Faggio на 15 минут.`,7000)

    setTimeout(() => { 
            vehicle.destroy();
          chat.addNotify(player, 3, `Арендованный транспорт был возвращен.`, 7000)
      }, 900000);a
});