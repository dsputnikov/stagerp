"use strict";

var chat = require('../../events/basic/hud');

var methods = require('../../modules/methods'); // let target = methods.getById(id);
// // DB.query('SELECT fraction, fraction_rank, fraction_leader FROM characters WHERE id = ?', [target.getVariable('id')], function(err, rows) {
// //     if (err) {
// //         console.error(err);
// //         return;
// //       }
// //     fraction = rows[0].fraction;
// //     fraction_rank = rows[0].fraction_rank;
// //     fraction_leader = rows[0].fraction_leader;
// //     })
// mp.events.addCommand('aztecas', (player, _, id) => {
//         fraction_info(); 
//         chat.addNotify(player, 1, `Ваша фракция: ${fraction}`, 4000); 
//     })