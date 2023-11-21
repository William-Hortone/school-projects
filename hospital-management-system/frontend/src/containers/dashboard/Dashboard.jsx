import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  selectDocAppointment,
  selectDoctorDetails,
} from "../../redux/slice/doctorSlice";

import { useSelector } from "react-redux";
import user from "../../assets/user.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaUserAlt } from "react-icons/fa";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const initialChartData = [
  { name: "Monday", value: 400 },
  { name: "Tuesday", value: 300 },
  { name: "Wednesday", value: 200 },
  { name: "Thursday", value: 500 },
  { name: "Friday", value: 100 },
  { name: "Saturday", value: 100 },
  { name: "Sunday", value: 100 },
];

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

  const handleViewAllDoctors = () => {
    navigate("/vizDoctorD");
  };
  const doctorDetails = useSelector(selectDoctorDetails);
  const docAppDetails = useSelector(selectDocAppointment);
  useEffect(() => {
    console.log(doctorDetails);
  }, [doctorDetails]);

  const [barChartData, setBarChartData] = useState(initialChartData);
  const [lChartData, setLChartData] = useState(initialLineChartData);
  const [pChartData, setPChartData] = useState(initialPieChartData);
  const [Color, SetColor] = useState(COLORS);

  return (
    <div className="app__dashboard">
      <h2 className="page-title">ADMIN DASHBOARD</h2>
      <div className="app__dashboard-container">
        <div className="app__dashboard-container-header">
          <div className="container-header content-one">
            <h4>TOTAL Appointments</h4>
            <div>
              <span>
                <FaCalendarCheck size={20} />
              </span>
              <p>{docAppDetails.length}</p>
            </div>
          </div>
          <div className="container-header content-two">
            <h4>TOTAL PATIENTS</h4>
            <div>
              <span>Icon</span>
              <p>0</p>
            </div>
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
                  <h4>Weekly Patients</h4>
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
                  <h4>Appointments</h4>
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
