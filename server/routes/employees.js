import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController.js";
const router = Router();

router.get("/", EmployeeController.findAll);
router.post("/", EmployeeController.create);
router.get("/:id", EmployeeController.findOne);
router.put("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

export default router;
