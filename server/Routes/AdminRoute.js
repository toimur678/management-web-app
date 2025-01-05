import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Admin login email & password check
router.post("/adminlogin", (req, res) => {
  const sql1 = "SELECT * from logininfo Where email = ? and password = ?";
  con.query(sql1, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});


// Add admin
router.post("/add_admin", async (req, res) => {
  const { email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO logininfo (`email`, `password`) VALUES (?, ?)";
  con.query(sql, [email, hashedPassword], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

// Add user
router.post("/add_user", (req, res) => {
  const { name, email, password, salary, address } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.json({ Status: false, Error: "Password hashing error" });
    }

    const employeeSql = "INSERT INTO employee (`name`, `email`, `password`, `salary`, `address`) VALUES (?, ?, ?, ?, ?)";
    con.query(employeeSql, [name, email, hashedPassword, salary, address], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Error inserting into employee table" });
      }

      const employeeId = result.insertId;
      const surname = name.split(" ").pop(); // Extract last name as surname

      const employeesSql = "INSERT INTO employees (`EmployeeID`, `Name`, `Surname`, `PositionID`) VALUES (?, ?, ?, 2)";
      con.query(employeesSql, [employeeId, name, surname], (err) => {
        if (err) {
          console.error("Error inserting into employees table:", err);
          return res.json({ Status: false, Error: "Error inserting into employees table" });
        }

        const bonusIdSql = "SELECT COALESCE(MAX(BonusID), 0) + 1 AS NextBonusID FROM bonuses";
        con.query(bonusIdSql, (err, bonusResult) => {
          if (err) {
            console.error("Error fetching next BonusID:", err);
            return res.json({ Status: false, Error: "Error fetching next BonusID" });
          }

          const nextBonusId = bonusResult[0].NextBonusID;
          const bonusesSql = "INSERT INTO bonuses (`BonusID`, `EmployeeID`, `Month`, `CallCount`, `TotalBonus`) VALUES (?, ?, DATE_FORMAT(CURDATE(), '%M'), 0.00, 0.00)";
          con.query(bonusesSql, [nextBonusId, employeeId], (err) => {
            if (err) {
              console.error("Error inserting into bonuses table:", err);
              return res.json({ Status: false, Error: "Error inserting into bonuses table" });
            }

            return res.json({ Status: true });
          });
        });
      });
    });
  });
});




// Getting Objection info for admin
router.get("/objection_info", (req, res) => {
  const sql =
    "SELECT e.Name, e.Surname, o.ObjectionText, o.ResponseText, o.ObjectionID FROM employees e JOIN objections o ON e.EmployeeID = o.EmployeeID;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Bring data from employee table code 1
router.get("/employee", (req, res) => {
  const sql = "SELECT id, name, email, address FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Bring data from employee table code 2
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Rejecting objection
router.delete("/reject_obj/:ObjectionID", (req, res) => {
  const ObjectionID = req.params.ObjectionID;
  const sql = `CALL RejectResponseText(?)`;
  con.query(sql, [ObjectionID], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Approve objection
router.delete("/approve_obj/:ObjectionID", (req, res) => {
  const ObjectionID = req.params.ObjectionID;
  const sql = `CALL ApproveResponseText(?)`;
  con.query(sql, [ObjectionID], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Admin counting
router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as logininfo from logininfo";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Employee counting
router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Bonus or Salary count data
router.get("/salary_count", (req, res) => {
  const sql = "select SUM(TotalBonus) as salaryOFEmp from bonuses";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Getting all admin data
router.get("/admin_records", (req, res) => {
  const sql = "select * from logininfo";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Total call count
router.get("/call_count", (req, res) => {
  const sql = "select count(infoID) as totalinfos from infos";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
