const express = require("express");
const router = express.Router();
const bouncer = require("express-bouncer")(1000, 900000, 3);
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup/", userCtrl.signup);
router.post("/login/", bouncer.block, userCtrl.login);
router.get("/me/:id", auth, userCtrl.getUserProfile);
router.put("/me/", auth, userCtrl.updateUserProfile);
router.delete("/me/:id", auth, userCtrl.deleteUserProfile);

module.exports = router;
