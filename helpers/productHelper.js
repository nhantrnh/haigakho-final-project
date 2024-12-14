// productHelper.js

const Product = require("../models/Product"); // Điều chỉnh đường dẫn đến model Product
const Category = require("../models/Category"); // Điều chỉnh đường dẫn đến model Category

// Helper functions
exports.buildSearchFilter = (keyword) => {
  if (!keyword) return null;
  return {
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  };
};

exports.buildCategoryFilter = async (category) => {
  if (!category) return null;
  const categoryNames = category.split(",");
  const matchedCategories = await Category.find({
    name: { $in: categoryNames },
  });
  return matchedCategories.length > 0
    ? { categoryId: { $in: matchedCategories.map((cat) => cat._id) } }
    : null;
};

exports.buildMaterialFilter = (material) => {
  if (!material) return null;
  const materials = material.split(",");
  return { material: { $in: materials } };
};

exports.buildBrandFilter = (brand) => {
  if (!brand) return null;
  const brands = brand.split(",");
  return { brand: { $in: brands } };
};

exports.buildPriceRangeFilter = (priceRange) => {
  if (!priceRange) return null;
  const ranges = priceRange.split(",");
  const priceQueries = ranges.map((range) => {
    const [min, max] = range.split("-").map(Number);
    return { price: { $gte: min, $lte: max } };
  });
  return { $or: priceQueries };
};

exports.buildActiveFilters = (selectedFilters, categories) => {
  let activeFilters = [];

  if (selectedFilters.selectedCategories.length) {
    activeFilters = [
      ...activeFilters,
      ...selectedFilters.selectedCategories.map((c) => ({
        type: "category",
        value: c,
        label: getFilterLabel("category", c, categories),
      })),
    ];
  }

  if (selectedFilters.selectedMaterials.length) {
    activeFilters = [
      ...activeFilters,
      ...selectedFilters.selectedMaterials.map((m) => ({
        type: "material",
        value: m,
        label: m,
      })),
    ];
  }

  if (selectedFilters.selectedBrands.length) {
    activeFilters = [
      ...activeFilters,
      ...selectedFilters.selectedBrands.map((b) => ({
        type: "brand",
        value: b,
        label: b,
      })),
    ];
  }

  if (selectedFilters.selectedPriceRanges.length) {
    activeFilters = [
      ...activeFilters,
      ...selectedFilters.selectedPriceRanges.map((p) => ({
        type: "priceRange",
        value: p,
        label: getFilterLabel("priceRange", p),
      })),
    ];
  }

  return activeFilters;
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
