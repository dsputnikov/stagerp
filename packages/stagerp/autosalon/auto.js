mp.events.add("carLuxeTPJoin::SERVER", (player) => {
    player.position = new mp.Vector3(-801.3224487304688, -222.78689575195312, 37.07965850830078);
  });

mp.events.add("carLuxeTPExit::SERVER", (player) => {
    player.position = new mp.Vector3(-803.830810546875, -224.1153564453125, 37.22683334350586);
  });


  mp.events.add("carSredTPJoin::SERVER", (player) => {
    player.position = new mp.Vector3(-41.82459259033203, -1663.365966796875, 29.4867000579834);
  });

mp.events.add("carSredTPExit::SERVER", (player) => {
    player.position = new mp.Vector3(-44.13488006591797, -1660.9564208984375, 29.28295135498047);
  });