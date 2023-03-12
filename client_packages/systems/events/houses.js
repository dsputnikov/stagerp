let houseColshapes = []
let houseBlips = []
let houseLabels = []
let garageColshapes = []
let garageMarkers = []
let inHouseColshapes = []
let inHouseMarkers = []
let _houses = []
var currentId = null
let localPlayer = mp.players.local
let windowOpened = false;
let render = false;


mp.events.add({
    'House_loadHousesObjects::CLIENT': (houses, id) => {
        _houses = houses
        for (let i = 0; i < houses[0].length; i++) {
            console_log(JSON.stringify(houses[0][i]))
            let labelStatus = (houses[0][i].status == 1) ? `~g~(Свободен)` : '~r~(Занят)';
            let blipColor = (houses[0][i].status == 2) ? 59 : 25;
            houseBlips.push(mp.blips.new(40, new mp.Vector3(houses[0][i].x, houses[0][i].y, houses[0][i].z),
                {
                    name: `Дом`,
                    scale: 0.6,
                    color: blipColor,
                    dimension: 0,
                    shortRange: true,
                }))

            houseLabels.push(mp.labels.new(`Дом #${i + 1} ${labelStatus}`, new mp.Vector3(houses[0][i].x, houses[0][i].y, houses[0][i].z),
                {
                    id: houses[0][i].id,
                    los: true,
                    drawDistance: 20,
                    dimension: 0
                }))

            houseColshapes.push(mp.colshapes.newSphere(houses[0][i].x, houses[0][i].y, houses[0][i].z, 1, 0))
        }
        render = true;
    },

    'House_loadInHouseObjects::CLIENT': (houses, ids) => {
        for (let i = 0; i < houses[0].length; i++) {
            switch (houses[0][i].class) {
                case 'high':
                    inHouseMarkers.push(mp.markers.new(20, new mp.Vector3(-785.083, 323.596, 211.997), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    inHouseColshapes.push(mp.colshapes.newSphere(-785.083, 323.596, 211.997, 1, ids[i] + 10))

                    garageMarkers.push(mp.markers.new(20, new mp.Vector3(240.311, -1004.840, -99.000), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    garageColshapes.push(mp.colshapes.newSphere(240.311, -1004.840, -99.000, 1, ids[i] + 10))
                    break;

                case 'medium':
                    inHouseMarkers.push(mp.markers.new(20, new mp.Vector3(346.491, -1012.418, -99.196), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    inHouseColshapes.push(mp.colshapes.newSphere(346.491, -1012.418, -99.196, 1, ids[i] + 10))

                    garageMarkers.push(mp.markers.new(20, new mp.Vector3(212.012, -999.059, -99.000), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    garageColshapes.push(mp.colshapes.newSphere(212.012, -999.059, -99.000, 1, ids[i] + 10))
                    break;

                case 'low':
                    inHouseMarkers.push(mp.markers.new(20, new mp.Vector3(266.033, -1007.094, -100.953), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    inHouseColshapes.push(mp.colshapes.newSphere(266.033, -1007.094, -100.953, 1, ids[i] + 10))

                    garageMarkers.push(mp.markers.new(20, new mp.Vector3(179.086, -1000.814, -99.000), 1,
                        {
                            visible: true,
                            dimension: ids[i] + 10
                        }))

                    garageColshapes.push(mp.colshapes.newSphere(179.086, -1000.814, -99.000, 1, ids[i] + 10))
                    break;
            }
        }
    }
})

mp.events.add({
    'playerEnterColshape': (shape) => {
        inHouseColshapes.forEach(el => {
            if (shape == el) {
                browser.execute('HUD.usebutton.active = true;')
                mp.keys.bind(0x45, true, () => {
                    browser.call('Houses_showWindow::CEF', 2, true)
                    windowOpened = true;
                    mp.gui.cursor.show(true, true);
                    mp.game.ui.displayRadar(false);
                    mp.events.call('HUD_setShow::CLIENT', false)
                })
            }
        })

        garageColshapes.forEach(el => {
            if (shape == el) {
                browser.execute('HUD.usebutton.active = true;')
                mp.keys.bind(0x45, true, () => {
                    browser.call('Houses_showWindow::CEF', 2, true)
                    mp.gui.cursor.show(true, true);
                    mp.game.ui.displayRadar(false);
                    mp.events.call('HUD_setShow::CLIENT', false)
                })
            }
        })
    },
    'playerExitColshape': (shape) => {
        inHouseColshapes.forEach(el => {
            if (shape == el) {
                browser.execute('HUD.usebutton.active = false;')
                mp.keys.unbind(0x45, true)
            }
        })

        garageColshapes.forEach(el => {
            if (shape == el) {
                browser.execute('HUD.usebutton.active = false;')
                mp.keys.unbind(0x45, true)
            }
        })
    }
})

mp.events.add({
    'playerEnterColshape': (shape) => {
        for (var [key, value] of Object.entries(houseColshapes)) {
            if (shape == value) {
                mp.events.call('House_bindMainColshape::CLIENT', _houses[0][key].id)
                browser.execute('HUD.usebutton.active = true;')
            }
        }
    },

    'playerExitColshape': (shape) => {
        houseColshapes.forEach(colshape => {
            if (shape == colshape) {
                mp.events.call('House_unbindEkey::CLIENT')
                browser.execute('HUD.usebutton.active = false;')
            }
        })
    }
})

mp.events.add({
    'House_setOwnHouseColor::CLIENT': (id, color) => {
        houseBlips[parseInt(id) - 5].setColour(parseInt(color))
    },

    'House_setLabelStatus::CLIENT': (id, status) => {
        houseLabels[parseInt(id) - 5].text = `Дом #${id} ~r~(${status})`
    }
})

//

mp.events.add('House_executeHouseInfo::CLIENT', (ifOwner, ownerName, houseClass, gm, price, locked) => {
    browser.execute(`houses.ifOwner = ${ifOwner}`)
    browser.execute(`houses.ownerName = '${ownerName}'`)
    browser.execute(`houses.houseClass = '${houseClass}'`)
    browser.execute(`houses.price = ${price} + '$'`)
    browser.execute(`houses.ifLocked = ${locked}`)
    browser.execute(`houses.id = ${currentId}`)
})

mp.events.add({
    'House_bindMainColshape::CLIENT': (id) => {
        mp.keys.bind(0x45, true, () => {
            currentId = id
            mp.events.callRemote('House_sendHouseInfo::SERVER', currentId)
            browser.call('Houses_showWindow::CEF', 1, true);
            mp.gui.cursor.show(true, true);
            mp.game.ui.displayRadar(false);
            mp.events.call('HUD_setShow::CLIENT', false)
            windowOpened = true;
        })
    },

    'House_unbindEkey::CLIENT': () => {
        mp.keys.unbind(0x45, true)
    }
})

mp.events.add({
    'House_buyHouse::CLIENT': () => {
        mp.events.callRemote('House_buyHouse::SERVER', currentId)
    },

    'House_sellHouse::CLIENT': () => {
        mp.events.callRemote('House_sellHouse::SERVER', currentId)
    },

    'House_enterHouse::CLIENT': () => {
        mp.events.callRemote('House_enterHouse::SERVER', currentId)
        browser.call('Houses_showWindow::CEF', 1, false);
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayRadar(true);
        mp.events.call('HUD_setShow::CLIENT', true)
    },

    'House_enterGarage::CLIENT': () => {
        mp.events.callRemote('House_enterGarage::SERVER', currentId)
        browser.call('Houses_showWindow::CEF', 1, false);
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayRadar(true);
        mp.events.call('HUD_setShow::CLIENT', true)
    },

    'House_enterStreet::CLIENT': () => {
        mp.events.callRemote('House_enterStreet::SERVER', currentId)
        browser.call('Houses_showWindow::CEF', 2, false);
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayRadar(true);
        mp.events.call('HUD_setShow::CLIENT', true)
    },

    'House_closeHouse::CLIENT': () => {
        mp.events.callRemote('House_closeHouse::SERVER', currentId)
    },

    'House_openHouse::CLIENT': () => {
        mp.events.callRemote('House_openHouse::SERVER', currentId)
    },
    'House_showWindow::CLIENT': (bool) => {
        browser.call('Houses_showWindow::CEF', 1, bool);
        mp.gui.cursor.show(bool, bool);
        mp.game.ui.displayRadar(!bool);
        mp.events.call('HUD_setShow::CLIENT', !bool)
    }
})

let windowDisabled = false;

mp.events.add('render', () => {
    if (mp.game.controls.isDisabledControlPressed(2, 200)) {
        if (windowOpened == true) {
            windowDisabled = true;
            windowOpened = false;
            browser.call('Houses_showWindow::CEF', 1, false);
            mp.gui.cursor.show(false, false);
            mp.game.ui.displayRadar(true);
            mp.events.call('HUD_setShow::CLIENT', true)
        }
    }
    if (windowDisabled == true) {
        mp.game.controls.disableControlAction(2, 200, true);
        setTimeout(() => {
            windowDisabled = false;
        }, 1000)

    }
})