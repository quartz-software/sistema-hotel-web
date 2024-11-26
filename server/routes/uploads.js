import { Router } from "express";
import UploadController from "../controllers/UploadController.js";
const router = Router();

router.get("/images/:image", UploadController.getImage);

export default router;
