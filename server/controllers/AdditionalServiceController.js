import { models } from "../models/index.js";
const { AdditionalService } = models;
export default class AdditionalServiceController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const addServices = await AdditionalService.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(addServices);
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
      if (!id) return res.status(400).send();

      const addService = await AdditionalService.findByPk(id);
      if (!addService) return res.status(404).send();

      res.status(200).json(addService);
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
      const addService = await AdditionalService.create(body);
      res.status(201).json(addService);
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
      await AdditionalService.update(body, { where: { id } });
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
      await AdditionalService.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
