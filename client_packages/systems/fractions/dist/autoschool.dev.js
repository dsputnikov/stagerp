"use strict";

var player = mp.players.local;
var drivetest = [{
  x: -634.7968139648438,
  y: -2260.137451171875,
  z: 5.931935787200928
}];
var carCheckpoint;
var curr = 0;
var DriveTestColshapes = [];

for (var i = 0; i < drivetest.length; i++) {
  var shape = mp.colshapes.newSphere(drivetest[i].x, drivetest[i].y, drivetest[i].z, 1, 0);
  DriveTestColshapes.push(shape);
}

mp.events.add('startAuto::CLIENT', function _callee(cl) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (cl == 1) {
            mp.events.callRemote('startAuto::SERVER', 1);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
mp.events.add('Autoschool_windowOpen::CLIENT', function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mp.gui.cursor.show(true, true);
          mp.game.ui.displayRadar(false);
          mp.events.call('HUD_setShow::CLIENT', false);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
mp.events.add('Autoschool_windowClose::CLIENT', function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mp.gui.cursor.show(false, false);
          mp.game.ui.displayRadar(true);
          mp.events.call('HUD_setShow::CLIENT', true);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // ----------------------------[Вход в шэйп]------------------------------\\

mp.events.add("playerEnterColshape", function (shape) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = DriveTestColshapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var colshape = _step.value;

      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          global.browser.call('Autoschool_showWindow::CEF', 2, true);
        });
        global.browser.execute("HUD.usebutton.active = true;");
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}); // ----------------------------[Выход из шэйпа]------------------------------\\

mp.events.add("playerExitColshape", function (shape) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = DriveTestColshapes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var colshape = _step2.value;

      if (shape == colshape) {
        browser.execute("HUD.usebutton.active = false;");
        mp.keys.unbind(0x45, true);
        break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}); // ----------------------------[Старт маршрута]------------------------------\\

mp.events.add('DriveTest_startRoute::CLIENT', function () {
  mp.events.callRemote('Hud_addNotify::SERVER', 1, "Начинайте движение по чекпоинтам", 3000);
  autoSCreate();
});

function autoSCreate() {
  var checkpoints;
  return regeneratorRuntime.async(function autoSCreate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          checkpoints = [{
            x: -550.5162963867188,
            y: -2196.588623046875,
            z: 5.5
          }, {
            x: -509.48150634765625,
            y: -2124.307861328125,
            z: 9.065557479858398
          }, {
            x: -588.8439331054688,
            y: -2038.987548828125,
            z: 6.274981498718262
          }, {
            x: -773.3026733398438,
            y: -1964.1556396484375,
            z: 9.092047691345215
          }, {
            x: -819.056884765625,
            y: -2011.1483154296875,
            z: 8.838269233703613
          }, {
            x: -881.334716796875,
            y: -2072.076171875,
            z: 8.20911693572998
          }, {
            x: -954.58056640625,
            y: -2157.974853515625,
            z: 8.265790939331055
          }, {
            x: -863.2446899414062,
            y: -2252.535400390625,
            z: 6.0208821296691895
          }, {
            x: -746.8334350585938,
            y: -2367.52587890625,
            z: 14.15343952178955
          }, {
            x: -714.3162841796875,
            y: -2384.85400390625,
            z: 14.069738388061523
          }, {
            x: -651.7977905273438,
            y: -2315.252197265625,
            z: 7.185215950012207
          }, {
            x: -613.6757202148438,
            y: -2273.32958984375,
            z: 5.23016881942749
          }, {
            x: -612.1859,
            y: -2241.9277,
            z: 6.1109
          }];
          _context4.next = 3;
          return regeneratorRuntime.awrap(mp.checkpoints["new"](1, {
            x: checkpoints[curr].x,
            y: checkpoints[curr].y,
            z: checkpoints[curr].z
          }, 2));

        case 3:
          carCheckpoint = _context4.sent;

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

mp.events.add('playerEnterCheckpoint', function (shape) {
  if (shape == carCheckpoint) {
    carCheckpoint.destroy();
    curr++;

    if (curr == 13) {
      curr = 0;
      return mp.events.callRemote('FinalCheckpoint::SERVER');
    }

    mp.events.callRemote('Hud_addNotify::SERVER', 1, "Успешно, двигайтесь дальше", 3000);
    autoSCreate();
  }
});