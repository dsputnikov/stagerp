"use strict";

var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local;
var luckywheel = {
  object: {
    name: 'vw_prop_vw_luckywheel_02a',
    pos: new mp.Vector3(1111.052, 229.8579, -49.133),
    model: undefined,
    isSpinning: false,
    animations: ['Enter_to_ArmRaisedIDLE', 'ArmRaisedIDLE_to_SpinningIDLE_High', 'SpinningIDLE_High', 'Win_Big'],
    getDictionary: function getDictionary() {
      return mp.players.local.getModel() == 1885233650 ? 'ANIM_CASINO_A@AMB@CASINO@GAMES@LUCKY7WHEEL@MALE' : 'ANIM_CASINO_A@AMB@CASINO@GAMES@LUCKY7WHEEL@FEMALE';
    },
    spin: function spin(pos, isOwner) {
      var spins, maxSpeed, speed;
      return regeneratorRuntime.async(function spin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.isSpinning) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              this.isSpinning = true;
              spins = 320, maxSpeed = 2.25;
              speed = maxSpeed / (spins * 2 + (pos + this.model.getRotation(1).y / 18) * 16 + 1);
              mp.game.audio.playSoundFromCoord(1, 'Spin_Start', this.pos.x, this.pos.y, this.pos.z, 'dlc_vw_casino_lucky_wheel_sounds', true, 0, false);

            case 6:
              if (!true) {
                _context.next = 34;
                break;
              }

              if (!(spins <= 0)) {
                _context.next = 28;
                break;
              }

              maxSpeed -= speed;
              this.model.setRotation(0, this.model.getRotation(1).y - maxSpeed, 0, 2, true);

              if (!(maxSpeed <= 0)) {
                _context.next = 26;
                break;
              }

              this.model.setRotation(0, Math.round(this.model.getRotation(1).y), 0, 2, true);
              mp.game.audio.playSoundFromCoord(1, 'Win', this.pos.x, this.pos.y, this.pos.z, "dlc_vw_casino_lucky_wheel_sounds", true, 0, false);
              this.isSpinning = false;

              if (!isOwner) {
                _context.next = 25;
                break;
              }

              mp.events.callRemote('luckywheel.finishspin');
              mp.players.local.taskPlayAnim(this.getDictionary(), this.animations[3], 4, -1000, -1, 1048576, 0, false, true, false);

            case 17:
              if (!true) {
                _context.next = 25;
                break;
              }

              if (!(mp.players.local.isPlayingAnim(this.getDictionary(), this.animations[3], 3) && mp.players.local.getAnimCurrentTime(this.getDictionary(), this.animations[3]) > 0.75)) {
                _context.next = 21;
                break;
              }

              mp.players.local.clearTasks();
              return _context.abrupt("break", 25);

            case 21:
              _context.next = 23;
              return regeneratorRuntime.awrap(mp.game.waitAsync(0));

            case 23:
              _context.next = 17;
              break;

            case 25:
              return _context.abrupt("break", 34);

            case 26:
              _context.next = 30;
              break;

            case 28:
              spins--;
              this.model.setRotation(0, this.model.getRotation(1).y - maxSpeed, 0, 2, true);

            case 30:
              _context.next = 32;
              return regeneratorRuntime.awrap(mp.game.waitAsync(5));

            case 32:
              _context.next = 6;
              break;

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  },
  interaction: {
    pos: new mp.Vector3(1110.8710, 228.8737, -49.6358),
    radius: 1,
    sendNotify: function sendNotify(text) {
      mp.game.ui.setTextComponentFormat('STRING');
      mp.game.ui.addTextComponentSubstringWebsite(text);
      mp.game.ui.displayHelpTextFromStringLabel(0, true, true, 1000);
    },
    clearNotify: function clearNotify() {
      mp.game.ui.clearHelp(true);
    },
    isNear: false,
    button: 0x45 // 'E'

  },
  onClick: function onClick() {
    if (luckywheel.object.isSpinning) {
      mp.events.call('HUD_addNotify::CLIENT', 2, "Колесо уже крутится", 7000);
      return;
    } // Here u can add time limiter


    mp.events.callRemote('luckywheel.cometoluckywheel');
  },
  comeToLuckyWheel: function comeToLuckyWheel(pos) {
    var dict, offset, isGoing;
    return regeneratorRuntime.async(function comeToLuckyWheel$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dict = this.object.getDictionary();
            mp.game.streaming.requestAnimDict(dict);

          case 2:
            if (mp.game.streaming.hasAnimDictLoaded(dict)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap(mp.game.waitAsync(0));

          case 5:
            _context2.next = 2;
            break;

          case 7:
            if (!(mp.players.local.getScriptTaskStatus(2106541073) != 1 && mp.players.local.getScriptTaskStatus(2106541073) != 0)) {
              _context2.next = 27;
              break;
            }

            offset = mp.game.ped.getAnimInitialOffsetPosition(dict, this.object.animations[0], 1111.052, 229.8492, -50.6409, 0, 0, 0, 0, 2);
            mp.players.local.taskGoStraightToCoord(offset.x, offset.y, offset.z, 1, 8000, 317, 0.001);

          case 10:
            if (mp.players.local.getScriptTaskStatus(2106541073) == 7 || mp.players.local.isAtCoord(offset.x, offset.y, offset.z, 0.1, 0.0, 0.0, false, true, 0)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 13;
            return regeneratorRuntime.awrap(mp.game.waitAsync(0));

          case 13:
            _context2.next = 10;
            break;

          case 15:
            mp.players.local.taskPlayAnim(dict, this.object.animations[0], 4, -1000, -1, 1048576, 0, false, true, false);

          case 16:
            if (!true) {
              _context2.next = 27;
              break;
            }

            if (mp.players.local.isPlayingAnim(dict, this.object.animations[0], 3) && mp.players.local.getAnimCurrentTime(dict, this.object.animations[0]) > 0.97) {
              mp.players.local.taskPlayAnim(dict, this.object.animations[1], 4, -1000, -1, 1048576, 0, false, true, false);
            }

            if (!mp.players.local.isPlayingAnim(dict, this.object.animations[1], 3)) {
              _context2.next = 23;
              break;
            }

            if (!isGoing && mp.players.local.getAnimCurrentTime(dict, this.object.animations[1]) > 0.04) {
              isGoing = true;
              this.object.spin(pos, true);
              mp.events.callRemote('luckywheel.spin');
            }

            if (!(mp.players.local.getAnimCurrentTime(dict, this.object.animations[1]) > 0.8)) {
              _context2.next = 23;
              break;
            }

            mp.players.local.taskPlayAnim(dict, this.object.animations[2], 8.0, 1.0, -1, 1, 1.0, false, false, false);
            return _context2.abrupt("break", 27);

          case 23:
            _context2.next = 25;
            return regeneratorRuntime.awrap(mp.game.waitAsync(0));

          case 25:
            _context2.next = 16;
            break;

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  },
  init: function init() {
    this.object.model = mp.objects["new"](mp.game.joaat(this.object.name), this.object.pos);
  }
};
exports = luckywheel;