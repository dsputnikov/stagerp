

let chat = require('../events/hud');
let methods = require('../modules/methods')

let vehs = []
let mowerCoords = [
    { x: -1330.8494873046875, y: 42.466182708740234, z: 52.99873733520508, heading: -82.96205139160156 },
    { x: -1331.1927490234375, y: 45.25190734863281, z: 53.0027961730957, heading: -81.37229919433594 },
    { x: -1331.371337890625, y: 47.9963493347168, z: 53.001853942871094, heading: -84.51836395263672 },
    { x: -1331.793212890625, y: 50.80596923828125, z: 53.00857162475586, heading: -82.52415466308594 },
    { x: -1332.1180419921875, y: 53.78512954711914, z: 53.033565521240234, heading: -84.93504333496094 },
]

mp.events.add('packagesLoaded', () => {
    for (let i = 0; i < mowerCoords.length; i++) {
        let vehicle = mp.vehicles.new(mp.joaat('mower'), new mp.Vector3(mowerCoords[i].x, mowerCoords[i].y, mowerCoords[i].z), {
            heading: mowerCoords[i].heading
        })

        vehs.push(vehicle)
    }
})

let colshape = mp.colshapes.newSphere(-1337.1719970703125, 31.19898796081543, 53.54407501220703, 2, 0)
// mp.markers.new(1, new mp.Vector3(-1337.1719970703125, 31.19898796081543, 53.544075012207033), 1,
//     {
//         visible: true,
//         color: [44, 128, 239, 150],
//         dimension: 0
//     }
// )

cowBlip = mp.blips.new(78, new mp.Vector3(-1337.1719970703125, 31.19898796081543, 53.54407501220703),
    {
        name: 'Газонокосильщик',
        scale: 1,
        color: 57,
        dimension: 0,
        shortRange: true,
    }
)

function playerEnterColshapeHandler(player, shape) {
    if (shape == colshape) {
        player.call('LawnMower_showWindow::CLIENT')
    }
}


function exitShape(player, shape) {
    if (shape == colshape) {
        player.call('LawnMower_unbind::CLIENT');
    }
}

mp.events.add('playerExitColshape', exitShape);

// ---------------------------------

mp.events.add('LawnMower_startWork::SERVER', (player) => {
    player.lawnmower = true
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободную газонокосилку');
})

mp.events.add('LawnMower_enterPoint::SERVER', (player) => {
    player.notify('Отправляйтесь к следующей остановке.')
})

mp.events.add('LawnMower_endWork::SERVER', (player, t,salary) => {
    if (t == false) return player.lawnmower = false
    let key = player.getVariable('personalMowerKey')
    player.getVariable('personalMower').destroy()
    vehs[key] = mp.vehicles.new(mp.joaat('mower'), new mp.Vector3(mowerCoords[key].x, mowerCoords[key].y, mowerCoords[key].z), {
        heading: mowerCoords[key].heading
    })
    player.lawnmower = false
})

mp.events.add('LawnMower_endWay::SERVER', (player, earn) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF} Вы завершили маршрут, вы можете начать его заново')
    chat.addNotify(player, 3, `Вы заработали: $${earn}`, 7000)
    player.giveMoney(earn)
})

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    for (var [key, value] of Object.entries(vehs)) {
        if (vehicle == value) {
            if (player.lawnmower) {
                player.setVariable('personalMower', vehs[key])
                player.setVariable('personalMowerKey', key)
                player.call('LawnMower_startRoute::CLIENT')
            }
            else {
                player.removeFromVehicle()
                chat.addNotify(player, 2, 'Вы не работаете газонокосильщиком', 7000)
                break
            }
        }
    }
})

mp.events.add('playerQuit', (player) => {
    if (player.lawnmower) {
        let key = player.getVariable('personalMowerKey')
        player.getVariable('personalMower').destroy()
        vehs[key] = mp.vehicles.new(mp.joaat('mower'), new mp.Vector3(mowerCoords[key].x, mowerCoords[key].y, mowerCoords[key].z), {
            heading: mowerCoords[key].heading
        })
        player.lawnmower = false
    }
})

mp.events.add('playerEnterColshape', playerEnterColshapeHandler)

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}