const mongoose = require("mongoose");

const OutPTreatmentSchema = new mongoose.Schema({
  treatmentId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: String,
  doctorId: String,
  date: String,
  time: String,
  prescription: String,
  description: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const OutPTreatmentModel = mongoose.model("OutPTreatment", OutPTreatmentSchema);

module.exports = OutPTreatmentModel;
