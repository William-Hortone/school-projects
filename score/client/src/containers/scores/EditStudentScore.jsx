import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, GoBackBtn } from "../../components";
import BASE_URL from "../../hooks/config";

const EditStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;

  const [courseID, setCourseID] = useState();
  const [allScores, setAllScores] = useState([]);

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

  const API_URL = `${BASE_URL}score/getStudentScore/${student._id}`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllScores(data.scores);
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
    setInputs((prev) => ({
      ...prev,
      student_id: student._id,
    }));
  }, [student._id]);

  useEffect(() => {
    setCourseID(inputs.course_id);
  }, [inputs.course_id]);

  //   To feel the fields  when course is selected
  const handleSelectCourse = (course) => {
    setInputs({
      course_id: course._id,
      academicYear: course.academicYear,
      courseName: course.courseName,
      type: course.type,
      hours: course.hours,
      credit: course.credit,
      questionOne: course.questionOne,
      questionTwo: course.questionTwo,
      questionThree: course.questionThree,
      questionFour: course.questionFour,
      homework: course.homework,
      attendance: course.attendance,
    });
  };

  //   To submit the change
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
      const response = await axios.put(
        `${BASE_URL}score/editCourse/${courseID}`,
        inputs
      );

      toast.success(response.data.message);

      //   Reset the form
      setInputs({
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
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="app__score section-padding">
        <h2 className="page-title">Edit course Details</h2>
        <GoBackBtn />

        {/* Student information */}
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

        {/*Form to edit a course  */}

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

        {/* To select the course to update */}
        <table className="table">
          <thead>
            <tr>
              {/* <th>Student ID </th> */}
              <th>Course Name </th>
              <th>Type</th>
              <th>Academic year</th>
              <th>Hours</th>
              <th>Participation</th>
              <th>Credit</th>
              <th>Attendance</th>
              <th>Homeworks</th>
              <th>Question 1</th>
              <th>Question 2</th>
              <th>Question 3</th>
              <th>Question 4</th>
            </tr>
          </thead>

          <tbody>
            {allScores?.map((course, index) => {
              return (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => handleSelectCourse(course)}
                >
                  <td>{course.courseName}</td>
                  <td>{course.type}</td>
                  <td>{course.academicYear}</td>
                  <td>{course.hours}</td>
                  <td>{course.participation}</td>
                  <td>{course.credit}</td>
                  <td>{course.attendance}</td>
                  <td>{course.homework}</td>
                  <td>{course.questionOne}</td>
                  <td>{course.questionTwo}</td>
                  <td>{course.questionThree}</td>
                  <td>{course.questionFour}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditStudentScore;
