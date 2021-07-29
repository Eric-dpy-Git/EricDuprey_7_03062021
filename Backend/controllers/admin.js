const DB = require("../models/index"); //user model passtrhouhg sequelize index
const JWT = require("jsonwebtoken");
// ----------------------------------------------get all users
module.exports = {
  getAllUsers: (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = JWT.verify(token, process.env.TKN);
    let userId = decodedToken.userId;

    DB.User.findOne({
      where: { id: userId },
    })
      .then((user) => {
        if (user.isAdmin === true) {
          DB.User.findAll({
            attributes: ["username", "firstname", "lastname", "id"],
          })
            .then((users) => res.status(200).json({ users }))
            .catch(() =>
              res
                .status(500)
                .json({ message: "server error with get all user" })
            );
          console.log("!!!!!!!!!je viens de vérifier le modérateur!!!!!!!!!!");
        } else {
          return res.status(403).json({ message: "unauthorized" });
        }
      })
      .catch(() => res.status(500).json("server error with get all user"));
  },
  // ---------------------------------------------delete one user
  deleteUserProfile: (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = JWT.verify(token, process.env.TKN);
    let userId = decodedToken.userId;
    DB.User.findOne({
      where: { id: userId },
    })
      .then((user) => {
        if (user.isAdmin === true && user.id != req.params.id) {
          DB.User.destroy({
            where: { id: req.params.id },
          })
            .then(() => res.status(200).json({ message: "user deleted" }))
            .catch((error) => res.status(400).json({ error }));
          console.log("!!!!!!!!!je viens de vérifier le modérateur!!!!!!!!!!");
        } else {
          return res.status(403).json("unauthorized");
        }
      })
      .catch(() => res.status(500).json("server error with delete user"));
  },
};
