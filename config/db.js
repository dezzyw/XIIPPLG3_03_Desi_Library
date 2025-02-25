const mysql = require('mysql2');
require('dotenv').config();

const dbPool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book'
});

dbPool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = dbPool;
