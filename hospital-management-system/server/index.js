const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const doctorRoutes = require("./routes/doctors");
const medicalSRoutes = require("./routes/medicalService");
const docAppointRoutes = require("./routes/docAppointment");
const hosScheduleRoutes = require("./routes/hospitalSchedule");
const roomRoutes = require("./routes/roomDetails");
const wardRoutes = require("./routes/wardDetails");
const addedUserRoutes = require("./routes/addedUserInfos");
const usersRoutes = require("./routes/userConnection");
const roomTypeRoutes = require("./routes/roomTypeInfos");

const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const UserModel = require("./models/Users");

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
// register user
// app.post("/userRegister", (req, res) => {
//   const { email, name, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) => {
//       UserModel.create({ email, name, password: hash })
//         .then((user) => res.json("success"))
//         .catch((err) => res.json(err));
//     })
//     .catch((err) => res.json(err));
// });

// app.post("/userLogin", (req, res) => {
//   const { password, email } = req.body;

//   UserModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       bcrypt.compare(password, user.password, (err, response) => {
//         if (response) {
//           const token = jwt.sign(
//             { email: user.email, role: user.role },
//             "jwt-secret-key",
//             { expiresIn: "1d" }
//           );
//           res.cookie("token", token);
//           return res.json("success");
//         } else {
//           return res.json("The password is incorrect");
//         }
//       });
//     } else {
//       return res.json("User not found");
//     }
//   });
// });

app.use(doctorRoutes);

app.use(medicalSRoutes);

app.use(docAppointRoutes);

app.use(hosScheduleRoutes);

app.use(roomRoutes);

app.use(wardRoutes);

app.use(addedUserRoutes);

app.use(roomTypeRoutes);

app.listen(3001, () => {
  console.log("The server is running");
});
