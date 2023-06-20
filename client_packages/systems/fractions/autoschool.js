const player = mp.players.local;


let drivetest = [
    { x: -634.7968139648438, y: -2260.137451171875, z: 5.931935787200928 },
]

let carCheckpoint;
let curr = 0;

let DriveTestColshapes = [];

for (let i = 0; i < drivetest.length; i++) {
    let shape = mp.colshapes.newSphere(drivetest[i].x, drivetest[i].y, drivetest[i].z, 1, 0);
    DriveTestColshapes.push(shape);
}

mp.events.add('startAuto::CLIENT', async (cl) => {

  if(cl == 1) {
    mp.events.callRemote('startAuto::SERVER', 1)
  }

})

mp.events.add('Autoschool_windowOpen::CLIENT', async () => {
mp.gui.cursor.show(true, true);
mp.game.ui.displayRadar(false);
mp.events.call('HUD_setShow::CLIENT', false)
})

mp.events.add('Autoschool_windowClose::CLIENT', async () => {
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call('HUD_setShow::CLIENT', true)
  })
  
  // ----------------------------[Вход в шэйп]------------------------------\\

  mp.events.add("playerEnterColshape", (shape) => {
    for (let colshape of DriveTestColshapes) {
      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          global.browser.call('Autoschool_showWindow::CEF', 2, true);
        });
        global.browser.execute("HUD.usebutton.active = true;");
        break;
      }
    }
  });

  // ----------------------------[Выход из шэйпа]------------------------------\\

mp.events.add("playerExitColshape", (shape) => {
    for (let colshape of DriveTestColshapes) {
      if (shape == colshape) {
        browser.execute("HUD.usebutton.active = false;");
        mp.keys.unbind(0x45, true);
        break;
      }
    }
  });

  // ----------------------------[Старт маршрута]------------------------------\\

  mp.events.add('DriveTest_startRoute::CLIENT', () => {
    mp.events.callRemote('Hud_addNotify::SERVER',1,"Начинайте движение по чекпоинтам",3000);
    autoSCreate();
  })


async function autoSCreate() {
    const checkpoints = [
        { x: -550.5162963867188, y: -2196.588623046875, z: 5.5 },
        { x: -509.48150634765625, y: -2124.307861328125, z: 9.065557479858398 },
        { x: -588.8439331054688, y: -2038.987548828125, z: 6.274981498718262 },
        { x: -773.3026733398438, y: -1964.1556396484375, z: 9.092047691345215 },
        { x: -819.056884765625, y: -2011.1483154296875, z: 8.838269233703613 },
        { x: -881.334716796875, y: -2072.076171875, z: 8.20911693572998 },
        { x: -954.58056640625, y: -2157.974853515625, z: 8.265790939331055 },
        { x: -863.2446899414062, y: -2252.535400390625, z: 6.0208821296691895 },
        { x: -746.8334350585938, y: -2367.52587890625, z: 14.15343952178955 },
        { x: -714.3162841796875, y: -2384.85400390625, z: 14.069738388061523 },
        { x: -651.7977905273438, y: -2315.252197265625, z: 7.185215950012207 },
        { x: -613.6757202148438, y: -2273.32958984375, z: 5.23016881942749 },
        { x: -612.1859, y: -2241.9277, z: 6.1109 },
        ]
        
    carCheckpoint = await mp.checkpoints.new(1, {x: checkpoints[curr].x, y: checkpoints[curr].y, z: checkpoints[curr].z}, 2);

  }

  mp.events.add('playerEnterCheckpoint', (shape) => {
    if (shape == carCheckpoint) {
        carCheckpoint.destroy();
        curr++;
        if(curr == 13) {
          curr = 0;
          return mp.events.callRemote('FinalCheckpoint::SERVER')
        }
        mp.events.callRemote('Hud_addNotify::SERVER',1,"Успешно, двигайтесь дальше",3000);
        autoSCreate();
    }
})