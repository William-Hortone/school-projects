const express = require("express");
const AdmissionModel = require("../models/MedicineOrder");
const router = express.Router();

//  Create an in patient guardian
router.post("/addMedicineOrder", (req, res) => {
  AdmissionModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the  Guardians
router.get("/getMedicineOrder", (req, res) => {
  AdmissionModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  guardian information
router.put("/editGuardianDetails/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  AdmissionModel.findOneAndUpdate(
    { guardianID: id },
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

// Delete  Guardians
router.put("/deleteGuardian/:id", (req, res) => {
  const id = req.params.id;

  AdmissionModel.findOneAndUpdate(
    {
      guardianID: id,
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
