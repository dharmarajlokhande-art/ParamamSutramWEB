const db = require('../db');

// 1. Record a purchase and auto-enroll user
exports.recordPurchase = (req, res) => {
  const { user_id, course_id, group_id, amount, payment_id } = req.body;

  // Insert purchase record
  db.query(
    'INSERT INTO purchase (user_id, course_id, group_id, amount, payment_id) VALUES (?, ?, ?, ?, ?)',
    [user_id, course_id || null, group_id || null, amount, payment_id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      // If course purchase → enroll directly
      if (course_id) {
        db.query(
          'INSERT INTO enrollment (user_id, course_id, payment_status) VALUES (?, ?, ?)',
          [user_id, course_id, 'paid'],
          (err2) => {
            if (err2) return res.status(500).send(err2);
            return res.send("✅ Purchase recorded & user enrolled in course!");
          }
        );
      }

      // If group purchase → enroll in all courses inside group
      else if (group_id) {
        db.query(
          'SELECT course_id FROM group_courses WHERE group_id=?',
          [group_id],
          (err3, courses) => {
            if (err3) return res.status(500).send(err3);

            courses.forEach(course => {
              db.query(
                'INSERT INTO enrollment (user_id, course_id, payment_status) VALUES (?, ?, ?)',
                [user_id, course.course_id, 'paid']
              );
            });

            return res.send("✅ Purchase recorded & user enrolled in all group courses!");
          }
        );
      }

      else {
        return res.send("✅ Purchase recorded successfully!");
      }
    }
  );
};

// 2. Get all purchases for a user
exports.getUserPurchases = (req, res) => {
  const { user_id } = req.params;

  db.query(
    `SELECT p.purchase_id, p.amount, p.payment_id, p.created_at,
            c.title AS course_title, g.title AS group_title
     FROM purchase p
     LEFT JOIN courses c ON p.course_id = c.course_id
     LEFT JOIN groups g ON p.group_id = g.group_id
     WHERE p.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};