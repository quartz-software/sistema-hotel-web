import User from "../models/User.js";
import auth from "../utils/auth.js";

export class AuthController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async register(req, res) {
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
  }
  /**
   
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async login(req, res) {
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
  }
}
