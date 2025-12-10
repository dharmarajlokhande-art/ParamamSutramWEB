const express = require('express');
const router = express.Router();
const {
  getUserById,
  getMyProfile,
  updateUserAvatar,
  updateUserName,
  updateMyProfile,
  getMyCourses,
  getMyPurchases,
  getMyDashboard
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.get('/:id', authMiddleware, getUserById);
router.get('/me', authMiddleware, getMyProfile);
router.put('/:id/avatar', authMiddleware, updateUserAvatar);
router.put('/:id/name', authMiddleware, updateUserName);
router.put('/me', authMiddleware, updateMyProfile);
router.get('/me/courses', authMiddleware, getMyCourses);
router.get('/me/purchases', authMiddleware, getMyPurchases);
router.get('/me/dashboard', authMiddleware, getMyDashboard);   // NEW route

module.exports = router;