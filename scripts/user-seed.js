// scripts/seed.js
const mongoose = require("mongoose");
const User = require("../models/User");
const { use } = require("passport");

mongoose.connect("mongodb://localhost:27017/test");

const admin = [
  {
    username: "admin0",
    password: "$2a$10$/6JZVT0B4jE2y3yheJ6hUOnf2YaPEhool8kLJxQuO66StAB/NN.nm", // admin,hagako,2003
    email: "admin01@gmail.com",
    name: "Admin",
    address: "",
    avatar: "",
    role: "admin",
    status: "active",
    isActive: true,
  },
];

async function seedDB() {
  try {
    //await Category.deleteMany({});
    await User.insertMany(admin);
    console.log("Đã thêm dữ liệu mẫu thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();
