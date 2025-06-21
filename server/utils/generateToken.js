// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log('====================================');
  console.log("Generate Token LOGS : ");
  console.log(user.email);
  console.log(user._id, user.id);
  console.log('====================================');
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name || user.displayName, // Optional if name needed
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
