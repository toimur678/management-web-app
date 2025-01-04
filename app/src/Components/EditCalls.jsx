import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCalls = () => {
  const { CallStatusID } = useParams();
  const [statusname, setcustomer] = useState({
    StatusName: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/calling/call_status/")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/calling/call_status/" + CallStatusID)
      .then((result) => {
        setcustomer({
          ...statusname,
          StatusName: result.data.Result[0].StatusName,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3000/calling/edit_callstatus/" + CallStatusID,
        statusname
      )
      .then((result) => {
        if (result.data.Status) {
          navigate("/empdash/calls");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit statusname</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Status Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={statusname.StatusName}
              onChange={(e) =>
                setcustomer({ ...statusname, StatusName: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit call status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCalls;
