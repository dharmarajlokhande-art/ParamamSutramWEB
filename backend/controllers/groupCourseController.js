const db = require('../db');

// 1. Assign a course to a group
exports.assignCourseToGroup = (req, res) => {
  const { group_id, course_id } = req.body;

  db.query(
    'INSERT INTO group_courses (group_id, course_id) VALUES (?, ?)',
    [group_id, course_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Course assigned to group successfully!");
    }
  );
};

// 2. Get all courses in a group
exports.getCoursesInGroup = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT c.course_id, c.title, c.description, c.price, c.thumbnail
     FROM group_courses gc
     JOIN courses c ON gc.course_id = c.course_id
     WHERE gc.group_id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

// 3. Get all groups a course belongs to
exports.getGroupsForCourse = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT g.group_id, g.title, g.description, g.price
     FROM group_courses gc
     JOIN groups g ON gc.group_id = g.group_id
     WHERE gc.course_id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

// 4. Remove a course from a group
exports.removeCourseFromGroup = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM group_courses WHERE group_course_id=?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("🗑️ Course removed from group successfully!");
  });
};