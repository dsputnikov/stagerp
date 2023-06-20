const heading = require('../index.js');

mp.events.add('Inventory_loadPlayerItems::SERVER', (player) => {

    DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], function (err, r) {
        player.call('Inventory_openWindow::CLIENT', [r[0].items]);
    })

})

mp.events.add('console.log', (player, test) => {

    console.log(test);

})

mp.events.add('Inventory_syncItems::SERVER', (player,items) => {
    DB.query('UPDATE characters SET items = ? WHERE login = ?', [items,player.getVariable('login')],function (err, r) {
        if(err) return console.log(err)
    })
})

mp.events.add('clog', (player,items) => {
    console.log(items);
})

mp.events.add('Inventory_useItem::SERVER', async (player, item) => {

    console.log(item)

    let parsedItem = JSON.parse(item);

    if(parsedItem.isOnPlayer == true) {
            let arr = [parseInt(parsedItem.componentId), -5, parsedItem.type.toString()]
            let stringArr = JSON.stringify(arr);
            mp.events.call('Inventory_unequipClothes::SERVER', player, stringArr)
    }

    if(parsedItem.isOnPlayer == false) {
        let arr = [parseInt(parsedItem.componentId), parseInt(parsedItem.textureId), parseInt(parsedItem.drawableId), parsedItem.type.toString()];
        let stringArr = JSON.stringify(arr);
        mp.events.call('Inventory_equipClothes::SERVER', player, stringArr)
    }
})

mp.events.add('Inventory_addItem::SERVER', (player, item, count) => {
    console.log(player.inventoryitems)
    DB.query('UPDATE characters SET items = ? WHERE id = ?', [player.getVariable('id')])
})

mp.events.add('Inventory_equipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = parseInt(cloth[0])
    let clothTexture = parseInt(cloth[1])
    let clothColor = parseInt(cloth[2])
    let isProp = cloth[3]

    if(isProp == 'props') {
        player.setProp(clothId, clothTexture, clothColor);

        return DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
            let allItems = r[0].items
    
            let parsedItems = await JSON.parse(allItems);
        
            let arr = parsedItems;
    
            let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.textureId === clothTexture && item.isOnPlayer === false);
    
            parsedItems[nowClothIndex].slot = 0;
            parsedItems[nowClothIndex].isOnPlayer = true;
    
            DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])
    
        })

    }else{

    player.setClothes(clothId, clothTexture, clothColor, 0);



    return DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.textureId === clothTexture && item.isOnPlayer === false);

        parsedItems[nowClothIndex].slot = 0;
        parsedItems[nowClothIndex].isOnPlayer = true;

        DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
}
})

mp.events.add('Inventory_unequipClothes::SERVER', async (player, data) => {
    let cloth = JSON.parse(data)
    let clothId = parseInt(cloth[0])
    let slotToSet = parseInt(cloth[1])
    let isProp = cloth[2]

    if(isProp == 'props') {

        await player.setProp(clothId, 255, 0);

        return DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
            let allItems = r[0].items
    
            let parsedItems = await JSON.parse(allItems);
        
            let arr = parsedItems;
    
            let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.isOnPlayer === true && item.type == 'props');
    
            parsedItems[nowClothIndex].isOnPlayer = false;

            if(slotToSet == -5) {
                parsedItems[nowClothIndex].slot = heading.getClearSlot(parsedItems);
            }else{
                parsedItems[nowClothIndex].slot = slotToSet;
            }

    
            await DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

        })

    }else{

    await player.setClothes(clothId, 0, 0, 0);

    return DB.query('SELECT items FROM characters WHERE login = ?', [player.getVariable('login')], async function (err, r) {
        let allItems = r[0].items

        let parsedItems = await JSON.parse(allItems);
    
        let arr = parsedItems;

        let nowClothIndex = arr.findIndex(item => item.componentId === clothId && item.isOnPlayer === true);

        parsedItems[nowClothIndex].isOnPlayer = false;
        if(slotToSet == -5) {
            parsedItems[nowClothIndex].slot = heading.getClearSlot(parsedItems);
        }else{
            parsedItems[nowClothIndex].slot = slotToSet;
        }

        await DB.query('UPDATE characters SET items = ? WHERE login = ?', [JSON.stringify(parsedItems), player.getVariable('login')])

    })
    
}

})