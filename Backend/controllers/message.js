const db = require("../models/index");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createMessage = (req, res, next) => {
  db.User.findOne({
    where: { id: req.body.userId },
  })
    .then((user) => {
      if (req.body.image == "undefined") {
        return db.Message.create({
          UserId: user.id,
          title: req.body.title,
          attachment: null,
          content: req.body.content,
          likes: req.body.likes,
          dislikes: req.body.dislikes,
        })
          .then((message) => res.status(201).json(message))
          .catch(() => res.status(400).json({ error: "invalid" }));
      } else {
        return db.Message.create({
          UserId: user.id,
          title: req.body.title,
          attachment: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          content: req.body.content,
          likes: req.body.likes,
          dislikes: req.body.dislikes,
        })
          .then((message) => res.status(201).json(message))
          .catch(() => res.status(400).json({ error: "invalid" }));
      }
    })
    .catch(() => res.status(500).json({ error: "error server" }));
};

exports.getAllMessages = (req, res, next) => {
  console.log(req.body);
  let fields = req.query.fields;
  let limit = parseInt(req.query.limit);
  let offset = parseInt(req.query.offset);
  let order = req.query.order;

  db.Message.findAll({
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : null,
    offset: !isNaN(offset) ? offset : null,
    include: [
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((message) => {
      return res.status(200).json(message);
    })
    .catch(() => {
      res.status(500).json({ error: "no message" });
    });
};

exports.getOneMessage = (req, res, next) => {
  console.log(req.params.messageId);
  db.Message.findOne({
    where: { id: req.params.messageId },

    include: [
      {
        model: db.User,
        attributes: ["id", "username"],
        include: [
          {
            model: db.Like,
            attributes: ["id", "userId"],
          },
        ],
      },

      {
        model: db.Comment,
        attributes: ["id", "content", "createdAt"],
        include: [
          {
            model: db.User,
            attributes: ["id", "username"],
          },
        ],
      },
    ],
  })

    .then((message) => {
      return res.status(200).json(message);
    })

    .catch(() => {
      res.status(500).json({ error: "unknow message" });
    });
};

exports.modifyMessage = (req, res, next) => {
  console.log(req.body);

  db.User.findOne({
    where: { id: req.body.userId },
  })
    .then((user) => {
      db.Message.findOne({
        where: { id: req.params.messageId },
      })
        .then((message) => {
          if (message.UserId == user.id || user.isAdmin === true) {
            if (req.body.image == "undefined") {
              return db.Message.update(
                {
                  ...req.body,
                  attachment: null,
                },
                { where: { id: req.params.messageId } },
                db.Like.destroy({ where: { messageId: message.id } })
              )
                .then(() => res.status(200).json("message updated"))
                .catch(() => res.status(400).json({ error: "invalid" }));
            } else {
              return db.Message.update(
                {
                  ...req.body,
                  attachment: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`,
                },
                { where: { id: req.params.messageId } },
                db.Like.destroy({ where: { messageId: message.id } })
              )
                .then(() => res.status(200).json("message updated"))
                .catch(() => res.status(400).json({ error: "invalid" }));
            }
          } else {
            return res.status(403).json("no access");
          }
        })
        .catch(() => {
          res.status(500).json({ error: "unknow message" });
        });
    })
    .catch(() => {
      res.status(500).json({ error: "unknow user" });
    });
};

exports.deleteMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "TOKEN");
  const userId = decodedToken.userId;

  db.User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      db.Message.findOne({ where: { id: req.params.messageId } })
        .then((message) => {
          if (message.UserId == user.id || user.isAdmin === true) {
            if (message.attachment === null) {
              db.Message.destroy({
                where: { id: req.params.messageId },
              })
                .then(() =>
                  res.status(200).json({ message: "message deleted" })
                )
                .catch((error) => res.status(400).json({ error }));
            } else {
              const filename = message.attachment.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                db.Message.destroy({
                  where: { id: req.params.messageId },
                })
                  .then(() =>
                    res.status(200).json({ message: "message deleted" })
                  )
                  .catch((error) => res.status(400).json({ error }));
              });
            }
          } else {
            return res.status(403).json("no access");
          }
        })
        .catch((error) => res.status(500).json({ error: "unknow message" }));
    })
    .catch(() => {
      res.status(500).json({ error: "unknow user" });
    });
};
