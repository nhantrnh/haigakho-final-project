// routes/admin.js
const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/admin/adminController");
const {
  uploadProductMiddleware,
  uploadAvatarMiddleware,
} = require("../middlewares/cloudinary");

router.get("/users", isAuthenticated, isAdmin, adminController.getUsers);

router.get("/", isAuthenticated, isAdmin, adminController.getDashboard);
router.post("/signout", isAuthenticated, adminController.signout);

router.get(
  "/api/users",
  isAuthenticated,
  isAdmin,
  adminController.getUsersData
);

router.get(
  "/api/users/:id",
  isAuthenticated,
  isAdmin,
  adminController.getUserDetails
);

router.post(
  "/users/toggle-ban",
  isAuthenticated,
  isAdmin,
  adminController.toggleBanStatus
);

router.get(
  "/categories",
  isAuthenticated,
  isAdmin,
  adminController.getCategories
);

router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  adminController.createCategory
);
router.put(
  "/categories/:id",
  isAuthenticated,
  isAdmin,
  adminController.updateCategory
);
router.delete(
  "/categories/:id",
  isAuthenticated,
  isAdmin,
  adminController.deleteCategory
);

router.get("/products", isAuthenticated, isAdmin, adminController.getProducts);
router.get(
  "/api/products",
  isAuthenticated,
  isAdmin,
  adminController.getProductsData
);

router.get(
  "/products/create",
  isAuthenticated,
  isAdmin,
  adminController.getCreateProduct
);
router.post(
  "/products",
  isAuthenticated,
  isAdmin,
  uploadProductMiddleware,
  adminController.createProduct
);

router.get(
  "/products/:id/edit",
  isAuthenticated,
  isAdmin,
  adminController.getEditProduct
);

// Sử dụng middleware mới này thay vì uploadProduct.array trực tiếp
router.put(
  "/products/:id",
  isAuthenticated,
  isAdmin,
  uploadProductMiddleware,
  adminController.updateProduct
);

router.delete(
  "/products/:id",
  isAuthenticated,
  isAdmin,
  adminController.deleteProduct
);

// Add new route
router.get("/profile", isAuthenticated, isAdmin, adminController.getProfile);
router.put(
  "/profile",
  isAuthenticated,
  isAdmin,
  uploadAvatarMiddleware,
  adminController.updateProfile
);

router.get("/orders", isAuthenticated, isAdmin, adminController.getOrders);
router.get(
  "/api/orders",
  isAuthenticated,
  isAdmin,
  adminController.getOrdersData
);

router.get(
  "/api/orders/:id",
  isAuthenticated,
  isAdmin,
  adminController.getOrderDetails
);

router.put(
  "/api/orders/:id/status",
  isAuthenticated,
  isAdmin,
  adminController.updateOrderStatus
);

router.get("/reports", isAuthenticated, isAdmin, adminController.getReports);

router.get(
  "/api/reports/revenue",
  isAuthenticated,
  isAdmin,
  adminController.getRevenueReport
);

router.get(
  "/api/reports/top-products",
  isAuthenticated,
  isAdmin,
  adminController.getTopProducts
);

router.get(
  "/api/dashboard",
  isAuthenticated,
  isAdmin,
  adminController.getDashboardData
);

module.exports = router;
