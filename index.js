const { log } = require("console");
const express = require("express");
const { type } = require("os");
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

    // Check if the "price" table exists
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='price'", (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (!row) {
        // If the table doesn't exist, create it
        const createTableSql = "CREATE TABLE price(id INTEGER PRIMARY KEY,price INTEGER,type TEXT)";
        db.run(createTableSql, (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Table 'price' created successfully");
            // Insert data after creating the table
            insertData();
          }
        });
      } else {
        // If the table already exists, insert data
        insertData();
      }
    });
  }
});

function insertData() {
  // Sample data to insert, modify this array with your own data
  const dataToInsert = [
    { price: 80, type: "standart" },
    { price: 100, type: "big" },
    { price: 120, type: "extrabig" },
    { price: 150, type: "largest" },
    { price: 50, type: "fluff" },
    { price: 40, type: "thin" },
    { price: 60, type: "philadelphia" },
    { price: 80, type: "hotdog" },
    { price: 20, type: "ketchup" },
    // Add more rows as needed
  ];

  // Use placeholders in the SQL query
  const checkIfExistsSql = "SELECT * FROM price WHERE price = ? AND type = ?";

  const stmt = db.prepare(checkIfExistsSql);

  dataToInsert.forEach((row) => {
    stmt.get([row.price, row.type], (err, existingRow) => {
      if (err) {
        return console.error(err.message);
      }

      if (existingRow) {
        // Data with the same values already exists, do not insert again
        console.log(
          `\x1b[33mData with price ${row.price} and type ${row.type} already exists in the 'price' table\x1b[0m`
        );
      } else {
        // Data does not exist, insert it
        const insertSql = "INSERT INTO price(price, type) VALUES (?, ?)";
        db.run(insertSql, [row.price, row.type], (err) => {
          if (err) return console.error(err.message);
          console.log(
            `\x1b[32mData with price ${row.price} and type ${row.type} inserted successfully\x1b[0m`
          );
        });
      }
    });
  });

  stmt.finalize();
}
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

app.get("/api/fillings", (req, res) => {
  const selectAllSql = "SELECT * FROM price";

  db.all(selectAllSql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let prices = {};
    for (let row of rows) {
      prices[row.type] = row.price;
    }
    let jsonRes = JSON.stringify(prices);

    res.send(jsonRes);
  });
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
