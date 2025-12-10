const db = require('../db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

// 1. Signup
exports.signup = async (req, res) => {
  const { name, email, password, avatar_url } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    db.query(
      'INSERT INTO users (name, email, password_hash, avatar_url) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, avatar_url],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send("❌ Email already exists");
          }
          return res.status(500).send(err);
        }
        res.send("✅ User registered successfully!");
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

// 2. Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("❌ User not found");

    const user = results[0];
    const isMatch = await comparePassword(password, user.password_hash);

    if (!isMatch) return res.status(401).send("❌ Invalid credentials");

    const token = generateToken({ user_id: user.user_id, email: user.email });

    res.json({ message: "✅ Login successful", token });
  });
};