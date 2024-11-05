import { Router } from "express";
import RoomAvailabilityController from "../controllers/RoomAvailabilityController.js";

const router = Router();

router.get("/", RoomAvailabilityController.findAll);
router.get("/:id", RoomAvailabilityController.findOne);
router.post("/", RoomAvailabilityController.create);
router.put("/:id", RoomAvailabilityController.update);
router.delete("/:id", RoomAvailabilityController.delete);

export default router;
