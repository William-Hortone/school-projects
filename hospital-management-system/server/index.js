const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DoctorModel = require("./models/Doctor");
const MedicalServicesModel = require("./models/MedicalServices");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/hospital");

app.post("/medicalServices", (req, res) => {
  MedicalServicesModel.create(req.body)
    .then((service) => res.json(service))
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

app.get("/getHospitalServices", (req, res) => {
  MedicalServicesModel.find()
    .then((medicalsSer) => res.json(medicalsSer))
    .catch((err) => res.json(err));
});

app.delete("/deleteService/:serviceId", (req, res) => {
  MedicalServicesModel.findByIdAndRemove(req.params.serviceId)
    .then((service) => {
      if (!service) {
        return res.json("not found");
      }
      res.json("success");
    })
    .catch((err) => res.status(500).json(err));
});

app.put("/editService/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  const updatedData = req.body;
  MedicalServicesModel.findOneAndUpdate(
    { serviceID: serviceId },
    {
      $set: updatedData,
    },
    { new: true }
  )
    .then((service) => {
      if (!service) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

app.put("/editDoctor/:doctorId", (req, res) => {
  const id = req.params.doctorId;
  const updatedData = req.body;

  DoctorModel.findOneAndUpdate(
    {
      doctorID: id,
    },
    {
      $set: updatedData,
    },
    { new: true }
  )
    .then((doctor) => {
      if (!doctor) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.status(500).json(err));
});

app.delete("/deleteDoctor/:doctorId", (req, res) => {
  const doctorID = req.params.doctorId;
  DoctorModel.findOneAndRemove({ doctorID: doctorID })
    .then((doctor) => {
      if (!doctor) {
        return res.json("not found");
      }
      res.json("success");
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("The server is ruining");
});
