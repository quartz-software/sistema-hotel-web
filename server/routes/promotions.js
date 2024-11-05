import { Router } from "express";
import RoomPromotionController from "../controllers/RoomPromotionController.js";
const router = Router();

router.get("/", RoomPromotionController.findAll);
router.post("/", RoomPromotionController.create);
router.get("/:id", RoomPromotionController.findOne);
router.put("/:id", RoomPromotionController.update);
router.delete("/:id", RoomPromotionController.delete);

export default router;
