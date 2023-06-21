  let greenZones = [
    { x: -1022, y: -2711, z: 13, radius: 150 }, 
    { x: -627.7549438476562, y: -2259.051513671875, z: 5.817599296569824, radius: 50 },
    { x: -357.2530822753906, y: -133.94911193847656, z: 38.87848663330078, radius: 50 },
    { x: 300.1666259765625, y: -585.2369995117188, z :43.28407287597656, radius: 70 }
  ];

  // Создание зеленых зон 
  let greenZoneColshapes = greenZones.map((zone) => {
    let { x, y, z, radius } = zone;
    return mp.colshapes.newSphere(x, y, z, radius);
  });

  let playerInGreenZone = false;

  mp.events.add('playerEnterColshape', (shape) => {
    if (greenZoneColshapes.includes(shape)) {
      playerInGreenZone = true;
      browser.execute("HUD.greenzone.active = true;");
    }
  });

  mp.events.add('playerExitColshape', (shape) => {
    if (greenZoneColshapes.includes(shape)) {
      playerInGreenZone = false;
      browser.execute("HUD.greenzone.active = false;");
    }
  });

  setInterval(() => {
    if (playerInGreenZone) {
        mp.game.controls.disableControlAction(2, 142, true); // ЛКМ обычный удар
        mp.game.controls.disableControlAction(0, 24, true); //disable attack
        mp.game.controls.disableControlAction(2, 140, true);
        mp.game.controls.disableControlAction(2, 141, true);
        mp.game.controls.disableControlAction(0, 47, true); //disable weapon
        mp.game.controls.disableControlAction(0, 58, true); //disable weapon
        mp.game.controls.disableControlAction(0, 263, true); //disable melee
        mp.game.controls.disableControlAction(0, 264, true); //disable melee
        mp.game.controls.disableControlAction(0, 257, true); //disable melee
        mp.game.controls.disableControlAction(0, 140, true); //disable melee
        mp.game.controls.disableControlAction(0, 141, true); //disable melee
        mp.game.controls.disableControlAction(0, 142, true); //disable melee
        mp.game.controls.disableControlAction(0, 143, true); //disable melee
        return;
    }
}, 10);

