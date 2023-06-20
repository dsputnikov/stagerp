
mp.peds.new(mp.game.joaat('u_m_m_aldinapoli'), new mp.Vector3(-1337.1719970703125, 31.19898796081543, 53.54407501220703), 270.0)

let lawnmower = false;
let salary = 100;
let earnedMoney = 0;

let lawnMower = {
    ways: [
        { x: -1317.2303466796875, y: 37.19955062866211, z: 52.99942398071289, heading: -103.56332397460938 },
        { x: -1302.8670654296875, y: 33.54759979248047, z: 51.87772750854492, heading: -105.45845794677734 },
        { x: -1289.0672607421875, y: 29.88505744934082, z: 50.5317268371582, heading: -105.23981475830078 },
        { x: -1274.6558837890625, y: 27.710800170898438, z: 48.25526809692383, heading: -97.7186050415039 },
        { x: -1260.713623046875, y: 25.45833969116211, z: 47.73210144042969, heading: -105.77774047851562 },
        { x: -1248.9853515625, y: 20.29296112060547, z: 47.44205856323242, heading: -116.0489501953125 },
        { x: -1235.8067626953125, y: 12.62120246887207, z: 47.1203727722168, heading: -117.43684387207031 },
        { x: -1218.0482177734375, y: 2.24716854095459, z: 47.26069259643555, heading: -128.21908569335938 },
        { x: -1202.85400390625, y: -7.358166217803955, z: 46.983428955078125, heading: -119.58663177490234 },
        { x: -1186.7406005859375, y: -17.31290626525879, z: 46.02794647216797, heading: -123.50873565673828 },
        { x: -1170.295654296875, y: -27.085355758666992, z: 45.03740310668945, heading: -121.21231079101562 },
        { x: -1153.7149658203125, y: -40.6027946472168, z: 44.700599670410156, heading: -128.95806884765625 },
        { x: -1142.9881591796875, y: -49.70779800415039, z: 44.524871826171875, heading: -128.20828247070312 },
        { x: -1134.656494140625, y: -56.14706039428711, z: 43.84428405761719, heading: -117.8686752319336 },
        { x: -1115.269287109375, y: -61.91852951049805, z: 43.92084503173828, heading: -104.56022644042969 },
        { x: -1098.655029296875, y: -65.31204986572266, z: 42.9889030456543, heading: -105.55064392089844 },
        { x: -1078.3372802734375, y: -78.64096069335938, z: 42.37216567993164, heading: -130.5222930908203 },
        { x: -1067.333740234375, y: -91.2999038696289, z: 42.13492965698242, heading: -150.25245666503906 },
        { x: -1060.1025390625, y: -108.4674072265625, z: 41.1834602355957, heading: -156.45065307617188 },
        { x: -1039.2969970703125, y: -113.27354431152344, z: 41.586734771728516, heading: -83.89646911621094 },
        { x: -1019.5498657226562, y: -114.08363342285156, z: 40.9911994934082, heading: -96.05133056640625 },
        { x: -1004.2028198242188, y: -110.46871948242188, z: 40.89067077636719, heading: -49.88611602783203 },
        { x: -992.5355224609375, y: -99.68141174316406, z: 40.25252914428711, heading: -36.70311737060547 },
        { x: -988.7535400390625, y: -81.82984161376953, z: 40.94929885864258, heading: 0.9748243093490601 },
        { x: -993.473388671875, y: -63.455772399902344, z: 41.05135726928711, heading: 35.3770751953125 },
        { x: -1003.4714965820312, y: -47.04049301147461, z: 42.98160171508789, heading: 29.827983856201172 },
        { x: -1016.4373779296875, y: -27.50320816040039, z: 45.360382080078125, heading: 20.398353576660156 },
        { x: -1021.3515625, y: -15.900577545166016, z: 47.099517822265625, heading: 22.986236572265625 },
        { x: -1030.26708984375, y: 0.1267693042755127, z: 48.895565032958984, heading: 24.960187911987305 },
        { x: -1031.9034423828125, y: 13.191113471984863, z: 49.90148162841797, heading: -28.212156295776367 },
        { x: -1018.4035034179688, y: 23.989904403686523, z: 49.95145034790039, heading: -52.36537551879883 },
        { x: -1018.9081420898438, y: 42.90272903442383, z: 50.35324478149414, heading: 23.103424072265625 },
        { x: -1030.8487548828125, y: 54.487525939941406, z: 50.4029541015625, heading: 58.60841751098633 },
        { x: -1047.131103515625, y: 65.61991119384766, z: 50.67888259887695, heading: 46.142581939697266 },
        { x: -1060.7347412109375, y: 83.08828735351562, z: 51.799598693847656, heading: 27.150598526000977 },
        { x: -1066.78466796875, y: 99.3565902709961, z: 54.75984191894531, heading: 19.987071990966797 },
        { x: -1068.8892822265625, y: 110.4886245727539, z: 55.66142272949219, heading: 2.972930908203125 },
        { x: -1072.695556640625, y: 132.49685668945312, z: 57.98091125488281, heading: 21.06599235534668 },
        { x: -1080.2579345703125, y: 145.87843322753906, z: 59.05550765991211, heading: 32.40141296386719 },
        { x: -1092.344970703125, y: 166.64089965820312, z: 61.3612060546875, heading: 27.561439514160156 },
        { x: -1100.745361328125, y: 184.205810546875, z: 62.37884521484375, heading: 24.1664981842041 },
        { x: -1106.046142578125, y: 200.8788299560547, z: 63.24580383300781, heading: 18.084867477416992 },
        { x: -1111.615234375, y: 217.9343719482422, z: 64.3035659790039, heading: 31.23626708984375 },
        { x: -1119.2969970703125, y: 223.9901123046875, z: 64.53578186035156, heading: 78.83214569091797 },
        { x: -1129.8221435546875, y: 223.3805389404297, z: 64.6987075805664, heading: 103.9019775390625 },
        { x: -1142.7169189453125, y: 217.89854431152344, z: 64.94650268554688, heading: 116.16156768798828 },
        { x: -1160.8553466796875, y: 208.59552001953125, z: 65.04884338378906, heading: 116.0487060546875 },
        { x: -1185.793701171875, y: 196.7427520751953, z: 65.18588256835938, heading: 112.1168441772461 },
        { x: -1209.8773193359375, y: 189.52662658691406, z: 64.3548812866211, heading: 106.17816925048828 },
        { x: -1234.4224853515625, y: 181.5477294921875, z: 62.823795318603516, heading: 99.29100036621094 },
        { x: -1256.5201416015625, y: 176.02450561523438, z: 60.50731658935547, heading: 104.3810043334961 },
        { x: -1275.515869140625, y: 179.60015869140625, z: 59.701168060302734, heading: 77.8381118774414 },
        { x: -1297.8349609375, y: 179.88400268554688, z: 58.79386520385742, heading: 95.5721435546875 },
        { x: -1319.545166015625, y: 180.29379272460938, z: 58.17030715942383, heading: 93.59142303466797 },
        { x: -1342.4354248046875, y: 176.0941619873047, z: 57.64588165283203, heading: 123.22953033447266 },
        { x: -1337.4432373046875, y: 163.31358337402344, z: 57.292728424072266, heading: -151.93820190429688 },
        { x: -1335.210693359375, y: 147.889892578125, z: 56.90224838256836, heading: -179.26316833496094 },
        { x: -1332.383544921875, y: 132.54026794433594, z: 56.5490608215332, heading: -162.90940856933594 },
        { x: -1325.903076171875, y: 116.52648162841797, z: 56.2069091796875, heading: -154.54522705078125 },
        { x: -1319.0975341796875, y: 101.69216918945312, z: 55.705204010009766, heading: -156.36790466308594 },
        { x: -1313.8209228515625, y: 81.49781799316406, z: 54.113765716552734, heading: -167.71157836914062 },
        { x: -1309.933349609375, y: 61.574825286865234, z: 53.02158737182617, heading: -172.5537872314453 },
    ],

    lawnColshape: null,
    lawnCheckpoint: null,
    lawnBlip: null,
    earn: null,
    idx: 0,

    lawnWay() {
        let route = this.ways;
        let point = this.idx;
        let nextRoute = route[point + 1];
        if (nextRoute == null || nextRoute == undefined) {
            this.lawnCheckpoint = mp.checkpoints.new(4, new mp.Vector3(route[point].x, route[point].y, route[point].z - 1), 2,
                {
                    direction: new mp.Vector3(0, 0, 0),
                    color: [44, 128, 239, 150],
                    visible: true,
                    dimension: 0
                });
            this.lawnColshape = mp.colshapes.newSphere(route[point].x, route[point].y, route[point].z, 3, 0);
            this.lawnBlip = mp.blips.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z), {
                color: 3,
            })
            return;
        }
        this.lawnColshape = mp.colshapes.newSphere(route[point].x, route[point].y, route[point].z, 3, 0);
        this.lawnBlip = mp.blips.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z), {
            color: 3,
        })
        this.lawnCheckpoint = mp.checkpoints.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z - 1), 2,
            {
                direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
                color: [44, 128, 239, 150],
                visible: true,
                dimension: 0
            });
    },

    EnterColshape(shape) {
        if (shape == this.lawnColshape) {
            if (player.vehicle) {
                if (player.getVariable('personalMower') == player.vehicle) {
                    if (this.idx == this.ways.length - 1) {
                        this.idx = 0;
                        this.lawnColshape.destroy()
                        this.lawnCheckpoint.destroy()
                        this.lawnBlip.destroy()

                        this.lawnWay()
                        earnedMoney += salary;
                        browser.execute(`Mower.countedMoney = ${earnedMoney}`);

                        mp.events.callRemote('LawnMower_endWay::SERVER', earnedMoney)
                        return;
                    }
                    this.idx++;
                    this.lawnColshape.destroy()
                    this.lawnCheckpoint.destroy()
                    this.lawnBlip.destroy()

                    this.lawnWay()
                }
            }
        }
    },
}

