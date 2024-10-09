import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import path from "path";
import cors from "cors";
const app = Express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(Express.static("dist"));

app.get("/api", (req, res) => {
  console.log("GET: /api");
  res.json({ message: "hola" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
