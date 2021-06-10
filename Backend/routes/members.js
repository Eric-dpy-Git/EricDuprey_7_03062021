const express = require("express");
const router = express.Router();

//import Mysql
const mysql = require("mysql");

//create process.env to secure DB access
//https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs
const dotenv = require("dotenv");
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
});

//create a member
router.post("/signup", (req, res) => {
  connection.query(
    "INSERT INTO members VALUES (NULL, 'Again', 'firstnstylet', 'mail@teseeet.fr')",
    (err, rows) => {
      if (err) throw err;
      /* console.log(req.body); */
      res.send(rows);
    }
  );
});

//get all members
router.get("/members", (req, res) => {
  connection.query("SELECT * FROM members", (err, rows) => {
    if (err) throw err;
    res.send(rows); //send number 200
    /* connection.end(); */
  });
});

//create from postman
router.post("/membersForm", (req, res) => {
  const params = req.body;
  connection.query("INSERT INTO members SET ?", params, (err) => {
    if (err) throw err;
    res.send(`member ${params.lastname} has been added.`);
    /* console.log(params);
    console.log(params.lastname); */
  });
});

//get one member
router.get("/members/:id", (req, res) => {
  connection.query(
    "SELECT * FROM members WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      /* res.send(`member ${req.params.id} has been choose.`); */
      res.send(rows);
    }
  );
});

//delete one member
router.delete("/members/:id", (req, res) => {
  /* const test = req.body.lastname; */
  connection.query(
    "DELETE FROM members WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) throw err;
      /* console.log(test); */
      res.send(`member ${req.params.id} has been removed`);
    }
  );
});

//delete all member
router.delete("/deletteAllmembers", (req, res) => {
  connection.query("DELETE FROM members", [req.params.id], (err, rows) => {
    if (err) throw err;
    res.send(/* `member ${req.params.id} has been removed` */ rows);
  });
});

//update a member
router.put("/modifiMember", (req, res) => {
  const { id, lastname, firstname, email } = req.body;
  connection.query(
    "UPDATE members SET lastname = ? WHERE id = ?",
    [lastname, id],
    (err, rows) => {
      if (err) throw err;
      res.send(/* `member ${lastname} modified` */ rows);
    }
  );
});

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
router.post("/publicationForm", (req, res) => {
  const params = req.body;
  connection.query("INSERT INTO articles SET ?", params, (err, rows) => {
    if (err) throw err;
    res.send(`member ${params.title} has been added.`);
    console.log(params);
    console.log(params.title);
  });
});

//get all article
router.get("/publication", (req, res) => {
  connection.query("SELECT * FROM articles", (err, rows) => {
    if (err) throw err;
    res.send(rows);
    /* connection.end(); */
  });
});

//update a member
router.put("/modifiArticle", (req, res) => {
  const { id, title, id_member, texte } = req.body;
  connection.query(
    "UPDATE articles SET title = ?, texte = ? WHERE id = ?",
    [title, texte, id],
    (err, rows) => {
      if (err) throw err;
      res.send(`Article modified`);
    }
  );
});

module.exports = router;
