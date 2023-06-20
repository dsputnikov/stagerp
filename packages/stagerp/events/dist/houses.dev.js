"use strict";

var chat = require('./basic/hud');

var methods = require('../modules/methods');

mp.events.addCommand('addhouse', function (player, _, price, houseClass) {
  if (player.getVariable('adminlvl') < 5) return;
  if (price == undefined || houseClass == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /addhouse [Цена] [Класс дома]');
  var pos = player.position;
  DB.query('INSERT INTO houses SET ownerScId = ?, ownerName = ?, price = ?, payments = ?, x = ?, y = ?, z = ?, class = ?, status = ?, lockedStatus = ?', [0, '', parseInt(price), '', pos.x, pos.y, pos.z, houseClass, 1, 1], function (err) {
    if (err) return console.log(err);
  });
  chat.addNotify(player, 3, 'Требуется перезапуск сервера', 7000);
});
mp.events.addCommand('addgarage', function (player, _, houseId, garageClass) {
  if (player.getVariable('adminlvl') < 5) return;
  if (houseId == undefined || garageClass == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /addgarage [ID дома] [Класс гаража]');
  var garagePos = player.position; // Позиция гаража

  DB.query('INSERT INTO garages SET houseId = ?, garageClass = ?, x = ?, y = ?, z = ?', [houseId, garageClass, garagePos.x, garagePos.y, garagePos.z], function (err) {
    if (err) return console.log(err);
  });
  chat.addNotify(player, 3, 'Требуется перезапуск сервера', 4000);
});
var houses = [];
var garages = [];
var ids = [];
var housesPos = [[{
  x: -785.083,
  y: 323.596,
  z: 211.997,
  "class": 'high'
}], [{
  x: 346.491,
  y: -1012.418,
  z: -99.196,
  "class": 'medium'
}], [{
  x: 266.033,
  y: -1007.094,
  z: -100.953,
  "class": 'low'
}]];
var garagesPos = [[{
  x: 240.311,
  y: -1004.840,
  z: -99.000,
  "class": 'high'
}], [{
  x: 212.012,
  y: -999.059,
  z: -99.000,
  "class": 'medium'
}], [{
  x: 179.086,
  y: -1000.814,
  z: -99.000,
  "class": 'low'
}]];
mp.events.add('packagesLoaded', function () {
  DB.query('SELECT * FROM houses', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      houses.push(res);
      console.log('\x1b[32m%s\x1b[0m', '[Дома]', "\x1b[0m", "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E ".concat(res.length, " \u0434\u043E\u043C\u0430"));
    }
  });
});
DB.query('SELECT * FROM garages', function (err, res) {
  if (err) {
    console.log(err);
  } else {
    garages.push(res);
    console.log('\x1b[32m%s\x1b[0m', '[Гаражи]', "\x1b[0m", "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E ".concat(res.length, " \u0433\u0430\u0440\u0430\u0436\u0438"));
  }
});
mp.events.add('playerReady', function (player) {
  player.position = new mp.Vector3(-1189.982, 291.911, 69.897);
  DB.query('SELECT id FROM houses', [], function (err, res) {
    if (err) return console.log(err);

    for (var i = 0; i < res.length; i++) {
      ids.push(res[i].id);
    }

    player.call('House_loadHousesObjects::CLIENT', [houses, ids]);
    player.call('House_loadInHouseObjects::CLIENT', [houses, ids]);
  });
});
mp.events.add('playerReady', function (player) {
  player.position = new mp.Vector3(-1189.982, 291.911, 69.897);
  DB.query('SELECT id FROM garages', [], function (err, res) {
    if (err) return console.log(err);

    for (var i = 0; i < res.length; i++) {
      ids.push(res[i].id);
    }

    player.call('Garage_loadInGaragesObjects::CLIENT', [garages, ids]);
    player.call('Garage_loadInGarageObjects::CLIENT', [garages, ids]);
  });
});
mp.events.add('House_sendHouseInfo::SERVER', function (player, id) {
  player.currentId = id;
  DB.query('SELECT * FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log(err);
    } else {
      if (res[0]["class"] == 'high') {
        res[0]["class"] = 'Высокий';
      } else if (res[0]["class"] == 'medium') {
        res[0]["class"] = 'Средний';
      } else if (res[0]["class"] == 'low') {
        res[0]["class"] = 'Низкий';
      }

      var ifOwner = false;

      if (res[0].ownerScId == player.getVariable('id')) {
        ifOwner = true;
      }

      var ownerName = res[0].ownerScId == '' ? res[0].ownerScId = 'Государство' : "".concat(res[0].ownerName);
      player.call('House_executeHouseInfo::CLIENT', [ifOwner, ownerName, res[0]["class"], 3, res[0].price, res[0].lockedStatus]);
    }
  });
});
mp.events.add('Garage_sendGarageInfo::SERVER', function (player, id) {
  player.currentId = id;
  DB.query('SELECT * FROM garages WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log(err);
    } else {
      if (res[0]["class"] == 'high') {
        res[0]["class"] = 'Высокий';
      } else if (res[0]["class"] == 'medium') {
        res[0]["class"] = 'Средний';
      } else if (res[0]["class"] == 'low') {
        res[0]["class"] = 'Низкий';
      }

      var ifOwner = false;

      if (res[0].ownerScId == player.getVariable('id')) {
        ifOwner = true;
      }

      var ownerName = res[0].ownerScId == '' ? res[0].ownerScId = 'Государство' : "".concat(res[0].ownerName);
      player.call('Garage_executeGarageInfo::CLIENT', [ifOwner, ownerName, res[0]["class"], 3, res[0].price, res[0].lockedStatus]);
    }
  });
}); //

