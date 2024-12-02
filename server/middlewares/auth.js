import { models } from "../models/index.js";
const { Employee } = models;
import { validateToken } from "../utils/auth.js";
import isEqual from "../utils/isEqual.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res, next) {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies["token"];

    if (token) {
      let { id, role } = await validateToken(token);
      req.user = { id, role };

      if (req.user.role === "employee") {
        const employee = await Employee.findOne({
          where: {
            userId: id,
          },
        });
        req.user.role = employee.role;
        if (!isEqual(employee.status, "active", "training"))
          req.user = undefined;
      }
    }
    next();
  } catch (e) {
    console.error("Error al validar el token:", e);
    next();
  }
}
