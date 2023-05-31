"use strict";

var chat = require('./hud');

var methods = require('../modules/methods'); // Language


var config = require('../../../languages/config.js');

var language = config.language;

var translations = require("../../../languages/".concat(language, ".json"));

function pointingAt(distance) {
  var camera = mp.cameras["new"]("gameplay"); // gets the current gameplay camera

  var position = camera.getCoord(); // grab the position of the gameplay camera as Vector3

  var direction = camera.getDirection(); // get the forwarding vector of the direction you aim with the gameplay camera as Vector3

  var farAway = new mp.Vector3(direction.x * distance + position.x, direction.y * distance + position.y, direction.z * distance + position.z); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)

  var result = mp.raycasting.testPointToPoint(position, farAway, null, 17); // now test point to point - intersects with map and objects [1 + 16]

  return result; // and return the result ( undefined, if no hit )
}

mp.events.addCommand('veh', function (player, _, id, veh, color1, color2) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == undefined || veh == undefined) return chat.send(player, "!{#BAFE2A}".concat(translations.chat_info, "!{#FFFFFF} ").concat(translations.chat_use, " /veh [id] [Vehicle] [Color1] [Color2]"));
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  var cVeh = player.getVariable('AdminVeh' + player.id);

  if (cVeh != null) {
    cVeh.destroy();
  }

  var pos;
  pos = target.position;
  var AdminVeh = mp.vehicles["new"](mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
  AdminVeh.setColor(parseInt(color1), parseInt(color2));
  player.setVariable('AdminVeh' + player.id, AdminVeh);
  target.putIntoVehicle(AdminVeh, 0);
});
mp.events.addCommand('veh2', function (player, _, id, veh, color1, color2) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == undefined || veh == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [id] [Vehicle] [Color1] [Color2]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  var pos;
  pos = target.position;
  var AdminVeh = mp.vehicles["new"](mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
  AdminVeh.setColor(parseInt(color1), parseInt(color2));
  target.putIntoVehicle(AdminVeh, 0);
});
mp.events.addCommand('setspeed', function (player) {
  if (player.getVariable('adminlvl') < 5) return;

  if (player.getVariable('carspeedX') == 1) {
    player.setVariable('carspeedX', 0);
    chat.addNotify(player, 1, "\u0412\u044B \u0432\u044B\u043A\u043B\u044E\u0447\u0438\u043B\u0438 \u0441\u043F\u0438\u0434\u0445\u0430\u043A", 7000);
    chat.addNotify(player, 3, "\u0414\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0434\u0445\u0430\u043A\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \"/setspeed\"", 7000);
  } else {
    player.setVariable('carspeedX', 1);
    chat.addNotify(player, 1, "\u0412\u044B \u0432\u043A\u043B\u044E\u0447\u0438\u043B\u0438 \u0441\u043F\u0438\u0434\u0445\u0430\u043A, \u043D\u0430\u0436\u0438\u043C\u0430\u0439\u0442\u0435 \"X\" \u041A\u043E\u0433\u0434\u0430 \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0434\u0440\u0443\u0431\u0438\u0442\u044C \u0441\u043F\u0438\u0434\u0445\u0430\u043A", 7000);
    chat.addNotify(player, 3, "\u0414\u043B\u044F \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0434\u0445\u0430\u043A\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \"/setspeed\"", 7000);
  }
});
mp.events.addCommand('pos', function (player) {
  if (player.getVariable('adminlvl') < 1) return;
  chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Кординаты выведены в консоль');
  console.log("".concat(player.position.x, ", ").concat(player.position.y, ", ").concat(player.position.z, ", ").concat(player.heading));
});
mp.events.addCommand('posx', function (player) {
  if (player.getVariable('adminlvl') < 1) return;
  chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Кординаты выведены в консоль');

  if (player.vehicle) {
    console.log("{x: ".concat(player.vehicle.position.x, ", y: ").concat(player.vehicle.position.y, ", z: ").concat(player.vehicle.position.z, ", heading: ").concat(player.vehicle.heading, "},"));
  } else {
    console.log("{x: ".concat(player.position.x, ", y: ").concat(player.position.y, ", z: ").concat(player.position.z, "},"));
  }
});
mp.events.addCommand('tppos', function (player, _, x, y, z) {
  if (player.getVariable('adminlvl') < 1) return;
  if (x == undefined || y == undefined || z == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tppos x y z');
  player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
  console.log("".concat(parseFloat(x), " ").concat(parseFloat(y), " ").concat(parseFloat(z)));
});
mp.events.addCommand('fixveh', function (player) {
  if (player.getVariable('adminlvl') < 1) return;
  if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000);
  player.vehicle.repair();
});
mp.events.addCommand('tp', function (player, id) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tp [id]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  player.position = target.position;
});
mp.events.addCommand('ipl', function (player, id) {
  if (player.getVariable('adminlvl') < 5) return;
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /ipl [id]');
  chat.addNotify(player, 1, "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0438 \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440 ".concat(id), 4000);
  mp.world.requestIpl(id);
});
mp.events.addCommand('tph', function (player, id) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [id] [Vehicle] [Color1] [Color2]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  target.position = player.position;
});
mp.events.addCommand('givemoney', function (player, _, id, amount) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null || amount == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givemoney [id] [count]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  if (isNaN(amount)) return chat.addNotify(player, 2, 'Некоректная сумма', 7000);
  target.giveMoney(amount);
  chat.send(target, "!{#BAFE2A}[\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F] !{#FFFFFF}\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 ".concat(player.name, " \u0432\u044B\u0434\u0430\u043B \u0432\u0430\u043C $").concat(amount, "!"));
});
mp.events.addCommand('removemoney', function (player, _, id, amount) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null || amount == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /removemoney [id] [count]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  if (isNaN(amount)) return chat.addNotify(player, 2, 'Некоректная сумма', 7000);
  target.removeMoney(amount);
  chat.send(target, "!{#BAFE2A}[\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F] !{#FFFFFF}\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 ".concat(player.name, " \u0437\u0430\u0431\u0440\u0430\u043B $").concat(amount, "!"));
});
mp.events.addCommand('o', function (player, args) {
  if (player.getVariable('adminlvl') < 1) return;
  if (args == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /o [Текст]');
  chat.sendAll("!{#FF0000}\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 ".concat(player.name, ": ").concat(args));
});
mp.events.addCommand('givegun', function (player, _, id, gun, ammo) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null || gun == null || ammo == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givegun [id] [gun] [ammo]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  target.giveWeapon(mp.joaat("weapon_".concat(gun)), parseInt(ammo));
});
mp.events.addCommand('setclothes', function (player, _, c, id, c1, c2) {
  if (player.getVariable('adminlvl') < 1) return;
  if (c == undefined || id == undefined) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setclothes [comp] [id]');
  player.setClothes(parseInt(c), parseInt(id), parseInt(c1), parseInt(c2));
});
mp.events.addCommand('setmod', function (player, _, modType, modIndex) {
  if (player.getVariable('adminlvl') < 1) return;
  if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000);
  player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
});
mp.events.addCommand('setseat', function (player, seat) {
  if (player.getVariable('adminlvl') < 1) return;
  if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000);
  player.call('xdddd', [player.vehicle, seat]);
});
mp.events.addCommand('a', function (player, text) {
  mp.players.forEach(function (_player) {
    if (_player.getVariable('adminlvl') > 1) {
      chat.send(_player, "!{#FF0000}[A] !{#FFFFFF}".concat(player.name, " \u0441\u043A\u0430\u0437\u0430\u043B: ").concat(text));
    }
  });
});
mp.events.addCommand('dimension', function (player, world) {
  if (player.getVariable('adminlvl') < 1) return;

  if (!world) {
    var playerDimension = player.dimension;
    chat.send(player, "!{#BAFE2A}[\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F] !{#FFFFFF}\u0412\u0430\u0448\u0435 \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0435: ".concat(playerDimension));
    return;
  }

  var dimension = parseInt(world);

  if (isNaN(dimension)) {
    chat.addNotify(player, 2, 'Укажите правильное числовое значение для измерения', 4000);
    return;
  }

  player.dimension = dimension;
  chat.addNotify(player, 1, "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F \u043D\u0430 ".concat(dimension), 4000);
});
mp.events.addCommand('freeze', function (player, _, id) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /freeze [id]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  chat.addNotify(target, 3, "\u0412\u044B \u0431\u044B\u043B\u0438 \u0437\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u044B", 4000);
  target.call('freezePlayer');
});
mp.events.addCommand('unfreeze', function (player, _, id) {
  if (player.getVariable('adminlvl') < 1) return;
  if (id == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /unfreeze [id]');
  var target = methods.getById(id);
  if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000);
  chat.addNotify(target, 3, "\u0412\u044B \u0431\u044B\u043B\u0438 \u0440\u0430\u0437\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u044B", 4000);
  target.call('unfreezePlayer');
});
mp.events.addCommand('kick', function (player, _, id) {
  if (player.adminlvl < 1) return;
  if (!id) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /kick [id]');
  var target = methods.getById(id);
  chat.addNotify(target, 3, "\u0418\u0433\u0440\u043E\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", 4000);
});
mp.events.addCommand('alvl', function (player) {
  if (player.getVariable('adminlvl') < 1) return;
  var alvl = player.getVariable('adminlvl');
  chat.addNotify(player, 1, "\u0412\u0430\u0448 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0430\u0434\u043C\u0438\u043D\u0430: ".concat(alvl), 4000);
});