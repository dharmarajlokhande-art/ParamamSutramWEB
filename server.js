require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://www.paramamsutram.com' }));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/enrollments', require('./routes/enrollments'));
app.use('/groups', require('./routes/groups'));
app.use('/group-courses', require('./routes/groupCourses'));
app.use('/purchases', require('./routes/purchases'));

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 ParamamSutram backend is running!');
});

// ✅ DB test route
app.get('/ping-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ DB Connected:', rows);
    res.json({ success: true, result: rows });
  } catch (err) {
    console.error('❌ DB Test Failed:', err); // full error in logs
    res.status(500).json({
      error: 'Database connection failed',
      code: err.code,          // MySQL error code
      sqlMessage: err.sqlMessage, // MySQL error message
      details: err.message     // Node.js error message
    });
  }
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));