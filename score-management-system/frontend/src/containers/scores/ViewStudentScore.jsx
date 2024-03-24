import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../hooks/config";
import axios from "axios";

const ViewStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;
  console.log("the student", student);

  //   const [allStudents, setAllStudents] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [totalCredit, setTotalCredit] = useState();
  const [totalHours, setTotalHours] = useState();
  const [score, setScore] = useState();
  const [finalScore, setFinalScore] = useState();
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

  // Filter scores according to the student id
  useEffect(() => {
    const totalCredit = filteredScores.reduce(
      (acc, current) => acc + current.credit,
      0
    );
    const totalHours = filteredScores.reduce(
      (acc, current) => acc + current.hours,
      0
    );
    setTotalCredit(totalCredit);
    setTotalHours(totalHours);
  }, [filteredScores]);

  // Filter scores according to the student id
  useEffect(() => {
    const filterScore = allScores.filter(
      (score) => score.student_id === student._id
    );
    setFilteredScores(filterScore);
  }, [allScores, student._id]);

  useEffect(() => {
    let totalScore = 0;
    // Calculate total score for each course
    filteredScores.forEach((course) => {
      totalScore += course.score * course.credit;

      //   console.log(`Total score for ${course.courseName}: ${totalScore}`);

      setScore(totalScore);
    });
    // console.log(`Total score for :`, score);
  }, [filteredScores, score]);

  //Calculate the final score
  useEffect(() => {
    let result = score / totalCredit;
    result = Math.floor(result);
    setFinalScore(result);
  }, [score, totalCredit]);
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
              <td>Average Score</td>
              {/* <td>Major Optional Credit</td> */}
              <td>Total Hours</td>
            </tr>
            <tr className="score">
              <td>{totalCredit}</td>
              <td>{finalScore}</td>
              {/* <td>67</td> */}
              <td>{totalHours}</td>
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
