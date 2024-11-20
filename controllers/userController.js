// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res) => {
  res.render("users/signup");
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/index");
  } catch (error) {
    res.status(400).render("users/signup", { error: "Registration failed" });
  }
};

exports.getSignIn = (req, res) => {
  res.render("users/signin");
};

// Thêm phương thức signin
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).render("users/signin", {
        error: "Username does not exist",
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("users/signin", {
        error: "Incorrect password",
      });
    }

    // Lưu thông tin user vào session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/");
  } catch (error) {
    res.status(400).render("users/signin", {
      error: "Login failed",
    });
  }
};
