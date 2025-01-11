// routes/reviews.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { isAuthenticated } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

// Cấu hình storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Thư mục lưu file
  },
  filename: function (req, file, cb) {
    // Lấy phần mở rộng của file
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Tên file với phần mở rộng
  },
});

// Khởi tạo multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn file tối đa 5MB
  fileFilter: function (req, file, cb) {
    // Chỉ chấp nhận file hình ảnh
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

router.post(
  "/add",
  isAuthenticated,
  upload.array("images", 5),
  reviewController.addReview
);

router.get("/status/:productId", isAuthenticated, reviewController.checkStatus);

router.delete(
  "/delete/:reviewId",
  isAuthenticated,
  reviewController.deleteReview
);

module.exports = router;
