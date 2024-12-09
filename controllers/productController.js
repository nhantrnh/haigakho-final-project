// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8; // Items per page
    const skip = (page - 1) * limit;

    const { keyword, category, material, brand, priceRange } = req.query; // Lấy danh sách category từ query params
    let filter = {};
    let selectedCategories = [];
    let selectedMaterials = [];
    let selectedBrands = [];
    let selectedPriceRanges = [];

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100, label: "$0 - $100" },
      { min: 100, max: 200, label: "$100 - $200" },
      { min: 200, max: 300, label: "$200 - $300" },
      { min: 300, max: 500, label: "$300 - $500" },
      { min: 500, max: 10000, label: "$500+" },
    ];

    // Search filter
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Lọc theo category
    if (category) {
      const categoryNames = category ? category.split(",") : [];
      selectedCategories = Array.isArray(categoryNames)
        ? categoryNames
        : [categoryNames];

      // Lấy categories có name match
      const matchedCategories = await Category.find({
        name: { $in: selectedCategories },
      });
      // Filter bằng array của category IDs
      if (matchedCategories.length > 0) {
        filter.categoryId = {
          $in: matchedCategories.map((cat) => cat._id),
        };
      }
    }

    // Lọc theo material
    if (material) {
      const materialArray = material ? material.split(",") : [];
      selectedMaterials = Array.isArray(materialArray)
        ? materialArray
        : [materialArray];
      filter.material = { $in: selectedMaterials };
    }

    // Lọc theo brand
    if (brand) {
      const brandArray = brand ? brand.split(",") : [];
      selectedBrands = Array.isArray(brandArray) ? brandArray : [brandArray];
      filter.brand = { $in: selectedBrands };
    }

    // Price range filter
    if (priceRange) {
      const priceRangeArray = priceRange ? priceRange.split(",") : [];
      selectedPriceRanges = Array.isArray(priceRangeArray)
        ? priceRangeArray
        : [priceRangeArray];
      if (selectedPriceRanges.length > 0) {
        const priceQueries = selectedPriceRanges.map((range) => {
          const [min, max] = range.split("-").map(Number);
          return { price: { $gte: min, $lte: max } };
        });
        filter.$or = priceQueries;
      }
    }

    // Fetch sản phẩm từ database
    //const products = await Product.find(filter).populate("categoryId", "name");

    // Lấy danh sách tất cả các category
    const categories = await Category.find();

    // Lấy danh sách tất cả các material
    const materials = await Product.distinct("material");

    // Lấy danh sách tất cả các brand
    const brands = await Product.distinct("brand");

    // Build active filters array for tags
    let activeFilters = [];

    if (selectedCategories.length) {
      activeFilters = [
        ...activeFilters,
        ...selectedCategories.map((c) => ({
          type: "category",
          value: c,
          label: getFilterLabel("category", c, categories),
        })),
      ];
    }

    if (selectedMaterials.length) {
      activeFilters = [
        ...activeFilters,
        ...selectedMaterials.map((m) => ({
          type: "material",
          value: m,
          label: m,
        })),
      ];
    }

    if (selectedBrands.length) {
      activeFilters = [
        ...activeFilters,
        ...selectedBrands.map((b) => ({
          type: "brand",
          value: b,
          label: b,
        })),
      ];
    }

    if (selectedPriceRanges.length) {
      activeFilters = [
        ...activeFilters,
        ...selectedPriceRanges.map((p) => ({
          type: "priceRange",
          value: p,
          label: getFilterLabel("priceRange", p),
        })),
      ];
    }

    // Get total products count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Modify product query to include pagination
    const products = await Product.find(filter)
      .populate("categoryId", "name")
      .skip(skip)
      .limit(limit);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({
        products,
        categories,
        materials,
        brands,
        priceRanges,
        activeFilters,
        pagination: {
          page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          nextPage: page + 1,
          prevPage: page - 1,
        },
      });
    }

    res.render("products/list", {
      products,
      categories,
      materials,
      brands,
      priceRanges,
      keyword, // Truyền keyword vào view
      selectedCategories, // Truyền danh sách các category đã chọn
      selectedMaterials, // Truyền danh sách các material đã chọn
      selectedBrands, // Truyền danh sách các brand đã chọn
      selectedPriceRanges, // Truyền danh sách các price range đã chọn
      activeFilters, // Truyền danh sách các filter đã chọn
      removeFilterFromQuery, // Truyền hàm xử lý xóa filter
      currentQuery: req.query, // Truyền query params hiện tại
      pagination: {
        page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};


exports.paging = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = 8; // Items per page
    const skip = (page - 1) * limit;

    const filter = req.body.filter || {}; // Use filter sent in the body

    // Get total products count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get the products with pagination
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      pagination: {
        page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};
exports.filter = async (req, res) => {
  try {
    const { keyword, category, material, brand, priceRange } = req.body; // Take the filters from body
    let filter = {};

    // Search filter
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      const categoryNames = category.split(",");
      const matchedCategories = await Category.find({
        name: { $in: categoryNames },
      });
      if (matchedCategories.length > 0) {
        filter.categoryId = {
          $in: matchedCategories.map((cat) => cat._id),
        };
      }
    }

    // Filter by material
    if (material) {
      const materials = material.split(",");
      filter.material = { $in: materials };
    }

    // Filter by brand
    if (brand) {
      const brands = brand.split(",");
      filter.brand = { $in: brands };
    }

    // Filter by price range
    if (priceRange) {
      const priceRangeArray = priceRange.split(",");
      const priceQueries = priceRangeArray.map((range) => {
        const [min, max] = range.split("-").map(Number);
        return { price: { $gte: min, $lte: max } };
      });
      filter.$or = priceQueries;
    }

    res.json({ filter });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};
exports.sort = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.body; // Get sorting options from body
    const sortOptions = {};

    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    res.json({ sortOptions });
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
    // Fetch related products from same category, excluding current product
    const relatedProducts = await Product.find({
      categoryId: product.categoryId._id,
      _id: { $ne: product._id },
    })
      .limit(4) // Show max 4 related products
      .populate("categoryId", "name");

    res.render("products/detail", { product, relatedProducts });
  } catch (error) {
    console.error("Error:", error); // Thêm log
    res.status(500).send("Lỗi server");
  }
};

const getFilterLabel = (type, value, categories) => {
  switch (type) {
    case "category":
      const category = categories.find((c) => c._id.toString() === value);
      return category ? category.name : value;
    case "priceRange":
      const [min, max] = value.split("-");
      return `$${min} - $${max}`;
    default:
      return value;
  }
};
