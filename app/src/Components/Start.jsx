import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect;

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-5 rounded w-60 border loginForm">
        <h2 className="text-center">Welcome to Binance</h2>
        <br></br>
        <h4 className="text-center">Management System</h4>
        <br></br>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
