const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.post("/:messageId/like", auth, likesCtrl.likeMessage);
router.post("/:messageId/dislike", auth, likesCtrl.dislikeMessage);

module.exports = router;
