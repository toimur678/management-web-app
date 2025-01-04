import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAdd = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email|| !user.password) {
      alert("All fields are required");
      return;
    }
    axios
      .post("http://localhost:3000/auth/add_admin", {
        email: user.email,
        password: user.password,
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Add new admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              className="form-control rounded-100"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              className="form-control rounded-100"
              onChange={handleInputChange}
            />
          </div>
          
          <button
            className="btn btn-danger w-100 rounded-100 mb-2 mt-3"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAdd;
