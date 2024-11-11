const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/blog", (req, res) => {
  res.render("blog");
});

router.get("/cart", (req, res) => {
  res.render("cart");
});

router.get("/checkout", (req, res) => {
  res.render("checkout");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/services", (req, res) => {
  res.render("services");
});

module.exports = router;
