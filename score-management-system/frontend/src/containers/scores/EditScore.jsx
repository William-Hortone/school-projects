import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../../hooks/config";
import "../students/addStudent.css";

const EditScore = () => {
  const [inputs, setInputs] = useState({
    student_id: "",
    academicYear: "",
    courseName: "",
    type: "",
    hours: "",
    credit: "",
    score: "",
  });
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
    setId(inputs.student_id);
  }, [inputs.student_id]);

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

  const handleSelectStudent = async (studentID) => {
    try {
      const response = await axios.get(
        `${BASE_URL}score/getStudentScore/${studentID}`
      );

      console.log("response", response.data.scores);
    } catch (error) {
      console.log("error", error);
    }
  };

  //   const handleOnClick = (score) => {
  //     setInputs({
  //       student_id: score._id,
  //       academicYear: score.academicYear,
  //       courseName: score.courseName,
  //       type: score.type,
  //       credit: score.credit,
  //       score: score.score,
  //       hours: score.hours,
  //     });

  //   };

  return (
    <>
      <div className="app__score section-padding">
        <h2 className="page-title">Edit Student Score</h2>
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
              <label htmlFor="score" className="label">
                Score
              </label>
              <input
                type="number"
                className="input"
                placeholder="Score"
                value={inputs.score}
                name="score"
                id="score"
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
                  onClick={() => handleSelectStudent(student._id)}
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

export default EditScore;
