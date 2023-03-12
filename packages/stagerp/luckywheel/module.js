module.exports = {
    utils: 
    {
        randomInt(min, max) 
        {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    },
    win_list: 
    {
        0: 'Одежда',
        1: '10 Доната',
        2: '$2,000',
        3: '3,000 Фишек',
        4: '15 Доната',
        5: '25 Доната',
        6: '$1,000',
        7: '5,000 Фишек',
        8: 'Одежда',
        9: '7,500 Фишек',
        10: '6,000 Фишек',
        11: 'Секретная вещь',
        12: 'Одежда',
        13: '40 Доната',
        14: '$10,000',
        15: '25,000 Фишек',
        16: 'Одежда',
        17: '150 Доната',
        18: 'Машина',
        19: '$20,000'
    },
    time: 
    {
        waitFor: 0,
        blockTime: 14000 // ms
    },
    cometoluckywheel(player) 
    {
        const time = new Date().getTime();
        if (this.time.waitFor > time) 
        {  
            // Blocks the spinning of the lucky wheel after last spinning on 'blockTime'
            player.notify(`Подожди!`);
        } 
        else 
        {
            // Here u need give the winnings
            this.time.waitFor = time + this.time.blockTime;
            const value = this.utils.randomInt(0, 19);
            player.forLuckyWheel = { call: false, win: value };
            player.call('luckywheel.cometoluckywheel', [value]);
        }
    },
    spin(player) 
    {
        if (player.forLuckyWheel && !player.forLuckyWheel.call) 
        {
            player.forLuckyWheel.call = true;
            mp.players.callInRange(player.position, 50, 'luckywheel.spin', [player.forLuckyWheel.win]);
        }
    },
    finishSpin(player) 
    {
        if (player.forLuckyWheel) 
        {
            let chat = require('../events/hud');
            chat.addNotify(player, 3, `Вы выйграли: ${this.win_list[player.forLuckyWheel.win]}`, 7000)
            player.forLuckyWheel = undefined;
        } 
    }
};