import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Header, NavBarStudent } from "../../../components";
import { AuthContext } from "../../../hooks/AuthContext";
import BASE_URL from "../../../hooks/config";

const ViewScores = () => {
  const { userInfo } = useContext(AuthContext);

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
      (score) => score.student_id === userInfo?.id
    );
    setFilteredScores(filterScore);
  }, [allScores, userInfo?.id]);

  // Calculate total score for each course
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

      setScore(totalScore);
    });
  }, [filteredScores, score]);

  //Calculate the final average score
  useEffect(() => {
    let result = score / totalCredit;
    result = Math.floor(result);
    setFinalScore(result);
  }, [score, totalCredit]);
  return (
    <>
      <Header title="Teacher" />
      <NavBarStudent />
      <section className="app__score section-padding">
        <h2 className="page-title"> Student Score</h2>

        {/* Score table */}
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

export default ViewScores;
