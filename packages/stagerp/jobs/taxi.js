let hud = require('../events/basic/hud');
let chat = require('../events/basic/hud');
let methods = require('../modules/methods');


let vehs = []
let highDrivers = []
let basicDrivers = []
let drivers = []
let orderNum = 0
let driversCount = 0;

const taxiRentPrice = 50;

let vehsPosition = [
    { x: 915.5032348632812, y: -156.73291015625, z: 74.82296752929688, heading: -159.63490295410156, model: 'zentorno', class: 'basic' },
    { x: 913.7279052734375, y: -159.40740966796875, z: 74.41818237304688, heading: -167.60166931152344, model: 'taxi', class: 'basic' },
    { x: 911.4353637695312, y: -163.27716064453125, z: 73.98075103759766, heading: -166.48545837402344, model: 'taxi', class: 'basic' },
    { x: 921.8226318359375, y: -160.55274963378906, z: 74.50399780273438, heading: 96.44390869140625, model: 'taxi', class: 'basic' },
    { x: 921.0332641601562, y: -163.47915649414062, z: 74.43801879882812, heading: 98.19879150390625, model: 'taxi', class: 'basic' },
    { x: 918.7367553710938, y: -167.08013916015625, z: 74.25261688232422, heading: 101.62165069580078, model: 'taxi', class: 'basic' },
    { x: 916.537353515625, y: -170.5793914794922, z: 74.05635070800781, heading: 103.02247619628906, model: 'taxi', class: 'basic' },
    { x: 914.8978271484375, y: -174.15272521972656, z: 74.0072021484375, heading: 102.48480987548828, model: 'taxi', class: 'basic' },
    { x: 908.9239501953125, y: -166.82177734375, z: 73.75811767578125, heading: -165.85772705078125, model: 'taxi', class: 'basic' },
    // 
    { x: 908.6675415039062, y: -183.36904907226562, z: 73.79553985595703, heading: 56.599853515625, model: 'teslas', class: 'high' },
    { x: 907.0020141601562, y: -186.2198028564453, z: 73.67008209228516, heading: 59.06535720825195, model: 'teslas', class: 'high' },
    { x: 905.1466674804688, y: -188.83175659179688, z: 73.47737884521484, heading: 57.077171325683594, model: 'teslas', class: 'high' },
    { x: 903.4790649414062, y: -191.69735717773438, z: 73.43746185302734, heading: 57.17950439453125, model: 'teslas', class: 'high' },
    { x: 897.093994140625, y: -183.39524841308594, z: 73.40139770507812, heading: -121.83515930175781, model: 'teslas', class: 'high' },
    { x: 899.35546875, y: -180.55770874023438, z: 73.4720458984375, heading: -119.78297424316406, model: 'teslas', class: 'high' },
]

mp.events.add('packagesLoaded', () => {
    for (let i = 0; i < vehsPosition.length; i++) {
        let taxiClass = vehsPosition[i].class
        let veh = mp.vehicles.new(mp.joaat(vehsPosition[i].model), new mp.Vector3(vehsPosition[i].x, vehsPosition[i].y, vehsPosition[i].z), {
            heading: vehsPosition[i].heading,
        })
        veh.setColor(89, 89)
        veh.setVariable('taxiClass', taxiClass) // Класс такси
        veh.setVariable('taxiVeh', true) // То что это вообще робочее такси
        veh.setVariable('taxiBusy', false) // Занята ли машина
        vehs.push(veh) // Запушить машину в массив
    }
})

let workColshape = mp.colshapes.newSphere(899.4337158203125, -172.7586669921875, 74.02117156982422, 1)

mp.blips.new(225, new mp.Vector3(908.6675415039062, -183.36904907226562, 73.79553985595703), {
    name: 'Такси',
    color: 5,
    dimension: 0,
    shortRange: true,
})

// Вход выход из шэйпа
mp.events.add('playerEnterColshape', (player, shape) => {
    if (shape == workColshape) {
        // Тут проверка на уровень и лицензии
        player.call('Taxi_showWindow::CLIENT')
    }
})

