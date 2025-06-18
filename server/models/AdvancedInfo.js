// server/models/AdvancedInfo.js
const mongoose = require('mongoose');

const AdvancedInfoSchema = new mongoose.Schema({
  userEmail: { 
    type: String, 
    required: true, 
    unique: true  // To associate with a specific user
  },
  localStorageData: { 
    type: mongoose.Schema.Types.Mixed,  // Stores any JSON structure
    default: {} 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('AdvancedInfo', AdvancedInfoSchema);