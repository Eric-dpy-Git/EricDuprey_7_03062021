const { Router } = require("express");
const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const LIKES_CTRL = require("../controllers/like");
const AUTH = require("../middleware/auth");

ROUTER.post("/:messageId/like", AUTH, LIKES_CTRL.likeMessage);
ROUTER.post("/:messageId/dislike", AUTH, LIKES_CTRL.dislikeMessage);

module.exports = ROUTER;
