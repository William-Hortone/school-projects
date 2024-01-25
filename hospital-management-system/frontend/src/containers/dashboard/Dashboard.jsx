import React, { useEffect, useState } from "react";
import { selectDoctorDetails } from "../../redux/slice/doctorSlice";
import "./dashboard.css";
import axios from "axios";
import { FaCalendarCheck, FaUserAlt, FaUserInjured } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import user from "../../assets/user.jpg";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const initialLineChartData = [
  { name: "January", value: 400 },
  { name: "February", value: 600 },
  { name: "March", value: 800 },
  { name: "April", value: 300 },
  { name: "May", value: 700 },
];

const initialPieChartData = [
  { name: "Monday", value: 350 },
  { name: "Tuesday", value: 400 },
  { name: "Category C", value: 500 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [mondayValue, setMondayValue] = useState();
  const [tuesdayValue, setTuesdayValue] = useState();
  const [wednesdayValue, setWednesdayValue] = useState();
  const [thursdayValue, setThursdayValue] = useState();
  const [fridayValue, setFridayValue] = useState();
  const [saturdayValue, setSaturdayValue] = useState();
  const [sundayValue, setSundayValue] = useState();
  const [appInfos, setAppInfos] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allInPatients, setAllInPatients] = useState([]);
  const [allOutPatients, setAllOutPatients] = useState([]);

  const [barChartData, setBarChartData] = useState([
    { name: "Monday", value: 0 },
    { name: "Tuesday", value: 0 },
    { name: "Wednesday", value: 0 },
    { name: "Thursday", value: 0 },
    { name: "Friday", value: 0 },
    { name: "Saturday", value: 0 },
    { name: "Sunday", value: 0 },
  ]);

  const handleViewAllDoctors = () => {
    navigate("/vizDoctorD");
  };
  const doctorDetails = useSelector(selectDoctorDetails);
  // To Get all the available Appointments
  const API_URL = "http://localhost:3001/getDocAppointments";
  const API_URL_APPOINTMENT = "http://localhost:3001/getAddHospitalSerApp";
  const API_URL_PATIENT = "http://localhost:3001/getInPatientsDetails";
  const API_OPATIENT = "http://localhost:3001/getOutPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAppInfos(data);
  };
  const fetchAppointment = async () => {
    const { data } = await axios.get(API_URL_APPOINTMENT);
    setAllAppointments(data);
  };
  const fetchDataInPatients = async () => {
    const { data } = await axios.get(API_URL_PATIENT);
    setAllInPatients(data);
  };
  const fetchDataOutPatient = async () => {
    const { data } = await axios.get(API_OPATIENT);
    setAllOutPatients(data);
  };

  useEffect(() => {
    fetchData();
    fetchAppointment();
    fetchDataOutPatient();
    fetchDataInPatients();
  }, []);

  useEffect(() => {
    const filterDays = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Mon")
        );
        setMondayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterTuesday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Tue")
        );
        setTuesdayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterWednesday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Wed")
        );
        setWednesdayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterThursday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Thu")
        );
        setThursdayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterFriday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Fri")
        );
        setFridayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterSaturday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Sat")
        );
        setSaturdayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };
    const filterSunday = async () => {
      try {
        const result = await appInfos.filter((item) =>
          item.selectedDays.includes("Sun")
        );
        setSundayValue(result.length);
      } catch (err) {
        console.error(err);
      }
    };

    filterDays();
    filterTuesday();
    filterWednesday();
    filterThursday();
    filterFriday();
    filterSaturday();
    filterSunday();
  }, [appInfos]);

  useEffect(() => {
    // Use the spread operator to update the value for each day
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Monday" ? { ...day, value: mondayValue || 0 } : day
      ),
    ]);

    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Tuesday" ? { ...day, value: tuesdayValue || 0 } : day
      ),
    ]);
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Wednesday" ? { ...day, value: wednesdayValue || 0 } : day
      ),
    ]);
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Thursday" ? { ...day, value: thursdayValue || 0 } : day
      ),
    ]);
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Friday" ? { ...day, value: fridayValue || 0 } : day
      ),
    ]);
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Saturday" ? { ...day, value: saturdayValue || 0 } : day
      ),
    ]);
    setBarChartData((prevChartData) => [
      ...prevChartData.map((day) =>
        day.name === "Sunday" ? { ...day, value: sundayValue || 0 } : day
      ),
    ]);
  }, [
    mondayValue,
    tuesdayValue,
    wednesdayValue,
    thursdayValue,
    fridayValue,
    saturdayValue,
    sundayValue,
  ]);

  const [lChartData, setLChartData] = useState(initialLineChartData);
  const [pChartData, setPChartData] = useState(initialPieChartData);
  const [Color, SetColor] = useState(COLORS);

  return (
    <div className="app__dashboard">
      <h2 className="page-title">ADMIN DASHBOARD</h2>
      <div className="app__dashboard-container">
        <div className="app__dashboard-container-header">
          <div className="container-header content-one">
            <h4>
              <span>
                <FaCalendarCheck size={20} />
              </span>
              &nbsp; Doc. Appointments &nbsp;
              <span>{appInfos.length}</span>
            </h4>
            <h4>
              <span>
                <FaCalendarCheck size={20} />
              </span>
              &nbsp; Ser. Appointments &nbsp;
              <span>{allAppointments.length}</span>
            </h4>
          </div>
          <div className="container-header content-two">
            <h4>
              <span>
                <FaUserInjured size={20} />
              </span>
              &nbsp; In PATIENTS &nbsp;
              <span>{allInPatients.length}</span>
            </h4>
            <h4>
              <span>
                <FaUserInjured size={20} />
              </span>
              &nbsp; Out PATIENTS &nbsp;
              <span>{allOutPatients.length}</span>
            </h4>
          </div>
          <div className="container-header content-three">
            <h4>Available Doctors</h4>
            <div>
              <span>
                <FaUserAlt />
              </span>
              <p>{doctorDetails.length}</p>
            </div>
          </div>
          <div className="container-header content-four">
            <h4>TOTAL PATIENTS</h4>
            <div>
              <span>Icon</span>
              <p>20</p>
            </div>
          </div>
        </div>

        <div className="app__dashboard-container_wrapper">
          <div className="app__dashboard-container-left">
            <div className="container-left_box">
              <div className="container_content">
                <div className="container_content-header">
                  <h4>Doctors Appointments</h4>
                </div>
                <div className="chart-container">
                  <BarChart width={350} height={230} data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
              <div className="container_content">
                <div className="container_content-header">
                  <h4>PATIENTS</h4>
                </div>
                <div className="chart-container">
                  <LineChart width={350} height={230} data={lChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>

          <div className="app__dashboard-container-right">
            <div className="container_content">
              <div className="container_content-header">
                <h4>Heart Surgeries</h4>
              </div>
              <div className="chart-container">
                <PieChart width={350} height={230}>
                  <Pie
                    dataKey="value"
                    data={pChartData}
                    cx={200}
                    cy={110}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Color[index % Color.length]}
                        //
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
            <div className="container_content">
              <div className="container_content-header header-infos">
                <h4>Doctors </h4>
                <span onClick={handleViewAllDoctors}> View All</span>
              </div>

              <div>
                {doctorDetails.map((doctor) => (
                  <div key={doctor.doctorID} className="content-details">
                    <div className="content-details-img">
                      <img src={user} alt="photo" />
                    </div>
                    <h4>{doctor.doctorFN}</h4>
                    <p>{doctor.doctorID}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
