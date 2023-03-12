var cars = new Vue({
    el: '#cars',
    data: {
        active: false,
        show: 1,
        carSelected: 0,
        cars: []
    },
    methods: {
    async open(sel) {
        if(sel == 'first') {
            cars.carSelected = 0;
            cars.show = 2;
        }
        if(sel == 'two') {
            cars.carSelected = 1;
            cars.show = 2;
        }
        if(sel == 'three') {
            cars.carSelected = 2;
            cars.show = 2;
        }
        if(sel == 'four') {
            cars.carSelected = 3;
            cars.show = 2;
        }
        if(sel == 'five') {
            cars.carSelected = 4;
            cars.show = 2;
        }
        if(sel == 'six') {
            cars.carSelected = 5;
            cars.show = 2;
        }
       },
       back() {
        if(this.show == 2) {
            cars.carSelected = 50;
            return this.show = 1;
        }
        mp.trigger('showHUD::CLIENT')
        cars.active = false;
       },
       async getSelectedCar() {
        let b = await cars.carSelected;
        return b;
       },
        itemImage() {
        a = cars.cars[cars.carSelected].loaded;
        console.log(a)
        if(a == 0) {
            return `./systems/cars/img/download.png`;
        }else{
            return `./systems/cars/img/upload.png`;
        }
      },
       updateCars() {
        cars.show = 1;
        cars.active = true;

        },
        towtruck() {
            let myobj = cars.cars[cars.carSelected]
            myobj['selectedId'] = this.carSelected;
            mp.trigger('TOWTRUCK::CLIENT', JSON.stringify(cars.cars[cars.carSelected]));
        },
        lock() {
            mp.trigger('LockVehicle::CLIENT', JSON.stringify(cars.cars));
        },
        gps() {
            let myobj = cars.cars[cars.carSelected]
            myobj['selectedId'] = this.carSelected;
            mp.trigger('setBlip::CLIENT', JSON.stringify(cars.cars[cars.carSelected])); 
        }
    }
})

mp.events.add('cars_show::CEF', (arr) => {
    cars.cars = JSON.parse(arr);
    //mp.trigger('console_cef', JSON.stringify(cars.cars))
    cars.updateCars();
});