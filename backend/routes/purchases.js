const express = require('express');
const router = express.Router();
const {
  recordPurchase,
  getUserPurchases
} = require('../controllers/purchaseController');

router.post('/', recordPurchase);
router.get('/:user_id', getUserPurchases);

module.exports = router;