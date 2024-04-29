import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../hooks/config";

const ViewStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;

  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [totalCredit, setTotalCredit] = useState();
  const [totalHours, setTotalHours] = useState();
  const [score, setScore] = useState();
  const [finalScore, setFinalScore] = useState();

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

  // Calculate total score for each course
  useEffect(() => {
    let totalScore = 0;
    filteredScores.forEach((course) => {
      totalScore +=
        (course.attendance +
          course.homework +
          course.participation +
          course.finalExam) *
        course.credit;

      setScore(totalScore);
    });
    // console.log(`Total score for :`, totalScore);
  }, [filteredScores, score]);

  //Calculate the final average score
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

        {/* Score table */}
        <table className="table score-table">
          <thead>
            <tr>
              <th>Academic Year</th>
              <th>Course Name </th>
              <th>Type</th>
              <th>Hours</th>
              <th>Credit</th>
              <th>Attendance / 20</th>
              <th>Homework / 20 </th>
              <th>Participation / 20</th>
              <th>Final Exam / 40</th>
              <th>Total / 100</th>
            </tr>
          </thead>

          <tbody>
            {filteredScores.map((score, index) => {
              return (
                <tr key={index} className="table-row">
                  <td>{score.academicYear}</td>
                  <td>{score.courseName}</td>
                  <td>{score.type}</td>
                  <td>{score.hours}</td>
                  <td>{score.credit}</td>
                  <td>{score.attendance}</td>
                  <td>{score.homework}</td>
                  <td>{score.participation}</td>
                  <td>{score.finalExam}</td>
                  <td>
                    {`${
                      score.attendance +
                      score.homework +
                      score.finalExam +
                      score.participation
                    }`}
                  </td>
                </tr>
              );
            })}
            <tr className="table-column">
              <td>Total Credit</td>
              <td>Average Score</td>
              <td>Total Hours</td>
              <td>Decision</td>
            </tr>
            <tr className="score">
              <td>{totalCredit}</td>
              <td>{isNaN(finalScore) ? "0" : finalScore}</td>
              <td>{totalHours}</td>
              <td>{finalScore >= 60 ? "Success" : "Failed"}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ViewStudentScore;
