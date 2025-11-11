const mysql = require("mysql2/promise");

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: "tomasriveroapi-db-tomasriveroapi-edbd.g.aivencloud.com",
      port: 28751,
      user: "avnadmin",
      password: "AVNS_7Cutq2tdqS6eWGum4F0",
      database: "defaultdb",
      ssl: { rejectUnauthorized: false },
    });

    console.log("✅ Conexión a MySQL Aiven exitosa");
    const [rows] = await conn.query("SELECT NOW()");
    console.log(rows);
    await conn.end();
  } catch (err) {
    console.error("❌ Error conectando a MySQL:", err);
  }
})();
