const EXPRESS = require("express");
const HELMET = require("helmet");
const PATH = require("path");
const TOOBUSY = require("toobusy-js");
TOOBUSY.maxLag(40);
const DOTENV = require("dotenv");
DOTENV.config();

const COMMENT_ROUTES = require("./routes/comment");
const LIKE_ROUTES = require("./routes/like");
const ADMIN_ROUTES = require("./routes/admin");
const MESSAGES_ROUTES = require("./routes/message");
const USER_ROUTES = require("./routes/user");

const APP = EXPRESS();

APP.use((req, res, next) => {
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

APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(EXPRESS.json());

APP.use("/images", EXPRESS.static(PATH.join(__dirname, "images")));

APP.use(HELMET());

APP.use(function (req, res, next) {
  if (TOOBUSY()) {
    res.send(503, "Too busy...");
  } else {
    next();
  }
});

APP.use("/api/messages", COMMENT_ROUTES);
APP.use("/api/messages", LIKE_ROUTES);
APP.use("/api/admin", ADMIN_ROUTES);
APP.use("/api/messages", MESSAGES_ROUTES);
APP.use("/api/users", USER_ROUTES);

module.exports = APP;
