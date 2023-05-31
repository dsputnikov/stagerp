"use strict";

var drivetest = [{
  x: -634.7968139648438,
  y: -2260.137451171875,
  z: 5.931935787200928
}];
var DriveTestColshapes = [];
var driveWork = {
  ways: [[{
    x: -585.3695678710938,
    y: -2241.081787109375,
    z: 6.134530067443848,
    stop: false
  }, {
    x: -538.3853149414062,
    y: -2101.830078125,
    z: 8.533625602722168,
    stop: false
  }, {
    x: -632.4901123046875,
    y: -2078.257080078125,
    z: 5.9835944175720215,
    stop: false
  }]],
  driveColshape: null,
  driveCheckpoint: null,
  driveBlip: null,
  markerType: null,
  earn: null,
  idx: 0,
  isStop: false,
  DriveWay: function DriveWay(type) {
    var points = this.ways;
    var point = this.idx;
    var nextRoute = points[type][point + 1];

    if (nextRoute == null || nextRoute == undefined) {
      this.driveCheckpoint = mp.checkpoints["new"](4, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z - 2), 5, {
        direction: new mp.Vector3(0, 0, 0),
        color: [44, 128, 239, 150],
        visible: true,
        dimension: 0
      });
      this.driveColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
      this.driveBlip = mp.blips["new"](1, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z), {
        color: 3
      });
      return;
    }

    this.driveColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
    this.isStop = points[type][this.idx].stop;
    this.driveCheckpoint = mp.checkpoints["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z - 2), 5, {
      direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
      color: [44, 128, 239, 150],
      visible: true,
      dimension: 0
    });
    this.driveBlip = mp.blips["new"](1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z), {
      scale: 1,
      color: 3,
      dimension: 0
    });
    this.driveBlip.setRoute(true);
  },
  EnterColshape: function EnterColshape(shape) {
    var _this = this;

    if (shape == this.driveColshape) {
      if (player.vehicle) {
        if (player.getVariable('personaldrive') == player.vehicle) {
          if (this.isStop == true) {
            indriveStop = true;
            mp.events.callRemote('Hud_addNotify::SERVER', 3, 'Остановитесь на 10 секунд', 10000);
            driveStopTimeout = setTimeout(function () {
              indriveStop = false;
              _this.idx++;

              _this.driveColshape.destroy();

              _this.driveCheckpoint.destroy();

              _this.driveBlip.destroy();

              _this.driveWay(driveWayType);
            }, 10000);
            return;
          }

          if (this.idx == this.ways[driveWayType].length - 1) {
            this.idx = 0;
            this.driveColshape.destroy();
            this.driveCheckpoint.destroy();
            this.driveBlip.destroy();
            this.driveWay(driveWayType);
            earnedMoney += salary;
            browser.execute("drive.work.countedMoney = ".concat(earnedMoney));
            mp.events.callRemote('drive_endWay::SERVER', earnedMoney);
            return;
          }

          this.idx++;
          this.driveColshape.destroy();
          this.driveCheckpoint.destroy();
          this.driveBlip.destroy();
          this.driveWay(driveWayType);
        }
      }
    }
  },
  ExitColshape: function ExitColshape(shape) {
    if (shape == this.driveColshape) {
      if (indriveStop) {
        clearTimeout(driveStopTimeout);
        mp.events.callRemote('Hud_addNotify::SERVER', 2, 'Вернитесь на остановку', 10000);
      }
    }
  }
};

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
});