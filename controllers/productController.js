// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name");
    console.log("Products:", products); // Debug log
    res.render("products/list", { products });
  } catch (error) {
    console.error("Error:", error.stack); // Thêm log
    res.status(500).send("Lỗi server");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "name"
    );
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    res.render("products/detail", { product });
  } catch (error) {
    console.error("Error:", error); // Thêm log
    res.status(500).send("Lỗi server");
  }
};
