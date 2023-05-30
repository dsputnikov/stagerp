"use strict";

var chat = require('./hud');

var methods = require('../modules/methods');

var items = require('../utilities/items');

mp.events.add('Inventory_loadPlayerItems::SERVER', function (player) {
  DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function (err, r) {
    player.call('Inventory_openWindow::CLIENT', [r[0].items]);
  });
});
mp.events.add('Inventory_syncItems::SERVER', function (player, items) {
  DB.query('UPDATE characters SET items = ? WHERE login = ?', [items, player.getVariable('login')], function (err, r) {
    if (err) return console.log(err);
  });
});
mp.events.add('clog', function (player, items) {
  console.log(items);
});
mp.events.add('Inventory_useItem::CLIENT', function (item) {
  console.log(item);
  console.log('used');
});
mp.events.add('Inventory_addItem::SERVER', function (player, item, count) {
  console.log(player.inventoryitems);
  DB.query('UPDATE characters SET items = ? WHERE id = ?', [player.getVariable('id')]);
});
mp.events.add('Inventory_equipClothes::SERVER', function _callee2(player, data) {
  var cloth, clothId, clothTexture, clothColor;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cloth = JSON.parse(data);
          clothId = cloth[0];
          clothTexture = cloth[1];
          clothColor = cloth[2];
          player.setClothes(clothId, clothTexture, clothColor, 0);
          DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function _callee(err, r) {
            var allItems, parsedItems, arr, nowClothIndex;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    allItems = r[0].items;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(JSON.parse(allItems));

                  case 3:
                    parsedItems = _context.sent;
                    arr = parsedItems;
                    nowClothIndex = arr.findIndex(function (item) {
                      return item.componentId === clothId && item.textureId === clothTexture && item.isOnPlayer === false;
                    });
                    parsedItems[nowClothIndex].slot = 0;
                    parsedItems[nowClothIndex].isOnPlayer = true;
                    DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')]);

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
mp.events.add('Inventory_unequipClothes::SERVER', function _callee4(player, data) {
  var cloth, clothId, slotToSet;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          cloth = JSON.parse(data);
          clothId = cloth[0];
          slotToSet = cloth[1];
          player.setClothes(clothId, 0, 0, 0);
          DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function _callee3(err, r) {
            var allItems, parsedItems, arr, nowClothIndex;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    allItems = r[0].items;
                    _context3.next = 3;
                    return regeneratorRuntime.awrap(JSON.parse(allItems));

                  case 3:
                    parsedItems = _context3.sent;
                    arr = parsedItems;
                    nowClothIndex = arr.findIndex(function (item) {
                      return item.componentId === clothId && item.isOnPlayer === true;
                    });
                    parsedItems[nowClothIndex].isOnPlayer = false;
                    parsedItems[nowClothIndex].slot = slotToSet;
                    DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')]);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});