var miniuvedi = new Vue({
    el: '#miniuvedi',
    data: {
        active: false,
        show: 1,
        textclass: 'miniuvedi-textred',
        text: 'Машина что-то',
    },
    methods: {
        open() {
            console.log('open')
        },
        closeText() {
            this.active = false;
        },
        changeText(arr) {
            this.active = true;
            this.textclass = arr[0];
            this.text = arr[1];
            this.open();
        },
    }
})

mp.events.add('miniuvedi::CEF', (bool) => {
    let ch = bool
    if(ch) {
        miniuvedi.changeText(['miniuvedi-textred', 'машина закрыта']);
    }else{
        miniuvedi.changeText(['miniuvedi-textgreen', 'машина открыта']);
    }
    //setTimeout(function () { miniuvedi.closeText() }.bind(miniuvedi), 5000)
    //setInterval(miniuvedi.closeText(), 5000);
});

mp.events.add('miniuvediClose::CEF', () => {
    miniuvedi.closeText();
});