const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isAuthenticated, isAuthenticatedAPI } = require("../middlewares/auth");

router.get("/check", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
  });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/"); 
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
