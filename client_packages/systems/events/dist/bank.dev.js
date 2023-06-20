"use strict";

var bankomats = [{
  x: -1305.3438720703125,
  y: -706.3187255859375,
  z: 25.32242774963379
}, {
  x: -1205.681640625,
  y: -324.8963623046875,
  z: 37.857421875
}, {
  x: -1204.8994140625,
  y: -326.327880859375,
  z: 37.83354568481445
}, {
  x: -866.6430053710938,
  y: -187.72259521484375,
  z: 37.8427848815918
}, {
  x: -867.5221557617188,
  y: -186.2918701171875,
  z: 37.84467697143555
}, {
  x: -846.2445678710938,
  y: -341.18218994140625,
  z: 38.68026351928711
}, {
  x: -846.76025390625,
  y: -340.21270751953125,
  z: 38.68026351928711
}, {
  x: 147.6531982421875,
  z: -1035.73583984375,
  y: 29.34305763244629
}, {
  x: 145.88894653320312,
  z: -1035.169677734375,
  y: 29.344951629638672
}, {
  x: 1172.483642578125,
  y: 2702.495849609375,
  z: 38.174739837646484
}, {
  x: 1171.567138671875,
  y: 2702.574951171875,
  z: 38.175411224365234
}, {
  x: 147.62359619140625,
  y: -1035.6968994140625,
  z: 29.343090057373047
}, {
  x: 146.02816772460938,
  y: -1035.19873046875,
  z: 29.34479522705078
}, {
  x: -258.81695556640625,
  y: -723.5110473632812,
  z: 33.464866638183594
}, {
  x: -256.1260986328125,
  y: -715.993408203125,
  z: 33.518409729003906
}, {
  x: -254.41720581054688,
  y: -692.4664306640625,
  z: 33.60850524902344
}, {
  x: -31.43372917175293,
  y: -1659.7666015625,
  z: 29.479026794433594
}, {
  x: -2958.9248046875,
  y: 487.8179626464844,
  z: 15.463052749633789
}, {
  x: -2956.854248046875,
  y: 487.64642333984375,
  z: 15.463908195495605
}];
var banks = [{
  x: -1212.7232666015625,
  y: -330.75653076171875,
  z: 37.7869758605957
}, {
  x: 149.95985412597656,
  y: -1040.7581787109375,
  z: 29.374101638793945
}, {
  x: 314.1934814453125,
  y: -279.1059265136719,
  z: 54.17079162597656
}, {
  x: -350.8688049316406,
  y: -49.867919921875,
  z: 49.041690826416016
}, {
  x: 1175.0379638671875,
  y: 2706.901611328125,
  z: 38.09407424926758
}, {
  x: -2962.474365234375,
  y: 482.9751892089844,
  z: 15.703112602233887
}];
var bankomatsColshapes = [];
var bankColshapes = [];

for (var i = 0; i < bankomats.length; i++) {
  var shape = mp.colshapes.newSphere(bankomats[i].x, bankomats[i].y, bankomats[i].z, 1, 0);
  bankomatsColshapes.push(shape); // mp.markers.new(2, new mp.Vector3(bankomats[i].x, bankomats[i].y, bankomats[i].z), 0.5)

  mp.blips["new"](500, new mp.Vector3(bankomats[i].x, bankomats[i].y, bankomats[i].z), {
    name: "\u0411\u0430\u043D\u043A\u043E\u043C\u0430\u0442",
    color: 2,
    shortRange: true,
    scale: 0.9
  });
}

for (var _i = 0; _i < banks.length; _i++) {
  var _shape = mp.colshapes.newSphere(banks[_i].x, banks[_i].y, banks[_i].z, 1, 0);

  bankColshapes.push(_shape);
  mp.markers["new"](2, new mp.Vector3(banks[_i].x, banks[_i].y, banks[_i].z), 0.5);
  mp.blips["new"](108, new mp.Vector3(banks[_i].x, banks[_i].y, banks[_i].z), {
    name: "\u0411\u0430\u043D\u043A",
    color: 2,
    shortRange: true,
    scale: 0.9
  });
} // ----------------------------[Вход в шэйп]------------------------------\\


