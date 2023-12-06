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

module.exports = router;
