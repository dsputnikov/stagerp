"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var chat = require('./hud');

var heading = require('../index.js');

var salons = [{
  name: 'Низкого класса',
  marker: new mp.Vector3(-51.41538619995117, -1102.193359375, 25.4154052734375),
  blipColor: 31,
  vehicles: [{
    name: 'Albany Emperor',
    price: 4000,
    model: 'emperor'
  }, {
    name: 'Albany Primo',
    price: 5500,
    model: 'primo'
  }, {
    name: 'Albany Washington',
    price: 9000,
    model: 'washington'
  }, {
    name: 'Zirconium Stratum',
    price: 13000,
    model: 'stratum'
  }, {
    name: 'Cheval Surge',
    price: 15000,
    model: 'surge'
  }, {
    name: 'Canis Seminole',
    price: 15000,
    model: 'seminole'
  }, {
    name: 'Dundreary Landstalker',
    price: 25000,
    model: 'landstalker'
  }, {
    name: 'Obey Rocoto',
    price: 40000,
    model: 'rocoto'
  }],
  standVehicle: new mp.Vector3(-42.659339904785156, -1098.883544921875, 26.4154052734375),
  testDrive: new mp.Vector3(-47.550472259521484, -1113.944580078125, 25.43579864501953),
  exitPosition: new mp.Vector3(-49.24433898925781, -1102.9827880859375, 26.422351837158203)
}, {
  name: 'Среднего класса',
  marker: new mp.Vector3(-38.880760192871094, -1673.1343994140625, 28.48229217529297),
  blipColor: 75,
  vehicles: [{
    name: 'Dodge Charger Hellcat',
    price: 150000,
    model: 'hellcat15'
  }, {
    name: 'Mitsubishi Lancer Evolution',
    price: 60000,
    model: 'mevo9t'
  }, {
    name: 'Bentley Electro',
    price: 90000,
    model: '19msctntgt'
  }, {
    name: 'BMW i7',
    price: 120000,
    model: 'bmwi7'
  }, {
    name: 'BMW 3',
    price: 130000,
    model: 'bmw3'
  }, {
    name: 'Toyota Camry 3.5',
    price: 140000,
    model: 'camry18'
  }, {
    name: 'Ford Focus RS',
    price: 100000,
    model: 'focusrs'
  }, {
    name: 'Nissan Skyline',
    price: 150000,
    model: 'gtr34'
  }, {
    name: 'Tesla Model X',
    price: 80000,
    model: 'modelx'
  }, {
    name: 'Toyota Land-Cruiser Prado 200',
    price: 110000,
    model: 'land200'
  }],
  standVehicle: new mp.Vector3(-47.21013259887695, -1687.5595703125, 29.437057495117188),
  testDrive: new mp.Vector3(-55.265777587890625, -1669.2708740234375, 29.285898208618164),
  exitPosition: new mp.Vector3(-40.39360046386719, -1669.7412109375, 29.479703903198242)
}, {
  name: 'Высокого класса',
  marker: new mp.Vector3(-795.868896484375, -219.9210968017578, 36.079654693603516),
  blipColor: 83,
  vehicles: [{
    name: 'Sheava',
    price: 350000,
    model: 'sheava'
  }, {
    name: 'Tyrant',
    price: 400000,
    model: 'tyrant'
  }, {
    name: 'Entityxf',
    price: 200000,
    model: 'entityxf'
  }, {
    name: 'Banshee',
    price: 200000,
    model: 'banshee2'
  }, {
    name: 'Zentorno',
    price: 800000,
    model: 'zentorno'
  }, {
    name: 'Prototipo',
    price: 800000,
    model: 'prototipo'
  }, {
    name: 'T20',
    price: 750000,
    model: 't20'
  }, {
    name: 'GT63SAMG',
    price: 1500000,
    model: 'gt63samg'
  }, {
    name: 'Huracan',
    price: 2500000,
    model: 'huracan'
  }, {
    name: 'Laferrari',
    price: 2500000,
    model: 'laferrari'
  }],
  standVehicle: new mp.Vector3(-783.6351318359375, -224.0694122314453, 36.968379974365234),
  testDrive: new mp.Vector3(-768.3637084960938, -245.3536376953125, 37.24693298339844),
  exitPosition: new mp.Vector3(-798.1190795898438, -221.21755981445312, 37.07961654663086)
}, {
  name: 'Лодок',
  marker: new mp.Vector3(-1599.558349609375, -1182.2337646484375, 0.4373306035995483),
  blipColor: 23,
  vehicles: [{
    name: 'Ddinghy',
    price: 91000,
    model: 'dinghy'
  }, {
    name: 'Jetmax',
    price: 91000,
    model: 'jetmax'
  }, {
    name: 'Marquis',
    price: 91000,
    model: 'marquis'
  }, {
    name: 'Speeder',
    price: 91000,
    model: 'speeder'
  }, {
    name: 'Speeder2',
    price: 91000,
    model: 'speeder2'
  }, {
    name: 'Squalo',
    price: 91000,
    model: 'squalo'
  }, {
    name: 'Toro',
    price: 91000,
    model: 'toro'
  }, {
    name: 'Toro2',
    price: 91000,
    model: 'toro2'
  }],
  standVehicle: new mp.Vector3(-1639.4722900390625, -1178.4822998046875, 0.296030730009079),
  testDrive: new mp.Vector3(-1617.3248291015625, -1209.57275390625, 0.5454487204551697),
  exitPosition: new mp.Vector3(-1598.4398193359375, -1179.5806884765625, 1.575283408164978)
}];
var salonColshapes = []; // цикл

