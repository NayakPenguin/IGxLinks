const express = require("express");
const router = express.Router();
const Response = require("../models/Response");
const { authenticateJWT } = require("./auth");
const AllUsernames = require("../models/AllUsernames");

// 📨 POST /response — create new response
router.post("/", authenticateJWT, async (req, res) => {
  try {
    // console.log("🔍 Incoming POST /response");
    // console.log("req.user =>", req.user);
    // console.log("req.body =>", req.body);

    const { userContentId, type, data, ownerId } = req.body;

    if (!userContentId || !type || !data || !ownerId) {
      console.warn("❌ Missing required fields", {
        userContentId,
        type,
        data,
        ownerId
      });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResponse = await Response.create({
      userContentId,
      type,
      data,
      responderId: req.user._id || null,
      ownerId
    });

    res.status(201).json(newResponse);
  } catch (err) {
    console.error("Create response error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.send("Test route works");
});

// GET /response/:userName — get all responses for a user, grouped by type
router.get("/:userName", authenticateJWT, async (req, res) => {
  try {
    const { userName } = req.params;
    // console.log("userName : ", userName);
    const userEmailFromJWT = req.user.email;
    // console.log("userEmailFromJWT : ", userEmailFromJWT);

    // 1. Find username entry
    const userEntry = await AllUsernames.findOne({
      username: userName.toLowerCase().trim()
    });

    if (!userEntry) {
      return res.status(404).json({ message: "Username not found" });
    }

    // 2. Ensure the logged-in user owns this username
    if (userEntry.userEmail !== userEmailFromJWT) {
      return res.status(403).json({ message: "Access denied" });
    }

    // console.log("userEntry.userEmail === userEmailFromJWT");

    // 3. Find the User document to get _id
    const User = require("../models/user");
    const user = await User.findOne({ email: userEmailFromJWT });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Find all responses with ownerId = user._id
    const Response = require("../models/Response");
    const allResponses = await Response.find({ ownerId: userName }).sort({ createdAt: -1 });

    // 5. Group by `type`
    const grouped = allResponses.reduce((acc, curr) => {
      if (!acc[curr.type]) acc[curr.type] = [];
      acc[curr.type].push(curr);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    console.error("Fetch responses by username error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/by-content/:userContentId", authenticateJWT, async (req, res) => {
  try {
    const { userContentId } = req.params;
    // console.log("userContentId : ", userContentId);
    const userEmailFromJWT = req.user.email;
    // console.log("userEmailFromJWT : ", userEmailFromJWT);

    const userEntry = await AllUsernames.findOne({
      userEmail: userEmailFromJWT,
    });

    if (!userEntry) {
      return res.status(404).json({ message: "Username not found for user" });
    }

    const userName = userEntry.username;

    const filteredResponses = await Response.find({
      userContentId,
      ownerId: userName,
    }).sort({ createdAt: -1 });

    res.json(filteredResponses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
