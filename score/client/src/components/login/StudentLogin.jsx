import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../hooks/AuthContext";
import BASE_URL from "../../hooks/config";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();

  const { loginStudent, errorMessage, isLoading } = useContext(AuthContext);

  const [allStudent, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [inputs, setInputs] = useState({
    studentPassword: "",
    studentNumber: "",
  });

  // To Get all the students
  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(selectedStudent);
  // }, [selectedStudent]);

  // To convert  Student number and password  into number format
  useEffect(() => {
    if (selectedStudent) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        studentPassword: parseInt(selectedStudent),
        studentNumber: parseInt(selectedStudent),
      }));
    }
  }, [selectedStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // ToCheck if the value is not an empty string
    const parsedValue = value !== "" ? parseInt(value) : "";
    setInputs({
      ...inputs,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginStudent(inputs);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (errorMessage) {
    return toast.error("An error has occurred");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field-wrapper">
          <label htmlFor="studentNumber">Student Number</label>
          <input
            value={inputs.studentNumber}
            name="studentNumber"
            type="studentNumber"
            placeholder="Student Number"
            id="studentNumber"
            className="input"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="field-wrapper">
          <label htmlFor="studentPassword">
            Your Password :
            <span>(By default the password is same as the student number)</span>
          </label>

          <input
            id="studentPassword"
            value={inputs.studentPassword}
            name="studentPassword"
            className="input"
            type="password"
            placeholder="Your Password"
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Display all available student  */}
        <div className="field-wrapper">
          <label htmlFor="selectStudent">Select a student number</label>

          <select
            name="selectStudent"
            id="selectStudent"
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select a student number</option>
            {isNaN(allStudent)
              ? allStudent.map((student, index) => {
                  return (
                    <option key={index} value={student.studentNumber}>
                      {student.studentNumber}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>

        <div className="login-content">
          <p>-- Or --</p>

          <button className="google-btn" type="button">
            <FaGoogle size={18} color="#0000000" />
            Login with Google
          </button>
          <p>
            You do not have an account yet?
            <span onClick={() => navigate("/connection/register")}>
              Register
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default StudentLogin;
