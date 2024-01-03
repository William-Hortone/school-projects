const express = require("express");
const SupplierModel = require("../models/Supplier");
const router = express.Router();

//  Create an in patient guardian
router.post("/addSupplier", (req, res) => {
  SupplierModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the  Guardians
router.get("/getSupplierDetails", (req, res) => {
  SupplierModel.find({ isDisplayed: true })
    .then((user) => {
      if (!user) {
        res.json("notFound");
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

// Update  guardian information
// router.put("/editGuardianDetails/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   SupplierModel.findOneAndUpdate(
//     { guardianID: id },
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

// Delete  Guardians
// router.put("/deleteGuardian/:id", (req, res) => {
//   const id = req.params.id;

//   SupplierModel.findOneAndUpdate(
//     {
//       guardianID: id,
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
