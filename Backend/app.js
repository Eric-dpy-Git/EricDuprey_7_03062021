//app.js manage all request send by server

//import Mysql
/* const mysql = require("mysql"); */

//import express with command require, express need to be install before
const express = require("express");

//import router
const apiRoutes = require("./routes/members");

//const app wich call express --> create express application
const app = express();
// Express v4.16.0 and higher (instead body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Export app for server.js
module.exports = app;

app.use("", apiRoutes);
