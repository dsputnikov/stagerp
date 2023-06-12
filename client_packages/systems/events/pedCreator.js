
var tempData = {};
const browser = mp.browsers.new('package://browser/index.html');
const player = mp.players.local;

mp.events.add('pedCreator_start::CLIENT', () => {
    browser.call('pedCreator_show::CEF')
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call('HUD_setShow::CLIENT', false)
    mp.events.call('Utils_3dcamera::CLIENT', 1976.890869140625, 3820.33203125, 33.45004653930664, 0, 0, 285.854, 40)
})

mp.events.add('pedCreator_updateData', (data, t) => {
    tempData = JSON.parse(data);
    if (t == 'gender') {
        updateCharacter(1);
        return;
    }

    updateCharacter();
})

mp.events.add('pedCreator_finishSync::CLIENT', (data) => {
    browser.execute(`pedCreator.active = false;`)
    mp.events.call('Utils_delcamera::CLIENT')
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
    mp.events.callRemote('pedCreator_finishSync::SERVER', data)
})

mp.events.add('pedCreator_update::CLIENT', updateCharacter)

function updateCharacter(t) {
    let _faceMix = parseFloat(tempData.faceMix / 100);
    let _skinMix = parseFloat(tempData.skinMix / 100);

    if (t == 1) {
        let model = (tempData.gender === 0) ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
        mp.events.callRemote('pedCreator_updateServer::SERVER', model)
        return;
    }



    //Наследственость
    player.setHeadBlendData(
        parseInt(tempData.father),
        parseInt(tempData.mother),
        0,
        parseInt(tempData.father),
        parseInt(tempData.mother),
        0,
        parseFloat(_faceMix),
        parseFloat(_skinMix),
        0,
        false
    );


    for (let i = 0; i < tempData.structure.length; i++) {
        const value = tempData.structure[i];
        player.setFaceFeature(i, parseFloat(value));
    }

    // // Брови
    player.setHeadOverlay(2, tempData.hair[0], 1, 1, 1);

    // // Глаза
    player.setEyeColor(tempData.hair[1]);

    // // Причёска
    player.setComponentVariation(2, tempData.hair[2], 0, 0);

    // Волосы на лице
    player.setHeadOverlay(1, tempData.hair[3], 1, 1, 1);

    // Одежда
    player.setPropIndex(0, tempData.clothes[0], 0, true); // Головной убор
    player.setPropIndex(1, tempData.clothes[5], 0, true); // очки
    player.setComponentVariation(11, tempData.clothes[1], 0, 0); // Верх
    player.setComponentVariation(8, tempData.clothes[2], 0, 0); // Низ
    player.setComponentVariation(4, tempData.clothes[3], 0, 0); // Штаны
    player.setComponentVariation(6, tempData.clothes[4], 0, 0); // Капцы
}
