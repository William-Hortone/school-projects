const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const doctorRoutes = require("./routes/doctors");
const medicalSRoutes = require("./routes/medicalService");
const docAppointRoutes = require("./routes/docAppointment");
const hosScheduleRoutes = require("./routes/hospitalSchedule");
const roomRoutes = require("./routes/roomDetails");
const wardRoutes = require("./routes/wardDetails");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/hospital");

app.use(doctorRoutes);

app.use(medicalSRoutes);

app.use(docAppointRoutes);

app.use(hosScheduleRoutes);

app.use(roomRoutes);

app.use(wardRoutes);

app.listen(3001, () => {
  console.log("The server is running");
});
