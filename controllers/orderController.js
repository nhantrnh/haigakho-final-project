const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      country,
      phone,
      email,
      paymentMethod,
    } = req.body;

    // Get cart
    const cart = await Cart.findOne({
      userId: req.user?._id,
      sessionId: !req.user ? req.sessionID : null,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${item.name}`,
        });
      }
    }

    // Format items for order
    const orderItems = cart.items.map((item) => ({
      ...item.toObject(),
      imageUrl: item.imageUrl[0], // Take first image URL only
    }));

    // Create order
    const order = await Order.create({
      userId: req.user?._id,
      sessionId: !req.user ? req.sessionID : null,
      items: orderItems,
      shipping: {
        firstName,
        lastName,
        address,
        city,
        country,
        phone,
        email,
      },
      payment: {
        method: paymentMethod,
      },
      total: cart.total,
    });

    // Update stock
    for (const item of cart.items) {
      const product = await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: { stock: -item.quantity },
        },
        { new: true }
      );

      if (product.stock <= 0) {
        await Product.findByIdAndUpdate(product._id, {
          status: "outOfStock",
        });
      }
    }

    // Clear cart
    await cart.deleteOne();

    // Populate order data before sending response
    const populatedOrder = await Order.findById(order._id).populate(
      "items.productId"
    );

    res.json({
      success: true,
      message: "Order created successfully",
      order: {
        orderNumber: order.orderNumber,
        total: order.total,
        createdAt: order.createdAt,
        shipping: order.shipping,
        items: order.items,
        status: order.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add new controller method
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        shipping: order.shipping,
        items: order.items,
        payment: order.payment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
