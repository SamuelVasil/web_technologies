const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL pool setup
const pool = new Pool({
  user: "postgres",
  password: "zadanie2", // Your database password
  database: "zadanie2", // Your database name
  host: "serverpc.corrupted.cloud", // Your database host (use 'localhost' for local setup)
  port: 5432, // Default PostgreSQL port
  max: 10, // Maximum number of clients in the pool
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database successfully!");
});


const staticPath = path.join(__dirname, "../frontend/pages");
console.log("Serving static files from:", staticPath);
app.use("/pages", express.static(staticPath));


app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY id";
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(result.rows);
  });
});

app.post("/users", async (req, res) => {
  const { name, birth_year, state, email, notes, tel } = req.body;

  try {
    const freeIdQuery =
      "SELECT MIN(id + 1) AS free_id FROM users WHERE id + 1 NOT IN (SELECT id FROM users)";
    const freeIdResult = await pool.query(freeIdQuery);
    let idToUse = freeIdResult.rows.length > 0 ? freeIdResult.rows[0].free_id : null;

    if (idToUse === null) {
      const maxIdQuery = "SELECT MAX(id) AS max_id FROM users";
      const maxIdResult = await pool.query(maxIdQuery);
      idToUse = maxIdResult.rows[0].max_id + 1;
    }

    const sql =
      "INSERT INTO users(id, name, birth_year, state, email, notes, tel) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const result = await pool.query(sql, [idToUse, name, birth_year, state, email, notes, tel]);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding user:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, birth_year, state, email, notes, tel } = req.body;
  const sql =
    "UPDATE users SET name=$1, birth_year=$2, state=$3, email=$4, notes=$5, tel=$6 WHERE id=$7";
  pool.query(sql, [name, birth_year, state, email, notes, tel, id], (err) => {
    if (err) {
      console.error("Error updating user:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).send(`User updated successfully for Id: ${id}`);
  });
});

app.delete("/users", (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "No user IDs provided for deletion" });
  }

  const sqlDelete = "DELETE FROM users WHERE id = ANY($1)";

  pool.query(sqlDelete, [ids], (err) => {
    if (err) {
      console.error("Error deleting users:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const sqlResetSequence =
      "SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT max(id) FROM users));";

    pool.query(sqlResetSequence, (err) => {
      if (err) {
        console.error("Error resetting sequence:", err.message);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).send(`${ids.length} users deleted successfully`);
    });
  });
});

// Fallback route for serving a single static file
app.get("/pages/index.html", (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(staticPath, fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving file "${fileName}":`, err.message);
      res.status(404).send("File not found.");
    }
  });
});

// Start the server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${port}`);
});
