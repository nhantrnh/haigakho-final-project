// middlewares/auth.js
module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // Lưu URL yêu cầu ban đầu để redirect sau khi đăng nhập
    req.session.returnTo = req.originalUrl;
    res.redirect("/signin");
  },

  isGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/profile");
  },

  // Middleware cho API endpoints
  isAuthenticatedAPI: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập để tiếp tục",
    });
  },
};
