import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { user } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_ID
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create a user in your database
      let existingUser = await user.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new user({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
      await newUser.save();
      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await user.findById(id);
    done(null, foundUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
