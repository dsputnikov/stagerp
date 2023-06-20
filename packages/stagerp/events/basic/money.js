
let playerMeta = mp.Player.prototype;

// Выдача денег
playerMeta.giveMoney = function (money) {
    let oldAmount = this.getVariable('money');
    let newAmount = Number(oldAmount) + Number(money);
    this.setVariable('money',newAmount);
    DB.query('UPDATE characters SET money = ? WHERE id = ?',[this.getMoney(),this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};

playerMeta.giveBankMoney = function (money) {
    let oldAmount = this.getVariable('bank');
    let newAmount = Number(oldAmount) + Number(money);
    this.setVariable('bank',newAmount);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?',[this.getBankMoney(),this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};

playerMeta.setMoney = function (money) {
    this.setVariable('money',money);
    DB.query('UPDATE characters SET money = ? WHERE id = ?',[money,this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};

playerMeta.setBankMoney = function (money) {
    this.setVariable('bank',money);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?',[money,this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};

playerMeta.removeMoney = function (money) {
    let oldAmount = this.getVariable('money');
    let newAmount = Number(oldAmount) - Number(money);
    this.setVariable('money',newAmount);
    DB.query('UPDATE characters SET money = ? WHERE id = ?',[newAmount,this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};


playerMeta.removeBankMoney = function (money) {
    let oldAmount = this.getVariable('bank');
    let newAmount = Number(oldAmount) - Number(money);
    this.setVariable('bank',newAmount);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?',[newAmount,this.getVariable('id')],function(err,r) {
        if(err) return console.error(err)
    })
    this.call('Hud_updateMoney::CLIENT',[this.getMoney(),this.getBankMoney()])
};

playerMeta.getMoney = function () {
    return this.getVariable('money');
};


playerMeta.getBankMoney = function () {
    return this.getVariable('bank');
};


