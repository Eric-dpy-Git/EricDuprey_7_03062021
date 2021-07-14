const db = require("../models/index");
const jwt = require("jsonwebtoken");
const REGEX_CONTENT = /^[a-zÀ-ÿ\d\-.':)(+;,_!?\s]{0,250}$/i;
//-------------------------------------------------create a comment
exports.createComment = (req, res, next) => {
  /* console.log(req.body); */
  if (!REGEX_CONTENT.test(req.body.content)) {
    return res.status(400).json({ error: "invalid comment" });
  }

  db.Message.findOne({ where: { id: req.params.messageId } })
    .then((message) => {
      db.Comment.create({
        UserId: req.body.userId,
        messageId: message.id,
        content: req.body.content,
      })
        .then(() => res.status(201).json("comment created"))
        .catch(() => res.status(400).json({ error: "invalid" }));
    })
    .catch(() =>
      res.status(500).json({ error: "server error with create comment" })
    );
};
//-------------------------------------------------see one comment
exports.oneComment = (req, res, next) => {
  /* console.log(req.params.commentId);
  console.log(req.params.userId); */

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TKN);
  const userId = decodedToken.userId;

  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      db.Comment.findOne({
        where: { id: req.params.commentId },
        include: [
          {
            model: db.User,
            attributes: ["id", "username"],
          },
        ],
      })
        .then((comment) => {
          if (user.id == comment.UserId || user.isAdmin === true) {
            return res.status(200).json(comment);
          } else {
            return res.status(401).json({ message: "unauthorized" });
          }
        })
        .catch(() => {
          res.status(400).json({ message: "unknow comment" });
        });
    })
    .catch(() => {
      res.status(500).json({ message: "server error with comment " });
    });
};
//-------------------------------------------------delete a comment
exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TKN);
  const userId = decodedToken.userId;

  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      db.Comment.findOne({
        where: { id: req.params.commentId },
      })
        .then((comment) => {
          if (user.id == comment.userId || user.isAdmin === true) {
            db.Comment.destroy({
              where: { id: req.params.commentId },
            })
              .then(() => res.status(200).json({ message: "comment deleted" }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            return res.status(401).json({ message: "unauthorized" });
          }
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch(() => {
      res.status(500).json({ error: "server error with delete comment" });
    });
};
