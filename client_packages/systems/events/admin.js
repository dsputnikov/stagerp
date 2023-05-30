mp.events.add('freezePlayer', () => {
    mp.players.local.freezePosition(true);
});

mp.events.add('unfreezePlayer', () => {
    mp.players.local.freezePosition(false);
});