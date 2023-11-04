const mongoose = require("mongoose");

const MedicalServicesSchema = new mongoose.Schema({
  serviceID: String,
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
