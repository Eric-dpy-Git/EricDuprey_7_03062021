// Imports
let models = require("../models");
let asyncLib = require("async");

// Constants
const DISLIKED = 0;
const LIKED = 1;

// Routes
module.exports = {
  liking: function (req, res) {
    let messageId = /* parseInt( */ req.params.id; /* ) */
    let UserId = /* parseInt( */ req.body.userId; /* ) */
    console.log(messageId);
    console.log(UserId);

    asyncLib.waterfall(
      [
        function (done) {
          models.Messages.findOne({
            where: { id: messageId },
          })
            .then(function (messageFound) {
              done(null, messageFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "No message !" });
            });
        },
        function (messageFound, done) {
          if (messageFound) {
            models.Messages.findOne({
              where: { id: UserId },
            })
              .then(function (userFound) {
                done(null, messageFound, userFound);
              })
              .catch(function (err) {
                return res.status(500).json({ error: "No user" });
              });
          } else {
            res.status(404).json({ error: "Already liked" });
          }
        },
        function (messageFound, userFound, done) {
          if (userFound) {
            models.Likes.findOne({
              where: {
                userId: userId,
                messageId: messageId,
              },
            })
              .then(function (userAlreadyLikedFound) {
                done(null, messageFound, userFound, userAlreadyLikedFound);
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ error: "Already used verification off" });
              });
          } else {
            res.status(404).json({ error: "No user !" });
          }
        },
        function (messageFound, userFound, userAlreadyLikedFound, done) {
          if (!userAlreadyLikedFound) {
            messageFound
              .addUser(userFound, { isLike: LIKED })
              .then(function (alreadyLikeFound) {
                done(null, messageFound, userFound);
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ error: "Not working in already use 1" });
              });
          } else {
            if (userAlreadyLikedFound.isLike === DISLIKED) {
              userAlreadyLikedFound
                .update({
                  isLike: LIKED,
                })
                .then(function () {
                  done(null, messageFound, userFound);
                })
                .catch(function (err) {
                  res
                    .status(500)
                    .json({ error: "Not working in already use 2" });
                });
            } else {
              res.status(409).json({ error: "Already liked" });
            }
          }
        },
        function (messageFound, userFound, done) {
          messageFound
            .update({
              Likes: messageFound.likes + 1,
            })
            .then(function () {
              done(messageFound);
            })
            .catch(function (err) {
              res
                .status(500)
                .json({ error: "cannot update message like counter" });
            });
        },
      ],
      function (messageFound) {
        if (messageFound) {
          return res.status(201).json(messageFound);
        } else {
          return res.status(500).json({ error: "cannot update message" });
        }
      }
    );
  },
};
