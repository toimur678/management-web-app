import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Calls = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/calling/customer_info")
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
        <h3>Call History List</h3>
      </div>
      <Link to="/empdash/add_calls" className="mt-5 btn btn-danger">
        Add calls
      </Link>
      <div className="mt-3 ">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Call Status</th>
              <th>Edit Call Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
                <td>{c.surname}</td>
                <td>{c.subjectname}</td>
                <td>{new Date(c.CallDate).toLocaleDateString()}</td>
                <td>{c.StartTime}</td>
                <td>{c.EndTime}</td>
                <td>{c.StatusName}</td>
                <td>
                  <Link
                    to={`/empdash/edit_call_status/` + c.CallStatusID}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Edit Status
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

export default Calls;
