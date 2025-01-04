import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCallStatus = () => {
  const { CallStatusID } = useParams();
  const [employee, setEmployee] = useState({
    StatusName: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/calling/edit_call/" + CallStatusID)
      .then((result) => {
        setEmployee({
          ...employee,
          StatusName: result.data.Result[0].StatusName,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3000/calling/edit_callStatus/" + CallStatusID,
        employee
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
        <h2 className="text-center">Edit Call Status</h2>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputCallStatus" className="form-label">
              Call status
            </label>
            <input
              type="text"
              className="form-control rounded-100 mt-3"
              id="inputCallStatus"
              placeholder="Completed/ Tracking/ The problem could not be solved"
              value={employee.StatusName}
              onChange={(e) =>
                setEmployee({ ...employee, StatusName: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-danger w-100">
              Update info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditCallStatus;
