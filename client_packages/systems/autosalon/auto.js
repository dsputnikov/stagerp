let windowOpened = false;

let enterAuto = mp.colshapes.newSphere(-803.830810546875, -224.1153564453125, 37.22683334350586, 1)
let exitAuto = mp.colshapes.newSphere(-801.3224487304688, -222.78689575195312, 37.07965850830078, 1)

let enterAutosred = mp.colshapes.newSphere(-44.13488006591797, -1660.9564208984375, 29.28295135498047, 1)
let exitAutosred = mp.colshapes.newSphere(-41.82459259033203, -1663.365966796875, 29.4867000579834, 1)
  
//

  mp.events.add("playerEnterColshape", (shape) => {
      if (shape == enterAuto) {
        mp.keys.bind(0x45, true, function () {
        autoShowWindow();
        });
        global.browser.execute("HUD.usebutton.active = true;");
      }
      if(shape == exitAuto) {
        mp.keys.bind(0x45, true, function () {
        autoShowWindow();
        });
        global.browser.execute("HUD.usebutton.active = true;");
      }

      if (shape == enterAutosred) {
        mp.keys.bind(0x45, true, function () {
        sredJoin();
        });
        global.browser.execute("HUD.usebutton.active = true;");
      }
      if(shape == exitAutosred) {
        mp.keys.bind(0x45, true, function () {
        sredExit();
        });
        global.browser.execute("HUD.usebutton.active = true;");
      }

    })

    mp.events.add("playerExitColshape", (shape) => {
        if (shape == exitAuto) {
          global.browser.execute("HUD.usebutton.active = false;");
          mp.keys.unbind(0x45, true);
        }
        if (shape == enterAuto) {
          global.browser.execute("HUD.usebutton.active = false;");
            mp.keys.unbind(0x45, true);
        }

        if (shape == exitAutosred) {
          global.browser.execute("HUD.usebutton.active = false;");
            mp.keys.unbind(0x45, true);
          }
          if (shape == enterAutosred) {
            global.browser.execute("HUD.usebutton.active = false;");
              mp.keys.unbind(0x45, true);
          }

    });
    
    function sredJoin() {
        mp.events.callRemote("carSredTPJoin::SERVER");
    }

    function sredExit() {
        mp.events.callRemote("carSredTPExit::SERVER");
    }
  
  mp.events.add("AutoLuxeIn::CLIENT", () => {
    mp.events.callRemote("carLuxeTPJoin::SERVER");

    global.browser.execute("Auto.active = false");
    global.browser.execute("Auto.open = false");
    global.browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);

  });

    
  mp.events.add("AutoLuxeOut::CLIENT", () => {
    mp.events.callRemote("carLuxeTPExit::SERVER");

    global.browser.execute("Auto.active = false");
    global.browser.execute("Auto.open = false");
    global.browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);

  });

function autoShowWindow() {
  global.browser.execute("Auto.active = true");
  global.browser.execute("Auto.open = true");
  global.browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call("HUD_setShow::CLIENT", false);
}

function autounShowWindow() {
  global.browser.execute("Auto.active = false");
  global.browser.execute("Auto.open = false");
  global.browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);
}

function autoShowWindowExit() {
  global.browser.execute("Autounshow.active = true");
  global.browser.execute("Autounshow.open = true");
    //browser.execute("Autounshow.modal.active = false");
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call("HUD_setShow::CLIENT", false);
}

function autounShowWindowExit() {
  global.browser.execute("Autounshow.active = false");
  global.browser.execute("Autounshow.open = false");
  global.browser.execute("Autounshow.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);
}
