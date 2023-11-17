const mongoose = require("mongoose");

const DocAppointment = new mongoose.Schema({
  schedulingID: {
    type: String,
    unique: true,
    required: true,
  },
  doctorID: String,
  timeIn: String,
  timeOut: String,
  selectedDays: String,
  schedulingNotes: String,
  isDisplaying: {
    type: Boolean,
    default: true,
  },
});

const ModelDocAppointment = mongoose.model(
  "DoctorsAppointment",
  DocAppointment
);

module.exports = ModelDocAppointment;
