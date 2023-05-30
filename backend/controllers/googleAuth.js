const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const fun = catchAsync();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/users/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          const user = await User.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            password: process.env.DUMMY_PASSWORD,
            confirmPassword: process.env.DUMMY_PASSWORD,
            googleLogin: true,
          });
          return done(null, user);
        }
        return done(null, user);
      } catch (err) {
        console.error(err);
      }
    },
  ),
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
