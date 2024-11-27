import User from "../models/User.js";
import auth, { authUser, createToken, encryptPassword } from "../utils/auth.js";
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
}
