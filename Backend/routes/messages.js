const express = require("express");
const router = express.Router();

const messagesCtrl = require("../controllers/messages");
const auth = require("../middleware/auth");

router.post("/newMessage", auth, messagesCtrl.createMessage);
router.get("/:id", auth, messagesCtrl.getOneMessage);
router.get("/all/one", auth, messagesCtrl.getAllMessages);
router.put(
  "/one/:id",
  /* auth, */
  messagesCtrl.updateMessage
);

module.exports = router;
