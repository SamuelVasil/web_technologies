const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL pool setup
const pool = new Pool({
  user: "postgres",
  password: "zadanie2",  // Your database password
  database: "zadanie2",  // Your database name
  host: "serverpc.corrupted.cloud",  // Your database host
  port: 5432,  // Default PostgreSQL port
  max: 10,  // Maximum number of clients in the pool
});


pool.connect((err, connection) => {
  if (err) throw err;
  console.log("Connected to the database successfully!");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(result.rows); 
  });
});


app.post("/users", (req, res) => {
    const { name, birth_year, state, email, notes, tel } = req.body;
    const sql = "INSERT INTO users(name, birth_year, state, email, notes, tel) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    pool.query(sql, [name, birth_year, state, email, notes, tel], (err, result) => {
      if (err) {
        console.error("Error adding user:", err.message);
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json(result.rows);
    });
  });
  
  
  app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, birth_year, state, email, notes, tel } = req.body;
    const sql = "UPDATE users SET name=$1, birth_year=$2, state=$3, email=$4, notes=$5, tel=$6 WHERE id=$7";
    pool.query(sql, [name, birth_year, state, email, notes, tel, id], (err, result) => {
      if (err) {
        console.error("Error updating user:", err.message);
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).send(`User updated successfully for Id: ${id}`);
    });
  });
  


app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = "DELETE FROM users WHERE id=$1";
  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).send(`User deleted successfully for id: ${id}`);
  });
});

// Start the server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port: ${port}`);
});
