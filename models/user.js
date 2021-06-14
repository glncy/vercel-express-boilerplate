"use strict";
const { Model } = require("sequelize");

const { requiredString } = require("./validator.function");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: requiredString("First Name"),
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: requiredString("Last Name"),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username address already existed.",
        },
        validate: requiredString("Username"),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: requiredString("Password"),
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: requiredString("Role"),
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
