const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isAuthenticated, isAuthenticatedAPI } = require("../middlewares/auth");

// Add authentication check endpoint
router.get("/check", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
  });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/"); // Redirect to a protected page after login
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// Facebook Callback route
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/"); // Redirect after successful login
  }
);

module.exports = router;
