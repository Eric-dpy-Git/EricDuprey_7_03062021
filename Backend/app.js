//app.js manage all request send by server

//import Mysql
const mysql = require("mysql");

//create process.env to secure DB access
//https://www.coderrocketfuel.com/article/store-mongodb-credentials-as-environment-variables-in-nodejs
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  /* db.query("CREATE TABLE TableTest (id INT)", function (err, result) {
    if (err) throw err;
    console.log("Table créée !");
  }); */
});
