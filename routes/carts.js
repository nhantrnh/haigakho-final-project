const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const controller = require("../controllers/productController");
const productController = require("../controllers/productController");

router.get("/get-cart", cartController.getCart);

// Route để thêm sản phẩm vào giỏ hàng
router.post("/add-to-cart", cartController.addToCart);

// Route để cập nhật số lượng sản phẩm trong giỏ hàng
router.post("/update-cart", cartController.updateCart);

// Route để xoá sản phẩm khỏi giỏ hàng
router.post("/remove-from-cart", cartController.removeFromCart);

module.exports = router;
