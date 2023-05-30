require('./systems/events/admin');
require('./systems/events/auth');
require('./systems/events/pedCreator');
require('./systems/events/charselector');
require('./systems/events/hud');
require('./systems/events/autosalon');
require('./systems/events/nametag');
require('./systems/events/inventory');
require('./systems/events/bank');
require('./systems/events/noclip');
require('./systems/events/binds');
require('./systems/events/voice');
require('./systems/events/weaponcompsync');
require('./systems/events/houses');
require('./systems/events/menu');
require('./systems/events/blips');
require('./systems/events/rent');
// 
require('./systems/utils/3dCamera');
require('./systems/utils/snake');
require('./systems/utils/noclip');
// Jobs

require('./systems/jobs/farm');
require('./systems/jobs/bus');
require('./systems/jobs/lawnmower');
require('./systems/jobs/taxi');

//
require('./luckywheel/index');
//

// autosalons
require('./systems/autosalon/auto');
//

var browser = mp.browsers.new('package://browser/index.html')

var player = mp.players.local;

//IPL
//
//

global.console_log = function (msg) {
    mp.events.callRemote('console_log', msg)
}

global.chatsend = function(msg) {
    mp.events.callRemote('Hud_chatSendMessage::SERVER',msg)
}

var VK = {
    TAB: 0x09,
    ENTER: 0x0d,
    LSHIFT: 0xA0,
    RSHIFT: 0xA1,
    LCTRL: 0xA2,
    RCTRL: 0xA3,
    ALT: 0x12,
    PAUSE: 0x13,
    CAPS: 0x14,
    ESC: 0x1b,
    SPACE: 0x20,
    PGUP: 0x21,
    PGDOWN: 0x22,
    END: 0x23,
    HOME: 0x24,
    LARROW: 0x25,
    UARROW: 0x26,
    RARROW: 0x27,
    DARROW: 0x28,
    INS: 0x2d,
    DEL: 0x2e,
    ZERO: 0x30,
    ONE: 0x31,
    TWO: 0x32,
    THREE: 0x33,
    FOUR: 0x34,
    FIVE: 0x35,
    SIX: 0x36,
    SEVEN: 0x37,
    EIGHT: 0x38,
    NINE: 0x39,
    A: 0x41,
    B: 0x42,
    C: 0x43,
    D: 0x44,
    E: 0x45,
    F: 0x46,
    G: 0x47,
    H: 0x48,
    I: 0x49,
    J: 0x4a,
    K: 0x4b,
    L: 0x4c,
    M: 0x4d,
    N: 0x4e,
    O: 0x4f,
    P: 0x50,
    Q: 0x51,
    R: 0x52,
    S: 0x53,
    T: 0x54,
    U: 0x55,
    V: 0x56,
    W: 0x57,
    X: 0x58,
    Y: 0x59,
    Z: 0x5a,
    NUM0: 0x60,
    NUM1: 0x61,
    NUM2: 0x62,
    NUM3: 0x63,
    NUM4: 0x64,
    NUM5: 0x65,
    NUM6: 0x66,
    NUM7: 0x67,
    NUM8: 0x68,
    NUM9: 0x69,
    F1: 0x70,
    F2: 0x71,
    F3: 0x72,
    F4: 0x73,
    F5: 0x74,
    F6: 0x75,
    F7: 0x76,
    F8: 0x77,
    F9: 0x78,
    F10: 0x79,
    F11: 0x7a,
    F12: 0x7b,
};

let CPED_CONFIG_FLAG_DisableStartEngine = 429;
player.setConfigFlag(CPED_CONFIG_FLAG_DisableStartEngine, true);

function securityBelt()
{
    console_log(player.isInAnyVehicle());
    if (player.isInAnyVehicle()) {
        
        if(player.getConfigFlag(32) == false) {
            player.setConfigFlag(32, true);
        mp.events.callRemote('Hud_addNotify::SERVER',3,"Вы отстегнули ремень безопасности",7000)
        }else{
            player.setConfigFlag(32, false);
        mp.events.callRemote('Hud_addNotify::SERVER',1,"Вы пристегнули ремень безопасности",7000)
        }
        }
}
mp.keys.bind(0x4A, true, function () { // J key
    console_log(player.isInAnyVehicle())
    securityBelt();
})

