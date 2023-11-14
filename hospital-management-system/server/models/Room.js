const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: String,
  roomRates: String,
  roomDesc: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const ModelRoom = mongoose.model("RoomInfos", RoomSchema);

module.exports = ModelRoom;
