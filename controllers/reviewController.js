// controllers/reviewController.js
const Review = require("../models/Review");
const Product = require("../models/Product");

// Api add review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, content } = req.body;
    const userId = req.user._id;

    // Kiểm tra nếu người dùng đã review sản phẩm này
    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    // Handle image uploads if any
    const images = req.files ? req.files.map((f) => f.path) : [];

    // Create review
    const review = await Review.create({
      productId,
      userId,
      rating: Number(rating),
      content,
      images,
    });

    // Update product rating
    const product = await Product.findById(productId);
    const allReviews = await Review.find({ productId });

    const newAverage =
      allReviews.reduce((acc, rev) => acc + rev.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      "ratings.average": newAverage,
      "ratings.count": allReviews.length,
    });

    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Api check status
exports.checkStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.json({ reviewed: true, review: existingReview });
    }

    res.json({ reviewed: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Api delete review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // ID của review
    const userId = req.user._id;

    // Kiểm tra xem review có tồn tại và thuộc về người dùng hiện tại
    const review = await Review.findOneAndDelete({ _id: id, userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or not authorized to delete.",
      });
    }

    // Cập nhật thông tin rating của sản phẩm
    const productId = review.productId;
    const allReviews = await Review.find({ productId });
    const newAverage =
      allReviews.length > 0
        ? allReviews.reduce((acc, rev) => acc + rev.rating, 0) /
          allReviews.length
        : 0;

    await Product.findByIdAndUpdate(productId, {
      "ratings.average": newAverage,
      "ratings.count": allReviews.length,
    });

    res.json({ success: true, message: "Review deleted successfully." });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
