import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const calls = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/infoing/customer_info")
      .then((result) => {
        if (result.data.Status) {
          setCustomers(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center">
        <h3>Crypto Mining Information</h3>
      </div>
      <Link to="/empdash/add_infos" className="mt-5 btn btn-warning">
        Add Info
      </Link>
      <div className="mt-3 ">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Crypto Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.surname}</td>
                <td>{c.subjectname}</td>
                <td>{new Date(c.infoDate).toLocaleDateString()}</td>
                <td>{c.StartTime}</td>
                <td>{c.EndTime}</td>
                <td>{c.StatusName}</td>
                <td>
                  <Link
                    to={`/empdash/edit_info_status/` + c.infostatusID}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
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
