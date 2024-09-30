import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import sequelize from "./config/db.js";

const port = process.env.PORT || 8000;

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
})();

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
