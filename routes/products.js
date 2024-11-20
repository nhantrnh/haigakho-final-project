// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//router.get("/search", productController.searchProducts);
//router.get("/filter", productController.filterProducts);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);

module.exports = router;
