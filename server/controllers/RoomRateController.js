export default class RoomRateController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const roomRates = await RoomRate.findAll();
      res.status(200).json(roomRates);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      const roomRate = await RoomRate.findByPk(id);
      if (roomRate) {
        res.status(200).json(roomRate);
      } else {
        res.status(404).json({ message: "Room rate not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    try {
      const newRoomRate = await RoomRate.create(req.body);
      res.status(201).json(newRoomRate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await RoomRate.update(req.body, { where: { id } });
      if (updated) {
        const updatedRoomRate = await RoomRate.findByPk(id);
        res.status(200).json(updatedRoomRate);
      } else {
        res.status(404).json({ message: "Room rate not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await RoomRate.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Room rate not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}
