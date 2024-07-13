const express = require('express')
const router = express.Router()
const ReplayController = require('../controlers/ReplayController')
const authentication = require("../middlewares/authMiddleware");

router.post("/replay", authentication.authenticateToken, ReplayController.Replays)
router.get("/replayget", ReplayController.Replayget)







module.exports = router