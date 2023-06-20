
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
        modal2: {
            active: false,
            posX: 0,
            posY: 0,
            img: './systems/inventory/img/items/7.png',
            weight: 0,
            count: 1,
            item: {},
            name: '',
            desc: ''
        },
        modal3: {
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
        startListen(b) {
            alert(b)
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
        rightClickItem(i, evx, evy) {
            this.modal2.active = true;
            console.log(evx + ' ' + evy)
            this.modal2.posX = evx -400;
            this.modal2.posY = evy - 300;
            //mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify(this.items));
        },
        fastSlot(i, evx, evy) {
            // this.modal2.active = true;
            // console.log(evx + ' ' + evy)
            // this.modal2.posX = evx -400;
            // this.modal2.posY = evy - 300;

            let $this = this;
            let citem = $this.currentItem;
            let item = $this.items[citem];

            this.modal2.item = item;

            this.modal2.active = false;
            this.modal3.active = true;

            //mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify(this.items));
        },
        async useItem(isFastSlot, num) {
            
            if(!isFastSlot) {

            let $this = this;
            let citem = $this.currentItem;
            let item = $this.items[citem];

            //this.items.splice(citem, 1);
            //await mp.trigger('Inventory_openWindow::CLIENT', JSON.stringify(Inventory.items));
            $(`#${citem}`).detach();
            await mp.trigger('Inventory_useItem::CLIENT', JSON.stringify(item));
            if(item.type == 'clothes' || item.type == 'props') {
                if(item.isOnPlayer == false) {
                    Inventory.items[citem].isOnPlayer = true
                    Inventory.items[citem].slot = 0;
                }
                if(item.isOnPlayer == true) {
                    Inventory.items[citem].isOnPlayer = false
                }
            }
            await mp.trigger('Inventory_openWindow::CLIENT');

            await this.wait(100)

            await mp.trigger('Inventory_openWindow2::CLIENT');

        }else{

            let $this = this;

            if(num == 1) {

            let item = $this.items.find(item => item.slot === '1 fast');;



            await mp.trigger('Inventory_useItem::CLIENT', JSON.stringify(item));
            if(item.type == 'clothes' || item.type == 'props') {
                if(item.isOnPlayer == false) {
                    Inventory.items[num].isOnPlayer = true
                    Inventory.items[num].slot = 0;
                }
                if(item.isOnPlayer == true) {
                    Inventory.items[num].isOnPlayer = false
                }
            }
        }

        
        if(num == 2) {

            let item = $this.items.find(item => item.slot === '2 fast');;



            await mp.trigger('Inventory_useItem::CLIENT', JSON.stringify(item));
            if(item.type == 'clothes' || item.type == 'props') {
                if(item.isOnPlayer == false) {
                    Inventory.items[num].isOnPlayer = true
                    Inventory.items[num].slot = 0;
                }
                if(item.isOnPlayer == true) {
                    Inventory.items[num].isOnPlayer = false
                }
            }
        }

        if(num == 3) {

            let item = $this.items.find(item => item.slot === '3 fast');;



            await mp.trigger('Inventory_useItem::CLIENT', JSON.stringify(item));
            if(item.type == 'clothes' || item.type == 'props') {
                if(item.isOnPlayer == false) {
                    Inventory.items[num].isOnPlayer = true
                    Inventory.items[num].slot = 0;
                }
                if(item.isOnPlayer == true) {
                    Inventory.items[num].isOnPlayer = false
                }
            }
        }


        }
        },
        dropItem() {
            this.modal.active = false;
            this.currentItem = 0;
        },
        async openWindow() {
            await this.wait(5000);
            mp.trigger('Inventory_openWindow::CLIENT');
        },
        wait(time) {
            return new Promise(resolve => {
                setTimeout(resolve, time);
            });
        },
        isLetter(str) {
            return str.length === 1 && str.match(/[a-z]/i);
        },
        updateInventory() {
            var $this = this;

            for (let i = 0; i < this.items.length; i++) {

                if(this.items[i].slot.toString().includes('fast')) {
                    $(`#${this.items[i].slot}`).append(`
                    <div class="item"onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                `)
                }

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

                }
                if(!this.items[i].isOnPlayer){
                    if(this.items[i].slot.toString().includes('fast')) {

                    }
                    $(`.slot:nth-child(${this.items[i].slot})`).append(`
    
                        <div class="item"onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                    `)
                                                                    //                    <p class = 'fastslottext' id= '${i} fast'>Button: 0</p> 
                                                    //                      oncontextmenu="Inventory.rightClickItem(1, event.clientX, event.clientY)" 
                    }
            }


            $this.updateDND();
        },
        clickEmpty() {
            if (this.modal.active == true) return this.modal.active = false;
            if (this.modal2.active == true) return this.modal2.active = false;
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

                        let word_With_Numbers = $(this).attr('id');
                        let word_Without_Numbers = word_With_Numbers.replace(/\D/g, '');

                        $this.items[id].slot = word_Without_Numbers;


                        
                        if($this.items[id].isOnPlayer == true) {
                            await mp.trigger('Inventory_unequipClothes::CLIENT',JSON.stringify([$this.items[id].componentId, $this.items[id].slot, $this.items[id].type]))
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
                        mp.trigger('Inventory_equipClothes::CLIENT',JSON.stringify([$this.items[i].componentId, $this.items[i].textureId, $this.items[i].drawableId, $this.items[i].type]))
                        ui.draggable.detach().appendTo($(this));
                        $this.items[i].isOnPlayer = true;
                        $this.items[i].slot = 0;
                }
            })


            $(".fastslot .item").draggable({ // ВЫБИРАЕМ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ ПЕРЕМЕЩАТЬ
                scroll: false, // ЗАПРЕЩАЕМ ПОЯВЛЕНИЮ SCROLL ВО ВРЕМЯ ПЕРЕМЕЩЕНИЯ
                helper: "clone", // ПРИ ПЕРЕМЕЩЕНИИ СОЗДАЕТ КЛОНА
                cursor: "pointer", // КУРСОР В СТИЛЕ POINTER
                zIndex: 27, // ОТОБРАЖЕНИЕ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА СВЕРХУ  
                // distance: 0,
                drag: function (event, ui) {
                    item_isStackable = $(this).hasClass("stackable");
                },
            });

            

            $(".fastslot").droppable({ // Элемент который будет принимать для себя предметы
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

                        // let word_With_Numbers = $(this).attr('id');
                        // let word_Without_Numbers = word_With_Numbers.replace(/\D/g, '');

                        $this.items[id].slot = $(this).attr('id');


                        
                        if($this.items[id].isOnPlayer == true) {
                            await mp.trigger('Inventory_unequipClothes::CLIENT',JSON.stringify([$this.items[id].componentId, $this.items[id].slot, $this.items[id].type]))
                            $this.items[id].isOnPlayer = false
                            return ui.draggable.detach().appendTo($(this));
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



        }
    },
    mounted() {

        var $this = this;
        // $this.addItem(0, 2)
        // this.addItem(2, 2)
        // $this.updateInventory()

        // window.addEventListener("keypress", e => {
        //     if(Inventory.modal3.active == true) {
        //     let button = String.fromCharCode(e.keyCode);
        //     console.log(button);
        //     Inventory.modal3.active = false;
        //     }
        // });

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

            $('.fastslots').children().not('.fastslot').remove();
        })
    }
})

function clickItem(i) {
    Inventory.clickItem(i);
}