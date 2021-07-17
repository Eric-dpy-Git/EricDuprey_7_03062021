const DB = require("../models/index"); // message model passtrhouhg sequelize index
const FS = require("fs"); // file systeme to manage files
const JWT = require("jsonwebtoken");

const REGEX_TITLE = /^[a-zÀ-ÿ\d\-.'!:;)(?+\s]{2,30}$/i;
const REGEX_CONTENT = /^[a-zÀ-ÿ\d\-.',!?;:)(+\s]{0,250}$/i;
const REGEX_NUMBER = /^\d+$/;
const ITEMS_LIMIT = 40;

// -------------------------------------------------create message
module.exports = {
  createMessage: (req, res, next) => {
    if (!REGEX_TITLE.test(req.body.title)) {
      return res.status(400).json({ error: "invalid title" });
    }
    if (!REGEX_CONTENT.test(req.body.content)) {
      return res.status(400).json({ error: "invalid content" });
    }
    if (
      !REGEX_NUMBER.test(req.body.userId) ||
      !REGEX_NUMBER.test(req.body.dislikes) ||
      !REGEX_NUMBER.test(req.body.likes)
    ) {
      return res.status(400).json({ error: "invalid entry" });
    }
    DB.User.findOne({
      where: { id: req.body.userId },
    })
      .then((user) => {
        if (req.body.image == "undefined") {
          return DB.Message.create({
            UserId: user.id,
            title: req.body.title,
            attachment: null,
            content: req.body.content,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
          })
            .then((message) => res.status(201).json(message))
            .catch(() => res.status(400).json({ error: "invalid entry" }));
        } else {
          return DB.Message.create({
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
      .catch(() =>
        res.status(500).json({ error: "server error with message creation" })
      );
  },
  // -------------------------------------------------get all messages
  getAllMessages: (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;
    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }
    DB.Message.findAll({
      order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : null,
      offset: !isNaN(offset) ? offset : null,
      include: [
        {
          model: DB.User,
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
  },
  // -------------------------------------------------get one message
  getOneMessage: (req, res, next) => {
    DB.Message.findOne({
      where: { id: req.params.messageId },
      include: [
        {
          model: DB.User,
          attributes: ["id", "username"],
          include: [
            {
              model: DB.Like,
              attributes: ["id", "userId"],
            },
          ],
        },
        {
          model: DB.Comment,
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              model: DB.User,
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
  },
  // ------------------------------------------------- update message
  modifyMessage: (req, res, next) => {
    if (!REGEX_TITLE.test(req.body.title)) {
      return res.status(400).json({ error: "invalid title" });
    }
    if (!REGEX_CONTENT.test(req.body.content)) {
      return res.status(400).json({ error: "invalid content" });
    }
    if (
      !REGEX_NUMBER.test(req.body.userId) ||
      !REGEX_NUMBER.test(req.body.likes) ||
      !REGEX_NUMBER.test(req.body.likes)
    ) {
      return res.status(400).json({ error: "invalid entry" });
    }
    DB.User.findOne({
      where: { id: req.body.userId },
    })
      .then((user) => {
        DB.Message.findOne({
          where: { id: req.params.messageId },
        })
          .then((message) => {
            if (message.UserId == user.id || user.isAdmin === true) {
              if (req.body.image == "undefined") {
                return DB.Message.update(
                  {
                    ...req.body,
                    attachment: null,
                  },
                  { where: { id: req.params.messageId } },
                  DB.Like.destroy({ where: { messageId: message.id } })
                )
                  .then(() => res.status(200).json("updated message"))
                  .catch(() => res.status(400).json({ error: "invalid" }));
              } else {
                return DB.Message.update(
                  {
                    ...req.body,
                    attachment: `${req.protocol}://${req.get("host")}/images/${
                      req.file.filename
                    }`,
                  },
                  { where: { id: req.params.messageId } },
                  DB.Like.destroy({ where: { messageId: message.id } })
                )
                  .then(() => res.status(200).json("updated message"))
                  .catch(() => res.status(400).json({ error: "invalid" }));
              }
            } else {
              return res.status(403).json("unhautorized");
            }
          })
          .catch(() => {
            res.status(500).json({ error: "server error with update message" });
          });
      })
      .catch(() => {
        res.status(500).json({ error: "server error with update message" });
      });
  },
  // ------------------------------------------------- delete message
  deleteMessage: (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = JWT.verify(token, process.env.TKN);
    let userId = decodedToken.userId;
    DB.User.findOne({
      where: { id: userId },
    })
      .then((user) => {
        DB.Message.findOne({ where: { id: req.params.messageId } })
          .then((message) => {
            if (message.UserId == user.id || user.isAdmin === true) {
              if (message.attachment === null) {
                DB.Message.destroy({
                  where: { id: req.params.messageId },
                })
                  .then(() =>
                    res.status(200).json({ message: "deleted message" })
                  )
                  .catch((error) => res.status(400).json({ error }));
              } else {
                const filename = message.attachment.split("/images/")[1];
                FS.unlink(`images/${filename}`, () => {
                  DB.Message.destroy({
                    where: { id: req.params.messageId },
                  })
                    .then(() =>
                      res.status(200).json({ message: "deleted message" })
                    )
                    .catch((error) => res.status(400).json({ error }));
                });
              }
            } else {
              return res.status(403).json("unhautorized");
            }
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch(() => {
        res.status(500).json({ error: "server error with delete message" });
      });
  },
};
