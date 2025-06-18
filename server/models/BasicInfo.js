const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platformId: { type: String, required: true },
  platformName: { type: String, required: true },
  iconUrl: { type: String, required: true },
  profileUrl: { type: String, default: '' }
});

const announcementSchema = new mongoose.Schema({
  title: { type: String, default: 'Announcement Title' },
  description: { type: String, default: 'This is your announcement description' },
  isVisible: { type: Boolean, default: true }
});

const basicInfoSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  org: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  profileImage: { 
    type: String, 
    default: 'https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png' 
  },
  socialLinks: [socialMediaSchema],
  announcement: announcementSchema,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BasicInfo', basicInfoSchema);