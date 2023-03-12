var Auto = new Vue({
    el: '#auto',
    data: {
        active: false,
        open: 1,
        IsIn: false,
        auto: 0,
    },
    methods: {
        tpToAuto() {
            this.IsIn = true;
            mp.trigger('AutoLuxeIn::CLIENT')
        },
        tpToStreet() {
            this.IsIn = false;
            mp.trigger('AutoLuxeOut::CLIENT')
        }
    }
})