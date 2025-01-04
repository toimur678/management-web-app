import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const EmpDash = () => {
  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        anvigate("/");
      }
    });
  };
  return (
    <div className="container-fluid ">
      <div className="row flex-nowrap ">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <h2 className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">Menu</span>
            </h2>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/*Sidebar code starts from here...*/}

              {/*Manage employee*/}
              <li className="w-100">
                <Link
                  to="/empdash/calls"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-hourglass-top ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Mining history</span>
                </Link>
              </li>

              {/*Manage employee*/}
              <li className="w-100">
                <Link
                  to="/empdash/bonus"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-coin ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Payment</span>
                </Link>
              </li>

              {/*Manage employee*/}
              <li className="w-100">
                <Link
                  to="/empdash/objections"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-exclamation-circle ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Complain</span>
                </Link>
              </li>

              {/*Logout code below*/}
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/*Top title codes are below*/}
        <div className="col p-0 m-0 ">
          <div className="p-2 d-flex justify-content-center shadow bg-warning text-dark">
            <h1>Binance Managment System</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmpDash;
