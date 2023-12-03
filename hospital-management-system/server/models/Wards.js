const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
  wardID: {
    type: String,
    required: true,
    unique: true,
  },
  wardType: String,
  wardRates: String,
  wardDesc: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

const ModelWard = mongoose.model("WardInfos", WardSchema);

module.exports = ModelWard;
