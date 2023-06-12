let windowOpened = false;
const browser = mp.browsers.new('package://browser/index.html');
const player = mp.players.local;

mp.peds.new(mp.game.joaat('u_m_m_aldinapoli'), new mp.Vector3(899.4337158203125, -172.7586669921875, 74.02117156982422), -142.19052124023438)

const showWindow = (bool, id) => {
    browser.execute(`Taxi.active = ${bool};`)
    browser.execute(`Taxi.open = ${id};`)
    mp.gui.cursor.show(bool, bool);
    mp.game.ui.displayRadar(!bool);
    mp.events.call('HUD_setShow::CLIENT', !bool) // Скрывание худа
    mp.keys.unbind(0x45, true);
    windowOpened = bool;
}

const Taxi = {
    // [Driver Objects]
    onDriver_targetBlip: null, // Blip on the target position
    onDriver_targetColshape: null, // Colshape on the target position
    onDriver_orderBlip: null, // Blip on the final waypoint
    onDriver_orderColshape: null, // Colshape on the final waypoint

    // [Driver Data]
    onDriverData_txClass: null, // The class of driver taxi vehicle
    onDriverData_kmPrice: null, // The price which driver set before
    onDriverData_targetObject: null, // Target object which is stored on driver clientside

    // [Target Objects]
    onTarget_ownColshape: null, // Own target colshape, which created when target ordered taxi

    // [Target Data]
    onTargetData_driverObject: null, // Driver object which is stored on target clientside

    // Target methods
    orderTaxi() {
        const pos = player.position
        this.onTarget_ownColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 3, 0)
    },

    // Driver methods
    acceptOrder(target) {
        mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы приняли заказ. Отправляйтесь на метку.', 7000)
        const pos = target.position
        this.onDriverData_targetObject = target
        this.onDriver_targetBlip = mp.blips.new(280, new mp.Vector3(pos.x, pos.y, pos.z), { name: 'Клиент', scale: 0.8, color: 82, dimension: 0 })
        this.onDriver_targetColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0)
        this.onDriver_targetBlip.setRoute(true)
        mp.events.callRemote('Taxi_orderAccepted::SERVER', target)
    },

    // Global methods
    enterColshape(shape) {
        if (shape == this.onDriver_targetColshape) {
            if (player.vehicle && player.vehicle.getVariable('taxiVeh') == true) {
                this.onDriver_targetColshape.destroy()
                this.onDriver_targetBlip.destroy()
                this.onDriver_targetColshape = null
                this.onDriver_targetBlip = null
                mp.events.callRemote('Taxi_driverArrived::SERVER', this.onDriverData_targetObject)
            }
        } else if (shape == this.onDriver_orderColshape) {
            if (player.vehicle && player.vehicle.getVariable('taxiVeh') == true) {
                mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы прибыли в точку назначения.', 7000)
                mp.events.callRemote('Taxi_orderCompleted::SERVER', Taxi.onDriverData_targetObject)
                this.onDriver_orderColshape.destroy()
                this.onDriver_orderBlip.destroy()
            }
        }
    },

    exitColshape(shape) {
        if (shape == this.onTarget_ownColshape) {
            if (this.onTarget_ownColshape != null && player.getVariable('Taxi_driverArrived') == false) {
                mp.events.callRemote('Hud_addNotify::SERVER', 2, 'Заказ отменен. Вы покинули место вызова.', 7000)
                this.onTarget_ownColshape.destroy()
                if (this.onTargetData_driverObject != null) {
                    mp.events.callRemote('Taxi_cancelOrder::SERVER', this.onTargetData_driverObject)
                }
                mp.events.callRemote('Taxi_executeDeleteOrder::SERVER')
            }
        }
    }

}

// 

mp.events.add('playerExitColshape', (shape) => {
    Taxi.exitColshape(shape)
})

mp.events.add('playerEnterColshape', (shape) => {
    Taxi.enterColshape(shape)
})

mp.events.add('Taxi_showWindow::CLIENT', () => {
    browser.execute('HUD.usebutton.active = true;')
    mp.keys.bind(0x45, true, function() {
        showWindow(true, 1)
    });
});

