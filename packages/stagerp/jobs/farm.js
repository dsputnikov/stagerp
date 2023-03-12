
let chat = require('../events/hud');

let farmPedColshape = mp.colshapes.newSphere(2016.3450927734375, 4984.787109375, 41.27164077758789, 2, 0);
mp.blips.new(88, new mp.Vector3(2016.3450927734375, 4984.787109375, 41.27164077758789), {
    color: 6,
    name: 'Ферма',
    shortRange: true,
})

mp.blips.new(90, new mp.Vector3(2112.056640625, 4797.61572265625, 41.07637023925781, -59.30644607543945), {
    color: 4,
    name: 'Аэропорт фермы',
    shortRange: true,
}) 

function farmPedEnter(player, shape) {
    if (shape == farmPedColshape) {
        player.call('Farm_showWindow::CLIENT');
    }
}

function farmPedExit(player, shape) {
    if (shape == farmPedColshape) {
        player.call('client::unbindFarmKey');
    }
}

mp.events.add("playerEnterColshape", farmPedEnter);
mp.events.add('playerExitColshape', farmPedExit);

let tractorPos = [
    { x: 2022.2806396484375, y: 4954.994140625, z: 41.660194396972656, heading: 43.69660186767578 },
    { x: 2018.85595703125, y: 4951.29541015625, z: 41.673072814941406, heading: 44.79761505126953 },
    { x: 2015.1746826171875, y: 4947.466796875, z: 41.79221725463867, heading: 41.460453033447266 },
    { x: 2011.3402099609375, y: 4943.77734375, z: 41.912078857421875, heading: 42.90863037109375 },
    { x: 2007.6905517578125, y: 4940.30419921875, z: 41.96379470825195, heading: 42.809837341308594 },

];

mp.events.add('Farm_startWork::SERVER', (player, type) => {
    chat.addNotify(player, 1, 'Вы успешно устроились на ферму', 7000)
    if (type == 1) {
        chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Идите на поле собирать сено!');
    }
    else if (type == 2) {
        chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободный трактор');
    }
    player.farmWork = type;
});

mp.events.add('Farm_stopWork::SERVER', (player) => {
    player.farmWork = 0;
    chat.addNotify(player, 1, 'Вы успешно уволились', 7000)
})

mp.events.add('Farm_addPlayerSalary::SERVER', (player, money) => {
    player.giveMoney(money)
})

mp.events.add('playerQuit', (player) => {
    if (player.farmWork == 2) {
        player.getVariable('personalTractor').destroy();
    }
    player.farmWork = 0;
});

mp.events.add('Farm_playAnimation::SERVER', (player, type) => {
    if (type == true) {
        player.playScenario('WORLD_HUMAN_GARDENER_PLANT');
    }
    else {
        player.stopAnimation();
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let tractors = [];

mp.events.add('packagesLoaded', () => {
    for (let i = 0; i < tractorPos.length; i++) {
        let vehicle = mp.vehicles.new('tractor2', new mp.Vector3(tractorPos[i].x, tractorPos[i].y, tractorPos[i].z), {
            heading: tractorPos[i].heading,
        });
        tractors.push(vehicle)
    }
})

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    for (var [key, value] of Object.entries(tractors)) {
        if (vehicle == value) {
            if (player.farmWork == 2) {
                player.setVariable('personalTractor', tractors[key])
                player.setVariable('personalTractorKey', key)
                player.call('Farm_startTractorWork::CLIENT')
            }
            else {
                player.removeFromVehicle()
                chat.addNotify(player, 2, 'Вы не работаете на ферме', 7000)
                break;
            }
        }
    }
});

mp.events.add('Farm_stopTractorWork::SERVER', (player) => {
    let key = player.getVariable('personalTractorKey')
    player.getVariable('personalTractor').destroy();
    tractors[key] = mp.vehicles.new('tractor2', new mp.Vector3(tractorPos[key].x, tractorPos[key].y, tractorPos[key].z), {
        heading: tractorPos[key].heading,
    });
    player.farmWork = 0;
})


mp.events.add('setAnimation::server', (player, state, type) => {
    if (parseInt(type) == 1 && state) {
        player.playScenario('WORLD_HUMAN_BUM_WASH')
    } else if (parseInt(type) == 1 && !state) {
        player.stopAnimation()
    } else if (parseInt(type) == 2 && state) {
        player.playScenario('PROP_HUMAN_PARKING_METER')
    } else if (parseInt(type) == 2 && !state) {
        player.stopAnimation()
    }

})


// 

let airplanePos = [
    { x: 2127.8720703125, y: 4819.498046875, z: 41.61676788330078, heading: 175.45614624023438 },
    { x: 2115.387939453125, y: 4814.65625, z: 41.61391830444336, heading: 174.0477294921875 },
    { x: 2104.55126953125, y: 4810.3369140625, z: 41.58534240722656, heading: 179.27490234375 },
    { x: 2091.32421875, y: 4805.62744140625, z: 41.6119384765625, heading: -176.32083129882812 },
    { x: 2076.117919921875, y: 4801.111328125, z: 41.795257568359375, heading: -177.91725158691406 },

]

let airplanes = []

mp.events.add('packagesLoaded', () => {
    for (let i = 0; i < airplanePos.length; i++) {
        let airplane = mp.vehicles.new(mp.joaat('duster'), new mp.Vector3(airplanePos[i].x, airplanePos[i].y, airplanePos[i].z), {
            heading: airplanePos[i].heading,
        })
        airplanes.push(airplane)
    }
})

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    for (var [key, value] of Object.entries(airplanes)) {
        if (vehicle == value) {
            if (player.farmWork == 4) {
                player.setVariable('personalAirplane', airplanes[key])
                player.setVariable('personalAirplaneKey', key)
                player.call('Farm_startPilotWork::CLIENT') // вызвать начало
            }
            else {
                player.removeFromVehicle()
                chat.addNotify(player, 2, 'Вы не работаете на ферме', 7000)
                break;
            }
        }
    }
})
