const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'hong',
    password: 'hong',
    database: 'mysql'
});

module.exports = db;