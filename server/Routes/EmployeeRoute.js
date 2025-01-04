import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Employee login email & password check
router.post("/emp_login", (req, res) => {
  const sql1 = "SELECT * from employee Where email = ?";
  con.query(sql1, [req.body.email], async (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }
    if (result.length > 0) {
      const isPasswordValid = await bcrypt.compare(req.body.password, result[0].password);
      if (isPasswordValid) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        const insertQuery =
          "INSERT INTO loginhistory (name, email) VALUES (?, ?)";
        con.query(insertQuery, [result[0].name, result[0].email], (err) => {
          if (err) {
            console.error("Error adding login history:", err);
            return res.json({ loginStatus: false, Error: "Query error" });
          }
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        });
      } else {
        return res.json({ loginStatus: false, Error: "wrong email or password" });
      }
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

// Employee ID check
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

// Adding customers name and surname (Not using this right now)
router.post("/add_calls", (req, res) => {
  const sql = `INSERT INTO customers 
    (Name, Surname) 
    VALUES (?)`;
  if (err) return res.json({ Status: false, Error: "Query Error" });
  const values = [req.body.Name, req.body.Surname];
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

export { router as EmployeeRouter };
