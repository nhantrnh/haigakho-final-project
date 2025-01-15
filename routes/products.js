// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);

router.get(
  "/api/recommended-products",
  productController.getRecommendedProducts
);

module.exports = router;
