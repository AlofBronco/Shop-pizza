import express from "express";
import path from "path";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "html", "index.html"));
});

app.get("/pizza-designer", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "html", "pizza-creator.html"));
});

app.get("/minigame", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "html", "minigame.html"));
});

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}`);
});
