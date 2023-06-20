let chat = require('../../events/basic/hud');
let methods = require('../../modules/methods');

let autoschoolTimeout = 105;
let autoSchoolInterval;
let secs = 100;

let vehs = []
let vehsPosition = [
    { x: -604.0018920898438, y: -2220.6328125, z: 6, heading: 179.98362731933594, model: '350z', vehId: 1 },
    { x: -609.0723266601562, y: -2216.541015625, z: 6, heading: -179.24368286132812, model: '350z', vehId: 2 },
    { x: -614.2157592773438, y: -2211.9169921875, z: 6, heading: -177.21542358398438, model: 'surge', vehId: 3 },
    { x: -618.8040161132812, y: -2208.107177734375, z: 6.002011299133301, heading: -176.26431274414062, model: 'surge', vehId: 4 },
    { x: -623.83056640625, y: -2204.359619140625, z: 5.999294281005859, heading: -170.76583862304688, model: 'fugitive', vehId: 5 },
    { x: -628.6629638671875, y: -2200.165283203125, z: 5.996785640716553, heading: -178.72802734375, model: 'fugitive', vehId: 6 },
    { x: -633.4185180664062, y: -2196.209716796875, z: 5.994228363037109, heading: -172.87240600585938, model: 'landstalker', vehId: 7 },
    { x: -638.2359619140625, y: -2191.4912109375, z: 5.993213653564453, heading: -176.1611785888672, model: 'landstalker', vehId: 8 },
    { x: -643.1668701171875, y: -2187.626708984375, z: 5.993215084075928, heading: 178.1157989501953, model: 'rocoto', vehId: 9 },
    { x: -647.8755493164062, y: -2184.0390625, z: 5.993215084075928, heading: -176.2241973876953, model: 'rocoto', vehId: 10 },

    { x: -600.22607421875, y: -2215.2548828125, z: 5.993213653564453, heading: 3.5871331691741943, model: '350z', vehId: 11 },
    { x: -605.2181396484375, y: -2210.96826171875, z: 5.993214130401611, heading: 1.4958386421203613, model: '350z', vehId: 12 },
    { x: -610.0564575195312, y: -2206.73583984375, z: 5.993211269378662, heading: 5.569568157196045, model: 'surge', vehId: 13 },
    { x: -614.8767700195312, y: -2202.69677734375, z: 5.993215084075928, heading: 2.515695095062256, model: 'surge', vehId: 14 },
    { x: -619.5994262695312, y: -2198.896240234375, z: 5.996767997741699, heading: 4.005386829376221, model: 'fugitive', vehId: 15 },
    { x: -624.5321655273438, y: -2194.916259765625, z: 5.996584415435791, heading: 2.8652095794677734, model: 'fugitive', vehId: 16 },
    { x: -629.2779541015625, y: -2190.367919921875, z: 5.99386739730835, heading: 2.3266217708587646, model: 'landstalker', vehId: 17 },
    { x: -634.3181762695312, y: -2186.47509765625, z: 5.993213176727295, heading: 3.6329636573791504, model: 'landstalker', vehId: 18 },
    { x: -639.0682983398438, y: -2182.51953125, z: 5.993213653564453, heading: 1.8396157026290894, model: 'rocoto', vehId: 19 },
    { x: -643.8656616210938, y: -2178.706787109375, z: 5.993217468261719, heading: -7.339174270629883, model: 'rocoto', vehId: 20 },
    { x: -648.7033081054688, y: -2174.3720703125, z: 5.993214130401611, heading: -0.8991260528564453, model: '911turbos', vehId: 21 },
]

    for (let i = 0; i < vehsPosition.length; i++) {
        try{
        let veh = mp.vehicles.new(mp.joaat(vehsPosition[i].model), new mp.Vector3(vehsPosition[i].x, vehsPosition[i].y, vehsPosition[i].z), {
            heading: vehsPosition[i].heading,
        })
        veh.setColor(70, 0);
        veh.setVariable('carid', vehsPosition[i].vehId) // id car
        veh.setVariable('testVeh', true) // То что она рабочая
        veh.setVariable('testBusy', false) // Занята ли машина
        vehs.push(veh) // Запушить машину в массив
    }catch(e) {
        console.log(e);
    }
    }

