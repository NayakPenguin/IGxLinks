// routes/usernames.js
const express = require('express');
const router = express.Router();
const AllUsernames = require('../models/AllUsernames');

// GET /usernames - public route to fetch all usernames
router.get('/', async (req, res) => {
  try {
    const usernames = await AllUsernames.find({}, { _id: 0, username: 1 });
    res.json(usernames.map(u => u.username));
  } catch (err) {
    console.error("Failed to fetch usernames:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
