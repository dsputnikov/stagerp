let await = false;

mp.events.add('Auth_await::CLIENT', () => {
    let intr = setInterval(() => {
        if(await == true) return clearInterval(intr)
        browser.call('Auth_await::CEF');
    },50)
})

mp.events.add('Auth_showLoginDialog::CLIENT', () => {
    await = true;
    mp.gui.cursor.show(true, true);
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    showCamera(true);
    mp.events.call('HUD_setShow::CLIENT', false)
    //
    let storage = mp.storage.data;
    let saveData = storage.auth;
    if (saveData) {
        let login = saveData.login;
        let pass = saveData.pass;
        browser.execute(`
            Auth.Login.login = '${login}';
            Auth.Login.password = '${pass}';
            Auth.Login.checked = true
        `);
    }
    browser.execute(`Auth.active = true;`)
});

let camera;

function showCamera(type) {
    if (type) {
        camera = mp.cameras.new('default', new mp.Vector3(-426.575439453125, -213.47694396972656, 125.90231323242188), new mp.Vector3(0, 0, 0), 40);

        camera.pointAtCoord(-528.703857421875, -177.3805389404297, 54.787967681884766); // Changes the rotation of the camera to point towards a location
        camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }
    else if (type == false) {
        camera.destroy();
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
}

mp.events.add('Auth_hideCamera::CLIENT', () => {
    camera.destroy();
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
})

mp.events.add('Auth_playerLogin::CLIENT', (login, password, checked) => {
    mp.storage.data.auth = { checked: checked, login: login, pass: password };
    mp.storage.flush();
    //
    mp.events.callRemote('Auth_playerLogin::SERVER', login, password);
});


mp.events.add('Auth_playerRegister::CLIENT', (login, email, password) => {
    mp.events.callRemote('Auth_playerRegister::SERVER', login, email, password);
});

mp.events.add('Auth_succefully::CLIENT', () => {
    browser.execute(`Auth.active = false;`)
    showCamera(false)
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
})

mp.events.add('Auth_setState::CLIENT', (state) => {
    browser.execute(`Auth.state = ${state}`)
})

mp.events.add('Auth_showError::CLIENT', (text) => {
    browser.execute(`Auth.showError('${text}')`)
})