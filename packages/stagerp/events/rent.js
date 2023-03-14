let chat = require('./hud');
let methods = require('../modules/methods');

mp.events.addCommand("rent", (player) => {
    if (player.getMoney() < 150) {
        chat.addNotify(player,2,`У вас не хватает денег для аренды транспорта.`,7000)
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
    numberPlate: "RENTAL",
    color: [[255, 255, 255], [255, 255, 255]]
    });
    
    // Установить владельцем транспорта текущего игрока
    vehicle.setVariable("owner", player);
    
    // Сообщаем игроку об аредне
    chat.addNotify(player,1,`Вы успешно арендовали транспорт.`,7000)
});