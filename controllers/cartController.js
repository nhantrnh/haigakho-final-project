const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    let cart = await Cart.findOne({
      userId: req.user ? req.user._id : null,
      sessionId: !req.user ? req.sessionID : null,
    });

    if (!cart) {
      cart = new Cart({
        userId: req.user ? req.user._id : null,
        sessionId: !req.user ? req.sessionID : null,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock",
        });
      }
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl[0],
      });
    }

    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({
      success: true,
      cart: cart.items,
      total: cart.total,
      message: "Product added to cart",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      userId: req.user ? req.user._id : null,
      sessionId: !req.user ? req.sessionID : null,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({
      success: true,
      cart: cart.items,
      total: cart.total,
      message: "Cart updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Xoá sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({
      userId: req.user ? req.user._id : null,
      sessionId: !req.user ? req.sessionID : null,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({
      success: true,
      cart: cart.items,
      total: cart.total,
      message: "Item removed from cart",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user ? req.user._id : null,
      sessionId: !req.user ? req.sessionID : null,
    });

    res.json({
      success: true,
      cart: cart ? cart.items : [],
      total: cart ? cart.total : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
