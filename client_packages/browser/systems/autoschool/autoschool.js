
var Autoschool = new Vue({
    el: '#autoschool',
    data: {
        active: false,
    },
    methods: {
        exam(cl) {
            if(cl == 1) {
                mp.trigger("startAuto::CLIENT", 1);
                this.active = false;
                mp.trigger("Autoschool_windowClose::CLIENT");
            }
        },
        close() {
            mp.trigger("Autoschool_windowClose::CLIENT");
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
            mp.trigger("Autoschool_windowOpen::CLIENT");
        })
    }
})