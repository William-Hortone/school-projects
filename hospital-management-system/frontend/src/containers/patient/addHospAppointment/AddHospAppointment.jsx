import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, Input } from "../../../components";

const AddHospAppointment = ({ setOpenAddHospitalApp }) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    hospitalServiceID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allHospitalSer, setAllHospitalSer] = useState([]);
  const [allDocSchFiltered, setAllDocSchFiltered] = useState([]);
  const [allDocSchedule, setAllDocSchedule] = useState([]);
  const [startDate, setStartDate] = useState();
  const [pickedTime, setPickedTime] = useState(null);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [docID, setDocID] = useState("");
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();
  const [saturday, setSaturday] = useState();
  const [sunday, setSunday] = useState();

  // To Get all out Patients
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_APPOINTMENT = "http://localhost:3001/getAddHospitalSerApp";
  const API_URL_HOSPITAL_SER = "http://localhost:3001/getHospitalServices";
  const API_URL_HOSPITAL_SCHEDULE = "http://localhost:3001/getHospitalSchedule";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
  };

  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_HOSPITAL_SER);
    setAllHospitalSer(data);
  };
  const fetchAppointment = async () => {
    const { data } = await axios.get(API_URL_APPOINTMENT);
    setAllAppointments(data);
    // ! this bust be change
  };

  const fetchDocSchedule = async () => {
    const { data } = await axios.get(API_URL_HOSPITAL_SCHEDULE);
    setAllDocSchedule(data);
  };

  // const handleFocusPatient = () => {
  //   setIsFocusedP(true);
  // };

  // const handleBlurPatient = () => {
  //   setIsFocusedP(false);
  // };

  // const handleFocusDoctor = () => {
  //   setIsFocusedD(true);
  // };

  // const handleBlurDoctor = () => {
  //   setIsFocusedD(false);
  // };

  // useEffect(() => {
  //   fetchData();
  //   fetchDoctorsData();
  //   fetchAppointment();
  //   fetchHospitalSchedule();
  // }, []);

  // // Filter available days according to the doctor schedule available days
  // useEffect(() => {
  //   if (allDocSchFiltered) {
  //     const allDocSchFilterDays = allDocSchFiltered.map((day) => {
  //       return day.selectedDays;
  //     });

  //     console.log("allDocSchFiltered", allDocSchFilterDays);
  //     const daysMap = {
  //       Sun: { stateUpdater: setSunday, value: 0 },
  //       Mon: { stateUpdater: setMonday, value: 1 },
  //       Tue: { stateUpdater: setTuesday, value: 2 },
  //       Wed: { stateUpdater: setWednesday, value: 3 },
  //       Thu: { stateUpdater: setThursday, value: 4 },
  //       Fri: { stateUpdater: setFriday, value: 5 },
  //       Sat: { stateUpdater: setSaturday, value: 6 },
  //     };

  //     allDocSchFilterDays.forEach((day) => {
  //       const dayName = day.substring(0, 3);
  //       const { stateUpdater, value } = daysMap[dayName];
  //       if (day.includes(dayName)) {
  //         stateUpdater(value);
  //       } else {
  //         stateUpdater();
  //       }
  //     });
  //   }
  // }, [allDocSchFiltered]);

  // useEffect(() => {
  //   console.log("allDocSchFiltered", allDocSchFiltered);
  // }, [allDocSchFiltered]);
  // useEffect(() => {
  //   console.log(
  //     "allDocSchFiltered",
  //     monday,
  //     tuesday,
  //     wednesday,
  //     thursday,
  //     friday,
  //     saturday
  //   );
  // }, [monday, tuesday, wednesday, thursday, friday, saturday]);

  // useEffect(() => {
  //   if (startDate) {
  //     const text = startDate.toString();

  //     const result = text.slice(0, 3);

  //     setSelectedDay(result);
  //   }
  // }, [startDate, selectedDay]);

  // useEffect(() => {
  //   const handleFilter = (id) => {
  //     const result = allDocSchedule.filter(
  //       (service) => service.serviceID === id
  //     );
  //     setAllDocSchFiltered(result);
  //   };

  //   handleFilter(docID);
  // }, [docID, allDocSchedule]);

  // //  Set the format for the Date
  // useEffect(() => {
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   if (startDate) {
  //     const day = startDate.getDate();
  //     const month = months[startDate.getMonth()];
  //     const year = startDate.getFullYear();

  //     const formattedDate = `${selectedDay} ${day} ${month} ${year}`;
  //     setSelectedDate(formattedDate);
  //   }
  // }, [startDate, selectedDay]);

  // useEffect(() => {
  //   setDocID(inputs.hospitalServiceID);
  //   console.log("the patient`", docID);
  // }, [inputs.hospitalServiceID, docID]);

  const handleFocusPatient = () => {
    setIsFocusedP(true);
  };

  const handleBlurPatient = () => {
    setIsFocusedP(false);
  };

  const handleFocusDoctor = () => {
    setIsFocusedD(true);
  };

  const handleBlurDoctor = () => {
    setIsFocusedD(false);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
    fetchAppointment();
    fetchDocSchedule();
  }, []);

  useEffect(() => {
    console.log("allDocSchFiltered", allDocSchFiltered);
  }, [allDocSchFiltered]);
  useEffect(() => {
    console.log(
      "allDocSchFhospitalServiceIDiltered",
      monday,
      tuesday,
      wednesday,
      thursday,
      friday
    );
    console.log("selectedDay", selectedDay);
  }, [monday, tuesday, wednesday, thursday, friday, selectedDay]);

  // Filter available days according to the doctor schedule available days
  useEffect(() => {
    if (allDocSchFiltered) {
      const allDocSchFilterDays = allDocSchFiltered.map((day) => {
        return day.selectedDays;
      });
      console.log("allDocSchFilterDays", allDocSchFilterDays);

      const daysMap = {
        Sun: { stateUpdater: setSunday, value: 0 },
        Mon: { stateUpdater: setMonday, value: 1 },
        Tue: { stateUpdater: setTuesday, value: 2 },
        Wed: { stateUpdater: setWednesday, value: 3 },
        Thu: { stateUpdater: setThursday, value: 4 },
        Fri: { stateUpdater: setFriday, value: 5 },
        Sat: { stateUpdater: setSaturday, value: 6 },
      };

      allDocSchFilterDays.forEach((day) => {
        const dayName = day.substring(0, 3);
        const { stateUpdater, value } = daysMap[dayName];
        if (day.includes(dayName)) {
          stateUpdater(value);
        } else {
          stateUpdater();
        }
      });
    }
  }, [allDocSchFiltered]);

  useEffect(() => {
    if (startDate) {
      const text = startDate.toString();

      const result = text.slice(0, 3);

      setSelectedDay(result);
    }
  }, [startDate, selectedDay]);

  //  Set the format for the Date
  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (startDate) {
      const day = startDate.getDate();
      const month = months[startDate.getMonth()];
      const year = startDate.getFullYear();

      const formattedDate = `${selectedDay} ${day} ${month} ${year}`;
      setSelectedDate(formattedDate);
    }
  }, [startDate, selectedDay]);

  //  Set the format for the time
  useEffect(() => {
    if (pickedTime) {
      const formattedTime = pickedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setSelectedTime(formattedTime);
    }
  }, [pickedTime]);

  useEffect(() => {
    setInputs((inputsValue) => ({
      ...inputsValue,
      appointmentDate: selectedDate,
    }));
  }, [selectedDate]);

  useEffect(() => {
    setInputs((inputsValue) => ({
      ...inputsValue,
      appointmentTime: selectedTime,
    }));
  }, [selectedTime]);

  // =======================================

  //  Set the format for the time
  // useEffect(() => {
  //   if (pickedTime) {
  //     const formattedTime = pickedTime.toLocaleTimeString("en-US", {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     });

  //     setSelectedTime(formattedTime);
  //   }
  // }, [pickedTime]);

  // useEffect(() => {
  //   setInputs((inputsValue) => ({
  //     ...inputsValue,
  //     appointmentDate: selectedDate,
  //   }));
  // }, [selectedDate]);

  // useEffect(() => {
  //   setInputs((inputsValue) => ({
  //     ...inputsValue,
  //     appointmentTime: selectedTime,
  //   }));
  // }, [selectedTime]);

  // Function to add a doctor Appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.patientID === "" ||
      inputs.hospitalServiceID === "" ||
      inputs.appointmentDate === "" ||
      inputs.appointmentTime === ""
    ) {
      toast.error("Please complete all the fields");
    } else {
      axios
        .post("http://localhost:3001/addHospitalSerApp", inputs)
        .then((res) => {
          toast.success("Added successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleClose = () => {
    setOpenAddHospitalApp(false);
  };

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (allAppointments.length === 0) {
      setInputs({
        ...inputs,
        appointmentID: "appH_001",
      });
    } else {
      const lastElementId =
        allAppointments[allAppointments.length - 1].appointmentID;
      const numericPart = parseInt(lastElementId.split("_")[1]);
      const nextId = `appH_${(numericPart + 1).toString().padStart(3, "0")}`;

      setInputs({
        ...inputs,
        appointmentID: nextId,
      });
    }
  };

  // Function to filter the time
  // const filterTime = (time) => {
  //   const startTime = new Date();
  //   startTime.setHours(10, 0, 0);

  //   const endTime = new Date();
  //   endTime.setHours(19, 20, 0);

  //   return time >= startTime && time <= endTime;
  // };

  useEffect(() => {
    setDocID(inputs.hospitalServiceID);
  }, [inputs.hospitalServiceID, docID]);

  useEffect(() => {
    const handleFilter = (id) => {
      const result = allDocSchedule.filter(
        (service) => service.serviceID === id
      );
      setAllDocSchFiltered(result);
    };

    handleFilter(docID);
  }, [docID, allDocSchedule]);

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">HOSPITAL SERVICE APPOINTMENT</h2>
      <div className="app__addAppointment-container">
        <div className="container-view-appoint appointment-form">
          <div className="details-title">
            <h4>Appointment Details</h4>
            {/* <div className="divider" /> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-fields">
              <label form="AppointmentID">Appointment ID:</label>
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                value={inputs.appointmentID}
                handleOnChange={handleOnChange}
                inputDisabled="true"
              />
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID</label>
              <div>
                <select
                  className="custom-input-field"
                  name="patientID"
                  id="patientID"
                  value={inputs.patientID}
                  onChange={handleOnChange}
                  onFocus={handleFocusPatient}
                  onBlur={handleBlurPatient}
                  required
                >
                  <option required value="">
                    Select a Patient ID
                  </option>
                  {allOutPatients.map((patient, index) => (
                    <option key={index} value={patient.patientID}>
                      {patient.patientID}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="doctorID">Hospital Service ID</label>
              <div>
                <select
                  name="hospitalServiceID"
                  id="hospitalServiceID"
                  value={inputs.hospitalServiceID}
                  onChange={handleOnChange}
                  required
                  onFocus={handleFocusDoctor}
                  onBlur={handleBlurDoctor}
                >
                  <option required value="">
                    Hospital Service ID
                  </option>
                  {allHospitalSer.map((service, index) => (
                    <option key={index} value={service.serviceID}>
                      {service.serviceID}
                    </option>
                  ))}
                </select>

                <span
                  // onClick={handleShowDocDetailsTable}
                  className="btn-docSchedule"
                >
                  Hospital Service
                </span>
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="gender"> Appointment Date:</label>
              <div className="custom-input-field">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableMonthYearDropdowns
                  minDate={new Date()}
                  filterDate={(date) =>
                    date.getDay() == monday ||
                    date.getDay() == tuesday ||
                    date.getDay() == wednesday ||
                    date.getDay() == thursday ||
                    date.getDay() == friday ||
                    date.getDay() == saturday ||
                    date.getDay() == sunday
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="gender"> Appointment Time:</label>
              <div className="custom-input-field">
                <DatePicker
                  selected={pickedTime}
                  onChange={(time) => setPickedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                  // filterTime={filterTime}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>

          <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="add"
              btnName="Add Appointment"
              color="green"
              buttonType="submit"
              onClick={handleAddAppointment}
            />
            <ButtonAction
              iconName="close"
              btnName="Close"
              color="red"
              buttonType="button"
              onClick={handleClose}
            />
          </div>
        </div>

        <aside className="container-view-appoint">
          {/* empty span */}
          {!isFocusedP && !isFocusedD && <span />}

          {/* Table for  Out patient details */}
          {isFocusedP && (
            <table className="table-view-app">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {allOutPatients.map((patient, index) => {
                  return (
                    <tr className="table-view-app-row" key={index}>
                      <td>{patient.patientID}</td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Table for  Doctors details */}
          {isFocusedD && (
            <table className="table-view-app">
              <thead>
                <tr>
                  <th>Service ID</th>
                  <th>Service Name</th>
                  <th>Amount</th>
                  <th>Duration</th>
                  <th>Additional Notes</th>
                </tr>
              </thead>
              <tbody>
                {allHospitalSer.map((service, index) => {
                  return (
                    <tr className="table-view-app-row" key={index}>
                      <td>{service.serviceID}</td>
                      <td>{service.serviceName}</td>
                      <td>{service.amount}</td>
                      <td>{service.duration}</td>
                      <td>{service.additionalNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="valid"
              btnName="Ok"
              color="blue"
              buttonType="button"
              // onClick={handleCloseScheduling}
            />
            <ButtonAction
              iconName="close"
              btnName="Cancel"
              color="red"
              buttonType="button"
              // onClick={handleCloseScheduling}
            />
          </div>
        </aside>
      </div>

      {/* Table for all Hospital service appointments */}
      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Appointment ID </th>
              <th>Hospital Service ID</th>
              <th>Service Start in</th>
              <th>Service End in</th>
              <th>Available Days </th>
            </tr>
          </thead>
          <tbody>
            {allDocSchFiltered.map((schedule, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{schedule.schedulingID}</td>
                  <td>{schedule.serviceID}</td>
                  <td>{schedule.serviceStarts}</td>
                  <td>{schedule.serviceEnds}</td>
                  <td>{schedule.selectedDays}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddHospAppointment;
