import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import models, { sequelize } from "./models/index.js";
import Room from "./models/Room.js";

const port = process.env.PORT || 8000;

async function init() {
  try {
    await sequelize.sync({ force: true });
    const rom = await Room.create({
      roomNumber: "101",
      type: "Suite",
      pricePerNight: "10",
      status: "Ocupado",
      capacity: "Ocupado",
      capacity: 1,
      description: null,
    });
    rom.save();
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
}
init();

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
