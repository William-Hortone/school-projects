const mongoose = require("mongoose");

const AddHospitalSerAppSchema = new mongoose.Schema({
  appointmentID: {
    type: String,
    unique: true,
    required: true,
  },
  patientID: String,
  hospitalServiceID: String,
  appointmentDate: String,
  appointmentTime: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const AddHospitalSerAppModel = mongoose.model(
  "AddHospitalService",
  AddHospitalSerAppSchema
);

module.exports = AddHospitalSerAppModel;
