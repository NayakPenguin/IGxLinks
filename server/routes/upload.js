// routes/upload.js

const express = require('express');
const router = express.Router();
const { upload, uploadToS3 } = require('../utils/s3Uploader');
const { authenticateJWT } = require('./auth');

// Upload profile picture route
router.post('/upload-profile-picture', authenticateJWT, upload.single('profile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    // Optional: save `imageUrl` to user's profile in DB

    res.status(200).json({
      message: 'Upload successful',
      imageUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;
