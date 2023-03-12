
var Bus = new Vue({
    el: "#bus",
    data: {
        active: false,
        isWork: false,
        currentRoute: 0,
        routes: [
            {name: 'По лос-антосу',length: '14', salary: 350, color: 'rgba(255, 255, 255, 0.05);'},
            {name: 'По лос-антосу2',length: '14', salary: 350, color: 'rgba(255, 255, 255, 0.05);'},
            {name: 'По всему Сан-Андреасу',length: '14', salary: 350, color: 'linear-gradient(151.09deg, #2C80EF 6.08%, rgba(44, 128, 239, 0.19) 82.21%);'},
        ],
        work: {
            active: true,
            current: 0,
            name: 'Автобусник',
            salary: '11',
            countedMoney: 0,
            currentSalary: 0,
        }
    },
    methods: {
        changeRoute(t) {
            this.currentRoute = t;
        },
        startWork() {
            this.isWork = true;
            mp.trigger('Bus_startWork::CLIENT',this.currentRoute,this.routes[this.currentRoute].salary)
        },
        stopWork() {
            this.isWork = false;
            mp.trigger('Bus_stopWork::CLIENT')
        }
    },
    mounted() {
    }
})