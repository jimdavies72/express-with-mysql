const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../connection");

const User = connection.define(
  "User_a",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);

module.exports = User;
