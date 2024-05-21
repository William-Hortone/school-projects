import React, { useEffect, useState } from "react";
import { GoBackBtn } from "../../components";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../hooks/config";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteStudentCourse = () => {
  const location = useLocation();
  const student = location.state.student;

  const [allScores, setAllScores] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseID, setCourseID] = useState();
  const [courseName, setCourseName] = useState("");

  // To Get all the score of the current student
  const API_URL = `${BASE_URL}score/getStudentScore/${student._id}`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllScores(data.scores);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   Function to  delete a course
  const handleDeleteCourse = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}score/deleteCourse/${courseID}`
      );

      toast.success(response.data.message);
      console.log("response", response.data);
      setShowDeletePopup(false);
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };
  const handleShowPopup = (course) => {
    setShowDeletePopup(true);
    setCourseID(course._id);
    setCourseName(course.courseName);
  };
  return (
    <>
      <div className="app__score section-padding">
        <h2 className="page-title">Delete course</h2>
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
              <th>Homework</th>
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
                  onClick={() => handleShowPopup(course)}
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

      {/* the popup to delete a student */}
      {showDeletePopup && (
        <section className="popup-delete">
          <h2>Delete student</h2>
          <p>
            Do you really want to delete the Course named: :
            <span style={{ color: "#163e70", fontWeight: "bold" }}>
              {courseName}
            </span>
            ?
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              className="btn cancel-btn"
              type="button"
              onClick={() => setShowDeletePopup(false)}
            >
              Cancel
            </button>
            <button
              className="btn delete-btn"
              type="button"
              onClick={() => handleDeleteCourse()}
            >
              Delete
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default DeleteStudentCourse;
