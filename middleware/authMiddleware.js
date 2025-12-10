const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send("❌ No token provided");

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) return res.status(403).send("❌ Invalid or expired token");

  req.user = decoded; // Attach decoded payload (user_id, email) to request
  next();
};