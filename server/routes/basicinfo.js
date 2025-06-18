const express = require('express');
const router = express.Router();
const BasicInfo = require('../models/BasicInfo');
const { authenticateJWT } = require('./auth');

// Create or Update Basic Info (Protected Route)
router.post('/', authenticateJWT, async (req, res) => {
  console.log(req.body);
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