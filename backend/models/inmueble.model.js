const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Inmueble = sequelize.define("Inmueble", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },

  // Tipo de operación (alquiler o venta)
  operacion: {
    type: DataTypes.ENUM("alquiler", "venta"),
    allowNull: false,
  },

  // Tipo de propiedad
  tipo: {
    type: DataTypes.ENUM(
      "piso",
      "atico",
      "duplex",
      "estudio",
      "chalet_pareado",
      "chalet_adosado",
      "casa_independiente",
      "oficina",
      "local",
      "plaza_garaje",
      "terreno",
      "trastero"
    ),
    allowNull: false,
  },

  zona: { type: DataTypes.STRING, allowNull: false },
  dormitorios: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  banos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  metros: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

  precio: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },

  estado: {
    type: DataTypes.ENUM("a reformar", "en buen estado", "obra nueva"),
    allowNull: false,
    defaultValue: "en buen estado",
  },

  orientacion: {
    type: DataTypes.ENUM("norte", "sur", "este", "oeste"),
    allowNull: true,
  },

  anoConstruccion: { type: DataTypes.INTEGER, allowNull: true },

  calefaccion: {
    type: DataTypes.ENUM("individual", "central", "no disponible"),
    allowNull: false,
    defaultValue: "no disponible",
  },

  gastosComunidad: { type: DataTypes.FLOAT, allowNull: true },

  caracteristicas: {
    // JSON array con las opciones seleccionadas
    type: DataTypes.JSON,
    allowNull: true,
  },

  ascensor: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },

  fotoPrincipal: { type: DataTypes.STRING }, // ruta en /uploads
  urlIdealista: { type: DataTypes.STRING },
});

module.exports = Inmueble;
