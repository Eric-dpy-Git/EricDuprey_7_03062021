const db = require("../models/index");
const jwt = require("jsonwebtoken");
// ----------------------------------------------get all users
exports.getAllUsers = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TKN);
  const userId = decodedToken.userId;

  console.log(userId);
  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      //----------------------------------------------false instead
      if (userId === 1) {
        db.User.findAll({
          attributes: ["username", "firstname", "lastname", "id"],
        })
          .then((users) => res.status(200).json({ users }))
          .catch(() =>
            res.status(500).json({ message: "server error with get all user" })
          );
      } else {
        return res.status(403).json({ message: "unauthorized" });
      }
    })
    .catch(() => res.status(500).json("server error with get all user"));
};
// ---------------------------------------------delete one user
exports.deleteUserProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TKN);
  const userId = decodedToken.userId;

  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (user.isAdmin === true && user.id != req.params.id) {
        db.User.destroy({
          where: { id: req.params.id },
        })
          .then(() => res.status(200).json({ message: "user deleted" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(403).json("unauthorized");
      }
    })
    .catch(() => res.status(500).json("server error with delet user"));
};
//-------------------------------------------------udate one user
exports.updateOneUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TKN);
  const userId = decodedToken.userId;

  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (user.isAdmin === true) {
        db.User.update(
          {
            isAdmin: req.body.isAdmin,
          },
          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "user updated" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(403).json("unauthorized");
      }
    })
    .catch(() => res.status(500).json("server error with update user"));
};