mp.events.add("playerEnterColshape", function (shape) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = bankomatsColshapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var colshape = _step.value;

      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          mp.events.callRemote("Bank_openBankomat::SERVER");
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = bankColshapes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _colshape = _step2.value;

      if (shape == _colshape) {
        // mp.events.call('Binds_bindE::CLIENT',false,'Bank_openWindow::SERVER')
        mp.keys.bind(0x45, true, function () {
          mp.events.callRemote("Bank_openWindow::SERVER");
        });
        browser.execute("HUD.usebutton.active = true;");
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
}); // ----------------------------[Выход из шэйпа]------------------------------\\

mp.events.add("playerExitColshape", function (shape) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = bankomatsColshapes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var colshape = _step3.value;

      if (shape == colshape) {
        browser.execute("HUD.usebutton.active = false;");
        mp.keys.unbind(0x45, true);
        break;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = bankColshapes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _colshape2 = _step4.value;

      if (shape == _colshape2) {
        browser.execute("HUD.usebutton.active = false;");
        mp.keys.unbind(0x45, true);
        break;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}); // ----------------------------[Открытие банковского окна]------------------------------\\

mp.events.add("Bank_openWindow::CLIENT", function (bank) {
  browser.execute("Bank.active = true");
  browser.execute("Bank.open = true");
  browser.execute("Bank.modal.active = false");
  browser.execute("Bank.isAccount = ".concat(bank)); // mp.events.callRemote('playScenario')

  mp.gui.cursor.show(true, true);
  mp.game.ui.displayRadar(false);
  mp.events.call("HUD_setShow::CLIENT", false);
}); // ----------------------------[Открытие банкомата]------------------------------\\

mp.events.add("Bank_openBankomat::CLIENT", function (account, balance, money) {
  browser.execute("bankomat.active = true");
  browser.execute("bankomat.open = true");
  browser.execute("bankomat.modal.active = false");
  browser.execute("bankomat.playername = '".concat(player.name, "'"));
  browser.execute("bankomat.playermoney = ".concat(money));
  browser.execute("bankomat.account = ".concat(account));
  browser.execute("bankomat.balance = ".concat(balance)); // mp.events.callRemote('playScenario')

  mp.gui.cursor.show(true, true);
  mp.game.ui.displayRadar(false);
  mp.events.call("HUD_setShow::CLIENT", false);
}); // ----------------------------[Создание аккаунта в банке]------------------------------\\

mp.events.add("Bank_createBankAccount::CLIENT", function (number) {
  mp.events.callRemote("Bank_createBankAccount::SERVER", number);
}); // ----------------------------[А]------------------------------\\

mp.events.add("Bank_updateWindow::CLIENT", function (account, money, operations) {
  var m = formatNumber(money);
  browser.call("Bank_updateInfo::CEF", account, m, operations);
}); // Модальное действие

mp.events.add("Bank_modalActions::CLIENT", function (type, input, input2) {
  mp.game.audio.playSound(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true, 0, true);
  mp.events.callRemote("Bank_modalActions::SERVER", type, input, input2);
}); // Модальное действие

mp.events.add("Bank_bankomatmodalActions::CLIENT", function (type, input, input2) {
  mp.game.audio.playSound(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true, 0, true);
  mp.events.callRemote("Bank_bankomatmodalActions::SERVER", type, input, input2);
}); // Закрытие окна банка

mp.events.add("Bank_closeBank::CLIENT", function () {
  browser.execute("Bank.active = false");
  browser.execute("bankomat.active = false");
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call("HUD_setShow::CLIENT", true); // mp.events.callRemote('stopScenario')
});
mp.events.add("Bank_showError::CLIENT", function (text) {
  browser.execute("Bank.showError('".concat(text, "')"));
}); // Банкоматы

mp.events.add("Bank_closeBankomat::CLIENT", function () {
  browser.execute("bankomat.active = false");
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
  mp.events.call("HUD_setShow::CLIENT", true);
  mp.events.callRemote("stopScenario");
});

function formatNumber(x) {
  if (x == null) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}