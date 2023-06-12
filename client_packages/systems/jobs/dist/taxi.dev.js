"use strict";

var windowOpened = false;
var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local;
mp.peds["new"](mp.game.joaat('u_m_m_aldinapoli'), new mp.Vector3(899.4337158203125, -172.7586669921875, 74.02117156982422), -142.19052124023438);

var showWindow = function showWindow(bool, id) {
  browser.execute("Taxi.active = ".concat(bool, ";"));
  browser.execute("Taxi.open = ".concat(id, ";"));
  mp.gui.cursor.show(bool, bool);
  mp.game.ui.displayRadar(!bool);
  mp.events.call('HUD_setShow::CLIENT', !bool); // Скрывание худа

  mp.keys.unbind(0x45, true);
  windowOpened = bool;
};

var Taxi = {
  // [Driver Objects]
  onDriver_targetBlip: null,
  // Blip on the target position
  onDriver_targetColshape: null,
  // Colshape on the target position
  onDriver_orderBlip: null,
  // Blip on the final waypoint
  onDriver_orderColshape: null,
  // Colshape on the final waypoint
  // [Driver Data]
  onDriverData_txClass: null,
  // The class of driver taxi vehicle
  onDriverData_kmPrice: null,
  // The price which driver set before
  onDriverData_targetObject: null,
  // Target object which is stored on driver clientside
  // [Target Objects]
  onTarget_ownColshape: null,
  // Own target colshape, which created when target ordered taxi
  // [Target Data]
  onTargetData_driverObject: null,
  // Driver object which is stored on target clientside
  // Target methods
  orderTaxi: function orderTaxi() {
    var pos = player.position;
    this.onTarget_ownColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 3, 0);
  },
  // Driver methods
  acceptOrder: function acceptOrder(target) {
    mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы приняли заказ. Отправляйтесь на метку.', 7000);
    var pos = target.position;
    this.onDriverData_targetObject = target;
    this.onDriver_targetBlip = mp.blips["new"](280, new mp.Vector3(pos.x, pos.y, pos.z), {
      name: 'Клиент',
      scale: 0.8,
      color: 82,
      dimension: 0
    });
    this.onDriver_targetColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0);
    this.onDriver_targetBlip.setRoute(true);
    mp.events.callRemote('Taxi_orderAccepted::SERVER', target);
  },
  // Global methods
  enterColshape: function enterColshape(shape) {
    if (shape == this.onDriver_targetColshape) {
      if (player.vehicle && player.vehicle.getVariable('taxiVeh') == true) {
        this.onDriver_targetColshape.destroy();
        this.onDriver_targetBlip.destroy();
        this.onDriver_targetColshape = null;
        this.onDriver_targetBlip = null;
        mp.events.callRemote('Taxi_driverArrived::SERVER', this.onDriverData_targetObject);
      }
    } else if (shape == this.onDriver_orderColshape) {
      if (player.vehicle && player.vehicle.getVariable('taxiVeh') == true) {
        mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы прибыли в точку назначения.', 7000);
        mp.events.callRemote('Taxi_orderCompleted::SERVER', Taxi.onDriverData_targetObject);
        this.onDriver_orderColshape.destroy();
        this.onDriver_orderBlip.destroy();
      }
    }
  },
  exitColshape: function exitColshape(shape) {
    if (shape == this.onTarget_ownColshape) {
      if (this.onTarget_ownColshape != null && player.getVariable('Taxi_driverArrived') == false) {
        mp.events.callRemote('Hud_addNotify::SERVER', 2, 'Заказ отменен. Вы покинули место вызова.', 7000);
        this.onTarget_ownColshape.destroy();

        if (this.onTargetData_driverObject != null) {
          mp.events.callRemote('Taxi_cancelOrder::SERVER', this.onTargetData_driverObject);
        }

        mp.events.callRemote('Taxi_executeDeleteOrder::SERVER');
      }
    }
  }
}; // 