function controlEngineState()
{
    let currentVehicle = player.vehicle;
    currentVehicle.setEngineOn(!currentVehicle.getIsEngineRunning(), false, false);
    console_log(!currentVehicle.getIsEngineRunning())
}
mp.keys.bind(0xA2, false, function () { // ctrl key
    controlEngineState();
})


mp.events.add('console_cef', (msg) => {
    console_log(msg)
})

mp.events.add("cef:error", (errorMessage, url, line) => {
    mp.console.logError(`Ошибка: ${errorMessage} в ${url} на строчке ${line.toString()}`);
});

const colour = { r: 44, g: 128, b: 239 }; // set this to the colour you want
const serverName = 'Stage Test'; // set this to the pause menu title you want

mp.events.add('playerReady', () => {
    mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); // Replace Michael colour
    mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255); // Replace freemode colour
    mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});


function isVehicleAccessAP(a) {
    return -1 === [156252959, 3277054437].indexOf(a.model) //белый список, указывать цифры из чата через запятую
}

function setSpeed() {
    if(player.getVariable('carspeedX') == 1) {
    if(player.getVariable('adminlvl') > 6) {
        let vehicle = mp.players.local.vehicle
        let speed = vehicle.getSpeed();
        vehicle.setForwardSpeed(speed + 20);
    }else{
    return;
    }
}else{
    return
}
}

mp.keys.bind(0x58, false, function () { // ALT key
    setSpeed()
})

var autopilotStart = !1,
    autopilotPoint = null,
    autopilotInterval = null;
const autoPilotSpeed = 35;

mp.keys.bind(0x58, false, function () { // X key
    if(chatOpened == true) return;
    const a = player.vehicle;
    if (player.vehicle.getPedInSeat(-1) !== player.handle) return; //Проверка, водителю доступно другим нет
    if (autopilotStart) {
        const a = player.vehicle;
        return a && (player.clearTasks(), player.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotPoint = null, autopilotStart = !1, void clearInterval(autopilotInterval)
    }
    if (null == a) return;

    // var vehicleName = a.getModel();
    // console_log(`vehname: ${vehicleName}`); //Номер модели в чат что бы узнать какой он  ив писать в белый список(отключи меня после завершения настройки)

    if (isVehicleAccessAP(a)) return; //отказ автопилота абоба

    var engine = a.getIsEngineRunning();
    if (engine == false) return mp.game.graphics.notify('Двигатель не заведен.');  //проверка двигателя

    let b = mp.game.invoke("0x1DD1F58F493F1DA5"),
        c = mp.game.invoke("0x186E5D252FA50E7D"),
        d = mp.game.invoke("0x1BEDE233E6CD2A1F", c),
        e = mp.game.invoke("0x14F96AA50D6FBEA7", c);

    for (let a = d; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", a); a = e)
        if (4 == mp.game.invoke("0xBE9B0959FFD0779B", a) && !!b) {
            autopilotPoint = mp.game.ui.getBlipInfoIdCoord(a);
            break
        }
    return null == autopilotPoint ? void Я : void (!autopilotStart && (mp.events.callRemote('Hud_addNotify::SERVER',1,"Точка указана, маршрут построен, начинаем движение",7000), player.taskVehicleDriveToCoord(a.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, 2883621, 30, 1), autopilotStart = !0, clearInterval(autopilotInterval), autopilotInterval = setInterval(() => {
        if (!autopilotStart) return void clearInterval(autopilotInterval);
        const a = player.vehicle;
        return a ? 15 > mp.game.system.vdist(player.position.x, player.position.y, player.position.z, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z) ? (player.clearTasks(), a && player.taskVehicleTempAction(a.handle, 27, 1e4), autopilotPoint = null, autopilotStart = !1, clearInterval(autopilotInterval), void mp.events.callRemote('Hud_addNotify::SERVER',1,"Вы достигли места назначения",7000)) : void 0 : (a && (player.clearTasks(), player.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotStart = !1, void clearInterval(autopilotInterval))
    }, 300)))
});