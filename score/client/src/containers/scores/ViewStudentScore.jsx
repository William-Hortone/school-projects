import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../hooks/config";
import { GoBackBtn } from "../../components";

const ViewStudentScore = () => {
  const location = useLocation();
  const student = location.state.student;

  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const API_URL = `${BASE_URL}score/getScores`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllScores(data.scores);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   To get the total credit and total hours
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

  // filter scores according to the current student id
  useEffect(() => {
    const filterScore = allScores.filter(
      (score) => score.student_id === student._id
    );
    setFilteredScores(filterScore);
  }, [allScores, student._id]);

  // To calculate the total score  of each course
  useEffect(() => {
    let totalScore = 0;

    filteredScores.forEach((course) => {
      totalScore +=
        ((course.attendance * 10) / 100 +
          (course.homework * 30) / 100 +
          ((course.questionOne +
            course.questionTwo +
            course.questionThree +
            course.questionFour) *
            60) /
            100) *
        course.credit;
    });

    setScore(totalScore);
  }, [filteredScores]);

  // To calculate the average score
  useEffect(() => {
    if (totalCredit > 0) {
      const result = Math.floor(score / totalCredit);
      setFinalScore(result);
    }
  }, [score, totalCredit]);

  return (
    <>
      <section className="app__score section-padding">
        <h2 className="page-title">View Student Score</h2>

        <GoBackBtn />

        {/* Table for the student information */}
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

        {/* Table for the student scores */}
        <table className="table score-table">
          <thead>
            <tr>
              <th>Academic Year</th>
              <th>Course Name </th>
              <th>Type</th>
              <th>Hours</th>
              <th>Credit</th>
              <th>Homeworks</th>
              <th>Attendance</th>
              <th>Question 1 (.../20)</th>
              <th>Question 2 (.../20)</th>
              <th>Question 3 (.../20)</th>
              <th>Question 4 (.../40)</th>
              <th>Total (.../100)</th>
            </tr>
          </thead>

          <tbody>
            {filteredScores.map((score, index) => {
              return (
                <tr key={index}>
                  <td>{score.academicYear}</td>
                  <td>{score.courseName}</td>
                  <td>{score.type}</td>
                  <td>{score.hours}</td>
                  <td>{score.credit}</td>
                  <td>{score.attendance}</td>
                  <td>{score.homework}</td>
                  <td>{score.questionOne}</td>
                  <td>{score.questionTwo}</td>
                  <td>{score.questionThree}</td>
                  <td>{score.questionFour}</td>
                  <td>
                    {Math.floor(
                      `${
                        (score.attendance * 10) / 100 +
                        (score.homework * 30) / 100 +
                        ((score.questionOne +
                          score.questionTwo +
                          score.questionThree +
                          score.questionFour) *
                          60) /
                          100
                      }`
                    )}
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
