let chat = require('../events/basic/hud');
let methods = require("../modules/methods");

// ------------------------------------------[Банк]------------------------------------------\\
mp.events.add("Bank_openWindow::SERVER", (player) => {
  DB.query(
    "SELECT * from characters WHERE id = ?",
    [player.getVariable("id")],
    function (err, r) {
      if (err) return console.error(err);
      if (r[0]) {
        player.accountBank = r[0].bank;
        player.bankOperations = [];
        DB.query(
          "SELECT * from bank_operations WHERE playerid = ?",
          [player.getVariable("id")],
          function (err, r) {
            if (err) return console.error(err);
            if (r[0]) {
              for (let i = 0; i < r.length; i++) {
                player.bankOperations.push(r[i]);
                player.bankOperations.reverse();
              }
            }
          }
        );
        DB.query(
          "SELECT * from bank WHERE playerid = ?",
          [player.getVariable("id")],
          function (err, r) {
            if (err) return console.error(err);
            if (r[0]) {
              player.call("Bank_updateWindow::CLIENT", [
                r[0].account,
                r[0].money,
                JSON.stringify(player.bankOperations),
              ]);
            }
          }
        );
        player.call("Bank_openWindow::CLIENT", [r[0].bank]);
      }
    }
  );
});



mp.events.add("Bank_createBankAccount::SERVER", (player, number) => {
  DB.query(
    "UPDATE characters SET bank = ? WHERE id = ?",
    [1, player.getVariable("id")],
    function (err, r) {
      if (err) return console.error(err);
    }
  );
  if (player.accountBank == 0) {
    DB.query(
      "INSERT INTO bank VALUES (?,?,?,?,?)",
      [0,player.login, player.getVariable("id"), number, 0],
      function (err, r) {
        if (err) return console.log(err);
        mp.events.call("Bank_openWindow::SERVER", player);
      }
    );
  }
});

mp.events.add("Bank_modalActions::SERVER", (player, type, input, input2) => {
  // Пополнение
  // console.log(player.bankOperations)
  if (type == 1) {
    if (player.getMoney() < input)
      return player.call("Bank_showError::CLIENT", [
        "У вас недостаточно денег",
      ]);
    player.removeMoney(input);
    let com = (parseInt(input) / 100) * 1;
    player.giveBankMoney(input);
    mp.events.call("Bank_openWindow::SERVER", player);
    mp.events.call(
      "Bank_addBankOperation::SERVER",
      player,
      2,
      "Пополнение счёта",
      "в банке",
      `+${input}`
    );
  } else if (type == 2) {
    if (player.getBankMoney() < input)
      return player.call("Bank_showError::CLIENT", [
        "У вас недостаточно денег",
      ]);
    player.removeBankMoney(input);
    let com = (parseInt(input) / 100) * 1;
    player.giveMoney(input);
    mp.events.call("Bank_openWindow::SERVER", player);
    mp.events.call(
      "Bank_addBankOperation::SERVER",
      player,
      1,
      "Снятие денег",
      "со счёта",
      `-${input}`
    );
  } else if (type == 3) {
    if (player.getMoney() < input2)
      return player.call("Bank_showError::CLIENT", [
        "У вас недостаточно денег",
      ]);
    let target = methods.getById(input);
    if (target == player)
      return player.call("Bank_showError::CLIENT", [
        "Вы не можете самому себе",
      ]);
    if (target == undefined)
      return player.call("Bank_showError::CLIENT", [
        "Игрок не в сети или его не существует",
      ]);
    if (target.accountBank == 0)
      return player.call("Bank_showError::CLIENT", [
        "У игрока нет банковского счёта",
      ]);
    player.removeBankMoney(input2);
    target.giveBankMoney(input2);
    mp.events.call("Bank_openWindow::SERVER", player);
    chat.send(
      target,
      `!{#BAFE2A}[Банк] !{#FFFFFF}На Ваш банковский счёт было начисленно: $${input2}`
    );
    chat.addNotify(
      target,
      3,
      `На Ваш банковский счёт было начисленно: $${input2}`,
      7000
    );
    mp.events.call(
      "Bank_addBankOperation::SERVER",
      player,
      1,
      "Перевод денег",
      `Игроку ${target.name}`,
      `-${input}`
    );
  }
});

mp.events.add(
  "Bank_addBankOperation::SERVER",
  (player, type, name, subname, money) => {
    DB.query(
      "INSERT INTO bank_operations VALUES (?,?,?,?,?,?)",
      [0, player.getVariable("id"), type, name, subname, money],
      function (err, r) {
        if (err) return console.error(err);
      }
    );
  }
);

// ------------------------------------------[Банкомат]------------------------------------------\\

mp.events.add("Bank_openBankomat::SERVER", (player) => {
  DB.query(
    "SELECT * from characters WHERE id = ?",
    [player.getVariable("id")],
    function (err, r) {
      if (err) return console.error(err);
      if (r[0]) {
        if (r[0].bank == 0)
          return chat.addNotify(player, 2, "У вас нет банковского счёта", 7000);
        player.accountBank = r[0].bank;
        DB.query(
          "SELECT * from bank WHERE id = ?",
          [player.getVariable("id")],
          function (err, r) {
            if (err) return console.error(err);
            if (r[0]) {
              player.call("Bank_openBankomat::CLIENT", [
                r[0].account,
                r[0].money,
                player.getMoney(),
              ]);
            }
          }
        );
      }
    }
  );
});

mp.events.add(
  "Bank_bankomatmodalActions::SERVER",
  (player, type, input, input2) => {
    // Пополнение
    if (type == 1) {
      if (player.getMoney() < input)
        return player.call("Bank_showError::CLIENT", [
          "У вас недостаточно денег",
        ]);
      player.removeMoney(input);
      let com = (parseInt(input) / 100) * 1;
      player.giveBankMoney(input);
      mp.events.call("Bank_openBankomat::SERVER", player);
    } else if (type == 2) {
      if (player.getBankMoney() < input)
        return player.call("Bank_showError::CLIENT", [
          "У вас недостаточно денег",
        ]);
      player.removeBankMoney(input);
      let com = (parseInt(input) / 100) * 1;
      player.giveMoney(input);
      mp.events.call("Bank_openBankomat::SERVER", player);
    } else if (type == 3) {
      if (player.getMoney() < input2)
        return player.call("Bank_showError::CLIENT", [
          "У вас недостаточно денег",
        ]);
      let target = methods.getById(input);
      if (target == player)
        return player.call("Bank_showError::CLIENT", [
          "Вы не можете самому себе",
        ]);
      if (target == undefined)
        return player.call("Bank_showError::CLIENT", [
          "Игрок не в сети или его не существует",
        ]);
      if (target.accountBank == 0)
        return player.call("Bank_showError::CLIENT", [
          "У игрока нет банковского счёта",
        ]);
      player.removeBankMoney(input2);
      target.giveBankMoney(input2);
      mp.events.call("Bank_openWindow::SERVER", player);
      chat.send(
        target,
        `!{#BAFE2A}[Банк] !{#FFFFFF}На Ваш банковский счёт было начисленно: $${input2}`
      );
      chat.addNotify(
        target,
        3,
        `На Ваш банковский счёт было начисленно: $${input2}`,
        7000
      );
    }
  }
);
