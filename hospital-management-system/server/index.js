const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const doctorRoutes = require("./routes/doctors");
const medicalSRoutes = require("./routes/medicalService");
const docAppointRoutes = require("./routes/docAppointment");
const hosScheduleRoutes = require("./routes/hospitalSchedule");
const roomRoutes = require("./routes/roomDetails");
const wardRoutes = require("./routes/wardDetails");
const addedUserRoutes = require("./routes/addedUserInfos");
const usersRoutes = require("./routes/userConnection");
const roomTypeRoutes = require("./routes/roomTypeInfos");
const wardTypeRoutes = require("./routes/wardTypeInfos");
const bedRoutes = require("./routes/bedInfos");
const OutPatientRoutes = require("./routes/outPatientInfos");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/hospital");

app.use(usersRoutes);

app.use(doctorRoutes);

app.use(medicalSRoutes);

app.use(docAppointRoutes);

app.use(hosScheduleRoutes);

app.use(roomRoutes);

app.use(wardRoutes);

app.use(addedUserRoutes);

app.use(roomTypeRoutes);

app.use(wardTypeRoutes);

app.use(bedRoutes);

app.use(OutPatientRoutes);

app.listen(3001, () => {
  console.log("The server is running");
});
