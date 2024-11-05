import { Router } from "express";
import StockController from "../controllers/StockController.js";
const router = Router();

router.get("/", StockController.findAll);
router.post("/", StockController.create);
router.get("/:id", StockController.findOne);
router.put("/:id", StockController.update);
router.delete("/:id", StockController.delete);

export default router;
