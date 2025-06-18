const express = require('express');
const router = express.Router();
const AdvancedInfo = require('../models/AdvancedInfo');
const { authenticateJWT } = require('./auth');
const BasicInfo = require('../models/BasicInfo'); // For username validation

// Create or Update AdvancedInfo (Protected Route)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { localStorageData } = req.body;
    const userEmail = req.user.email; // From JWT

    // Optional: Verify user exists in BasicInfo first
    const user = await BasicInfo.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found in BasicInfo' });
    }

    // Update or create AdvancedInfo
    const advancedInfo = await AdvancedInfo.findOneAndUpdate(
      { userEmail },
      { localStorageData, lastUpdated: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(advancedInfo);
  } catch (err) {
    console.error('AdvancedInfo save error:', err);
    res.status(500).json({ 
      message: err.message || 'Server error',
      ...(err.errors && { errors: err.errors }) // Mongoose validation errors
    });
  }
});

// Get AdvancedInfo (Protected)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const advancedInfo = await AdvancedInfo.findOne({ userEmail });

    if (!advancedInfo) {
      return res.status(404).json({ message: 'No advanced info found' });
    }

    // Return only the data (exclude Mongoose internals)
    res.json({
      localStorageData: advancedInfo.localStorageData,
      lastUpdated: advancedInfo.lastUpdated
    });
  } catch (err) {
    console.error('AdvancedInfo fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Public AdvancedInfo by Username (Unprotected)
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Find username in BasicInfo (case-insensitive)
    const basicInfo = await BasicInfo.findOne({
      userName: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (!basicInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Fetch associated AdvancedInfo (only public-safe fields)
    const advancedInfo = await AdvancedInfo.findOne({
      userEmail: basicInfo.userEmail
    });

    if (!advancedInfo) {
      return res.status(404).json({ message: 'No advanced data available' });
    }

    res.json(advancedInfo);
  } catch (err) {
    console.error('Public advanced fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;