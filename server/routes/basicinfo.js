const express = require('express');
const router = express.Router();
const BasicInfo = require('../models/BasicInfo');
const { authenticateJWT } = require('./auth');

// Create or Update Basic Info (Protected Route)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { userEmail, userName, ...updateData } = req.body;

    // Validate required fields
    if (!userEmail || !userName) {
      return res.status(400).json({ message: 'userEmail and userName are required' });
    }

    // Upsert the document
    const basicInfo = await BasicInfo.findOneAndUpdate(
      { userEmail },
      { ...updateData, userEmail, userName, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.json(basicInfo);
  } catch (err) {
    console.error('BasicInfo error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Basic Info (Protected)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const userEmail = req.user.email; // From JWT
    const basicInfo = await BasicInfo.findOne({ userEmail });
    res.json(basicInfo || { message: 'No info found' });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;