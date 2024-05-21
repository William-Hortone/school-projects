import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/config";
import "../students/addStudent.css";

const DeleteCourse = () => {
  const navigate = useNavigate();

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

  const handleNavigate = (student) => {
    navigate("/score/deleteStudentCourse", { state: { student } });
  };
  return (
    <>
      <section className="app__score section-padding">
        <h2 className="page-title">Delete Scores </h2>

        {/* Student Table */}
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
            {allStudents.map((student, index) => {
              return (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => handleNavigate(student)}
                >
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
      </section>
    </>
  );
};

export default DeleteCourse;
