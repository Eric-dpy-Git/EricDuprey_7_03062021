//app.js manage all request send by server

//import Mysql
const mysql = require("mysql");

//import express with command require, express need to be install before
const express = require("express");

//const app wich call express --> create express application
const app = express();
// Express v4.16.0 and higher (instead body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Export app for server.js
module.exports = app;

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
//--------------- for Pierre --> what the difference ?
/* connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
}); */

connection.connect((err, connection) => {
  if (err) throw err;

  console.log(`connected as id ${connection.threadId}`);
});

//create a member
app.post("/signup", (req, res) => {
  connection.query(
    "INSERT INTO members VALUES (NULL, 'Again', 'firstnstylet', 'mail@teseeet.fr')",
    (err, rows) => {
      if (err) throw err;
      console.log(req.body);
      res.send(rows);
    }
  );
});

//get all members
app.get("/members", (req, res) => {
  connection.query("SELECT * FROM members", (err, rows) => {
    if (err) throw err;
    res.send(rows);
    /* connection.end(); */
  });
});

//create from postman
app.post("/membersForm", (req, res) => {
  const params = req.body;
  connection.query("INSERT INTO members SET ?", params, (err, rows) => {
    if (err) throw err;
    res.send(`member ${params[0].lastname} has been added.`);
    console.log(params);
    console.log(params[0].lastname);
  });
});

//get one member
app.get("/members/:id", (req, res) => {
  connection.query(
    "SELECT * FROM members WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//delete one member
app.delete("/members/:id", (req, res) => {
  connection.query(
    "DELETE FROM members WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      res.send(`member with id  has been removed`);
      /* res.send(rows); */
    }
  );
});

//delete all member
app.delete("/deletteAllmembers", (req, res) => {
  connection.query("DELETE FROM members", [req.params.id], (err, rows) => {
    if (err) throw err;
    /* res.send(`memberwith  ID : ${[req.params.id]} has been removed`); */
    res.send(rows);
  });
});

//update a member
app.put("/modifiMember", (req, res) => {
  const { id, lastname, firstname, email } = req.body[0];

  connection.query(
    "UPDATE members SET lastname = ? WHERE id = ?",
    [lastname, id],
    (err, rows) => {
      if (err) throw err;
      res.send(`member ${lastname} modified`);
    }
  );
});

/* app.use("/", (req, res, next) => {
  const params = req.body;
  console.log(params);
  console.log(req.body[0].id);
  next();
}); */
