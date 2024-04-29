import React, { useEffect, useState } from "react";

import BASE_URL from "../../hooks/config";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components";
import "../students/addStudent.css";
import { useLocation } from "react-router-dom";

const AddStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;

  const [inputs, setInputs] = useState({
    student_id: "",
    academicYear: "",
    courseName: "",
    type: "",
    hours: "",
    credit: "",
    finalExam: "",
    homework: "",
    attendance: "",
    participation: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      student_id: student._id,
    }));
  }, [student._id]);

  //   useEffect(() => {
  //     console.log("inputs", inputs);
  //   }, [inputs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.credit <= 0 ||
      inputs.finalExam <= 0 ||
      inputs.participation <= 0 ||
      inputs.homework <= 0 ||
      inputs.attendance <= 0 ||
      inputs.hours <= 0
    ) {
      return toast.error("Please provide a valid values");
    }

    try {
      const response = await axios.post(`${BASE_URL}score/addScore`, inputs);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="app__score section-padding">
      <h2 className="page-title">Add a Score To a student</h2>

      <table className="table">
        <thead>
          <tr>
            {/* <th>Student ID </th> */}
            <th>Student Name </th>
            <th>Student Number</th>
            <th>Major</th>
            <th>Gender</th>
            <th>Schooling Years</th>
            <th>Date of Birth</th>
          </tr>
        </thead>

        <tbody>
          <tr className="table-row">
            {/* <td>{student._id}</td> */}
            <td>{student.name}</td>
            <td>{student.studentNumber}</td>
            <td>{student.major}</td>
            <td>{student.gender}</td>
            <td>{student.schoolingYears}</td>
            <td>{student.dOB}</td>
          </tr>
        </tbody>
      </table>

      {/*To add score  */}
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="wrapper-input">
            <label htmlFor="courseName" className="label">
              Course Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="Course name"
              value={inputs.courseName}
              name="courseName"
              id="courseName"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="wrapper-input">
            <label htmlFor="academicYear" className="label">
              Academic Year
            </label>
            <input
              type="text"
              className="input"
              placeholder="Academic Year"
              value={inputs.academicYear}
              name="academicYear"
              id="academicYear"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="wrapper-input">
            <label htmlFor="participation" className="label">
              Participation
            </label>
            <input
              type="number"
              className="input"
              placeholder="Participation"
              value={inputs.participation}
              name="participation"
              id="participation"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="wrapper-input">
            <label htmlFor="finalExam" className="label">
              Final Exam
            </label>
            <input
              type="number"
              className="input"
              placeholder="Final Exam"
              value={inputs.finalExam}
              name="finalExam"
              id="finalExam"
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
            <label htmlFor="type" className="label">
              Type
            </label>
            <input
              type="text"
              className="input"
              placeholder="Type"
              value={inputs.type}
              name="type"
              id="type"
              required
              onChange={handleOnChange}
            />
          </div>

          <div className="wrapper-input">
            <label htmlFor="hours" className="label">
              Hours
            </label>
            <input
              type="number"
              className="input"
              placeholder="Hours"
              value={inputs.hours}
              name="hours"
              id="hours"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="wrapper-input">
            <label htmlFor="credit" className="label">
              Credit
            </label>
            <input
              type="number"
              className="input"
              placeholder="Credit"
              value={inputs.credit}
              name="credit"
              id="credit"
              step="any"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="wrapper-input">
            <label htmlFor="attendance" className="label">
              Attendance
            </label>
            <input
              type="number"
              className="input"
              placeholder="Attendance"
              value={inputs.attendance}
              name="attendance"
              id="attendance"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="wrapper-input">
            <label htmlFor="homework" className="label">
              Homework
            </label>
            <input
              type="number"
              className="input"
              placeholder="Homework"
              value={inputs.homework}
              name="homework"
              id="homework"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudentScore;
