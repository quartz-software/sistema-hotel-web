import path from "node:path";
export default class UploadController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  static async getImage(req, res) {
    try {
      const image = req.params.image;
      if (!image) return res.status(400).send();
      const imagePath = path.resolve("uploads/images", image);
      res.sendFile(imagePath, (err) => {
        if (err) {
          res.status(404).json({ error: "Image not found" });
        }
      });
    } catch (e) {
      res.status(500).send();
    }
  }
}
