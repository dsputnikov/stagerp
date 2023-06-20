var SET_CURRENT_PED_WEAPON = '0xADF692B254977C0C';
mp.events.add("playerWeaponShot", async (targetPosition, targetEntity) => {
    if (mp.players.local.getAmmoInClip(mp.players.local.weapon) == 0) {
        let weapon = mp.players.local.weapon
        mp.game.invoke(SET_CURRENT_PED_WEAPON, mp.players.local.handle, mp.game.joaat('weapon_unarmed') >> 0, true)
        await mp.game.waitAsync(0);
        mp.game.invoke(SET_CURRENT_PED_WEAPON, mp.players.local.handle, weapon >> 0, true)
    }
})
