const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const doctorRoutes = require("./folders/doctors");
const medicalSRoutes = require("./folders/medicalService");
const docAppointRoutes = require("./folders/docAppointment");
const hosScheduleRoutes = require("./folders/hospitalSchedule");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/hospital");

app.use(doctorRoutes);

app.use(medicalSRoutes);

app.use(docAppointRoutes);

app.use(hosScheduleRoutes);

app.listen(3001, () => {
  console.log("The server is ruining");
});