mp.events.add('playerExitColshape', (player, shape) => {
    if (shape == workColshape) {
        player.call('Taxi_unbind::CLIENT')
    }
})

mp.events.add('Taxi_declineBtn::SERVER', (player) => {
    player.removeFromVehicle()
})

mp.events.add('Taxi_GotAJob::SERVER', (player) => {
    player.setVariable('preworkTaxi', true); // То что уже устроен но не арендовал машину или что то такое
    hud.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Сядьте в свободное такси!')
    hud.addNotify(player, 1, 'Вы устроились таксистом', 7000)
})

mp.events.add('Taxi_endWork::SERVER', (player) => {
    if (player.getVariable('taxiWork') == true) {
        // ЕСЛИ ОН АРЕНДОВАЛ МАШИНУ
        let key = player.getVariable('personalTaxiKey')
        let cls = player.getVariable('personalTaxi').class
        player.getVariable('personalTaxi').destroy();
        vehs[key] = mp.vehicles.new(vehsPosition[key].model, new mp.Vector3(vehsPosition[key].x, vehsPosition[key].y, vehsPosition[key].z), {
            heading: vehsPosition[key].heading,
        });
        vehs[key].setColor(89, 89)
        vehs[key].setVariable('taxiVeh', true)
        vehs[key].setVariable('taxiClass', cls)
        vehs[key].setVariable('vehBusy', false)
        player.setVariable('personalTaxiKey', null)
            // 
        player.setVariable('taxiWork', false)
    }
    player.setVariable('preworkTaxi', false);
    hud.addNotify(player, 1, 'Вы уволились', 7000)
})

// Ивент когда садишся
mp.events.add('playerEnterVehicle', (player, vehicle) => {
    if (vehicle.getVariable('taxiVeh') == true) {
        if (player.seat == 0 && player.getVariable('preworkTaxi') == true) {

            if (player.getVariable('taxiWork') == true) return
            player.call('Taxi_openRentWindow::CLIENT')
        } else if (player.seat == 0 && vehicle != player.getVariable('personalTaxi') && player.getVariable('taxiWork') == true) {
            hud.addNotify(player, 2, 'Это не ваша машина', 7000)
            player.removeFromVehicle()
        } else if (vehicle.getVariable('taxiBusy') == true && player.seat != 0) {
            chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Укажите метку на карте.');
            player.call('Taxi_interimSitWithoutOrder::CLIENT', [vehicle])
        } else if (player.seat == 0 && player.getVariable('preworkTaxi') == false && player.getVariable('taxiWork') == false) {
            hud.addNotify(player, 2, 'Вы не работаете таксистом', 7000)
            player.removeFromVehicle()
        }
    }
})

