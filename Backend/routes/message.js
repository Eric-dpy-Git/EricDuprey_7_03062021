const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/message");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/new", auth, multer, messagesCtrl.createMessage);
router.get("/", auth, messagesCtrl.getAllMessages);
router.get("/:messageId", auth, messagesCtrl.getOneMessage);
router.put("/modify/:messageId", auth, multer, messagesCtrl.modifyMessage);
router.delete("/delete/:messageId/", auth, messagesCtrl.deleteMessage);

module.exports = router;
