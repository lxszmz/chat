/**
 * Created by xiaosong on 2016/4/24.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database:'chat',
    port: 3306
})
conn.connect();
conn.query('SELECT count(id) num from user  ', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].num);
});
conn.end();