const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//logique de routine
router.post("/signup/", userCtrl.signup);
router.post("/login/", userCtrl.login);
router.get("/me/:id", auth, userCtrl.getUserProfile);
router.put("/me/", auth, userCtrl.updateUserProfile);
router.delete("/me/:id", auth, userCtrl.deleteUserProfile);

module.exports = router;
