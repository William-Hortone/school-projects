import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../hooks/config";
import axios from "axios";

const ViewStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;
  console.log("the student", student);

  const [allStudents, setAllStudents] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [totalCredit, setTotalCredit] = useState();
  //   const navigate = useNavigate();
  // To Get all the available students
  const API_URL = `${BASE_URL}score/getScores`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllScores(data.scores);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("the allScores", allScores);
  }, [allScores]);

  //   Filter scores according to the student id
  useEffect(() => {
    const filterScore = allScores.filter(
      (score) => score.student_id === student._id
    );
    setFilteredScores(filterScore);
  }, [allScores, student._id]);

  // Filter scores according to the student id
  useEffect(() => {
    //   const filterCredit = filteredScores.filter(
    //     (score) => score.student_id === student._id

    //   );

    const totalCredit = filteredScores.reduce(
      (acc, current) => acc + current.credit,
      0
    );
    setTotalCredit(totalCredit);
    console.log("Total credit:", totalCredit);
    //   setFilteredScores(filterScore);
  }, [filteredScores]);

  // const array =[

  // {academicYear
  // :
  // "2023-2024-1"
  // courseName
  // :
  // "Matematics"
  // credit
  // :
  // 4
  // displayIt
  // :
  // true
  // hours
  // :
  // 72
  // score
  // :
  // 89
  // student_id
  // :
  // "65f86dd096493b1284950dc4"
  // type
  // :
  // "C"
  // __v
  // :
  // 0
  // _id
  // :
  // "65f9d9c87a4305056c7cdfe1"},

  // {
  // academicYear
  // :
  // "2023-2024-1"
  // courseName
  // :
  // "Physics"
  // credit
  // :
  // 3
  // displayIt
  // :
  // true
  // hours
  // :
  // 54
  // score
  // :
  // 80
  // student_id
  // :
  // "65f86dd096493b1284950dc4"
  // type
  // :
  // "C",
  // _id
  // :
  // "65f9da487a4305056c7cdfe3"
  // }

  // ]

  return (
    <>
      <section className="app__score section-padding">
        <h2 className="page-title">View Student Score</h2>

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
            <tr>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.studentNumber}</td>
              <td>{student.major}</td>
              <td>{student.gender}</td>
              <td>{student.schoolingYears}</td>
              <td>{student.dOB}</td>
            </tr>
          </tbody>
        </table>

        {/* Score table */}
        <table className="table">
          <thead>
            <tr>
              <th>Academic Year</th>
              {/* <th>Student ID </th> */}
              <th>Course Name </th>
              <th>Type</th>
              <th>Hours</th>
              <th>Credit</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {filteredScores.map((score, index) => {
              return (
                <tr
                  key={index}
                  className="table-row"
                  //   onClick={() => handleNavigate(score)}
                >
                  <td>{score.academicYear}</td>
                  <td>{score.courseName}</td>
                  <td>{score.type}</td>
                  <td>{score.hours}</td>
                  <td>{score.credit}</td>
                  <td>{score.score}</td>
                </tr>
              );
            })}
            <tr className="table-column">
              <td>Total Credit</td>
              <td>Compulsory Credit</td>
              <td>Major Optional Credit</td>
              <td>Public Optional Credit</td>
            </tr>
            <tr className="score">
              <td>{totalCredit}</td>
              <td>26.6</td>
              <td>67</td>
              <td>89.0</td>
            </tr>
            {/* <tr>
              <td>Major Optional Credit</td>
              <td>26.6</td>
              <td>Public Optional Credit</td>
              <td>89.0</td>
            </tr> */}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ViewStudentScore;
