const express = require("express");
const AddDOcAppModel = require("../models/AddDocAppointment");

const router = express.Router();

// Create a Doctor Appointments
router.post("/addDocAppointment", (req, res) => {
  AddDOcAppModel.create(req.body)
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

// Get all Doctors Appointments
router.get("/getAddDocAppointments", (req, res) => {
  AddDOcAppModel.find({ isDisplayed: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

//To cancel an appointment
router.put("/cancelAppointment/:appId", (req, res) => {
  const id = req.params.appId;

  AddDOcAppModel.findOneAndUpdate(
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
