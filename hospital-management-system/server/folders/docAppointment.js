const express = require("express");
const ModelDocAppointment = require("../models/DocAppointment");

const router = express.Router();

//CREATE A DOCTOR SCHEDULING APPOINTMENT
router.post("/docAppointment", (req, res) => {
  ModelDocAppointment.create(req.body)
    .then((appointment) => {
      res.json(appointment);
      //   res.json(res);
    })
    .catch((err) => res.json(err));
});

router.get("/getDocAppointments", (req, res) => {
  ModelDocAppointment.find({ isDisplaying: true })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.json(err));
});

module.exports = router;
