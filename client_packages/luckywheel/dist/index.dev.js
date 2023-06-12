"use strict";

require('luckywheel/events');

var browser = mp.browsers["new"]('package://browser/index.html');
var player = mp.players.local; // Init wheel object

var luckywheel = require('luckywheel/module');

luckywheel.init(); // IPL for casino

var ipl_list = ['vw_casino_main', 'hei_dlc_windows_casino', 'hei_dlc_casino_door', 'hei_dlc_casino_aircon'];

for (var i = 0; i < ipl_list.length; i++) {
  mp.game.streaming.requestIpl(ipl_list[i]);
}