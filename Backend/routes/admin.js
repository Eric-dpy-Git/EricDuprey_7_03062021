const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/admin");

router.get("/allUsers", auth, adminCtrl.getAllUsers);
router.delete("/deleteUser/:id", auth, adminCtrl.deleteUserProfile);

module.exports = router;
