import { models, sequelize } from "../models/index.js";
const { RoomRate } = models;
import { Op } from "sequelize";
import RoomRoomRate from "../models/RoomRoomRate.js";

export default class RoomRateController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const roomRates = await RoomRate.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(roomRates);
    } catch (error) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send();
      }

      const roomRate = await models.RoomRate.findByPk(id, {
        include: {
          model: models.Room,
          as: "rooms",
          //attributes: [],
          through: { attributes: [] }
        }
      });
      if (roomRate) {
        res.status(200).json(roomRate);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      console.log(error);

      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    let transaction
    try {
      transaction = await sequelize.transaction();

      const { startDate, endDate, pricePerNight, isActive, rooms } = req.body;

      if (!Array.isArray(rooms) || rooms.some(room => !room.id)) {
        return res.status(400).send();
      }

      const newRoomRate = await RoomRate.create(
        { startDate, endDate, pricePerNight, isActive }
      );
      const roomRateId = newRoomRate.id

      const roomRoomRates = rooms.map(room => ({
        roomId: room.id,
        roomRateId: roomRateId
      }))
      await RoomRoomRate.bulkCreate(roomRoomRates, { transaction })

      await transaction.commit()
      res.status(201).json(newRoomRate);
    } catch (error) {
      if (transaction) await transaction.rollback();
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    let transaction
    try {
      transaction = await sequelize.transaction(); // Inicia una transacción
      const { id } = req.params;

      if (!id) {
        return res.status(400).send();
      }

      const { startDate, endDate, pricePerNight, isActive, rooms } = req.body;

      if (!Array.isArray(rooms) || rooms.some(room => !room.id)) {
        return res.status(400).send();
      }

      await RoomRate.update(
        { startDate, endDate, pricePerNight, isActive },
        { where: { id }, transaction }
      );

      await RoomRoomRate.destroy({ where: { roomRateId: id }, transaction });

      const roomRelations = rooms.map(room => ({
        roomId: room.id,
        roomRateId: id
      }));
      await RoomRoomRate.bulkCreate(roomRelations, { transaction });

      await transaction.commit();

      res.status(200).send({});
    } catch (error) {
      if (transaction) await transaction.rollback();
      res.status(500).send();
    }
  }


  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send();
      }

      const deleted = await RoomRate.destroy({ where: { id } });

      if (deleted) {
        res.status(200).send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  }
}
