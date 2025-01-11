// scripts/update-products.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const { use } = require("passport");
const Review = require("../models/Review");

mongoose.connect("mongodb://localhost:27017/test");

async function updateProducts() {
  try {
    // Example: Update a specific product by name
    await Product.updateOne(
      { name: "Erin Armchair" },
      {
        $set: {
          price: 499.0,
          description: "Updated description...",
          // Add other fields to update
        },
      }
    );

    // Example: Update multiple products matching a condition
    await Product.updateMany(
      { categoryId: "673bf03378dc2d50619a2945" }, // Chair category
      {
        $set: {
          discount: 10,
          // Add other common updates
        },
      }
    );

    console.log("Products updated successfully!");
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Hàm chạy seed
const seedDatabase = async () => {
  try {
    // First fetch all categories
    const products = await Product.find();
    const users = await User.find();

    // Make sure we have categories
    if (!products.length) {
      console.error("No products found");
      return;
    }

    if (!users.length) {
      console.error("No users found");
      return;
    }

    const reviews = [
      {
        productId: products[1]._id,
        userId: users[0]._id,
        content: "Best product ever!",
        rating: 5,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg",
        ],
      },
    ];

    // Thêm dữ liệu mới
    await Review.insertMany(reviews);
    console.log("Data seeded successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
};

//updateProducts();
seedDatabase();
