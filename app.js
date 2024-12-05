const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "brainex",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database");
});

// API Endpoint to Insert Data
app.post("/api/contacts", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO contacts (name, email, phone, country, city, ageGroup, status, course, level, message, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.full_name,
    data.email,
    data.phone,
    data.country,
    data.city,
    data.age_group,
    data.status,
    data.course,
    data.experience_level,
    data.message,
    data.availability,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database insertion failed" });
    } else {
      res.status(200).json({ message: "Contact added successfully" });
    }
  });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost: 5000 `);
});
