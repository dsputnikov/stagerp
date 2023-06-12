"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

mp.events.add('pedCreator_start::SERVER', function (player) {
  player.position = new mp.Vector3(1976.890869140625, 3820.33203125, 33.45004653930664);
  player.heading = 90;
  player.dimension = player.id + 12;
  player.model = mp.joaat('mp_m_freemode_01');
  player.call('pedCreator_start::CLIENT');
});
mp.events.add('pedCreator_updateServer::SERVER', function (player, model) {
  player.model = mp.joaat(model); //player.position = pos;
  // player.rot = rot;

  player.call('pedCreator_update::CLIENT');
});
mp.events.add('blockCamera', function (player) {
  player.call('blockCamera');
});
mp.events.add('pedCreator_finishSync::SERVER', function _callee(player, _data) {
  var data, clothes, toItems, _datas, datas, _datas2;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = JSON.parse(_data);
          clothes = data.clothes;
          toItems = [{
            slot: 0,
            name: 'Верх',
            desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[1]),
            type: 'clothes',
            componentId: 11,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[1],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/top/1.png'
          }, {
            slot: 0,
            name: 'Штаны',
            desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[3]),
            type: 'clothes',
            componentId: 4,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[3],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/legs/1.png'
          }, {
            slot: 0,
            name: 'Нижняя одежда',
            desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[2]),
            type: 'clothes',
            componentId: 8,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[2],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/underwear/1.png'
          }, {
            slot: 0,
            name: 'Ботинки',
            desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[4]),
            type: 'clothes',
            componentId: 6,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[4],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/shoes/1.png'
          }];

          if (parseInt(clothes[0]) !== 0 && parseInt(clothes[0]) > 0) {
            datas = (_datas = {
              slot: 0,
              name: 'Головной убор',
              desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[0]),
              type: 'props',
              componentId: 0,
              drawableId: 0,
              isOnPlayer: true,
              spawn: true
            }, _defineProperty(_datas, "spawn", true), _defineProperty(_datas, "textureId", clothes[0]), _defineProperty(_datas, "paletteId", 0), _defineProperty(_datas, "weight", 0.5), _defineProperty(_datas, "img", './systems/inventory/img/items/clothes/hat/1.png'), _datas);
            toItems.push(datas);
          }

          if (parseInt(clothes[5]) !== 0 && parseInt(clothes[5]) > 0) {
            _datas2 = {
              slot: 0,
              name: 'Очки',
              desc: "\u0421 \u0431\u0438\u0440\u043A\u043E\u0439 ".concat(clothes[5]),
              type: 'props',
              componentId: 1,
              drawableId: 0,
              isOnPlayer: true,
              spawn: true,
              textureId: clothes[5],
              paletteId: 0,
              weight: 0.5,
              img: './systems/inventory/img/items/clothes/glasses/1.png'
            };
            toItems.push(_datas2);
          }

          console.log(toItems);
          _context.next = 8;
          return regeneratorRuntime.awrap(DB.query('INSERT INTO characters (login,Name,Surname,age,items,gender,pedDnk, pedFace, pedHair,lastPos) VALUES(?,?,?,?,?,?,?,?,?,?)', [player.login, data.name, data.surname, data.age, JSON.stringify(toItems), data.gender, [data.father, data.mother, data.faceMix, data.skinMix].toString(), JSON.stringify(data.structure), JSON.stringify(data.hair), '-1037.8990478515625, -2736.333251953125, 13.762728691101074'], function (err) {
            if (err) console.log(err);
            mp.events.call('loadCharacter::SERVER', player);
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});