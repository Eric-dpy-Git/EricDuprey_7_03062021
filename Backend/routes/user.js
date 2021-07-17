const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BOUNCER = require("express-bouncer")(1000, 900000, 3);
const USER_CTRL = require("../controllers/user");
const AUTH = require("../middleware/auth");

ROUTER.post("/signup/", USER_CTRL.signup);
ROUTER.post("/login/", BOUNCER.block, USER_CTRL.login);
ROUTER.get("/me/:id", AUTH, USER_CTRL.getUserProfile);
ROUTER.put("/me/", AUTH, USER_CTRL.updateUserProfile);
ROUTER.delete("/me/:id", AUTH, USER_CTRL.deleteUserProfile);

module.exports = ROUTER;
