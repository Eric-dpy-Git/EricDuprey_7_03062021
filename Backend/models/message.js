'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Message.belongsTo(models.User, {//belongsTo le type de relation
      //   foreignKey: {//la relation de la clé étrangère ne doit pas être égal à null
      //     allowNull: false,
          
      //   },
      // })
    }
  };
  Message.init({
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};