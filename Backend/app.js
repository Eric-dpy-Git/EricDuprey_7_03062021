//app.js manage all request send by server

//import Mysql
const mysql = require("mysql");

//import express with command require, express need to be install before
const express = require("express");

//const app wich call express --> create express application
const app = express();

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

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

//instead body parser
app.use(express.json()); //Used to parse JSON bodies

app.get("/api", (req, res) => {
  connection.query("SELECT * FROM members", (err, rows) => {
    if (err) throw err;

    res.send(rows);
    connection.end();
  });
});

app.post("/signup", (req, res) => {
  connection.query(
    "INSERT INTO members VALUES (NULL, 'Again', 'firstnstylet', 'mail@teseeet.fr')",
    (err, rows) => {
      if (err) throw err;
      /* res.status(201); */
      /* res.json({ message: "Request here !" }); */
      console.log(req.body);
      res.send(rows);
      connection.end();
    }
  );
});

app.post("/api/articles", (req, res) => {});

/* app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
 */
