import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import sequelize from "./config/db.js";
import Room from "./models/Room.js";

const port = process.env.PORT || 8000;

async function init() {
  try {
    await sequelize.sync({ force: true });
    await Room.create({
      numeroHabitacion: "102",
      tipo: "Deluxe",
      precioPorNoche: 120,
      estado: "ocupada",
      capacidad: 3,
      descripcion: "Habitación deluxe con vista al mar para 3 personas",
    });

    await Room.create({
      numeroHabitacion: "103",
      tipo: "Suite",
      precioPorNoche: 200,
      estado: "disponible",
      capacidad: 4,
      descripcion: "Suite de lujo con dos dormitorios y sala de estar",
    });

    await Room.create({
      numeroHabitacion: "104",
      tipo: "Standard",
      precioPorNoche: 80,
      estado: "mantenimiento",
      capacidad: 2,
      descripcion: "Habitación estándar con baño privado y aire acondicionado",
    });

    await Room.create({
      numeroHabitacion: "105",
      tipo: "Premium",
      precioPorNoche: 150,
      estado: "disponible",
      capacidad: 3,
      descripcion: "Habitación premium con jacuzzi y vista a la ciudad",
    });

    await Room.create({
      numeroHabitacion: "106",
      tipo: "Standard",
      precioPorNoche: 75,
      estado: "ocupada",
      capacidad: 2,
      descripcion: "Habitación estándar con balcón y desayuno incluido",
    });
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
}
init();

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
