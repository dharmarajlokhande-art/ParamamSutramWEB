const bcrypt = require('bcrypt');

// Hash a plain text password
exports.hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare plain text password with hashed password
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};