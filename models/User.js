// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username là bắt buộc"],
    unique: true,
    minLength: [3, "Username phải có ít nhất 3 ký tự"],
  },
  password: {
    type: String,
    required: [true, "Password là bắt buộc"],
    minlength: [6, "Password phải có ít nhất 6 ký tự"],
  },
  email: {
    type: String,
    required: [true, "Email là bắt buộc"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email không hợp lệ",
    ],
  },
  name : { 
    type: String, 
    required: true, 
    default: "User"
  },
  address: { type: String, default: "" },
  avatar: { type: String, default: "" },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
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
}, {collection: "users"});

module.exports = mongoose.model("User", userSchema);
