const express = require('express');
const router = express.Router();
const BasicInfo = require('../models/BasicInfo');
const { authenticateJWT } = require('./auth');
const AllUsernames = require('../models/AllUsernames');

// routes/basicinfo.js

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { userName, ...updateData } = req.body;
    console.log("req.user : ", req.user);
    const userEmail = req.user.email;

    // Check if document exists
    const existingDoc = await BasicInfo.findOne({ userEmail });

    // First-time creation validation
    if (!existingDoc && !userName) {
      return res.status(400).json({ message: 'Username is required for initial setup' });
    }

    // Check if username is being changed or set for the first time
    if (userName && userName !== existingDoc?.userName) {
      // Check if username already exists in AllUsernames
      const usernameExists = await AllUsernames.findOne({ username: userName.toLowerCase().trim() });
      
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      console.log(userEmail);

      // Add to AllUsernames collection
      await AllUsernames.create({
        username: userName.toLowerCase().trim(),
        userEmail: userEmail ? userEmail : "email-error"
      });

      // If updating existing doc, remove old username from AllUsernames
      if (existingDoc?.userName) {
        await AllUsernames.deleteOne({ username: existingDoc.userName.toLowerCase().trim() });
      }
    }

    // Update BasicInfo
    const updateObj = {
      ...updateData,
      userEmail,
      lastUpdated: Date.now()
    };

    if (userName) {
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