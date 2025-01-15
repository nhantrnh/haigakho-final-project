// scripts/seed.js
const mongoose = require("mongoose");
const User = require("../models/User");
const { use } = require("passport");

//mongoose.connect("mongodb://localhost:27017/test");
mongoose.connect(
  "mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS/hagako-web"
);

const admin = [
  {
    username: "admin0",
    password: "$2a$10$/6JZVT0B4jE2y3yheJ6hUOnf2YaPEhool8kLJxQuO66StAB/NN.nm", // admin,hagako,2003
    email: "admin0@gmail.com",
    name: "Admin",
    address: "",
    role: "admin",
    status: "active",
    isEmailActive: true,
  },
  {
    username: "admin1",
    password: "$2a$10$/6JZVT0B4jE2y3yheJ6hUOnf2YaPEhool8kLJxQuO66StAB/NN.nm", // admin,hagako,2003
    email: "admin1@gmail.com",
    name: "Admin",
    address: "",
    role: "admin",
    status: "active",
    isEmailActive: true,
  },
  {
    username: "admin2",
    password: "$2a$10$/6JZVT0B4jE2y3yheJ6hUOnf2YaPEhool8kLJxQuO66StAB/NN.nm", // admin,hagako,2003
    email: "admin2@gmail.com",
    name: "Admin",
    address: "",
    role: "admin",
    status: "active",
    isEmailActive: true,
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
