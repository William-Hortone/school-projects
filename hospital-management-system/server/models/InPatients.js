const mongoose = require("mongoose");

const InPatientSchema = new mongoose.Schema({
  patientID: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  gender: String,
  address: String,
  telephone: String,
  status: String,
  notes: String,
  nicNumber: String,
  blood: String,
  weight: String,
  height: String,
  dateOB: String,
  homePhone: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const OutpatientModel = mongoose.model("InPatients", InPatientSchema);

module.exports = OutpatientModel;
