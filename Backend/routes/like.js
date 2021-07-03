const express = require("express");
const likesCtrl = require("../controllers/likes");
const router = express.Router();

const auth = require("../middleware/auth");

router.post("/:id/like", auth, likesCtrl.liking);
router.post("/:id/dislike", auth, likesCtrl.disliking);
module.exports = router;
