const express = require("express");
const VisitsModel = require("../models/Visit");
const router = express.Router();

//  Create an outpatient
router.post("/addVisit", (req, res) => {
  VisitsModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the Outpatients
router.get("/getVisitDetails", (req, res) => {
  VisitsModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  OutPatients information
// router.put("/editOutPatientDetails/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   VisitsModel.findOneAndUpdate(
//     { patientID: id },
//     { $set: updatedData },
//     { new: true }
//   )
//     .then((user) => {
//       if (!user) {
//         return res.json("notfound");
//       }
//       return res.json("success");
//     })
//     .catch((err) => res.json(err));
// });

// Delete OutPatients
// router.put("/deleteOutPatient/:id", (req, res) => {
//   const id = req.params.id;

//   VisitsModel.findOneAndUpdate(
//     {
//       patientID: id,
//     },
//     { $set: { isDisplayed: false } },
//     { new: true }
//   )
//     .then((patient) => {
//       if (!patient) {
//         return res.json("notfound");
//       } else {
//         return res.json("success");
//       }
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
