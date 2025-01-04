import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [callsTotal, setcallsTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);

  // All used React functions
  useEffect(() => {
    employeeCount();
    salaryCount();
    callsCount();
  }, []);

  // Admin records function
  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  // Admin count function
  const callsCount = () => {
    axios.get("http://localhost:3000/auth/call_count").then((result) => {
      if (result.data.Status) {
        setcallsTotal(result.data.Result[0].totalCalls);
      }
    });
  };

  // Employee count function
  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  // Bonus or salary count function
  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    });
  };
  return (
    <div>
      {/* Dashboard top information codes */}
      <div className="p-3 d-flex justify-content-around mt-3">
        {/* Admin codes */}
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>My employees</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>

        {/* Employee codes */}
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee calls</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{callsTotal}</h5>
          </div>
        </div>

        {/* Salary codes */}
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Pending payments</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{salaryTotal} TL</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
