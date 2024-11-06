import { Router } from "express";
import ServiceController from "../controllers/ServiceController.js";
const router = Router();

router.get("/", ServiceController.findAll);
router.post("/", ServiceController.create);
router.get("/:id", ServiceController.findOne);
router.put("/:id", ServiceController.update);
router.delete("/:id", ServiceController.delete);

export default router;