mp.events.add('playerExitColshape', function (shape) {
  Taxi.exitColshape(shape);
});
mp.events.add('playerEnterColshape', function (shape) {
  Taxi.enterColshape(shape);
});
mp.events.add('Taxi_showWindow::CLIENT', function () {
  browser.execute('HUD.usebutton.active = true;');
  mp.keys.bind(0x45, true, function () {
    showWindow(true, 1);
  });
});
mp.events.add('Taxi_unbind::CLIENT', function () {
  mp.keys.unbind(0x45, true);
  browser.execute('HUD.usebutton.active = false;');
});
mp.events.add('Taxi_declineBtn::CLIENT', function () {
  showWindow(false, 1);
  mp.events.callRemote('Taxi_declineBtn::SERVER');
}); // 

mp.events.add('Taxi_GotAJob::CLIENT', function () {
  showWindow(false, 1);
  mp.events.callRemote('Taxi_GotAJob::SERVER');
});
mp.events.add('Taxi_endWork::CLIENT', function () {
  showWindow(false, 1);
  mp.events.callRemote('Taxi_endWork::SERVER');
}); // Аренда такси

mp.events.add('Taxi_openRentWindow::CLIENT', function () {
  showWindow(true, 3);
});
mp.events.add('Taxi_rentTaxi::CLIENT', function () {
  showWindow(false, 1);
  mp.events.callRemote('Taxi_rentTaxi::SERVER');
}); // Установка цены

