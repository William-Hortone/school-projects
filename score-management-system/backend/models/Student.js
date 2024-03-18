const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  dOB: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  schoolingYears: {
    type: Number,
    required: true,
  },
  displayIt: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
