//Imports
let express = require("express");

//Instantiate server
let server = express();

//configure routes
server.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Hello from server<h1>");
});

//launch server
server.listen(8080, function () {
  console.log("server is listening");
});