// Аренда такси
mp.events.add('Taxi_rentTaxi::SERVER', (player) => {
    if (player.getMoney() < taxiRentPrice) { // Проверка на деньги
        hud.addNotify(player, 2, 'У вас недостаточно денег', 7000)
        player.removeFromVehicle()
        return;
    }
    for (var [key, value] of Object.entries(vehs)) {
        if (player.vehicle == value) {
            switch (player.vehicle.class) {
                case 'basic':
                    basicDrivers.push(player)
                    break

                case 'high':
                    highDrivers.push(player)
                    break
            }
            drivers.push(player)
            player.setVariable('personalTaxi', value)
            player.setVariable('personalTaxiKey', key)
            value.setVariable('taxiBusy', true)
                // 
            player.setVariable('taxiWork', true)
            player.setVariable('preworkTaxi', false)
            player.call('Taxi_openPriceWindow::CLIENT') // Показ окна с установкой цены
            player.call('Taxi_updateRate::CLIENT', [value.getVariable('taxiClass')])
            hud.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Вы успешно арендовали такси, чтобы открыть меню заказов нажмите !{#BAFE2A}J')
        }

    }
})

let timeout = null

mp.events.addCommand('order', (player, _, cls) => {
    if (player.getVariable('preworkTaxi') == false && player.getVariable('taxiWork') == false && player.getVariable('Taxi_orderedStatus') == false) {
        switch (cls) {
            case 1:
                cls = 'basic'
                break

            case 2:
                cls = 'high'
                break
        }
        player.call('Taxi_interimCreateOrder::CLIENT', [cls])
        player.setVariable('Taxi_orderedStatus', true)
        timeout = setTimeout(() => {
            player.setVariable('Taxi_orderedStatus', false)
        }, 300000)
        let clsChecker = (cls == 'basic') ? 'среднего класса' : 'высокого класса'
        hud.addNotify(player, 1, `Вы успешно вызвали такси ${clsChecker}. Не покидайте место вызова.`, 7000)
    } else {
        hud.addNotify(player, 2, 'Вы не можете вызвать такси.', 7000)
    }
})

mp.events.add('Taxi_interimCreateOrder::SERVER', (player, cls) => {
    orderNum++
    switch (cls) {
        case 'basic':
            basicDrivers.forEach(d => {
                let dist = d.dist(player.position)
                d.call('Taxi_createOrder::CLIENT', [orderNum, player.name, dist, player.getVariable('id')])
            })
            break

        case 'high':
            highDrivers.forEach(d => {
                let dist = d.dist(player.position)
                d.call('Taxi_createOrder::CLIENT', [orderNum, player.name, dist, player.getVariable('id')])
            })
            break
    }
})

mp.events.add('Taxi_cancelOrder::SERVER', (player, driver) => {
    player.setVariable('Taxi_orderedStatus', false)
    driver.setVariable('Taxi_orderExecutionStatus', false)
    driver.call('Taxi_cancelOrder::CLIENT')
})

mp.events.add('Taxi_interimAcceptOrder::SERVER', (player, id) => {
    player.setVariable('Taxi_orderExecutionStatus', true)
    let target = methods.getById(id)
    player.call('Taxi_acceptOrder::CLIENT', [target])
})

mp.events.add('Taxi_orderAccepted::SERVER', (player, target) => {
    target.call('Taxi_orderAccepted::CLIENT', [player])
    hud.addNotify(target, 1, 'Ваш заказ приняли. Ожидайте.', 7000)
})

mp.events.add('Taxi_driverArrived::SERVER', (player, target) => {
    target.setVariable('Taxi_driverArrived', true)
    target.call('Taxi_driverArrived::CLIENT')
})

mp.events.add('Taxi_executeDeleteOrder::SERVER', (player) => {
    drivers.forEach(d => d.call('Taxi_executeDeleteOrder::CLIENT'))
})

mp.events.add('Taxi_driverLeave::SERVER', (player, target) => {
    player.setVariable('Taxi_orderExecutionStatus', false)
    hud.addNotify(target, 2, 'Ваш заказ отменен. Таксист куда-то исчез.', 7000)
})

mp.events.add('Taxi_targetEnterTaxi::SERVER', (player) => {
    player.setVariable('Taxi_driverArrived', false)
})

mp.events.add('Taxi_interimSitWithoutOrder::SERVER', (player, driver) => {
    console.log(driver)
    hud.addNotify(driver, 1, 'К вам сел клиент. Дождитесь, пока он поставит точку на GPS.', 7000)
    driver.setVariable('Taxi_orderExecutionStatus', true)
    driver.call('Taxi_sitWithoutOrder::CLIENT', [player])
})

mp.events.add('Taxi_interimOrderExecution::SERVER', (player, pos, driver) => {
    let target = player
    driver.call('Taxi_interimOrderExecution::CLIENT', [target, pos])
})

mp.events.add('Taxi_orderExecution::SERVER', (player, pos) => {
    player.call('Taxi_orderExecution::CLIENT', [pos])
})

mp.events.add('Taxi_orderCompleted::SERVER', (player, target) => {
    hud.addNotify(target, 1, 'Поездка завершена, вы прибыли в точку назначения.', 7000)
    target.setVariable('Taxi_driverArrived', false)
    target.setVariable('Taxi_orderedStatus', false)
    target.call('Taxi_orderCompleted::CLIENT')
})

mp.events.add('Taxi_impossibleToSpecifyCoords::SERVER', (player, target) => {
    hud.addNotify(target, 2, 'Вы не можете поставить метку. Таксист уже принял чей-то заказ.')
})