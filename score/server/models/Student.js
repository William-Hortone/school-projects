const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentNumber: {
    type: Number,
    unique: true,
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
  password: {
    type: Number,
    default: function () {
      return this.studentNumber;
    },
  },
  schoolingYears: {
    type: Number,
    required: true,
  },
  displayIt: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "student",
  },
});

module.exports = mongoose.model("Student", StudentSchema);
