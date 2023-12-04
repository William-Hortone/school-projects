const express = require("express");
const OutpatientModel = require("../models/OutPatient");
const router = express.Router();

//  Create an outpatient
router.post("/addOutPatient", (req, res) => {
  OutpatientModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the Outpatients
router.get("/getOutPatientsDetails", (req, res) => {
  OutpatientModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  OutPatients information
router.put("/editOutPatientDetails/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  OutpatientModel.findOneAndUpdate(
    { patientID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// Delete OutPatients
router.put("/deleteOutPatient/:id", (req, res) => {
  const id = req.params.id;

  OutpatientModel.findOneAndUpdate(
    {
      patientID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((patient) => {
      if (!patient) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
