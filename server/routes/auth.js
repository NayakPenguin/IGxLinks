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
    const token = generateToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day (optional, adjust as needed)
      domain: "igxl.ink"
    });

    res.redirect("http://localhost:3000/basic-info"); // frontend route
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
