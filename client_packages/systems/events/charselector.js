mp.events.add('Charselector_showSelector::CLIENT', (data) => {
    global.browser.call('Charselector_showSelector::CEF', true, data)
    global.browser.execute(`CharSelector.load('${data}')`);
    global.browser.execute(`CharSelector.active = true`);
    mp.gui.cursor.show(false, false);
})

mp.events.add('Charselector_selectCharacter::CLIENT', (data) => {
    let _data = JSON.parse(data);
    global.browser.execute(`CharSelector.active = false`);
    mp.events.call('Auth_hideCamera::CLIENT')
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT',true)
    //
    mp.events.callRemote('Charselector_selectCharacter::SERVER', JSON.stringify(_data))
})

mp.events.add('Charselector_createCharacter::CLIENT', () => {
    mp.events.call('Auth_hideCamera::CLIENT')
    global.browser.execute(`CharSelector.active = false`);
    mp.gui.cursor.show(true, true);
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.events.call('HUD_setShow::CLIENT',false)
    //
    mp.events.callRemote('Charselector_createCharacter::SERVER')
})