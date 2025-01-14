const express = require("express");
const router = express.Router();
const { isAuthenticatedCheckout } = require("../middlewares/auth");

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/blog", (req, res) => {
  res.render("pages/blog");
});

router.get("/checkout", isAuthenticatedCheckout, (req, res) => {
  res.render("pages/checkout", { page: "checkout" });
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("/index", (req, res) => {
  res.render("pages/index");
});

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/services", (req, res) => {
  res.render("pages/services");
});

module.exports = router;
