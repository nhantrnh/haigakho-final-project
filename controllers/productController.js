// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getProducts = async (req, res) => {
  try {
    // Xử lý filter
    const filter = buildFilter(req.query);

    // Lấy data parallel
    const [products, filterOptions, priceRange] = await Promise.all([
      Product.find(filter).populate("categoryId", "name"),
      getFilterOptions(),
      getPriceRange(),
    ]);

    // Render với data đã được tổ chức
    res.render("products/list", {
      products,
      ...filterOptions,
      ...priceRange,
      keyword: req.query.keyword,
      selectedCategories: Array.isArray(req.query.category)
        ? req.query.category
        : [req.query.category],
      selectedMaterials: Array.isArray(req.query.material)
        ? req.query.material
        : [req.query.material],
      selectedBrands: Array.isArray(req.query.brand)
        ? req.query.brand
        : [req.query.brand],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "name description"
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

// Tách phần xử lý filter thành hàm riêng
const buildFilter = (params) => {
  const { keyword, category, material, brand, minPrice, maxPrice } = params;
  let filter = {};

  // Search filter
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // Category filter
  if (category) {
    filter.categoryId = {
      $in: Array.isArray(category) ? category : [category],
    };
  }

  // Material filter
  if (material) {
    filter.material = {
      $in: Array.isArray(material) ? material : [material],
    };
  }

  // Brand filter
  if (brand) {
    filter.brand = {
      $in: Array.isArray(brand) ? brand : [brand],
    };
  }

  // Price filter
  filter.price = {
    $gte: parseInt(minPrice) || 0,
    $lte: parseInt(maxPrice) || Number.MAX_SAFE_INTEGER,
  };

  return filter;
};

// Tách phần lấy dữ liệu thành hàm riêng
const getFilterOptions = async () => {
  const [categories, materials, brands] = await Promise.all([
    Category.find(),
    Product.distinct("material"),
    Product.distinct("brand"),
  ]);

  return { categories, materials, brands };
};

// Tách phần lấy giá min/max
const getPriceRange = async () => {
  const [maxPrice, minPrice] = await Promise.all([
    Product.find().sort({ price: -1 }).limit(1),
    Product.find().sort({ price: 1 }).limit(1),
  ]);

  return {
    maxPrice: maxPrice[0]?.price || 10000000,
    minPrice: minPrice[0]?.price || 0,
  };
};
