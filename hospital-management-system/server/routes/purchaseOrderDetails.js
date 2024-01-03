const express = require("express");
const PurchaseOrderModel = require("../models/PurchaseOrder");
const router = express.Router();

//  Create an PurchaseOrder
router.post("/addPurchaseOrder", (req, res) => {
  PurchaseOrderModel.create(req.body)
    .then((treatment) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the PurchaseOrder
router.get("/getPurchaseOrder", (req, res) => {
  PurchaseOrderModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  OutPatients  treatment information
// router.put("/editOutPTreatment/:ID", (req, res) => {
//   const id = req.params.ID;
//   const updatedData = req.body;

//   OutPTreatmentModel.findOneAndUpdate(
//     { treatmentId: id },
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

// Delete OutPatients treatment
// router.put("/deleteOutPTreatment/:id", (req, res) => {
//   const id = req.params.id;

//   OutPTreatmentModel.findOneAndUpdate(
//     {
//       treatmentId: id,
//     },
//     { $set: { isDisplayed: false } },
//     { new: true }
//   )
//     .then((treatment) => {
//       if (!treatment) {
//         return res.json("notfound");
//       } else {
//         return res.json("success");
//       }
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
