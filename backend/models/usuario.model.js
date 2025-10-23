const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define("Usuario", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false }, // bcrypt hash
  rol: { type: DataTypes.STRING, allowNull: false, defaultValue: "admin" },
});

module.exports = Usuario;
