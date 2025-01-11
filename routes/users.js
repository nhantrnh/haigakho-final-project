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

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/avatars/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// New protected routes
router.get("/profile", isAuthenticated, userController.getProfile);
router.get("/settings", isAuthenticated, userController.getSettings);
router.post("/settings/update", isAuthenticated, userController.updateSettings);
router.get("/orders", isAuthenticated, userController.getOrders);
router.get("/profile/update", isAuthenticated, userController.getUpdateProfile);
router.post(
  "/profile/update",
  isAuthenticated,
  upload.single("avatar"),
  userController.updateProfile
);

module.exports = router;
