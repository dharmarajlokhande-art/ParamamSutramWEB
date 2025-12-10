const db = require('../db');

exports.enrollUser = (req, res) => {
  const { user_id, course_id, payment_status } = req.body;
  db.query(
    'INSERT INTO enrollment (user_id, course_id, payment_status) VALUES (?, ?, ?)',
    [user_id, course_id, payment_status || 'pending'],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ User enrolled successfully!");
    }
  );
};

exports.getUserEnrollments = (req, res) => {
  db.query(
    `SELECT e.enrollment_id, e.payment_status, e.enrolled_at, c.course_id, c.title, c.price, c.thumbnail
     FROM enrollment e
     JOIN courses c ON e.course_id = c.course_id
     WHERE e.user_id=?`,
    [req.params.user_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

exports.updatePaymentStatus = (req, res) => {
  db.query(
    'UPDATE enrollment SET payment_status=? WHERE enrollment_id=?',
    [req.body.payment_status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Payment status updated!");
    }
  );
};

exports.deleteEnrollment = (req, res) => {
  db.query('DELETE FROM enrollment WHERE enrollment_id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("🗑️ Enrollment removed successfully!");
  });
};