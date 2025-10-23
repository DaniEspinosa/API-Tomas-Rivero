const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./models");
const inmuebleRoutes = require("./routes/inmueble.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));
app.use(express.json());

// 📂 Servir imágenes estáticas desde /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => res.send("API Inmobiliaria OK"));

// 🔑 Rutas
app.use("/auth", authRoutes);
app.use("/inmuebles", inmuebleRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync(); // crea tablas si no existen
    app.listen(PORT, () =>
      console.log(`✅ API escuchando en http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error iniciando servidor:", e);
    process.exit(1);
  }
})();
