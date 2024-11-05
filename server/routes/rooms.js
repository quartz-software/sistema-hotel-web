import { Router } from "express";
import Room from "../models/Room.js";
import { where } from "sequelize";
import RoomController from "../controllers/RoomController.js";
const router = Router();

router.get("/", RoomController.findAll);
router.post("/", RoomController.create);
router.get("/:id", RoomController.findOne);
router.put("/:id", RoomController.update);
router.delete("/:id", RoomController.delete);

export default router;
