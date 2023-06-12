const browser = mp.browsers.new('package://browser/index.html');
const player = mp.players.local;

mp.events.add('playerDeath', () => {
    mp.players.local.freezePosition(true);

    setTimeout(() => {
        mp.players.local.freezePosition(false);
    }, 5000);
});

mp.events.add('playerAlive', () => {
    mp.players.local.freezePosition(false);
});