const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const User = require("../models/User");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Review = require("../models/Review");

async function autoCreateCollections() {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect('mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Danh sách các model cần kiểm tra và tạo collection
    const models = [Category, Product, SubCategory, User, Order, OrderDetail, Review];

    // Lấy danh sách các collection hiện tại trong database
    const existingCollections = await mongoose.connection.db.listCollections().toArray();
    const existingCollectionNames = existingCollections.map(collection => collection.name);

    // Kiểm tra và tạo collection cho mỗi model
    for (const model of models) {
      const collectionName = model.collection.collectionName;
      
      if (existingCollectionNames.includes(collectionName)) {
        console.log(`Collection "${collectionName}" đã tồn tại.`);
      } else {
        try {
          await model.init();
          console.log(`Collection "${collectionName}" đã được tạo.`);
        } catch (err) {
          console.error(`Lỗi khi tạo collection "${model.modelName}":`, err.message);
        }
      }
    }
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
  } finally {
    // Đóng kết nối sau khi hoàn thành
    await mongoose.connection.close();
  }
}

autoCreateCollections();
