import { models } from "../models/index.js";
const { Service } = models;
import isEqual from "../utils/isEqual.js";

export default class ServiceController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const options = {};
      const user = req.user;
      if (!user) {
        return res.status(403).json();
      }

      if (!isEqual(user.role, "admin")) {
        options.where = {
          available: true,
        };
      }
      let services = await Service.findAll(options);

      res.status(200).json(services);
    } catch (error) {
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
      const user = req.user;
      if (!user) {
        return res.status(403).json();
      }

      const id = req.params.id;
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).send();
      }

      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).send();
      }
      if (service.available === false && !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }

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
      const user = req.user;
      if (!user || !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }

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
      const user = req.user;
      if (!user || !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }

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
      const user = req.user;
      if (!user || !isEqual(user.role, "admin")) {
        return res.status(403).json();
      }

      const id = req.params.id;
      if (!id) return res.status(400).send();
      await Service.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
