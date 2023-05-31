mp.events.add('playerDeath', () => {
    mp.players.local.freezePosition(true);
});

mp.events.add('playerAlive', () => {
    mp.players.local.freezePosition(false);
});