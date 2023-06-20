

mp.events.add('pedCreator_start::SERVER', (player) => {
    player.position = new mp.Vector3(1976.890869140625, 3820.33203125, 33.45004653930664);
    player.heading = 90;
    player.dimension = player.id + 12;
    player.model = mp.joaat('mp_m_freemode_01')
    player.call('pedCreator_start::CLIENT');
})

mp.events.add('pedCreator_updateServer::SERVER', (player, model) => {
    player.model = mp.joaat(model);
    //player.position = pos;
    // player.rot = rot;
    player.call('pedCreator_update::CLIENT')
})

mp.events.add('blockCamera', (player) => {
  player.call('blockCamera');
});

mp.events.add('pedCreator_finishSync::SERVER', async (player, _data) => {
    var data = JSON.parse(_data)
    let clothes = data.clothes;

    let toItems = [
        {
            slot: 0,
            name: 'Верх',
            desc: `С биркой ${clothes[1]}`,
            type: 'clothes',
            componentId: 11,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[1],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/top/1.png'
          },
          {
            slot: 0,
            name: 'Штаны',
            desc: `С биркой ${clothes[3]}`,
            type: 'clothes',
            componentId: 4,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[3],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/legs/1.png'
          },
          {
            slot: 0,
            name: 'Нижняя одежда',
            desc: `С биркой ${clothes[2]}`,
            type: 'clothes',
            componentId: 8,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[2],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/underwear/1.png'
          },
          {
            slot: 0,
            name: 'Ботинки',
            desc: `С биркой ${clothes[4]}`,
            type: 'clothes',
            componentId: 6,
            drawableId: 0,
            isOnPlayer: true,
            spawn: true,
            textureId: clothes[4],
            paletteId: 0,
            weight: 0.5,
            img: './systems/inventory/img/items/clothes/shoes/1.png'
          }
      ]

      if (parseInt(clothes[0]) !== 0 && parseInt(clothes[0]) > 0) {

       let datas = {
        slot: 0,
        name: 'Головной убор',
        desc: `С биркой ${clothes[0]}`,
        type: 'props',
        componentId: 0,
        drawableId: 0,
        isOnPlayer: true,
        spawn: true,
        spawn: true,
        textureId: clothes[0],
        paletteId: 0,
        weight: 0.5,
        img: './systems/inventory/img/items/clothes/hat/1.png'
        }

      toItems.push(datas);
            }

            if (parseInt(clothes[5]) !== 0 && parseInt(clothes[5]) > 0) {

                let datas = {
                 slot: 0,
                 name: 'Очки',
                 desc: `С биркой ${clothes[5]}`,
                 type: 'props',
                 componentId: 1,
                 drawableId: 0,
                 isOnPlayer: true,
                 spawn: true,
                 textureId: clothes[5],
                 paletteId: 0,
                 weight: 0.5,
                 img: './systems/inventory/img/items/clothes/glasses/1.png'
                 }
         
               toItems.push(datas);
                     }

                     console.log(toItems)

    await DB.query('INSERT INTO characters (login,Name,Surname,age,items,gender,pedDnk, pedFace, pedHair,lastPos) VALUES(?,?,?,?,?,?,?,?,?,?)', [player.login, data.name, data.surname, data.age, JSON.stringify(toItems), data.gender, [data.father, data.mother, data.faceMix, data.skinMix].toString(), JSON.stringify(data.structure), JSON.stringify(data.hair), '-1037.8990478515625, -2736.333251953125, 13.762728691101074'], (err) => {
        if (err) console.log(err)
        mp.events.call('loadCharacter::SERVER',player)
    })
})
