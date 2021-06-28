const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// Users routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/test/all", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUserProfile);
router.put("/:id", auth, userCtrl.editUserProfile);
router.delete("/delTest/:id", auth, userCtrl.deleteAccount);

module.exports = router;
