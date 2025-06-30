const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Passport setup
require("./config/passport");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN, // Your frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/auth", require("./routes/auth"));         // Google login
app.use("/auth", require("./routes/emailAuth"));    // Email OTP login
app.use("/auth", require("./routes/testEmail"));    // SMTP test

app.use('/basic-info', require('./routes/basicinfo'));
app.use('/advanced-info', require('./routes/advancedinfo')); 
app.use("/response", require("./routes/response"));
app.use('/all-info', require('./routes/alldata'));
app.use('/api', require('./routes/upload'));
app.use('/usernames', require('./routes/usernames'));

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});