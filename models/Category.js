const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
}, {collection: "categories"});

module.exports = mongoose.model("Category", categorySchema);
