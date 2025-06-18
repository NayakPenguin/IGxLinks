// models/AllUsernames.js
const mongoose = require('mongoose');

const allUsernamesSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: false,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AllUsernames', allUsernamesSchema);