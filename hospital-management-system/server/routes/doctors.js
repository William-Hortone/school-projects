const express = require("express");
const DoctorModel = require("../models/Doctor");

const router = express.Router();

// Create a Doctor
router.post("/doctor", (req, res) => {
  DoctorModel.create(req.body)
    .then((doctor) => res.json(doctor))
    .catch((err) => res.json(err));
});

// Get all Doctors
router.get("/getDoctors", (req, res) => {
  DoctorModel.find({ isDisplayed: true })
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

// Update a Doctor
router.put("/editDoctor/:doctorId", (req, res) => {
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

// Delete a Doctor
router.put("/deleteDoctor/:doctorId", (req, res) => {
  const doctorID = req.params.doctorId;
  DoctorModel.findOneAndRemove(
    { doctorID: doctorID },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((doctor) => {
      if (!doctor) {
        return res.json("not found");
      } else {
        if (doctor.isDisplayed === false) {
          return res.json("not found");
        }
        res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
