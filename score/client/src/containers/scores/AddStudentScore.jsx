import React, { useEffect, useState } from "react";
import BASE_URL from "../../hooks/config";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, GoBackBtn } from "../../components";
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
    questionOne: "",
    questionTwo: "",
    questionThree: "",
    questionFour: "",
    homework: "",
    attendance: "",
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

  // to add a score
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.credit <= 0 ||
      inputs.hours <= 0 ||
      inputs.homework < 0 ||
      inputs.homework > 100 ||
      inputs.attendance < 0 ||
      inputs.attendance > 100 ||
      inputs.questionOne > 20 ||
      inputs.questionTwo > 20 ||
      inputs.questionThree > 20 ||
      inputs.questionFour > 40 ||
      inputs.questionOne < 0 ||
      inputs.questionTwo < 0 ||
      inputs.questionThree < 0 ||
      inputs.questionFour < 0
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
    <div className="app__score section-padding ">
      <h2 className="page-title">Add a Score To a student</h2>
      <GoBackBtn />

      <table className="table">
        <thead>
          <tr>
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
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="content-wrapper">
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
                Academic Years
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
              <label htmlFor="attendance" className="label">
                Attendance (.../100)
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
                Homework (.../100)
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

          <div className="wrapper">
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
              <label htmlFor="type" className="label">
                Type
              </label>
              <select
                name="type"
                className="input"
                value={inputs.type}
                id="type"
                required
                onChange={handleOnChange}
              >
                <option value="">Select the course type </option>
                <option value="Required">Required</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divider" />
        <h4>Final Exam (.../100)</h4>

        <div className="content-wrapper">
          <div className="wrapper">
            <div className="wrapper-input">
              <label htmlFor="questionOne" className="label">
                Question 1 (.../20)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Question 1"
                value={inputs.questionOne}
                name="questionOne"
                id="questionOne"
                required
                onChange={handleOnChange}
              />
            </div>

            <div className="wrapper-input">
              <label htmlFor="questionTwo" className="label">
                Question 2 (.../20)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Question 2"
                value={inputs.questionTwo}
                name="questionTwo"
                id="questionTwo"
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
              <label htmlFor="questionThree" className="label">
                Question 3 (.../20)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Question 3"
                value={inputs.questionThree}
                name="questionThree"
                id="questionThree"
                required
                onChange={handleOnChange}
              />
            </div>

            <div className="wrapper-input">
              <label htmlFor="questionFour" className="label">
                Question 4 (.../40)
              </label>
              <input
                type="number"
                className="input"
                placeholder="Question 4"
                value={inputs.questionFour}
                name="questionFour"
                id="questionFour"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudentScore;
