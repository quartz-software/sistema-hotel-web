import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { v4 as uuidv4 } from "uuid";

function configureMulter(subfolder, multiple = false, maxCount = 5) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = join(__dirname, "uploads", subfolder);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueName =
        uuidv4() + "-" + Date.now() + extname(file.originalname);
      cb(null, uniqueName);
    },
  });

  const upload = multer({ storage });

  return multiple ? upload.array("files", maxCount) : upload.single("file");
}

export default configureMulter;
