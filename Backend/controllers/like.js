// Imports
let models = require("../models");

// Const
const DISLIKED = 0;
const LIKED = 1;

module.exports = {
  //---------------------------------------------liking
  likeMessage: (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.messsageId;
    //Compare message with id
    models.Message.findOne({ where: { id: messageId } }).then((message) => {
      if (message) {
        //Compare user with id
        models.User.findOne({ where: { id: userId } }).then((user) => {
          if (user) {
            // if message & user found
            models.Like.findOne({
              where: { userId: userId, messageId: messageId },
            }) // find if allready like
              .then((like) => {
                if (!like) {
                  //create if not
                  models.Like.create({
                    messageId: message.id,
                    userId: user.id,
                    allreadyLike: 1,
                  })
                    .then(() => {
                      message
                        .update({
                          // add 1 to likes row
                          likes: message.likes + 1,
                        })
                        .then(() => res.status(201).json(message));
                    })
                    .catch((error) => res.status(500).json({ error }));
                  //if allready like and like on
                } else if (like && like.allreadyLike == 1) {
                  like
                    //in Likes db turn alreadyLike to 0
                    .update(
                      { allreadyLike: 0 },
                      { where: { messageId: message.id, userId: user.id } }
                    )
                    //then -1 in Messages db at row likes
                    .then(() => {
                      message
                        .update({
                          likes: message.likes - 1,
                        })
                        .then(() => {
                          models.Like.destroy({
                            where: { id: like.id },
                          }).then(() => res.status(200).json("like deleted"));
                        });
                    })
                    .catch((error) => {
                      return res.status(500).json({ error });
                    });
                } else if (like && like.allreadyLike === -1) {
                  // if is like allready disliked
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
  },

  // -----------------------------------------------------------disliking
  dislikeMessage: (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.messageId;
    models.Message.findOne({ where: { id: messageId } })
      .then((message) => {
        if (message) {
          models.User.findOne({ where: { id: userId } })
            .then((user) => {
              if (user) {
                models.Like.findOne({
                  where: { userId: userId, messageId: messageId },
                })
                  .then((like) => {
                    if (!like) {
                      models.Like.create({
                        messageId: message.id,
                        userId: user.id,
                        allreadyLike: -1,
                      })
                        .then(() => {
                          message
                            .update({
                              dislikes: message.dislikes + 1,
                            })
                            .then(() => res.status(201).json(message));
                        })
                        .catch((error) => res.status(500).json({ error }));
                    } else if (like && like.allreadyLike == -1) {
                      like
                        .update(
                          { allreadyLike: 0 },
                          { where: { messageId: message.id, userId: user.id } }
                        )
                        .then(() => {
                          message
                            .update({
                              dislikes: message.dislikes - 1,
                            })
                            .then(() => {
                              models.Like.destroy({
                                where: {
                                  messageId: message.id,
                                  userId: user.id,
                                },
                              }).then(() =>
                                res.status(200).json("dislike deleted")
                              );
                            });
                        })
                        .catch((error) => {
                          return res.status(500).json({ error });
                        });
                    } else if (like && like.allreadyLike == 1) {
                      return res
                        .status(409)
                        .json({ message: "disliked message" });
                    }
                  })
                  .catch(() => {
                    return res.status(500).json({
                      error: "server error",
                    });
                  });
              } else {
                return res.status(401).json({ error: "unknow user" });
              }
            })
            .catch(() =>
              res.status(500).json({
                error: "server error",
              })
            );
        } else {
          return res.status(400).json({ error: "unknow message" });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: "server error",
        })
      );
  },
};

/* const db = require("../models/index");

exports.likeMessage = (req, res, next) => {
  const userId = req.body.userId;
  const messageId = req.params.messageId;

  if (messageId <= 0) {
    return res.status(400).json({ error: "no message" });
  }
  if (userId <= 0) {
    return res.status(400).json({ error: "no user" });
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
                return res.status(409).json({ message: "disliked" });
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
    return res.status(400).json({ error: "no message" });
  }
  if (userId <= 0) {
    return res.status(400).json({ error: "no user" });
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
                    return res.status(409).json({ message: "disliked" });
                  }
                })
                .catch(() => {
                  return res.status(500).json({
                    error: "cannot verify user",
                  });
                });
            } else {
              return res.status(401).json({ error: "unknow user" });
            }
          })
          .catch(() =>
            res.status(500).json({
              error: "cannot verify user",
            })
          );
      } else {
        return res.status(400).json({ error: "no message" });
      }
    })
    .catch(() =>
      res.status(500).json({
        error: "cannot verify message",
      })
    );
}; */