let windowOpened = false;

mp.events.add('LawnMower_showWindow::CLIENT', () => {
    browser.execute('HUD.usebutton.active = true;')
    mp.keys.bind(0x45, true, function () {
        browser.execute(`Mower.active = true;`)
        windowOpened = true;
        mp.gui.cursor.show(true, true);
        mp.game.ui.displayRadar(false);
        mp.events.call('HUD_setShow::CLIENT', false)
        mp.keys.unbind(0x45, true);
    });
});

mp.events.add('LawnMower_unbind::CLIENT', () => {
    mp.keys.unbind(0x45, true);
    browser.execute('HUD.usebutton.active = false;')
});


mp.events.add('LawnMower_startWork::CLIENT', () => {
    lawnmower = true;
    windowOpened = false;
    browser.execute(`Mower.active = false;`)
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
    mp.events.callRemote('LawnMower_startWork::SERVER')
})

mp.events.add('LawnMower_startRoute::CLIENT', () => {
    lawnMower.lawnWay()
})


mp.events.add('LawnMower_stopWork::CLIENT', () => {
    browser.execute(`Mower.active = false;`)
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
    lawnmower = false;
    mp.events.callRemote('LawnMower_endWork::SERVER', false)
    let ifMarker = mp.checkpoints.exists(lawnMower.lawnCheckpoint)
    if (!ifMarker) return;
    mp.events.callRemote('LawnMower_endWork::SERVER', true)
    lawnMower.lawnColshape.destroy();
    lawnMower.lawnCheckpoint.destroy();
    lawnMower.lawnBlip.destroy();
})


