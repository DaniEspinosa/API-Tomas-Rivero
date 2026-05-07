const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./models");
const inmuebleRoutes = require("./routes/inmueble.routes");
const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// 📂 Servir imágenes estáticas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🧠 Rutas de API
app.use("/auth", authRoutes);
app.use("/inmuebles", inmuebleRoutes);
app.use("/contact", contactRoutes);

// 🧩 Conexión base de datos
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`✅ API escuchando en http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error iniciando servidor:", e);
    process.exit(1);
  }
})();

// 🌍 Servir Angular (Render)
const frontendPath = path.join(__dirname, "../frontend/dist/frontend/browser");
app.use(express.static(frontendPath));

// ✅ Servir Angular en todas las rutas no API
app.use((req, res, next) => {
  if (
    req.originalUrl.startsWith("/auth") ||
    req.originalUrl.startsWith("/inmuebles") ||
    req.originalUrl.startsWith("/contact") ||
    req.originalUrl.startsWith("/uploads")
  ) {
    return next(); // deja pasar las rutas de API o estáticos
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});
