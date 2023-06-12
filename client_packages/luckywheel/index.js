require('luckywheel/events');
let browser = mp.browsers.new('package://browser/index.html')
let player = mp.players.local;


// Init wheel object
const luckywheel = require('luckywheel/module');
luckywheel.init();

// IPL for casino
const ipl_list = 
[
    'vw_casino_main',
    'hei_dlc_windows_casino',
    'hei_dlc_casino_door',
    'hei_dlc_casino_aircon'
];

for (let i = 0; i < ipl_list.length; i++)
{
    mp.game.streaming.requestIpl(ipl_list[i]);
}
