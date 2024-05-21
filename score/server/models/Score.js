const mongoose = require("mongoose");
const Student = require("./Student");

const ScoreSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
  homework: {
    type: Number,
    required: true,
  },
  questionOne: {
    type: Number,
    required: true,
  },
  questionTwo: {
    type: Number,
    required: true,
  },
  questionThree: {
    type: Number,
    required: true,
  },
  questionFour: {
    type: Number,
    required: true,
  },
  // participation: {
  //   type: Number,
  //   required: true,
  // },
  displayIt: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Scores", ScoreSchema);
