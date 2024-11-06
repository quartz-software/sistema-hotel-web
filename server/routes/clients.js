import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
const router = Router();

router.get("/", ClientController.findAll);
router.post("/", ClientController.create);
router.get("/:id", ClientController.findOne);
router.put("/:id", ClientController.update);
router.delete("/:id", ClientController.delete);

export default router;
