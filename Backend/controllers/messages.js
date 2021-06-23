const models = require("../models");

module.exports = {
  createMessage: function (req, res) {
    const message = {
      userId: req.body.id,
      content: req.body.content,
      //need to add image
      likes: 0,
    };
    models.Messages.create(message)
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
    const id = req.params.id;
    models.Messages.findOne({
      where: { id: id },
      include: {
        model: models.Users,
        attributes: ["username"], //need to add attributes if we do not want to see all Users (password etc..)
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Impossible to get one message",
        });
      });
  },
  getAllMessages: function (req, res) {
    models.Messages.findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: models.Users,
        attributes: ["username"], //need to add attributes if we do not want to see all Users (password etc..)
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Impossible to get all messages",
        });
      });
  },
  updateMessage: function (req, res) {
    const id = req.params.id;
    const updatedMessage = {
      content: req.body.content,
    };
    const userId = req.body.userId;
    models.Messages.update(updatedMessage, {
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
          message: "Impossible to update message !",
          error: error,
        });
      });
  },
};
