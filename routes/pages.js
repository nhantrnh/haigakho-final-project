const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/blog", (req, res) => {
  res.render("pages/blog");
});

router.get("/cart", (req, res) => {
  let cart = req.session.cart;
  console.log("cart", cart);

  res.render("pages/cart", { cart: cart });
});

router.get("/checkout", (req, res) => {
  res.render("pages/checkout");
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

router.get("/admin", (req, res) => {
  res.render("pages/admin");
});

module.exports = router;
