"use strict";

var SQL = require('mysql');

global.DB = SQL.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: '',
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 50000,
  acquireTimeout: 60 * 60 * 50000,
  timeout: 60 * 60 * 50000
});

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            DB.getConnection(function (e) {
              if (e) return reject(console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F - ".concat(e)));
              resolve(console.log('Вы успешно подключились к Базе Данных!'));
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();

mp.events.add('serverShutdown', function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(DB.end());

        case 2:
          console.log('Выключение БД');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});