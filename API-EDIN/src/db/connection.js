var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'edin_db'
});

pool.query('SELECT 1 + 1 AS solution', (err,results) => {
    if(err) throw err;
    console.log('Solutions is: ' + results[0].solution);
});

module.exports = pool;
