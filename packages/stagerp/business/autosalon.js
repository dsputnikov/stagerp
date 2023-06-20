
let chat = require('../events/basic/hud');

const heading = require('../index.js');

function generateRandomNumberPlate() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Доступные символы для номерных знаков
    let plate = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        plate += characters[randomIndex];
    }
    return plate;
}

var salons = [
    {
        name: 'Среднего класса',
        marker: new mp.Vector3(-57.05355453491211, -1097.1641845703125, 25.5),
        scale: 0.9,
        blipColor: 31,
        vehicles: [
            { name: 'Albany Emperor', price: 4000, model: 'emperor' },
            { name: 'Albany Primo', price: 5500, model: 'primo' },
            { name: 'Albany Washington', price: 9000, model: 'washington' },
            { name: 'Zirconium Stratum', price: 13000, model: 'stratum' },
            { name: 'Cheval Surge', price: 15000, model: 'surge' },
            { name: 'Canis Seminole', price: 15000, model: 'seminole' },
            { name: 'Dundreary Landstalker', price: 25000, model: 'landstalker' },
            { name: 'Obey Rocoto', price: 40000, model: 'rocoto' },
        ],
        standVehicle: new mp.Vector3(-42.659339904785156, -1098.883544921875, 26.4154052734375),
        testDrive: new mp.Vector3(-47.550472259521484, -1113.944580078125, 25.43579864501953),
        exitPosition: new mp.Vector3(-49.24433898925781, -1102.9827880859375, 26.422351837158203),
    },
    {
        name: 'Низкого класса',
        marker: new mp.Vector3(-38.880760192871094, -1673.1343994140625, 28.48229217529297),
        scale: 0.9,
        blipColor: 75,
        vehicles: [
            { name: 'Dodge Charger Hellcat', price: 150000, model: 'hellcat15' },
            { name: 'Mitsubishi Lancer Evolution', price: 60000, model: 'mevo9t' },
            { name: 'Bentley Electro', price: 90000, model: '19msctntgt' },
            { name: 'BMW i7', price: 120000, model: 'bmwi7' },
            { name: 'BMW 3', price: 130000, model: 'bmw3' },
            { name: 'Toyota Camry 3.5', price: 140000, model: 'camry18' },
            { name: 'Ford Focus RS', price: 100000, model: 'focusrs' },
            { name: 'Nissan Skyline', price: 150000, model: 'gtr34' },
            { name: 'Tesla Model X', price: 80000, model: 'modelx' },
            { name: 'Toyota Land-Cruiser Prado 200', price: 110000, model: 'land200' },
        ],
        standVehicle: new mp.Vector3(-47.21013259887695, -1687.5595703125, 29.437057495117188),
        testDrive: new mp.Vector3(-55.265777587890625, -1669.2708740234375, 29.285898208618164),
        exitPosition: new mp.Vector3(-40.39360046386719, -1669.7412109375, 29.479703903198242),
    },
    {
        name: 'Высокого класса',
        marker: new mp.Vector3(-795.868896484375, -219.9210968017578, 36.079654693603516),
        scale: 0.9,
        blipColor: 83,
        vehicles: [
            { name: 'Sheava', price: 350000, model: 'sheava' },
            { name: 'Tyrant', price: 400000, model: 'tyrant' },
            { name: 'Entityxf', price: 200000, model: 'entityxf' },
            { name: 'Banshee', price: 200000, model: 'banshee2' },
            { name: 'Zentorno', price: 800000, model: 'zentorno' },
            { name: 'Prototipo', price: 800000, model: 'prototipo' },
            { name: 'T20', price: 750000, model: 't20' },
            { name: 'GT63SAMG', price: 1500000, model: 'gt63samg' },
            { name: 'Huracan', price: 2500000, model: 'huracan' },
            { name: 'Laferrari', price: 2500000, model: 'laferrari' },
        ],
        standVehicle: new mp.Vector3(-783.6351318359375, -224.0694122314453, 36.968379974365234),
        testDrive: new mp.Vector3(-768.3637084960938, -245.3536376953125, 37.24693298339844),
        exitPosition: new mp.Vector3(-798.1190795898438, -221.21755981445312, 37.07961654663086),
    },
    {
        name: 'Лодок',
        marker: new mp.Vector3(-1599.558349609375, -1182.2337646484375, 0.4373306035995483),
        blipColor: 23,
        vehicles: [
            { name: 'Ddinghy', price: 91000, model: 'dinghy' },
            { name: 'Jetmax', price: 91000, model: 'jetmax' },
            { name: 'Marquis', price: 91000, model: 'marquis' },
            { name: 'Speeder', price: 91000, model: 'speeder' },
            { name: 'Speeder2', price: 91000, model: 'speeder2' },
            { name: 'Squalo', price: 91000, model: 'squalo' },
            { name: 'Toro', price: 91000, model: 'toro' },
            { name: 'Toro2', price: 91000, model: 'toro2' },
        ],
        standVehicle: new mp.Vector3(-1639.4722900390625, -1178.4822998046875, 0.296030730009079),
        testDrive: new mp.Vector3(-1617.3248291015625, -1209.57275390625, 0.5454487204551697),
        exitPosition: new mp.Vector3(-1598.4398193359375, -1179.5806884765625, 1.575283408164978),
    },
]

