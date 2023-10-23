const mongoose = require("mongoose");

const MedicalServicesSchema = new mongoose.Schema({
  serviceName: String,
  amount: String,
  duration: String,
  additionalNotes: String,
});

const MedicalServicesModel = mongoose.model(
  "medicalServices",
  MedicalServicesSchema
);

module.exports = MedicalServicesModel;
