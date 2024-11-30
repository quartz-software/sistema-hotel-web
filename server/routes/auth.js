import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
const router = Router();

router.post("/check", AuthController.checkAuth);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);
router.get("/role", AuthController.getRole);

export default router;