var salonColshapes = []

// цикл

for (let i = 0; i < salons.length; i++) {
    let shape = mp.colshapes.newSphere(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z, 2);
    let marker = mp.markers.new(1, new mp.Vector3(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z), 1);

    mp.blips.new(225, salons[i].marker,
        {
            name: `Автосалон ${salons[i].name}`,
            color: salons[i].blipColor,
            shortRange: true,
        });
    salonColshapes.push(shape);
}

mp.events.add('playerEnterColshape', (player, shape) => {
    for (var [key, value] of Object.entries(salonColshapes)) {
        if (shape == value) {
            player.dimension = parseInt(player.getVariable('id') + 12)
            player.call('Autosalon_create::CLIENT', [JSON.stringify(salons[key].vehicles), salons[key].standVehicle])
            player.call('Autosalon_openWindow::CLIENT', [player.getMoney(), player.getBankMoney(), salons[key].name])
            player.setVariable('currentAutosalon', key)
            break;
        }
    }
});

var testvehicle;

mp.events.add('Autosalon_testdrive_start::SERVER', (player, model, color_1, color_2) => {
    let color = JSON.parse(color_1);
    let color2 = JSON.parse(color_2);
    let dim = player.getVariable('id') + 11;
    testvehicle = mp.vehicles.new(mp.joaat(model), new mp.Vector3(salons[player.getVariable('currentAutosalon')].testDrive))
    player.testdrive = true;
    player.dimension = dim;
    testvehicle.dimension = dim;
    // testvehicle.setColor(color_1, color_2);
    testvehicle.setColorRGB(color[0],color[1],color[2],color2[0],color2[1],color2[2])
    player.putIntoVehicle(testvehicle, 0);
})

// Выход из тест драйва
mp.events.add('playerStartExitVehicle', (player) => {
    if (player.testdrive == true) {
        player.testdrive = false;
        player.position = new mp.Vector3(salons[player.getVariable('currentAutosalon')].exitPosition)
        player.dimension = player.getVariable('id') + 12;
        testvehicle.destroy();
        player.call('Autosalon_testdrive_stop::CLIENT')
    }
})

mp.events.add('Autosalon_exit::SERVER', (player) => {
    player.position = new mp.Vector3(salons[player.getVariable('currentAutosalon')].exitPosition)
    player.dimension = 0;
})

mp.events.addCommand('euac', (player, _, idcar) => {
    let vehicle = player.personalVehicles[idcar];
    let send = JSON.stringify(vehicle)
    towtruckVehicle(player, send);
})
mp.events.addCommand('lock', (player) => {
    let carsArray = player.personalVehicles;
    player.call('LockVehicle::CLIENT', [JSON.stringify(carsArray)]);
});

mp.events.add('lockCar::SERVER', (player, vehicle) => {

    let carsArray = player.personalVehicles;

        let newState = !vehicle.locked;
        vehicle.locked = newState;
        console.log(newState);
        if(newState) {
            player.call('sendToCarUved::CLIENT', [true]);
        }else{
            player.call('sendToCarUved::CLIENT', [false]);
        }
})

count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

