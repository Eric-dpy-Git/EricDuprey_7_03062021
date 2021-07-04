const express = require("express");
const router = express.Router();

const messagesCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.post("/newMessage", auth, messagesCtrl.createMessage);
router.get("/:id", auth, messagesCtrl.getOneMessage);
router.get("/", /*  auth, */ messagesCtrl.allMessages);
router.put("/one/:id", auth, messagesCtrl.updateMessage);
router.delete("/one/:id", auth, messagesCtrl.deleteMessage);

module.exports = router;
