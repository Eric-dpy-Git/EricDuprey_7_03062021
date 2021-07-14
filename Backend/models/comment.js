"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Message, {
        through: models.Comment,
        foreignkey: "userId",
        otherKey: "messageId",
      });
      models.Message.belongsToMany(models.User, {
        through: models.Comment,
        foreignkey: "messageId",
        otherKey: "userId",
      });
      models.Comment.belongsTo(models.User, {
        foreignkey: "userId",
        as: "user",
      });
      models.Comment.belongsTo(models.Message, {
        foreignkey: "messageId",
        as: "message",
      });
    }
  }
  Comment.init(
    {
      messageId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Message",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        model: "User",
        key: "id",
      },
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
