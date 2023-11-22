const express = require("express");
const ModelDocAppointment = require("../models/DocAppointment");

const router = express.Router();

//CREATE A DOCTOR SCHEDULING APPOINTMENT
router.post("/docAppointment", (req, res) => {
  ModelDocAppointment.create(req.body)
    .then((appointment) => {
      res.json(appointment);
    })
    .catch((err) => res.json(err));
});

// Get all Doctors Appointments
router.get("/getDocAppointments", (req, res) => {
  ModelDocAppointment.find({ isDisplaying: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

// Update a Doctor Appointment
router.put("/editDocAppointment/:scheduleId", (req, res) => {
  const scheduleId = req.params.scheduleId;
  const updatedData = req.body;
  ModelDocAppointment.findOneAndUpdate(
    { schedulingID: scheduleId },
    { $set: updatedData },
    { new: true }
  )
    .then((appointment) => {
      if (!appointment) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

//Delete a  Doctor appointment
router.put("/deleteDocAppointment/:scheduleId", (req, res) => {
  const id = req.params.scheduleId;
  ModelDocAppointment.findOneAndUpdate(
    {
      schedulingID: id,
    },
    { $set: { isDisplaying: false } },
    { new: true }
  )
    .then((appointment) => {
      if (!appointment) {
        return res.json("notfound");
      } else {
        if (appointment.isDisplayed === false) {
          return res.json("notfound");
        }
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
