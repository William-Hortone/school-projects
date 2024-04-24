import React, { useEffect, useState } from "react";
import { Header, NavBar } from "../../components";
import BASE_URL from "../../hooks/config";
import axios from "axios";

const ViewStudents = () => {
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

  return (
    <>
      <div className="app__viewStudents  section-padding">
        <h2 className="page-title">View All Students</h2>

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
                <tr key={index}>
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

export default ViewStudents;
