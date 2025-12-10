const db = require('../db');

exports.getGroups = (req, res) => {
  db.query('SELECT * FROM groups', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getGroupById = (req, res) => {
  db.query('SELECT * FROM groups WHERE group_id=?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).send("Group not found");
    res.json(results[0]);
  });
};

exports.addGroup = (req, res) => {
  const { title, description, price } = req.body;
  db.query(
    'INSERT INTO groups (title, description, price) VALUES (?, ?, ?)',
    [title, description, price],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Group created successfully!");
    }
  );
};

exports.updateGroup = (req, res) => {
  const { title, description, price } = req.body;
  db.query(
    'UPDATE groups SET title=?, description=?, price=? WHERE group_id=?',
    [title, description, price, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ Group updated successfully!");
    }
  );
};

exports.deleteGroup = (req, res) => {
  db.query('DELETE FROM groups WHERE group_id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("🗑️ Group deleted successfully!");
  });
};