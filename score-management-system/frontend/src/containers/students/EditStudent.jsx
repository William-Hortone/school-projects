import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components";
import "./addStudent.css";
import axios from "axios";
import BASE_URL from "../../hooks/config";
import { toast } from "react-toastify";

const EditStudent = () => {
  const [inputs, setInputs] = useState({
    studentId: "",
    name: "",
    dOB: "",
    major: "",
    studentNumber: "",
    gender: "",
    schoolingYears: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [id, setId] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  // To Get all the available students
  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setId(inputs.studentId);
  }, [inputs.studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.schoolingYears <= 0) {
      return toast.error("Please provide a valid schooling year");
    }

    try {
      const response = await axios.put(
        `${BASE_URL}student/editStudent/${id}`,
        inputs
      );

      toast.success(response.data.message);
      console.log("response", response.data);
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };

  const handleOnClick = (student) => {
    setInputs({
      studentId: student._id,
      name: student.name,
      studentNumber: student.studentNumber,
      major: student.major,
      gender: student.gender,
      schoolingYears: student.schoolingYears,
    });
    // setSelectedDate(student.dOB);
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
                placeholder="Student Number"
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

        {/* Student Table */}
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
            {allStudents.map((student, index) => {
              return (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => handleOnClick(student)}
                >
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.studentNumber}</td>
                  <td>{student.major}</td>
                  <td>{student.gender}</td>
                  <td>{student.schoolingYears}</td>
                  <td>{student.dOB}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditStudent;
