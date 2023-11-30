const express = require("express");
const ModelRoomType = require("../models/RoomType");

const router = express.Router();

// to create a room type
router.post("/addRoomType", (req, res) => {
  ModelRoomType.create(req.body)
    .then((roomType) => {
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

// to get a room type
router.get("/getRoomTypes", (req, res) => {
  ModelRoomType.find()
    .then((roomType) => {
      return res.json(roomType);
    })
    .catch((err) => res.json(err));
});

// To update room type infos
router.put("/editRoomType/:roomTID", (req, res) => {
  const id = req.params.roomTID;
  const updatedData = req.body;

  ModelRoomType.findOneAndUpdate(
    { roomTypeID: id },
    { $set: updatedData },
    { new: true }
  )
    .then((roomType) => {
      if (roomType) {
        return res.json("success");
      } else {
        return res.json("Dot Found");
      }
    })
    .catch((err) => res.json(err));
});

// To Delete room type infos
router.delete("/deleteRoomType/:roomTID", (req, res) => {
  const id = req.params.roomTID;

  ModelRoomType.findOneAndDelete({ roomTypeID: id })
    .then((roomType) => {
      if (roomType) {
        return res.json("success");
      } else {
        return res.json("Dot Found");
      }
    })
    .catch((err) => res.json(err));
});
module.exports = router;
