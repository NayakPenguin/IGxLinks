const express = require('express');
const router = express.Router();
const AdvancedInfo = require('../models/AdvancedInfo');
const { authenticateJWT } = require('./auth');
const BasicInfo = require('../models/BasicInfo'); // For username validation

// routes/advancedinfo.js

// Create or Update AdvancedInfo (Protected Route)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { localStorageData } = req.body;
    const userEmail = req.user.email; // Extracted from JWT

    // // console.log("▶️ POST /advancedinfo called");
    // // console.log("📩 Extracted userEmail from JWT:", userEmail);

    if (!userEmail) {
      console.warn("❌ Missing userEmail in JWT");
      return res.status(400).json({ message: 'Missing userEmail from token' });
    }

    // Step 1: Check user exists in BasicInfo
    // // console.log("🔍 Searching for user in BasicInfo...");
    const user = await BasicInfo.findOne({ userEmail });

    if (!user) {
      console.warn(`❌ No BasicInfo found for email: ${userEmail}`);
      return res.status(404).json({ message: 'User not found in BasicInfo' });
    }
    // // console.log("✅ BasicInfo found for user:", user.userName || userEmail);

    // Step 2: Upsert AdvancedInfo
    // // console.log("📦 Upserting AdvancedInfo...");
    const advancedInfo = await AdvancedInfo.findOneAndUpdate(
      { userEmail },
      { $set: { localStorageData, lastUpdated: Date.now(), userEmail } },
      { new: true, upsert: true, runValidators: true }
    );

    // // console.log("✅ AdvancedInfo saved/updated successfully");
    res.json(advancedInfo);
  } catch (err) {
    console.error("🔥 AdvancedInfo save error:", err);
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