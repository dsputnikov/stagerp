let chat = require('./hud');
let methods = require('../modules/methods');
let items = require('../utilities/items');

mp.events.add('Inventory_loadPlayerItems::SERVER', (player) => {
    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function (err, r) {
        player.call('Inventory_openWindow::CLIENT', [r[0].items]);
    })
})

mp.events.add('Inventory_syncItems::SERVER', (player,items) => {
    DB.query('UPDATE characters SET items = ? WHERE login = ?', [items,player.getVariable('login')],function (err, r) {
        if(err) return console.log(err)
    })
})

mp.events.add('clog', (player,items) => {
    console.log(items);
})

mp.events.add('Inventory_useItem::CLIENT', (item) => {

        console.log(item);
        console.log('used');

})

mp.events.add('Inventory_addItem::SERVER', (player, item, count) => {
    console.log(player.inventoryitems)
    DB.query('UPDATE characters SET items = ? WHERE id = ?', [player.getVariable('id')])
})

mp.events.add('Inventory_equipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = cloth[0]
    let clothTexture = cloth[1]
    let clothColor = cloth[2]

    player.setClothes(clothId, clothTexture, clothColor, 0);



    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.textureId === clothTexture && item.isOnPlayer === false);

        parsedItems[nowClothIndex].slot = 0;
        parsedItems[nowClothIndex].isOnPlayer = true;

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
    
})

mp.events.add('Inventory_unequipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = cloth[0]
    let slotToSet = cloth[1]

    player.setClothes(clothId, 0, 0, 0);

    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.isOnPlayer === true);

        parsedItems[nowClothIndex].isOnPlayer = false;
        parsedItems[nowClothIndex].slot = slotToSet;

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
    
})