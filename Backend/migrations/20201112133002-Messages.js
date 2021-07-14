'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Messages', 'dislikes', {
          allowNull: false,
          type: Sequelize.INTEGER
      }),
    ]);
  },


  down: (queryInterface) => {
    return Promise.all([queryInterface.addColumn('Messages', 'dislikes')]);
  },
};
