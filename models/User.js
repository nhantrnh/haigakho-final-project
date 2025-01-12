// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [3, "Username must be at least 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
  },
  name: {
    type: String,
    required: true,
    default: "User",
  },
  address: { type: String, default: "" },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/webproject-646b5.appspot.com/o/avt.jpg?alt=media&token=701a6f0a-08f0-4da6-b41a-ad245e07e9af",
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  activationToken: String,
  activationExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) return next();

    // Validate trước khi hash
    const validationError = this.validateSync();
    if (validationError) {
      next(validationError);
      return;
    }

    // Hash password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