for (var i = 0; i < salons.length; i++) {
  var shape = mp.colshapes.newSphere(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z, 2);
  var marker = mp.markers["new"](1, new mp.Vector3(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z), 1);
  mp.blips["new"](225, salons[i].marker, {
    name: "\u0410\u0432\u0442\u043E\u0441\u0430\u043B\u043E\u043D ".concat(salons[i].name),
    color: salons[i].blipColor,
    shortRange: true
  });
  salonColshapes.push(shape);
}

mp.events.add('playerEnterColshape', function (player, shape) {
  for (var _i = 0, _Object$entries = Object.entries(salonColshapes); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (shape == value) {
      player.dimension = parseInt(player.getVariable('id') + 12);
      player.call('Autosalon_create::CLIENT', [JSON.stringify(salons[key].vehicles), salons[key].standVehicle]);
      player.call('Autosalon_openWindow::CLIENT', [player.getMoney(), player.getBankMoney(), salons[key].name]);
      player.setVariable('currentAutosalon', key);
      break;
    }
  }
});
var testvehicle;
mp.events.add('Autosalon_testdrive_start::SERVER', function (player, model, color_1, color_2) {
  var color = JSON.parse(color_1);
  var color2 = JSON.parse(color_2);
  var dim = player.getVariable('id') + 11;
  testvehicle = mp.vehicles["new"](mp.joaat(model), new mp.Vector3(salons[player.getVariable('currentAutosalon')].testDrive));
  player.testdrive = true;
  player.dimension = dim;
  testvehicle.dimension = dim; // testvehicle.setColor(color_1, color_2);

  testvehicle.setColorRGB(color[0], color[1], color[2], color2[0], color2[1], color2[2]);
  player.putIntoVehicle(testvehicle, 0);
}); // Выход из тест драйва

mp.events.add('playerStartExitVehicle', function (player) {
  if (player.testdrive == true) {
    player.testdrive = false;
    player.position = new mp.Vector3(salons[player.getVariable('currentAutosalon')].exitPosition);
    player.dimension = player.getVariable('id') + 12;
    testvehicle.destroy();
    player.call('Autosalon_testdrive_stop::CLIENT');
  }
});
mp.events.add('Autosalon_exit::SERVER', function (player) {
  player.position = new mp.Vector3(salons[player.getVariable('currentAutosalon')].exitPosition);
  player.dimension = 0;
});
mp.events.addCommand('euac', function (player, _, idcar) {
  var vehicle = player.personalVehicles[idcar];
  var send = JSON.stringify(vehicle);
  towtruckVehicle(player, send);
});
mp.events.addCommand('lock', function (player) {
  var carsArray = player.personalVehicles;
  player.call('LockVehicle::CLIENT', [JSON.stringify(carsArray)]);
});
mp.events.add('lockCar::SERVER', function (player, vehicle) {
  var carsArray = player.personalVehicles;
  var newState = !vehicle.locked;
  vehicle.locked = newState;
  console.log(newState);

  if (newState) {
    player.call('sendToCarUved::CLIENT', [true]);
  } else {
    player.call('sendToCarUved::CLIENT', [false]);
  }
});

