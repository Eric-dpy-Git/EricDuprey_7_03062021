//import http
const http = require("http");

//import app from app.js
const app = require("./app");

//set port before create server
app.set("port", process.env.PORT || 3000);

//Create server
const server = http.createServer(app);

//Server wich is listen port 3000 if notihing else
server.listen(process.env.PORT || 3000);
