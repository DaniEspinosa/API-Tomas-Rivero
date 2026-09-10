/**
 * Limpia los índices UNIQUE duplicados de la tabla `Usuarios`.
 *
 * Contexto: durante un tiempo el servidor arrancaba con `sequelize.sync({ alter: true })`
 * y el campo `email` estaba declarado con `unique: true` inline. En MySQL eso provoca que
 * en CADA arranque se cree un índice único nuevo (email, email_2, email_3...) hasta chocar
 * con el límite de 64 índices por tabla y romper el arranque con ER_TOO_MANY_KEYS.
 *
 * Este script deja UN solo índice único sobre `email` y borra los duplicados.
 * Los índices son estructuras de búsqueda: borrarlos NO elimina ninguna fila.
 *
 * Uso:
 *   node scripts/fix-usuarios-indexes.js            -> simulacro, solo informa
 *   node scripts/fix-usuarios-indexes.js --apply    -> aplica los cambios
 */
const sequelize = require("../config/db");

const APPLY = process.argv.includes("--apply");
const TABLA = "Usuarios";

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conectado a ${process.env.DB_NAME}\n`);

    const [filas] = await sequelize.query(`SHOW INDEX FROM \`${TABLA}\``);

    // Agrupamos por nombre de índice: un índice puede abarcar varias columnas
    const indices = new Map();
    for (const f of filas) {
      if (!indices.has(f.Key_name)) {
        indices.set(f.Key_name, { nombre: f.Key_name, unico: f.Non_unique === 0, columnas: [] });
      }
      indices.get(f.Key_name).columnas.push(f.Column_name);
    }

    const total = indices.size;
    // Solo nos interesan los índices únicos que cubren exactamente la columna `email`
    const sobreEmail = [...indices.values()].filter(
      (i) => i.nombre !== "PRIMARY" && i.unico && i.columnas.length === 1 && i.columnas[0] === "email"
    );

    console.log(`Índices totales en \`${TABLA}\`: ${total}  (límite de MySQL: 64)`);
    console.log(`Índices UNIQUE sobre \`email\`: ${sobreEmail.length}\n`);

    if (sobreEmail.length <= 1) {
      console.log("No hay duplicados que limpiar. Nada que hacer.");
      await sequelize.close();
      return;
    }

    // Conservamos el que se llama exactamente "email"; si no existe, el primero
    const conservar = sobreEmail.find((i) => i.nombre === "email") || sobreEmail[0];
    const aBorrar = sobreEmail.filter((i) => i.nombre !== conservar.nombre);

    console.log(`Se conserva:  ${conservar.nombre}`);
    console.log(`Se borrarían: ${aBorrar.length} índices duplicados`);
    console.log(`              ${aBorrar.map((i) => i.nombre).join(", ")}\n`);

    if (!APPLY) {
      console.log("SIMULACRO: no se ha modificado nada.");
      console.log("Para aplicarlo de verdad: node scripts/fix-usuarios-indexes.js --apply");
      await sequelize.close();
      return;
    }

    let ok = 0;
    for (const i of aBorrar) {
      await sequelize.query(`ALTER TABLE \`${TABLA}\` DROP INDEX \`${i.nombre}\``);
      ok++;
      process.stdout.write(`\rBorrados ${ok}/${aBorrar.length}...`);
    }

    const [despues] = await sequelize.query(`SHOW INDEX FROM \`${TABLA}\``);
    const restantes = new Set(despues.map((f) => f.Key_name)).size;
    console.log(`\n\nListo. Índices en \`${TABLA}\`: ${total} -> ${restantes}`);

    const [[{ n }]] = await sequelize.query(`SELECT COUNT(*) AS n FROM \`${TABLA}\``);
    console.log(`Usuarios en la tabla: ${n} (sin cambios)`);

    await sequelize.close();
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
})();
