const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

let sql;
const PORT = process.env.PORT ?? 3000;
const app = express();

// Creating DB
const db = new sqlite3.Database("./price.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connection to DB successful");
  }
});

// Running DB
sql = "CREATE TABLE price(id INTEGER PRIMARY KEY,price INTEGER,type TEXT)";
db.run(sql);

sql = "INSERT INTO price(price,type) VALUES(?,?)";
db.run(sql, [100, "fluff"], (err) => {
  if (err) return console.error(err.message);
  console.log("Data inserted successfully");
});

// Endpoints
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

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "static", "html", "error404.html"));
});

// App listener and port
app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});

// Closing DB
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Closing DB successful");
      process.exit(0);
    }
  });
});
