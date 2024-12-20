import { models } from "../models/index.js";
const { Stock } = models;

export default class StockController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const stock = await Stock.findAll({ order: [["id", "ASC"]] });
      res.status(200).send(stock);
    } catch (e) {
      res.status(500).send();
      console.log(e);
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
      if (!id) return res.status(400).send();

      const item = await Stock.findByPk(id);
      if (!item) return res.status(404).send();

      res.status(200).json(item);
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
    try {
      if (!user || !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }

      const { name, quantity, price, category, supplyDate } = req.body;
      const stock = await Stock.create({
        name,
        quantity,
        price,
        category,
        supplyDate,
      });
      res.status(201).json(stock);
    } catch (e) {
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
      if (!user || isEqual(user.role, "client")) {
        return res.status(403).json();
      }
      const id = req.params.id;
      if (!id || !req.body) return res.status(400).send();
      const { name, quantity, price, category, supplyDate } = req.body;
      await Stock.update(
        { name, quantity, price, category, supplyDate },
        { where: { id } }
      );
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
      if (!user || !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }
      const id = req.params.id;
      if (!id) return res.status(400).send();
      await Stock.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
