const User = require("../../models/User");
const Category = require("../../models/Category");
const Product = require("../../models/Product");

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
