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
    res.status(400).render("users/signup", { error: "Đăng ký thất bại" });
  }
};

exports.getSignIn = (req, res) => {
  res.render("users/signin");
};
