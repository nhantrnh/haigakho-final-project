// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.getSignUp);
router.post("/signup", userController.signup);

router.get("/signin", userController.getSignIn);
router.post("/signin", userController.signin);

module.exports = router;
