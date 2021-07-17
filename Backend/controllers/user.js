const DB = require("../models/index"); // user model passtrhouhg sequelize index
const BCRYPT = require("bcrypt"); // to crypt password
const JWT = require("jsonwebtoken");
const VALID_EMAIL = require("email-validator");
const REGEX_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_VALIDATOR = require("../middleware/passwordValidator");
const REGEX_NAME = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;
// -------------------------------------------------signup
module.exports = {
  signup: async (req, res, next) => {
    if (
      !REGEX_NAME.test(req.body.username) ||
      !REGEX_NAME.test(req.body.firstname) ||
      !REGEX_NAME.test(req.body.lastname)
    ) {
      return res.status(400).json({ error: "invalid" });
    }
    if (
      !REGEX_EMAIL.test(req.body.email) ||
      !VALID_EMAIL.validate(req.body.email)
    ) {
      return res.status(400).json({ error: "invalid email" });
    }
    if (!PASSWORD_VALIDATOR.validate(req.body.password)) {
      return res.status(400).json({
        error: "invalid password",
      });
    }
    const user = await DB.User.create(req.body).catch((error) =>
      res.status(500).json({ error: "server error with create user" })
    );
    user.password = await BCRYPT.hash(user.password, 10);
    await user
      .save()
      .then(() =>
        res.status(201).json({
          userId: user.id,
          isAdmin: user.isAdmin,
          token: JWT.sign({ userId: user.id }, process.env.TKN, {
            expiresIn: "24h",
          }),
        })
      )
      .catch((error) => res.status(400).json({ error: "invalid entry" }));
  },
  // -------------------------------------------------login
  login: (req, res, next) => {
    if (!REGEX_EMAIL.test(req.body.email)) {
      return res.status(400).json({ error: "invalid email" });
    }
    if (!PASSWORD_VALIDATOR.validate(req.body.password)) {
      return res.status(400).json({
        error: "invalid password",
      });
    }
    DB.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "unknow user" });
        }
        BCRYPT.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: "invalid password" });
            }
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              token: JWT.sign({ userId: user.id }, process.env.TKN, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) =>
            res.status(500).json({ error: "server error with login" })
          );
      })
      .catch((error) =>
        res.status(500).json({ error: "server error with login" })
      );
  },
  // -------------------------------------------------user profile
  getUserProfile: (req, res, next) => {
    DB.User.findOne({
      attributes: ["id", "email", "username", "firstname", "lastname"],
      where: { id: req.params.id },
    })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(400).json({ error }));
  },
  // -------------------------------------------------update user
  updateUserProfile: async (req, res, next) => {
    if (
      !REGEX_NAME.test(req.body.username) ||
      !REGEX_NAME.test(req.body.firstname) ||
      !REGEX_NAME.test(req.body.lastname)
    ) {
      return res.status(400).json({ error: "invalid" });
    }
    if (
      !REGEX_EMAIL.test(req.body.email) ||
      !VALID_EMAIL.validate(req.body.email)
    ) {
      return res.status(400).json({ error: "invalid email" });
    }
    if (!PASSWORD_VALIDATOR.validate(req.body.password)) {
      return res.status(400).json({
        error: "invalid password",
      });
    }
    const user = req.body;
    user.password = await BCRYPT.hash(user.password, 10);
    await DB.User.update(req.body, { where: { id: req.body.id } })
      .then(() => res.status(200).json({ message: "user updated" }))
      .catch((error) => res.status(500).json({ error }));
  },
  // -------------------------------------------------delete user
  deleteUserProfile: (req, res, next) => {
    DB.User.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.status(200).json({ message: "user deleted" }))
      .catch(() => res.status(400).json({ message: "unknow user" }));
  },
};
