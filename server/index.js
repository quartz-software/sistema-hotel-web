import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import models, { sequelize } from "./models/index.js";
import Room from "./models/Room.js";
import User from "./models/User.js";
import Employee from "./models/Employee.js";
import Client from "./models/Client.js";
import Service from "./models/Service.js";

const port = process.env.PORT || 8000;

async function init() {
  try {
    await sequelize.sync({ force: true });
    const adminUser = await User.create({
      email: "admin@admin.com",
      password: "Admin123!",
      role: "employee",
      firstname: "Ad",
      lastname1: "min",
    });
    const adminEmployee = await Employee.create({
      role: "admin",
      status: "active",
      hireDate: "2024-11-20T15:30:00.000Z",
      userId: adminUser.id,
    });
    const recepcionistUser = await User.create({
      email: "recep@recep.com",
      password: "Recep123!",
      role: "employee",
      firstname: "Clean",
      lastname1: "ning",
    });
    const recepcionistEmployee = await Employee.create({
      role: "recepcionist",
      status: "inactive",
      hireDate: "2024-11-20T15:30:00.000Z",
      userId: recepcionistUser.id,
    });
    const cleaningUser = await User.create({
      email: "clean@clean.com",
      password: "Clean123!",
      role: "employee",
      firstname: "Clean",
      lastname1: "ning",
    });
    const cleaningEmployee = await Employee.create({
      role: "cleaning",
      status: "inactive",
      hireDate: "2024-11-20T15:30:00.000Z",
      userId: cleaningUser.id,
    });
    const maintananceUser = await User.create({
      email: "maint@maint.com",
      password: "Maint123!",
      role: "employee",
      firstname: "Mainta",
      lastname1: "nance",
    });
    const mantainanceEmployee = await Employee.create({
      role: "maintanance",
      status: "active",
      hireDate: "2024-11-20T15:30:00.000Z",
      userId: maintananceUser.id,
    });
    const clientUser = await User.create({
      email: "client@client.com",
      password: "Client123!",
      role: "client",
      firstname: "Cli",
      lastname1: "ent",
    });
    const clientClient = await Client.create({
      userId: clientUser.id,
    });

    await Room.bulkCreate([
      {
        roomNumber: 101,
        type: "normal",
        pricePerNight: 100.99,
        status: "available",
        capacity: 1,
        description: "Habitación normal con una cama individual y comodidades básicas."
      },
      {
        roomNumber: 102,
        type: "suite",
        pricePerNight: 299.99,
        status: "occupied",
        capacity: 4,
        description: "Suite de lujo con dos habitaciones, sala de estar y jacuzzi."
      },
      {
        roomNumber: 103,
        type: "premium",
        pricePerNight: 199.99,
        status: "maintainance",
        capacity: 2,
        description: "Habitación premium con balcón y vistas al mar."
      },
      {
        roomNumber: 104,
        type: "normal",
        pricePerNight: 120.50,
        status: "cleaning",
        capacity: 2,
        description: "Habitación normal con dos camas individuales."
      },
      {
        roomNumber: 105,
        type: "suite",
        pricePerNight: 349.00,
        status: "available",
        capacity: 6,
        description: "Suite presidencial con comedor privado y acceso VIP."
      },
      {
        roomNumber: 106,
        type: "normal",
        pricePerNight: 110.00,
        status: "available",
        capacity: 1,
        description: "Habitación económica con acceso a internet y televisión por cable."
      },
      {
        roomNumber: 107,
        type: "premium",
        pricePerNight: 180.75,
        status: "occupied",
        capacity: 3,
        description: "Habitación premium con cama king size y minibar incluido."
      },
      {
        roomNumber: 108,
        type: "suite",
        pricePerNight: 275.50,
        status: "cleaning",
        capacity: 5,
        description: "Suite familiar con cocina pequeña y dos baños."
      }
    ]);

    await Service.bulkCreate([
      {
        name: "Room Service",
        description: "Servicio a la habitación disponible las 24 horas.",
        restrictions: "Ninguna",
        type: "room service",
        currency: "usd",
        price: 25.0,
        openHour: "00:00:00",
        closeHour: "23:59:59",
        available: true, // Disponible
      },
      {
        name: "Cleaning",
        description: "Servicio de limpieza diario de habitaciones.",
        restrictions: "Servicio limitado a horas del día.",
        type: "cleaning",
        currency: "usd",
        price: 15.0,
        openHour: "08:00:00",
        closeHour: "18:00:00",
        available: true, // Disponible
      },
      {
        name: "Wellness Spa",
        description: "Masajes y tratamientos de bienestar.",
        restrictions: "Se requiere cita previa.",
        type: "wellness",
        currency: "usd",
        price: 50.0,
        openHour: "10:00:00",
        closeHour: "20:00:00",
        available: true, // Disponible
      },
      {
        name: "Transport",
        description: "Servicio de transporte a aeropuertos y destinos locales.",
        restrictions: "Solo dentro de la ciudad.",
        type: "transport",
        currency: "usd",
        price: 30.0,
        openHour: "06:00:00",
        closeHour: "22:00:00",
        available: false, // No disponible
      },
      {
        name: "Late Check-out",
        description: "Posibilidad de salida más tarde de lo habitual.",
        restrictions: "Sujeto a disponibilidad.",
        type: "other",
        currency: "usd",
        price: 20.0,
        openHour: "00:00:00",
        closeHour: "23:59:59",
        available: false, // No disponible
      },
    ]);
  } catch (error) {
    console.error("Error al sincronizar:", error);
  }
}
init();

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
