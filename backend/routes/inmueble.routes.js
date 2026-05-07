const express = require("express");
const router = express.Router();
const controller = require("../controllers/inmueble.controller");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// 📂 Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // carpeta donde se guardan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 📌 Rutas públicas
router.get("/zonas", controller.getZonas);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

// 📌 Rutas protegidas (admin con token)
const uploadFields = upload.fields([
  { name: "fotoPrincipal", maxCount: 1 },
  { name: "fotos", maxCount: 10 },
]);
router.post("/", auth, uploadFields, controller.create);
router.put("/:id", auth, uploadFields, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
