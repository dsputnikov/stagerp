
var Autoschool = new Vue({
    el: '#autoschool',
    data: {
        active: false,
    },
    methods: {
        examA() {
            mp.trigger('House_buyHouse::CLIENT')
        },
        examB() {
            mp.trigger('House_openHouse::CLIENT')
            this.ifLocked = 1;
        },
        examC() {
            mp.trigger('House_openHouse::CLIENT')
            this.ifLocked = 1;
        },
        examD() {
            mp.trigger('House_openHouse::CLIENT')
            this.ifLocked = 1;
        }
    },
    mounted() {
        mp.events.add('Autoschool_showWindow::CEF', (type, bool) => {
            this.active = bool;
            if (type == 1) {
                this.activeMain = bool;
            }
            if (type == 2) {
                this.acitveExits = bool;
            }
        })
    }
})