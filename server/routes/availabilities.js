import { Router } from "express";
import AvailabilityController from "../controllers/AvailabilityController.js";
const router = Router();

router.get("/", AvailabilityController.findAll);
router.post("/", AvailabilityController.create);
router.get("/:id", AvailabilityController.findOne);
router.put("/:id", AvailabilityController.update);
router.delete("/:id", AvailabilityController.delete);

export default router;
