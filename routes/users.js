// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated, isGuest } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

router.get("/signup", isGuest, userController.getSignUp);
router.post("/signup", isGuest, userController.signup);

router.get("/signin", isGuest, userController.getSignIn);
router.post("/signin", isGuest, userController.signin);

router.get("/signout", isAuthenticated, userController.signout);

router.get("/check-availability", userController.checkAvailability);

router.get("/activate/:token", userController.activateAccount);

router.get("/forgot-password", userController.getForgotPassword);
router.post("/forgot-password", userController.forgotPassword);
router.get("/reset-password/:token", userController.getResetPassword);
router.post("/reset-password/:token", userController.resetPassword);

const { uploadAvatar } = require("../config/cloudinary");
// New protected routes
router.get("/profile", isAuthenticated, userController.getProfile);
router.get("/settings", isAuthenticated, userController.getSettings);
router.post(
  "/settings/password/update",
  isAuthenticated,
  userController.updatePassword
);
router.get("/orders", isAuthenticated, userController.getOrders);
router.get("/profile/update", isAuthenticated, userController.getUpdateProfile);
router.post(
  "/profile/update",
  isAuthenticated,
  uploadAvatar.single("avatar"),
  userController.updateProfile
);

module.exports = router;
