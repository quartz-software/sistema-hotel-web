import { literal } from "sequelize";
import { models } from "../models/index.js";
const { Task } = models;
export default class TaskController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const { pid, quantity, status } = req.query;
      if (
        isNaN(pid) ||
        isNaN(quantity) ||
        (status && typeof status != "string")
      )
        return res.status(400).send();

      if (!pid) pid = 0;
      if (!quantity) quantity = 20;
      /**
       * @type {import("sequelize").FindOptions}
       */
      const options = {
        limit: quantity,
        offset: pid * quantity,
        order: [
          [
            literal(`CASE 
            WHEN status = 'pending' THEN 1
            WHEN status = 'in_progress' THEN 2
            WHEN status = 'completed' THEN 3
            ELSE 4
          END`),
            "ASC",
          ],
          ["dateCreate", "ASC"],
        ],
      };
      if (status)
        options.where = {
          status: status,
        };
      const tasks = await Task.findAll(options);
      res.status(200).json(tasks);
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
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).send();
      res.status(200).json(task);
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
      const body = req.body;
      const tasks = await Task.create(body);
      res.status(201).json(tasks);
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
      const id = req.params.id;
      if (!id) return res.status(400).send();
      const body = req.body;
      if (!body) return res.status(404).send();
      await Task.update(body, { where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send(e);
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
      await Task.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
