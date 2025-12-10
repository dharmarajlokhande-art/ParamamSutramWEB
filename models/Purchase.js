// JavaScript Document
// POST /login
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Create a connection pool (adjust credentials)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdb'
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0]; 

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid credentials');
    }

   
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      'your_secret_key',
      { expiresIn: '2h' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));