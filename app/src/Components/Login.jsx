import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h1>Administarion login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-100"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-100"
            />
          </div>
          <button className="btn btn-warning w-100 rounded-100 mb-2">
            Login
          </button>
          {/*<button
            type="button"
            className="btn btn-secondary w-100 rounded-100 mb-2"
            onClick={() => {
              navigate("/adminadd");
            }}
          >
            Add new admin
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 rounded-100 mb-2"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Add new user
          </button> */}
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">
              You are Agree with Binance's terms & conditions || 2024 Binance Turkiye.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
