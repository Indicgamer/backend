const mysql2 = require('mysql2/promise');

const Connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'economy',
});


module.exports = Connection;
