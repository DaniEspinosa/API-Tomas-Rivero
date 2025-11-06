const bcrypt = require("bcryptjs");
const db = require("../models");

(async () => {
  try {
    await db.sequelize.sync({ alter: true });

    // 👤 Admin
    const email = "admin@tuinmobiliaria.com";
    const pass = "admin123";
    const hash = await bcrypt.hash(pass, 10);

    await db.Usuario.findOrCreate({
      where: { email },
      defaults: { passwordHash: hash, rol: "admin" },
    });

    // 🏡 Inmuebles demo
    const demos = [
      {
        titulo: "Piso céntrico con balcón",
        descripcion: "Luminoso, reformado, cerca de metro.",
        operacion: "venta",
        tipo: "piso",
        zona: "Centro",
        dormitorios: 2,
        banos: 1,
        metrosUtiles: 75,
        metrosConstruidos: 95,
        metrosPArcela: 175,
        precio: 215000,
        estado: "en buen estado",
        orientacion: "sur",
        anoConstruccion: 1995,
        calefaccion: "individual",
        gastosComunidad: 50,
        caracteristicas: ["balcón", "armarios empotrados"],
        ascensor: true,
        fotoPrincipal: "https://picsum.photos/seed/piso1/800/450",
        urlIdealista: "https://www.idealista.com/",
      },
      {
        titulo: "Chalet con jardín y piscina",
        descripcion: "Parcela amplia con piscina privada y zonas verdes.",
        operacion: "venta",
        tipo: "casa_independiente",
        zona: "Norte",
        dormitorios: 4,
        banos: 3,
        metrosUtiles: 75,
        metrosConstruidos: 95,
        metrosPArcela: 175,
        precio: 420000,
        estado: "en buen estado",
        orientacion: "oeste",
        anoConstruccion: 2008,
        calefaccion: "central",
        gastosComunidad: null,
        caracteristicas: [
          "piscina",
          "plaza de garaje",
          "trastero",
          "zonas verdes",
        ],
        ascensor: false,
        fotoPrincipal: "https://picsum.photos/seed/casa1/800/450",
        urlIdealista: "https://www.idealista.com/",
      },
      {
        titulo: "Ático con terraza en zona exclusiva",
        descripcion: "Vistas panorámicas, aire acondicionado y garaje.",
        operacion: "alquiler",
        tipo: "atico",
        zona: "Centro",
        dormitorios: 3,
        banos: 2,
        metrosUtiles: 75,
        metrosConstruidos: 95,
        metrosPArcela: 175,
        precio: 1200,
        estado: "en buen estado",
        orientacion: "este",
        anoConstruccion: 2015,
        calefaccion: "individual",
        gastosComunidad: 70,
        caracteristicas: ["terraza", "aire acondicionado", "plaza de garaje"],
        ascensor: true,
        fotoPrincipal: "https://picsum.photos/seed/atico1/800/450",
        urlIdealista: "https://www.idealista.com/",
      },
    ];

    for (const d of demos) {
      await db.Inmueble.findOrCreate({
        where: { titulo: d.titulo },
        defaults: d,
      });
    }

    console.log("✅ Seed completado. Admin:", email, "pass:", pass);
    process.exit(0);
  } catch (e) {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  }
})();
