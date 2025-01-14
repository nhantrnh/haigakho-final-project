// config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
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
