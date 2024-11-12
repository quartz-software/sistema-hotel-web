import RoomRate from "../models/RoomRate.js";
import { Op } from "sequelize";

export default class RoomRateController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const roomRates = await RoomRate.findAll();
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

      const roomRate = await RoomRate.findByPk(id);
      if (roomRate) {
        res.status(200).json(roomRate);
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
  static async create(req, res) {
    try {
      const body = req.body;

      if (!body) {
        return res.status(400).send();
      }

      const newRoomRate = await RoomRate.create(body);
      res.status(201).json(newRoomRate);
    } catch (error) {
      console.log(error);
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
      const body = req.body;

      if (!id || !body) {
        return res.status(400).send();
      }

      await RoomRate.update(body, { where: { id } });
      res.status(200).send();
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
