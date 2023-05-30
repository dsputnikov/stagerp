let rent = [
    { x: -1016.85400390625, y: -2706.110595703125, z: 13.626497268676758 },
]

let rentColshapes = [];

for (let i = 0; i < rent.length; i++) {
    let shape = mp.colshapes.newSphere(rent[i].x, rent[i].y, rent[i].z, 1, 0);
    rentColshapes.push(shape);
    mp.markers.new(2, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), 0.0);
    let ped = mp.peds.new(mp.game.joaat('a_m_y_bevhills_01'), new mp.Vector3(-1015.8927612304688, -2705.85009765625, 13.694609642028809), 128.07366943359375);
    let text = mp.labels.new(`Изи Арендов (NPC)`, new mp.Vector3(ped.position.x, ped.position.y, ped.position.z + 1), {
      los: false,
      font: 0,
      drawDistance: 7,
      dimension: 0
  });
    mp.blips.new(280, new mp.Vector3(rent[i].x, rent[i].y, rent[i].z), {
      name: `Аренда ТС`,
      color: 2,
      shortRange: true,
    });
  }

  // ----------------------------[Вход в шэйп]------------------------------\\

mp.events.add("playerEnterColshape", (shape) => {
  for (let colshape of rentColshapes) {
    if (shape == colshape) {
      mp.keys.bind(0x45, true, function () {
        mp.events.callRemote("rentVehicle");
      });
      browser.execute("HUD.usebutton.active = true;");
      break;
    }
  }
});

// ----------------------------[Выход из шэйпа]------------------------------\\

mp.events.add("playerExitColshape", (shape) => {
  for (let colshape of rentColshapes) {
    if (shape == colshape) {
      browser.execute("HUD.usebutton.active = false;");
      mp.keys.unbind(0x45, true);
      break;
    }
  }
});