mp.events.add('House_closeHouse::SERVER', function (player, id) {
  DB.query('SELECT ownerScId, lockedStatus FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) return console.log(err);

    if (res[0].ownerScId == player.getVariable('id')) {
      DB.query('UPDATE houses SET lockedStatus = ? WHERE id = ? AND ownerScId = ?', [2, id, player.getVariable('id')]); // mp.events.call('House_sendHouseInfo::SERVER',player,id)

      if (res[0].lockedStatus == 2) {// player.notify(`Вы закрыли дом с ID: ${id}`)
        // player.call('House_houseMenuToggle::CLIENT', [false])
      } else {// player.call('House_houseMenuToggle::CLIENT', [false])
        }
    } else {// player.call('House_houseMenuToggle::CLIENT', [false])
        // player.notify('Это не Ваш дом.')
      }
  });
});
mp.events.add('House_openHouse::SERVER', function (player, id) {
  DB.query('SELECT ownerScId, lockedStatus FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) return console.log(err);

    if (res[0].ownerScId == player.getVariable('id')) {
      DB.query('UPDATE houses SET lockedStatus = ? WHERE id = ? AND ownerScId = ?', [1, id, player.getVariable('id')]); // mp.events.call('House_sendHouseInfo::SERVER',player,id)

      if (res[0].lockedStatus == 2) {// player.notify(`Вы открыли дом с ID: ${id}`)
      } else {}
    } else {// player.call('House_houseMenuToggle::CLIENT', [false])
      // player.notify('Это не Ваш дом.')
    }
  });
});
mp.events.add('House_buyHouse::SERVER', function (player, id) {
  DB.query('SELECT * FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) return console.log(err);

    if (res[0]) {
      if (player.getMoney() <= res[0].price) {
        player.call('House_showWindow::CLIENT', [false]);
        chat.addNotify(player, 2, "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0435\u043D\u0435\u0433 ($".concat(res[0].price - player.getMoney(), ")"), 7000);
        return;
      }

      player.removeMoney(res[0].price);
      mp.players.forEach(function (player) {
        player.call('House_setOwnHouseColor::CLIENT', [id, 59]);
        player.call('House_setLabelStatus::CLIENT', [id, 'Занят']);
      });
      DB.query('UPDATE houses SET ownerScId = ?, status = ?, ownerName = ? WHERE id = ?', [player.getVariable('id'), 2, player.name, id]);
      chat.addNotify(player, 1, 'Вы успешно купили дом', 7000);
      player.call('House_showWindow::CLIENT', [false]);
    }
  });
});
mp.events.add('House_sellHouse::SERVER', function (player, id) {
  DB.query('SELECT price, ownerScId FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log(err);
    } else if (res[0].ownerScId == player.getVariable('id')) {
      mp.players.forEach(function (player) {
        console.log(id);
        player.call('House_setOwnHouseColor::CLIENT', [id, 25]);
        player.call('House_setLabelStatus::CLIENT', [id, 'Свободен']);
      });
      DB.query('UPDATE houses SET ownerScId = ?, ownerName = ?, status = ? WHERE id = ?', [null, null, 1, id]);
      player.giveMoney(res[0].price);
      chat.addNotify(player, 1, 'Вы успешно продали дом', 7000);
      player.call('House_showWindow::CLIENT', [false]);
    } else {
      player.call('House_showWindow::CLIENT', [false]);
    }
  });
});
mp.events.add('House_enterHouse::SERVER', function (player, id) {
  DB.query('SELECT class, ownerScId, lockedStatus FROM houses WHERE id = ?', [id], function (err, res) {
    if (err) {
      console.log(err);
    } else {
      if (res[0].lockedStatus == 2) {
        chat.addNotify(player, 2, 'Дом закрыт', 7000);
      } else {
        if (res[0] != undefined) {
          switch (res[0]["class"]) {
            case 'high':
              player.position = new mp.Vector3(housesPos[0][0].x, housesPos[0][0].y, housesPos[0][0].z);
              player.dimension = id + 10;
              player.call('House_unbindEkey::CLIENT');
              break;

            case 'medium':
              player.position = new mp.Vector3(housesPos[1][0].x, housesPos[1][0].y, housesPos[1][0].z);
              player.dimension = id + 10;
              player.call('House_unbindEkey::CLIENT');
              break;

            case 'low':
              player.position = new mp.Vector3(housesPos[2][0].x, housesPos[2][0].y, housesPos[2][0].z);
              player.dimension = id + 10;
              player.call('House_unbindEkey::CLIENT');
              break;
          }
        }
      }
    }
  });
});
mp.events.add({
  'House_enterGarage::SERVER': function House_enterGarageSERVER(player, id) {
    DB.query('SELECT class FROM houses WHERE id = ?', [id], function (err, res) {
      if (err) return console.log(err);

      try {
        switch (res[0]["class"]) {
          case 'high':
            player.position = new mp.Vector3(240.311, -1004.840, -99.000);
            break;

          case 'medium':
            player.position = new mp.Vector3(212.4087371826172, -998.9288940429688, -98.99999237060547);
            break;

          case 'low':
            player.position = new mp.Vector3(178.95326232910156, -1000.1830444335938, -98.99995422363281);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    });
  },
  'House_enterStreet::SERVER': function House_enterStreetSERVER(player, id) {
    DB.query('SELECT x, y, z FROM houses WHERE id = ?', [id], function (err, res) {
      if (err) return console.log(err);

      try {
        player.position = new mp.Vector3(res[0].x, res[0].y, res[0].z);
        player.call('House_chooseBrowserToggle::CLIENT', [false]);
        player.call('House_chooseGarageToggle::CLIENT', [false]);
        player.call('House_unbindEkey::CLIENT');
        player.dimension = 0;
      } catch (e) {
        console.log(e);
      }
    });
  }
});
mp.events.add({
  'Garage_enterGarage::SERVER': function Garage_enterGarageSERVER(player, id) {
    DB.query('SELECT class FROM garages WHERE id = ?', [id], function (err, res) {
      if (err) return console.log(err);

      try {
        switch (res[0]["class"]) {
          case 'high':
            player.position = new mp.Vector3(240.311, -1004.840, -99.000);
            break;

          case 'medium':
            player.position = new mp.Vector3(212.4087371826172, -998.9288940429688, -98.99999237060547);
            break;

          case 'low':
            player.position = new mp.Vector3(178.95326232910156, -1000.1830444335938, -98.99995422363281);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
});