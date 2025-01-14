// app.js
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware
app.use(
  session({
    secret: "hagako-web-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    proxy: true,
  })
);

// Initialize Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});
// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Add this line

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test");

// Routes
app.use("/", require("./routes/pages"));
app.use("/shop", require("./routes/products"));
app.use("/", require("./routes/users"));
app.use("/", require("./routes/routes"));
app.use("/reviews", require("./routes/reviews"));
app.use("/admin", require("./routes/admin"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Đã xảy ra lỗi!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
