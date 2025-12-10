const express = require('express');
const app = express();

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 ParamamSutram backend minimal test is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Minimal server running on port ${PORT}`);
});
const db = require('./db');

app.get('/ping-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ success: true, result: rows });
  } catch (err) {
    console.error('❌ DB Test Failed:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});
