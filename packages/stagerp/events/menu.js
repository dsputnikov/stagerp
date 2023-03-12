
mp.events.add('Menu_openWindow::SERVER', async (player) => {
    let gender = (player.gender == 0) ? 'Мужской' : 'Женский';
    player.pesronalPropety = []
    await DB.query("SELECT * FROM houses WHERE ownerScId = ?", [player.getVariable('id')], (err, r) => {
        if (err) return console.error(err);
        if (r[0]) {
            for (let i = 0; i < r.length; i++) {
                player.pesronalPropety.push({ type: 'house', id: r[i].id });
            }
            player.call('Menu_updateProperty::CLIENT',[JSON.stringify(player.pesronalPropety)])
        }
    })
    await DB.query("SELECT * FROM vehicles WHERE login = ?", [player.login], (err, r) => {
        if (err) return console.error(err);
        if (r[0]) {
            for (let i = 0; i < r.length; i++) {
                player.pesronalPropety.push({ type: 'vehicle', id: r[i].id });
            }
            player.call('Menu_updateProperty::CLIENT',[JSON.stringify(player.pesronalPropety)])
        }
    })
    await player.call('Menu_openWindow::CLIENT', [player.name, gender, player.getVariable('id'), player.level, player.getMoney(), player.getBankMoney()])
})


mp.events.addCommand('menaen', async (player) => {

    let gender = (player.gender == 0) ? 'Мужской' : 'Женский';
    player.pesronalPropety = []
    await DB.query("SELECT * FROM houses WHERE ownerScId = ?", [player.getVariable('id')], (err, r) => {
        if (err) return console.error(err);
        if (r[0]) {
            for (let i = 0; i < r.length; i++) {
                player.pesronalPropety.push({ type: 'house', id: r[i].id });
            }
            player.call('Menu_updateProperty::CLIENT',[JSON.stringify(player.pesronalPropety)])
        }
    })
    await DB.query("SELECT * FROM vehicles WHERE login = ?", [player.login], (err, r) => {
        if (err) return console.error(err);
        if (r[0]) {
            for (let i = 0; i < r.length; i++) {
                player.pesronalPropety.push({ type: 'vehicle', id: r[i].id });
            }
            player.call('Menu_updateProperty::CLIENT',[JSON.stringify(player.pesronalPropety)])
        }
    })
    await player.call('Menu_openWindow::CLIENT', [player.name, gender, player.getVariable('id'), player.level, player.getMoney(), player.getBankMoney()])

})