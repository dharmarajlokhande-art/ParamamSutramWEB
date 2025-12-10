const express = require('express');
const router = express.Router();
const { enrollUser, getUserEnrollments, updatePaymentStatus, deleteEnrollment } = require('../controllers/enrollmentController');

router.post('/', enrollUser);
router.get('/:user_id', getUserEnrollments);
router.put('/:id/payment', updatePaymentStatus);
router.delete('/:id', deleteEnrollment);

module.exports = router;