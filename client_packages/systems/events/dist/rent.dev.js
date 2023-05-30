"use strict";

var rent = [{
  x: -1016.85400390625,
  y: -2706.110595703125,
  z: 13.626497268676758
}];
var rentColshapes = [];

for (var i = 0; i < rent.length; i++) {
  var shape = mp.colshapes.newSphere(rent[i].x, rent[i].y, rent[i].z, 1, 0);
  rentColshapes.push(shape);
  mp.markers["new"](2, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), 0.0);
  var ped = mp.peds["new"](mp.game.joaat('a_m_y_bevhills_01'), new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809), 128.07366943359375);
  var text = mp.labels["new"]("\u0418\u0437\u0438 \u0410\u0440\u0435\u043D\u0434\u043E\u0432 (NPC)", new mp.Vector3(ped.position.x, ped.position.y, ped.position.z + 1), {
    los: false,
    font: 0,
    drawDistance: 7,
    dimension: 0
  });
  mp.blips["new"](280, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), {
    name: "\u0410\u0440\u0435\u043D\u0434\u0430 \u0422\u0421",
    color: 2,
    shortRange: true
  });
} // ----------------------------[Вход в шэйп]------------------------------\\


mp.events.add("playerEnterColshape", function (shape) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rentColshapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var colshape = _step.value;

      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          mp.events.callRemote("rentVehicle");
        });
        browser.execute("HUD.usebutton.active = true;");
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
    for (var _iterator2 = rentColshapes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
});