import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const calls = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/objection_info")
      .then((result) => {
        if (result.data.Status) {
          setCustomers(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (ObjectionID) => {
    axios
      .delete("http://localhost:3000/auth/approve_obj/" + ObjectionID)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  const handleReject = (ObjectionID) => {
    axios
      .delete("http://localhost:3000/auth/reject_obj/" + ObjectionID)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center">
        <h3>New Complains from Employees</h3>
      </div>
      <div className="mt-3 ">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Complain</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={index}>
                <td>{c.Name}</td>
                <td>{c.Surname}</td>
                <td>{c.ObjectionText}</td>
                <td>{c.ResponseText}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mb-1"
                    onClick={() => handleApprove(c.ObjectionID)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleReject(c.ObjectionID)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default calls;
