import sequelize from "../config/db.js";
import Client from "../models/Client.js";
import User from "../models/User.js";

export default class ClientController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const clients = await Client.findAll();
      res.status(200).json(clients);
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

      const client = await Client.findByPk(id);
      if (!client) return res.status(404).send();

      res.status(200).json(client);
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
    const transaction = await sequelize.transaction();
    try {
      const body = req.body;
      const user = body.user;
      const newUser = await User.create(user);

      const client = body.client;
      client.userId = newUser.id;
      const newClient = await Client.create(client);
      res.status(201).json({ client: newClient, user: newUser });
      transaction.commit();
    } catch (e) {
      transaction.rollback();
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
      await Client.update(body, { where: { id } });
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
      await Client.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