mp.events.add('Taxi_unbind::CLIENT', () => {
    mp.keys.unbind(0x45, true);
    browser.execute('HUD.usebutton.active = false;')
});

mp.events.add('Taxi_declineBtn::CLIENT', () => {
        showWindow(false, 1)
        mp.events.callRemote('Taxi_declineBtn::SERVER')
    })
    // 

mp.events.add('Taxi_GotAJob::CLIENT', () => {
    showWindow(false, 1)
    mp.events.callRemote('Taxi_GotAJob::SERVER')
})

mp.events.add('Taxi_endWork::CLIENT', () => {
    showWindow(false, 1)
    mp.events.callRemote('Taxi_endWork::SERVER');
})

// Аренда такси
mp.events.add('Taxi_openRentWindow::CLIENT', () => {
    showWindow(true, 3)
})

mp.events.add('Taxi_rentTaxi::CLIENT', () => {
    showWindow(false, 1)
    mp.events.callRemote('Taxi_rentTaxi::SERVER')
})

// Установка цены
mp.events.add('Taxi_openPriceWindow::CLIENT', () => {
    showWindow(true, 4)
})

mp.events.add('Taxi_setPrice::CLIENT', (price) => {
    Taxi.onDriverData_kmPrice = price
    showWindow(false, 1)
})

mp.events.add('Taxi_interimCreateOrder::CLIENT', (cls) => {
    Taxi.orderTaxi()
    mp.events.callRemote('Taxi_interimCreateOrder::SERVER', cls)
})

mp.events.add('Taxi_createOrder::CLIENT', (num, _name, dist, id) => {
    browser.execute(`Taxi.addOrder(${num}, '${_name}', ${dist}, ${id})`)
})

mp.events.add('Taxi_interimAcceptOrder::CLIENT', (id) => {
    if (player.getVariable('Taxi_orderExecutionStatus') == false) {
        mp.events.callRemote('Taxi_interimAcceptOrder::SERVER', id)
    }
})

mp.events.add('Taxi_acceptOrder::CLIENT', (target) => {
    Taxi.acceptOrder(target)
})

mp.events.add('Taxi_orderAccepted::CLIENT', (driver) => {
    Taxi.onTargetData_driverObject = driver
})

mp.events.add('Taxi_driverArrived::CLIENT', () => {
    mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Таксист прибыл.', 7000)
    Taxi.onTarget_ownColshape.destroy()
    Taxi.onTarget_ownColshape = null
})

mp.events.add('Taxi_executeDeleteOrder::CLIENT', () => {
    browser.execute(`Taxi.deleteOrder(${player.getVariable('id')})`)
})

mp.events.add('Taxi_interimSitWithoutOrder::CLIENT', (vehicle) => {
    Taxi.onTargetData_driverObject = mp.players.atHandle(vehicle.getPedInSeat(-1))
    mp.events.callRemote('Taxi_interimSitWithoutOrder::SERVER', Taxi.onTargetData_driverObject)
})

mp.events.add('Taxi_sitWithoutOrder::CLIENT', (target) => {
    Taxi.onDriverData_targetObject = target
})

mp.events.add('Taxi_orderExecution::CLIENT', (pos) => {
    if (pos != null) {
        if (mp.blips.exists(Taxi.onDriver_orderBlip) && mp.colshapes.exists(Taxi.onDriver_orderColshape)) {
            Taxi.onDriver_orderBlip.destroy()
            Taxi.onDriver_orderColshape.destroy()
            Taxi.onDriver_orderBlip = null
            Taxi.onDriver_orderColshape = null
            Taxi.onDriver_orderBlip = mp.blips.new(792, new mp.Vector3(pos.x, pos.y, pos.z), { name: 'Конец пути', scale: 0.8, color: 82, dimension: 0 })
            Taxi.onDriver_orderColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0)
            Taxi.onDriver_orderBlip.setRoute(true)
        } else {
            Taxi.onDriver_orderBlip = mp.blips.new(792, new mp.Vector3(pos.x, pos.y, pos.z), { name: 'Конец пути', scale: 0.8, color: 82, dimension: 0 })
            Taxi.onDriver_orderColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0)
            Taxi.onDriver_orderBlip.setRoute(true)
        }
        mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы получили координаты. Отправляйтесь на метку.', 7000)
    }
})

