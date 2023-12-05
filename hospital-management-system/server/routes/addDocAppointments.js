const express = require("express");
const AddDocApp = require("../models/AddDocAppointment");

const router = express.Router();

// Create a Doctor Appointments
router.post("/addDocAppointment", (req, res) => {
  AddDocApp.create(req.body)
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

// Get all Doctors Appointments
router.get("/getDocAppointments", (req, res) => {
  AddDocApp.find({ isDisplayed: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

module.exports = router;