mp.events.add('Autosalon_buyVehicle::SERVER', async (player, t, model, price, color1, color2) => {
    //if(!player.getVariable('vip'))
    if (t == 1) {
        if (player.getMoney() <= price) return;
        player.removeMoney(price)
    }
    else {
        if (player.getBankMoney() <= price) return;
        player.removeBankMoney(price)
    }

    player.call('Autosalon_vehicleBuyed::CLIENT')
    // Запрос в базу данных

    let toInv;
    let parsedItems;
    let lastItem;
    let slotTo;
    await DB.query('SELECT * FROM characters WHERE login = ?', [player.login], function (err, r) {
        if(err) return console.log(err);

        try{

        let items = r[0].items
        parsedItems = JSON.parse(items);
        
        items = parsedItems
    
        countBySlot = count(items, function (item) {
            return item.slot
        });

        if(parsedItems.length - countBySlot[0] >= 28) {
            return chat.addNotify(player, 1, `Не хватает места в инвентаре!`, 7000);
        }

        slotTo = heading.getClearSlot(parsedItems);
            
        }catch(err){
            console.log(err);
        }
})

    DB.query('INSERT INTO vehicles (login,items,model,pos,rot,parkpos,parkrot,color1,color2) VALUES(?,?,?,?,?,?,?,?,?)', [player.login, '[{}]', model, JSON.stringify(salons[player.getVariable('currentAutosalon')].testDrive), '{"x":0,"y":0,"z":0}', JSON.stringify(salons[player.getVariable('currentAutosalon')].testDrive), '{"x":0,"y":0,"z":0}', color1, color2], function (err, r) {
        if (err) return console.log(err)
    })
   
    await setTimeout(async() => {

        await DB.query('SELECT * FROM vehicles WHERE login = ?', [player.login], async function (err, r) {
            if (err) return console.log(err)
            console.log(r)
            player.personalVehicles = r;
            player.personalVehiclesCount = r.length;
    
    
            for (let i = 0; i < player.personalVehiclesCount; i++) {
                let pos = JSON.parse(player.personalVehicles[i].pos);
                let rot = JSON.parse(player.personalVehicles[i].rot);
                let color1 = JSON.parse(player.personalVehicles[i].color1);
                let color2 = JSON.parse(player.personalVehicles[i].color2);
                if(player.personalVehicles[i].model == model) {
                player.personalVehiclesList[i] = mp.vehicles.new(mp.joaat(player.personalVehicles[i].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
                    dimension: 0,
                    numberPlate: generateRandomNumberPlate(),
                    color: [color1, color2]           
                })
    
                //player.personalVehiclesList[i].setColor(player.personalVehicles[i].color1, player.personalVehicles[i].color2)
                player.personalVehiclesList[i].setVariable('id', player.personalVehicles[i].id)
                player.setVariable(`personalVehicle${i}`, player.personalVehiclesList[i])
    
    
                    let vehicle = player.getVariable(`personalVehicle${i}`);
                DB.query('UPDATE vehicles SET loaded = 1 WHERE id = ?', [vehicle.getVariable(`id`)], function (err, r) {
                    if(err) console.log(err)
                    console.log('Загружена машина ' + vehicle.getVariable(`id`))
                })

                let invTemp = {
                    slot: slotTo,
                    name: 'Ключ от машины',
                    desc: `Ключ от ${model.toUpperCase()} (${vehicle.getVariable(`id`)})`,
                    type: 'carkey',
                    carId: vehicle.getVariable(`id`),
                    weight: 0.5,
                    img: './systems/inventory/img/items/carkey.png'
                }
                
                parsedItems.push(invTemp);
                
                toInv = JSON.stringify(parsedItems);
                
                console.log(toInv);
                
                DB.query('UPDATE characters SET items = ? WHERE login = ?', [toInv, player.login], function (err, r) {
                    if (err) return console.log(err)
                })
                

              

        }
            }
        
            
        })

    }, 5000);
    
  

})

mp.events.add('playerJoined', (player) => {
    loadVehicles(player);
    player.setVariable('towtrucks', 0)
})

mp.events.addCommand('cars', (player) => {

let carsArray = player.personalVehicles;

player.call('cars_show::CLIENT', [JSON.stringify(carsArray)])

})

mp.events.addCommand('park', (player) => {

    let carsArray = player.personalVehicles;
    let rotation = player.vehicle.rotation;
    let position = player.vehicle.position;

    let nowCar;

    nowCar = carsArray.find(item => item.id === player.vehicle.getVariable('id'));

        try{
    if (player.vehicle.getVariable('id') == nowCar.id) {
        DB.query('UPDATE vehicles SET parkpos = ?, parkrot = ? WHERE id = ?', [JSON.stringify(position), JSON.stringify(rotation), player.vehicle.getVariable('id')], function (err, r) {
            return chat.addNotify(player, 1, `Вы припарковали машину.`, 7000);
        })
    }else{
        return chat.addNotify(player, 2, `Вы не владеете этой машиной`, 7000);
    }
}catch(e) {
    return chat.addNotify(player, 2, `Вы не владеете этой машиной`, 7000);
}


    })

mp.events.add('console_log', (player, obj) => {
    console.log(obj)
    console.log('from client')
})

