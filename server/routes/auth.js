const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const User = require("../models/user");
const router = express.Router();

// ENV vars
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const NODE_ENV = process.env.NODE_ENV || "development";

// Redirect to Google for login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const { email, name, photo } = req.user;

      // Check if user already exists
      let user = await User.findOne({ email });

      // If user doesn't exist, create
      if (!user) {
        user = new User({
          email,
          name,
          photo,
          provider: "google",
        });
        await user.save();
      }

      // Generate JWT
      const token = generateToken(user);

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        domain: new URL(CLIENT_ORIGIN).hostname,
      });

      res.redirect(`${CLIENT_ORIGIN}/basic-info`);
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.status(500).send("OAuth Error");
    }
  }
);

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Return user info if authenticated
router.get("/me", authenticateJWT, (req, res) => {
  res.json(req.user);
});

// Logout endpoint
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    domain: new URL(CLIENT_ORIGIN).hostname,
  });
  res.send({ message: "Logged out" });
});

// Export auth middleware too
router.authenticateJWT = authenticateJWT;

module.exports = router;