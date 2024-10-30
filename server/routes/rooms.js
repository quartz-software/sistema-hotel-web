import { Router } from "express";
import Room from "../models/Room.js";
import { where } from "sequelize";
const router = Router();
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(rooms);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).send();

    const room = await Room.findByPk(id);
    if (!room) return res.status(404).send();

    res.status(200).json(room);
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const rooms = await Room.create(body);
    res.status(201).json(rooms);
  } catch (e) {
    res.status(500).send();
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).send();
    const body = req.body;
    if (!body) return res.status(404).send();
    await Room.update(body, { where: { id } });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).send();
    await Room.destroy({ where: { id } });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
