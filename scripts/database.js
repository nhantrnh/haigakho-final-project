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
    await mongoose.connect('mongodb+srv://haigakho:haigakho@hcmus.iiqtx.mongodb.net/hagako-web?retryWrites=true&w=majority&appName=HCMUS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const models = [Category, Product, SubCategory, User, Order, OrderDetail, Review];

    for (const model of models) {
      try {
        await model.init();
        console.log(`Collection "${model.collection.collectionName}" sẵn sàng.`);
      } catch (err) {
        console.error(`Lỗi khi tạo collection "${model.modelName}":`, err.message);
      }
    }
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

autoCreateCollections();