count = function count(ary, classifier) {
  classifier = classifier || String;
  return ary.reduce(function (counter, item) {
    var p = classifier(item);
    counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
    return counter;
  }, {});
};

mp.events.add('Autosalon_buyVehicle::SERVER', function _callee3(player, t, model, price, color1, color2) {
  var toInv, parsedItems, lastItem, slotTo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(t == 1)) {
            _context3.next = 6;
            break;
          }

          if (!(player.getMoney() <= price)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return");

        case 3:
          player.removeMoney(price);
          _context3.next = 9;
          break;

        case 6:
          if (!(player.getBankMoney() <= price)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return");

        case 8:
          player.removeBankMoney(price);

        case 9:
          player.call('Autosalon_vehicleBuyed::CLIENT'); // Запрос в базу данных

          _context3.next = 12;
          return regeneratorRuntime.awrap(DB.query('SELECT * FROM characters WHERE login = ?', [player.login], function (err, r) {
            if (err) return console.log(err);

            try {
              var items = r[0].items;
              parsedItems = JSON.parse(items);
              items = parsedItems;
              countBySlot = count(items, function (item) {
                return item.slot;
              });

              if (parsedItems.length - countBySlot[0] >= 28) {
                return chat.addNotify(player, 1, "\u041D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u043C\u0435\u0441\u0442\u0430 \u0432 \u0438\u043D\u0432\u0435\u043D\u0442\u0430\u0440\u0435!", 7000);
              }

              slotTo = heading.getClearSlot(parsedItems);
            } catch (err) {
              console.log(err);
            }
          }));

        case 12:
          DB.query('INSERT INTO vehicles (login,items,model,pos,rot,parkpos,parkrot,color1,color2) VALUES(?,?,?,?,?,?,?,?,?)', [player.login, '[{}]', model, JSON.stringify(salons[player.getVariable('currentAutosalon')].testDrive), '{"x":0,"y":0,"z":0}', JSON.stringify(salons[player.getVariable('currentAutosalon')].testDrive), '{"x":0,"y":0,"z":0}', color1, color2], function (err, r) {
            if (err) return console.log(err);
          });
          _context3.next = 15;
          return regeneratorRuntime.awrap(setTimeout(function _callee2() {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(DB.query('SELECT * FROM vehicles WHERE login = ?', [player.login], function _callee(err, r) {
                      var _i2, pos, rot, _color, _color2;

                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!err) {
                                _context.next = 2;
                                break;
                              }

                              return _context.abrupt("return", console.log(err));

                            case 2:
                              console.log(r);
                              player.personalVehicles = r;
                              player.personalVehiclesCount = r.length;

                              for (_i2 = 0; _i2 < player.personalVehiclesCount; _i2++) {
                                pos = JSON.parse(player.personalVehicles[_i2].pos);
                                rot = JSON.parse(player.personalVehicles[_i2].rot);
                                _color = JSON.parse(player.personalVehicles[_i2].color1);
                                _color2 = JSON.parse(player.personalVehicles[_i2].color2);

                                if (player.personalVehicles[_i2].model == model) {
                                  (function () {
                                    player.personalVehiclesList[_i2] = mp.vehicles["new"](mp.joaat(player.personalVehicles[_i2].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
                                      dimension: 0,
                                      numberPlate: 'STAGE',
                                      color: [_color, _color2]
                                    }); //player.personalVehiclesList[i].setColor(player.personalVehicles[i].color1, player.personalVehicles[i].color2)

                                    player.personalVehiclesList[_i2].setVariable('id', player.personalVehicles[_i2].id);

                                    player.setVariable("personalVehicle".concat(_i2), player.personalVehiclesList[_i2]);
                                    var vehicle = player.getVariable("personalVehicle".concat(_i2));
                                    DB.query('UPDATE vehicles SET loaded = 1 WHERE id = ?', [vehicle.getVariable("id")], function (err, r) {
                                      if (err) console.log(err);
                                      console.log('Загружена машина ' + vehicle.getVariable("id"));
                                    });
                                    var invTemp = {
                                      slot: slotTo,
                                      name: 'Ключ от машины',
                                      desc: "\u041A\u043B\u044E\u0447 \u043E\u0442 ".concat(model.toUpperCase(), " (").concat(vehicle.getVariable("id"), ")"),
                                      type: 'carkey',
                                      carId: vehicle.getVariable("id"),
                                      weight: 0.5,
                                      img: './systems/inventory/img/items/carkey.png'
                                    };
                                    parsedItems.push(invTemp);
                                    toInv = JSON.stringify(parsedItems);
                                    console.log(toInv);
                                    DB.query('UPDATE characters SET items = ? WHERE login = ?', [toInv, player.login], function (err, r) {
                                      if (err) return console.log(err);
                                    });
                                  })();
                                }
                              }

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    }));

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }, 5000));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
mp.events.add('playerJoined', function (player) {
  loadVehicles(player);
  player.setVariable('towtrucks', 0);
});
mp.events.addCommand('cars', function (player) {
  var carsArray = player.personalVehicles;
  player.call('cars_show::CLIENT', [JSON.stringify(carsArray)]);
});
mp.events.addCommand('park', function (player) {
  var carsArray = player.personalVehicles;
  var rotation = player.vehicle.rotation;
  var position = player.vehicle.position;
  var nowCar;
  nowCar = carsArray.find(function (item) {
    return item.id === player.vehicle.getVariable('id');
  });

  try {
    if (player.vehicle.getVariable('id') == nowCar.id) {
      DB.query('UPDATE vehicles SET parkpos = ?, parkrot = ? WHERE id = ?', [JSON.stringify(position), JSON.stringify(rotation), player.vehicle.getVariable('id')], function (err, r) {
        return chat.addNotify(player, 1, "\u0412\u044B \u043F\u0440\u0438\u043F\u0430\u0440\u043A\u043E\u0432\u0430\u043B\u0438 \u043C\u0430\u0448\u0438\u043D\u0443.", 7000);
      });
    } else {
      return chat.addNotify(player, 2, "\u0412\u044B \u043D\u0435 \u0432\u043B\u0430\u0434\u0435\u0435\u0442\u0435 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u043E\u0439", 7000);
    }
  } catch (e) {
    return chat.addNotify(player, 2, "\u0412\u044B \u043D\u0435 \u0432\u043B\u0430\u0434\u0435\u0435\u0442\u0435 \u044D\u0442\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u043E\u0439", 7000);
  }
});
mp.events.add('console_log', function (player, obj) {
  console.log(obj);
  console.log('from client');
});
mp.events.add('TOWTRUCK::SERVER', function (player, carArray) {
  towtruckVehicle(player, carArray);
});
mp.events.add('GPSCAR::SERVER', function (player, carArray) {
  player.call('cars_show::CLIENT', [JSON.stringify(carsArray)]);
});

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

function towtruckVehicle(player, carObject) {
  var spawnedCar, carObj, vehicle;
  return regeneratorRuntime.async(function towtruckVehicle$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          carObj = JSON.parse(carObject);

          if (!(player.getMoney() <= 100)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", chat.addNotify(player, 2, "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0435\u043D\u0435\u0433", 7000));

        case 3:
          player.removeMoney(100);
          vehicle = JSON.parse(carObject);

          try {
            player.personalVehiclesList[carObj.selectedId].destroy(); //player.personalVehiclesList = player.personalVehiclesList.splice(carObj.selectedId, 1);
          } catch (e) {
            console.log(e);
          }

          player.setVariable('towtrucks', player.getVariable('towtrucks') + 1);
          chat.addNotify(player, 1, "\u0412\u044B \u044D\u0432\u0430\u043A\u0443\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u043C\u0430\u0448\u0438\u043D\u0443 \u0437\u0430 100$", 7000);
          DB.query('SELECT * FROM vehicles WHERE id = ?', [carObj.id], function (err, r) {
            var pos = JSON.parse(r[0].parkpos);
            var rot = JSON.parse(r[0].parkrot);
            var color1 = JSON.parse(r[0].color1);
            var color2 = JSON.parse(r[0].color2);
            player.personalVehiclesList[carObj.selectedId] = mp.vehicles["new"](mp.joaat(r[0].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
              heading: rot.z,
              dimension: player.dimension,
              numberPlate: 'DEREBAS',
              color: [color1, color2]
            });
            player.personalVehiclesList[carObj.selectedId].setVariable('id', player.personalVehicles[carObj.selectedId].id);
            player.setVariable("personalVehicle".concat(carObj.selectedId), player.personalVehiclesList[carObj.selectedId]);
            player.personalVehiclesList[carObj.selectedId].setVariable('id', r[0].id);

            if (r[0].loaded == 0) {
              return;
            }
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function loadVehicles(player) {
  return regeneratorRuntime.async(function loadVehicles$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          player.personalVehiclesList = [];
          DB.query('SELECT * FROM vehicles WHERE login = ?', [player.login], function (err, r) {
            if (err) return console.log(err);
            player.personalVehicles = r;
            player.personalVehiclesCount = r.length;

            for (var _i3 = 0; _i3 <= player.personalVehiclesCount; _i3++) {
              var pos = JSON.parse(player.personalVehicles[_i3].pos);
              var rot = JSON.parse(player.personalVehicles[_i3].rot);
              var color1 = JSON.parse(player.personalVehicles[_i3].color1);
              var color2 = JSON.parse(player.personalVehicles[_i3].color2);

              if (player.personalVehicles[_i3].loaded == 0) {
                (function () {
                  player.personalVehiclesList[_i3] = mp.vehicles["new"](mp.joaat(player.personalVehicles[_i3].model), new mp.Vector3(parseFloat(pos.x), parseFloat(pos.y), parseFloat(pos.z)), {
                    heading: rot.z,
                    dimension: player.dimension,
                    numberPlate: 'DEREBAS',
                    color: [color1, color2]
                  });

                  player.personalVehiclesList[_i3].setColor(player.personalVehicles[_i3].color1, player.personalVehicles[_i3].color2);

                  player.personalVehiclesList[_i3].setVariable('id', player.personalVehicles[_i3].id);

                  player.setVariable("personalVehicle".concat(_i3), player.personalVehiclesList[_i3]);
                  var vehicle = player.getVariable("personalVehicle".concat(_i3));
                  DB.query('UPDATE vehicles SET loaded = 1 WHERE id = ?', [vehicle.getVariable("id")], function (err, r) {
                    if (err) console.log(err);
                    console.log('Загружена машина ' + vehicle.getVariable("id"));
                  });
                })();
              } else {
                player.personalVehiclesList[_i3].setColor(player.personalVehicles[_i3].color1, player.personalVehicles[_i3].color2);

                player.personalVehiclesList[_i3].setVariable('id', player.personalVehicles[_i3].id);

                player.setVariable("personalVehicle".concat(_i3), player.personalVehiclesList[_i3]);
              }
            }
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}

mp.events.add('playerQuit', function (player) {
  var _loop = function _loop(_i4) {
    var vehicle = player.getVariable("personalVehicle".concat(_i4));
    DB.query('UPDATE vehicles SET loaded = 0, pos = ?, rot = ? WHERE id = ?', [JSON.stringify(player.getVariable("personalVehicle".concat(_i4)).position), JSON.stringify(player.getVariable("personalVehicle".concat(_i4)).rotation), vehicle.getVariable("id")], function (err, r) {
      if (err) return console.log(err);
      console.log('Выгружена машина ' + vehicle.getVariable("id"));
    });
    player.getVariable("personalVehicle".concat(_i4)).destroy();
  };

  for (var _i4 = 0; _i4 < player.personalVehiclesCount; _i4++) {
    _loop(_i4);
  }
});