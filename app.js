// app.js
const express = require("express");
const path = require("path"); // Add this at the top
const session = require("express-session");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "secretKey", 
  resave: false, 
  saveUninitialized: true
}));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Add this line

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hagako-web");

// Routes
app.use("/", require("./routes/pages"));
app.use("/shop", require("./routes/products"));
app.use("/", require("./routes/users"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
