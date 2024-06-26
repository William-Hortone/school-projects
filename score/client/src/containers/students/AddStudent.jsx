import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Button } from "../../components";
import BASE_URL from "./../../hooks/config";
import "./addStudent.css";

const AddStudent = () => {
  const [inputs, setInputs] = useState({
    name: "",
    dOB: "",
    major: "",
    gender: "",
    studentNumber: "",
    schoolingYears: "",
  });

  const [filterDate, setFilterDate] = useState();

  const [selectedDate, setSelectedDate] = useState();
  // Handler function to update selected date
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

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
    if (selectedDate) {
      const result = selectedDate.toString().slice(4, 17);
      setFilterDate(result);
    }
  }, [selectedDate]);

  //  Function to add a  student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.schoolingYears <= 0) {
      return toast.error("Please provide a valid schooling year");
    }
    if (!/^\d{9}$/.test(inputs.studentNumber)) {
      return toast.error("A student number must have exactly 9 digits");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}student/addStudent`,
        inputs
      );

      toast.success(response.data.message);

      // Empty the form
      setInputs({
        name: "",
        dOB: "",
        major: "",
        gender: "",
        studentNumber: "",
        schoolingYears: "",
      });
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  value={selectedDate}
                  onChange={handleDateChange}
                  disableFuture
                />
              </LocalizationProvider>
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

          <div className="wrapper-btn second-btn">
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
