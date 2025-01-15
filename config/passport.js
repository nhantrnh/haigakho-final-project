const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function (passport) {
  // LocalStrategy: Đăng nhập qua username và password
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          // Tìm user theo username
          const user = await User.findOne({ username: username });

          if (!user) {
            return done(null, false, { message: "Account not found" });
          }

          // Kiểm tra password
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Google OAuth2 Strategy: Đăng nhập bằng Google
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          // Kiểm tra xem user đã đăng ký chưa
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            // Nếu chưa, tạo tài khoản mới
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              role: "user",
              status: "active",
              isEmailActive: true,
              password: "$2a$10$ZpavtLzGigUEBxeKBxsPEOC0bClq6IhC6S3BZApSy9BLxwKwrEQWG",
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientIDFB: process.env.FACEBOOK_APP_ID,
        clientSecretFB: process.env.FACEBOOK_APP_SECRET,
        callbackURLFB: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email', 'photos'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0].value ? profile.photos[0].value : '',
              role: "user",
              status: "active",
              password: "$2a$10$ZpavtLzGigUEBxeKBxsPEOC0bClq6IhC6S3BZApSy9BLxwKwrEQWG",
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize user để lưu vào session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user để lấy thông tin user từ session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
