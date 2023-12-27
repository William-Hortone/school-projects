const express = require("express");
const AddHospitalSerApp = require("../models/AddHospitalSerApp");

const router = express.Router();

// Create a hospital service Appointments
router.post("/addHospitalSerApp", (req, res) => {
  AddHospitalSerApp.create(req.body)
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

// Get all hospital services Appointments
router.get("/getAddHospitalSerApp", (req, res) => {
  AddHospitalSerApp.find({ isDisplayed: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

//To cancel an appointment
router.put("/cancelHosAppointment/:appId", (req, res) => {
  const id = req.params.appId;

  AddHospitalSerApp.findOneAndUpdate(
    {
      appointmentID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((appointment) => {
      if (!appointment) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
