const express = require("express");
const ModelWardType = require("../models/WardType");

const router = express.Router();

// to create a ward type
router.post("/addWardType", (req, res) => {
  ModelWardType.create(req.body)
    .then((wardType) => {
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// to get a ward type
router.get("/getWardTypes", (req, res) => {
  ModelWardType.find()
    .then((wardType) => {
      return res.json(wardType);
    })
    .catch((err) => res.json(err));
});

// To update ward type infos
router.put("/editWardType/:wardTID", (req, res) => {
  const id = req.params.wardTID;
  const updatedData = req.body;

  ModelWardType.findOneAndUpdate(
    { wardTypeID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((wardType) => {
      if (wardType) {
        return res.json("success");
      } else {
        return res.json("Dot Found");
      }
    })
    .catch((err) => res.json(err));
});

// To Delete ward type infos
router.delete("/deleteWardType/:wardTID", (req, res) => {
  const id = req.params.wardTID;

  ModelWardType.findOneAndDelete({ wardTypeID: id })
    .then((wardType) => {
      if (wardType) {
        return res.json("success");
      } else {
        return res.json("Dot Found");
      }
    })
    .catch((err) => res.json(err));
});
module.exports = router;
