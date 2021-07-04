const models = require("../models");

module.exports = {
  createMessage: function (req, res) {
    const message = {
      UserId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      attachement: req.body.attachement,
      likes: 0,
      dislikes: 0,
    };
    //her i can put data from front restriction
    models.Message.create(message)
      .then((result) => {
        res.status(201).json({
          message: "Message created",
          post: result,
        });
      })
      .catch((error) => {
        console.log(res);
        res.status(500).json({
          message: "Error in message creation",
          error: error,
        });
      });
  },
  getOneMessage: function (req, res) {
    const messageId = req.params.id;
    console.log(messageId);
    models.Message.findOne({
      where: { id: messageId },
      include: {
        model: models.User,
        attributes: ["username"], //attributes with username only (i don't want to see email, pasword, etc...)
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "cannot get one message",
        });
      });
  },
  allMessages: function (req, res) {
    models.Message.findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: models.User,
        attributes: ["username"], //attributes with username only (i don't want to see email, pasword, etc...)
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "cannot get all messages",
        });
      });
  },
  updateMessage: function (req, res) {
    const id = req.params.id;
    const updatedMessage = {
      content: req.body.content,
    };
    const userId = req.body.userId;
    models.Message.update(updatedMessage, {
      where: { id: id, userId: userId },
    })
      .then((result) => {
        res.status(200).json({
          message: "Message updated !",
          message: updatedMessage,
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "can't update message !",
          error: error,
        });
      });
  },

  deleteMessage: function (req, res) {
    const messageId = req.params.id;
    const userId = req.body.userId;
    models.Message.findOne({ where: { UserId: userId } }).then((message) => {
      models.Message.destroy({ where: { id: messageId } })
        .then((result) => {
          res.status(200).json({
            message: "message deleted",
          });
        })
        .catch((error) => {
          res.status(200).json({
            message: "no working",
          });
        });
    });
  },
};
