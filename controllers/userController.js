// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const crypto = require("crypto");
const emailHelper = require("../helpers/emailHelper");
const { stat } = require("fs");

exports.getSignUp = (req, res) => {
  res.render("users/signup");
};

exports.signup = async (req, res) => {
  try {
    // Generate activation token
    const activationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      ...req.body,
      activationToken,
      activationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // Send activation email
    await emailHelper.sendActivationEmail(user, activationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email to activate your account.",
    });
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

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Please activate your account first. Check your email.",
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

// controllers/userController.js
exports.checkAvailability = async (req, res) => {
  try {
    const { field, value } = req.query;

    // Build query based on field
    const query = { [field]: value };

    // Check if username/email exists
    const exists = await User.findOne(query);

    res.json({
      available: !exists,
      message: exists
        ? `This ${field} is already taken`
        : `This ${field} is available`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getForgotPassword = (req, res) => {
  res.render("users/forgot-password");
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "No account with that email" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ message: "Please activate your account first" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    await emailHelper.sendResetPasswordEmail(user, resetToken);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.render("error", {
      status: 400,
      message: "Invalid or expired reset token",
      description:
        "Please check your email for the reset link or request a new one",
    });
  }

  res.render("users/reset-password", { token: req.params.token });
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

// filepath: controllers/userController.js
exports.activateAccount = async (req, res) => {
  try {
    const user = await User.findOne({
      activationToken: req.params.token,
      activationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).render("partials/activation-error", {
        message: "Invalid or expired activation link",
      });
    }

    user.isActive = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;
    await user.save();

    res.render("partials/activation-success");
  } catch (error) {
    res.status(500).render("partials/activation-error", {
      message: "Error activating account",
    });
  }
};
