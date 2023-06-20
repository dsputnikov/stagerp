let chat = require('../events/basic/hud');
let methods = require('../modules/methods');

global.fractions = [
    'Нету', // 0
    'Vagos', // 1
    'Ballas', // 2
    'Families', // 3
    'Ballas', // 4
    'LSPD', // 5
    'EMS', // 6
    'News', // 7
    'Taxi', // 8
];

mp.events.addCommand('setfraction', (player, _, id, fractionId, rankId) => {
        if (player.getVariable('adminlvl') < 9) return;
            if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setfraction [id] [id фракции] [ранг]');

        let target = methods.getById(id);
            if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);

    let fractionName = fractions[fractionId];
    chat.addNotify(player, 1, `Ваша фракция: ${fractionName}, ранг ${rankId}`, 4000);

    DB.query('UPDATE characters SET fraction = ?, fraction_rank = ? WHERE id = ?', [fractionId, rankId, target.getVariable('id')], function(err, result) {
        if (err) return console.error(err);
        console.log('Значение fractionId успешно сохранено в базе данных');
    }); 
});

mp.events.addCommand('setleader', (player, _, id, fractionId) => {
        if (player.getVariable('adminlvl') < 9) return;
            if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setleader [id] [id фракции]');
    let target = methods.getById(id);
        if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);

    let fractionName = fractions[fractionId];
     chat.addNotify(player, 1, `Ваша фракция: ${fractionName}`, 4000);

    DB.query('UPDATE characters SET fraction = ? WHERE id = ?', [fractionId, target.getVariable('id')], function(err, result) {
        if (err) return console.error(err);
        console.log('Значение fractionId успешно сохранено в базе данных');
    });    
});

mp.events.addCommand('ffff', (player, _, id) => {
    let target = methods.getById(id);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
    DB.query('SELECT fraction FROM characters WHERE id = ?', [target.getVariable('id')], function(err, rows) {
        const fraction_Id = rows[0].fraction;
        fractionName = fractions[fraction_Id];
        chat.addNotify(player, 1, `Ваша фракция: ${fractionName}`, 4000); 
    })
})


