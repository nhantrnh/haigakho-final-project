// controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");

// // Helper functions
// const buildFilterUrl = (originalUrl, host) => {
//   return (filterName, value) => {
//     const currentUrl = new URL(originalUrl, `http://${host}`);
//     const params = new URLSearchParams(currentUrl.search);

//     if (Array.isArray(filterName)) {
//       filterName.forEach((name) => params.delete(name));
//     } else if (value) {
//       const values = params.getAll(filterName);
//       params.delete(filterName);
//       values.forEach((v) => {
//         if (v !== value) params.append(filterName, v);
//       });
//     } else {
//       params.delete(filterName);
//     }

//     return `${currentUrl.pathname}?${params.toString()}`;
//   };
// };

// const buildFilter = (query) => {
//   const { keyword, category, material, brand } = query;
//   let filter = {};

//   // Search filter
//   if (keyword) {
//     filter.$or = [
//       { name: { $regex: keyword, $options: "i" } },
//       { description: { $regex: keyword, $options: "i" } },
//     ];
//   }

//   // Category filter
//   if (category) {
//     filter.categoryId = {
//       $in: Array.isArray(category) ? category : [category],
//     };
//   }

//   // Material filter
//   if (material) {
//     filter.material = { $in: Array.isArray(material) ? material : [material] };
//   }

//   // Brand filter
//   if (brand) {
//     filter.brand = { $in: Array.isArray(brand) ? brand : [brand] };
//   }

//   // // Price filter
//   // if (minPrice || maxPrice) {
//   //   filter.price = {
//   //     $gte: Number(minPrice) || 0,
//   //     $lte: Number(maxPrice) || Number.MAX_SAFE_INTEGER,
//   //   };
//   // }

//   return filter;
// };

// const buildPriceFilter = (query) => {
//   const { minPrice, maxPrice } = query;
//   if ("minPrice" in query || "maxPrice" in query) {
//     return {
//       $gte: Number(minPrice) || 0,
//       $lte: Number(maxPrice) || Number.MAX_SAFE_INTEGER,
//     };
//   }
//   return null;
// };

// // Controller
// exports.getProducts = async (req, res) => {
//   try {
//     // 1. Xây dựng filter từ query params
//     const filter = buildFilter(req.query);

//     // 2. Thêm price filter chỉ khi có trong query params
//     if ("minPrice" in req.query || "maxPrice" in req.query) {
//       filter.price = {};
//       if ("minPrice" in req.query) {
//         filter.price.$gte = Number(req.query.minPrice);
//       }
//       if ("maxPrice" in req.query) {
//         filter.price.$lte = Number(req.query.maxPrice);
//       }
//     }

//     // 2. Lấy các selected values
//     const selectedFilters = {
//       categories: req.query.category
//         ? Array.isArray(req.query.category)
//           ? req.query.category
//           : [req.query.category]
//         : [],
//       materials: req.query.material
//         ? Array.isArray(req.query.material)
//           ? req.query.material
//           : [req.query.material]
//         : [],
//       brands: req.query.brand
//         ? Array.isArray(req.query.brand)
//           ? req.query.brand
//           : [req.query.brand]
//         : [],
//     };

//     // 3. Lấy data từ DB
//     const [products, categories, materials, brands, priceRange] =
//       await Promise.all([
//         Product.find(filter).populate("categoryId", "name"),
//         Category.find(),
//         Product.distinct("material"),
//         Product.distinct("brand"),
//         Promise.all([
//           Product.find().sort({ price: -1 }).limit(1),
//           Product.find().sort({ price: 1 }).limit(1),
//         ]),
//       ]);

//     // 4. Xử lý price range
//     const [maxProduct, minProduct] = priceRange;
//     const defaultMinPrice = minProduct[0]?.price || 0;
//     const defaultMaxPrice = maxProduct[0]?.price || 10000000;

//     // 5. Render view với data đã xử lý
//     res.render("products/list", {
//       products,
//       categories,
//       materials,
//       brands,
//       keyword: req.query.keyword || "",
//       selectedCategories: selectedFilters.categories,
//       selectedMaterials: selectedFilters.materials,
//       selectedBrands: selectedFilters.brands,
//       minPrice:
//         "minPrice" in req.query ? Number(req.query.minPrice) : defaultMinPrice,
//       maxPrice:
//         "maxPrice" in req.query ? Number(req.query.maxPrice) : defaultMaxPrice,
//       showPriceTag: "minPrice" in req.query || "maxPrice" in req.query,
//       removeFilterUrl: buildFilterUrl(req.originalUrl, req.headers.host),
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Server error");
//   }
// };

exports.getProducts = async (req, res) => {
  try {
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
      // Kiểm tra nếu người dùng chọn nhiều danh mục
      selectedCategories = Array.isArray(category) ? category : [category];
      filter.categoryId = { $in: selectedCategories };
    }

    // Lọc theo material
    if (material) {
      selectedMaterials = Array.isArray(material) ? material : [material];
      filter.material = { $in: selectedMaterials };
    }

    // Lọc theo brand
    if (brand) {
      selectedBrands = Array.isArray(brand) ? brand : [brand];
      filter.brand = { $in: selectedBrands };
    }

    // Price range filter
    if (priceRange) {
      selectedPriceRanges = Array.isArray(priceRange)
        ? priceRange
        : [priceRange];
      if (selectedPriceRanges.length > 0) {
        const priceQueries = selectedPriceRanges.map((range) => {
          const [min, max] = range.split("-").map(Number);
          return { price: { $gte: min, $lte: max } };
        });
        filter.$or = priceQueries;
      }
    }

    // Fetch sản phẩm từ database
    const products = await Product.find(filter).populate("categoryId", "name");

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

    // Build query string helper
    const removeFilterFromQuery = (filterType, filterValue) => {
      const params = new URLSearchParams(req.query);
      if (Array.isArray(params.getAll(filterType))) {
        // Remove specific value from array
        const values = params
          .getAll(filterType)
          .filter((v) => v !== filterValue);
        params.delete(filterType);
        values.forEach((v) => params.append(filterType, v));
      } else {
        // Remove single value
        params.delete(filterType);
      }
      return params.toString();
    };

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
