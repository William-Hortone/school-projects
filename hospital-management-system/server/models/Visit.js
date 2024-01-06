const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  visitID: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: String,
  doctorId: String,
  date: String,
  time: String,
  admissionID: String,
  description: String,
  status: String,
  isDisplayed: {
    type: Boolean,
    default: true,
  },
});

const VisitsModel = mongoose.model("Visits", VisitSchema);

module.exports = VisitsModel;
