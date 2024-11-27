import multer from "multer";
import { extname, join } from "path";
import { v4 as uuidv4 } from "uuid";

function configureMulter(subfolder) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = join(process.cwd(), "uploads", subfolder);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueName =
        uuidv4() + "-" + Date.now() + extname(file.originalname);
      cb(null, uniqueName);
    },
  });

  return multer({ storage });
}

export default configureMulter;
