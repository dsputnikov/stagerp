
let chat = require('./hud');
let methods = require('../modules/methods');

function pointingAt(distance) {
    const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera

    let position = camera.getCoord(); // grab the position of the gameplay camera as Vector3

    let direction = camera.getDirection(); // get the forwarding vector of the direction you aim with the gameplay camera as Vector3

    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z)); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)

    let result = mp.raycasting.testPointToPoint(position, farAway, null, 17); // now test point to point - intersects with map and objects [1 + 16]

    return result; // and return the result ( undefined, if no hit )
}

mp.events.addCommand('veh', (player, _, id, veh, color1, color2) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == undefined || veh == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [id] [Vehicle] [Color1] [Color2]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    var cVeh = player.getVariable('AdminVeh' + player.id)
    if (cVeh != null) {
        cVeh.destroy();
    }
    let pos;
    pos = target.position;
    var AdminVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
    AdminVeh.setColor(parseInt(color1), parseInt(color2));
    player.setVariable('AdminVeh' + player.id, AdminVeh);
    target.putIntoVehicle(AdminVeh, 0)
})

mp.events.addCommand('veh2', (player, _, id, veh, color1, color2) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == undefined || veh == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [id] [Vehicle] [Color1] [Color2]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    let pos;
    pos = target.position;
    var AdminVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
    AdminVeh.setColor(parseInt(color1), parseInt(color2));
    target.putIntoVehicle(AdminVeh, 0)
})

mp.events.addCommand('setspeed', (player) => {
    if(player.getVariable('adminlvl') < 5) return;
    if(player.getVariable('carspeedX') == 1) {
        player.setVariable('carspeedX', 0);
        chat.addNotify(player,1,`Вы выключили спидхак`,7000)
        chat.addNotify(player,3,`Для включения спидхака введите "/setspeed"`,7000)
    }else{
    player.setVariable('carspeedX', 1);
    chat.addNotify(player,1,`Вы включили спидхак, нажимайте "X" Когда хотите подрубить спидхак`,7000)
    chat.addNotify(player,3,`Для выключения спидхака введите "/setspeed"`,7000)
    }
})

mp.events.addCommand('pos', (player) => {
    if(player.getVariable('adminlvl') < 1) return;
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Кординаты выведены в консоль')
    console.log(`${player.position.x}, ${player.position.y}, ${player.position.z}, ${player.heading}`)
})

mp.events.addCommand('posx', (player) => {
    if(player.getVariable('adminlvl') < 1) return;
    chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Кординаты выведены в консоль')
    if (player.vehicle) {
        console.log(`{x: ${player.vehicle.position.x}, y: ${player.vehicle.position.y}, z: ${player.vehicle.position.z}, heading: ${player.vehicle.heading}},`)
    }
    else {
        console.log(`{x: ${player.position.x}, y: ${player.position.y}, z: ${player.position.z}},`)
    }
})

mp.events.addCommand('tppos', (player, _, x, y, z) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (x == undefined || y == undefined || z == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tppos x y z');
    player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
    console.log(`${parseFloat(x)} ${parseFloat(y)} ${parseFloat(z)}`)
})

mp.events.addCommand('fixveh', (player) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000)
    player.vehicle.repair();
})

mp.events.addCommand('tp', (player, id) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tp [id]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    player.position = target.position;
})

mp.events.addCommand('ipl', (player, id) => {
    if(player.getVariable('adminlvl') < 5) return;
    if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /ipl [id]');   
    mp.world.requestIpl(id);
})

mp.events.addCommand('tph', (player, id) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [id] [Vehicle] [Color1] [Color2]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.position = player.position;
})

mp.events.addCommand('givemoney', (player, _, id, amount) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == null || amount == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givemoney [id] [count]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    if (isNaN(amount)) return chat.addNotify(player, 2, 'Некоректная сумма', 7000)
    target.giveMoney(amount)
    chat.send(target, `!{#BAFE2A}[Информация] !{#FFFFFF}Администратор ${player.name} выдал вам $${amount}!`)
})

mp.events.addCommand('removemoney', (player, _, id, amount) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == null || amount == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /removemoney [id] [count]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    if (isNaN(amount)) return chat.addNotify(player, 2, 'Некоректная сумма', 7000)
    target.removeMoney(amount)
    chat.send(target, `!{#BAFE2A}[Информация] !{#FFFFFF}Администратор ${player.name} забрал $${amount}!`)
})

mp.events.addCommand('o', (player, args) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (args == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /o [Текст]')
    chat.sendAll(`!{#8B0000}Администратор ${player.name}: ${args}`)
})


mp.events.addCommand('givegun', (player, _, id, gun, ammo) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (id == null || gun == null || ammo == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givegun [id] [gun] [ammo]');
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.giveWeapon(mp.joaat(`weapon_${gun}`), parseInt(ammo))
})

mp.events.addCommand('setclothes', (player, _, c, id,c1,c2) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (c == undefined || id == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setclothes [comp] [id]')
    player.setClothes(parseInt(c), parseInt(id), parseInt(c1), parseInt(c2));
})

mp.events.addCommand('setmod', (player, _, modType, modIndex) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000)
    player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
});

mp.events.addCommand('setseat', (player, seat) => {
    if(player.getVariable('adminlvl') < 1) return;
    if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000)
    player.call('xdddd',[player.vehicle,seat])
})

mp.events.addCommand('a',(player,text) => {
    mp.players.forEach(_player => {
        if(_player.getVariable('adminlvl') > 1) {
            chat.send(_player,`Администратор ${text}`)
        }
    })
})
