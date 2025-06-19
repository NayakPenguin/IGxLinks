const express = require('express');
const router = express.Router();
const BasicInfo = require('../models/BasicInfo');
const AdvancedInfo = require('../models/AdvancedInfo');

// GET /all-info/:username (Public endpoint)
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Find BasicInfo by username (case-insensitive)
    const basicInfo = await BasicInfo.findOne({
      userName: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    if (!basicInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Find AdvancedInfo by userEmail
    const advancedInfo = await AdvancedInfo.findOne({
      userEmail: basicInfo.userEmail
    });

    // Build public-safe response
    const response = {
      basicInfo: {
        userName: basicInfo.userName,
        name: basicInfo.name,
        bio: basicInfo.bio,
        org: basicInfo.org,
        role: basicInfo.role,
        location: basicInfo.location,
        profileImage: basicInfo.profileImage,
        socialLinks: basicInfo.socialLinks,
        announcement: basicInfo.announcement
      },
      advancedInfo: advancedInfo || null // return null if not available
    };

    res.json(response);
  } catch (err) {
    console.error('AllInfo fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;