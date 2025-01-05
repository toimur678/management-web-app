import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

const Objections = () => {
  const [obj, setObj] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/infoing/emp_obj_info")
      .then((result) => {
        if (result.data.Status) {
          setObj(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h2>Complain Menu</h2>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Past complains</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            {obj.map((o, index) => (
              <tr key={index}>
                <td>
                  <div className="objection-text">{o.ObjectionText}</div>
                </td>
                <td>{o.ResponseText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Objections;
