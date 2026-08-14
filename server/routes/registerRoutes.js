const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "Failed to create account",
            });
          }

          res.json({
            success: true,
            message: "Account created successfully",
            user_id: result.insertId,
          });
        },
      );
    },
  );
});

module.exports = router;
