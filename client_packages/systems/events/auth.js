
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
    var storage = mp.storage.data;
    var saveData = storage.auth;
    if (saveData) {
        var login = saveData.login;
        var pass = saveData.pass;
        browser.execute(`
            Auth.Login.login = '${login}';
            Auth.Login.password = '${pass}';
            Auth.Login.checked = true
        `);
    }
    browser.execute(`Auth.active = true;`)
});

var camera;

function showCamera(type) {
    if (type) {
        camera = mp.cameras.new('default', new mp.Vector3(-1531.363525390, -1117.91162109, 21.6518955230), new mp.Vector3(0, 0, 0), 40);

        camera.pointAtCoord(-1645.70922851, -1129.0003662109, 22.76616477); // Changes the rotation of the camera to point towards a location
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