mp.events.add('TOWTRUCK::SERVER', (player, carArray) => {
    towtruckVehicle(player, carArray);
})

mp.events.add('GPSCAR::SERVER', (player, carArray) => {
    player.call('cars_show::CLIENT', [JSON.stringify(carsArray)])
})

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



async function towtruckVehicle(player, carObject) {
    let spawnedCar
    let carObj = JSON.parse(carObject);

    if (player.getMoney() <= 100) return chat.addNotify(player, 2, `У вас недостаточно денег`, 7000);
    player.removeMoney(100)
    let vehicle = JSON.parse(carObject);

    try {
    player.personalVehiclesList[carObj.selectedId].destroy();
    //player.personalVehiclesList = player.personalVehiclesList.splice(carObj.selectedId, 1);
    }catch(e) {
        console.log(e)
    }   
    player.setVariable('towtrucks', player.getVariable('towtrucks') + 1)
    chat.addNotify(player, 1, `Вы эвакуировали машину за 100$`, 7000);

    DB.query('SELECT * FROM vehicles WHERE id = ?', [carObj.id], function (err, r) {

            let pos = JSON.parse(r[0].parkpos);
            let rot = JSON.parse(r[0].parkrot);
            let color1 = JSON.parse(r[0].color1);
            let color2 = JSON.parse(r[0].color2);

            player.personalVehiclesList[carObj.selectedId] = mp.vehicles.new(mp.joaat(r[0].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
                heading: rot.z,
                dimension: player.dimension,
                numberPlate: generateRandomNumberPlate(),
                color: [color1, color2]           
            })

            player.personalVehiclesList[carObj.selectedId].setVariable('id', player.personalVehicles[carObj.selectedId].id)
            player.setVariable(`personalVehicle${carObj.selectedId}`, player.personalVehiclesList[carObj.selectedId])

            player.personalVehiclesList[carObj.selectedId].setVariable('id', r[0].id)

            if(r[0].loaded == 0) {
            return;
        }
    
        })
        

}

async function loadVehicles(player) {
    player.personalVehiclesList = [];
    DB.query('SELECT * FROM vehicles WHERE login = ?', [player.login], function (err, r) {
        if (err) return console.log(err)
        player.personalVehicles = r;
        player.personalVehiclesCount = r.length;


        for (let i = 0; i <= player.personalVehiclesCount; i++) {
            let pos = JSON.parse(player.personalVehicles[i].pos);
            let rot = JSON.parse(player.personalVehicles[i].rot);
            let color1 = JSON.parse(player.personalVehicles[i].color1);
            let color2 = JSON.parse(player.personalVehicles[i].color2);
            if(player.personalVehicles[i].loaded == 0) {
            player.personalVehiclesList[i] = mp.vehicles.new(mp.joaat(player.personalVehicles[i].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
                heading: rot.z,
                dimension: player.dimension,
                numberPlate: generateRandomNumberPlate(),
                color: [color1, color2]           
            })

            player.personalVehiclesList[i].setColor(player.personalVehicles[i].color1, player.personalVehicles[i].color2)
            player.personalVehiclesList[i].setVariable('id', player.personalVehicles[i].id)
            player.setVariable(`personalVehicle${i}`, player.personalVehiclesList[i])


                let vehicle = player.getVariable(`personalVehicle${i}`);
            DB.query('UPDATE vehicles SET loaded = 1 WHERE id = ?', [vehicle.getVariable(`id`)], function (err, r) {
                if(err) console.log(err)
                console.log('Загружена машина ' + vehicle.getVariable(`id`))
            })
    }else{
        player.personalVehiclesList[i].setColor(player.personalVehicles[i].color1, player.personalVehicles[i].color2)
        player.personalVehiclesList[i].setVariable('id', player.personalVehicles[i].id)
        player.setVariable(`personalVehicle${i}`, player.personalVehiclesList[i])
    }
        }
    
        
    })

}

mp.events.add('playerQuit', (player) => {
        for (let i = 0; i < player.personalVehiclesCount; i++) {
            let vehicle = player.getVariable(`personalVehicle${i}`);
            DB.query('UPDATE vehicles SET loaded = 0, pos = ?, rot = ? WHERE id = ?', [JSON.stringify(player.getVariable(`personalVehicle${i}`).position), JSON.stringify(player.getVariable(`personalVehicle${i}`).rotation), vehicle.getVariable(`id`)], function (err, r) {
                if (err) return console.log(err)
                console.log('Выгружена машина ' + vehicle.getVariable(`id`))
            })
            player.getVariable(`personalVehicle${i}`).destroy();
        }
})
