// index.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
require("./config/passport");

const app = express();

// Middlewares
app.use(express.json()); // to parse JSON bodies if needed

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true if using HTTPS in production
      httpOnly: true,
      sameSite: "lax", // change to 'none' + secure: true if using cross-site cookies over HTTPS
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});