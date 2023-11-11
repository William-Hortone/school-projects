const mongoose = require("mongoose");

const HospitalScheduling = new mongoose.Schema({
  schedulingID: String,
  serviceID: String,
  serviceStarts: String,
  serviceEnds: String,
  selectedDays: String,
  schedulingNotes: String,
  isDisplaying: {
    type: Boolean,
    default: true,
  },
});

const ModelHospitalService = mongoose.model(
  "hospitalSchedule",
  HospitalScheduling
);

module.exports = ModelHospitalService;
