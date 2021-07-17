"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      attachment: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      content: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dislikes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Messages");
  },
};
