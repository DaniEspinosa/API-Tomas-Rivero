const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define(
  "Usuario",
  {
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false }, // bcrypt hash
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: "admin" },
  },
  {
    // El índice único se declara aquí con nombre explícito en lugar de con
    // `unique: true` en la columna: así sync({ alter: true }) reconoce el que ya
    // existe en vez de crear un duplicado nuevo en cada arranque.
    indexes: [{ unique: true, fields: ["email"], name: "email" }],
  }
);

module.exports = Usuario;
