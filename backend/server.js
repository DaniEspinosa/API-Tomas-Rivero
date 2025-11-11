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

// 🔑 Rutas de API
app.use("/auth", authRoutes);
app.use("/inmuebles", inmuebleRoutes);

const PORT = process.env.PORT || 3000;

// 🚀 Conexión a la base de datos y arranque
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    app.listen(PORT, () =>
      console.log(`✅ API escuchando en http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error iniciando servidor:", e);
    process.exit(1);
  }
})();

const frontendPath = path.join(__dirname, "../frontend/dist/frontend/browser");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
