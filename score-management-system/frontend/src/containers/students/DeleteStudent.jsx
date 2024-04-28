import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../../hooks/config";

const DeleteStudent = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [id, setId] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  // To Get all the available students
  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };

  useEffect(() => {
    fetchData();
  }, []);


  //   Function to show the delete popup
  const handleShowPopup = (id, name) => {
    setShowDeletePopup(true);
    setId(id);
    setStudentNumber(name);
  };

  //   Function to  delete a student
  const handleDeleteStudent = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}student/deleteStudent/${id}`
      );

      toast.success(response.data.message);
      console.log("response", response.data);
      setShowDeletePopup(false);
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="app__DeleteStudent  section-padding">
        <h2 className="page-title">Delete Student</h2>

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
                  onClick={() =>
                    handleShowPopup(student._id, student.studentNumber)
                  }
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

      {/* the popup to delete a student */}
      {showDeletePopup && (
        <section className="popup-delete">
          <h2>Delete student</h2>
          <p>
            Do you really want to delete the Student with a student number:
            <span style={{ color: "#163e70", fontWeight: "bold" }}>
              {studentNumber}
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
              onClick={() => handleDeleteStudent()}
            >
              Delete
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default DeleteStudent;
