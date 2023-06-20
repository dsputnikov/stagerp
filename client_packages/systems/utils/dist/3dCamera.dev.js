"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

global.CameraRotator =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "start",
    value: function start(camera, basePosition, lookAtPosition, offsetVector, heading, fov) {
      this.camera = camera;
      this.basePosition = basePosition;
      this.lookAtPosition = lookAtPosition;
      this.offsetVector = offsetVector;
      this.heading = heading;
      this.baseHeading = heading;
      this.currentPoint = {
        x: 0,
        y: 0
      };
      this.isPause = false;
      this.zUp = 0;
      this.zUpMultipler = 1;
      this.xBound = [0, 0];
      this.zBound = [-0.01, 0.8];
      this.changePosition();
      camera.pointAtCoord(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z); // if(fov) {

      camera.setFov(Number(fov)); // }

      this.activate(true);
    }
  }, {
    key: "pause",
    value: function pause(state) {
      this.isPause = state;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.activate(false);
      mp.game.cam.renderScriptCams(false, false, 3000, true, false);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.heading = this.baseHeading;
      this.zUp = 0;
      this.changePosition();
    }
  }, {
    key: "setXBound",
    value: function setXBound(min, max) {
      this.xBound = [min, max];
    }
  }, {
    key: "setZBound",
    value: function setZBound(min, max) {
      this.zBound = [min, max];
    }
  }, {
    key: "setZUpMultipler",
    value: function setZUpMultipler(value) {
      this.zUpMultipler = value;
    }
  }, {
    key: "getRelativeHeading",
    value: function getRelativeHeading() {
      return this.normilizeHeading(this.baseHeading - this.heading);
    }
  }, {
    key: "activate",
    value: function activate(state) {
      /* this.camera.setActive(state);
      mp.game.cam.renderScriptCams(state, false, 3000, true, false); */
      this.isActive = state;
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(dX, dY) {
      this.heading = this.normilizeHeading(this.heading + dX * 100);
      var relativeHeading = this.getRelativeHeading();

      if (relativeHeading > this.xBound[0] && relativeHeading < this.xBound[1]) {
        relativeHeading = Math.abs(this.xBound[0] - relativeHeading) > Math.abs(this.xBound[1] - relativeHeading) ? this.xBound[1] : this.xBound[0];
      }

      this.heading = this.normilizeHeading(-relativeHeading + this.baseHeading);
      this.zUp += dY * this.zUpMultipler * -1;

      if (this.zUp > this.zBound[1]) {
        this.zUp = this.zBound[1];
      } else if (this.zUp < this.zBound[0]) {
        this.zUp = this.zBound[0];
      }

      this.changePosition();
    }
  }, {
    key: "changePosition",
    value: function changePosition() {
      var position = mp.game.object.getObjectOffsetFromCoords(this.basePosition.x, this.basePosition.y, this.basePosition.z + this.zUp, this.heading, this.offsetVector.x, this.offsetVector.y, this.offsetVector.z);
      this.camera.setCoord(position.x, position.y, position.z);
    }
  }, {
    key: "isPointEmpty",
    value: function isPointEmpty() {
      return this.currentPoint.x === 0 && this.currentPoint.y === 0;
    }
  }, {
    key: "setPoint",
    value: function setPoint(x, y) {
      this.currentPoint = {
        x: x,
        y: y
      };
    }
  }, {
    key: "getPoint",
    value: function getPoint() {
      return this.currentPoint;
    }
  }, {
    key: "normilizeHeading",
    value: function normilizeHeading(heading) {
      if (heading > 360) {
        heading = heading - 360;
      } else if (heading < 0) {
        heading = 360 + heading;
      }

      return heading;
    }
  }, {
    key: "setFov",
    value: function setFov(fov) {
      this.camera.setFov(fov);
    }
  }]);

  return _class;
}();

var cameraRotator = new CameraRotator();
mp.events.add("render", function () {
  if (!mp.gui.cursor.visible || !cameraRotator.isActive || cameraRotator.isPause) {
    return;
  }

  var x = mp.game.controls.getDisabledControlNormal(2, 239);
  var y = mp.game.controls.getDisabledControlNormal(2, 240);

  if (cameraRotator.isPointEmpty()) {
    cameraRotator.setPoint(x, y);
  }

  var currentPoint = cameraRotator.getPoint();
  var dX = currentPoint.x - x;
  var dY = currentPoint.y - y;
  var fov = 30;
  cameraRotator.setPoint(x, y); // Comment before commit
  // drawDebugText();
  //if (mp.game.controls.isDisabledControlPressed(2, 237)) {
  //  cameraRotator.onMouseMove(dX, dY);
  //}
  // if (mp.game.controls.isDisabledControlPressed(2, 15)) {
  //     fov -= 2;
  //     if (fov < 30) {
  //         fov = 30;
  //     }
  //     cameraRotator.setFov(fov)
  // }
  // if (mp.game.controls.isDisabledControlPressed(2, 16)) {
  //     fov += 2;
  //     if (fov > 80) {
  //         fov = 80;
  //     }
  //     cameraRotator.setFov(fov)
  // }
});

global.createCam = function () {
  var message = "zUp: ".concat(cameraRotator.zUp.toFixed(3));
  message += "\nHeading: ".concat(cameraRotator.heading.toFixed(2));
  message += "\nBase Heading: ".concat(cameraRotator.baseHeading.toFixed(2));
  message += "\nRelative Heading: ".concat(cameraRotator.getRelativeHeading().toFixed(2));
  mp.game.graphics.drawText(message, [0.5, 0.005], {
    font: 7,
    color: [255, 255, 255, 185],
    scale: [0.8, 0.8],
    outline: true,
    centre: true
  });
};

global.createCam = function (x, y, z, rx, ry, rz, viewangle) {
  camera = mp.cameras["new"]("default");
  camera.setCoord(x, y, z);
  camera.setRot(rx, ry, rz, 2);
  camera.setFov(viewangle);
  camera.setActive(true);
  var vehPosition = new mp.Vector3(x, y, z); // спавн авто

  cameraRotator.start(camera, vehPosition, vehPosition, new mp.Vector3(-3.0, 3.5, 0.5), 70, viewangle);
  cameraRotator.setZBound(-0.8, 1.8);
  cameraRotator.setZUpMultipler(5);
  cameraRotator.pause(false);
  mp.game.cam.renderScriptCams(true, false, 3000, true, false);
};

mp.events.add('Utils_3dcamera::CLIENT', function (x, y, z, rx, ry, rz, viewangle) {
  createCam(x, y, z, rx, ry, 285.854, viewangle); // координаты камеры и ротация
});
mp.events.add('Utils_delcamera::CLIENT', function () {
  cameraRotator.stop();
});