const express = require("express");
const router = express.Router();
const { isAuthenticated, isAuthenticatedAPI } = require("../middlewares/auth");

// Add authentication check endpoint
router.get("/check", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
  });
});

module.exports = router;
