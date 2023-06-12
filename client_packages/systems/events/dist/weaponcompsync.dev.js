"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Natives = {
  GIVE_WEAPON_COMPONENT_TO_PED: "0xD966D51AA5B28BB9",
  REMOVE_WEAPON_COMPONENT_FROM_PED: "0x1E8BE90C74FB4C09",
  SET_CURRENT_PED_WEAPON: "0xADF692B254977C0C"
};

function addComponentToPlayer(player, weaponHash, componentHash) {
  if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
  if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

  player.__weaponComponentData[weaponHash].add(componentHash);

  mp.game.invoke(Natives.GIVE_WEAPON_COMPONENT_TO_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

function removeComponentFromPlayer(player, weaponHash, componentHash) {
  if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
  if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

  player.__weaponComponentData[weaponHash]["delete"](componentHash);

  mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

mp.events.add("updatePlayerWeaponComponent", function (player, weaponHash, componentHash, removeComponent) {
  weaponHash = parseInt(weaponHash, 36);
  componentHash = parseInt(componentHash, 36);

  if (removeComponent) {
    removeComponentFromPlayer(player, weaponHash, componentHash);
  } else {
    addComponentToPlayer(player, weaponHash, componentHash);
  }
});
mp.events.add("resetPlayerWeaponComponents", function (player, weaponHash) {
  if (!player.hasOwnProperty("__weaponComponentData")) return;
  if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) return;
  weaponHash = parseInt(weaponHash, 36);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = player.__weaponComponentData[weaponHash][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var component = _step.value;
      mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  player.__weaponComponentData[weaponHash].clear();
});
mp.events.add("nukePlayerWeaponComponents", function (player) {
  if (!player.hasOwnProperty("__weaponComponentData")) return;

  for (var weapon in player.__weaponComponentData) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = player.__weaponComponentData[weapon][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var component = _step2.value;
        mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weapon >> 0, component >> 0);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  player.__weaponComponentData = {};
});
mp.events.add("entityStreamIn", function (entity) {
  if (entity.type === "player") {
    var data = entity.getVariable("currentWeaponComponents");

    if (data) {
      var _data$split = data.split("."),
          _data$split2 = _slicedToArray(_data$split, 2),
          weaponHash = _data$split2[0],
          components = _data$split2[1];

      weaponHash = parseInt(weaponHash, 36);
      var componentsArray = components && components.length > 0 ? components.split('|').map(function (hash) {
        return parseInt(hash, 36);
      }) : []; // don't touch this or you will have a bad time

      entity.giveWeapon(weaponHash, -1, true);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = componentsArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var component = _step3.value;
          addComponentToPlayer(entity, weaponHash, component);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
    }
  }
});
mp.events.add("entityStreamOut", function (entity) {
  if (entity.type === "player" && entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};
});
mp.events.addDataHandler("currentWeaponComponents", function (entity, value) {
  if (entity.type === "player" && entity.handle !== 0) {
    if (!entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};

    var _value$split = value.split("."),
        _value$split2 = _slicedToArray(_value$split, 2),
        weaponHash = _value$split2[0],
        components = _value$split2[1];

    weaponHash = parseInt(weaponHash, 36);
    if (!entity.__weaponComponentData.hasOwnProperty(weaponHash)) entity.__weaponComponentData[weaponHash] = new Set();
    var currentComponents = entity.__weaponComponentData[weaponHash];
    var newComponents = components && components.length > 0 ? components.split('|').map(function (hash) {
      return parseInt(hash, 36);
    }) : [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = currentComponents[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var component = _step4.value;
        if (!newComponents.includes(component)) removeComponentFromPlayer(entity, weaponHash, component);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = newComponents[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _component = _step5.value;
        addComponentToPlayer(entity, weaponHash, _component);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
    entity.__weaponComponentData[weaponHash] = new Set(newComponents);
  }
});