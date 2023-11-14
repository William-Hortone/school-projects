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

// Update  room information
router.put("/editRoomDetails/:roomId", (req, res) => {
  const id = req.params.roomId;
  const updatedData = req.body;
  ModelRoom.findOneAndUpdate(
    { roomID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((room) => {
      if (!room) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

//Delete room
router.put("/deleteRoom/:roomId", (req, res) => {
  const id = req.params.roomId;
  ModelRoom.findOneAndUpdate(
    {
      roomID: id,
    },
    { $set: { isDisplaying: false } },
    { new: true }
  )
    .then((room) => {
      if (!room) {
        return res.json("notfound");
      } else {
        if (room.isDisplayed === false) {
          return res.json("notfound");
        }
        res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
