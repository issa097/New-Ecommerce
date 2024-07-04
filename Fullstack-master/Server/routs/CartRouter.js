const express = require("express");
const router = express.Router();
const cartController = require("../controlers/CartController");
const authentication = require("../middlewares/authMiddleware");
const uploadImg = require("../middlewares/MulterMiddlewares");

router.post("/items", authentication.authenticateToken, cartController.additem);
router.get(
  "/getitems",
  authentication.authenticateToken,
  cartController.GetItem
);
router.put(
  "/updateCart/:cart_id",
  
  cartController.updateCart
);
router.put(
  "/updateCart2/:product_id",
  
  cartController.updateCart2
);

module.exports = router;
