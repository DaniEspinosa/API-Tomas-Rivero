const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const u = await Usuario.findOne({ where: { email } });
  if (!u) return res.status(401).json({ error: "Credenciales" });

  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: "Credenciales" });

  const token = jwt.sign(
    { id: u.id, email: u.email, rol: u.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.json({ token });
});

module.exports = router;
