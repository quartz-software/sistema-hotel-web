import { Router } from "express";
import RoomImageController from "../controllers/RoomImageController.js";
const router = Router();

router.get("/", RoomImageController.findAll);
router.post("/", RoomImageController.create);
router.get("/:id", RoomImageController.findOne);
router.put("/:id", RoomImageController.update);
router.delete("/:id", RoomImageController.delete);

export default router;
