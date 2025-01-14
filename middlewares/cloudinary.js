const { uploadProduct } = require("../config/cloudinary");

const uploadProductMiddleware = (req, res, next) => {
  uploadProduct.array("images", 5)(req, res, (err) => {
    if (err) {
      console.error("Upload middleware error:", err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};

module.exports = {
  uploadProductMiddleware,
};
