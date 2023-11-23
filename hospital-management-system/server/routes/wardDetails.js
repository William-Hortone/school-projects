const express = require("express");
const ModelWard = require("../models/Wards");

const router = express.Router();

//  Create a ward
router.post("/wardsInfos", (req, res) => {
  ModelWard.create(req.body)
    .then((ward) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the wards
router.get("/getWardsDetails", (req, res) => {
  ModelWard.find({ isDisplayed: true })
    .then((ward) => {
      if (!ward) {
        res.json("notFound");
      }
      res.json(ward);
    })
    .catch((err) => res.json(err));
});

// Update  ward information
router.put("/editWardDetails/:wardId", (req, res) => {
  const id = req.params.wardId;
  const updatedData = req.body;
  ModelWard.findOneAndUpdate(
    { wardID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((ward) => {
      if (!ward) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

//Delete ward
router.put("/deleteWard/:wardId", (req, res) => {
  const id = req.params.wardId;

  ModelWard.findOneAndUpdate(
    {
      wardID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((ward) => {
      if (!ward) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
