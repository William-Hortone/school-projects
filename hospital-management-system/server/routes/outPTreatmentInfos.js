const express = require("express");
const OutPTreatmentModel = require("../models/OutPTreatment");
const router = express.Router();

//  Create an out patient treatment
router.post("/addOutPTreatment", (req, res) => {
  OutPTreatmentModel.create(req.body)
    .then((treatment) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the Outpatients treatment
router.get("/getOutPTreatment", (req, res) => {
  OutPTreatmentModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  OutPatients  treatment information
router.put("/editOutPTreatment/:ID", (req, res) => {
  const id = req.params.ID;
  const updatedData = req.body;

  OutPTreatmentModel.findOneAndUpdate(
    { treatmentId: id },
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
// router.put("/deleteOutPatient/:id", (req, res) => {
//   const id = req.params.id;

//   OutPTreatmentModel.findOneAndUpdate(
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
