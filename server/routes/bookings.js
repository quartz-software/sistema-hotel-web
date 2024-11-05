import { Router } from "express";
import BookingController from "../controllers/BookingController.js";
const router = Router();

router.get("/", BookingController.findAll);
router.post("/", BookingController.create);
router.get("/:id", BookingController.findOne);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.delete);

export default router;
