const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const toobusy = require("toobusy-js");
toobusy.maxLag(40);
const dotenv = require("dotenv");
dotenv.config();

const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const adminRoutes = require("./routes/admin");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());

app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

app.use("/api/messages", commentRoutes);
app.use("/api/messages", likeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
