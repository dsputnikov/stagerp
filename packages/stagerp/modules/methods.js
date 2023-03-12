
function getById(id) {
    var rplayer;
    mp.players.forEach(function (player) {
        if (player.getVariable('id') == id) {
            rplayer = player;
        }
    })
    return rplayer;
}

mp.events.add('playScenario', (player,scenario) => {
    player.playScenario(scenario);
})


mp.events.add('stopAnimation', (player) => {
    player.stopAnimation();
})


module.exports.getById = getById;