const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/members");

//create from postman
router.post("/membersForm", apiCtrl.createFromPostman);
//get all members
router.get("/members", apiCtrl.getAllMemmbers);
//get one member
router.get("/members/:id", apiCtrl.getOneMember);
//delete one member
router.delete("/members/:id", apiCtrl.deleteOneMember);
//delete all member
router.delete("/deletteAllmembers", apiCtrl.deleteAllMembers);
//update a member
router.put("/updateMember/:id", apiCtrl.uptadteMember);
//create an article from postman
router.post("/articleForm", apiCtrl.cretaArticle);
//get all article
router.get("/articles", apiCtrl.getAllArticles);
//update an article
router.put("/updateArticle/:id", apiCtrl.updateArticle);

module.exports = router;
