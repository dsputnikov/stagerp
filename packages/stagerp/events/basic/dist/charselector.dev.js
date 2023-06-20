"use strict";

var chat = require("./hud"); // Language


var config = require('../../../../languages/config.js');

var language = config.language;

var translations = require("../../../../languages/".concat(language, ".json"));

mp.events.add("loadCharacter::SERVER", function (player) {
  DB.query("SELECT * FROM characters WHERE login = ?", [player.login], function (err, r) {
    if (err) return console.log(err);

    if (r[0]) {
      var model = r[0].gender == 0 ? "mp_m_freemode_01" : "mp_f_freemode_01";
      var spawn = r[0].lastPos.split(",");
      player.model = mp.joaat(model);
      player.dimension = r[0].dimension;
      player.name = "".concat(r[0].Name, "_").concat(r[0].Surname);
      player.setMoney(r[0].money);
      player.setVariable("id", r[0].id);
      player.setVariable("logged", true);
      player.setVariable("Taxi_orderedStatus", false);
      player.setVariable("preworkTaxi", false);
      player.setVariable("taxiWork", false);
      player.setVariable("Taxi_orderExecutionStatus", false);
      player.setVariable("Taxi_driverArrived", false);
      player.gender = r[0].gender;
      player.level = r[0].lvl;
      player.pesronalPropety = [];
      DB.query("SELECT * from bank WHERE id = ?", [player.getVariable("id")], function (err, r) {
        if (err) return console.log(err);

        if (r[0]) {
          player.setBankMoney(r[0].money);
        }
      });
      chat.send(player, "!{#FFFFFF}".concat(translations.chat_welcome, "!{#FFFFFF} ").concat(translations.chat_stage, "!{#9AD450} 2.0.12dev"));
      chat.send(player, "".concat(translations.chat_update, "!{#0077FF} ").concat(translations.chat_discord));
      chat.addNotify(player, 1, "".concat(translations.chat_player, " ").concat(player.name), 7000);

      if (player.getVariable("adminlvl") >= 1) {
        chat.send(player, "!{#E03444}".concat(translations.chat_admin, " ").concat(player.getVariable("adminlvl"), " ").concat(translations.chat_admin_level, "!"));
      }

      loadFace(player, r[0]);
      player.spawn(new mp.Vector3(parseFloat(spawn[0]), parseFloat(spawn[1]), parseFloat(spawn[2])));
    } else {
      player.setVariable("logged", false);
      mp.events.call("pedCreator_start::SERVER", player);
    }
  });
});

function loadFace(player, data) {
  var face, dnk, hair, i, value, items, hat, glasses, top, underwear, pants, shoes, mask, _i;

  return regeneratorRuntime.async(function loadFace$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          face = JSON.parse(data.pedFace);
          dnk = data.pedDnk.split(",");
          hair = JSON.parse(data.pedHair); // Лицоы

          player.setHeadBlend(Number(dnk[0]), Number(dnk[1]), 0, Number(dnk[0]), Number(dnk[1]), 0, Number(dnk[2] / 100), Number(dnk[3] / 100), 0);

          for (i = 0; i < face.length; i++) {
            value = face[i];
            player.setFaceFeature(i, parseFloat(value));
          }

          player.setHeadOverlay(2, [Number(hair[0]), 255, 1, 1]); // Брови

          player.setHeadOverlay(1, [Number(hair[3]), 255, 1, 1]); // Брови

          player.setClothes(2, Number(hair[2]), 0, 0); // Причесон
          // Одежда

          console.log('started loading');
          items = JSON.parse(data.items);
          hat = 11;
          glasses = 11;
          top = 0;
          underwear = 0;
          pants = 0;
          shoes = 0;
          mask = 0;

          for (_i = 0; _i < items.length; _i++) {
            if (items[_i].slot == 0) {
              if (items[_i].componentId === 1 && items[_i].type === 'props') {
                hat = items[_i].textureId;
              }

              if (items[_i].componentId == 1 && items[_i].type == 'clothes') {
                mask = items[_i].textureId;
              }

              if (items[_i].name.toLowerCase().includes('очки')) {
                glasses = items[_i].textureId;
              }

              if (items[_i].componentId == 11) {
                top = items[_i].textureId;
              }

              if (items[_i].componentId == 8) {
                underwear = items[_i].textureId;
              }

              if (items[_i].componentId == 4) {
                pants = items[_i].textureId;
              }

              if (items[_i].componentId == 6) {
                shoes = items[_i].textureId;
              } //console.log(items[i]);


              console.log(items[_i].name + ' ' + items[_i].textureId);
            }
          }

          _context.next = 20;
          return regeneratorRuntime.awrap(player.setProp(0, hat, 0));

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(player.setProp(1, glasses, 0));

        case 22:
          _context.next = 24;
          return regeneratorRuntime.awrap(player.setClothes(1, mask, 0, 0));

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(player.setClothes(3, 0, 0, 0));

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(player.setClothes(11, top, 0, 0));

        case 28:
          _context.next = 30;
          return regeneratorRuntime.awrap(player.setClothes(8, underwear, 0, 0));

        case 30:
          _context.next = 32;
          return regeneratorRuntime.awrap(player.setClothes(4, pants, 0, 0));

        case 32:
          _context.next = 34;
          return regeneratorRuntime.awrap(player.setClothes(6, shoes, 0, 0));

        case 34:
        case "end":
          return _context.stop();
      }
    }
  });
}

mp.events.add("Charselector_createCharacter::SERVER", function (player) {
  mp.events.call("pedCreator_start::SERVER", player);
});
mp.events.add("playerQuit", function _callee(player) {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          DB.query("UPDATE characters SET lastPos = ?, dimension = ? WHERE id = ?", [[player.position.x, player.position.y, player.position.z].toString(), player.dimension, player.getVariable("id")]);

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});