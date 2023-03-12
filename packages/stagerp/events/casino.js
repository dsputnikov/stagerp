mp.events.addCommand('createcasino', (player, _, id) => {
const table = mp.objects.new(mp.game.joaat('vw_prop_casino_roulette_01'), player.position);
const ball = mp.objects.new(mp.game.joaat('vw_prop_roulette_ball'), new mp.Vector3(player.position.x-0.734742, player.position.y-0.16617, player.position.z+1.0715));
 

ball.attachTo(table.handle, 0, 0, 0, 0, 0, 0, 0, true, true, false, false, 0, false);

let lib = 'anim_casino_b@amb@casino@games@roulette@table';
const routtle = () => {
    ball.position = new mp.Vector3(player.position.x-0.734742, player.position.y-0.16617, player.position.z+1.0715);
    ball.rotation = new mp.Vector3(0, 0, 32.6);

    ball.playAnim('intro_ball', lib, 1000.0, false, true, true, 0, 136704);
    ball.playAnim('loop_ball', lib, 1000.0, false, true, false, 0, 136704);
 
    table.playAnim('intro_wheel', lib, 1000.0, false, true, true, 0, 136704);
    table.playAnim('loop_wheel', lib, 1000.0, false, true, false, 0, 136704);
    
    ball.playAnim('exit_x_ball', lib, 1000.0, false, true, false, 0, 136704);
    table.playAnim('exit_x_wheel', lib, 1000.0, false, true, false, 0, 136704);
};
mp.keys.bind(0x71, true, routtle);
}) 