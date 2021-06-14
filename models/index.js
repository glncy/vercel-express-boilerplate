"use strict";

const env = process.env.NODE_ENV || "development";
const dbconfig = require(__dirname + "/../config/config.json")[env];
const models = require("./models");

// Dialect
const mysql2 = require("mysql2");

const dialect = {
  mysql: mysql2,
};

module.exports = models({
  database: dbconfig.database,
  username: dbconfig.username,
  password: dbconfig.password,
  options: {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
    dialectModule: dialect[dbconfig.dialect],
  },
});
