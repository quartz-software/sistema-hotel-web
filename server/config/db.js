import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_ENGINE,
    host: process.env.DB_HOST,
    ssl: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos con éxito.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
})();
export default sequelize;
