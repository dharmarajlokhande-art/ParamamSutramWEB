const express = require('express');
const router = express.Router();
const { getGroups, getGroupById, addGroup, updateGroup, deleteGroup } = require('../controllers/groupController');

router.get('/', getGroups);
router.get('/:id', getGroupById);
router.post('/', addGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

module.exports = router;