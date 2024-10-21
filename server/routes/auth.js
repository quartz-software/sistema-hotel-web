import { Router } from "express";
import User from "../models/User.js";
import auth from "../utils/auth.js";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    let user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(401).send();
    }
    if (!auth.authUser(body.password, user.password)) {
      return res.status(401).send();
    }
    let payload = { id: user.id, email: user.email };
    let secret = process.env.SECRET;
    let token = jwt.sign(payload, secret);
    return res.cookie("token", token).status(200).json({ token: token });
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    let user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).send();
    }
    await auth.createUser(body);
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/data", (req, res) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies["token"];
  if (!token) {
    return res.status(400).send("No token provided");
  }

  if (token && auth.validateToken(token)) {
    return res.status(200).json({ message: "acceso permitido" });
  }
  return res.status(401).json({ message: "acceso denegado" });
});

router.get("/free", (req, res) => {
  res.json({ message: "test" });
});

export default router;
