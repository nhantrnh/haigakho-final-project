// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getSignUp = (req, res) => {
  res.render("users/signup");
};

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors).map((err) => err.message),
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username hoặc email đã tồn tại",
      });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getSignIn = (req, res) => {
  res.render("users/signin");
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Thông tin đăng nhập không chính xác",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

exports.signout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Có lỗi khi đăng xuất",
      });
    }
    req.session.destroy();
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  });
};

// Thêm các methods mới
exports.getProfile = (req, res) => {
  res.render("users/profile", {
    user: req.user,
    title: "Thông tin tài khoản",
    page: "profile",
  });
};

exports.getSettings = (req, res) => {
  res.render("users/settings", {
    user: req.user,
    title: "Cài đặt tài khoản",
    page: "settings",
  });
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = {
      email: req.body.email,
      // Thêm các trường cần update
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  res.render("users/orders", {
    user: req.user,
    title: "Đơn hàng của tôi",
    page: "orders",
  });
};

exports.getUpdateProfile = (req, res) => {
  res.render("users/update", {
    user: req.user,
    title: "Thông tin tài khoản",
    page: "update",
  });
};

// controllers/userController.js
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const updates = {
      name,
      email,
      phone,
      address,
      updatedAt: Date.now(),
    };

    // Handle avatar upload if provided
    if (req.file) {
      updates.avatar = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
