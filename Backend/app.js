//imports
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

//routes
const publicationsRoutes = require("./routes/message");
const usersRoutes = require("./routes/user");
const likesRoutes = require("./routes/like");

app.use(cors());

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

app.use("/api/messages", publicationsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/likes", likesRoutes);

module.exports = app;
