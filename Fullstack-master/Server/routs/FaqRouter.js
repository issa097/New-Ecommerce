const express = require("express");
const router = express.Router();
const FaqController = require("../controlers/FaqController");
const authentication = require("../middlewares/authMiddleware");

router.get("/getFaq", FaqController.getFaq);
router.post("/AddFaq", FaqController.AddFaq);
router.put("/DeleteFaq/:faq_id", FaqController.DeleteFaq);
router.put("/UpdateFaq/:faq_id", FaqController.UpdateFaq);

module.exports = router;
