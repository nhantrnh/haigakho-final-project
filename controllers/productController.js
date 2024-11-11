// controllers/productController.js
const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/list", { products });
  } catch (error) {
    res.status(500).send("Lỗi server");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    res.render("products/detail", { product });
  } catch (error) {
    res.status(500).send("Lỗi server");
  }
};
