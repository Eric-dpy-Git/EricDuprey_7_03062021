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

exports.createFromPostman = (req, res) => {
  const params = req.body;
  connection.query("INSERT INTO members SET ?", params, (err) => {
    if (err) throw err;
    res.send(`member ${params.lastname} has been added.`);
    /* console.log(params);
    console.log(params.lastname); */
  });
};

exports.getAllMemmbers = (req, res) => {
  connection.query("SELECT * FROM members", (err, rows) => {
    if (err) throw err;
    res.send(rows); //send number 200
    /* connection.end(); */
  });
};

exports.getOneMember = (req, res) => {
  connection.query(
    "SELECT * FROM members WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      /* res.send(`member ${req.params.id} has been choose.`); */
      res.send(rows);
    }
  );
};

exports.deleteOneMember = (req, res) => {
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
};

exports.deleteAllMembers = (req, res) => {
  connection.query("DELETE FROM members", [req.params.id], (err, rows) => {
    if (err) throw err;
    res.send(/* `member ${req.params.id} has been removed` */ rows);
  });
};

exports.uptadteMember = (req, res) => {
  const { id, lastname, firstname, email } = req.body;
  connection.query(
    "UPDATE members SET lastname = ? WHERE id = ?",
    [lastname, id],
    (err, rows) => {
      if (err) throw err;
      res.send(`member ${lastname} modified`);
    }
  );
};

//-------------------------------------

exports.cretaArticle = (req, res) => {
  const params = req.body;
  connection.query("INSERT INTO articles SET ?", params, (err, rows) => {
    if (err) throw err;
    res.send(`article ${params.title} has been added.`);
  });
};

exports.getAllArticles = (req, res) => {
  connection.query("SELECT * FROM articles", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

exports.updateArticle = (req, res) => {
  const { id, title, id_member, texte } = req.body;
  connection.query(
    "UPDATE articles SET title = ?, texte = ? WHERE id = ?",
    [title, texte, id],
    (err, rows) => {
      if (err) throw err;
      res.send(`Article modified`);
    }
  );
};
