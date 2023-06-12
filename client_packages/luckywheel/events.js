const luckywheel = require('luckywheel/module'),
player = mp.players.local;
let browser = mp.browsers.new('package://browser/index.html')


mp.events.add(
{
    'render': () => 
    {
        const data = luckywheel.interaction;
        if (mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, data.pos.x, data.pos.y, data.pos.z, true) < data.radius)
        {
            if (!data.isNear)
            {
                data.isNear = true;
                mp.keys.bind(luckywheel.interaction.button, false, luckywheel.onClick);
                mp.events.call('HUD_addNotify::CLIENT',3,"Нажмите E Чтобы крутить колесо",3000)
            }
        }
        else if (data.isNear)
        {
            data.isNear = false;
            mp.keys.unbind(luckywheel.interaction.button, false, luckywheel.onClick);
            data.clearNotify();
        }
    },
    'luckywheel.cometoluckywheel': (pos) => 
    {
        luckywheel.comeToLuckyWheel(pos);
    },
    'luckywheel.spin': (pos) => 
    {
        luckywheel.object.spin(pos);
    }
});