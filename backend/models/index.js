const sequelize = require("../config/db");
const Inmueble = require("./inmueble.model");
const Usuario = require("./usuario.model");

const db = {};
db.sequelize = sequelize;
db.Sequelize = require("sequelize");
db.Inmueble = Inmueble;
db.Usuario = Usuario;

module.exports = db;
