module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      messageId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Messages",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        defaultValue: "1",
        references: {
          model: "Users",
          key: "id",
        },
      },
      isLike: DataTypes.INTEGER,
    },
    {}
  );
  Like.associate = function (models) {
    models.Users.belongsToMany(models.Messages, {
      through: models.Like,
      foreignKey: "userId",
      otherKey: "messageId",
    });

    models.Messages.belongsToMany(models.Users, {
      through: models.Like,
      foreignKey: "messageId",
      otherKey: "userId",
    });

    models.Like.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });

    models.Like.belongsTo(models.Messages, {
      foreignKey: "messageId",
      as: "message",
    });
  };
  return Like;
};
