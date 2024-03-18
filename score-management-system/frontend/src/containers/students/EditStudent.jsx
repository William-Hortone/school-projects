import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components";
import "./addStudent.css";

const EditStudent = () => {
  const [inputs, setInputs] = useState({
    studentId: "",
    name: "",
    dOB: "",
    major: "",
    input: "",
    gender: "",
    schoolingYears: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target.value;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("selectedDate", selectedDate);
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("the inputs", inputs);

    // try {

    // } catch (error) {

    // }
  };

  return (
    <>
      <div className="app__addStudent section-padding">
        <h2 className="page-title">Edit a student</h2>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div className="wrapper-input">
              <label htmlFor="studentId" className="label">
                Student Id
              </label>
              <input
                type="text"
                className="input"
                placeholder="Student Id"
                value={inputs.studentId}
                name="studentId"
                id="studentId"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="wrapper-input">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your name"
                value={inputs.name}
                name="name"
                id="name"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="wrapper-input">
              <label htmlFor="studentNumber" className="label">
                Student Number
              </label>
              <input
                type="text"
                className="input"
                placeholder="Date of Birth"
                value={inputs.studentNumber}
                name="studentNumber"
                id="studentNumber"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="wrapper-btn">
              <Button text="Submit" type="submit" />
            </div>
          </div>

          <div className="wrapper">
            <div className="wrapper-input">
              <label htmlFor="major" className="label">
                Major
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your Major"
                value={inputs.major}
                name="name"
                id="major"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="wrapper-input">
              <label htmlFor="gender" className="label">
                Gender
              </label>
              <select
                name="gender"
                className="input"
                value={inputs.gender}
                id="gender"
                required
                onChange={handleOnChange}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="wrapper-input">
              <label htmlFor="schoolingYears" className="label">
                Schooling Years
              </label>
              <input
                type="number"
                className="input"
                placeholder="Schooling years"
                value={inputs.schoolingYears}
                name="schoolingYears"
                id="schoolingYears"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="wrapper-input">
              <label htmlFor="dOB" className="label">
                Date of Birth
              </label>
              <br />

              <DatePicker
                value={selectedDate}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="EEE MMM dd yyyy"
                showYearDropdown
                scrollableMonthYearDropdowns
                yearDropdownItemNumber={10}
                yearDropdownMinLength={5}
                maxDate={new Date()}
                className="picker-date"
              />
            </div>
          </div>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>Student ID </th>
              <th>Student Name </th>
              <th>Student Number</th>
              <th>Major</th>
              <th>Gender</th>
              <th>Schooling Years</th>
              <th>Date of Birth</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Student ID </td>
              <td>Student Name </td>
              <td>Student Number</td>
              <td>Major</td>
              <td>Gender</td>
              <td>Schooling Years</td>
              <td>Date of Birth</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditStudent;
