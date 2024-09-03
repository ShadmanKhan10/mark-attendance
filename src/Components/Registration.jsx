import React, { useState } from "react";
import circle from "../assets/circle.png";
import line from "../assets/line.png";
import topGear from "../assets/topGear.png";
import userIcon from "../assets/userIcon.png";
import employee from "../assets/employee.png";
import departmentIcon from "../assets/departmentIcon.png";
import "./Registration.css";
import LoggedIn from "./LoggedIn";
import axios from "axios";

export default function Registration() {
  const [name, setName] = useState("");
  const [employeeID, setemployeeID] = useState("");
  const [department, setDepartment] = useState("");
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);

  const [submit, setSubmit] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmployeeIDChange = (event) => {
    setemployeeID(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const clearFields = () => {
    setName("");
    setemployeeID("");
    setDepartment("");
  };

  const handleSubmit = async (event) => {
    setLoaderIsVisible(true);
    event.preventDefault();

    const newUser = {
      name,
      employeeID,
      department,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.31:4200/mark-attendance-top-management",
        newUser
      );
      console.log("User added:", response);
      setLoaderIsVisible(false);
      setSubmit(true);

      console.log(response.status);
    } catch (error) {
      console.log("Error Msg", error);
      alert(error.response.data.message);
      setLoaderIsVisible(false);
      clearFields();
    }
  };

  return (
    <>
      {!submit && (
        <div>
          <div className="circle-containing-div">
            <img src={circle} className="circle-img" alt="background" />
          </div>
          <div className="line-containing-div">
            <img src={line} className="line-img" alt="background" />
          </div>
          <div className="topGear-containing-div">
            <img src={topGear} className="topGear-img" alt="background" />
          </div>
          <div className="page-containing-div">
            <form onSubmit={handleSubmit}>
              <div className="input-containing-div">
                <div className="name-containing-div">
                  <div className="user-icon-containing-div">
                    <img src={userIcon} className="icon" alt="name-icon" />
                  </div>

                  <input
                    type="text"
                    placeholder="Name"
                    onChange={handleNameChange}
                    value={name}
                    className="input-field"
                    required
                  />
                </div>
                <div className="employee-containing-div">
                  <div className="employee-icon-containing-div">
                    <img src={employee} className="icon" alt="employee-icon" />
                  </div>
                  <input
                    type="text"
                    placeholder="Employee ID"
                    onChange={handleEmployeeIDChange}
                    value={employeeID}
                    className="input-field"
                    required
                  />
                </div>
                <div className="department-containing-div">
                  <div className="department-icon-containing-div">
                    <img
                      src={departmentIcon}
                      className="icon"
                      alt="employee-icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Department"
                    onChange={handleDepartmentChange}
                    value={department}
                    className="input-field"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loaderIsVisible && (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      )}
      {submit && <LoggedIn />}
    </>
  );
}
