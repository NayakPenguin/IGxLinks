const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();
require("./config/passport");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/auth", require("./routes/testEmail"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});