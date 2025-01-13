// routes/admin.js
const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const adminController = require("../controllers/admin/adminController");
const { uploadProduct } = require("../config/cloudinary");

router.get("/users", isAuthenticated, isAdmin, adminController.getUsers);

router.get("/", isAuthenticated, isAdmin, adminController.getDashboard);

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
  uploadProduct.array("images", 5),
  adminController.createProduct
);

module.exports = router;
