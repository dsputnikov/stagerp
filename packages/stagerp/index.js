try{
require('./modules/mysql');
require('./modules/methods');

require('./events/auth'); // Авторизация
require('./events/pedCreator'); // Создание персонажа
require('./events/charselector'); // Выбор персонажа
require('./events/admin'); // Админ система
require('./events/hud'); // Худ
require('./events/autosalon'); // Автосалон
require('./events/money'); // Автосалон
require('./events/commands'); // Команды
require('./events/bank'); // Банк
require('./events/time'); // Сиситема времени
require('./events/inventory'); // Инвентарь
require('./events/voice'); // Войс чат
require('./events/weaponcompsync'); // Оружия и их улучшения
require('./events/houses'); // Дома
require('./events/menu'); // Меню

//cas
require('./events/casino')
require('./luckywheel/index');
//

//car
require('./autosalon/auto');
//

// Работы

require('./jobs/farm')
require('./jobs/bus')
require('./jobs/lawnmower')
require('./jobs/taxi')

require('./config')


mp.events.add('console_log', (player,arg) => {
    console.log(arg);
})

mp.events.add('playerDeath',(player) => {
    player.spawn(player.position)
})
mp.events.add('OnPlayerExitVehicle',(player) => {
        if(player.getConfigFlag(32) == false) {
        player.setConfigFlag(32, true);
        mp.events.call('Hud_addNotify::SERVER',3,"Вы отстегнули ремень безопасности",7000)
        }
})

}catch(err){
    console.log(err)
}

function getMissingElement(superImportantArray){
    var numbers = {};
    for (var i = 1; i < 29; i++) {
        numbers[i] = true
    }
  
    for (var i = 0, l = superImportantArray.length; i < l; i++) {
        delete numbers[superImportantArray[i]];
    }
  
    return Object.keys(numbers);
  }

function getClearSlot(parsedItems) {

let slotTo;

let numberArray = []

parsedItems.forEach((element, index, array) => {
  if(element.slot == 0) return
    numberArray.push(element.slot)
});


let svobodniesloti = getMissingElement(numberArray)
slotTo = svobodniesloti[Math.floor(Math.random()*svobodniesloti.length)];

return slotTo;

}

mp.world.requestIpl("hei_dlc_windows_casino"); // зеркальные окна на здании
mp.world.requestIpl("hei_dlc_casino_door"); // рамка двери
mp.world.requestIpl("vw_dlc_casino_door"); // сами двери
mp.world.requestIpl("hei_dlc_casino_aircon"); // кондиционер на крыше
mp.world.requestIpl("vw_casino_main");
mp.world.requestIpl("vw_casino_garage");
mp.world.requestIpl("vw_casino_carpark"); 
mp.world.requestIpl("vw_casino_penthouse");

//my apa_v_mp_h_01_a
exports.getClearSlot = getClearSlot;