const express = require("express");
const ModelHospitalService = require("../models/HospitalSchedule");

const router = express.Router();

router.post("/hospitalServiceSchedule", (req, res) => {
  ModelHospitalService.create(req.body)
    .then((schedule) => res.json(schedule))
    .catch((err) => res.json(err));
});

// Get all Hospital Schedule
router.get("/getHospitalSchedule", (req, res) => {
  ModelHospitalService.find({ isDisplaying: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

module.exports = router;