mp.events.add('Taxi_orderCompleted::CLIENT', () => {
    Taxi.onTargetData_driverObject = null
})

mp.events.add('Taxi_interimOrderExecution::CLIENT', (target, pos) => {
    if (Taxi.onDriverData_targetObject == target) {
        mp.events.callRemote('Taxi_orderExecution::SERVER', pos)
    } else {
        mp.events.callRemote('Taxi_impossibleToSpecifyCoords::SERVER', target)
    }
})

mp.events.add('playerCreateWaypoint', (pos) => {
    if (player.vehicle) {
        if (player.vehicle.getVariable('taxiVeh') == true) {
            if (player.getVariable('taxiWork') == false) {
                mp.events.callRemote('Taxi_interimOrderExecution::SERVER', pos, Taxi.onTargetData_driverObject)
            }
        }
    }
})

let openned = false

mp.keys.bind(0x4a, true, () => {
    if (player.getVariable('taxiWork') == false) return;
    if (chatOpened == true) return;
    switch (openned) {
        case true:
            showWindow(false, 2)
            openned = false
            break

        case false:
            showWindow(true, 2)
            openned = true
            break
    }
})

mp.events.add('Taxi_updateRate::CLIENT', (taxiclass) => {
    Taxi.onDriverData_txClass = taxiclass;
})

mp.events.add('render', () => {
    const taxiClass = (Taxi.onDriverData_txClass == 'high') ? 'Высокий' : 'Базовый'
    const taxiKmPrice = (Taxi.onDriverData_kmPrice == null || Taxi.onDriverData_kmPrice == 0) ? 'Бесплатно' : Taxi.onDriverData_kmPrice
    mp.players.forEachInStreamRange(_player => {
        if (_player.vehicle) {
            if (_player.vehicle.getVariable('taxiVeh')) {
                if (player == _player) return
                const position = _player.vehicle.position
                mp.game.graphics.drawText(`~w~Класс: ~b~${taxiClass}\n~w~Цена за 1 км: ~b~$${taxiKmPrice} `, [position.x, position.y, position.z + 1.20], {
                    color: [55, 84, 218, 255],
                    font: 0,
                    scale: [0.3, 0.3]
                })
            }
        }
    })

})

let taxiTimeout;

mp.events.add('playerLeaveVehicle', (vehicle) => {
    if (vehicle == player.getVariable('personalTaxi')) {
        if (player.getVariable('taxiWork') == true) {
            mp.events.callRemote('Hud_addNotify::SERVER', 3, 'У вас есть 100 секунд чтобы вернуться в транспорт', 7000)
            taxiTimeout = setTimeout(() => {
                mp.events.callRemote('Taxi_endWork::SERVER')
                Taxi.onDriverData_txClass = null
                Taxi.onDriverData_kmPrice = null
                browser.execute("Taxi.isWork = false;")
                clearTimeout(taxiTimeout)
            }, 100000)
        } else {
            mp.events.callRemote('Taxi_targetEnterTaxi::SERVER')
        }
    }
})

mp.events.add('playerEnterVehicle', (vehicle) => {
    if (vehicle == player.getVariable('personalTaxi')) {
        if (player.getVariable('taxiWork') == true) {
            clearTimeout(taxiTimeout)
        }
    }
})

mp.events.add('playerQuit', () => {
    if (player.getVariable('Taxi_orderExecutionStatus') == true) {
        if (Taxi.onDriver_targetBlip != null && Taxi.onDriver_targetColshape != null) {
            Taxi.onDriver_targetBlip.destroy()
            Taxi.onDriver_targetColshape.destroy()
            Taxi.onDriver_targetBlip = null
            Taxi.onDriver_targetColshape = null
        }
        const target = Taxi.onDriverData_targetObject
        mp.events.callRemote('Taxi_driverLeave::SERVER', target)
    }
})