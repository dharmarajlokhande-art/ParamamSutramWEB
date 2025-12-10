const db = require('../db');

// 1. Get user profile by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  db.query(
    'SELECT user_id, name, email, avatar_url, created_at FROM users WHERE user_id=?',
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (!results.length) return res.status(404).send("❌ User not found");
      res.json(results[0]);
    }
  );
};

// 2. Get logged-in user's profile (from JWT)
exports.getMyProfile = (req, res) => {
  const userId = req.user.user_id;

  db.query(
    'SELECT user_id, name, email, avatar_url, created_at FROM users WHERE user_id=?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (!results.length) return res.status(404).send("❌ User not found");
      res.json(results[0]);
    }
  );
};

// 3. Update user avatar by ID
exports.updateUserAvatar = (req, res) => {
  const { id } = req.params;
  const { avatar_url } = req.body;

  db.query(
    'UPDATE users SET avatar_url=? WHERE user_id=?',
    [avatar_url, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Avatar updated successfully!");
    }
  );
};

// 4. Update user name by ID
exports.updateUserName = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query(
    'UPDATE users SET name=? WHERE user_id=?',
    [name, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Name updated successfully!");
    }
  );
};

// 5. Update logged-in user's profile (from JWT)
exports.updateMyProfile = (req, res) => {
  const userId = req.user.user_id;
  const { name, avatar_url } = req.body;

  db.query(
    'UPDATE users SET name=?, avatar_url=? WHERE user_id=?',
    [name, avatar_url, userId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Profile updated successfully!");
    }
  );
};

// 6. Get all courses the logged-in user is enrolled in
exports.getMyCourses = (req, res) => {
  const userId = req.user.user_id;

  db.query(
    `SELECT e.enrollment_id, e.payment_status, e.enrolled_at,
            c.course_id, c.title, c.description, c.price, c.thumbnail,
            g.group_id, g.title AS group_title
     FROM enrollment e
     JOIN courses c ON e.course_id = c.course_id
     LEFT JOIN group_courses gc ON e.course_id = gc.course_id
     LEFT JOIN groups g ON gc.group_id = g.group_id
     WHERE e.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

// 7. Get all purchases for the logged-in user
exports.getMyPurchases = (req, res) => {
  const userId = req.user.user_id;

  db.query(
    `SELECT p.purchase_id, p.amount, p.payment_id, p.created_at,
            c.course_id, c.title AS course_title,
            g.group_id, g.title AS group_title
     FROM purchase p
     LEFT JOIN courses c ON p.course_id = c.course_id
     LEFT JOIN groups g ON p.group_id = g.group_id
     WHERE p.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

// 8. Get consolidated dashboard data for logged-in user
exports.getMyDashboard = (req, res) => {
  const userId = req.user.user_id;

  // Fetch profile
  db.query(
    'SELECT user_id, name, email, avatar_url, created_at FROM users WHERE user_id=?',
    [userId],
    (err, profileResults) => {
      if (err) return res.status(500).send(err);
      if (!profileResults.length) return res.status(404).send("❌ User not found");

      const profile = profileResults[0];

      // Fetch purchases
      db.query(
        `SELECT p.purchase_id, p.amount, p.payment_id, p.created_at,
                c.course_id, c.title AS course_title,
                g.group_id, g.title AS group_title
         FROM purchase p
         LEFT JOIN courses c ON p.course_id = c.course_id
         LEFT JOIN groups g ON p.group_id = g.group_id
         WHERE p.user_id = ?`,
        [userId],
        (err2, purchaseResults) => {
          if (err2) return res.status(500).send(err2);

          // Fetch enrollments
          db.query(
            `SELECT e.enrollment_id, e.payment_status, e.enrolled_at,
                    c.course_id, c.title, c.description, c.price, c.thumbnail,
                    g.group_id, g.title AS group_title
             FROM enrollment e
             JOIN courses c ON e.course_id = c.course_id
             LEFT JOIN group_courses gc ON e.course_id = gc.course_id
             LEFT JOIN groups g ON gc.group_id = g.group_id
             WHERE e.user_id = ?`,
            [userId],
            (err3, enrollmentResults) => {
              if (err3) return res.status(500).send(err3);

              // Consolidated response
              res.json({
                profile,
                purchases: purchaseResults,
                enrollments: enrollmentResults
              });
            }
          );
        }
      );
    }
  );
};