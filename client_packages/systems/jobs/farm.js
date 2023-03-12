
let currentWork = 0; // Текущаю работа (айди)

// Логика работ
let FarmWork = {
    // Сборщик сена
    hayPositions: [
        { x: 2045.484619140625, y: 4966.88818359375, z: 41.08310317993164 },
        { x: 2047.365966796875, y: 4965.05712890625, z: 41.062347412109375 },
        { x: 2050.5048828125, y: 4961.9296875, z: 41.05748748779297 },
        { x: 2053.16259765625, y: 4959.1630859375, z: 41.055580139160156 },
        { x: 2055.71240234375, y: 4956.57666015625, z: 41.03321838378906 },
        { x: 2058.33984375, y: 4954.01953125, z: 41.02448654174805 },
        { x: 2060.8173828125, y: 4951.5224609375, z: 41.04806137084961 },
        { x: 2062.937744140625, y: 4949.4697265625, z: 41.0680046081543 },
        { x: 2065.54150390625, y: 4946.96728515625, z: 41.046470642089844 },
        { x: 2068.220947265625, y: 4944.48828125, z: 41.0601806640625 },
    ],
    hayColshape: null,
    hayMarker: null,
    hayBlip: null,
    hayBasket: 0,
    // Склад
    hayStorageColshape: null,
    hayStorageMarker: null,
    hayStorageBlip: null,
    HayCollector() {
        let number = this.getRandomInt(this.hayPositions.length);
        this.hayColshape = mp.colshapes.newSphere(this.hayPositions[number].x, this.hayPositions[number].y, this.hayPositions[number].z, 1);
        this.hayMarker = mp.markers.new(1, new mp.Vector3(this.hayPositions[number].x, this.hayPositions[number].y, this.hayPositions[number].z - 1), 1, {
            color: [44, 128, 239, 150]
        })
        this.hayBlip = mp.blips.new(1, new mp.Vector3(this.hayPositions[number].x, this.hayPositions[number].y, this.hayPositions[number].z), {
            color: 3,
        })
    },
    // Тракторист
    pointIndex: 0,
    tractorColshape: null,
    tractorMarker: null,
    tractorBlip: null,

    tractorRoute: [
        { x: 2145.658935546875, y: 5115.87548828125, z: 46.56815719604492, heading: 41.57466506958008 },
        { x: 2134.52294921875, y: 5127.32958984375, z: 47.586090087890625, heading: 41.07493209838867 },
        { x: 2122.82861328125, y: 5140.001953125, z: 49.215423583984375, heading: 41.17023849487305 },
        { x: 2111.558349609375, y: 5152.36279296875, z: 50.5235595703125, heading: 42.3946418762207 },
        { x: 2101.071044921875, y: 5163.2158203125, z: 51.52226257324219, heading: 46.47852325439453 },
        { x: 2093.92236328125, y: 5170.63818359375, z: 52.22397994995117, heading: 39.15800094604492 },
        { x: 2088.2880859375, y: 5176.5869140625, z: 52.8485221862793, heading: 43.245758056640625 },
        { x: 2083.858642578125, y: 5181.4453125, z: 53.471309661865234, heading: 39.9954948425293 },
    ],

    TractorWork() {
        let route = this.tractorRoute;
        let point = this.pointIndex;
        let nextRoute = route[point + 1];
        if (nextRoute == null || nextRoute == undefined) {
            this.tractorMarker = mp.checkpoints.new(4, new mp.Vector3(route[point].x, route[point].y, route[point].z - 1), 4,
                {
                    direction: new mp.Vector3(0, 0, 0),
                    color: [44, 128, 239, 150],
                    visible: true,
                    dimension: 0
                });
            this.tractorColshape = mp.colshapes.newSphere(route[point].x, route[point].y, route[point].z, 3, 0);
            this.tractorBlip = mp.blips.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z), {
                color: 3,
            })
            return;
        }
        this.tractorColshape = mp.colshapes.newSphere(route[point].x, route[point].y, route[point].z, 3, 0);
        this.tractorBlip = mp.blips.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z), {
            color: 3,
        })
        this.tractorMarker = mp.checkpoints.new(1, new mp.Vector3(route[point].x, route[point].y, route[point].z - 1), 4,
            {
                direction: new mp.Vector3(nextRoute.x, nextRoute.y, nextRoute.z),
                color: [44, 128, 239, 150],
                visible: true,
                dimension: 0
            });
    },
    // Дояр коров
    cowPositions: [
        { x: 2122.831, y: 5030.790, z: 42.142 },
        { x: 2118.605, y: 5020.835, z: 41.746 },
        { x: 2106.699, y: 5018.898, z: 41.557 },
        { x: 2106.171, y: 5026.116, z: 41.536 }
    ],

    cowstoragePosition: [
        { x: 2157.575, y: 5017.376, z: 41.526 }
    ],

    cowColshape: null,
    cowMarker: null,
    cowBlip: null,
    idx: 0,

    cowStorageColshape: null,
    cowStorageBlip: null,
    cowStorageMarker: null,

    CowWork() {
        let points = this.cowPositions
        if (this.idx < points.length) {
            this.cowColshape = mp.colshapes.newSphere(points[this.idx].x, points[this.idx].y, points[this.idx].z, 1, 0)
            this.cowMarker = mp.markers.new(1, new mp.Vector3(points[this.idx].x, points[this.idx].y, points[this.idx].z - 1), 1, {
                color: [44, 128, 239, 150]
            })
            this.cowBlip = mp.blips.new(1, new mp.Vector3(points[this.idx].x, points[this.idx].y, points[this.idx].z),
                {
                    name: 'Корова',
                    scale: 1,
                    color: [44, 128, 239, 150],
                    dimension: 0,
                })

            this.idx++
        } else {
            let point = this.cowstoragePosition
            this.cowStorageColshape = mp.colshapes.newSphere(point[0].x, point[0].y, point[0].z, 1, 0)
            this.cowStorageMarker = mp.markers.new(1, new mp.Vector3(point[0].x, point[0].y, point[0].z - 1), 1, {
                color: [44, 128, 239, 150]
            })
            this.cowStorageBlip = mp.blips.new(304, new mp.Vector3(point[0].x, point[0].y, point[0].z),
                {
                    name: 'Хранилище',
                    scale: 1,
                    color: 73,
                    dimension: 0,
                })
        }
    },
    // Пилот
    helicopterPositions: [
        {x: 2023.2327880859375, y: 4757.216796875, z: 41.03152084350586},
        {x: 1961.8707275390625, y: 4731.0400390625, z: 49.20484924316406},
    ],

    helColshape: null,
    helMarker: null,
    helBlip: null,
    pilotpointIndex: 0,

    PilotWork() {
        let way = this.helicopterPositions
        let point = this.pilotpointIndex
        let nextWay = way[point + 1]
        if (nextWay == null || nextWay == undefined) {
            this.helMarker = mp.markers.new(6, new mp.Vector3(way[point].x, way[point].y, way[point].z), 10,
                {
                    color: [44, 128, 239, 150],
                    visible: true,
                    dimension: 0
                })

            this.helColshape = mp.colshapes.newSphere(way[point].x, way[point].y, way[point].z, 10, 0)
            this.helBlip = mp.blips.new(1, new mp.Vector3(way[point].x, way[point].y, way[point].z), {
                color: 3,
            })
            return
        }

        this.helColshape = mp.colshapes.newSphere(way[point].x, way[point].y, way[point].z, 10, 0)
        this.helBlip = mp.blips.new(1, new mp.Vector3(way[point].x, way[point].y, way[point].z), {
            color: 3,
        })
        this.helMarker = mp.markers.new(6, new mp.Vector3(way[point].x, way[point].y, way[point].z), 10,
        {
            color: [44, 128, 239, 150],
            visible: true,
            dimension: 0
        })
    },
    // Colshape Handler
    colshapeEnter(shape) {
        // Сборщик сена
        if (shape == this.hayColshape) {
            mp.events.callRemote('Farm_playAnimation::SERVER', true)
            setTimeout(() => {
                mp.events.callRemote('Farm_playAnimation::SERVER', false)
                //
                this.hayStorageColshape = mp.colshapes.newSphere(2008.3099365234375, 4981.56103515625, 41.386070251464844, 1, 0);
                this.hayStorageMarker = mp.markers.new(1, new mp.Vector3(2008.3099365234375, 4981.56103515625, 40.386070251464844), 1, {
                    color: [44, 128, 239, 150]
                })
                this.hayStorageBlip = mp.blips.new(1, new mp.Vector3(2008.3099365234375, 4981.56103515625, 41.386070251464844), {
                    color: 3,
                })
            }, 5000);
            this.hayColshape.destroy();
            this.hayMarker.destroy();
            this.hayBlip.destroy();
        }
        if (shape == this.hayStorageColshape) {
            this.hayStorageColshape.destroy();
            this.hayStorageMarker.destroy();
            this.hayStorageBlip.destroy();
            this.HayCollector();
            countedMoney += farmsalary;
            mp.events.callRemote('Farm_addPlayerSalary::SERVER', farmsalary);
            browser.execute(`Farm.work.countedMoney = ${countedMoney}`);
        }
        // Тракторист
        if (shape == this.tractorColshape) {
            let route = this.tractorRoute;
            if (player.vehicle) {
                if (player.getVariable('personalTractor') == player.vehicle) {
                    if (this.pointIndex == route.length - 1) {
                        this.pointIndex = 0;
                        this.tractorColshape.destroy();
                        this.tractorMarker.destroy();
                        this.tractorBlip.destroy();
                        this.TractorWork();
                        countedMoney += farmsalary;
                        mp.events.callRemote('Farm_addPlayerSalary::SERVER', farmsalary);
                        browser.execute(`Farm.work.countedMoney = ${countedMoney}`);
                        return;
                    }
                    this.pointIndex++;
                    this.tractorColshape.destroy();
                    this.tractorMarker.destroy();
                    this.tractorBlip.destroy();
                    this.TractorWork();
                }
            }
        }
        // Дояр
        if (shape == this.cowColshape) {
            mp.events.callRemote('setAnimation::server', true, 1)
            setTimeout(() => {
                mp.events.callRemote('setAnimation::server', false, 1)
                this.cowColshape.destroy()
                this.cowMarker.destroy()
                this.cowBlip.destroy()
                this.CowWork()
            }, 5000)
        }
        if (shape == this.cowStorageColshape) {
            this.idx = 0
            mp.events.callRemote('setAnimation::server', true, 2)
            setTimeout(() => {
                mp.events.callRemote('setAnimation::server', false, 2)
                this.cowStorageColshape.destroy()
                this.cowStorageMarker.destroy()
                this.cowStorageBlip.destroy()
            }, 5000)
        }
        // Пилот
        if (shape == this.helColshape) {
            let way = this.helicopterPositions
            if (player.vehicle) {
                if (player.getVariable('personalHelicopter') == player.vehicle) {
                    if (this.pilotpointIndex == way.length - 1) {
                        this.pilotpointIndex = 1
                        this.helColshape.destroy()
                        this.helMarker.destroy()
                        this.helBlip.destroy()
                        mp.events.call('endHelWork::client')
                        return
                    }

                    this.pilotpointIndex++
                    this.helColshape.destroy()
                    this.helMarker.destroy()
                    this.helBlip.destroy()
                    this.HelicopterWork()

                }
            }
        }
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

// ------------------------------------------[Ивенты]------------------------------------------\\

mp.events.add('playerEnterColshape', (shape) => {
    FarmWork.colshapeEnter(shape)
});

mp.peds.new(0x94562DD7, new mp.Vector3(2016.3450927734375, 4984.787109375, 41.27164077758789), 139.6072998046875, 0); //farm Ped

mp.labels.new('Питер Паркер (NPC)', new mp.Vector3(2016.3450927734375, 4984.787109375, 42.27164077758789),
    {
        los: false,
        font: 0,
        drawDistance: 7,
        dimension: 0
    });

// ------------------------------------------[Показ меню и бинды]------------------------------------------\\

let farmOpened = false;

mp.events.add('Farm_showWindow::CLIENT', () => {
    browser.execute('HUD.usebutton.active = true;')
    mp.keys.bind(0x45, true, function () {
        browser.call('Farm_showWindow::CEF')
        mp.gui.cursor.show(true, true);
        mp.game.ui.displayRadar(false);
        mp.events.call('HUD_setShow::CLIENT', false)
        mp.keys.unbind(0x45, true);
        farmOpened = true;
    });
});

mp.events.add('client::unbindFarmKey', () => {
    mp.keys.unbind(0x45, true);
    browser.execute('HUD.usebutton.active = false;')
});

// ------------------------------------------[Устройство на работу]------------------------------------------\\

let farmsalary = 0;
let countedMoney = 0;

mp.events.add('Farm_startWork::CLIENT', (type, salary) => {
    if (type == 1) {
        FarmWork.HayCollector();
        currentWork = 1;
    }
    if (type == 2) {
        currentWork = 2;
    }
    if (type == 3) {
        FarmWork.CowWork()
        currentWork = 2;
    }
    if(type == 4) {
        currentWork = 3;
    }
    farmsalary = salary;
    currentWork = type;
    browser.execute(`Farm.active = false`);
    mp.gui.cursor.show(false, false);
    mp.events.callRemote('Farm_startWork::SERVER', type);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
});

// ------------------------------------------[Увольнение с работы]------------------------------------------\\

mp.events.add('Farm_stopWork::CLIENT', () => {
    if (currentWork == 1) {
        FarmWork.hayColshape.destroy();
        FarmWork.hayMarker.destroy();
        FarmWork.hayBlip.destroy();
    }
    else if (currentWork == 2) {
        let ifColshape = mp.colshapes.exists(FarmWork.tractorColshape);
        let ifMarker = mp.colshapes.exists(FarmWork.tractorMarker);
        let ifBlip = mp.colshapes.exists(FarmWork.tractorBlip);
        if (ifColshape && ifMarker && ifBlip) {
            FarmWork.tractorColshape.destroy();
            FarmWork.tractorMarker.destroy();
            FarmWork.tractorBlip.destroy();

            mp.events.callRemote('Farm_stopTractorWork::SERVER')
        }
    }
    currentWork = 0;
    browser.execute(`Farm.active = false`);
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.events.call('HUD_setShow::CLIENT', true)
    mp.events.callRemote('Farm_stopWork::SERVER')
});

// ------------------------------------------[Тракторист]------------------------------------------\\

mp.events.add('Farm_startTractorWork::CLIENT', () => {
    FarmWork.TractorWork();
})

// ------------------------------------------[Пилот]------------------------------------------\\

mp.events.add('Farm_startPilotWork::CLIENT', () => {
    FarmWork.PilotWork();
})

// ------------------------------------------[Когда игрок выходит из трактора]------------------------------------------\\

let tractorTimeout;

mp.events.add('playerLeaveVehicle', (vehicle) => {
    if (currentWork == 2) {
        if (vehicle == player.getVariable('personalTractor')) {
            mp.events.callRemote('Hud_addNotify::SERVER', 3, 'У вас есть 100 секунд чтобы вернуться в транспорт', 7000)
            tractorTimeout = setTimeout(() => {
                mp.events.callRemote('Farm_stopTractorWork::SERVER')
                FarmWork.tractorColshape.destroy();
                FarmWork.tractorMarker.destroy();
                FarmWork.tractorBlip.destroy();
                currentWork = 0;
                clearTimeout(tractorTimeout)
            }, 100000)
        }
    }
})

// ------------------------------------------[Когда игрок садится в машину]------------------------------------------\\

mp.events.add('playerEnterVehicle', (vehicle) => {
    if (currentWork == 2) {
        if (vehicle == player.getVariable('personalTractor')) {
            clearTimeout(tractorTimeout)
        }
    }
})

// ------------------------------------------[Выход на ESC]------------------------------------------\\
let farmDisabled = false;

mp.events.add('render', () => {
    if (mp.game.controls.isDisabledControlPressed(2, 200)) {
        if (farmOpened == true) {
            farmDisabled = true;
            farmOpened = false;
            browser.execute(`Farm.active = false;`)
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

mp.events.add('attached', () => {
    let vehicle = player.vehicle;
    let obj = mp.objects.new(mp.game.joaat('prop_haybale_01'), player.position);
    console_log('hahaha')
    setTimeout(() => {
        vehicle.attachTo(obj.handle, vehicle.getBoneIndexByName('chassis_dummy'), 0, 2, -2, 0, 0, 0, false, false, false, false, 0, false);
        console_log('hahaha2')
    }, 150)
})

let cowPos = [
    { x: 2122.831, y: 5030.790, z: 42.142 },
    { x: 2118.605, y: 5020.835, z: 41.746 },
    { x: 2106.699, y: 5018.898, z: 41.557 },
    { x: 2106.171, y: 5026.116, z: 41.536 }
]

for (let i = 0; i < cowPos.length; i++) {
    mp.peds.new(0xFCFA9E1E, new mp.Vector3(cowPos[i].x, cowPos[i].y, cowPos[i].z), FarmWork.getRandomInt(300), 0);
}