const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema({
  roomTypeID: {
    unique: true,
    type: String,
  },
  roomType: String,
  roomRates: String,
  roomNotes: String,
});

const ModelRoomType = mongoose.model("RoomType", RoomTypeSchema);

module.exports = ModelRoomType;
