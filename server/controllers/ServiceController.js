import Service from "../models/Service.js";

export default class ServiceController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    const services = await Service.findAll();
    res.status(200).json(services);
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
      const service = await Service.findByPk(id);
      if (!service) return res.status(400).send();
      res.status(200).json(service);
    } catch (error) {
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
      if (!body || body.id != undefined) return res.status(400).send();
      const service = await Service.create(body);
      service.save();
      res.status(200).json(service);
    } catch (error) {
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
      const body = req.body;
      if (!id || !body || isNaN(parseInt(id))) return res.status(400).send();
      await Service.update(body, { where: { id } });
      res.status(200).send();
    } catch (error) {
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
      await Service.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
