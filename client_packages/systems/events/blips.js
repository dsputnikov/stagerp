// Блипы, и педы

// Блипы

let governemnt = mp.blips.new(419, new mp.Vector3(-536, -218, 38), {
    name: 'Правительство',
    color: 4,
    shortRange: true,
});

let news = mp.blips.new(498, new mp.Vector3(-1070, -246, 53), {
    name: 'Новостное агенство',
    color: 1,
    shortRange: true,
});

let tuning = mp.blips.new(72, new mp.Vector3(-351, -134, 29), {
    name: 'Тюнинг сервис',
    color: 4,
    shortRange: true,
});

let autosaloon_medium = mp.blips.new(225, new mp.Vector3(-75.39668273925781, 64.27561950683594, 57.21598434448242), {
    name: 'Автосалон среднего класса',
    color: 57,
    shortRange: true,
});

let airport = mp.blips.new(90, new mp.Vector3(-1032.6295166015625, -2732.058837890625, 63.038902282714844), {
    name: 'Аеропорт ',
    color: 0,
    shortRange: true,
});

let coliseum = mp.blips.new(24, new mp.Vector3(-319.33905029296875, -1974.3548583984375, 87.76261901855469), {
    name: 'Колизей ',
    color: 0,
    shortRange: true,
});

let ballas_band = mp.blips.new(84, new mp.Vector3(104.41075897216797, -1940.5482177734375, 20.80369758605957), {
    name: 'Front Yard Ballas',
    color: 83,
    shortRange: true,
});

let vagos_band = mp.blips.new(84, new mp.Vector3(323.4017333984375, -2029.188232421875, 20.838010787963867), {
    name: 'Los Santos Vagos',
    color: 81,
    shortRange: true,
});

let aztec_band = mp.blips.new(84, new mp.Vector3(1435.540771484375, -1498.5040283203125, 63.223236083984375), {
    name: 'Varrios Los Aztecas',
    color: 84,
    shortRange: true,
});

let groove_band = mp.blips.new(84, new mp.Vector3(-215.70274353027344, -1603.1956787109375, 35.275577545166016), {
    name: 'Grove Street Families',
    color: 82,
    shortRange: true,
});

let driving_school = mp.blips.new(315, new mp.Vector3(-634.9441528320312, -2259.55224609375, 5.932521343231201), {
    name: 'Автошкола',
    color: 38,
    shortRange: true,
});


// Педы

mp.peds.new(mp.game.joaat('mp_f_deadhooker'), new mp.Vector3(106.412841796875, -1953.96826171875, 20.751243591308594), 5.030980587005615) // Баласы

mp.peds.new(mp.game.joaat('s_f_y_baywatch_01'), new mp.Vector3(326.3182678222656, -2020.286376953125, 21.396862030029297), 107.92273712158203) // Вагосы

mp.peds.new(mp.game.joaat('a_m_m_soucent_03'), new mp.Vector3(1437.6900634765625, -1496.4775390625, 63.22447204589844), 131.7062225341797) // Ацтеки

mp.peds.new(mp.game.joaat('g_m_y_famca_01'), new mp.Vector3(-206.95274353027344, -1604.972412109375, 34.83317947387695), -88.51010131835938) // Грув

mp.peds.new(mp.game.joaat('s_m_m_ciasec_01'), new mp.Vector3(-551.671142578125, -198.92312622070312, 38.2196044921875), -134.32952880859375) // Мерия

mp.peds.new(mp.game.joaat('mp_f_execpa_01'), new mp.Vector3(-634.9441528320312, -2259.55224609375, 5.932521343231201), -137.5953826904297) // Автошкола
