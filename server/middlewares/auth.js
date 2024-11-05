import auth from "../utils/auth.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default function (req, res) {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies["token"];
  if (!token) {
    return res.status(400).send("No token provided");
  }

  if (token && auth.validateToken(token)) {
    return res.status(200).json({ message: "acceso permitido" });
  }
  return res.status(401).json({ message: "acceso denegado" });
}
