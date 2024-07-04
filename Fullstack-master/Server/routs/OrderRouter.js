const express = require("express")
const router = express.Router()
const Orders = require("../controlers/OrderController")


router.get("/GetOrder", Orders.GetOrder);
router.post("/NewOrder", Orders.NewOrder);


module.exports = router