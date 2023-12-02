const mongoose = require("mongoose");

const WardTypeSchema = new mongoose.Schema({
  wardTypeID: {
    unique: true,
    type: String,
  },
  wardType: String,
  wardRates: String,
  wardNotes: String,
});

const ModelWardType = mongoose.model("WardType", WardTypeSchema);

module.exports = ModelWardType;
