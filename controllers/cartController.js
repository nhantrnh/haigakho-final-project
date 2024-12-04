const Product = require('../models/Product');

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Lấy sản phẩm từ cơ sở dữ liệu
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại.' });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingProductIndex = req.session.cart.findIndex(item => item.productId.toString() === productId);
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      req.session.cart[existingProductIndex].quantity += parseInt(quantity);
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      req.session.cart.push({
        productId: productId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: parseInt(quantity)
      });
    }

    // Lưu giỏ hàng vào session và trả về kết quả
    res.json({ success: true, cart: req.session.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi hệ thống.' });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: 'Giỏ hàng không có sản phẩm nào.' });
  }

  const existingProduct = req.session.cart.find(item => item.productId.toString() === productId);
  if (existingProduct) {
    // Cập nhật số lượng
    const pro = await Product.findById(productId);
    const stock = pro.stock;
    
    if (quantity <= stock) {
      existingProduct.quantity = parseInt(quantity);
      req.session.cart = req.session.cart; // Lưu lại giỏ hàng vào session

      return res.json({ success: true, cart: req.session.cart });
    }
    return res.status(400).json({ success: false, message: 'Số lượng sản phẩm không đủ.' });
    
  }

  return res.status(404).json({ success: false, message: 'Sản phẩm không có trong giỏ hàng.' });
};

// Xoá sản phẩm khỏi giỏ hàng
const removeFromCart = (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: 'Giỏ hàng không có sản phẩm nào.' });
  }

  // Lọc sản phẩm ra khỏi giỏ hàng
  req.session.cart = req.session.cart.filter(item => item.productId.toString() !== productId);

  res.json({ success: true, cart: req.session.cart });
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart
};
