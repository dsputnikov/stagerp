"use strict";

var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local;
var drivetest = [{
  x: -634.7968139648438,
  y: -2260.137451171875,
  z: 5.931935787200928
}];
var autoSchool = false;
var DriveTestColshapes = [];

for (var i = 0; i < drivetest.length; i++) {
  var shape = mp.colshapes.newSphere(drivetest[i].x, drivetest[i].y, drivetest[i].z, 1, 0);
  DriveTestColshapes.push(shape);
} // ----------------------------[Вход в шэйп]------------------------------\\


mp.events.add("playerEnterColshape", function (shape) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = DriveTestColshapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var colshape = _step.value;

      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          mp.events.callRemote("DrivingTest");
          browser.call('Autoschool_showWindow::CEF', 2, true);
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
  AutoSchool = true;
});
var AutoSchool = {
  ways: [[{
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
  }]],
  AutoSchoolColshape: null,
  AutoSchoolCheckpoint: null,
  AutoSchoolBlip: null,
  markerType: null,
  earn: null,
  idx: 0,
  isStop: false,
  SchoolWay: function SchoolWay(type) {
    var points = this.ways;
    var point = this.idx;
    var nextRoute = points[type][point + 1];

    if (nextRoute == null || nextRoute == undefined) {
      this.AutoSchoolCheckpoint = mp.checkpoints["new"](4, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z - 2), 5, {
        direction: new mp.Vector3(0, 0, 0),
        color: [44, 128, 239, 150],
        visible: true,
        dimension: 0
      });
      this.AutoSchoolColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
      this.AutoSchoolBlip = mp.blips["new"](1, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z), {
        color: 3
      });
      return;
    }

    this.AutoSchoolColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
    this.isStop = points[type][this.idx].stop;
    this.AutoSchoolCheckpoint = mp.checkpoints["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z - 2), 5, {
      direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
      color: [44, 128, 239, 150],
      visible: true,
      dimension: 0
    });
    this.AutoSchoolBlip = mp.blips["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z), {
      scale: 1,
      color: 3,
      dimension: 0
    });
    this.AutoSchoolBlip.setRoute(true);
  },
  EnterColshape: function EnterColshape(shape) {
    if (shape == this.AutoSchoolColshape) {
      if (this.idx == this.ways[busWayType].length - 1) {
        this.idx = 0;
        this.AutoSchoolColshape.destroy();
        this.AutoSchoolCheckpoint.destroy();
        this.AutoSchoolBlip.destroy();
        this.SchoolWay(ScoolWayType);
        earnedMoney += salary;
        mp.events.callRemote('', earnedMoney);
        return;
      }

      this.idx++;
      this.AutoSchoolColshape.destroy();
      this.AutoSchoolCheckpoint.destroy();
      this.AutoSchoolBlip.destroy();
      this.SchoolWay(SchoolWayType);
    }
  }
};