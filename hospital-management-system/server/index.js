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
  const { serviceId } = req.params;
  const { serviceName, amount, duration, additionalNotes } = req.body;
  MedicalServicesModel.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        serviceName,
        amount,
        duration,
        additionalNotes,
      },
    },
    { new: true }
  )
    .then((service) => {
      if (!service) {
        return res.status(404).json("not found");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

app.put("/editDoctor/:doctorId", (req, res) => {
  const id = req.params.doctorId; // Custom doctorID from the URL
  const updatedData = req.body; // Data to update

  // Find the doctor with the custom doctorID and update their details
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

// app.put("/editDoctor/:doctorId", (req, res) => {
//   const doctorId = req.params.doctorId;
//   const {
//     // doctorID,
//     doctorFN,
//     nicNo,
//     doctorLN,
//     homePhone,
//     mobilePhone,
//     Qualifications,
//     Specialization,
//     VisitingCharge,
//     ChannelingCharge,
//     basicSalary,
//     sex,
//     doctorType,
//     doctorAddress,
//     doctorNotes,
//   } = req.body;

//   const dataToUpdate = req.body;
//   DoctorModel.findOneAndUpdate(
//     {
//       DoctorID: doctorId,
//     },
//     {
//       // $set: dataToUpdate,
//       $set: {
//         // doctorID,
//         doctorFN,
//         nicNo,
//         doctorLN,
//         homePhone,
//         mobilePhone,
//         Qualifications,
//         Specialization,
//         VisitingCharge,
//         ChannelingCharge,
//         basicSalary,
//         sex,
//         doctorType,
//         doctorAddress,
//         doctorNotes,
//       },
//     },
//     { new: true }
//   )
//     .then((doctor) => {
//       if (!doctor) {
//         return res.status(404).json("not found");
//       }
//       return res.json("success");
//     })
//     .catch((err) => res.json(err));
// });

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
