// scripts/update-products.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const { use } = require("passport");
const Review = require("../models/Review");

mongoose.connect("mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS");

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
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Sản phẩm rất tốt, chất lượng vượt trội.",
        rating: 5,
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        content: "Giá cả hợp lý, đáng để mua.",
        rating: 4,
      },
      {
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Không hài lòng với chất lượng sản phẩm.",
        rating: 2,
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        content: "Dịch vụ khách hàng rất tốt.",
        rating: 5,
      },
      {
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Sản phẩm không như mong đợi.",
        rating: 3,
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        content: "Giao hàng nhanh chóng, sản phẩm tốt.",
        rating: 4,
      },
      {
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Chất lượng sản phẩm kém.",
        rating: 1,
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        content: "Sản phẩm rất đáng tiền.",
        rating: 5,
      },
      {
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Không hài lòng với dịch vụ.",
        rating: 2,
      },
      {
        productId: products[0]._id,
        userId: users[1]._id,
        content: "Sản phẩm tốt, sẽ mua lại.",
        rating: 4,
      },
      {
        productId: products[0]._id,
        userId: users[0]._id,
        content: "Chất lượng sản phẩm tuyệt vời.",
        rating: 5,
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
