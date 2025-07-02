// utils/s3Uploader.js

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
require('dotenv').config();

// Create S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Use memory storage to allow compression before uploading
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB upload max
});

// Upload compressed image to S3
const uploadToS3 = async (buffer, originalName, mimetype) => {
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 512 }) // Resize to safe dimensions
    .jpeg({ quality: 60 }) // Compress: tune quality down
    .toBuffer();

  // Ensure under 100KB (approximate)
  let finalBuffer = compressedBuffer;
  let quality = 60;
  while (finalBuffer.length > 100 * 1024 && quality > 20) {
    quality -= 10;
    finalBuffer = await sharp(buffer)
      .resize({ width: 512 })
      .jpeg({ quality })
      .toBuffer();
  }

  // console.log(finalBuffer.length / 1024);

  const fileName = `profile-pictures/${Date.now()}-${originalName.replace(/\s+/g, '_')}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: finalBuffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);

  const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  return imageUrl;
};

module.exports = { upload, uploadToS3 };
