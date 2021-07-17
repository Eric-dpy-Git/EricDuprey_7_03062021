const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const MESSAGE_CTRL = require("../controllers/message");
const AUTH = require("../middleware/auth");
const MULTER = require("../middleware/multer-config");

ROUTER.post("/new", AUTH, MULTER, MESSAGE_CTRL.createMessage);
ROUTER.get("/", AUTH, MESSAGE_CTRL.getAllMessages);
ROUTER.get("/:messageId", AUTH, MESSAGE_CTRL.getOneMessage);
ROUTER.put("/modify/:messageId", AUTH, MULTER, MESSAGE_CTRL.modifyMessage);
ROUTER.delete("/delete/:messageId/", AUTH, MESSAGE_CTRL.deleteMessage);

module.exports = ROUTER;
