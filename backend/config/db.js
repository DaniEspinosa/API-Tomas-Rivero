const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306, // fuerza a número
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario para Aiven
      },
    },
  }
);

// 🔹 Prueba inmediata de conexión al iniciar (útil en Render)
sequelize
  .authenticate()
  .then(() =>
    console.log("✅ Conexión a la base de datos establecida correctamente")
  )
  .catch((err) =>
    console.error("❌ Error al conectar con la base de datos:", err)
  );

module.exports = sequelize;
