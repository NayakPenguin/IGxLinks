const express = require('express');
const router = express.Router();
const upload = require('../utils/s3Uploader');
const { authenticateJWT } = require('./auth');

// Protected route to upload profile picture
router.post('/upload-profile-picture', authenticateJWT, upload.single('profile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Optionally: update user's profile image in DB here

    res.status(200).json({
      message: 'Upload successful',
      imageUrl: req.file.location, // S3 public URL
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;
