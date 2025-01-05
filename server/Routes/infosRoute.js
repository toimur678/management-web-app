import express from "express";
import con from "../utils/db.js";

const router = express.Router();

// Adding name and surname to customers table in the database
router.post("/add_customers", (req, res) => {
  const { name, surname } = req.body;
  const sql = "CALL InsertCustomer(?, ?)";
  con.query(sql, [name, surname], (err, result) => {
    if (err) {
      console.error("Error adding customer:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true });
  });
});

// Getting name and surname from customers table in the database
router.get("/customer_info", (req, res) => {
  const sql = "SELECT * FROM customer_info;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Adding Subject Name to infosubject table in the database
router.post("/add_subject", (req, res) => {
  const { subjectname } = req.body;
  const sql = "CALL Insertinfosubject(?)";
  con.query(sql, [subjectname], (err, result) => {
    if (err) {
      console.error("Error adding subject:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true });
  });
});

// Adding Date and Start Time to infos table in the database
router.post("/add_date", (req, res) => {
  const { datename } = req.body;
  const sql = `
    INSERT INTO infos(EmployeeID,
                      CustomerID,
                      infoDate,
                      infostatusID,
                      infosubjectID)
    VALUES((SELECT GetEmployeeIDFromLatestLogin()),
           (SELECT MAX(CustomerID) FROM customers),
           NOW(),
           '2',
           '2'
        );`;
  con.query(sql, [datename], (err, result) => {
    if (err) {
      console.error("Error adding date:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true });
  });
});

// Adding Start Time and End Time to time table in the database
router.post("/add_time", (req, res) => {
  const { startTime, endTime } = req.body;

  // First SQL query to insert start time and end time
  const sql1 = "INSERT INTO time (StartTime, EndTime) VALUES (?, ?)";
  con.query(sql1, [startTime, endTime], (err, result) => {
    if (err) {
      console.error("Error adding time:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }

    // Second SQL query to insert call status
    const sql2 = "INSERT INTO infostatus () VALUES ()";
    con.query(sql2, (err, result) => {
      if (err) {
        console.error("Error adding call status:", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
        return res.json({
          Status: true,
          Message: "Time and call status added successfully",
        });
      });
    });
});

// Getting all the infostatus ID
router.get("/edit_info/:infostatusID", (req, res) => {
  const infostatusID = req.params.infostatusID;
  const sql =
    "SELECT ct.StatusName, ct.infostatusID FROM customers c JOIN infosubject cs ON c.customerid = cs.infosubjectid JOIN infos cl ON c.customerid = cl.infoID JOIN time t ON c.customerid = t.id JOIN infostatus ct ON cl.infoID = ct.infostatusID JOIN employees e ON cl.EmployeeID = e.EmployeeID WHERE ct.infostatusID = ?);";
  con.query(sql, [infostatusID], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Editing infostatus name
router.put("/edit_info_status/:infostatusID", (req, res) => {
  const infostatusID = req.params.infostatusID;
  const sql = `UPDATE infostatus 
        set StatusName = ?
        Where infostatusID = ?`;
  const values = [req.body.StatusName];
  con.query(sql, [...values, infostatusID], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// Getting info from employee bonuses table from the database
router.get("/bonus_info", (req, res) => {
  const sql = "SELECT * FROM employee_bonuses_view;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Getting info from bonus summary for admin from the database
router.get("/all_bonus_info", (req, res) => {
  const sql = "SELECT * FROM bonus_summary;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Sending objections to the database
router.post("/add_objection", (req, res) => {
  const sql =
    "INSERT INTO objections (`EmployeeID`, `ObjectionText`, `ObjectionStatusID`) VALUES (GetEmployeeIDFromLatestLogin(), ?, '1')";
  con.query(sql, [req.body.objection], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

// Getting objections from the database
router.get("/obj_info", (req, res) => {
  const sql = "SELECT * FROM objection_info;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

// Getting employee objections from the database
router.get("/emp_obj_info", (req, res) => {
  const sql = "SELECT * FROM objections_view;";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching customer names:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

export { router as infosRouter };
