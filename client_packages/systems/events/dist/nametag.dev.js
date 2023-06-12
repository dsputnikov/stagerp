"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var maxDistance = 25 * 25;
var width = 0.03;
var height = 0.0065;
var border = 0.001;
var color = [255, 255, 255, 255];
var player = mp.players.local;
mp.nametags.enabled = false;
mp.events.add('render', function (nametags) {
  var graphics = mp.game.graphics;
  var screenRes = graphics.getScreenResolution(0, 0);
  nametags.forEach(function (nametag) {
    var _nametag = _slicedToArray(nametag, 4),
        player = _nametag[0],
        x = _nametag[1],
        y = _nametag[2],
        distance = _nametag[3];

    if (distance <= maxDistance) {
      var scale = distance / maxDistance;
      if (scale < 0.6) scale = 0.6;
      var health = player.getHealth();
      health = health < 100 ? 0 : (health - 100) / 100;
      var armour = player.getArmour() / 100;
      y -= scale * (0.005 * (screenRes.y / 1080));
      graphics.drawText("".concat(player.name.replace('_', ' '), " (").concat(player.getVariable('id'), ")"), [x, y], {
        font: 4,
        color: color,
        scale: [0.4, 0.4],
        outline: true
      });
    }
  });
});