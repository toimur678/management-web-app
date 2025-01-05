import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bonus = () => {
  const [bonus, setBonus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/infoing/bonus_info")
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
        <h3>Payment Information</h3>
      </div>
      <Link to="/empdash/bonusobj" className="mt-5 btn btn-warning">
        Complain
      </Link>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Month</th>
              <th>Total Infos</th>
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

export default Bonus;
