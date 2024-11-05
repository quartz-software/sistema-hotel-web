import { Router } from "express";
import AdditionalServiceController from "../controllers/AdditionalServiceController.js";
const router = Router();

router.get("/", AdditionalServiceController.findAll);
router.post("/", AdditionalServiceController.create);
router.get("/:id", AdditionalServiceController.findOne);
router.put("/:id", AdditionalServiceController.update);
router.delete("/:id", AdditionalServiceController.delete);

export default router;
