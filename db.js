const mysql = require('mysql2/promise');
require('dotenv').config();   // 👈 load .env before using process.env

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g. auth-db837.hstgr.io
  user: process.env.DB_USER,     // e.g. u183557077_ParamamSutram
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // e.g. u183557077_ParamamSutram
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;