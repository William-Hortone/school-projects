import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components";
import "./addStudent.css";
import { toast } from "react-toastify";

import BASE_URL from "./../../hooks/config";
import axios from "axios";

const AddStudent = () => {
  const [inputs, setInputs] = useState({
    name: "",
    dOB: "",
    major: "",
    gender: "",
    studentNumber: "",
    schoolingYears: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [filterDate, setFilterDate] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      dOB: filterDate,
    }));
  }, [filterDate]);

  useEffect(() => {
    console.log("inputs", inputs);
  }, [inputs]);

  useEffect(() => {
    // console.log("selectedDate", selectedDate);

    if (selectedDate) {
      const result = selectedDate.toString().slice(3, 15);
      setFilterDate(result);
      console.log("filterDate", result);
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.schoolingYears <= 0) {
      return toast.error("Please provide a valid schooling year");
    }
    // console.log("the inputs", inputs);
    try {
      const response = await axios.post(
        `${BASE_URL}student/addStudent`,
        inputs
      );

      toast.success(response.data.message);
      console.log("response", response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="app__addStudent section-padding">
        <h2 className="page-title">Add a student</h2>
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
            </div>

            <div className="wrapper-btn">
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
                name="major"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
