const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  userContentId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  ownerId: {
    type: String,
    ref: "User",
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Response", responseSchema);