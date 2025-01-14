const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderNumber: {
    type: String,
    unique: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: [String],
    },
  ],
  shipping: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Vietnam",
    },
    postalCode: String,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["COD"],
    default: "COD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD${Date.now().toString().slice(-6)}${(count + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
