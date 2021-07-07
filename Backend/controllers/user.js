const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");

exports.signup = async (req, res, next) => {
  const user = await db.User.create(req.body).catch((error) =>
    res.status(500).json({ error: "server error" })
  );

  user.password = await bcrypt.hash(user.password, 10);
  await user
    .save()
    .then(() =>
      res.status(201).json({
        userId: user.id,
        isAdmin: user.isAdmin,
        token: jwt.sign({ userId: user.id }, "TOKEN", { expiresIn: "240h" }),
      })
    )
    .catch((error) => res.status(400).json({ error: "request error" }));
};

//--------------------------------------------------------------------login
exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "invalid user" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "invalid pasword" });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign({ userId: user.id }, "TOKEN", {
              expiresIn: "240h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error: "server error" }));
    })
    .catch((error) => res.status(500).json({ error: "serer error" }));
};

//------------------------------------------------------------------login
exports.getUserProfile = (req, res, next) => {
  db.User.findOne({
    attributes: ["id", "email", "username", "firstname", "lastname"],
    where: { id: req.params.id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

//-----------------------------------------------------------update user
exports.updateUserProfile = async (req, res, next) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  await db.User.update(req.body, { where: { id: req.body.id } })
    .then(() => res.status(200).json({ message: "user updated" }))
    .catch((error) => res.status(500).json({ error }));
};

// ----------------------------------------------------------delete user
exports.deleteUserProfile = (req, res, next) => {
  db.User.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.status(200).json({ message: "user deleted" }))
    .catch(() => res.status(400).json({ message: "unknow user" }));
};
