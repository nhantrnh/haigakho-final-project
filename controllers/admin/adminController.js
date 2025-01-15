const User = require("../../models/User");
const Category = require("../../models/Category");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

exports.getDashboard = async (req, res) => {
  try {
    res.render("admin/layouts/admin-layout", {
      content: "dashboard",
      title: "Dashboard",
      // Add other data you want to pass
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";

    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password")
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    const currentUser = req.user;

    res.render("admin/layouts/admin-layout", {
      content: "users",
      title: "Users",
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      search,
      currentUser,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add new API endpoint
exports.getUsersData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || "";
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order || "desc";

    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }

    const sortObj = {};
    sortObj[sortField] = sortOrder === "asc" ? 1 : -1;

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password")
      .sort(sortObj);

    const total = await User.countDocuments(query);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleBanStatus = async (req, res) => {
  try {
    const { userId, reason } = req.body;

    // Prevent self-ban
    if (userId === req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You cannot ban your own account",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "banned") {
      user.status = "active";
      user.banReason = null;
    } else if (user.status === "active") {
      user.status = "banned";
      user.banReason = reason;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user status",
      });
    }
    await user.save();

    res.json({
      success: true,
      message:
        user.status === "banned"
          ? "User banned successfully"
          : user.status === "active"
          ? "User unbanned successfully"
          : "Invalid user status",
      user: {
        id: user._id,
        status: user.status,
        banReason: user.banReason,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.render("admin/layouts/admin-layout", {
      content: "categories",
      title: "Manage Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";
    const category = req.query.category;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.categoryId = category;
    }

    const products = await Product.find(query)
      .populate("categoryId")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort("-createdAt");

    const total = await Product.countDocuments(query);

    const categories = await Category.find();

    res.render("admin/layouts/admin-layout", {
      content: "products",
      title: "Products",
      products,
      categories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      search,
      category,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getProductsData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order || "desc";

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.categoryId = category;
    }

    const sortObj = {};
    sortObj[sortField] = sortOrder === "asc" ? 1 : -1;

    const products = await Product.find(query)
      .populate("categoryId")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortObj);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCreateProduct = async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.render("admin/layouts/admin-layout", {
      content: "create-product",
      title: "Create Product",
      categories,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      brand,
      material,
      colors,
      width,
      height,
      depth,
      status,
    } = req.body;

    // Server-side validation
    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Product name must be at least 3 characters",
      });
    }

    if (!price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (!stock || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Handle both uploaded files and image URLs
    let imageUrl = [];

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      imageUrl = req.files.map((file) => file.path);
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      brand,
      material,
      colors: colors ? JSON.parse(colors) : [],
      dimensions: {
        width: width || 0,
        height: height || 0,
        depth: depth || 0,
      },
      imageUrl,
      status: status || "onStock",
    });

    res.json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    const categories = await Category.find().sort("name");

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("admin/layouts/admin-layout", {
      content: "edit-product",
      title: "Edit Product",
      product,
      categories,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      brand,
      material,
      colors,
      width,
      height,
      depth,
      status,
      existingImages,
    } = req.body;

    // Validation
    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Product name must be at least 3 characters",
      });
    }

    if (!price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (!stock || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Handle images
    let imageUrl = existingImages ? JSON.parse(existingImages) : [];

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      imageUrl = [...imageUrl, ...newImages];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        categoryId,
        brand,
        material,
        colors: colors ? JSON.parse(colors) : [],
        dimensions: {
          width: width || 0,
          height: height || 0,
          depth: depth || 0,
        },
        imageUrl,
        status,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    res.render("admin/layouts/admin-layout", {
      content: "profile",
      title: "My Profile",
      admin,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, name, address, currentPassword, newPassword } =
      req.body;
    const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Validate current password if trying to change password
    if (newPassword) {
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }
      admin.password = newPassword;
    }

    // Update profile info
    admin.username = username;
    admin.email = email;
    admin.name = name;
    admin.address = address;

    // Update avatar if uploaded
    if (req.file) {
      admin.avatar = req.file.path;
    }

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        username: admin.username,
        email: admin.email,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add these new methods
exports.getOrders = async (req, res) => {
  try {
    res.render("admin/layouts/admin-layout", {
      content: "orders",
      title: "Orders Management",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getOrdersData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const search = req.query.search || "";
    const status = req.query.status || "";
    const sortOrder = req.query.order || "desc";

    let query = {};
    if (search) {
      query.orderNumber = { $regex: search, $options: "i" };
    }
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("userId", "username email name")
      .sort({ createdAt: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "username email name")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReports = async (req, res) => {
  try {
    res.render("admin/layouts/admin-layout", {
      content: "reports",
      title: "Revenue Reports",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    const { range = "week", start, end } = req.query;
    let matchStage = {};
    let groupStage = {};

    // Set date range
    if (start && end) {
      matchStage.createdAt = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    // Group by time period
    switch (range) {
      case "day":
        groupStage = {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        };
        break;
      case "week":
        groupStage = {
          $dateToString: { format: "%Y-W%V", date: "$createdAt" },
        };
        break;
      case "month":
        groupStage = {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        };
        break;
      case "year":
        groupStage = {
          $dateToString: { format: "%Y", date: "$createdAt" },
        };
        break;
    }

    const revenueData = await Order.aggregate([
      {
        $match: {
          ...matchStage,
          status: { $nin: ["cancelled"] },
        },
      },
      {
        $group: {
          _id: groupStage,
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
          avgOrderValue: { $avg: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: revenueData,
      summary: {
        totalRevenue: revenueData.reduce((sum, item) => sum + item.revenue, 0),
        totalOrders: revenueData.reduce((sum, item) => sum + item.orders, 0),
        avgOrderValue:
          revenueData.reduce((sum, item) => sum + item.avgOrderValue, 0) /
            revenueData.length || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
