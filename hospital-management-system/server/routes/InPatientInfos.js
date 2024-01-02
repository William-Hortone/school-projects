const express = require("express");
const InpatientModel = require("../models/InPatients");
const router = express.Router();

//  Create an in patient
router.post("/addInPatient", (req, res) => {
  InpatientModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the  in patients
router.get("/getInPatientsDetails", (req, res) => {
  InpatientModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  InPatients information
router.put("/editInPatientDetails/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  InpatientModel.findOneAndUpdate(
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

// Delete  inPatients
router.put("/deleteInPatient/:id", (req, res) => {
  const id = req.params.id;

  InpatientModel.findOneAndUpdate(
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