mp.events.add('startAuto::SERVER' , (player) => {
    if (player.getVariable('drivingtest') == true) {
        chat.addNotify(player, 2, 'Вы уже оплатили тестирование', 4000);
        return;
    }
    if (player.getVariable('carpass') == 1) {
        chat.addNotify(player, 2, 'У вас уже есть права', 4000);
        return;
    }
    if (player.getMoney() < 500) {
        chat.addNotify(player, 2, 'Для того чтобы сдать на права необходимо 500$', 4000);
        return;
    }
    player.removeMoney(500);
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Садитесь в свободную машину');
    player.setVariable('drivingtest', true);
})

mp.events.add('playerEnterVehicle', async (player, vehicle) => {
    if (vehicle.getVariable('testVeh') == true) {
        const carid = vehicle.getVariable('carid')

        if (player.seat == 0 && player.getVariable('drivingtest') == true) {
            if(autoschoolTimeout != 105) {
                if(player.getVariable('testcarid') != carid) {
                    chat.addNotify(player, 2, 'Вы начинали тест не в этой машине', 7000)
                    return player.removeFromVehicle();
                }
                secs = 100;
                chat.addNotify(player, 3, 'Вы продолжили тест!', 3000);
                clearInterval(autoSchoolInterval);
                return clearTimeout(autoschoolTimeout);
            }
            player.call('DriveTest_startRoute::CLIENT');
            player.setVariable('testcarid', carid);
            player.setVariable('testcar', vehicle);
        } else if (player.seat == 0 && vehicle != player.getVariable('drivingtest') == true) {
            chat.addNotify(player, 2, 'Эта машина только для учеников автошколы', 7000)
            return player.removeFromVehicle()
        }
    }
})

mp.events.add('playerExitVehicle', (player, vehicle) => {
    if (vehicle.getVariable('testVeh') == true) {
        if (player.seat == 0 && player.getVariable('drivingtest') == true) {
            if(player.getVariable('testcarid') != vehicle.getVariable('carid')) {
                return;
            }
            chat.addNotify(player, 2, `У вас есть 100 секунд чтобы вернуться в Т/С`, 9000);
            autoSchoolInterval = setInterval(() => {
                secs = secs - 10;
                chat.addNotify(player, 2, `У вас есть ${secs} секунд чтобы вернуться в Т/С`, 9000);
            }, 10000)
            autoschoolTimeout = setTimeout(() => {
                player.setVariable('drivingtest', false);
                chat.addNotify(player, 3, `Вы не сдали тест!`, 5000);
                clearTimeout(autoschoolTimeout);
                clearInterval(autoSchoolInterval);
            }, 100000)
        }
    }
})

mp.events.add('FinalCheckpoint::SERVER' , async (player) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Вы успешно сдали тест!');
    chat.addNotify(player, 1, `Вы сдали тест на категорию B`, 4000);
    player.setVariable('carpass', 1);
    player.setVariable('drivingtest', false);
    const vehic = player.getVariable('testcar');
    await vehic.destroy();
    const carid = player.getVariable('testcarid');
    const currcar = vehsPosition.find(o => o.vehId === carid);

    const veh = mp.vehicles.new(mp.joaat(currcar.model), new mp.Vector3(currcar.x, currcar.y, currcar.z), {
        heading: currcar.heading,
    })

    veh.setColor(70, 0);
    veh.setVariable('carid', currcar.vehId);
    veh.setVariable('testVeh', true);
    veh.setVariable('testBusy', false); 
})

mp.events.addCommand('carpass', (player) => {
    let carpass = player.getVariable('carpass');
    if(carpass == null) {
        return chat.addNotify(player, 2, 'У вас нет прав', 4000);
    }
    chat.addNotify(player, 1, `Ваши права: ${carpass}`, 4000);
})

mp.events.add('JoinGreen' , (player) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Ты в ЗЗ другалек');
    player.setVariable('greenzone', true);
})

mp.events.add('LeaveGreen' , (player) => {
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Ты вышел из ЗЗ другалек');
    player.setVariable('greenzone', false);
})