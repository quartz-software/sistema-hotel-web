import Express from "express";
const app = Express();
const port = 8000;

app.use(Express.static("dist"));

app.get("/api", (req, res) => {
  console.log("GET: /api");
  res.json({ message: "hola" });
});

app.listen(port, () => {
  console.log(`app listening in http://localhost:${port}`);
});
