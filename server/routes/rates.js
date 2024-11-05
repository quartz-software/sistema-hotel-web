import { Router } from "express";
import RoomRateController from "../controllers/RoomRateController.js";
const router = Router();

router.get("/", RoomRateController.findAll);
router.post("/", RoomRateController.create);
router.get("/:id", RoomRateController.findOne);
router.put("/:id", RoomRateController.update);
router.delete("/:id", RoomRateController.delete);

export default router;
