const express = require('express');
const router = express.Router();
const {
  assignCourseToGroup,
  getCoursesInGroup,
  getGroupsForCourse,
  removeCourseFromGroup
} = require('../controllers/groupCourseController');

router.post('/', assignCourseToGroup);
router.get('/group/:id', getCoursesInGroup);
router.get('/course/:id', getGroupsForCourse);
router.delete('/:id', removeCourseFromGroup);

module.exports = router;