import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCalls = () => {
  const [customers, setCustomers] = useState({ name: "", surname: "" });
  const [subject, setSubject] = useState({ SubjectName: "" });
  const [date, setDate] = useState({ calldate: "" });

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e, setState) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customersResponse = await axios.post(
        "http://localhost:3000/calling/add_customers",
        customers
      );
      const subjectResponse = await axios.post(
        "http://localhost:3000/calling/add_subject",
        subject
      );
      const dateResponse = await axios.post(
        "http://localhost:3000/calling/add_date",
        date
      );

      if (
        customersResponse.data.Status &&
        subjectResponse.data.Status &&
        dateResponse.data.Status
      ) {
        navigate("/empdash/add_calls2");
      } else {
        alert("Failed to add call. Please try again.");
      }
    } catch (error) {
      console.error("Error adding call:", error);
      alert("An error occurred while adding the call. Please try again later.");
    }
  };

  // Handle date input change
  const handleDateInputChange = (e, setState) => {
    const { name, value } = e.target;
    // Ensure the date is in the format "yyyy-mm-dd"
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add a new call</h3>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              name="name"
              placeholder="Enter name"
              value={customers.name}
              onChange={(e) => handleInputChange(e, setCustomers)}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSurname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSurname"
              name="surname"
              placeholder="Enter surname"
              value={customers.surname}
              onChange={(e) => handleInputChange(e, setCustomers)}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSubject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSubject"
              name="subjectname"
              placeholder="Malfunction/ Demand/ Information"
              value={subject.subjectname}
              onChange={(e) => handleInputChange(e, setSubject)}
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputDateOfBirth" className="form-label"></label>
            <input
              type="hidden"
              onChange={(e) => handleDateInputChange(e, setDate)}
            />
          </div>

          <div className="mt-3 col-12">
            <button type="submit" className="btn btn-danger w-100">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCalls;
