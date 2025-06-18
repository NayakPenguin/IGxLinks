const express = require('express');
const router = express.Router();
const BasicInfo = require('../models/BasicInfo');
const { authenticateJWT } = require('./auth');

// Create or Update Basic Info (Protected Route)
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { userName, ...updateData } = req.body;
    const userEmail = req.user.email;

    // Check if document exists for this user
    const existingDoc = await BasicInfo.findOne({ userEmail });

    // If document doesn't exist (first-time creation) and userName is missing
    if (!existingDoc && !userName) {
      return res.status(400).json({ message: 'userName is required for initial setup' });
    }

    // Prepare update object
    const updateObj = {
      ...updateData,
      userEmail,
      lastUpdated: Date.now()
    };

    // Only include userName if it was provided OR if it's a new document
    if (userName || !existingDoc) {
      updateObj.userName = userName;
    }

    const basicInfo = await BasicInfo.findOneAndUpdate(
      { userEmail },
      updateObj,
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

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    // Find by username (case-insensitive)
    const basicInfo = await BasicInfo.findOne({ 
      userName: { $regex: new RegExp(username, 'i') } 
    });

    if (!basicInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return public-safe data (exclude sensitive fields if needed)
    const publicData = {
      userName: basicInfo.userName,
      name: basicInfo.name,
      bio: basicInfo.bio,
      profileImage: basicInfo.profileImage,
      socialLinks: basicInfo.socialLinks,
      announcement: basicInfo.announcement
    };

    res.json(publicData);
  } catch (err) {
    console.error('Public fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;