mp.events.add('Taxi_openPriceWindow::CLIENT', function () {
  showWindow(true, 4);
});
mp.events.add('Taxi_setPrice::CLIENT', function (price) {
  Taxi.onDriverData_kmPrice = price;
  showWindow(false, 1);
});
mp.events.add('Taxi_interimCreateOrder::CLIENT', function (cls) {
  Taxi.orderTaxi();
  mp.events.callRemote('Taxi_interimCreateOrder::SERVER', cls);
});
mp.events.add('Taxi_createOrder::CLIENT', function (num, _name, dist, id) {
  browser.execute("Taxi.addOrder(".concat(num, ", '").concat(_name, "', ").concat(dist, ", ").concat(id, ")"));
});
mp.events.add('Taxi_interimAcceptOrder::CLIENT', function (id) {
  if (player.getVariable('Taxi_orderExecutionStatus') == false) {
    mp.events.callRemote('Taxi_interimAcceptOrder::SERVER', id);
  }
});
mp.events.add('Taxi_acceptOrder::CLIENT', function (target) {
  Taxi.acceptOrder(target);
});
mp.events.add('Taxi_orderAccepted::CLIENT', function (driver) {
  Taxi.onTargetData_driverObject = driver;
});
mp.events.add('Taxi_driverArrived::CLIENT', function () {
  mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Таксист прибыл.', 7000);
  Taxi.onTarget_ownColshape.destroy();
  Taxi.onTarget_ownColshape = null;
});
mp.events.add('Taxi_executeDeleteOrder::CLIENT', function () {
  browser.execute("Taxi.deleteOrder(".concat(player.getVariable('id'), ")"));
});
mp.events.add('Taxi_interimSitWithoutOrder::CLIENT', function (vehicle) {
  Taxi.onTargetData_driverObject = mp.players.atHandle(vehicle.getPedInSeat(-1));
  mp.events.callRemote('Taxi_interimSitWithoutOrder::SERVER', Taxi.onTargetData_driverObject);
});
mp.events.add('Taxi_sitWithoutOrder::CLIENT', function (target) {
  Taxi.onDriverData_targetObject = target;
});
mp.events.add('Taxi_orderExecution::CLIENT', function (pos) {
  if (pos != null) {
    if (mp.blips.exists(Taxi.onDriver_orderBlip) && mp.colshapes.exists(Taxi.onDriver_orderColshape)) {
      Taxi.onDriver_orderBlip.destroy();
      Taxi.onDriver_orderColshape.destroy();
      Taxi.onDriver_orderBlip = null;
      Taxi.onDriver_orderColshape = null;
      Taxi.onDriver_orderBlip = mp.blips["new"](792, new mp.Vector3(pos.x, pos.y, pos.z), {
        name: 'Конец пути',
        scale: 0.8,
        color: 82,
        dimension: 0
      });
      Taxi.onDriver_orderColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0);
      Taxi.onDriver_orderBlip.setRoute(true);
    } else {
      Taxi.onDriver_orderBlip = mp.blips["new"](792, new mp.Vector3(pos.x, pos.y, pos.z), {
        name: 'Конец пути',
        scale: 0.8,
        color: 82,
        dimension: 0
      });
      Taxi.onDriver_orderColshape = mp.colshapes.newSphere(pos.x, pos.y, pos.z, 5, 0);
      Taxi.onDriver_orderBlip.setRoute(true);
    }

    mp.events.callRemote('Hud_addNotify::SERVER', 1, 'Вы получили координаты. Отправляйтесь на метку.', 7000);
  }
});
mp.events.add('Taxi_orderCompleted::CLIENT', function () {
  Taxi.onTargetData_driverObject = null;
});
mp.events.add('Taxi_interimOrderExecution::CLIENT', function (target, pos) {
  if (Taxi.onDriverData_targetObject == target) {
    mp.events.callRemote('Taxi_orderExecution::SERVER', pos);
  } else {
    mp.events.callRemote('Taxi_impossibleToSpecifyCoords::SERVER', target);
  }
});
mp.events.add('playerCreateWaypoint', function (pos) {
  if (player.vehicle) {
    if (player.vehicle.getVariable('taxiVeh') == true) {
      if (player.getVariable('taxiWork') == false) {
        mp.events.callRemote('Taxi_interimOrderExecution::SERVER', pos, Taxi.onTargetData_driverObject);
      }
    }
  }
});
var openned = false;
mp.keys.bind(0x4a, true, function () {
  if (player.getVariable('taxiWork') == false) return;
  if (chatOpened == true) return;

  switch (openned) {
    case true:
      showWindow(false, 2);
      openned = false;
      break;

    case false:
      showWindow(true, 2);
      openned = true;
      break;
  }
});
mp.events.add('Taxi_updateRate::CLIENT', function (taxiclass) {
  Taxi.onDriverData_txClass = taxiclass;
});
mp.events.add('render', function () {
  var taxiClass = Taxi.onDriverData_txClass == 'high' ? 'Высокий' : 'Базовый';
  var taxiKmPrice = Taxi.onDriverData_kmPrice == null || Taxi.onDriverData_kmPrice == 0 ? 'Бесплатно' : Taxi.onDriverData_kmPrice;
  mp.players.forEachInStreamRange(function (_player) {
    if (_player.vehicle) {
      if (_player.vehicle.getVariable('taxiVeh')) {
        if (player == _player) return;
        var position = _player.vehicle.position;
        mp.game.graphics.drawText("~w~\u041A\u043B\u0430\u0441\u0441: ~b~".concat(taxiClass, "\n~w~\u0426\u0435\u043D\u0430 \u0437\u0430 1 \u043A\u043C: ~b~$").concat(taxiKmPrice, " "), [position.x, position.y, position.z + 1.20], {
          color: [55, 84, 218, 255],
          font: 0,
          scale: [0.3, 0.3]
        });
      }
    }
  });
});
var taxiTimeout;
mp.events.add('playerLeaveVehicle', function (vehicle) {
  if (vehicle == player.getVariable('personalTaxi')) {
    if (player.getVariable('taxiWork') == true) {
      mp.events.callRemote('Hud_addNotify::SERVER', 3, 'У вас есть 100 секунд чтобы вернуться в транспорт', 7000);
      taxiTimeout = setTimeout(function () {
        mp.events.callRemote('Taxi_endWork::SERVER');
        Taxi.onDriverData_txClass = null;
        Taxi.onDriverData_kmPrice = null;
        browser.execute("Taxi.isWork = false;");
        clearTimeout(taxiTimeout);
      }, 100000);
    } else {
      mp.events.callRemote('Taxi_targetEnterTaxi::SERVER');
    }
  }
});
mp.events.add('playerEnterVehicle', function (vehicle) {
  if (vehicle == player.getVariable('personalTaxi')) {
    if (player.getVariable('taxiWork') == true) {
      clearTimeout(taxiTimeout);
    }
  }
});
mp.events.add('playerQuit', function () {
  if (player.getVariable('Taxi_orderExecutionStatus') == true) {
    if (Taxi.onDriver_targetBlip != null && Taxi.onDriver_targetColshape != null) {
      Taxi.onDriver_targetBlip.destroy();
      Taxi.onDriver_targetColshape.destroy();
      Taxi.onDriver_targetBlip = null;
      Taxi.onDriver_targetColshape = null;
    }

    var target = Taxi.onDriverData_targetObject;
    mp.events.callRemote('Taxi_driverLeave::SERVER', target);
  }
});