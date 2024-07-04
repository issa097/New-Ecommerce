const express = require("express");
const router = express.Router();

const CouponController = require("../controlers/CouponController");

router.post("/applyCoupons", CouponController.applyCoupon);
router.post("/createCoupon", CouponController.NewCoupon);
router.put("/DeleteCoupon/:id", CouponController.DeleteCoupon);
router.get("/getCouponByCode", CouponController.getCouponByCode);
router.get("/getCouponByid/:id", CouponController.getCouponByid);
router.get("/getCoupons", CouponController.getCoupons);
router.get(
    "/getCouponspagi/:page/:limit",
    CouponController.getCouponspagi
  );
module.exports = router;
