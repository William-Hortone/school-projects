import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Button } from "../../components";
import BASE_URL from "../../hooks/config";
import "./addStudent.css";

const EditStudent = () => {
  const [inputs, setInputs] = useState({
    studentId: "",
    name: "",
    dOB: "",
    major: "",
    studentNumber: "",
    gender: "",
    schoolingYears: "",
  });
  // const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [id, setId] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [filterDate, setFilterDate] = useState();

  // To Get all the available students
  const API_URL = `${BASE_URL}student/getStudents`;

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllStudents(data.students);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //  Function when data change
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    setId(inputs.studentId);
  }, [inputs.studentId]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      dOB: filterDate,
    }));
  }, [filterDate]);

  useEffect(() => {
    if (selectedDate) {
      const result = selectedDate.toString().slice(4, 17);
      setFilterDate(result);
    }
  }, [selectedDate]);

  // Function to  Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.schoolingYears <= 0) {
      return toast.error("Please provide a valid schooling year");
    }

    try {
      const response = await axios.put(
        `${BASE_URL}student/editStudent/${id}`,
        inputs
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // To automatically fill the input when  a student is selected
  const handleOnClick = (student) => {
    setInputs({
      studentId: student._id,
      name: student.name,
      studentNumber: student.studentNumber,
      major: student.major,
      gender: student.gender,
      schoolingYears: student.schoolingYears,
    });
  };

  return (
    <>
      <div className="app__addStudent section-padding">
        <h2 className="page-title">Edit a student</h2>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div className="wrapper-input">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your name"
                value={inputs.name}
                name="name"
                id="name"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="wrapper-input">
              <label htmlFor="studentNumber" className="label">
                Student Number
              </label>
              <input
                type="text"
                className="input"
                placeholder="Student Number"
                value={inputs.studentNumber}
                name="studentNumber"
                id="studentNumber"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="wrapper-input">
              <label htmlFor="schoolingYears" className="label">
                Schooling Years
              </label>
              <input
                type="number"
                className="input"
                placeholder="Schooling years"
                value={inputs.schoolingYears}
                name="schoolingYears"
                id="schoolingYears"
                required
                onChange={handleOnChange}
              />
            </div>

            <div className="wrapper-btn first-btn">
              <Button text="Submit" type="submit" />
            </div>
          </div>

          <div className="wrapper">
            <div className="wrapper-input">
              <label htmlFor="major" className="label">
                Major
              </label>
              <input
                type="text"
                className="input"
                placeholder="Your Major"
                value={inputs.major}
                name="name"
                id="major"
                required
                onChange={handleOnChange}
              />
            </div>
            <div className="wrapper-input">
              <label htmlFor="gender" className="label">
                Gender
              </label>
              <select
                name="gender"
                className="input"
                value={inputs.gender}
                id="gender"
                required
                onChange={handleOnChange}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="wrapper-input">
              <label htmlFor="dOB" className="label">
                Date of Birth
              </label>
              <br />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableFuture
                />
              </LocalizationProvider>
            </div>

            {/* <div className="wrapper-input">
              <label htmlFor="dOB" className="label">
                Date of Birth
              </label>
              <br />

              <DatePicker
                value={selectedDate}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="EEE MMM dd yyyy"
                showYearDropdown
                scrollableMonthYearDropdowns
                yearDropdownItemNumber={10}
                yearDropdownMinLength={5}
                maxDate={new Date()}
                className="picker-date"
              />
            </div> */}
          </div>
          <div className="wrapper-btn second-btn">
            <Button text="Submit" type="submit" />
          </div>
        </form>

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
                  onClick={() => handleOnClick(student)}
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
      </div>
    </>
  );
};

export default EditStudent;
