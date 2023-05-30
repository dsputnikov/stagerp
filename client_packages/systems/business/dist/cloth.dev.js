"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _methods = _interopRequireDefault(require("../modules/methods"));

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cloth = {};
var clothM = [];
var clothF = [];
var propM = [];
var propF = [];
var shopList = [];
var initCloth = false;

cloth.initCloth = function () {
  clothM = _enums["default"].clothM;
  clothF = _enums["default"].clothF;
  propM = _enums["default"].propM;
  propF = _enums["default"].propF;
  shopList = _enums["default"].shopList;

  _methods["default"].debug('Execute: cloth.initCloth');
};

var checkInit = function checkInit() {
  if (!initCloth) {
    cloth.initCloth();
    initCloth = !initCloth;
  }
};

cloth.getShopIdInRadius = function (pos, radius, id) {
  checkInit();

  for (var i = 0; i < shopList.length; i++) {
    if (shopList[i][2] != id) continue;
    if (_methods["default"].distanceToPos(pos, new mp.Vector3(shopList[i][3], shopList[i][4], shopList[i][5])) < radius) return ~~shopList[i][1];
  }

  return -1;
};

cloth.findNearest = function (pos) {
  checkInit();
  var shopPosPrew = new mp.Vector3(shopList[0][3], shopList[0][4], shopList[0][5]);

  for (var i = 0; i < shopList.length; i++) {
    if (shopList[i][2] != 0) continue;
    var shopPos = new mp.Vector3(shopList[i][3], shopList[i][4], shopList[i][5]);
    if (_methods["default"].distanceToPos(shopPos, pos) < _methods["default"].distanceToPos(shopPosPrew, pos)) shopPosPrew = shopPos;
  }

  return shopPosPrew;
};

cloth.buy = function (price, body, cloth, color, torso, torsoColor, parachute, parachuteColor) {
  var itemName = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "Одежда";
  var shopId = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
  var isFree = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
  var payType = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
  checkInit();

  _methods["default"].debug('cloth', price, body, cloth, color, torso, torsoColor, parachute, parachuteColor);

  mp.events.callRemote('server:business:cloth:buy', price, body, cloth, color, torso, torsoColor, parachute, parachuteColor, itemName, shopId, isFree, payType);
};

cloth.changeMask = function (cloth, color) {
  checkInit();
  mp.events.callRemote('server:business:cloth:changeMask', cloth, color);
};

cloth.buyMask = function (price, maskId) {
  var shopId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var payType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  checkInit();
  mp.events.callRemote('server:business:cloth:buyMask', price, maskId, shopId, payType);
};

cloth.change = function (body, cloth, color, torso, torsoColor, parachute, parachuteColor) {
  checkInit();
  mp.events.callRemote('server:business:cloth:change', body, cloth, color, torso, torsoColor, parachute, parachuteColor);
};

cloth.buyProp = function (price, body, cloth, color) {
  var itemName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Аксессуар";
  var shopId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var isFree = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var payType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  checkInit();
  mp.events.callRemote('server:business:cloth:buyProp', price, body, cloth, color, itemName, shopId, isFree, payType);
};

cloth.changeProp = function (body, cloth, color) {
  checkInit();
  mp.events.callRemote('server:business:cloth:changeProp', body, cloth, color);
};

var _default = cloth;
exports["default"] = _default;