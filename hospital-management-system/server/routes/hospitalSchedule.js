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

//Delete a service schedule
router.put("/deleteHospitalSchedule/:scheduleId", (req, res) => {
  const id = req.params.scheduleId;

  ModelHospitalService.findOneAndUpdate(
    { schedulingID: id },
    { $set: { isDisplaying: false } },
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

//Edit a service schedule
router.put("/editHospitalSchedule/:scheduleId", (req, res) => {
  const id = req.params.scheduleId;
  const updatedData = req.body;
  ModelHospitalService.findOneAndUpdate(
    { schedulingID: id },
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

module.exports = router;
