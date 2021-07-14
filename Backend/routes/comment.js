const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.post("/:messageId/newComment", auth, commentCtrl.createComment);
router.get("/comment/:commentId", auth, commentCtrl.oneComment);
router.delete("/comment/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;
