const { Op } = require("sequelize");
const { Inmueble } = require("../models");

// 📌 GET todos con filtros
exports.getAll = async (req, res) => {
  try {
    const {
      tipo,
      zona,
      dormitoriosMin,
      dormitoriosMax,
      precioMin,
      precioMax,
      operacion,
    } = req.query;

    const where = {};

    if (tipo) where.tipo = tipo;
    if (zona) where.zona = zona;
    if (operacion) where.operacion = operacion;

    if (dormitoriosMin || dormitoriosMax) {
      where.dormitorios = {};
      if (dormitoriosMin) where.dormitorios[Op.gte] = Number(dormitoriosMin);
      if (dormitoriosMax) where.dormitorios[Op.lte] = Number(dormitoriosMax);
    }

    if (precioMin || precioMax) {
      where.precio = {};
      if (precioMin) where.precio[Op.gte] = Number(precioMin);
      if (precioMax) where.precio[Op.lte] = Number(precioMax);
    }

    const inmuebles = await Inmueble.findAll({
      where,
      order: [["id", "DESC"]],
    });
    res.json(inmuebles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error obteniendo inmuebles" });
  }
};

// 📌 GET uno
exports.getOne = async (req, res) => {
  try {
    const inmueble = await Inmueble.findByPk(req.params.id);
    if (!inmueble) return res.status(404).json({ error: "No encontrado" });
    res.json(inmueble);
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
};

// 📌 CREATE
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };

    // 📸 Foto subida
    if (req.file) {
      data.fotoPrincipal = `/uploads/${req.file.filename}`;
    }

    // 📝 Características (si viene como string, lo parseamos)
    if (typeof data.caracteristicas === "string") {
      try {
        data.caracteristicas = JSON.parse(data.caracteristicas);
      } catch {
        data.caracteristicas = [data.caracteristicas];
      }
    }

    const inmueble = await Inmueble.create(data);
    res.status(201).json(inmueble);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Datos inválidos" });
  }
};

// 📌 UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (req.file) {
      data.fotoPrincipal = `/uploads/${req.file.filename}`;
    }

    if (typeof data.caracteristicas === "string") {
      try {
        data.caracteristicas = JSON.parse(data.caracteristicas);
      } catch {
        data.caracteristicas = [data.caracteristicas];
      }
    }

    const [n] = await Inmueble.update(data, { where: { id } });
    if (!n) return res.status(404).json({ error: "No encontrado" });
    const actualizado = await Inmueble.findByPk(id);
    res.json(actualizado);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Datos inválidos" });
  }
};

// 📌 DELETE
exports.delete = async (req, res) => {
  try {
    const n = await Inmueble.destroy({ where: { id: req.params.id } });
    if (!n) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Error" });
  }
};
