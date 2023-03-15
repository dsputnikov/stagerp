let chat = require("./hud");

mp.events.add("loadCharacter::SERVER", (player) => {
  DB.query(
    "SELECT * FROM characters WHERE login = ?",
    [player.login],
    function (err, r) {
      if (err) return console.log(err);
      if (r[0]) {
        let model = r[0].gender == 0 ? "mp_m_freemode_01" : "mp_f_freemode_01";
        let spawn = r[0].lastPos.split(",");
        player.model = mp.joaat(model);
        player.dimension = r[0].dimension
        player.name = `${r[0].Name}_${r[0].Surname}`;
        player.setMoney(r[0].money);
        player.setVariable("id", r[0].id);
        player.setVariable("logged", true);
        player.setVariable("Taxi_orderedStatus", false);
        player.setVariable("preworkTaxi", false);
        player.setVariable("taxiWork", false);
        player.setVariable("Taxi_orderExecutionStatus", false);
        player.setVariable("Taxi_driverArrived", false);
        player.gender = r[0].gender;
        player.level = r[0].lvl;
        player.pesronalPropety = [];

        DB.query(
          "SELECT * from bank WHERE id = ?",
          [player.getVariable("id")],
          function (err, r) {
            if (err) return console.log(err);
            if (r[0]) {
              player.setBankMoney(r[0].money);
            }
          }
        );

        chat.send(player, `Текущая версия !{#0077FF} Stage RolePlay !{#FFFFFF} 1.0`);
        chat.send(player, `За !{#D1D1D1} 150$ !{#FFFFFF} вы можете арендовать !{#D1D1D1} Faggio !{#FFFFFF} используя !{#D1D1D1} /rent`);
        chat.send(player, `Сборка разработана и обновляется!{#0077FF} discord.gg/3mKaaZZXTq`);
        chat.addNotify(player, 1, `Добро пожаловать ${player.name}`, 7000);
        if (player.getVariable("adminlvl") >= 1) {
          chat.send(
            player,
            `!{#E03444}Вы успешно авторизовались как администратор ${player.getVariable(
              "adminlvl"
            )} уровня!`
          );
        }

        loadFace(player, r[0]);

        player.spawn(
          new mp.Vector3(
            parseFloat(spawn[0]),
            parseFloat(spawn[1]),
            parseFloat(spawn[2])
          )
        );
      } else {
        player.setVariable("logged", false);
        mp.events.call("pedCreator_start::SERVER", player);
      }
    }
  );
});

async function loadFace(player, data) {
  let face = JSON.parse(data.pedFace);
  let dnk = data.pedDnk.split(",");
  let hair = JSON.parse(data.pedHair);
  // Лицоы
  player.setHeadBlend(
    Number(dnk[0]),
    Number(dnk[1]),
    0,
    Number(dnk[0]),
    Number(dnk[1]),
    0,
    Number(dnk[2] / 100),
    Number(dnk[3] / 100),
    0
  );

  for (let i = 0; i < face.length; i++) {
    const value = face[i];
    player.setFaceFeature(i, parseFloat(value));
  }

  player.setHeadOverlay(2, [Number(hair[0]), 255, 1, 1]); // Брови
  player.setHeadOverlay(1, [Number(hair[3]), 255, 1, 1]); // Брови
  player.setClothes(2, Number(hair[2]), 0, 0); // Причесон

  // Одежда
  console.log('started loading');
  let items = JSON.parse(data.items);

  let hat = 11;
  let glasses = 11;
  let top = 0;
  let underwear = 0;
  let pants = 0;
  let shoes = 0;
  let mask = 0;

  for(let i = 0; i < items.length; i++) {

    if(items[i].slot == 0) {

    if(items[i].componentId === 1 && items[i].type === 'props') {
    hat = items[i].textureId
  }

  if(items[i].componentId == 1 && items[i].type == 'clothes') {
    mask = items[i].textureId
  }

  if(items[i].name.toLowerCase().includes('очки')) {
    glasses = items[i].textureId
  }
  if(items[i].componentId == 11) {
    top = items[i].textureId
  }
  if(items[i].componentId == 8) {
    underwear = items[i].textureId
  }
  if(items[i].componentId == 4) {
    pants = items[i].textureId
  }
  if(items[i].componentId == 6) {
    shoes = items[i].textureId
  }
  //console.log(items[i]);
  console.log(items[i].name + ' ' + items[i].textureId)
}
  }

  await player.setProp(0, hat, 0); // Головной убор
  await player.setProp(1, glasses, 0); // Очки
  await player.setClothes(1, mask, 0, 0); // Очки
  await player.setClothes(3, 0, 0, 0); // Торс
  await player.setClothes(11, top, 0, 0); // Верх
  await player.setClothes(8, underwear, 0, 0); // Низ
  await player.setClothes(4, pants, 0, 0); // Штаны
  await player.setClothes(6, shoes, 0, 0); // Капцы
  
}

mp.events.add("Charselector_createCharacter::SERVER", (player) => {
  mp.events.call("pedCreator_start::SERVER", player);
});

mp.events.add("playerQuit", async (player) => {
  DB.query("UPDATE characters SET lastPos = ?, dimension = ? WHERE id = ?", [
    [player.position.x, player.position.y, player.position.z].toString(),
    player.dimension,
    player.getVariable("id"),
  ]);
});
