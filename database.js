const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_db'
});


module.exports = dbConnection;