mp.events.add('playerEnterColshape', (shape) => {
    lawnMower.EnterColshape(shape)
})

let farmDisabled = false;

mp.events.add('render', () => {
    if (mp.game.controls.isDisabledControlPressed(2, 200)) {
        if (windowOpened == true) {
            farmDisabled = true;
            farmOpened = false;
            browser.execute(`Mower.active = false;`)
            mp.gui.cursor.show(false, false);
            mp.game.ui.displayRadar(true);
            mp.events.call('HUD_setShow::CLIENT', true)
        }
    }
    if (farmDisabled == true) {
        mp.game.controls.disableControlAction(2, 200, true);
        setTimeout(() => {
            farmDisabled = false;
        }, 1000)

    }
})

let timeout;

mp.events.add('playerLeaveVehicle', (vehicle) => {
    if (lawnmower == true) {
        if (vehicle == player.getVariable('personalMower')) {
            mp.events.callRemote('Hud_addNotify::SERVER', 3, 'У вас есть 100 секунд чтобы вернуться в транспорт', 7000)
            timeout = setTimeout(() => {
                mp.events.callRemote('LawnMower_endWork::SERVER',true)
                let ifMarker = mp.checkpoints.exists(lawnMower.lawnCheckpoint)
                if (!ifMarker) return;
                lawnMower.lawnColshape.destroy();
                lawnMower.lawnCheckpoint.destroy();
                lawnMower.lawnBlip.destroy();
                lawnmower = false;
                clearTimeout(timeout)
            }, 100000)
        }
    }
})

mp.events.add('playerEnterVehicle', (vehicle) => {
    if (lawnmower == true) {
        if (vehicle == player.getVariable('personalMower')) {
            clearTimeout(timeout)
        }
    }
})
