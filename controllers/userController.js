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
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors).map((err) => err.message),
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username or email already exists",
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
        message: info.message || "Incorrect login information",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
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
        message: "Error logging out",
      });
    }
    req.session.destroy();
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  });
};

// Thêm các methods mới
exports.getProfile = (req, res) => {
  res.render("users/profile", {
    user: req.user,
    title: "Account information",
    page: "profile",
  });
};

exports.getSettings = (req, res) => {
  res.render("users/settings", {
    user: req.user,
    title: "Account settings",
    page: "settings",
  });
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate new password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password does not match",
      });
    }

    // Get current user
    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  res.render("users/orders", {
    user: req.user,
    title: "My order",
    page: "orders",
  });
};

exports.getUpdateProfile = (req, res) => {
  res.render("users/update", {
    user: req.user,
    title: "Account information",
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
