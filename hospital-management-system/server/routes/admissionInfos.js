const express = require("express");
const AdmissionModel = require("../models/admission");
const router = express.Router();

//  Create an in patient admission
router.post("/addAdmission", (req, res) => {
  AdmissionModel.create(req.body)
    .then((admission) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the inPatients admissions
router.get("/getAdmissionDetails", (req, res) => {
  AdmissionModel.find({ isDisplayed: true })
    .then((admission) => {
      if (!admission) {
        res.json("notFound");
      }
      res.json(admission);
    })
    .catch((err) => res.json(err));
});

// Update inPatients admission information
router.put("/editAdmissionDetails/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  AdmissionModel.findOneAndUpdate(
    { admissionID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((admission) => {
      if (!admission) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// Delete  inPatients admission information
router.put("/deleteAdmission/:id", (req, res) => {
  const id = req.params.id;

  AdmissionModel.findOneAndUpdate(
    {
      admissionID: id,
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
