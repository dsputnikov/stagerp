let gangZones = []
let gangPolygons = []
let zonesMap = [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0]
]

const startPos = new mp.Vector3(-178.08142, -1310.9048, 0)
const zoneRadius = 70

mp.events.add('SRV::CL::CreateGangZones', (gangZonesDataParam) => {
    gangZonesData = JSON.parse(gangZonesDataParam)
    if (gangZones.length > 0) gangZones.forEach((el) => {
        if (el && el.doesExist()) el.destroy()
    })
    gangZones = []
    let zoneIndex = 1;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 13; j++) {
            if (zonesMap[i][j] === 1) {
                let offsetX = (j % 13) * zoneRadius * 2
                let offsetY = (i % 9) * zoneRadius * 2
                let finalPos = new mp.Vector3(startPos.x + offsetX, startPos.y - offsetY, 50)

                let blip = mp.blips.new(5, finalPos, {
                    name: "",
                    radius: zoneRadius,
                    // color: getColorFromGangId(gangZonesData.find(x => x.id === zoneIndex).gangId),
                    color: 1,
                    alpha: 125,
                    drawDistance: 100,
                    shortRange: false,
                    dimension: 0,
                    rotation: 0,
                })
                // blip.setFlashInterval(350)
                // if (gangZonesData.find(x => x.id === zoneIndex).flashing == true) {
                //     createPolygonForBlip(zoneIndex)
                //     blip.setFlashes(true)
                // }
                zoneIndex++;
                gangZones.push(blip)
            }
        }
    }
})

mp.events.add('render', () => {
    gangZones.forEach((blip) => {
        blip.setRotation(0)
    })
})