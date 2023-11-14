const express = require("express");
const ModelRoom = require("../models/Room");

const router = express.Router();

//  Create a room
router.post("/roomsInfos", (req, res) => {
  ModelRoom.create(req.body)
    .then((room) => res.json("success"))
    .catch((err) => res.json(err));
});

// Get all the rooms
router.get("/getRoomsDetails", (req, res) => {
  ModelRoom.find({ isDisplayed: true })
    .then((room) => {
      if (!room) {
        res.json("notFound");
      }

      res.json(room);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
