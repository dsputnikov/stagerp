// Создаем педа
let ped = mp.peds.new(mp.game.joaat('a_m_y_bevhills_01'), new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809), 128.07366943359375);

// Создаем 3D текст и прикрепляем его к педу
let text = mp.labels.new(`Изи Арендов (NPC)`, new mp.Vector3(ped.position.x, ped.position.y, ped.position.z + 1), {
    los: false,
    font: 0,
    drawDistance: 7,
    dimension: 0
});