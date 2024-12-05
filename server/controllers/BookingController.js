import { Op } from "sequelize";
import { models, sequelize } from "../models/index.js";
import IsEqual from "../utils/isEqual.js";
const { Booking, Room, RoomImage, BookingRoom } = models;

const calculateTotalPrice = async (rooms, checkIn, checkOut) => {
  const numOfDays =
    Math.floor(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 3600 * 24) +
    1;
  const totalPrice = rooms.reduce(
    (total, room) => total + room.pricePerNight * numOfDays,
    0
  );
  return totalPrice;
};

const validateBooking = async (
  nAdults,
  nChild,
  checkIn,
  checkOut,
  selectedRooms
) => {
  // Validar si la fecha de checkIn es mayor a checkOut
  if (new Date(checkIn) > new Date(checkOut)) {
    throw new Error(
      "La fecha de entrada no puede ser mayor a la fecha de salida."
    );
  }

  // Validar si el número de niños es mayor o igual a adultos * 2
  if (nChild >= nAdults * 2) {
    throw new Error(
      "El número de niños no puede ser mayor o igual al número de adultos * 2."
    );
  }

  console.log(selectedRooms);

  // Validar si el número total de personas supera la capacidad de las habitaciones seleccionadas
  const totalCapacity = selectedRooms.reduce(
    (total, room) => total + room.capacity,
    0
  );
  console.log(totalCapacity)
  if (nAdults + nChild > totalCapacity) {
    throw new Error(
      "El número total de personas supera la capacidad de las habitaciones seleccionadas."
    );
  }

  // Validar si hay reservas pendientes en las fechas seleccionadas
  const conflictingReservations = await Booking.findAll({
    where: {
      checkIn: { $lte: new Date(checkOut) },
      checkOut: { $gte: new Date(checkIn) },
      status: "pending",
    },
    include: {
      model: Room,
      as: "rooms",
      where: { id: selectedRooms.map((room) => room.id) },
    },
  });

  if (conflictingReservations.length > 0) {
    throw new Error(
      "Hay reservas pendientes para las habitaciones seleccionadas en esas fechas."
    );
  }
};

export default class BookingController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const bookings = await Booking.findAll();
      res.status(200).json(bookings);
    } catch (e) {
      res.status(500).send();
    }
  }
  static async findRooms(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const today = new Date();
      const start = startDate ? new Date(startDate) : today;
      const end = endDate ? new Date(endDate) : today;

      if (start > end) {
        return res.status(400).json({
          error: "Fecha de inicio mayor que la de fin.",
        });
      }

      const adjustedEnd = new Date(end);
      adjustedEnd.setDate(adjustedEnd.getDate() + 1);

      const rooms = await Room.findAll({
        order: [["id", "ASC"]],
        include: {
          model: RoomImage,
          as: "images",
        },
        where: {
          id: {
            [Op.notIn]: sequelize.literal(`
              (
                SELECT DISTINCT "roomId"
                FROM "bookings_rooms" AS br
                JOIN "bookings" AS b
                ON br."bookingId" = b."id"
                WHERE b."checkIn" < '${adjustedEnd.toISOString()}'
                AND b."checkOut" > '${start.toISOString()}'
                AND (
                  (b."checkIn" BETWEEN '${start.toISOString()}' AND '${adjustedEnd.toISOString()}') OR
                  (b."checkOut" BETWEEN '${start.toISOString()}' AND '${adjustedEnd.toISOString()}') OR
                  (b."checkIn" <= '${start.toISOString()}' AND b."checkOut" >= '${adjustedEnd.toISOString()}')
                )
              )
            `),
          },
        },
      });

      res.status(200).json(rooms);
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findOne(req, res) {
    try {
      const id = req.params.id;
      if (!id || isNaN(parseInt(id))) return res.status(400).send();
      const booking = await Booking.findByPk(id);
      if (!booking) return res.status(404).send();
      res.status(200).json(booking);
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async acceptBooking(req, res) {
    try {
      const { id } = req.params;
      const { action } = req.body;
      // Verificar que el usuario esté autenticado
      if (!req.user) {
        return res.status(401).send("No autorizado. Usuario no autenticado.");
      }

      // Verificar que la acción sea válida
      if (action !== "accept" && action !== "reject") {
        console.log(action);
        return res.status(400).send("Acción no válida.");
      }

      // Buscar la reserva
      const booking = await Booking.findOne({
        where: { id: id },
        include: {
          as: "rooms",
          model: Room,
        },
      });

      if (!booking) {
        return res.status(404).send("Reserva no encontrada.");
      }

      // Verificar que la reserva esté asociada al cliente que hace la petición
      if (!booking.clientId === id) {
        return res
          .status(403)
          .send(
            "Acción no permitida. El cliente no tiene acceso a esta reserva."
          );
      }

      // Verificar si la fecha actual es mayor que la fecha de checkOut
      const currentDate = new Date();
      const checkOutDate = new Date(booking.checkOut);
      /* if (currentDate > checkOutDate) {
        return res.status(400).send("La fecha de la reserva ya ha pasado.");
      } */

      // Cambiar el estado de la reserva según la acción
      if (action === "accept") {
        booking.status = "confirmed";
      } else if (action === "reject") {
        booking.status = "rejected";
      }

      // Guardar los cambios
      await booking.save();

      // Responder con la reserva actualizada
      return res.status(200).json(booking);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message || "Error al procesar la acción.");
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    let transaction
    try {
      // Validaciones de autenticación y roles
      if (!req.user) {
        return res.status(401).send("Usuario no autenticado.");
      }

      if (!IsEqual(req.user.role, "client", "recepcionist", "admin")) {
        return res.status(401).send("Acceso no autorizado.");
      }
      console.log(req.body);

      const { nAdults, nChild, checkIn, checkOut, rooms } = req.body;

      // Obtener las habitaciones seleccionadas
      const selectedRooms = await Room.findAll({ where: { id: rooms } });

      if (!selectedRooms || selectedRooms.length === 0) {
        return res
          .status(400)
          .send("No se seleccionaron habitaciones válidas.");
      }

      // Validar las condiciones de la reserva
      await validateBooking(nAdults, nChild, checkIn, checkOut, selectedRooms);

      // Calcular el precio total
      const totalPrice = await calculateTotalPrice(
        selectedRooms,
        checkIn,
        checkOut
      );

      // Crear la reserva
      const bookingData = {
        clientId: req.user.id, // Id del cliente
        employeeId: 2, // Por defecto, empleado con ID 2
        bookingOrigin: req.user.role === "client" ? "web" : "system", // Determinar origen de la reserva
        bookingDate: new Date().toISOString(), // Fecha actual como fecha de reserva
        checkIn,
        checkOut,
        nChild,
        nAdults,
        status: "pending", // Estado inicial
        totalPrice,
      };

      const booking = await Booking.create(bookingData);

      // Asociar las habitaciones a la reserva
      const bookingRooms = selectedRooms.map((room) => ({
        bookingId: booking.id,
        roomId: room.id,
      }));

      await BookingRoom.bulkCreate(bookingRooms); // Insertar las relaciones

      console.log("200");

      // Respuesta exitosa con los datos de la reserva
      return res.status(200).json(booking);
    } catch (e) {
      console.log(e);
      return res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();
      const body = req.body;
      if (!body) return res.status(404).send();
      await Booking.update(body, { where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();
      await Booking.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
