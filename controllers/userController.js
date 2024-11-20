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

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Tên đăng nhập không đúng." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng." });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: "Đăng nhập thành công." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Không thể đăng xuất");
    }
    res.redirect("/signin");
  });
};
