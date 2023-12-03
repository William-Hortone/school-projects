const mongoose = require("mongoose");

const BedSchema = new mongoose.Schema({
  bedID: {
    type: String,
    required: true,
    unique: true,
  },
  admissionID: {
    type: String,
    unique: true,
  },
  bedPlace: String,
  bedDesc: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

const ModelBed = mongoose.model("BedInfos", BedSchema);

module.exports = ModelBed;
