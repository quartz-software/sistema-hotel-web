import { Router } from "express";
import RoomController from "../controllers/RoomController.js";
import configureMulter from "../utils/multer.js";
const router = Router();

router.get("/", RoomController.findAll);
router.post(
  "/",
  configureMulter("images/").array("images", 5),
  RoomController.create
);
router.get("/:id", RoomController.findOne);
router.put(
  "/:id",
  configureMulter("images/").single("image"),
  RoomController.update
);
router.delete("/:id", RoomController.delete);

export default router;
