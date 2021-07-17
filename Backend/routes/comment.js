const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const AUTH = require("../middleware/auth");
const COMMENT_CTRL = require("../controllers/comment");

ROUTER.post("/:messageId/newComment", AUTH, COMMENT_CTRL.createComment);
ROUTER.get("/comment/:commentId", AUTH, COMMENT_CTRL.oneComment);
ROUTER.delete("/comment/:commentId", AUTH, COMMENT_CTRL.deleteComment);

module.exports = ROUTER;
