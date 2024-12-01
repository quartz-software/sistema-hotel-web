import { models } from "../models/index.js";
const { RoomAvailability } = models;

export default class RoomAvailabilityController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const roomAvailabilities = await RoomAvailability.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(roomAvailabilities);
    } catch (e) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findOne(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();

      const roomAvailability = await RoomAvailability.findByPk(id);
      if (!roomAvailability) return res.status(404).send();

      res.status(200).json(roomAvailability);
    } catch (e) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    try {
      const body = req.body;
      const roomAvailability = await RoomAvailability.create(body);
      res.status(201).json(roomAvailability);
    } catch (e) {
      res.status(500).send();
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();

      const body = req.body;
      if (!body) return res.status(404).send();

      await RoomAvailability.update(body, { where: { id } });
      res.status(200).send();
    } catch (e) {
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

      await RoomAvailability.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
