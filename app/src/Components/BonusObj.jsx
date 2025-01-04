import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BonusObj = () => {
  const [objection, setObjection] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/calling/add_objection", { objection })
      .then((result) => {
        if (result.data.Status) {
          navigate("/empdash/bonus");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded border" style={{ width: "500px" }}>
        <h1>Send a new complain </h1>
        <h6>Plase explain below</h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="objection">
              <strong></strong>
            </label>

            <textarea
              name="objection"
              onChange={(e) => setObjection(e.target.value)}
              className="form-control rounded-100"
              style={{ height: "200px", whiteSpace: "pre-wrap" }}
            ></textarea>
          </div>
          <button className="btn btn-danger w-100 rounded-0 mb-2">Send</button>
        </form>
      </div>
    </div>
  );
};

export default BonusObj;
