import Room from "../models/Room.js";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Client from "../models/Client.js";
import Service from "../models/Service.js";
import RoomImage from "../models/RoomImage.js";
import { sequelize } from "../models/index.js";
import Booking from "../models/Booking.js";
import BookingRoom from "../models/BookingRoom.js";
import ServiceRoom from "../models/ServiceRoom.js";
import AdditionalService from "../models/AdditionalService.js";
import Task from "../models/Task.js";

export default class Seeder {
  static async Seed() {
    try {
      await sequelize.sync({ force: true });
      await this.SeedEmployees();
      await this.SeedClients();
      await this.SeedRooms();
      await this.SeedServices();
      await this.SeedBookings();
      await this.SeedAdditionalServices();
    } catch (error) {}
  }
  static async SeedEmployees() {
    const usersAndEmployees = [
      {
        user: {
          email: "admin@admin.com",
          password: "Admin123!",
          role: "employee",
          firstname: "Ad",
          lastname1: "min",
        },
        employee: {
          role: "admin",
          status: "active",
          hireDate: "2024-11-20T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "recep@recep.com",
          password: "Recep123!",
          role: "employee",
          firstname: "Clean",
          lastname1: "ning",
        },
        employee: {
          role: "recepcionist",
          status: "inactive",
          hireDate: "2024-11-20T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "clean@clean.com",
          password: "Clean123!",
          role: "employee",
          firstname: "Clean",
          lastname1: "ning",
        },
        employee: {
          role: "cleaning",
          status: "active",
          hireDate: "2024-11-20T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "maint@maint.com",
          password: "Maint123!",
          role: "employee",
          firstname: "Mainta",
          lastname1: "nance",
        },
        employee: {
          role: "maintanance",
          status: "active",
          hireDate: "2024-11-20T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "cleaning1@company.com",
          password: "Clean123!1",
          role: "employee",
          firstname: "Cleaner1",
          lastname1: "Lastname1",
        },
        employee: {
          role: "cleaning",
          status: "active",
          hireDate: "2024-11-20T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "cleaning2@company.com",
          password: "Clean123!2",
          role: "employee",
          firstname: "Cleaner2",
          lastname1: "Lastname2",
        },
        employee: {
          role: "cleaning",
          status: "active",
          hireDate: "2024-11-21T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "maintanance1@company.com",
          password: "Maint123!1",
          role: "employee",
          firstname: "Maintainer1",
          lastname1: "Lastname1",
        },
        employee: {
          role: "maintanance",
          status: "active",
          hireDate: "2024-11-22T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "maintanance2@company.com",
          password: "Maint123!2",
          role: "employee",
          firstname: "Maintainer2",
          lastname1: "Lastname2",
        },
        employee: {
          role: "maintanance",
          status: "active",
          hireDate: "2024-11-23T15:30:00.000Z",
        },
      },
      {
        user: {
          email: "recepcionist@company.com",
          password: "Recep123!",
          role: "employee",
          firstname: "Reception",
          lastname1: "Lastname",
        },
        employee: {
          role: "recepcionist",
          status: "active",
          hireDate: "2024-11-24T15:30:00.000Z",
        },
      },
    ];
    for (const entry of usersAndEmployees) {
      const createdUser = await User.create(entry.user);
      await Employee.create({
        ...entry.employee,
        userId: createdUser.id,
      });
    }
  }
  static async SeedClients() {
    const usersAndClients = [
      {
        user: {
          email: "client1@example.com",
          password: "Client1Pass!",
          role: "client",
          dni: "12345678A",
          documentType: "DNI",
          firstname: "Carlos",
          middlename: "Luis",
          lastname1: "González",
          lastname2: "Martínez",
          phone: "123456789",
          address: "Calle Falsa 123",
        },
        client: {
          country: "Spain",
        },
      },
      {
        user: {
          email: "client2@example.com",
          password: "Client2Pass!",
          role: "client",
          dni: "87654321B",
          documentType: "Passport",
          firstname: "Ana",
          middlename: "María",
          lastname1: "López",
          lastname2: "Hernández",
          phone: "987654321",
          address: "Av. Siempre Viva 742",
        },
        client: {
          country: "Mexico",
        },
      },
    ];

    for (let i = 3; i <= 20; i++) {
      usersAndClients.push({
        user: {
          email: `client${i}@example.com`,
          password: `Client${i}Pass!`,
          role: "client",
          dni: `0000000${i}C`,
          documentType: i % 2 === 0 ? "DNI" : "Passport",
          firstname: `Firstname${i}`,
          middlename: i % 2 === 0 ? `Middlename${i}` : null,
          lastname1: `Lastname1-${i}`,
          lastname2: i % 2 === 0 ? `Lastname2-${i}` : null,
          phone: `60000000${i}`,
          address: `Address Line ${i}`,
        },
        client: {
          country: i % 3 === 0 ? "USA" : i % 2 === 0 ? "Canada" : "Brazil",
        },
      });
    }
    for (const entry of usersAndClients) {
      const createdUser = await User.create(entry.user);
      await Client.create({
        ...entry.client,
        userId: createdUser.id,
      });
    }
  }
  static async SeedRooms() {
    const rooms = [
      {
        roomNumber: "101",
        type: "suite",
        pricePerNight: 250.0,
        status: "available",
        capacity: 2,
        description: "Suite de lujo con vista al mar y jacuzzi privado.",
      },
      {
        roomNumber: "102",
        type: "normal",
        pricePerNight: 100.0,
        status: "available",
        capacity: 2,
        description: "Habitación estándar con cama matrimonial y baño privado.",
      },
      {
        roomNumber: "103",
        type: "premium",
        pricePerNight: 180.0,
        status: "occupied",
        capacity: 3,
        description: "Habitación premium con balcón privado y minibar.",
      },
      {
        roomNumber: "104",
        type: "suite",
        pricePerNight: 300.0,
        status: "maintenance",
        capacity: 4,
        description: "Suite con dos habitaciones, sala de estar y cocina.",
      },
      {
        roomNumber: "105",
        type: "normal",
        pricePerNight: 90.0,
        status: "cleaning",
        capacity: 1,
        description: "Habitación pequeña para una persona, económica y cómoda.",
      },
      {
        roomNumber: "106",
        type: "suite",
        pricePerNight: 270.0,
        status: "available",
        capacity: 2,
        description: "Suite con terraza y acceso directo a la piscina.",
      },
      {
        roomNumber: "107",
        type: "premium",
        pricePerNight: 200.0,
        status: "unavailable",
        capacity: 2,
        description: "Habitación premium en remodelación con vistas al jardín.",
      },
      {
        roomNumber: "108",
        type: "normal",
        pricePerNight: 110.0,
        status: "available",
        capacity: 2,
        description: "Habitación estándar con decoración moderna.",
      },
      {
        roomNumber: "109",
        type: "suite",
        pricePerNight: 350.0,
        status: "occupied",
        capacity: 5,
        description: "Suite familiar con tres habitaciones y sala de juegos.",
      },
      {
        roomNumber: "110",
        type: "normal",
        pricePerNight: 80.0,
        status: "cleaning",
        capacity: 1,
        description: "Habitación económica con baño compartido.",
      },
      {
        roomNumber: "111",
        type: "premium",
        pricePerNight: 190.0,
        status: "available",
        capacity: 3,
        description: "Habitación premium con cama king y servicio de desayuno.",
      },
      {
        roomNumber: "112",
        type: "suite",
        pricePerNight: 400.0,
        status: "unavailable",
        capacity: 4,
        description: "Suite presidencial con salón de reuniones.",
      },
      {
        roomNumber: "113",
        type: "normal",
        pricePerNight: 95.0,
        status: "available",
        capacity: 2,
        description: "Habitación estándar con escritorio y buena iluminación.",
      },
      {
        roomNumber: "114",
        type: "premium",
        pricePerNight: 210.0,
        status: "maintenance",
        capacity: 3,
        description:
          "Habitación premium en remodelación, con spa en la habitación.",
      },
      {
        roomNumber: "115",
        type: "suite",
        pricePerNight: 320.0,
        status: "occupied",
        capacity: 4,
        description:
          "Suite deluxe con comedor y cocina completamente equipada.",
      },
    ];
    await Room.bulkCreate(rooms);
  }
  static async SeedServices() {
    const servicesData = [
      {
        name: "Room Cleaning",
        description: "Daily cleaning of your room with high-quality products.",
        restrictions: "Available only for hotel rooms.",
        type: "cleaning",
        currency: "usd",
        price: 15.99,
        openHour: "08:00:00",
        closeHour: "18:00:00",
        available: true,
      },
      {
        name: "Airport Pickup",
        description:
          "Comfortable and safe transportation from the airport to the hotel.",
        restrictions: "Available for arrivals between 06:00 and 22:00.",
        type: "transport",
        currency: "usd",
        price: 30.0,
        openHour: "06:00:00",
        closeHour: "22:00:00",
        available: true,
      },
      {
        name: "Spa Session",
        description: "Relaxing spa services with massage and aromatherapy.",
        restrictions: "Reservation required.",
        type: "wellness",
        currency: "usd",
        price: 50.0,
        openHour: "09:00:00",
        closeHour: "20:00:00",
        available: true,
      },
      {
        name: "Laundry Service",
        description:
          "Quick and efficient laundry services for your convenience.",
        restrictions: "Maximum 5 kg per service.",
        type: "room service",
        currency: "usd",
        price: 10.0,
        openHour: "09:00:00",
        closeHour: "17:00:00",
        available: true,
      },
      {
        name: "Gym Access",
        description: "Access to our fully equipped gym.",
        restrictions: "Guests only.",
        type: "wellness",
        currency: "usd",
        price: 5.0,
        openHour: "06:00:00",
        closeHour: "22:00:00",
        available: true,
      },
      {
        name: "Breakfast Buffet",
        description: "Delicious buffet with a variety of dishes.",
        restrictions: "Available from 07:00 to 10:00 only.",
        type: "room service",
        currency: "usd",
        price: 12.0,
        openHour: "07:00:00",
        closeHour: "10:00:00",
        available: true,
      },
      {
        name: "Car Rental",
        description: "Reliable cars available for rent.",
        restrictions: "Driver's license required.",
        type: "transport",
        currency: "usd",
        price: 40.0,
        openHour: "08:00:00",
        closeHour: "18:00:00",
        available: false,
      },
      {
        name: "Yoga Class",
        description: "Group yoga sessions for relaxation and fitness.",
        restrictions: "Bring your own mat.",
        type: "wellness",
        currency: "usd",
        price: 20.0,
        openHour: "08:00:00",
        closeHour: "10:00:00",
        available: true,
      },
      {
        name: "City Tour",
        description: "Guided city tour to discover local attractions.",
        restrictions: "Minimum 4 participants required.",
        type: "transport",
        currency: "usd",
        price: 25.0,
        openHour: "09:00:00",
        closeHour: "17:00:00",
        available: true,
      },
      {
        name: "Private Dinner",
        description: "Exclusive private dinner with a chef.",
        restrictions: "Reservation required 24 hours in advance.",
        type: "room service",
        currency: "usd",
        price: 100.0,
        openHour: "19:00:00",
        closeHour: "22:00:00",
        available: false,
      },
    ];
    await Service.bulkCreate(servicesData);

    const servicesRooms = [
      {
        roomId: 1,
        serviceId: 1,
      },
      {
        roomId: 1,
        serviceId: 3,
      },
      {
        roomId: 1,
        serviceId: 2,
      },
      {
        roomId: 3,
        serviceId: 1,
      },
    ];
    await ServiceRoom.bulkCreate(servicesRooms);
  }
  static async SeedBookings() {
    const bookings = [
      {
        nAdults: 2,
        nChild: 0,
        bookingDate: "2024-11-01",
        checkIn: "2024-11-05",
        checkOut: "2024-11-10",
        status: "pending",
        totalPrice: 500.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 1,
      },
      {
        nAdults: 1,
        nChild: 1,
        bookingDate: "2024-11-02",
        checkIn: "2024-11-07",
        checkOut: "2024-11-09",
        status: "pending",
        totalPrice: 300.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 2,
      },
      {
        nAdults: 3,
        nChild: 0,
        bookingDate: "2024-11-03",
        checkIn: "2024-11-08",
        checkOut: "2024-11-13",
        status: "pending",
        totalPrice: 650.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 3,
      },
      {
        nAdults: 1,
        nChild: 2,
        bookingDate: "2024-11-04",
        checkIn: "2024-11-09",
        checkOut: "2024-11-11",
        status: "pending",
        totalPrice: 400.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 4,
      },
      {
        nAdults: 2,
        nChild: 1,
        bookingDate: "2024-11-05",
        checkIn: "2024-11-10",
        checkOut: "2024-11-12",
        status: "pending",
        totalPrice: 550.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 5,
      },
      {
        nAdults: 4,
        nChild: 0,
        bookingDate: "2024-11-06",
        checkIn: "2024-11-11",
        checkOut: "2024-11-14",
        status: "pending",
        totalPrice: 700.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 6,
      },
      {
        nAdults: 2,
        nChild: 0,
        bookingDate: "2024-11-07",
        checkIn: "2024-11-12",
        checkOut: "2024-11-14",
        status: "pending",
        totalPrice: 450.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 7,
      },
      {
        nAdults: 1,
        nChild: 1,
        bookingDate: "2024-11-08",
        checkIn: "2024-11-13",
        checkOut: "2024-11-15",
        status: "pending",
        totalPrice: 350.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 8,
      },
      {
        nAdults: 3,
        nChild: 1,
        bookingDate: "2024-11-09",
        checkIn: "2024-11-14",
        checkOut: "2024-11-19",
        status: "pending",
        totalPrice: 800.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 9,
      },
      {
        nAdults: 2,
        nChild: 0,
        bookingDate: "2024-11-10",
        checkIn: "2024-11-15",
        checkOut: "2024-11-18",
        status: "pending",
        totalPrice: 600.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 10,
      },
      {
        nAdults: 1,
        nChild: 0,
        bookingDate: "2024-11-11",
        checkIn: "2024-11-16",
        checkOut: "2024-11-18",
        status: "pending",
        totalPrice: 320.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 11,
      },
      {
        nAdults: 3,
        nChild: 1,
        bookingDate: "2024-11-12",
        checkIn: "2024-11-17",
        checkOut: "2024-11-22",
        status: "pending",
        totalPrice: 750.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 12,
      },
      {
        nAdults: 2,
        nChild: 0,
        bookingDate: "2024-11-13",
        checkIn: "2024-11-18",
        checkOut: "2024-11-20",
        status: "pending",
        totalPrice: 480.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 13,
      },
      {
        nAdults: 1,
        nChild: 2,
        bookingDate: "2024-11-14",
        checkIn: "2024-11-19",
        checkOut: "2024-11-21",
        status: "pending",
        totalPrice: 430.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 14,
      },
      {
        nAdults: 4,
        nChild: 0,
        bookingDate: "2024-11-15",
        checkIn: "2024-11-20",
        checkOut: "2024-11-23",
        status: "pending",
        totalPrice: 720.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 15,
      },
      {
        nAdults: 2,
        nChild: 1,
        bookingDate: "2024-11-16",
        checkIn: "2024-11-21",
        checkOut: "2024-11-23",
        status: "pending",
        totalPrice: 500.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 16,
      },
      {
        nAdults: 2,
        nChild: 0,
        bookingDate: "2024-11-17",
        checkIn: "2024-11-22",
        checkOut: "2024-11-24",
        status: "pending",
        totalPrice: 560.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 17,
      },
      {
        nAdults: 1,
        nChild: 0,
        bookingDate: "2024-11-18",
        checkIn: "2024-11-23",
        checkOut: "2024-11-25",
        status: "pending",
        totalPrice: 320.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 18,
      },
      {
        nAdults: 3,
        nChild: 2,
        bookingDate: "2024-11-19",
        checkIn: "2024-11-24",
        checkOut: "2024-11-29",
        status: "pending",
        totalPrice: 950.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 19,
      },
      {
        nAdults: 4,
        nChild: 0,
        bookingDate: "2024-11-20",
        checkIn: "2024-11-25",
        checkOut: "2024-11-28",
        status: "pending",
        totalPrice: 1100.0,
        bookingOrigin: "online",
        employeeId: 9,
        clientId: 20,
      },
    ];

    await Booking.bulkCreate(bookings);

    const bookingRooms = [
      { bookingId: 1, roomId: 1 },
      { bookingId: 2, roomId: 2 },
      { bookingId: 3, roomId: 3 },
      { bookingId: 4, roomId: 4 },
      { bookingId: 5, roomId: 5 },
      { bookingId: 6, roomId: 6 },
      { bookingId: 7, roomId: 7 },
      { bookingId: 8, roomId: 8 },
      { bookingId: 9, roomId: 9 },
      { bookingId: 10, roomId: 10 },
      { bookingId: 11, roomId: 11 },
      { bookingId: 12, roomId: 12 },
      { bookingId: 13, roomId: 13 },
      { bookingId: 14, roomId: 14 },
      { bookingId: 15, roomId: 15 },
      // Reservación 16: Asocia dos habitaciones
      { bookingId: 16, roomId: 1 },
      { bookingId: 16, roomId: 2 },
      // Reservación 17: Asocia dos habitaciones
      { bookingId: 17, roomId: 3 },
      { bookingId: 17, roomId: 4 },
      // Reservación 18: Asocia dos habitaciones
      { bookingId: 18, roomId: 5 },
      { bookingId: 18, roomId: 6 },
      // Reservación 19: Asocia dos habitaciones
      { bookingId: 19, roomId: 7 },
      { bookingId: 19, roomId: 8 },
      // Reservación 20: Asocia dos habitaciones
      { bookingId: 20, roomId: 9 },
      { bookingId: 20, roomId: 10 },
    ];
    BookingRoom.bulkCreate(bookingRooms);
  }
  static async SeedAdditionalServices() {
    const additionalServiceRequests = [
      // Solicitud 1: Room Cleaning
      {
        date: "2024-11-01",
        status: "pending", // Estado pendiente
        description: "Requested daily cleaning of the room.",
        serviceId: 1, // Room Cleaning
        bookingId: 1, // Booking 1
        roomId: 1, // Room 1
      },

      // Solicitud 2: Airport Pickup
      {
        date: "2024-11-01",
        status: "accepted", // Estado aceptado
        description: "Airport pickup for a smooth arrival.",
        serviceId: 2, // Airport Pickup
        bookingId: 2, // Booking 2
        roomId: 2, // Room 2
      },

      // Solicitud 3: Laundry Service
      {
        date: "2024-11-02",
        status: "in_progress", // Estado en progreso
        description: "Laundry service for a fresh set of clothes.",
        serviceId: 4, // Laundry Service
        bookingId: 3, // Booking 3
        roomId: 3, // Room 3
      },

      // Solicitud 4: Gym Access
      {
        date: "2024-11-02",
        status: "accepted", // Estado aceptado
        description: "Access to gym for a morning workout.",
        serviceId: 5, // Gym Access
        bookingId: 4, // Booking 4
        roomId: 4, // Room 4
      },

      // Solicitud 5: Breakfast Buffet
      {
        date: "2024-11-03",
        status: "pending", // Estado pendiente
        description: "Request for breakfast buffet service.",
        serviceId: 6, // Breakfast Buffet
        bookingId: 5, // Booking 5
        roomId: 5, // Room 5
      },

      // Solicitud 6: Car Rental
      {
        date: "2024-11-03",
        status: "completed", // Estado completado
        description: "Car rental for a day trip around the city.",
        serviceId: 7, // Car Rental
        bookingId: 6, // Booking 6
        roomId: 6, // Room 6
      },

      // Solicitud 7: Yoga Class
      {
        date: "2024-11-04",
        status: "in_progress", // Estado en progreso
        description: "Yoga class for morning relaxation.",
        serviceId: 8, // Yoga Class
        bookingId: 7, // Booking 7
        roomId: 7, // Room 7
      },

      // Solicitud 8: City Tour
      {
        date: "2024-11-04",
        status: "pending", // Estado pendiente
        description: "City tour to explore local attractions.",
        serviceId: 9, // City Tour
        bookingId: 8, // Booking 8
        roomId: 8, // Room 8
      },
    ];
    await AdditionalService.bulkCreate(additionalServiceRequests);
    const tasks = [
      // Solicitud 2: Airport Pickup (estado "aceptado", tarea "pending")
      {
        status: "pending", // Estado pendiente
        description: "Airport pickup for a smooth arrival.",
        employeeId: 3, // Clean ning (Limpieza)
        additionalServiceId: 2, // Airport Pickup service id
      },

      // Solicitud 3: Laundry Service (estado "en progreso", tarea "in_progress")
      {
        status: "in_progress", // Estado en progreso
        description: "Laundry service for a fresh set of clothes.",
        employeeId: 4, // Mainta nance (Mantenimiento)
        additionalServiceId: 3, // Laundry Service service id
      },

      // Solicitud 4: Gym Access (estado "aceptado", tarea "pending")
      {
        status: "pending", // Estado pendiente
        description: "Access to gym for a morning workout.",
        employeeId: 5, // Cleaner1 (Limpieza)
        additionalServiceId: 4, // Gym Access service id
      },

      // Solicitud 6: Car Rental (estado "completado", tarea "completed")
      {
        status: "completed", // Estado completado
        description: "Car rental for a day trip around the city.",
        employeeId: 8, // Maintainer2 (Mantenimiento)
        additionalServiceId: 6, // Car Rental service id
      },

      // Solicitud 7: Yoga Class (estado "en progreso", tarea "in_progress")
      {
        status: "in_progress", // Estado en progreso
        description: "Yoga class for morning relaxation.",
        employeeId: 3, // Clean ning (Limpieza)
        additionalServiceId: 7, // Yoga Class service id
      },
    ];

    await Task.bulkCreate(tasks);
  }
}

Seeder.Seed();
