// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  brand: { type: String, default: "No brand" },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  imageUrl: [String],
  stock: { type: Number, default: 0 },
  material: String,
  colors: [String],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["onStock", "suspend", "ouOfStock"],
    default: "onStock",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {collection: "products"});

module.exports = mongoose.model("Product", productSchema);
