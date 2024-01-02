const mongoose = require("mongoose");

const GuardianSchema = new mongoose.Schema({
  guardianID: {
    type: String,
    required: true,
    unique: true,
  },
  patientID: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  occupation: String,
  address: String,
  telephone: String,
  relationShip: String,
  nicNumber: String,
  homePhone: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const GuardianModel = mongoose.model("GuardianInfos", GuardianSchema);

module.exports = GuardianModel;
