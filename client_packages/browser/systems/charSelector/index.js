
var CharSelector = new Vue({
    el: '#charSelector',
    data: {
        active: false,
        pl1: false,
        pl2: false,
        pl3: false,
        data: {
            data: {
                player1: {
                    active: false,
                },
                player2: {
                    active: false,

                },
                player3: {
                    active: false,
                }
            }
        }
    },
    methods: {
        load(data) {
            let dat = JSON.parse(data)
            CharSelector.data = dat;
            this.pl1 = dat.player1.active;
            this.pl2 = dat.player2.active;
            this.pl3 = dat.player3.active;
        },
        selectCharacter(char) {
            if (char == 1) {
                mp.trigger('Charselector_selectCharacter::CLIENT',JSON.stringify(this.data.player1))
            }
            if (char == 2) {
                mp.trigger('Charselector_selectCharacter::CLIENT',JSON.stringify(this.data.player2))
            }
            if (char == 3) {
                mp.trigger('Charselector_selectCharacter::CLIENT',JSON.stringify(this.data.player3))
            }
        },
        createCharacter() {
            mp.trigger('Charselector_createCharacter::CLIENT')
        }
    }
})

if ('alt' in window) {
    alt.on('Charselector_showSelector::CEF', (type, data) => {
        CharSelector.active = type;
        CharSelector.data = data;
        CharSelector.pl1 = data.player1.active;
        CharSelector.pl2 = data.player2.active;
        CharSelector.pl3 = data.player3.active;
    });
    alt.on('Charselector_hide::CEF', (type) => {
        CharSelector.active = type;
    });
}