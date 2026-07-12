const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());
// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", 
  database: "cruddb",
});
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed:", err);
    return;
  }
  console.log("MySQL Connected");
});
// Get All Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Add User
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "INSERT INTO users(name,email,age) VALUES(?,?,?)",
    [name, email, age],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// Update User
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// Delete User
app.delete("/users/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// Start Server
app.get("/", (req, res) => {
  res.send("Server Working");
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});