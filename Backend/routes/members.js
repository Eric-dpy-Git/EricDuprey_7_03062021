const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/members");
//----------------------------------------------------working on controleur
//import Mysql
/* const mysql = require("mysql"); */
//create process.env to secure DB access
//https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs
/* const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
}); */

//create a member
/* router.post("/signup", (req, res) => {
  connection.query(
    "INSERT INTO members VALUES (NULL, 'Again', 'firstnstylet', 'mail@teseeet.fr')",
    (err, rows) => {
      if (err) throw err; */
/* console.log(req.body); */
/*  res.send(rows);
    }
  );
}); */
//-------------------------------------------working on controlleur

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

//________________________________________________________

//create an article
router.post("/publication", (req, res) => {
  connection.query(
    "INSERT INTO articles VALUES (NULL, 'My article', '111', 'Sed ut tum ad senem senex de senectute, sic hoc libro ad amicum amicissimus scripsi de amicitia. Tum est Cato locutus, quo erat nemo fere senior temporibus illis, nemo prudentior; nunc Laelius et sapiens')",
    (err, rows) => {
      if (err) throw err;
      console.log(req.body);
      res.send(rows);
    }
  );
});

//create publication from postman
router.post("/publicationForm", apiCtrl.cretaArticle);

//get all article
router.get("/publication", apiCtrl.getAllArticles);

//update an article
router.put("/updateArticle/:id", apiCtrl.updateArticle);

module.exports = router;
