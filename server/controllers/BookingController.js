import BookingRoom from "../models/BookingRoom.js";
import { models, sequelize } from "../models/index.js";
import Room from "../models/Room.js";
const { Booking } = models;

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
  static async create(req, res) {
    let transaction
    try {
      transaction = await sequelize.transaction();
      console.log(req.body);


      const {
        nAdults,
        nChild,
        bookingDate,
        checkIn,
        checkOut,
        status,
        totalPrice,
        bookingOrigin,
        employeeId,
        clientId,
        rooms,
      } = req.body;

      if (!Array.isArray(rooms)) {
        return res.status(400).send();
      }
      const newBooking = await Booking.create({
        nAdults,
        nChild,
        bookingDate,
        checkIn,
        checkOut,
        status,
        totalPrice,
        bookingOrigin,
        employeeId,
        clientId,
      });
      const roomBookingId = newBooking.id
      const RoomBookings = rooms.map(room => ({
        bookingId: roomBookingId,
        roomId: room,
      }));
      await BookingRoom.bulkCreate(RoomBookings, { transaction })
      transaction.commit()
      res.status(201).json(newBooking);
    } catch (e) {
      console.log(e);

      res.status(500).send();
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
