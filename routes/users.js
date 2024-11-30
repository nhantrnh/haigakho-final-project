// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated, isGuest } = require("../middlewares/auth");

router.get("/signup", isGuest, userController.getSignUp);
router.post("/signup", isGuest, userController.signup);

router.get("/signin", isGuest, userController.getSignIn);
router.post("/signin", isGuest, userController.signin);

router.get("/signout", isAuthenticated, userController.signout);

// New protected routes
router.get("/profile", isAuthenticated, userController.getProfile);
router.get("/settings", isAuthenticated, userController.getSettings);
router.post("/settings/update", isAuthenticated, userController.updateSettings);
router.get("/orders", isAuthenticated, userController.getOrders);

module.exports = router;
