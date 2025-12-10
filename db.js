const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,      // e.g. "localhost" or Hostinger DB host
  user: process.env.DB_USER,      // your DB username
  password: process.env.DB_PASS,  // your DB password
  database: process.env.DB_NAME,  // your DB name
  port: process.env.DB_PORT || 3306, // default MySQL port
  waitForConnections: true,
  connectionLimit: 10,   // max simultaneous connections
  queueLimit: 0          // unlimited queued requests
});

// Log basic config (safe for production)
console.log('✅ MySQL Pool created:', {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

module.exports = pool;