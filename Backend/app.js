const express = require("express");

const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const likeRoutes = require("./routes/like");
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(helmet());

app.use("/api/messages", likeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
