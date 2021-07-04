const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const REGEX_MAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

module.exports = {
  signup: function (req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "something is missing" });
    }
    if (!REGEX_MAIL.test(email)) {
      return res.status(400).json({ error: "invalid mail" });
    }
    //possible to add here restriction for username & pasword
    models.User.findOne({ where: { email: req.body.email } })
      .then((result) => {
        if (result) {
          res.status(409).json({ message: "email already use" });
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (error, hash) {
              const user = {
                email: req.body.email,
                username: req.body.username,
                bio: req.body.bio,
                //add image soon
                password: hash,
                isAdmin: 0,
              };
              models.User.create(user)
                .then((result) => {
                  res.status(201).json({ message: "User created" });
                })
                .catch((error) => {
                  res.status(500).json({
                    message: "Impossible to create user",
                  });
                });
            });
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "error in user creation" });
      });
  },
  //---------------------------------------------------------------------login
  login: function login(req, res) {
    models.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user === null) {
          res.status(401).json({ message: "User not find" });
        } else {
          bcrypt.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (result) {
                jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                  },
                  "RANDOM_TOKEN_SECRET",
                  function (err, token) {
                    res.status(200).json({
                      user: user.id,
                      token: token,
                    });
                  }
                );
              } else {
                res.status(401).json({ message: "User not find" });
              }
            }
          );
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Error in find user" });
      });
  },
  //------------------------------------------------------------------------get all users
  getAllUsers: function (req, res) {
    models.User.findAll()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Get all user error",
        });
      });
  },
  getUserProfile: function (req, res) {
    const userId = req.params.id;
    models.User.findOne({ where: { id: userId } })
      .then(function (user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ error: "Cannot find user" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "Error in find user" });
      });
  },
  editUserProfile: function (req, res) {
    const userId = req.params.id;
    const updatedUser = {
      bio: req.body.bio,
    };

    models.User.update(updatedUser, { where: { id: userId } })
      .then((result) => {
        res.status(200).json({
          message: "User updated",
          post: updatedUser,
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "errer in user update",
        });
      });
  },

  deleteAccount: async function (req, res) {
    try {
      const userId = req.body.userId;
      const deletedId = req.params.id;

      if (!userId || !deletedId) {
        res.status(401).json({ message: "no permission for that !" });
        return;
      }

      let user = await models.User.findOne({ where: { id: deletedId } });
      user.destroy();
      res.status(200).json({ message: "account deleted", hooks: true });
    } catch (error) {
      res.status(400).json({ message: "error in delete account" });
    }
  },
};
