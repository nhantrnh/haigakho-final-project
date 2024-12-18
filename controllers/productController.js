// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const {
  buildSearchFilter,
  buildCategoryFilter,
  buildMaterialFilter,
  buildBrandFilter,
  buildPriceRangeFilter,
  buildActiveFilters,
} = require("../helpers/productHelper");

// Constants
const ITEMS_PER_PAGE = 8;
const PRICE_RANGES = [
  { min: 0, max: 100, label: "$0 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: 300, label: "$200 - $300" },
  { min: 300, max: 500, label: "$300 - $500" },
  { min: 500, max: 10000, label: "$500+" },
];

const renderAjaxTemplates = async (
  res,
  { products, pagination, activeFilters }
) => {
  const [productListHTML, paginationHTML, filterTagHTML] = await Promise.all([
    renderTemplate(res, "partials/product-list", { products }),
    renderTemplate(res, "partials/pagination", {
      currentQuery: res.req.query,
      pagination,
    }),
    renderTemplate(res, "partials/filter-tag", { activeFilters }),
  ]);

  return { productListHTML, paginationHTML, filterTagHTML };
};

const renderTemplate = (res, template, data) => {
  return new Promise((resolve, reject) => {
    res.render(template, { ...data, layout: false }, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  });
};

// Main controller function
exports.getProducts = async (req, res) => {
  try {
    const { keyword, category, material, brand, priceRange } = req.query;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build filter
    const filterComponents = await Promise.all([
      buildSearchFilter(keyword),
      buildCategoryFilter(category),
      buildMaterialFilter(material),
      buildBrandFilter(brand),
      buildPriceRangeFilter(priceRange),
    ]);
    const filter = { $and: filterComponents.filter((f) => f !== null) };

    // Fetch data
    const [categories, materials, brands, totalProducts, products] =
      await Promise.all([
        Category.find(),
        Product.distinct("material"),
        Product.distinct("brand"),
        Product.countDocuments(filter),
        Product.find(filter)
          .populate("categoryId", "name")
          .skip(skip)
          .limit(ITEMS_PER_PAGE),
      ]);

    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    const selectedFilters = {
      selectedCategories: category?.split(",") || [],
      selectedMaterials: material?.split(",") || [],
      selectedBrands: brand?.split(",") || [],
      selectedPriceRanges: priceRange?.split(",") || [],
    };

    const activeFilters = buildActiveFilters(selectedFilters, categories);

    const pagination = {
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
    };

    // Handle AJAX requests
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      const templates = await renderAjaxTemplates(res, {
        products,
        pagination,
        activeFilters,
      });
      return res.json({ success: true, ...templates });
    }

    // Render full page
    return res.render("products/list", {
      products,
      categories,
      materials,
      brands,
      priceRanges: PRICE_RANGES,
      keyword,
      ...selectedFilters,
      activeFilters,
      currentQuery: req.query,
      pagination,
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
