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

  email: {
    type: String,
    required: [true, "Email là bắt buộc"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email không hợp lệ",
    ],
  },
  password: {
    type: String,
    required: [true, "Password là bắt buộc"],
    minlength: [6, "Password phải có ít nhất 6 ký tự"],
  },
  createdAt: {
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
});

module.exports = mongoose.model("User", userSchema);
