
let open = false;

let open2 = false;

mp.keys.bind(0x31, true, function () {
    if (chatOpened == true) return;
    browser.execute(`Inventory.useItem(true,1);`)
});

mp.keys.bind(0x32, true, function () {
    if (chatOpened == true) return;
    browser.execute(`Inventory.useItem(true,2);`)
});

mp.keys.bind(0x33, true, function () {
    if (chatOpened == true) return;
    browser.execute(`Inventory.useItem(true,3);`)
});

mp.keys.bind(0x49, true, function () {
    if (chatOpened == true) return;
    mp.events.callRemote('Inventory_loadPlayerItems::SERVER')
});

mp.events.add('Inventory_openWindow::CLIENT', async (items) => {
        if(open){
        browser.call('Inventory_open::CEF',false,items)
        open = false;
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayRadar(true);
        mp.events.call('HUD_setShow::CLIENT', true)
        browser.call('Inventory_clearSlots::CEF', items)
        }else{

    browser.call('Inventory_open::CEF',true,items)
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.events.call('HUD_setShow::CLIENT', false)
    open = true;
        }
})

mp.events.add('Inventory_openWindow2::CLIENT', async () => {

    await mp.events.callRemote('Inventory_loadPlayerItems::SERVER')

})

mp.events.add('Inventory_useItem::CLIENT', (item) => {

    mp.events.callRemote('Inventory_useItem::SERVER',item);

})

mp.events.add('Inventory_syncItems::CLIENT', (items) => {
    mp.events.callRemote('Inventory_syncItems::SERVER',items)
})

mp.events.add('Inventory_clearSlots::CLIENT', (none) => {

browser.call('Inventory_clearSlots::CEF');

})

mp.events.add('Inventory_equipClothes::CLIENT', (data) => {
    mp.events.callRemote('Inventory_equipClothes::SERVER',data);
})

mp.events.add('Inventory_unequipClothes::CLIENT', (data) => {
    mp.events.callRemote('Inventory_unequipClothes::SERVER',data);
})

mp.events.add('xdddd',(vehicle,seat) => {
    player.setIntoVehicle(vehicle.handle, parseInt(seat));
})