mp.events.add('playerDeath', () => {
    mp.players.local.freezePosition(true);

    setTimeout(() => {
        mp.players.local.freezePosition(false);
    }, 1000);
});


mp.events.add('PhoneAnimShow', () => {

});

