// Создаем педа
let ped = mp.peds.new(mp.game.joaat('g_m_m_korboss_01'), new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809), 128.07366943359375);

// Создаем 3D текст и прикрепляем его к педу
let text = mp.labels.new(`Привет, ты можешь арендовать скутер \nу меня за 150$. Если ты согласен, \nвводи /rent в своем чате!`, new mp.Vector3(ped.position.x, ped.position.y, ped.position.z + 1), {
    font: 0,
    color: [255, 255, 255, 255],
    drawDistance: 10,
    dimension: ped.dimension
});