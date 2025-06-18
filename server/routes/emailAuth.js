const express = require("express");
const router = express.Router();
const User = require("../models/user");
const OtpToken = require("../models/OtpToken");
const sendEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/generateOTP");
const generateEmailToken = require("../utils/generateEmailToken");

// 📩 Request OTP
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OtpToken.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendEmail(email, "Your OTP for IGxLinks", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to email." });
  } catch (err) {
    console.error("OTP request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OtpToken.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // Generate JWT token
    const token = generateEmailToken(user);

    // Send token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Clear used OTP
    await OtpToken.deleteOne({ email });

    res.json({ message: "Logged in", user: { email: user.email }, deleteLaterToken : token });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;