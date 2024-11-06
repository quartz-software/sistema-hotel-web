import RoomAvailability from "../models/RoomAvailability.js";

export default class RoomAvailabilityController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const roomAvailabilities = await RoomAvailability.findAll();
      res.status(200).json(roomAvailabilities);
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
      const roomAvailability = await RoomAvailability.findByPk(id);
      if (roomAvailability) {
        res.status(200).json(roomAvailability);
      } else {
        res.status(404).json({ message: "Room availability not found" });
      }
    } catch (error) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    try {
      const newRoomAvailability = await RoomAvailability.create(req.body);
      res.status(201).json(newRoomAvailability);
    } catch (error) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await RoomAvailability.update(req.body, { where: { id } });
      if (updated) {
        const updatedRoomAvailability = await RoomAvailability.findByPk(id);
        res.status(200).json(updatedRoomAvailability);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();
      await Room.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
