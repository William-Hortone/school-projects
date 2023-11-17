import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { selectDoctorDetails } from "../../redux/slice/doctorSlice";
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
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const SECONDCOLORS = ["#dcca87", "#00C49F", "#FF0000", "#FF8042"];

const initialChartData = [
  { name: "Monday", value: 400 },
  { name: "Tuesday", value: 300 },
  { name: "Wednesday", value: 200 },
  { name: "Thursday", value: 500 },
  { name: "Friday", value: 100 },
  { name: "Saturday", value: 100 },
  { name: "Sunday", value: 100 },
];
const second = [
  { name: "Monday", value: 800 },
  { name: "Tuesday", value: 30 },
  { name: "Wednesday", value: 20 },
  { name: "Thursday", value: 50 },
  { name: "Friday", value: 10 },
  { name: "Saturday", value: 10 },
  { name: "Sunday", value: 10 },
];

const initialLineChartData = [
  { name: "January", value: 400 },
  { name: "February", value: 600 },
  { name: "March", value: 800 },
  { name: "April", value: 300 },
  { name: "May", value: 700 },
];
const lineChartData = [
  { name: "January", value: 300 },
  { name: "February", value: 200 },
  { name: "March", value: 400 },
  { name: "April", value: 100 },
  { name: "May", value: 70 },
];

const initialPieChartData = [
  { name: "Monday", value: 350 },
  { name: "Tuesday", value: 400 },
  { name: "Category C", value: 500 },
];
const pieChartData = [
  { name: "Monday", value: 200 },
  { name: "Tuesday", value: 400 },
  { name: "Wednesday", value: 300 },
];

const Dashboard = () => {
  const doctorDetails = useSelector(selectDoctorDetails);
  useEffect(() => {
    console.log(doctorDetails);
  }, [doctorDetails]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setBarChartData(second);
  //     setLChartData(lineChartData);
  //     //   setAChartData(areaChartData);
  //     setPChartData(pieChartData);
  //     SetColor(SECONDCOLORS);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const [barChartData, setBarChartData] = useState(initialChartData);
  const [lChartData, setLChartData] = useState(initialLineChartData);
  const [pChartData, setPChartData] = useState(initialPieChartData);
  const [Color, SetColor] = useState(COLORS);

  return (
    <div className="app__dashboard">
      <h2 className="page-title">ADMIN DASHBOARD</h2>
      <div className="app__dashboard-container">
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
              <span> View All</span>
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
  );
};

export default Dashboard;
