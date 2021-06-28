"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Messages.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }
  Messages.init(
    {
      userId: DataTypes.INTEGER,

      content: DataTypes.TEXT,
      /* imageUrl: DataTypes.STRING, */
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
