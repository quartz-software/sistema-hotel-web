export default class RoomRateController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).send();
      }
      const where = {
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      };
      const roomRates = await RoomRate.findAll({ where });
      res.status(200).json(roomRates);
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
      const { id } = req.params;
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
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async create(req, res) {
    try {
      const newRoomRate = await RoomRate.create(req.body);
      res.status(201).json(newRoomRate);
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
      const { id } = req.params;
      const [updated] = await RoomRate.update(req.body, { where: { id } });
      if (updated) {
        const updatedRoomRate = await RoomRate.findByPk(id);
        res.status(200).json(updatedRoomRate);
      } else {
        res.status(404).send();
      }
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
      await Room.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
}
