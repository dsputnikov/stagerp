mp.events.add('freezePlayer', () => {
    mp.players.local.freezePosition(true);
});

mp.events.add('unfreezePlayer', () => {
    mp.players.local.freezePosition(false);
});

let g_bIslandLoaded = false;

mp.keys.bind(0x72 /* F3 */, false, () => {
    g_bIslandLoaded = !g_bIslandLoaded;
    mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", g_bIslandLoaded);

    mp.gui.chat.push(`Island ${g_bIslandLoaded ? "loaded" : "unloaded"}`);
});