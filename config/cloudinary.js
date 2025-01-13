const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dwiommi7y",
  api_key: "343234671378122",
  api_secret: "J4Gwo2f87uuJmKrLLE0tIx3an-0",
});

// Storage config for different types
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "haigakho/users/avatars",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "haigakho/products",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// Create multer instances
const uploadAvatar = multer({ storage: avatarStorage });
const uploadProduct = multer({ storage: productStorage });

module.exports = {
  cloudinary,
  uploadAvatar,
  uploadProduct,
};
