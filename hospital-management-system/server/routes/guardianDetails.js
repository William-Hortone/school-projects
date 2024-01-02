const express = require("express");
const GuardianModel = require("../models/Guardian");
const router = express.Router();

//  Create an in patient guardian
router.post("/addGuardian", (req, res) => {
  GuardianModel.create(req.body)
    .then((user) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the  Guardians
router.get("/getGuardianDetails", (req, res) => {
  GuardianModel.find({ isDisplayed: true })
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

  GuardianModel.findOneAndUpdate(
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

  GuardianModel.findOneAndUpdate(
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
