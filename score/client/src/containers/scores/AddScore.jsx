import React, { useEffect, useState } from "react";
import BASE_URL from "../../hooks/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddScore = () => {
  const [allStudents, setAllStudents] = useState([]);
  const navigate = useNavigate();

  // To Get all the available students
  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };
  // useEffect(() => {
  //   console.log("all students", allStudents);
  // }, [allStudents]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (student) => {
    navigate("/score/addStudentScore", { state: { student } });
  };
  return (
    <>
      <section className="app__score section-padding">
        <h2 className="page-title">Add a Score To a student</h2>
        {/* Student Table */}
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
            {allStudents.map((student, index) => {
              return (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => handleNavigate(student)}
                >
                  {/* <td>{student._id}</td> */}
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

export default AddScore;
