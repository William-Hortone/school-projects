const mongoose = require("mongoose");

const MedicalServicesSchema = new mongoose.Schema({
  serviceID: {
    type: String,
    unique: true,
    required: true,
  },
  serviceName: String,
  amount: String,
  duration: String,
  additionalNotes: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const MedicalServicesModel = mongoose.model(
  "medicalServices",
  MedicalServicesSchema
);

module.exports = MedicalServicesModel;
