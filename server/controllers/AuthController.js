import { models, sequelize } from "../models/index.js";
const { User, Employee } = models;
import auth, {
  authUser,
  createToken,
  encryptPassword,
  validateToken,
} from "../utils/auth.js";
import isEqual from "../utils/isEqual.js";

export class AuthController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async register(req, res) {
    try {
      let {
        email,
        password,
        role,
        dni,
        documentType,
        firstname,
        middlename,
        lastname1,
        lastname2,
        phone,
        address,
      } = req.body;

      let user = await User.findOne({ where: { email } });
      if (user) return res.status(400).send();

      if (!role || (req.user && !isEqual(req.user.role, "admin")))
        role = "client";

      let newUser = await User.create({
        email,
        password,
        role,
        dni,
        documentType,
        firstname,
        middlename,
        lastname1,
        lastname2,
        phone,
        address,
      });

      const token = await createToken(newUser);
      // Si la operacion la hace un usuario, no enviar el token
      if (req.user) return res.status(200).send();

      res.cookie("token", token).status(200).json({ token: token });
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).send();

      if (!authUser(user, password)) return res.status(401).send();

      const token = await createToken(user);
      res.cookie("token", token).status(200).json({ token: token });
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async getRole(req, res) {
    try {
      const user = req.user;
      if (!user || isEqual(user.role, "client")) return res.status(400).send();

      const actUser = await User.findByPk(user.id, {
        include: {
          model: Employee,
          as: "employee",
          attributes: ["role"],
        },
      });
      res.status(200).json({ role: actUser.employee.role });
    } catch (e) {
      res.status(500).send();
    }
  }
  /**
   
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async logout(req, res) {
    try {
      res.clearCookie("token").status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  }
  static async checkAuth(req, res) {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies["token"];
      if (!token)
        return res.clearCookie("token").status(200).json({ valid: false });

      let valid = await validateToken(token);
      if (!valid)
        return res.clearCookie("token").status(200).json({ valid: false });

      return res.clearCookie("token").status(200).json({ valid: true });
    } catch (e) {
      if (
        isEqual(
          e.name,
          "TokenExpiredError",
          "JsonWebTokenError",
          "NotBeforeError"
        )
      )
        return res.clearCookie("token").status(200).json({ valid: false });

      res.status(500).send();
    }
  }
}
