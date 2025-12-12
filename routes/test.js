app.get('/ping-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ success: true, result: rows });
  } catch (err) {
    console.error('❌ DB Test Failed:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});