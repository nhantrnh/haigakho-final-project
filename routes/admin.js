// routes/admin.js
const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/admin/adminController");

router.get("/users", isAuthenticated, isAdmin, adminController.getUsers);

router.get("/", isAuthenticated, isAdmin, adminController.getDashboard);

router.get(
  "/api/users",
  isAuthenticated,
  isAdmin,
  adminController.getUsersData
);

router.get(
  "/api/users/:id",
  isAuthenticated,
  isAdmin,
  adminController.getUserDetails
);

router.post(
  "/users/toggle-ban",
  isAuthenticated,
  isAdmin,
  adminController.toggleBanStatus
);

module.exports = router;
