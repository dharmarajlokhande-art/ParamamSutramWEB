require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db');

dotenv.config();
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));