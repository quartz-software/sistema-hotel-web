import { where } from "sequelize";
import { models, sequelize } from "../models/index.js";
const { Room, RoomImage, Booking } = models;

export default class RoomController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async findAll(req, res) {
    try {
      const rooms = await Room.findAll({
        order: [["id", "ASC"]],
        include: [
          {
            model: RoomImage,
            as: "images",
          },
          {
            model: Booking,
            as: "bookings",
            through: { attributes: [] }
          },
        ]
      });
      res.status(200).json(rooms);
    } catch (e) {
      console.log(e);

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

      const room = await Room.findByPk(id, {
        include: {
          model: RoomImage,
          as: "images",
        },
      });
      if (!room) return res.status(404).send();

      console.log(room.images);

      res.status(200).json(room);
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
    let filenames = [];
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const files = req.files;
      const { roomNumber, type, pricePerNight, status, capacity, description } =
        req.body;
      const images = JSON.parse(req.body.images);

      const room = Room.build({
        roomNumber,
        type,
        pricePerNight,
        status: "unavailable",
        capacity,
        description,
      });
      await room.save();
      room.images = [];
      images.forEach(async (item) => {
        room.images.push(
          await RoomImage.create({
            name: item.name,
            type: item.type,
            path:
              item.index != null && item.index != undefined
                ? "/uploads/images/" + files[item.index].filename
                : null,
            url: item.url != null && item.url != undefined ? item.url : null,
            roomId: room.id,
          })
        );
      });

      await transaction.commit();
      res.status(201).json(room);
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      if (filenames.length > 0) {
        try {
          await Promise.all(
            filenames.map((filename) => {
              const filePath = path.join(
                process.cwd(),
                "uploads",
                "images",
                filename
              );
              return fs.unlink(filePath);
            })
          );
        } catch (deleteError) {
          console.log("Error deleting files:", deleteError);
        }
      }
      res.status(500).send();
    }
  }
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async update(req, res) {
    let transaction;
    let filenames = [];
    try {
      transaction = await sequelize.transaction();
      const id = req.params.id;

      if (!id) return res.status(400).send("Room ID is required.");

      const files = req.files;
      const { roomNumber, type, pricePerNight, capacity, description, status } =
        req.body;

      const images = JSON.parse(req.body.images);

      const room = await Room.findByPk(id, {
        include: {
          model: RoomImage,
          as: "images",
        },
      });

      if (!room) return res.status(404).send("Room not found.");
      await room.update(
        { roomNumber, type, pricePerNight, capacity, description, status },
        { where: { id } }
      );

      // Gestionar imágenes: eliminar las existentes no incluidas en la solicitud
      const currentImageIds = room.images.map((image) => image.id);
      const newImageIds = images.filter((img) => img.id).map((img) => img.id);

      const imagesToDelete = currentImageIds.filter(
        (id) => !newImageIds.includes(id)
      );
      await RoomImage.destroy({
        where: { id: imagesToDelete },
        transaction,
      });
      // Agregar o actualizar imágenes nuevas
      images.forEach(async (item) => {
        if (item.id == null) {
          room.images.push(
            await RoomImage.create({
              name: item.name,
              type: item.type,
              path:
                item.index != null && item.index != undefined
                  ? "/uploads/images/" + files[item.index].filename
                  : null,
              url: item.url != null && item.url != undefined ? item.url : null,
              roomId: room.id,
            })
          );
        }
      });

      await transaction.commit();
      res.status(200).json(room);
    } catch (error) {
      await transaction.rollback();
      console.log("Error updating room:", error);
      if (filenames.length > 0) {
        try {
          await Promise.all(
            filenames.map((filename) => {
              const filePath = path.join(
                process.cwd(),
                "uploads",
                "images",
                filename
              );
              return fs.unlink(filePath);
            })
          );
        } catch (deleteError) {
          console.log("Error deleting files:", deleteError);
        }
      }
      res.status(500).send();
    }
  }

  /* static async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();
      const { roomNumber, type, pricePerNight, capacity, description, status } =
        req.body;
      const room = await Room.findByPk(id);
      if (!room) return res.status(404).send();
      await room.update(
        { roomNumber, type, pricePerNight, capacity, description, status },
        { where: { id } }
      );
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  } */
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
