import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editcallstatus = () => {
  const { callstatusID } = useParams();
  const [employee, setEmployee] = useState({
    StatusName: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/calling/edit_call/" + callstatusID)
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
        "http://localhost:3000/calling/edit_callstatus/" + callstatusID,
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
        <h2 className="text-center">Edit Comment</h2>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputcallstatus" className="form-label">
            
            </label>
            <input
              type="text"
              className="form-control rounded-100 mt-3"
              id="inputcallstatus"
              placeholder="Comment here"
              value={employee.StatusName}
              onChange={(e) =>
                setEmployee({ ...employee, StatusName: e.target.value })
              }
            />
          </div>

          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-warning w-100">
              Update info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Editcallstatus;
