const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdminModel = require("./models/admin");
const DoctorModel = require("./models/Doctor");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/hospital");

app.post("/register", (req, res) => {
  AdminModel.create(req.body)
    .then((admin) => res.json(admin))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  AdminModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("wrongPassword");
        }
      } else {
        res.json("unknown email");
      }
    })
    .catch((err) => res.json(err));
});

app.post("/doctor", (req, res) => {
  DoctorModel.create(req.body)
    .then((doctor) => res.json(doctor))
    .catch((err) => res.json(err));
});

app.get("/getDoctors", (req, res) => {
  DoctorModel.find()
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("The server is ruining");
});
