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
router.get("/getRoomsDetails", async (req, res) => {
  try {
    const rooms = await ModelRoom.find({ isDisplayed: true });
    if (!rooms) {
      return res.status(200).json("notFound");
    }
    return res.status(200).json(rooms);
  } catch (err) {
    return res.status(400).json(err);
  }
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

// Delete room
router.put("/deleteRooms/:roomId", (req, res) => {
  const id = req.params.roomId;

  ModelRoom.findOneAndUpdate(
    {
      roomID: id,
    },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((room) => {
      if (!room) {
        return res.json("notfound");
      } else {
        return res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
