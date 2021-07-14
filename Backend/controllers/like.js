const db = require("../models/index");

exports.likeMessage = (req, res, next) => {
  const userId = req.body.userId;
  const messageId = req.params.messageId;

  if (messageId <= 0) {
    return res.status(400).json({ error: "unknow message" });
  }
  if (userId <= 0) {
    return res.status(400).json({ error: "unknow user" });
  }

  db.Message.findOne({ where: { id: messageId } }).then((message) => {
    if (message) {
      db.User.findOne({ where: { id: userId } }).then((user) => {
        if (user) {
          db.Like.findOne({ where: { userId: userId, messageId: messageId } })
            .then((like) => {
              if (!like) {
                db.Like.create({
                  messageId: message.id,
                  userId: user.id,
                  likeType: 1,
                })
                  .then(() => {
                    message
                      .update({
                        likes: message.likes + 1,
                      })
                      .then(() => res.status(201).json(message));
                  })
                  .catch((error) => res.status(500).json({ error }));
              } else if (like && like.likeType == 1) {
                like
                  .update(
                    { likeType: 0 },
                    { where: { messageId: message.id, userId: user.id } }
                  )
                  .then(() => {
                    message
                      .update({
                        likes: message.likes - 1,
                      })
                      .then(() => {
                        db.Like.destroy({
                          where: { id: like.id },
                        }).then(() => res.status(200).json("like deleted"));
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({ error });
                  });
              } else if (like && like.likeType === -1) {
                return res.status(409).json({ message: "disliked message" });
              }
            })
            .catch((error) => {
              return res.status(500).json({ error });
            });
        } else {
          return res.status(401).json({ message: "unknow user" });
        }
      });
    }
  });
};

exports.dislikeMessage = (req, res, next) => {
  const userId = req.body.userId;
  const messageId = req.params.messageId;

  if (messageId <= 0) {
    return res.status(400).json({ error: "unknow message" });
  }
  if (userId <= 0) {
    return res.status(400).json({ error: "unknow user" });
  }

  db.Message.findOne({ where: { id: messageId } })
    .then((message) => {
      if (message) {
        db.User.findOne({ where: { id: userId } })
          .then((user) => {
            if (user) {
              db.Like.findOne({
                where: { userId: userId, messageId: messageId },
              })
                .then((like) => {
                  if (!like) {
                    db.Like.create({
                      messageId: message.id,
                      userId: user.id,
                      likeType: -1,
                    })
                      .then(() => {
                        message
                          .update({
                            dislikes: message.dislikes + 1,
                          })
                          .then(() => res.status(201).json(message));
                      })
                      .catch((error) => res.status(500).json({ error }));
                  } else if (like && like.likeType == -1) {
                    like
                      .update(
                        { likeType: 0 },
                        { where: { messageId: message.id, userId: user.id } }
                      )
                      .then(() => {
                        message
                          .update({
                            dislikes: message.dislikes - 1,
                          })
                          .then(() => {
                            db.Like.destroy({
                              where: { messageId: message.id, userId: user.id },
                            }).then(() =>
                              res.status(200).json("dislike deleted")
                            );
                          });
                      })
                      .catch((error) => {
                        return res.status(500).json({ error });
                      });
                  } else if (like && like.likeType == 1) {
                    return res
                      .status(409)
                      .json({ message: "disliked message" });
                  }
                })
                .catch(() => {
                  return res.status(500).json({
                    error: "server error with dislike",
                  });
                });
            } else {
              return res.status(401).json({ error: "unknow user" });
            }
          })
          .catch(() =>
            res.status(500).json({
              error: "server error with dislike message",
            })
          );
      } else {
        return res.status(400).json({ error: "unknow message" });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "server error with dislike",
      })
    );
};
