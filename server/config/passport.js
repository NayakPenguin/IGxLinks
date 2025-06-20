const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // Use email as unique identity
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            googleId: profile.id, // store it optionally
            name: profile.displayName,
            photo: profile.photos?.[0]?.value,
            provider: "google",
          });
        }

        return done(null, {
          _id: user._id,
          email: user.email,
          name: user.name,
          photo: user.photo,
        });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
