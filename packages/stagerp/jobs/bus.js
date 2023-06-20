
let chat = require('../events/basic/hud');
let methods = require('../modules/methods')

let vehs = []
let busCoords = [
    { x: -2063.57666015625, y: -452.4790344238281, z: 12.4374361038208, heading: -39.9633903503418 },
    { x: -2060.904296875, y: -454.8425598144531, z: 12.440308570861816, heading: -41.21049880981445 },
    { x: -2058.25048828125, y: -457.12139892578125, z: 12.439010620117188, heading: -40.996376037597656 },
    { x: -2055.64111328125, y: -459.69036865234375, z: 12.45114803314209, heading: -42.631004333496094 },
    { x: -2049.26416015625, y: -464.8476867675781, z: 12.439809799194336, heading: -41.2593994140625 },
    { x: -2046.194091796875, y: -467.050048828125, z: 12.418618202209473, heading: -40.589908599853516 },
    { x: -2043.272705078125, y: -469.4171142578125, z: 12.41033935546875, heading: -39.60492706298828 },
    { x: -2032.3846435546875, y: -478.33929443359375, z: 12.444161415100098, heading: -39.65288543701172 },
    { x: -2029.4117431640625, y: -480.8187561035156, z: 12.449345588684082, heading: -38.23915100097656 },
    { x: -2026.36865234375, y: -483.2796630859375, z: 12.449324607849121, heading: -38.22382354736328 },
    { x: -2023.20458984375, y: -486.0599670410156, z: 12.459059715270996, heading: -40.36960983276367 },
    { x: -2016.9644775390625, y: -491.59246826171875, z: 12.467791557312012, heading: -41.024044036865234 },
    { x: -2013.7913818359375, y: -493.7904052734375, z: 12.446037292480469, heading: -40.7005615234375 },
    { x: -2010.1763916015625, y: -496.6317138671875, z: 12.392169952392578, heading: -39.17671203613281 },
]

mp.events.add('packagesLoaded', () => {
    for (let i = 0; i < busCoords.length; i++) {
        let vehicle = mp.vehicles.new(0x84718D34, new mp.Vector3(busCoords[i].x, busCoords[i].y, busCoords[i].z), {
            heading: busCoords[i].heading
        })

        vehs.push(vehicle)
    }

    vehs.forEach(el => {
        el.setVariable('busWork', 1)
    })
})

let colshape = mp.colshapes.newSphere(-2032.5418701171875, -463.5075988769531, 11.424650192260742, 2, 0)

mp.blips.new(513, new mp.Vector3(-2032.5418701171875, -463.5075988769531, 11.424650192260742),
    {
        name: 'Автобусник',
        scale: 1,
        color: 57,
        dimension: 0,
        shortRange: true,
    })

function playerEnterColshapeHandler(player, shape) {
    if (shape == colshape) {
        player.call('Bus_showWindow::CLIENT')
    }
}


function exitShape(player, shape) {
    if (shape == colshape) {
        player.call('Bus_unbind::CLIENT');
    }
}

mp.events.add('playerExitColshape', exitShape);

// ---------------------------------

mp.events.add('Bus_startWork::SERVER', (player) => {
    player.bus = true
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободный автобус');
})

mp.events.add('Bus_enterPoint::SERVER', (player) => {
    player.notify('Отправляйтесь к следующей остановке.')
})

mp.events.add('Bus_endWork::SERVER', (player, t) => {
    if (t == false) return player.bus = false
    let key = player.getVariable('personalBusKey')
    player.getVariable('personalBus').destroy()
    vehs[key] = mp.vehicles.new(0x84718D34, new mp.Vector3(busCoords[key].x, busCoords[key].y, busCoords[key].z), {
        heading: busCoords[key].heading
    })
    player.bus = false
})

mp.events.add('Bus_endWay::SERVER', (player, earn) => {
    if (player.bus && player.seat == 0) {
        chat.send(player,'!{#BAFE2A}[Информация] !{#FFFFFF} Вы завершили маршрут, вы можете начать его заново!')
        chat.addNotify(player,1,`Вы заработали: ${earn}`,7000)
    } 
})

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    for (var [key, value] of Object.entries(vehs)) {
        if (vehicle == value) {
            if (player.bus && player.seat == 0) {
                player.setVariable('personalBus', vehs[key])
                player.setVariable('personalBusKey', key)
                vehicle.setVariable('busDriverId', player.getVariable('id'))
                player.call('Bus_startRoute::CLIENT')
            } else if (!player.bus && player.seat != 0) {
                if (player.getMoney() < 5) {
                    chat.addNotify(player, 2, 'У вас недостаточно денег для проезда', 7000)
                    player.removeFromVehicle()
                    return;
                }
                player.removeMoney(5)
                chat.addNotify(player, 1, 'Вы заплатили $5 за проезд. Приятного пути.', 7000)
                // player.call('Bus_getBusTips::CLIENT', [vehicle])
                mp.events.call('Bus_tips::SERVER', player)
            } else {
                player.removeFromVehicle()
                chat.addNotify(player, 2, 'Вы не работаете автобусником', 7000)
                break
            }
        }
    }
})

mp.events.add('Bus_tips::SERVER', (player) => {
    if (player.vehicle) {
        if (player.vehicle.getVariable('busWork') == 1) {
            let id = player.vehicle.getVariable('busDriverId')
            let target = methods.getById(id)
            let tips = getRandomInt(10);
            if (tips == 0) return;
            chat.addNotify(target, 3, `Вы получили $${tips} чаевых`, 7000)
        }
    }
})

mp.events.add('playerQuit', (player) => {
    if (player.bus) {
        let key = player.getVariable('personalBusKey')
        player.getVariable('personalBus').destroy()
        vehs[key] = mp.vehicles.new(0x84718D34, new mp.Vector3(busCoords[key].x, busCoords[key].y, busCoords[key].z), {
            heading: 280
        })
        player.bus = false;
    }
})

mp.events.add('playerEnterColshape', playerEnterColshapeHandler)

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}