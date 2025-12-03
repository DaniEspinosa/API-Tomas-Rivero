const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./models");
const inmuebleRoutes = require("./routes/inmueble.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// 📂 Servir imágenes estáticas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧠 Rutas de API
app.use("/auth", authRoutes);
app.use("/inmuebles", inmuebleRoutes);

// 🌍 Servir Angular (Render)
const frontendPath = path.join(__dirname, "../frontend/dist/frontend/browser");
app.use(express.static(frontendPath));

// 🧭 Todas las rutas que NO son API → Angular
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// 🚀 LEVANTAR SERVIDOR AL FINAL
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🔥 API escuchando en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error iniciando servidor:", err);
    process.exit(1);
  }
})();
