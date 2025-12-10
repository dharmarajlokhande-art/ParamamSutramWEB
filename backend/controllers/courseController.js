const db = require('../db');

exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getCourseById = (req, res) => {
  db.query('SELECT * FROM courses WHERE course_id=?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Course not found");
    res.json(results[0]);
  });
};

exports.addCourse = (req, res) => {
  const { title, description, price, thumbnail } = req.body;
  db.query(
    'INSERT INTO courses (title, description, price, thumbnail) VALUES (?, ?, ?, ?)',
    [title, description, price, thumbnail],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Course added successfully!");
    }
  );
};

exports.updateCourse = (req, res) => {
  const { title, description, price, thumbnail } = req.body;
  db.query(
    'UPDATE courses SET title=?, description=?, price=?, thumbnail=? WHERE course_id=?',
    [title, description, price, thumbnail, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Course updated successfully!");
    }
  );
};

exports.deleteCourse = (req, res) => {
  db.query('DELETE FROM courses WHERE course_id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("🗑️ Course deleted successfully!");
  });
};