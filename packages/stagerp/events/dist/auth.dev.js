"use strict";

mp.events.add('playerReady', function (player) {
  player.call('Auth_await::CLIENT');
  player.position = new mp.Vector3(3358.125, 5169.5703125, 20.1375675201416);
  player.dimension = player.id + 12;
  player.personalVehicle = 0;
});
mp.events.add('Auth_playerLogin::SERVER', function (player, login, password) {
  DB.query('SELECT * FROM accounts WHERE login = ? AND password = ?', [login, password], function (err, r) {
    if (err) return console.log(err);

    if (r[0]) {
      DB.query('SELECT * FROM accounts', [], function (err, r) {
        if (r[0]) {
          if (r[0].socialClub != player.socialClub) return player.call('Auth_showError::CLIENT', ['Ошибка #4532']);
        }
      });
      if (player.logged) return;
      player.dimension = 0;
      player.login = r[0].login;
      player.setVariable('login', r[0].login);
      player.setVariable('adminlvl', r[0].admin);
      player.call('Auth_succefully::CLIENT');
      mp.events.call('loadCharacter::SERVER', player);
      mp.events.call('playerJoined', player);
    } else {
      player.call('Auth_showError::CLIENT', ['Не верный логин или пароль']);
    }
  });
});
mp.events.add('Auth_playerRegister::SERVER', function (player, login, email, password) {
  DB.query('SELECT * FROM accounts', [], function (err, r) {
    //if (r[0]) {
    //  if (r[0].login == login) return player.call('Auth_showError::CLIENT', ['Такой аккаунт уже существует'])
    //if (r[0].socialClub == player.socialClub) return player.call('Auth_showError::CLIENT', ['Аккаунт с таким socialClub аккаунт уже существует'])
    //}
    DB.query('INSERT INTO accounts (login,email,password,socialClub,regIP,lastIP) VALUES(?,?,?,?,?,?)', [login, email, password, player.socialClub, player.ip.replace(/^.*:/, '').trim(), player.ip.replace(/^.*:/, '').trim()], function (err, r) {
      if (err) return console.log(err);
      player.call('Auth_setState::CLIENT', [1]);
    });
  });
});