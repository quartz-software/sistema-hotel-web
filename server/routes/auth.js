import { Router } from "express";
import User from "../models/User.js";
import auth from "../utils/auth.js";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", async (req, res) => {
  const body = req.body;
  let user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(401).json({ message: "Acceso denegado" });
  }
  if (auth.authUser(body.password, user.password)) {
    let payload = { id: user.id, email: user.email };
    let secret = process.env.SECRET;
    let token = jwt.sign(payload, secret);

    res.json({ token: token });
  }
});
router.post("/register", async (req, res) => {
  const body = req.body;
  let user = await User.findOne({ email: body.email });
  if (user) {
    return res.status(400).json({ message: "Existente" });
  }

  await auth.createUser(body);
  res.json({ message: "registro exitoso" });
});
router.get("/data", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token && auth.validateToken(token)) {
    return res.status(200).json({ message: "acceso permitido" });
  }
  return res.status(401).json({ message: "acceso denegado" });
});

export default router;
