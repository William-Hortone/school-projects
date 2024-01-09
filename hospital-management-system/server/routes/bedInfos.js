const express = require("express");
const ModelBed = require("../models/Beds");

const router = express.Router();

//  Create a bed
router.post("/addBed", (req, res) => {
  ModelBed.create(req.body)
    .then((bed) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the beds
router.get("/getBedsDetails", async (req, res) => {
  try {
    const bed = await ModelBed.find({ isDisplayed: true });
    if (!bed) {
      return res.status(200).json("notFound");
    }
    return res.status(200).json(bed);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Update  bed information
router.put("/editBedDetails/:theBedId", (req, res) => {
  const id = req.params.theBedId;
  const updatedData = req.body;
  ModelBed.findOneAndUpdate({ bedID: id }, { $set: updatedData }, { new: true })
    .then((bed) => {
      if (!bed) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// Update bed status
router.put("/updateBedStatus/:theBedId", (req, res) => {
  const id = req.params.theBedId;
  // const updatedData = req.body;
  ModelBed.findOneAndUpdate(
    { bedID: id },
    { $set: { isOccupied: true } },
    { new: true }
  )
    .then((bed) => {
      if (!bed) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// Delete bed
router.put("/deleteBed/:theBedId", (req, res) => {
  const id = req.params.theBedId;

  ModelBed.findOneAndUpdate(
    {
      bedID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((bed) => {
      if (!bed) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
