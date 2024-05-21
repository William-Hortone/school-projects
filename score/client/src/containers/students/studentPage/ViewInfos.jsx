import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Header, NavBarStudent } from "../../../components";
import { AuthContext } from "../../../hooks/AuthContext";
import BASE_URL from "../../../hooks/config";

const ViewInfos = () => {
  const { userInfo } = useContext(AuthContext);
  const [allStudent, setAllStudents] = useState([]);
  const [student, setStudent] = useState();

  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filters the students according to the student id
  useEffect(() => {
    const filteredData = allStudent.filter(
      (student) => student._id === userInfo?.id
    );
    setStudent(filteredData);
  }, [allStudent, userInfo?.id]);

  return (
    <>
      <Header title="Teacher" />
      <NavBarStudent />

      <div className="app__score section-padding">
        <h2 className="page-title">Student Information</h2>

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
            {student?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.studentNumber}</td>
                  <td>{item.major}</td>
                  <td>{item.gender}</td>
                  <td>{item.schoolingYears}</td>
                  <td>{item.dOB}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewInfos;
