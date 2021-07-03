// Imports
let models = require("../models");

// Const
const DISLIKED = 0;
const LIKED = 1;

module.exports = {
  //---------------------------------------------liking
  liking: (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.id;
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
  disliking: (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.id;
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
