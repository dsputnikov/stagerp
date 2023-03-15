
var SQL = require('mysql')

global.DB = SQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: '',
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 50000,
    acquireTimeout  : 60 * 60 * 50000,
    timeout         : 60 * 60 * 50000,
});

( async () =>{
    await new Promise(function(resolve,reject) {
        DB.getConnection(function(e) {
            if(e) return reject (console.log(`Ошибка подключения - ${e}`));
            resolve(console.log('Вы успешно подключились к Базе Данных!'));
        })
    })
}) ();

mp.events.add('serverShutdown', async () => {
    await DB.end();
    console.log('Выключение БД');
});