let chat = require('./hud');
let methods = require('../modules/methods');

mp.events.addCommand("rent", (player) => {

    let rentPosition = new mp.Vector3(-1031.29541015625, -2724.4814453125, 20.150541305541992);
    let radius = 20;

    // Проверяем, находится ли игрок в радиусе 20 метров от указанной позиции
    if (player.dist(rentPosition) > radius) {
        chat.addNotify(player, 2, `Вы находитесь слишком далеко от позиции аренды транспорта.`, 7000);
        return;
    }

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
    numberPlate: "RENT",
    color: [[255, 255, 255], [255, 255, 255]]
    });
    
    // Установить владельцем транспорта текущего игрока
    vehicle.setVariable("owner", player);
    
    // Сообщаем игроку об аредне
    chat.addNotify(player,1,`Вы успешно арендовали Faggio на 15 минут.`,7000)

    setTimeout(() => { 
            vehicle.destroy();
          chat.addNotify(player, 3, `Арендованный транспорт был возвращен.`, 7000)
      }, 900000);
});