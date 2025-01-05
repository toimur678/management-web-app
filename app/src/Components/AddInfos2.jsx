import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInfos2 = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(""); // State to hold the start time
  const [endTime, setEndTime] = useState(""); // State to hold the end time

  // Handle start time change
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  // Handle end time change
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // Submit data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const timeResponse = await axios.post(
        "http://localhost:3000/infoing/add_time",
        { startTime, endTime } // Pass both start time and end time to the server
      );

      if (timeResponse.data.Status) {
        navigate("/empdash/infos");
      } else {
        alert("Failed to add time. Please try again.");
      }
    } catch (error) {
      console.error("Error adding time:", error);
      alert("An error occurred while adding the time. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Time</h3>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="mt-3 col-12">
            <label htmlFor="startTimeInput" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              id="startTimeInput"
              className="form-control"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div className="mt-3 col-12">
            <label htmlFor="endTimeInput" className="form-label">
              End Time
            </label>
            <input
              type="time"
              id="endTimeInput"
              className="form-control"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <div className="mt-3 col-12">
            <button type="submit" className="btn btn-warning w-100">
              Submit info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInfos2;
