import Express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import router from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();

app.use(bodyParser.json());
app.use(cors());
app.use(Express.static(path.join(__dirname, "dist")));
app.use("/api", router);

export default app;
