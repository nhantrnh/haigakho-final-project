// app.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hagako-web");

// Routes
app.use("/", require("./routes/index"));
app.use("/index", require("./routes/index"));
app.use("/products", require("./routes/products"));
app.use("/blog", require("./routes/blog"));
app.use("/services", require("./routes/services"));
app.use("/contact", require("./routes/contact"));
app.use("/about", require("./routes/about"));
app.use("/cart", require("./routes/cart"));
app.use("/checkout", require("./routes/checkout"));
app.use("/", require("./routes/users"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
