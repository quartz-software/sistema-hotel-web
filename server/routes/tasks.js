import { Router } from "express";
import TaskController from "../controllers/TaskController.js";
const router = Router();

router.get("/", TaskController.findAll);
router.post("/", TaskController.create);
router.get("/:id", TaskController.findOne);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
