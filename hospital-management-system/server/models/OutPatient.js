const mongoose = require("mongoose");

const OutPatientSchema = new mongoose.Schema({
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
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const OutpatientModel = mongoose.model("OutPatient", OutPatientSchema);

module.exports = OutpatientModel;
