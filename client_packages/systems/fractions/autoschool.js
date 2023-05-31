let drivetest = [
    { x: -634.7968139648438, y: -2260.137451171875, z: 5.931935787200928 },
]

let DriveTestColshapes = [];

let driveWork = {
  ways: [
    [
      { x: -585.3695678710938, y: -2241.081787109375, z: 6.134530067443848, stop: false },
      { x: -538.3853149414062, y: -2101.830078125, z: 8.533625602722168, stop: false },
      { x: -632.4901123046875, y: -2078.257080078125, z: 5.9835944175720215, stop: false },
    ]
  ],

    driveColshape: null,
    driveCheckpoint: null,
    driveBlip: null,
    markerType: null,
    earn: null,
    idx: 0,
    isStop: false,

    DriveWay(type) {
      let points = this.ways
      let point = this.idx;
      let nextRoute = points[type][point + 1];
      if (nextRoute == null || nextRoute == undefined) {
          this.driveCheckpoint = mp.checkpoints.new(4, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z - 2), 5,
              {
                  direction: new mp.Vector3(0, 0, 0),
                  color: [44, 128, 239, 150],
                  visible: true,
                  dimension: 0
              });
          this.driveColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);
          this.driveBlip = mp.blips.new(1, new mp.Vector3(points[type][point].x, points[type][point].y, points[type][point].z), {
              color: 3,
          })
          return;
      }
      this.driveColshape = mp.colshapes.newSphere(points[type][point].x, points[type][point].y, points[type][point].z, 5, 0);

      this.isStop = points[type][this.idx].stop;
      this.driveCheckpoint = mp.checkpoints.new(1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z - 2), 5,
          {
              direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
              color: [44, 128, 239, 150],
              visible: true,
              dimension: 0
          })
      this.driveBlip = mp.blips.new(1, new mp.Vector3(points[type][this.idx].x, points[type][this.idx].y, points[type][this.idx].z),
          {
              scale: 1,
              color: 3,
              dimension: 0,
          })
      this.driveBlip.setRoute(true)
  },

  EnterColshape(shape) {
    if (shape == this.driveColshape) {
        if (player.vehicle) {
            if (player.getVariable('personaldrive') == player.vehicle) {
                if (this.isStop == true) {
                    indriveStop = true;
                    mp.events.callRemote('Hud_addNotify::SERVER', 3, 'Остановитесь на 10 секунд', 10000)
                    driveStopTimeout = setTimeout(() => {
                        indriveStop = false;
                        this.idx++;
                        this.driveColshape.destroy()
                        this.driveCheckpoint.destroy()
                        this.driveBlip.destroy()

                        this.driveWay(driveWayType)
                    }, 10000)
                    return;
                }
                if (this.idx == this.ways[driveWayType].length - 1) {
                    this.idx = 0;
                    this.driveColshape.destroy()
                    this.driveCheckpoint.destroy()
                    this.driveBlip.destroy()

                    this.driveWay(driveWayType)
                    earnedMoney += salary;
                    browser.execute(`drive.work.countedMoney = ${earnedMoney}`);

                    mp.events.callRemote('drive_endWay::SERVER', earnedMoney)
                    return;
                }
                this.idx++;
                this.driveColshape.destroy()
                this.driveCheckpoint.destroy()
                this.driveBlip.destroy()

                this.driveWay(driveWayType)
            }
        }
    }
},

ExitColshape(shape) {
    if (shape == this.driveColshape) {
        if (indriveStop) {
            clearTimeout(driveStopTimeout)
            mp.events.callRemote('Hud_addNotify::SERVER', 2, 'Вернитесь на остановку', 10000)
        }
    }
}
}

for (let i = 0; i < drivetest.length; i++) {
    let shape = mp.colshapes.newSphere(drivetest[i].x, drivetest[i].y, drivetest[i].z, 1, 0);
    DriveTestColshapes.push(shape);
}
  
  // ----------------------------[Вход в шэйп]------------------------------\\

  mp.events.add("playerEnterColshape", (shape) => {
    for (let colshape of DriveTestColshapes) {
      if (shape == colshape) {
        mp.keys.bind(0x45, true, function () {
          mp.events.callRemote("DrivingTest");
        });
        browser.execute("HUD.usebutton.active = true;");
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