const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

// Add a new user
router.post('/', (req, res) => {
    const { username, password, name, email, phone } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and Password are required' });
    }
    db.query('INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)', 
      [username, password, name, email, phone], 
      (err, results) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({ id: results.insertId, username, name, email, phone });
        }
      }
    );
  });

// Update a user
router.put('/:id', (req, res) => {
    const { username, password, name, email, phone } = req.body;
    const { id } = req.params;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and Password are required' });
    }
    db.query('UPDATE users SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ?', 
      [username, password, name, email, phone, id], 
      (err, results) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: 'User Updated', id, username, name, email, phone });
        }
      }
    );
  });

// Delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'User Deleted', id });
      }
    });
});

module.exports = router;