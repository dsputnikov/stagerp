
var Inventory = new Vue({
    el: "#inventory",
    data: {
        active: false,
        player: {
            name: 'Clement Velasco',
            lvl: 1,
        },
        items: [
            { slot: 5, name: 'Рубашка', desc: 'Рубашка типо', type: 'clothes', componentId: 11, drawableId: 4, textureId: 0, paletteId: 0, weight: 0.5, img: './systems/inventory/img/items/32.png' },
        ],
        playerClothes: [
            { name: 'Торс', componentId: 11, drawableId: 1, textureId: 0, paletteId: 0 },
        ],
        list_items: [
            { slot: 1, name: 'Рубашка', desc: 'Одеть можно', type: 'clothes', componentId: 11, drawableId: 4, textureId: 0, paletteId: 0, weight: 0.5, img: './systems/inventory/img/items/7.png' },
        ],
        // Модальное окно
        modal: {
            active: false,
            posX: 0,
            posY: 0,
            img: './systems/inventory/img/items/7.png',
            weight: 0,
            count: 1,
            name: '',
            desc: ''
        },
        incar: 0,
        itemsCar: [
            { slot: 5, name: 'Двигатель', desc: 'ну движок', type: 'caritem', componentId: 0, drawableId: 5, textureId: 5, paletteId: 5, weight: 5, img: './systems/inventory/img/items/32.png' },
        ],
        currentItem: 0,
    },
    methods: {
        addItem(type, count) {
            let length = this.items.length;
            let id = length++;
            let list_item = this.list_items[type];

            this.items.push(list_item)
            this.updateInventory();
        },
        clickItem(i) {
            this.modal.active = true;
            this.modal.img = this.items[i].img;
            this.modal.name = this.items[i].name;
            this.modal.desc = this.items[i].desc;
            this.modal.weight = this.items[i].weight;
            this.modal.hide = this.items[i].hide;
            this.currentItem = i;
            let position = $(`.slot #${i}`).position();
            console.log(position)
            this.modal.posX = position.left + 50;
            this.modal.posY = position.top + 50;

            console.log(position)
            mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify(this.items));
        },
        useItem() {
            let citem = this.currentItem;
            let item = this.items[citem];

            this.modal.active = false;
            console.log(this.items)
            this.items.splice(citem, 1);
            $(`#${citem}`).detach();
            this.updateInventory();
            if ('alt' in window) {
                alt.emit('Inventory_useItem::CLIENT', item);
                alt.emit('Inventory_syncItems::CLIENT', this.items)
            }
        },
        dropItem() {
            this.modal.active = false;
            this.currentItem = 0;
        },
        updateInventory() {
            var $this = this;

            for (let i = 0; i < this.items.length; i++) {
                if(this.items[i].isOnPlayer == true) {
                    if(this.items[i].componentId == 11) {
                    $(`#clothes_top`).append(`
                    <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                `)
                    }
                    if(this.items[i].componentId == 4) {
                        $(`#clothes_legs`).append(`
                        <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                    `)
                        }
                        if(this.items[i].componentId == 8) {
                            $(`#clothes_underwear`).append(`
                            <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                        `)
                            }
                            if(this.items[i].componentId == 6) {
                                $(`#clothes_shoes`).append(`
                                <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                            `)
                                }
                                if(this.items[i].name.toLowerCase().includes('головной')) {
                                    $(`#clothes_cap:nth-child(1)`).append(`
                                    <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                                `)
                                    }
                                    if(this.items[i].name.toLowerCase().includes('очки')) {
                                        $(`#clothes_sunglasses`).append(`
                                        <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                                    `)
                                        }
                                            if(this.items[i].componentId == 1 && this.items[i].type == 'clothes') {
                                                $(`#clothes_mask`).append(`
                                                <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                                            `)
                                                }
                }else{
                $(`.slot:nth-child(${this.items[i].slot})`).append(`
                    <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                `)
                }
            }

            // player.setPropIndex(0, tempData.clothes[0], 0, true); // Головной убор
            // player.setPropIndex(1, tempData.clothes[5], 0, true);
            // player.setComponentVariation(11, tempData.clothes[1], 0, 0); // Верх
            // player.setComponentVariation(8, tempData.clothes[2], 0, 0); // Низ
            // player.setComponentVariation(4, tempData.clothes[3], 0, 0); // Штаны
            // player.setComponentVariation(6, tempData.clothes[4], 0, 0); // Капцы


            $this.updateDND();
        },
        clickEmpty() {
            if (this.modal.active == true) return this.modal.active = false;
        },
        updateDND() {
            var $this = this;
            $(".slot .item").draggable({ // ВЫБИРАЕМ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ ПЕРЕМЕЩАТЬ
                scroll: false, // ЗАПРЕЩАЕМ ПОЯВЛЕНИЮ SCROLL ВО ВРЕМЯ ПЕРЕМЕЩЕНИЯ
                helper: "clone", // ПРИ ПЕРЕМЕЩЕНИИ СОЗДАЕТ КЛОНА
                cursor: "pointer", // КУРСОР В СТИЛЕ POINTER
                zIndex: 27, // ОТОБРАЖЕНИЕ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА СВЕРХУ  
                // distance: 0,
                drag: function (event, ui) {
                    item_isStackable = $(this).hasClass("stackable");
                },
            });

            

            $(".slot").droppable({ // Элемент который будет принимать для себя предметы
                accept: ".item", // Принимаемые элементы
                drop: async function (event, ui) { 
                    let id = ui.draggable.attr('id');




                    // if($(this).attr('id') == 0) {
                    //     return;
                    // }




                    var item = $(this).find(".item");
                    if (item.length == 0) /// Просмотр, есть ли уже какие-либо предметы в выбранном в данный момент слоте инвентаря  //
                    {
                        //if($this.items[ui.draggable.attr('id')].isEquiped == true) return;
                        $this.items[id].slot = $(this).attr('id');


                        
                        if($this.items[id].isOnPlayer == true) {
                            await mp.trigger('Inventory_unequipClothes::CLIENT',JSON.stringify([$this.items[id].componentId, $this.items[id].slot]))
                            $this.items[id].isOnPlayer = false
                            return ui.draggable.detach().appendTo($(this));
                            //$this.items[id].isOnPlayer = false;
                            //$this.items[id].textureId = 0;
                            //return mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify($this.items))
                        }


                        await mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify($this.items))
                        mp.trigger('console_cef', $(this).attr('id') + ' dd');
                        ui.draggable.detach().appendTo($(this)); // если нет, вставьте предмет в свободный слот ///
                    }
                    // else if (ui.draggable.attr('id') == 0) { // если id предметов совпадают
                    //     this.i++;
                    //     ui.draggable.detach();  /// Если предметы совпадают, уничтожьте клона и добавьте + 1 к количеству //
                    //     $(this).children().children().html(this.i)
                    //     return this.i;
                    // }
                    // else if (item_isStackable == true && item.children("item")) {
                    //     ui.draggable.detach(); /// Если да, просто уничтожьте клона //
                    //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                    // } else {
                    //     console.log(ui.draggable.attr('id'))
                    //     // в случае , если это не одинаковые предметы, верните элемент в предыдущее положение //
                    //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                    //     let idSlot = $(this).attr('id')
                    // }
                }
            });

            $(".player-skin-slot .item").draggable({ // ВЫБИРАЕМ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ ПЕРЕМЕЩАТЬ
                scroll: false, // ЗАПРЕЩАЕМ ПОЯВЛЕНИЮ SCROLL ВО ВРЕМЯ ПЕРЕМЕЩЕНИЯ
                helper: "clone", // ПРИ ПЕРЕМЕЩЕНИИ СОЗДАЕТ КЛОНА
                cursor: "pointer", // КУРСОР В СТИЛЕ POINTER
                zIndex: 27, // ОТОБРАЖЕНИЕ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА СВЕРХУ  
                // distance: 0,
                drag: function (event, ui) {
                    item_isStackable = $(this).hasClass("stackable");
                },
            });
    
            $(".player-skin-slot").droppable({
                accept: '.item',
                drop(event, ui) {
                    var item = $(this).find(".item");
                    let i = ui.draggable.attr('id');
                        mp.trigger('Inventory_equipClothes::CLIENT',JSON.stringify([$this.items[i].componentId, $this.items[i].textureId, $this.items[i].drawableId]))
                        ui.draggable.detach().appendTo($(this));
                        $this.items[i].isOnPlayer = true;
                        $this.items[i].slot = 0;
                }
            })

        }
    },
    mounted() {

        var $this = this;
        // $this.addItem(0, 2)
        // this.addItem(2, 2)
        // $this.updateInventory()

       

        // 
        mp.events.add('Inventory_open::CEF', (bool, items) => {
            $this.active = bool;
            let itm = JSON.parse(items)
            if (items == null || items == 0) return;
            $this.items = itm;
            $this.updateInventory()
        })

        mp.events.add('Inventory_clearSlots::CEF', (items) => {
            $('.slots').contents(':not(img)').empty();
            $('.player-skin-slot').contents(':not(img)').empty();
            $('.player-skin-slot').children().not('#default').remove();
            var seen = {};
$('.player-skin-slot').each(function() {
    var img = $(this).img();
    if (seen[img])
        $(this).remove();
    else
        seen[img] = true;
});

        })
    }
})

function clickItem(i) {
    Inventory.clickItem(i);
}