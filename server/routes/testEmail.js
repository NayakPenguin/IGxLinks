const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail("nayak.primary@gmail.com", "Test Email", "Hello from IGxLinks via Zoho SMTP!");
    res.send("Email sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email.");
  }
});

module.exports = router;
