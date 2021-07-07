/* "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.User.belongsToMany(models.Message, {
        through: models.Like,
        foreignkey: "userId",
        otherKey: "messageId",
      });
      models.Message.belongsToMany(models.User, {
        through: models.Like,
        foreignkey: "messageId",
        otherKey: "userId",
      });
      models.Like.belongsTo(models.User, {
        foreignkey: "userId",
        as: "user",
      });
      models.Like.belongsTo(models.Message, {
        foreignkey: "messageId",
        as: "message",
      });
    }
  }
  Like.init(
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
      likeType: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
 */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Like.belongsTo(models.User, {
        foreignkey: "userId",
        as: "user",
      });
      models.Like.belongsTo(models.Message, {
        foreignkey: "messageId",
        as: "message",
      });
    }
  }
  Like.init(
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
      allreadyLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
