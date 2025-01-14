const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.post("/create", isAuthenticated, orderController.createOrder);
router.get("/details/:id", isAuthenticated, orderController.getOrderDetails);

module.exports = router;
