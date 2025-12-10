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