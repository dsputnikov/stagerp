try{

// Модули, утилиты, методы

require('./modules/mysql'); // База данных
require('./modules/methods'); // Методы
require('./utilities/time'); // Система времени
require('./utilities/weather'); // Система погоды
require('./utilities/items'); // Предметы
require('./utilities/death'); // Система смерти

// Основное

require('./events/basic/auth'); // Авторизация/регистрация
require('./events/basic/pedCreator'); // Создание персонажа
require('./events/basic/charselector'); // Выбор персонажа
require('./events/basic/hud'); // Худ
require('./events/basic/money'); // Деньги
require('./events/basic/voice'); // Голосовой чат
require('./events/basic/weaponcompsync'); // Оружия и их улучшения

// Бизнесы

require('./business/rent'); // Аренда ТС
require('./business/autosalon'); // Автосалон
require('./business/bank'); // Банк

// Events

require('./events/admin'); // Админ система
require('./events/commands'); // Команды
require('./events/inventory'); // Инвентарь
require('./events/houses'); // Дома
require('./events/menu'); // Меню

// Работы

require('./jobs/farm');
require('./jobs/bus');
require('./jobs/lawnmower');
require('./jobs/taxi');

// Ораганизации

require('./fractions/index'); // Основное

        // Гос
        
        require('./fractions/gov/autoschool');

        // Крайм

        require('./fractions/ghetto/ghetto_zones');
        require('./fractions/ghetto/aztecas');



mp.events.add('console_log', (player,arg) => {
    console.log(arg);
})

mp.events.add('OnPlayerExitVehicle',(player) => {
        if(player.getConfigFlag(32) == false) {
        player.setConfigFlag(32, true);
        mp.events.call('Hud_addNotify::SERVER',3,"Вы отстегнули ремень безопасности",7000)
        }
})

}

catch(err){
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
mp.world.requestIpl("shr_int");
mp.world.requestIpl("shr_int_lod");
mp.world.requestIpl("gabz_mrpd_milo_");
mp.world.requestIpl("TrevorsTrailerTidy");

//my apa_v_mp_h_01_a
exports.getClearSlot = getClearSlot;