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
        browser.execute("HUD.usebutton.active = true;");
      }
      if(shape == exitAuto) {
        mp.keys.bind(0x45, true, function () {
        autoShowWindow();
        });
        browser.execute("HUD.usebutton.active = true;");
      }

      if (shape == enterAutosred) {
        mp.keys.bind(0x45, true, function () {
        sredJoin();
        });
        browser.execute("HUD.usebutton.active = true;");
      }
      if(shape == exitAutosred) {
        mp.keys.bind(0x45, true, function () {
        sredExit();
        });
        browser.execute("HUD.usebutton.active = true;");
      }

    })

    mp.events.add("playerExitColshape", (shape) => {
        if (shape == exitAuto) {
          browser.execute("HUD.usebutton.active = false;");
          mp.keys.unbind(0x45, true);
        }
        if (shape == enterAuto) {
            browser.execute("HUD.usebutton.active = false;");
            mp.keys.unbind(0x45, true);
        }

        if (shape == exitAutosred) {
            browser.execute("HUD.usebutton.active = false;");
            mp.keys.unbind(0x45, true);
          }
          if (shape == enterAutosred) {
              browser.execute("HUD.usebutton.active = false;");
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

    browser.execute("Auto.active = false");
    browser.execute("Auto.open = false");
    browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);

  });

    
  mp.events.add("AutoLuxeOut::CLIENT", () => {
    mp.events.callRemote("carLuxeTPExit::SERVER");

    browser.execute("Auto.active = false");
    browser.execute("Auto.open = false");
    browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);

  });

function autoShowWindow() {
    browser.execute("Auto.active = true");
    browser.execute("Auto.open = true");
    browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call("HUD_setShow::CLIENT", false);
}

function autounShowWindow() {
    browser.execute("Auto.active = false");
    browser.execute("Auto.open = false");
    browser.execute("Auto.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);
}

function autoShowWindowExit() {
    browser.execute("Autounshow.active = true");
    browser.execute("Autounshow.open = true");
    //browser.execute("Autounshow.modal.active = false");
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call("HUD_setShow::CLIENT", false);
}

function autounShowWindowExit() {
    browser.execute("Autounshow.active = false");
    browser.execute("Autounshow.open = false");
    browser.execute("Autounshow.modal.active = false");
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call("HUD_setShow::CLIENT", true);
}
