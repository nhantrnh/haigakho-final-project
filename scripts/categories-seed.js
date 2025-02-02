// scripts/seed.js
const mongoose = require("mongoose");
const Category = require("../models/Category");

mongoose.connect(
  "mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS/hagako-web"
);

const categories = [
  {
    name: "Table",
    description: "Dining tables, coffee tables, and more.",
  },
  {
    name: "Sofa",
    description: "Comfortable and stylish sofas for your living room.",
  },
  {
    name: "Chair",
    description: "Various types of chairs for home and office.",
  },
  {
    name: "Shelves",
    description: "Stylish shelves for your living room or office.",
  },
  {
    name: "Lamp",
    description: "Stylish lamps for your home.",
  },
];

async function seedDB() {
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log("Đã thêm dữ liệu mẫu thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();
