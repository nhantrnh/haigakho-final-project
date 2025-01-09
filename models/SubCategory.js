const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    categoryId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Category",
     required: true,
   },
  name: { type: String, required: true },
  description: String,
}, {collection: "subcategories"});

module.exports = mongoose.model("SubCategory", subcategorySchema);
