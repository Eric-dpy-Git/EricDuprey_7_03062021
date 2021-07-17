"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@groupomania.com",
        username: "Admin",
        firstname: "Admin",
        lastname: "Admin",
        password:
          "$2b$10$7PY.VIbSO4W78RvMHSHg.u4VznbJKrCA4sZ9rKpc05BgbJqarnonK",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
// watch documentation at : https://sequelize.org/master/manual/migrations.html
