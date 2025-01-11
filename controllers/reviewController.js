// controllers/reviewController.js
const Review = require("../models/Review");
const Product = require("../models/Product");

exports.addReview = async (req, res) => {
  try {
    const { productId, rating, content } = req.body;
    const userId = req.user._id;

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
