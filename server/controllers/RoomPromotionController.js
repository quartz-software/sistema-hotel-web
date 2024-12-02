import { models, sequelize } from "../models/index.js";
import RoomRoomPromotion from "../models/RoomRoomPromotion.js";
const { RoomPromotion } = models;

export default class RoomPromotionController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const room_promotions = await RoomPromotion.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(room_promotions);
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
      const { id } = req.params;
      if (!id) return res.status(400).send();

      const roomPromotion = await models.RoomPromotion.findByPk(id, {
        include: {
          model: models.Room,
          as: "rooms",
          through: { attributes: [] }
        }
      });
      if (!roomPromotion) return res.status(404).send();

      res.status(200).json(roomPromotion);
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

      const { description, startDate, endDate, discount, status, rooms } = req.body;

      if (!Array.isArray(rooms) || rooms.some(room => !room.id)) {
        return res.status(400).send();
      }

      const new_room_promotion = await RoomPromotion.create(
        { description, startDate, endDate, discount, status }
      );

      const roomPromotionId = new_room_promotion.id;
      const roomRoomPromotions = rooms.map(room => ({
        roomId: room.id,
        roomPromotionId: roomPromotionId
      }));
      await RoomRoomPromotion.bulkCreate(roomRoomPromotions, { transaction })

      transaction.commit();

      res.status(201).json(new_room_promotion);
    } catch (e) {
      if (transaction) await transaction.rollback();
      res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    let transaction
    try {
      transaction = await sequelize.transaction();
      const { id } = req.params;
      if (!id) return res.status(400).send();
      const { description, startDate, endDate, discount, status, rooms } = req.body;
      if (!Array.isArray(rooms) || rooms.some(room => !room.id)) {
        return res.status(400).send();
      };
      await RoomPromotion.update(
        { description, startDate, endDate, discount, status },
        { where: { id } });
      await RoomRoomPromotion.destroy({ where: { roomPromotionId: id } })

      const roomsPromotions = rooms.map(room => ({
        roomId: room.id,
        roomPromotionId: id
      }))
      await RoomRoomPromotion.bulkCreate(roomsPromotions, { transaction });
      await transaction.commit();
      res.status(200).send();
    } catch (e) {
      if (transaction) await transaction.rollback();
      res.status(500).send();
      console.log(e);

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
      await RoomPromotion.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
