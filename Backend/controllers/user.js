const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

module.exports = {
  signup: function (req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "not a valid email" });
    }
    models.Users.findOne({ where: { email: req.body.email } })
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
                //add image
                password: hash,
                isAdmin: 0,
              };
              models.Users.create(user)
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
    models.Users.findOne({ where: { email: req.body.email } })
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
                  process.env.TKN || "groupomania",
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
    models.Users.findAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Get all user error",
        });
      });
  },
  getUserProfile: function (req, res) {
    const userId = req.params.id;
    models.Users.findOne({ where: { id: userId } })
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

    models.Users.update(updatedUser, { where: { id: userId } })
      .then((result) => {
        res.status(200).json({
          message: "User updated",
          post: updatedUser,
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "Somenthing went wrong",
        });
      });
  },
  deleteAccount: async function (req, res) {
    try {
      const userId = req.body.userId;
      const idToDelete = req.params.id;
      console.log(req.body.userId);
      if (!userId || !idToDelete) {
        res.status(401).json({ message: "You dont have right to delete" });
        return;
      }
      let allowed = req.body.isAdmin;
      if (userId == idToDelete) allowed = true;
      if (!allowed) {
        res.status(401).json({ message: "You dont have right to delete" });
        return;
      }

      let user = await models.Users.findOne({ where: { id: idToDelete } });
      user.destroy();
      res.status(200).json({ message: "Deleted account", hooks: true });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
