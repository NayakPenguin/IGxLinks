const mongoose = require("mongoose");

const otpTokenSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});

module.exports = mongoose.model("OtpToken", otpTokenSchema);
