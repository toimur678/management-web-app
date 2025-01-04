import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeBonus = () => {
  const [bonus, setBonus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/calling/all_bonus_info")
      .then((result) => {
        if (result.data.Status) {
          setBonus(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h2>Employee Bonus Information</h2>
      </div>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Month</th>
              <th>Total call</th>
              <th>Total payment</th>
            </tr>
          </thead>
          <tbody>
            {bonus.map((b, index) => (
              <tr key={index}>
                <td>{b.EmployeeID}</td>
                <td>{b.Name}</td>
                <td>{b.Surname}</td>
                <td>{b.Month}</td>
                <td>{b.CallCount}</td>
                <td>{b.TotalBonus} TL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeBonus;
