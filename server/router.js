import { Router } from "express";
import auth from "./routes/auth.js";
import rooms from "./routes/rooms.js";
const router = Router();

router.use("/auth", auth);
router.use("/rooms", rooms);
export default router;
