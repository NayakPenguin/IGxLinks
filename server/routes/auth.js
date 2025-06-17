const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// 1. Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 2. Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user); // `req.user` now has DB user info

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: "localhost", // Or your domain: "igxl.ink"
    });

    res.redirect("http://localhost:3000/basic-info");
  }
);

// 3. Authenticated User Info
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

router.get("/me", authenticateJWT, (req, res) => {
  res.json(req.user);
});

// 4. Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logged out" });
});

module.exports = router;