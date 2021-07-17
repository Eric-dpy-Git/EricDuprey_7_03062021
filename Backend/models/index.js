"use strict";

const FS = require("fs");
const PATH = require("path");
const SEQUELIZE = require("sequelize");
const BASENAME = PATH.basename(__filename);
const ENV = process.env.NODE_ENV || "development";
const CONFIG = require(__dirname + "/../config/config.json")[ENV];
const DB = {};

let sequelize;
if (CONFIG.use_env_variable) {
  sequelize = new SEQUELIZE(process.env[CONFIG.use_env_variable], CONFIG);
} else {
  sequelize = new SEQUELIZE(
    CONFIG.database,
    CONFIG.username,
    CONFIG.password,
    CONFIG
  );
}

FS.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== BASENAME && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(PATH.join(__dirname, file))(
      sequelize,
      SEQUELIZE.DataTypes
    );
    DB[model.name] = model;
  });

Object.keys(DB).forEach((modelName) => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});

DB.sequelize = sequelize;
DB.SEQUELIZE = SEQUELIZE;

DB.User = require("../models/user")(sequelize, SEQUELIZE);
DB.Comment = require("../models/comment")(sequelize, SEQUELIZE);
DB.Message = require("../models/message")(sequelize, SEQUELIZE);
DB.Like = require("../models/like")(sequelize, SEQUELIZE);

DB.User.hasMany(DB.Message);

DB.Message.belongsTo(DB.User);

DB.User.hasMany(DB.Like);
DB.Like.belongsTo(DB.User);
DB.Message.hasMany(DB.Like);
DB.Like.belongsTo(DB.Message);

DB.User.hasMany(DB.Comment);
DB.Comment.belongsTo(DB.User);
DB.Message.hasMany(DB.Comment);
DB.Comment.belongsTo(DB.Message);

module.exports = DB;
