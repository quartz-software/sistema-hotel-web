import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import sequelize from "./config/db.js";
import Room from "./models/Room.js";

const port = process.env.PORT || 8000;

async function init() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
}
init();

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
