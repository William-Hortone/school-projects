const mongoose = require("mongoose");

const MedicalServicesSchema = new mongoose.Schema({
  serviceID: String,
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
